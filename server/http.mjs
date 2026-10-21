import { createHash, randomBytes } from "node:crypto";

export class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

export function randomToken() {
  return randomBytes(32).toString("hex");
}

export function readCookies(request) {
  const header = request.headers.cookie || "";
  const cookies = {};
  for (const part of header.split(";")) {
    const eq = part.indexOf("=");
    if (eq === -1) continue;
    const key = part.slice(0, eq).trim();
    const value = part.slice(eq + 1).trim();
    if (!key) continue;
    try {
      cookies[key] = decodeURIComponent(value);
    } catch {
      cookies[key] = value;
    }
  }
  return cookies;
}

export function setCookie(response, name, value, { maxAge, httpOnly = true } = {}) {
  const secure = (process.env.APP_ORIGIN || "").startsWith("https://") ? "; Secure" : "";
  const cookie = [
    `${name}=${encodeURIComponent(value)}`,
    "Path=/",
    "SameSite=Lax",
    httpOnly ? "HttpOnly" : "",
    maxAge != null ? `Max-Age=${maxAge}` : "",
  ]
    .filter(Boolean)
    .join("; ") + secure;

  const existing = response.getHeader("Set-Cookie");
  if (!existing) response.setHeader("Set-Cookie", cookie);
  else if (Array.isArray(existing)) response.setHeader("Set-Cookie", [...existing, cookie]);
  else response.setHeader("Set-Cookie", [existing, cookie]);
}

export function clearCookie(response, name) {
  setCookie(response, name, "", { maxAge: 0 });
}

export function json(response, status, body, headers = {}) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    ...headers,
  });
  response.end(JSON.stringify(body));
}

export function redirect(response, location) {
  response.writeHead(302, { Location: location, "Cache-Control": "no-store" });
  response.end();
}

export function readJson(request, limit = 20_000) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    request.on("data", (chunk) => {
      size += chunk.length;
      if (size > limit) {
        reject(new HttpError(413, "Request body is too large"));
        request.destroy();
      } else {
        chunks.push(chunk);
      }
    });
    request.on("end", () => {
      if (!chunks.length) {
        resolve({});
        return;
      }
      try {
        const parsed = JSON.parse(Buffer.concat(chunks).toString("utf8"));
        if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
          reject(new HttpError(400, "Expected a JSON object"));
          return;
        }
        resolve(parsed);
      } catch {
        reject(new HttpError(400, "Invalid JSON"));
      }
    });
    request.on("error", reject);
  });
}

export function text(value, max) {
  return String(value ?? "").trim().slice(0, max);
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^[0-9]{10}$/;

export function requireEmail(value) {
  const email = text(value, 190).toLowerCase();
  if (!EMAIL.test(email)) throw new HttpError(400, "Enter a valid email address.");
  return email;
}

export function requirePhone(value) {
  const phone = text(value, 20).replace(/\s+/g, "");
  if (!PHONE.test(phone)) throw new HttpError(400, "Enter a valid 10-digit phone number.");
  return phone;
}

export function requireName(value) {
  const name = text(value, 120);
  if (name.length < 2) throw new HttpError(400, "Enter your name.");
  return name;
}

export function appOrigin() {
  return (process.env.APP_ORIGIN || "http://127.0.0.1:8443").replace(/\/$/, "");
}
