import { createHash } from "node:crypto";
import { getPool, pingDatabase } from "./db.mjs";
import { mailConfigured, sendReport } from "./mail.mjs";
import { acceptedGoogleProfile } from "./google-profile.mjs";
import { assertSameOrigin, rateLimit } from "./guard.mjs";
import {
  HttpError,
  appOrigin,
  clearCookie,
  json,
  randomToken,
  readCookies,
  readJson,
  redirect,
  requireEmail,
  requireName,
  requirePhone,
  setCookie,
  sha256,
  text,
  tokensEqual,
} from "./http.mjs";

const INTERESTS = new Set([
  "Insurance",
  "Mutual Funds",
  "Financial Planning",
  "Wealth Management",
  "SIF / PMS / AIF",
  "NRI Services",
  "Wealth & Estate Planning",
  "Real Estate Advisory",
  "Gold & Silver Commodities",
  "Travel Solutions",
  "Tax Services",
  "Fixed Deposits",
  "Equity Trading",
  "Tax Filing",
  "Gift City and Global Investments",
  "Other",
]);

const VISITOR_COOKIE = "ma_vid";
const SESSION_COOKIE = "ma_session";
const OAUTH_COOKIE = "ma_oauth_state";
const YEAR = 60 * 60 * 24 * 365;
const TWO_WEEKS = 60 * 60 * 24 * 14;
const MAX_DURATION_MS = 4 * 60 * 60 * 1000;

export async function handleRequest(request, response) {
  const url = new URL(request.url || "/", "http://localhost");
  const path = url.pathname;
  const method = request.method || "GET";

  if (method === "GET" && path === "/api/health") return health(response);
  if (method === "GET" && path === "/api/google-reviews") return googleReviews(response);
  if (method === "POST" && path === "/api/leads") return createLead(request, response);
  if (method === "POST" && path === "/api/contact") return createContact(request, response);
  if (method === "POST" && path === "/api/forms") return createFormSubmission(request, response);
  if (method === "GET" && path === "/api/auth/config") return authConfig(response);
  if (method === "GET" && path === "/api/auth/google") return startGoogle(request, response);
  if (method === "GET" && path === "/api/auth/google/callback") return finishGoogle(request, response, url);
  if (method === "GET" && path === "/api/auth/me") return currentUser(request, response);
  if (method === "POST" && path === "/api/auth/logout") return logout(request, response);
  if (method === "POST" && path === "/api/analytics/views") return startView(request, response);
  if (method === "POST" && /^\/api\/analytics\/views\/\d+$/.test(path)) {
    return updateView(request, response, path.split("/").pop());
  }
  if (method === "GET" && path === "/api/analytics/summary") return analyticsSummary(request, response);
  if (method === "GET" && path === "/api/calculator-profile") return calculatorProfile(request, response);
  if (method === "POST" && path === "/api/calculator-profile") return saveCalculatorProfile(request, response);
  if (method === "POST" && path === "/api/calculator-report") return emailCalculatorReport(request, response);

  json(response, 404, { error: "Not found" });
}

async function health(response) {
  try {
    await pingDatabase();
    json(response, 200, { ok: true, mysql: true });
  } catch {
    json(response, 503, { ok: false, mysql: false });
  }
}

async function googleReviews(response) {
  const { GET } = await import("../src/app/api/google-reviews/route.ts");
  const result = await GET();
  response.writeHead(result.status, Object.fromEntries(result.headers));
  response.end(await result.text());
}

async function createLead(request, response) {
  assertSameOrigin(request);
  rateLimit(request, "lead", 10, 10 * 60 * 1000);
  const body = await readJson(request);
  const name = requireName(body.name);
  const phone = requirePhone(body.phone);
  const email = requireEmail(body.email);
  const city = text(body.city, 120) || null;
  const interest = text(body.interest, 120);
  if (interest && !INTERESTS.has(interest)) throw new HttpError(400, "Choose an interest from the list.");
  const sourcePath = safePath(body.sourcePath) || null;

  const [result] = await query(
    `INSERT INTO leads (name, phone, email, city, interest, source_path) VALUES (?, ?, ?, ?, ?, ?)`,
    [name, phone, email, city, interest || null, sourcePath],
  );
  json(response, 201, { id: result.insertId });
}

const REVIEW_SLOTS = new Set([
  "07:00 AM - 07:45 AM (Early Bird)",
  "10:00 AM - 10:45 AM (Morning)",
  "01:00 PM - 01:45 PM (Lunch Window)",
  "04:00 PM - 04:45 PM (Afternoon)",
  "07:00 PM - 07:45 PM (Evening)",
  "09:00 PM - 09:45 PM (Post Dinner)",
]);

async function createFormSubmission(request, response) {
  assertSameOrigin(request);
  const body = await readJson(request);
  const formKey = text(body.form, 64);
  if (!/^[a-z0-9-]{3,64}$/.test(formKey)) throw new HttpError(400, "Choose a form.");
  rateLimit(request, `form:${formKey}`, 8, 10 * 60 * 1000);
  const fields = readFields(formKey, body.fields);
  const sourcePath = safePath(body.sourcePath) || null;
  const [result] = await query(
    `INSERT INTO form_submissions (form_key, name, email, phone, fields, source_path) VALUES (?, ?, ?, ?, ?, ?)`,
    [formKey, fields.name || null, fields.email || null, fields.phone || null, JSON.stringify(fields), sourcePath],
  );
  json(response, 201, { id: result.insertId });
}

function readFields(formKey, raw) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) throw new HttpError(400, "Enter the form details.");
  if (formKey === "teachers") {
    return {
      name: requireName(raw.name),
      school: requiredLine(raw.school, "Enter the school or college."),
      subject: requiredLine(raw.subject, "Enter the subject you teach."),
    };
  }
  if (formKey === "docwealth") {
    return {
      name: requireName(raw.name),
      clinic: requiredLine(raw.clinic, "Enter the hospital or clinic."),
      visitDate: requiredLine(raw.visitDate, "Enter the date."),
    };
  }
  if (formKey === "book-a-review") {
    const mode = raw.mode === "office" ? "office" : raw.mode === "online" ? "online" : "";
    if (!mode) throw new HttpError(400, "Choose online or an office visit.");
    const timeSlot = text(raw.timeSlot, 80);
    if (!REVIEW_SLOTS.has(timeSlot)) throw new HttpError(400, "Choose a time window.");
    return {
      name: requireName(raw.name),
      phone: flexiblePhone(raw.phone),
      email: requireEmail(raw.email),
      date: calendarDate(raw.date),
      timeSlot,
      mode,
      timeZone: text(raw.timeZone, 80),
      notes: text(raw.notes, 2000),
    };
  }
  if (formKey === "course-enroll") {
    if (raw.consent !== true) throw new HttpError(400, "Accept the terms to continue.");
    return {
      name: requireName(raw.name),
      email: requireEmail(raw.email),
      phone: flexiblePhone(raw.phone),
      consent: true,
    };
  }
  if (formKey === "seminar-investing" || formKey === "seminar-life-stress" || formKey === "seminar-retirement") {
    return { email: requireEmail(raw.email) };
  }
  throw new HttpError(400, "Choose a form.");
}

function requiredLine(value, message) {
  const line = text(value, 160);
  if (line.length < 2) throw new HttpError(400, message);
  return line;
}

function flexiblePhone(value) {
  const digits = text(value, 20).replace(/\D/g, "");
  const local = digits.length === 12 && digits.startsWith("91") ? digits.slice(2) : digits;
  if (!/^[0-9]{10}$/.test(local)) throw new HttpError(400, "Enter a valid 10-digit phone number.");
  return local;
}

function calendarDate(value) {
  const date = text(value, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new HttpError(400, "Choose a date.");
  const parsed = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== date) {
    throw new HttpError(400, "Choose a date.");
  }
  return date;
}

async function createContact(request, response) {
  assertSameOrigin(request);
  rateLimit(request, "contact", 10, 10 * 60 * 1000);
  const body = await readJson(request);
  const name = requireName(body.name);
  const email = requireEmail(body.email);
  const phone = requirePhone(body.phone);
  const message = text(body.message, 4000);
  if (message.length < 2) throw new HttpError(400, "Enter a message.");
  const sourceInput = text(body.source, 64);
  const source = /^[a-z0-9-]{1,64}$/.test(sourceInput) ? sourceInput : "contact-page";

  const [result] = await query(
    `INSERT INTO contact_messages (name, email, phone, message, source) VALUES (?, ?, ?, ?, ?)`,
    [name, email, phone, message, source],
  );
  json(response, 201, { id: result.insertId });
}

function googleConfigured() {
  return Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
}

function authConfig(response) {
  json(response, 200, { google: googleConfigured() });
}

function startGoogle(request, response) {
  assertSameOrigin(request);
  rateLimit(request, "auth", 30, 10 * 60 * 1000);
  if (!googleConfigured()) {
    redirect(response, `${appOrigin()}/?auth=unavailable`);
    return;
  }
  const state = randomToken();
  const verifier = randomToken();
  setCookie(response, OAUTH_COOKIE, `${state}.${verifier}`, { maxAge: 600 });
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: googleRedirectUri(),
    response_type: "code",
    scope: "openid email profile",
    state,
    code_challenge: createHash("sha256").update(verifier).digest("base64url"),
    code_challenge_method: "S256",
    prompt: "select_account",
  });
  redirect(response, `https://accounts.google.com/o/oauth2/v2/auth?${params}`);
}

async function finishGoogle(request, response, url) {
  const cookies = readCookies(request);
  const state = url.searchParams.get("state") || "";
  const code = url.searchParams.get("code") || "";
  clearCookie(response, OAUTH_COOKIE);
  const stored = cookies[OAUTH_COOKIE] || "";
  const splitAt = stored.indexOf(".");
  const storedState = splitAt === -1 ? "" : stored.slice(0, splitAt);
  const verifier = splitAt === -1 ? "" : stored.slice(splitAt + 1);
  if (!code || code.length > 512 || !tokensEqual(state, storedState) || !/^[a-f0-9]{64}$/.test(verifier)) {
    redirect(response, `${appOrigin()}/?auth=failed`);
    return;
  }

  try {
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: googleRedirectUri(),
        grant_type: "authorization_code",
        code_verifier: verifier,
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!tokenResponse.ok) {
      redirect(response, `${appOrigin()}/?auth=failed`);
      return;
    }
    const token = await tokenResponse.json();
    const infoResponse = await fetch("https://oauth2.googleapis.com/tokeninfo", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ id_token: token.id_token || "" }),
      signal: AbortSignal.timeout(8000),
    });
    if (!infoResponse.ok) {
      redirect(response, `${appOrigin()}/?auth=failed`);
      return;
    }
    const profile = acceptedGoogleProfile(await infoResponse.json(), process.env.GOOGLE_CLIENT_ID);
    if (!profile) {
      redirect(response, `${appOrigin()}/?auth=failed`);
      return;
    }

    await query(`DELETE FROM sessions WHERE expires_at <= UTC_TIMESTAMP()`);
    await query(
      `INSERT INTO users (google_sub, email, name, picture, last_login_at)
       VALUES (?, ?, ?, ?, UTC_TIMESTAMP())
       ON DUPLICATE KEY UPDATE email = VALUES(email), name = VALUES(name), picture = VALUES(picture), last_login_at = UTC_TIMESTAMP()`,
      [profile.sub, profile.email, profile.name, profile.picture],
    );
    const [users] = await query(`SELECT id FROM users WHERE google_sub = ?`, [profile.sub]);
    const session = randomToken();
    const expires = new Date(Date.now() + TWO_WEEKS * 1000);
    await query(`INSERT INTO sessions (user_id, token_hash, expires_at) VALUES (?, ?, ?)`, [
      users[0].id,
      sha256(session),
      expires,
    ]);
    setCookie(response, SESSION_COOKIE, session, { maxAge: TWO_WEEKS });
    redirect(response, `${appOrigin()}/`);
  } catch (error) {
    console.error("Google sign-in failed:", error instanceof HttpError ? error.message : error.code || error.message);
    if (!response.headersSent) redirect(response, `${appOrigin()}/?auth=failed`);
  }
}

async function currentUser(request, response) {
  const user = await findUser(request);
  json(response, 200, { user });
}

async function logout(request, response) {
  assertSameOrigin(request);
  rateLimit(request, "logout", 30, 10 * 60 * 1000);
  const cookies = readCookies(request);
  if (cookies[SESSION_COOKIE]) {
    await query(`DELETE FROM sessions WHERE token_hash = ?`, [sha256(cookies[SESSION_COOKIE])]).catch(() => {});
  }
  clearCookie(response, SESSION_COOKIE);
  json(response, 200, { ok: true });
}

async function findUser(request) {
  const cookies = readCookies(request);
  if (!cookies[SESSION_COOKIE]) return null;
  const [rows] = await query(
    `SELECT u.name, u.email, u.picture
     FROM sessions s
     JOIN users u ON u.id = s.user_id
     WHERE s.token_hash = ? AND s.expires_at > UTC_TIMESTAMP()`,
    [sha256(cookies[SESSION_COOKIE])],
  );
  return rows[0] || null;
}

async function startView(request, response) {
  assertSameOrigin(request);
  rateLimit(request, "view", 90, 10 * 60 * 1000);
  const body = await readJson(request);
  const path = safePath(body.path);
  if (!path) throw new HttpError(400, "Enter a site path.");
  const cookies = readCookies(request);
  let visitorKey = cookies[VISITOR_COOKIE];
  if (!visitorKey || !/^[a-f0-9]{64}$/.test(visitorKey)) {
    visitorKey = randomToken();
    setCookie(response, VISITOR_COOKIE, visitorKey, { maxAge: YEAR });
  }
  const userAgent = text(request.headers["user-agent"], 255) || null;
  await query(
    `INSERT INTO visitors (visitor_key, user_agent) VALUES (?, ?)
     ON DUPLICATE KEY UPDATE last_seen_at = CURRENT_TIMESTAMP, user_agent = COALESCE(VALUES(user_agent), user_agent)`,
    [visitorKey, userAgent],
  );
  const [visitors] = await query(`SELECT id FROM visitors WHERE visitor_key = ?`, [visitorKey]);
  const [result] = await query(
    `INSERT INTO page_views (visitor_id, path, title, referrer) VALUES (?, ?, ?, ?)`,
    [visitors[0].id, path, text(body.title, 255) || null, safeReferrer(body.referrer)],
  );
  json(response, 201, { viewId: result.insertId });
}

async function updateView(request, response, viewId) {
  assertSameOrigin(request);
  rateLimit(request, "duration", 400, 10 * 60 * 1000);
  const cookies = readCookies(request);
  if (!cookies[VISITOR_COOKIE]) throw new HttpError(401, "Missing visitor cookie.");
  const body = await readJson(request);
  const duration = Number(body.durationMs);
  if (!Number.isFinite(duration) || duration < 0) throw new HttpError(400, "Enter a duration.");
  const capped = Math.min(Math.round(duration), MAX_DURATION_MS);
  const [result] = await query(
    `UPDATE page_views pv
     JOIN visitors v ON v.id = pv.visitor_id
     SET pv.duration_ms = GREATEST(pv.duration_ms, ?)
     WHERE pv.id = ? AND v.visitor_key = ?`,
    [capped, Number(viewId), cookies[VISITOR_COOKIE]],
  );
  if (!result.affectedRows) throw new HttpError(404, "Page view not found.");
  json(response, 200, { ok: true });
}

async function analyticsSummary(request, response) {
  const user = await findUser(request);
  if (!user) throw new HttpError(401, "Sign in to view analytics.");
  const allowed = new Set(
    (process.env.ADMIN_EMAILS || "")
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean),
  );
  if (!allowed.has(String(user.email || "").toLowerCase())) {
    throw new HttpError(403, "You do not have access to analytics.");
  }
  const [pages] = await query(
    `SELECT path,
            COUNT(*) AS views,
            COUNT(DISTINCT visitor_id) AS visitors,
            ROUND(AVG(duration_ms)) AS avgDurationMs,
            SUM(duration_ms) AS totalDurationMs
     FROM page_views
     GROUP BY path
     ORDER BY views DESC, totalDurationMs DESC
     LIMIT 50`,
  );
  const [visitors] = await query(`SELECT COUNT(*) AS visitors FROM visitors`);
  json(response, 200, {
    visitors: Number(visitors[0].visitors),
    pages: pages.map((page) => ({
      path: page.path,
      views: Number(page.views),
      visitors: Number(page.visitors),
      avgDurationMs: Number(page.avgDurationMs || 0),
      totalDurationMs: Number(page.totalDurationMs || 0),
    })),
  });
}

async function calculatorProfile(request, response) {
  const session = await findCalculatorSession(request);
  if (!session) throw new HttpError(401, "Enter your details to use the calculator.");
  json(response, 200, session);
}

async function saveCalculatorProfile(request, response) {
  assertSameOrigin(request);
  rateLimit(request, "calculator-profile", 20, 10 * 60 * 1000);
  const body = await readJson(request);
  const name = requireName(body.name);
  const email = requireEmail(body.email);
  const phone = requireContact(body.phone);
  const location = text(body.location, 120);
  if (location.length < 2) throw new HttpError(400, "Enter your current location.");

  const token = randomToken();
  const expiresAt = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
  await query(
    `INSERT INTO calculator_sessions (token_hash, name, email, phone, location, expires_at)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [sha256(token), name, email, phone, location, expiresAt],
  );
  setCookie(response, "ma_calc", token, { maxAge: 14 * 24 * 60 * 60 });
  json(response, 201, { name, email, phone, location });
}

async function emailCalculatorReport(request, response) {
  assertSameOrigin(request);
  rateLimit(request, "calculator-mail", 5, 10 * 60 * 1000);
  const session = await findCalculatorSession(request);
  if (!session) throw new HttpError(401, "Enter your details to use the calculator.");
  if (!mailConfigured()) throw new HttpError(503, "Email delivery is not configured yet.");

  const body = await readJson(request, 2_000_000);
  const slug = text(body.slug, 80);
  const heading = text(body.heading, 120);
  if (!/^[a-z0-9-]{3,80}$/.test(slug)) throw new HttpError(400, "Unknown calculator.");
  if (heading.length < 3) throw new HttpError(400, "The report needs a heading.");
  const encoded = String(body.pdfBase64 || "").replace(/\s+/g, "");
  if (!/^[A-Za-z0-9+/]+={0,2}$/.test(encoded)) throw new HttpError(400, "The report file is not a PDF.");
  const pdf = Buffer.from(encoded, "base64");
  if (pdf.length < 800 || pdf.length > 1_500_000 || pdf.subarray(0, 5).toString() !== "%PDF-") {
    throw new HttpError(400, "The report file is not a PDF.");
  }

  try {
    await sendReport({
      to: session.email,
      name: session.name,
      heading,
      filename: `MyAnmol-${slug}.pdf`,
      pdf,
    });
  } catch (error) {
    console.error("Calculator report email failed:", error instanceof Error ? error.message : "send failed");
    throw new HttpError(502, "The report could not be emailed.");
  }
  json(response, 200, { ok: true });
}

async function findCalculatorSession(request) {
  const token = readCookies(request).ma_calc || "";
  if (!/^[a-f0-9]{64}$/.test(token)) return null;
  const [rows] = await query(
    `SELECT name, email, phone, location
     FROM calculator_sessions
     WHERE token_hash = ? AND expires_at > UTC_TIMESTAMP()
     LIMIT 1`,
    [sha256(token)],
  );
  return rows[0] || null;
}

function requireContact(value) {
  const phone = text(value, 20).replace(/\D/g, "");
  if (phone.length < 8 || phone.length > 15) throw new HttpError(400, "Enter a valid contact number.");
  return phone;
}

function googleRedirectUri() {
  return process.env.GOOGLE_REDIRECT_URI || `${appOrigin()}/api/auth/google/callback`;
}

function safePath(value) {
  const path = text(value, 255);
  if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\") || path.includes("?")) return "";
  return path;
}

function safeReferrer(value) {
  const raw = text(value, 500);
  if (!raw) return null;
  try {
    const url = new URL(raw);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return text(`${url.origin}${url.pathname}`, 255) || null;
  } catch {
    return null;
  }
}

async function query(sql, params) {
  try {
    return await getPool().query(sql, params);
  } catch (error) {
    if (error instanceof HttpError) throw error;
    console.error("MySQL query failed:", error.code || error.message);
    throw new HttpError(503, "The database is unavailable.");
  }
}
