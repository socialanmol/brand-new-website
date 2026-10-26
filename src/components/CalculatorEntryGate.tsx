import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router";
import { CalculatorUserProvider, type CalculatorUser } from "../calculators/user";

type GoogleCredentialResponse = {
  credential?: string;
};

type GoogleProfile = {
  name?: string;
  email?: string;
};

type GoogleIdentityApi = {
  accounts: {
    id: {
      initialize: (options: {
        client_id: string;
        callback: (response: GoogleCredentialResponse) => void;
      }) => void;
      renderButton: (element: HTMLElement, options: {
        theme: "outline";
        size: "large";
        text: "signin_with";
        shape: "rectangular";
        width: number;
      }) => void;
    };
  };
};

const emptyForm = { name: "", email: "", phone: "", location: "" };

function getGoogleProfile(credential: string): GoogleProfile {
  const payload = credential.split(".")[1];
  if (!payload) throw new Error("Invalid Google credential");
  const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
  const paddedBase64 = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
  const bytes = Uint8Array.from(atob(paddedBase64), (character) => character.charCodeAt(0));
  return JSON.parse(new TextDecoder().decode(bytes)) as GoogleProfile;
}

const styles = `
.calculator-entry{max-width:760px;margin:40px auto;padding:0 20px;font-family:Montserrat,system-ui,sans-serif;color:#111827}
.calculator-entry-card{padding:32px;border:1px solid #e3e8f4;border-radius:24px;background:#fff;box-shadow:0 12px 32px rgba(13,30,82,.08)}
.calculator-entry h1{margin:0;color:#091540;font-size:clamp(24px,4vw,34px);font-weight:800;line-height:1.2}
.calculator-entry-intro{margin:10px 0 24px;color:#4b5563;font-size:14px;line-height:1.6}
.calculator-google-button{min-height:44px;margin-bottom:16px}
.calculator-entry-form{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}
.calculator-entry-field{display:grid;gap:6px}
.calculator-entry-field label{color:#091540;font-size:13px;font-weight:700}
.calculator-entry-field input{width:100%;height:46px;padding:0 12px;border:1px solid #d1d5db;border-radius:10px;background:#fff;color:#111827;font:inherit}
.calculator-entry-field input:focus{outline:3px solid rgba(26,59,159,.16);border-color:#1a3b9f}
.calculator-entry-submit{grid-column:1/-1;min-height:46px;padding:0 18px;border:0;border-radius:10px;background:#8dc63f;color:#091540;font:700 14px Montserrat,system-ui,sans-serif;cursor:pointer}
.calculator-entry-submit:disabled{background:#d1d5db;color:#6b7280;cursor:not-allowed}
.calculator-entry-error{margin:12px 0 0;color:#b91c1c;font-size:13px}
@media(max-width:560px){.calculator-entry-card{padding:24px 18px}.calculator-entry-form{grid-template-columns:1fr}.calculator-entry-submit{grid-column:auto}}
`;

export default function CalculatorEntryGate() {
  const [user, setUser] = useState<CalculatorUser | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [ready, setReady] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID?.trim();

  useEffect(() => {
    let cancelled = false;
    fetch("/api/calculator-profile")
      .then(async (response) => {
        if (!response.ok) return;
        const body = await response.json();
        if (!cancelled && body?.name && body?.email) {
          setUser({
            name: String(body.name),
            email: String(body.email),
            phone: String(body.phone || ""),
            location: String(body.location || ""),
          });
        }
      })
      .catch(() => undefined)
      .finally(() => {
        if (!cancelled) setReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!clientId || user) return;
    let cancelled = false;
    const initializeGoogleSignIn = () => {
      if (cancelled || !buttonRef.current) return;
      const google = (window as Window & { google?: GoogleIdentityApi }).google;
      if (!google) return;
      google.accounts.id.initialize({
        client_id: clientId,
        callback: (response) => {
          if (!response.credential) return;
          try {
            const profile = getGoogleProfile(response.credential);
            setForm((current) => ({
              ...current,
              name: profile.name || current.name,
              email: profile.email || current.email,
            }));
            setError("");
          } catch {
            setError("Google could not fill your name and email. You can type them instead.");
          }
        },
      });
      google.accounts.id.renderButton(buttonRef.current, {
        theme: "outline",
        size: "large",
        text: "signin_with",
        shape: "rectangular",
        width: 280,
      });
    };

    const scriptUrl = "https://accounts.google.com/gsi/client";
    const existingScript = document.querySelector<HTMLScriptElement>(`script[src="${scriptUrl}"]`);
    if ((window as Window & { google?: GoogleIdentityApi }).google) {
      initializeGoogleSignIn();
    } else if (existingScript) {
      existingScript.addEventListener("load", initializeGoogleSignIn, { once: true });
    } else {
      const script = document.createElement("script");
      script.src = scriptUrl;
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogleSignIn;
      document.head.appendChild(script);
    }

    return () => {
      cancelled = true;
      if (buttonRef.current) buttonRef.current.replaceChildren();
    };
  }, [clientId, user]);

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
      setUser({
        name: String(body.name),
        email: String(body.email),
        phone: String(body.phone || ""),
        location: String(body.location || ""),
      });
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Those details could not be saved.");
    } finally {
      setSaving(false);
    }
  };

  if (!ready) {
    return (
      <>
        <style>{styles}</style>
        <section className="calculator-entry"><p className="calculator-entry-intro">Loading the calculator…</p></section>
      </>
    );
  }

  if (!user) {
    return (
      <>
        <style>{styles}</style>
        <section className="calculator-entry" aria-labelledby="calculator-entry-title">
          <div className="calculator-entry-card">
            <h1 id="calculator-entry-title">A few details before you begin</h1>
            <p className="calculator-entry-intro">
              Add your name, phone, email and city. The email on this form is where the calculator sends your report, and Download PDF saves the same report on this device.
            </p>
            {clientId && <div className="calculator-google-button" ref={buttonRef} />}
            <form className="calculator-entry-form" onSubmit={handleSubmit}>
              <div className="calculator-entry-field">
                <label htmlFor="calculator-user-name">Name</label>
                <input id="calculator-user-name" name="name" autoComplete="name" value={form.name} onChange={update("name")} required />
              </div>
              <div className="calculator-entry-field">
                <label htmlFor="calculator-user-phone">Contact number</label>
                <input id="calculator-user-phone" name="phone" type="tel" autoComplete="tel" minLength={8} maxLength={15} pattern="[+0-9() .-]{8,20}" placeholder="Enter your contact number" value={form.phone} onChange={update("phone")} required />
              </div>
              <div className="calculator-entry-field">
                <label htmlFor="calculator-user-email">Email ID</label>
                <input id="calculator-user-email" name="email" type="email" autoComplete="email" value={form.email} onChange={update("email")} required />
              </div>
              <div className="calculator-entry-field">
                <label htmlFor="calculator-user-location">Current location</label>
                <input id="calculator-user-location" name="location" autoComplete="address-level2" placeholder="Enter your current city" value={form.location} onChange={update("location")} required />
              </div>
              <button className="calculator-entry-submit" type="submit" disabled={saving}>{saving ? "Saving…" : "Enter the Calculator"}</button>
            </form>
            {error && <p className="calculator-entry-error" role="alert">{error}</p>}
          </div>
        </section>
      </>
    );
  }

  return (
    <CalculatorUserProvider user={user}>
      <style>{styles}</style>
      <Outlet />
    </CalculatorUserProvider>
  );
}
