import { useCallback, useEffect, useRef, useState } from "react";
import { Outlet } from "react-router";
import { CalculatorUserProvider, type CalculatorUser } from "../calculators/user";

const emptyForm = { name: "", email: "", phone: "", location: "" };
const UNLOCK_KEY = "ma-calculator-report-unlocked";

const styles = `
.calculator-report-backdrop{position:fixed;inset:0;z-index:800;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(9,21,64,.55)}
.calculator-report-card{width:min(520px,100%);padding:28px;border:1px solid #e3e8f4;border-radius:24px;background:#fff;box-shadow:0 12px 32px rgba(13,30,82,.18);font-family:Montserrat,system-ui,sans-serif;color:#111827}
.calculator-report-card h2{margin:0;color:#091540;font-size:24px;font-weight:800;line-height:1.2}
.calculator-report-intro{margin:8px 0 18px;color:#4b5563;font-size:14px;line-height:1.5}
.calculator-report-form{display:grid;gap:14px}
.calculator-report-field{display:grid;gap:6px}
.calculator-report-field label{color:#091540;font-size:13px;font-weight:700}
.calculator-report-field input{width:100%;height:46px;padding:0 12px;border:1px solid #d1d5db;border-radius:10px;background:#fff;color:#111827;font:inherit}
.calculator-report-field input:focus{outline:3px solid rgba(26,59,159,.16);border-color:#1a3b9f}
.calculator-report-actions{display:flex;justify-content:flex-end;gap:10px}
.calculator-report-submit,.calculator-report-cancel{min-height:44px;padding:0 16px;border-radius:10px;font:700 14px Montserrat,system-ui,sans-serif;cursor:pointer}
.calculator-report-submit{border:0;background:#8dc63f;color:#091540}
.calculator-report-submit:disabled{background:#d1d5db;color:#6b7280;cursor:not-allowed}
.calculator-report-cancel{border:1px solid #d1d5db;background:#fff;color:#374151}
.calculator-report-error{margin:0;color:#b91c1c;font-size:13px}
`;

export default function CalculatorEntryGate() {
  const [user, setUser] = useState<CalculatorUser | null>(null);
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem(UNLOCK_KEY) === "1");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const pending = useRef<((value: CalculatorUser | null) => void) | null>(null);
  const profileReady = useRef(false);
  const profileWaiters = useRef<Array<() => void>>([]);
  const userRef = useRef(user);
  const unlockedRef = useRef(unlocked);
  userRef.current = user;
  unlockedRef.current = unlocked;

  useEffect(() => {
    let cancelled = false;
    fetch("/api/calculator-profile")
      .then(async (response) => {
        if (!response.ok) return;
        const body = await response.json();
        if (cancelled || !body?.name || !body?.email) return;
        const saved = {
          name: String(body.name),
          email: String(body.email),
          phone: String(body.phone || ""),
          location: String(body.location || ""),
        };
        setUser(saved);
        setForm(saved);
      })
      .catch(() => undefined)
      .finally(() => {
        if (cancelled) return;
        profileReady.current = true;
        profileWaiters.current.splice(0).forEach((resolve) => resolve());
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const closeForm = useCallback(() => {
    setOpen(false);
    pending.current?.(null);
    pending.current = null;
  }, []);

  const requestReport = useCallback(async () => {
    if (!profileReady.current) {
      await new Promise<void>((resolve) => profileWaiters.current.push(resolve));
    }
    if (unlockedRef.current && userRef.current) return userRef.current;
    return new Promise<CalculatorUser | null>((resolve) => {
      pending.current?.(null);
      pending.current = resolve;
      setForm((current) => ({
        name: current.name || userRef.current?.name || "",
        email: current.email || userRef.current?.email || "",
        phone: current.phone || userRef.current?.phone || "",
        location: current.location || userRef.current?.location || "",
      }));
      setError("");
      setOpen(true);
    });
  }, []);

  const update = (key: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((current) => ({ ...current, [key]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      const response = await fetch("/api/calculator-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          location: form.location.trim(),
        }),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body.error || "Those details could not be saved.");
      const saved = {
        name: String(body.name),
        email: String(body.email),
        phone: String(body.phone || ""),
        location: String(body.location || ""),
      };
      setUser(saved);
      setUnlocked(true);
      sessionStorage.setItem(UNLOCK_KEY, "1");
      setOpen(false);
      const resolve = pending.current;
      pending.current = null;
      resolve?.(saved);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Those details could not be saved.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <CalculatorUserProvider value={{ user, requestReport }}>
      <style>{styles}</style>
      <Outlet />
      {open && (
        <div className="calculator-report-backdrop" onClick={closeForm}>
          <section
            className="calculator-report-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="calculator-report-title"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 id="calculator-report-title">Save your calculation</h2>
            <p className="calculator-report-intro">
              Add your name, phone number, email ID, and current location. The report is emailed or saved on this device after you submit.
            </p>
            <form className="calculator-report-form" onSubmit={handleSubmit}>
              <div className="calculator-report-field">
                <label htmlFor="calculator-report-name">Name</label>
                <input id="calculator-report-name" name="name" autoComplete="name" value={form.name} onChange={update("name")} required autoFocus />
              </div>
              <div className="calculator-report-field">
                <label htmlFor="calculator-report-phone">Phone number</label>
                <input id="calculator-report-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="Enter your phone number" value={form.phone} onChange={update("phone")} required />
              </div>
              <div className="calculator-report-field">
                <label htmlFor="calculator-report-email">Email ID</label>
                <input id="calculator-report-email" name="email" type="email" autoComplete="email" value={form.email} onChange={update("email")} required />
              </div>
              <div className="calculator-report-field">
                <label htmlFor="calculator-report-location">Current location</label>
                <input id="calculator-report-location" name="location" autoComplete="address-level2" placeholder="Enter your current city" value={form.location} onChange={update("location")} required />
              </div>
              {error && <p className="calculator-report-error" role="alert">{error}</p>}
              <div className="calculator-report-actions">
                <button className="calculator-report-cancel" type="button" onClick={closeForm}>Cancel</button>
                <button className="calculator-report-submit" type="submit" disabled={saving}>{saving ? "Saving…" : "Submit"}</button>
              </div>
            </form>
          </section>
        </div>
      )}
    </CalculatorUserProvider>
  );
}
