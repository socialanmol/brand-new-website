// The API token and URL are not stored in this file.
// Set them in the server .env, then restart the API:
//   SANCHAY_API_URL=https://myanmol.sanchaycrm.com/api/v1/
//   SANCHAY_API_TOKEN=
// Optional: SANCHAY_LEAD_SOURCE, SANCHAY_LEAD_STATUS, SANCHAY_PRODUCT, SANCHAY_ASSIGNED_USER_ID

const warned = { missing: false };

function productCategories(lead) {
  const source = String(lead.interest || process.env.SANCHAY_PRODUCT || "");
  return source
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .join(",");
}

export function getStartedSanchayBody(lead) {
  const field_name_list = {
    last_name: lead.name,
    phone: lead.phone,
    email: lead.email,
    city: lead.city || "",
    product_category_c: productCategories(lead),
    lead_source: process.env.SANCHAY_LEAD_SOURCE || "Website",
    status: process.env.SANCHAY_LEAD_STATUS || "New",
  };
  if (process.env.SANCHAY_ASSIGNED_USER_ID) {
    field_name_list.assigned_user_id = process.env.SANCHAY_ASSIGNED_USER_ID;
  }
  return {
    module_name: "Lead",
    field_name_list,
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
    const savedName = String(body?.response_data?.last_name || body?.response_data?.name || "").trim();
    const savedId = String(body?.response_data?.id || "").trim();
    if (!response.ok || status >= 400) {
      console.error("Sanchay lead copy failed:", body?.message || response.status);
      return { ok: false, skipped: false };
    }
    if (!savedId && !savedName) {
      console.error("Sanchay lead copy failed: CRM did not return a lead id");
      return { ok: false, skipped: false };
    }
    console.log(`Sanchay lead copy saved ${savedId}`);
    return { ok: true, skipped: false, id: savedId };
  } catch (error) {
    console.error("Sanchay lead copy failed:", error instanceof Error ? error.message : "unknown");
    return { ok: false, skipped: false };
  }
}
