export async function saveForm(form: string, fields: Record<string, string | boolean>) {
  const response = await fetch("/api/forms", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ form, fields, sourcePath: window.location.pathname }),
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(typeof body.error === "string" ? body.error : "We could not save your details. Please try again.");
  }
}
