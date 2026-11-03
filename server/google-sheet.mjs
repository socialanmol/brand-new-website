import { createSign } from "node:crypto";
import { getPool } from "./db.mjs";

const SHEET_ID = process.env.GET_STARTED_SHEET_ID || "1ZRwXheV2crIpKrnu5ZPCa_SN0o9dz72RzRXBh0NZTsc";
const HEADERS = ["Submitted at (IST)", "Name", "Phone", "Email", "City", "Interests", "Page", "Id"];
const SCOPE = "https://www.googleapis.com/auth/spreadsheets";

let cachedToken = null;
let cachedTitle = "";
let queue = Promise.resolve();
let missingCredentialsLogged = false;

function account() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw) {
    if (!missingCredentialsLogged) {
      missingCredentialsLogged = true;
      console.error("Get Started responses stay in the database until GOOGLE_SERVICE_ACCOUNT_JSON is set.");
    }
    return null;
  }
  try {
    const parsed = JSON.parse(raw);
    if (typeof parsed.private_key === "string") {
      parsed.private_key = parsed.private_key.replace(/\\n/g, "\n");
    }
    if (!parsed.client_email || !parsed.private_key) return null;
    return parsed;
  } catch {
    console.error("Get Started sheet credentials could not be read.");
    return null;
  }
}

function enqueue(work) {
  const run = queue.then(work, work);
  queue = run.then(() => undefined, () => undefined);
  return run;
}

export function getStartedRow(lead) {
  const when = lead.createdAt instanceof Date ? lead.createdAt : new Date(lead.createdAt || Date.now());
  const submittedAt = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(when).replace(",", "") + " IST";
  return [
    submittedAt,
    lead.name || "",
    lead.phone || "",
    lead.email || "",
    lead.city || "",
    lead.interest || "",
    lead.sourcePath || lead.source_path || "",
    String(lead.id),
  ];
}

async function accessToken(credentials) {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) return cachedToken.value;
  const now = Math.floor(Date.now() / 1000);
  const header = Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" })).toString("base64url");
  const claim = Buffer.from(JSON.stringify({
    iss: credentials.client_email,
    scope: SCOPE,
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  })).toString("base64url");
  const signer = createSign("RSA-SHA256");
  signer.update(`${header}.${claim}`);
  signer.end();
  const assertion = `${header}.${claim}.${signer.sign(credentials.private_key).toString("base64url")}`;
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
    signal: AbortSignal.timeout(8000),
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok || !body.access_token) {
    throw new Error("Google sheet sign-in was refused.");
  }
  cachedToken = { value: body.access_token, expiresAt: Date.now() + Number(body.expires_in || 3600) * 1000 };
  return cachedToken.value;
}

async function sheetsFetch(token, path, options = {}) {
  const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    signal: AbortSignal.timeout(8000),
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(body?.error?.message || "Google sheet update failed.");
  }
  return body;
}

async function firstSheetTitle(token) {
  if (cachedTitle) return cachedTitle;
  const data = await sheetsFetch(token, "?fields=sheets.properties.title");
  cachedTitle = data.sheets?.[0]?.properties?.title || "Sheet1";
  return cachedTitle;
}

async function sheetState(token, title) {
  const data = await sheetsFetch(token, `/values/${encodeURIComponent(`${title}!A:H`)}`);
  const values = data.values || [];
  const ids = new Set();
  for (const row of values) {
    const id = String(row[7] || "");
    if (/^\d+$/.test(id)) ids.add(id);
  }
  return { headerMissing: values.length === 0, ids };
}

async function appendRows(token, title, rows) {
  if (!rows.length) return;
  const range = encodeURIComponent(`${title}!A:H`);
  await sheetsFetch(token, `/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`, {
    method: "POST",
    body: JSON.stringify({ values: rows }),
  });
}

async function copyRows(rows) {
  const credentials = account();
  if (!credentials) return false;
  const token = await accessToken(credentials);
  const title = await firstSheetTitle(token);
  const state = await sheetState(token, title);
  const pending = rows.filter((row) => !state.ids.has(String(row[7])));
  const values = state.headerMissing ? [HEADERS, ...pending] : pending;
  await appendRows(token, title, values);
  return true;
}

export function copyGetStartedLead(lead) {
  return enqueue(() => copyRows([getStartedRow(lead)]));
}

export function syncGetStartedSheet() {
  return enqueue(async () => {
    if (!account()) return false;
    const [rows] = await getPool().query(
      `SELECT id, name, phone, email, city, interest, source_path, created_at
       FROM leads ORDER BY id`,
    );
    return copyRows(rows.map((row) => getStartedRow({
      id: row.id,
      name: row.name,
      phone: row.phone,
      email: row.email,
      city: row.city,
      interest: row.interest,
      sourcePath: row.source_path,
      createdAt: row.created_at,
    })));
  });
}
