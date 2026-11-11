const warned = { missing: false };

export function getStartedAlertName(lead) {
  const interests = String(lead.interest || "").trim() || "Not specified";
  return `NEW-CLIENT-ALERT: ${lead.name} | ${interests}`;
}

export function getStartedSanchayBody(lead) {
  const note = [
    `City: ${lead.city || "—"}`,
    `Page: ${lead.sourcePath || "—"}`,
    `Interests: ${lead.interest || "—"}`,
  ].join("\n");
  const body = {
    module_name: "Lead",
    name: getStartedAlertName(lead),
    phone: lead.phone,
    email: lead.email,
    status: process.env.SANCHAY_LEAD_STATUS || "New",
    lead_source: process.env.SANCHAY_LEAD_SOURCE || "Website",
    description: note,
    comment: note,
  };
  if (lead.city) body.city = lead.city;
  if (process.env.SANCHAY_PRODUCT) body.product_sub_category = process.env.SANCHAY_PRODUCT;
  if (process.env.SANCHAY_ASSIGNED_USER_ID) body.assigned_user_id = process.env.SANCHAY_ASSIGNED_USER_ID;
  return body;
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

export function seminarSanchayBody(registration) {
  const note = [
    `Seminar: ${registration.title || "—"}`,
    `Slot: ${registration.slot || "—"}`,
    `Location: ${registration.location || "—"}`,
    `Poll: ${registration.poll || "—"}`,
    `Page: ${registration.sourcePath || "—"}`,
  ].join("\n");
  const body = {
    module_name: "Lead",
    name: `WEBINAR: ${registration.name} | ${registration.title || "Seminar"}`,
    phone: registration.phone,
    email: registration.email,
    status: process.env.SANCHAY_LEAD_STATUS || "New",
    lead_source: process.env.SANCHAY_LEAD_SOURCE || "Website",
    description: note,
    comment: note,
  };
  if (process.env.SANCHAY_PRODUCT) body.product_sub_category = process.env.SANCHAY_PRODUCT;
  if (process.env.SANCHAY_ASSIGNED_USER_ID) body.assigned_user_id = process.env.SANCHAY_ASSIGNED_USER_ID;
  return body;
}

async function postSanchayLead(body) {
  const url = sanchaySaveUrl();
  const token = authorization();
  if (!url || !token) {
    if (!warned.missing) {
      warned.missing = true;
      console.error("Website responses stay in the database until SANCHAY_API_URL and SANCHAY_API_TOKEN are set.");
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
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(8000),
    });
    const payload = await response.json().catch(() => ({}));
    const status = Number(payload?.status || response.status);
    const savedName = String(payload?.response_data?.name || "").trim();
    const savedId = String(payload?.response_data?.id || "").trim();
    if (!response.ok || status >= 400) {
      console.error("Sanchay lead copy failed:", payload?.message || response.status);
      return { ok: false, skipped: false };
    }
    if (!savedName) {
      console.error("Sanchay lead copy failed: CRM saved a lead with a blank name");
      return { ok: false, skipped: false };
    }
    console.log(`Sanchay lead copy saved ${savedId}`);
    return { ok: true, skipped: false, id: savedId };
  } catch (error) {
    console.error("Sanchay lead copy failed:", error instanceof Error ? error.message : "unknown");
    return { ok: false, skipped: false };
  }
}

export function copyGetStartedLead(lead) {
  return postSanchayLead(getStartedSanchayBody(lead));
}

export function copySeminarRegistration(registration) {
  return postSanchayLead(seminarSanchayBody(registration));
}
