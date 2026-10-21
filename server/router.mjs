import { getPool, pingDatabase } from "./db.mjs";
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
  if (method === "GET" && path === "/api/auth/config") return authConfig(response);
  if (method === "GET" && path === "/api/auth/google") return startGoogle(request, response);
  if (method === "GET" && path === "/api/auth/google/callback") return finishGoogle(request, response, url);
  if (method === "GET" && path === "/api/auth/me") return currentUser(request, response);
  if (method === "POST" && path === "/api/auth/logout") return logout(request, response);
  if (method === "POST" && path === "/api/analytics/views") return startView(request, response);
  if (method === "POST" && /^\/api\/analytics\/views\/\d+$/.test(path)) {
    return updateView(request, response, path.split("/").pop());
  }
  if (method === "GET" && path === "/api/analytics/summary") return analyticsSummary(response);

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

async function createContact(request, response) {
  const body = await readJson(request);
  const name = requireName(body.name);
  const email = requireEmail(body.email);
  const phone = requirePhone(body.phone);
  const message = text(body.message, 4000);
  if (message.length < 2) throw new HttpError(400, "Enter a message.");
  const source = text(body.source, 64) || "contact-page";

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
  if (!googleConfigured()) {
    redirect(response, `${appOrigin()}/?auth=unavailable`);
    return;
  }
  const state = randomToken();
  setCookie(response, OAUTH_COOKIE, state, { maxAge: 600 });
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: googleRedirectUri(),
    response_type: "code",
    scope: "openid email profile",
    state,
    prompt: "select_account",
  });
  redirect(response, `https://accounts.google.com/o/oauth2/v2/auth?${params}`);
}

async function finishGoogle(request, response, url) {
  const cookies = readCookies(request);
  const state = url.searchParams.get("state");
  const code = url.searchParams.get("code");
  clearCookie(response, OAUTH_COOKIE);
  if (!code || !state || state !== cookies[OAUTH_COOKIE]) {
    redirect(response, `${appOrigin()}/?auth=failed`);
    return;
  }

  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: googleRedirectUri(),
      grant_type: "authorization_code",
    }),
    signal: AbortSignal.timeout(8000),
  });
  if (!tokenResponse.ok) {
    redirect(response, `${appOrigin()}/?auth=failed`);
    return;
  }
  const token = await tokenResponse.json();
  const infoResponse = await fetch(
    `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(token.id_token || "")}`,
    { signal: AbortSignal.timeout(8000) },
  );
  if (!infoResponse.ok) {
    redirect(response, `${appOrigin()}/?auth=failed`);
    return;
  }
  const profile = await infoResponse.json();
  const issuer = profile.iss;
  const trustedIssuer = issuer === "accounts.google.com" || issuer === "https://accounts.google.com";
  if (!trustedIssuer || profile.aud !== process.env.GOOGLE_CLIENT_ID || !profile.sub || !profile.email) {
    redirect(response, `${appOrigin()}/?auth=failed`);
    return;
  }

  const name = text(profile.name, 190) || profile.email;
  const picture = text(profile.picture, 500) || null;
  await query(
    `INSERT INTO users (google_sub, email, name, picture, last_login_at)
     VALUES (?, ?, ?, ?, UTC_TIMESTAMP())
     ON DUPLICATE KEY UPDATE email = VALUES(email), name = VALUES(name), picture = VALUES(picture), last_login_at = UTC_TIMESTAMP()`,
    [text(profile.sub, 64), requireEmail(profile.email), name, picture],
  );
  const [users] = await query(`SELECT id FROM users WHERE google_sub = ?`, [text(profile.sub, 64)]);
  const session = randomToken();
  const expires = new Date(Date.now() + TWO_WEEKS * 1000);
  await query(`INSERT INTO sessions (user_id, token_hash, expires_at) VALUES (?, ?, ?)`, [
    users[0].id,
    sha256(session),
    expires,
  ]);
  setCookie(response, SESSION_COOKIE, session, { maxAge: TWO_WEEKS });
  redirect(response, `${appOrigin()}/`);
}

async function currentUser(request, response) {
  const user = await findUser(request);
  json(response, 200, { user });
}

async function logout(request, response) {
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
    [visitors[0].id, path, text(body.title, 255) || null, text(body.referrer, 255) || null],
  );
  json(response, 201, { viewId: result.insertId });
}

async function updateView(request, response, viewId) {
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

async function analyticsSummary(response) {
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

function googleRedirectUri() {
  return process.env.GOOGLE_REDIRECT_URI || `${appOrigin()}/api/auth/google/callback`;
}

function safePath(value) {
  const path = text(value, 255);
  if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return "";
  return path;
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
