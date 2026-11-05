const warned = { missing: false };

export function getStartedAlertName(lead) {
  const interests = String(lead.interest || "").trim() || "Not specified";
  return `NEW-CLIENT-ALERT: ${lead.name} | ${interests}`;
}

export function getStartedSanchayBody(lead) {
  const fields = {
    last_name: getStartedAlertName(lead),
    phone_primary: lead.phone,
    email_primary: lead.email,
    status: process.env.SANCHAY_LEAD_STATUS || "New",
    lead_source: process.env.SANCHAY_LEAD_SOURCE || "Website",
    description: [
      `City: ${lead.city || "—"}`,
      `Page: ${lead.sourcePath || "—"}`,
      `Interests: ${lead.interest || "—"}`,
    ].join("\n"),
  };
  if (process.env.SANCHAY_PRODUCT) fields.product_sub_category = process.env.SANCHAY_PRODUCT;
  if (process.env.SANCHAY_ASSIGNED_USER_ID) fields.assigned_user_id = process.env.SANCHAY_ASSIGNED_USER_ID;
  return {
    module_name: "Lead",
    name_value_list: fields,
  };
}

export function sanchaySaveUrl() {
  const raw = String(process.env.SANCHAY_API_URL || "").trim().replace(/\/+$/, "");
  if (!raw) return "";
  if (/save-data$/i.test(raw)) return raw;
  if (/\/api\/v1$/i.test(raw)) return `${raw}/save-data`;
  return `${raw}/api/v1/save-data`;
}

function authorization() {
  const token = String(process.env.SANCHAY_API_TOKEN || "").trim();
  if (!token) return "";
  return /^bearer\s+/i.test(token) ? token : `Bearer ${token}`;
}

export async function copyGetStartedLead(lead) {
  const url = sanchaySaveUrl();
  const token = authorization();
  if (!url || !token) {
    if (!warned.missing) {
      warned.missing = true;
      console.error("Get Started responses stay in the database until SANCHAY_API_URL and SANCHAY_API_TOKEN are set.");
    }
    return { ok: false, skipped: true };
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(getStartedSanchayBody(lead)),
      signal: AbortSignal.timeout(8000),
    });
    const body = await response.json().catch(() => ({}));
    const status = Number(body?.status || response.status);
    if (!response.ok || status >= 400) {
      console.error("Sanchay lead copy failed:", body?.message || response.status);
      return { ok: false, skipped: false };
    }
    console.log("Sanchay lead copy saved");
    return { ok: true, skipped: false };
  } catch (error) {
    console.error("Sanchay lead copy failed:", error instanceof Error ? error.message : "unknown");
    return { ok: false, skipped: false };
  }
}
