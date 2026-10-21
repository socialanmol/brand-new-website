import { isIP } from "node:net";
import { HttpError, appOrigin } from "./http.mjs";

const buckets = new Map();

export function clientKey(request) {
  const remote = request.socket?.remoteAddress || "";
  const loopback = remote === "127.0.0.1" || remote === "::1" || remote === "::ffff:127.0.0.1";
  if (loopback) {
    const hops = String(request.headers["x-forwarded-for"] || "")
      .split(",")
      .map((part) => part.trim())
      .filter((part) => isIP(part));
    if (hops.length) return hops[hops.length - 1];
  }
  return remote || "local";
}

export function rateLimit(request, bucket, limit, windowMs) {
  const now = Date.now();
  const key = `${bucket}:${clientKey(request)}`;
  const recent = (buckets.get(key) || []).filter((stamp) => now - stamp < windowMs);
  if (recent.length >= limit) {
    buckets.set(key, recent);
    throw new HttpError(429, "Too many requests. Please wait and try again.");
  }
  recent.push(now);
  buckets.set(key, recent);
}

export function assertSameOrigin(request) {
  if (request.headers["sec-fetch-site"] === "cross-site") {
    throw new HttpError(403, "Request origin is not allowed.");
  }
  const origin = request.headers.origin;
  if (!origin) return;

  let originUrl;
  try {
    originUrl = new URL(origin);
  } catch {
    throw new HttpError(403, "Request origin is not allowed.");
  }
  if (originUrl.origin === appOrigin()) return;

  const originHost = originUrl.hostname.toLowerCase();
  const requestHost = String(request.headers.host || "").trim().toLowerCase().replace(/:\d+$/, "");
  if (originHost && originHost === requestHost) return;
  if (isLocal(originHost) && isLocal(requestHost)) return;
  throw new HttpError(403, "Request origin is not allowed.");
}

function isLocal(hostname) {
  return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1";
}
