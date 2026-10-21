import { requireEmail, text } from "./http.mjs";

export function acceptedGoogleProfile(profile, clientId) {
  if (!profile || typeof profile !== "object") return null;
  const issuer = profile.iss;
  const trustedIssuer = issuer === "accounts.google.com" || issuer === "https://accounts.google.com";
  const verified = profile.email_verified === true || profile.email_verified === "true";
  const expiresAt = Number(profile.exp);
  if (!trustedIssuer || profile.aud !== clientId || !profile.sub || !profile.email || !verified) return null;
  if (!Number.isFinite(expiresAt) || expiresAt * 1000 <= Date.now()) return null;

  let email;
  try {
    email = requireEmail(profile.email);
  } catch {
    return null;
  }
  const sub = text(profile.sub, 255);
  if (!sub) return null;
  return {
    sub,
    email,
    name: text(profile.name, 190) || email,
    picture: googlePicture(profile.picture),
  };
}

function googlePicture(value) {
  const picture = text(value, 500);
  if (!picture) return null;
  try {
    const url = new URL(picture);
    const host = url.hostname.toLowerCase();
    const allowed = host === "googleusercontent.com"
      || host.endsWith(".googleusercontent.com")
      || host === "ggpht.com"
      || host.endsWith(".ggpht.com");
    if (url.protocol !== "https:" || !allowed) return null;
    return url.toString();
  } catch {
    return null;
  }
}
