import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router";

type GoogleCredentialResponse = {
  credential?: string;
};

type CalculatorUser = {
  name: string;
  email: string;
  phone: string;
  location: string;
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
.calculator-google-button{min-height:44px}
.calculator-entry-form{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}
.calculator-entry-field{display:grid;gap:6px}
.calculator-entry-field label{color:#091540;font-size:13px;font-weight:700}
.calculator-entry-field input{width:100%;height:46px;padding:0 12px;border:1px solid #d1d5db;border-radius:10px;background:#fff;color:#111827;font:inherit}
.calculator-entry-field input:focus{outline:3px solid rgba(26,59,159,.16);border-color:#1a3b9f}
.calculator-entry-field input[readonly]{background:#f4f7fd;color:#4b5563}
.calculator-entry-submit{grid-column:1/-1;min-height:46px;padding:0 18px;border:0;border-radius:10px;background:#8dc63f;color:#091540;font:700 14px Montserrat,system-ui,sans-serif;cursor:pointer}
.calculator-entry-submit:disabled{background:#d1d5db;color:#6b7280;cursor:not-allowed}
.calculator-entry-error{margin:12px 0 0;color:#b91c1c;font-size:13px}
.calculator-personalized{max-width:1152px;margin:24px auto 0;padding:18px 22px;border:1px solid #dce5f6;border-radius:16px;background:#f4f7fd;color:#091540;font-family:Montserrat,system-ui,sans-serif;line-height:1.6}
.calculator-personalized h2{margin:0 0 4px;font-size:19px;font-weight:800}
.calculator-personalized p{margin:0;color:#374151;font-size:14px}
@media(max-width:560px){.calculator-entry-card{padding:24px 18px}.calculator-entry-form{grid-template-columns:1fr}.calculator-entry-submit{grid-column:auto}.calculator-personalized{margin:18px 16px 0;padding:16px}}
`;

export default function CalculatorEntryGate() {
  const [details, setDetails] = useState<CalculatorUser | null>(null);
  const [user, setUser] = useState<CalculatorUser | null>(null);
  const [error, setError] = useState("");
  const buttonRef = useRef<HTMLDivElement>(null);
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID?.trim();

  useEffect(() => {
    if (!clientId) {
      setError("Google sign-in is unavailable right now.");
      return;
    }

    let cancelled = false;
    const initializeGoogleSignIn = () => {
      if (cancelled || !buttonRef.current) return;
      const google = (window as Window & { google?: GoogleIdentityApi }).google;
      if (!google) {
        setError("Google sign-in is unavailable right now.");
        return;
      }

      google.accounts.id.initialize({
        client_id: clientId,
        callback: (response) => {
          if (!response.credential) {
            setError("Google sign-in could not be completed. Please try again.");
            return;
          }
          try {
            const profile = getGoogleProfile(response.credential);
            if (!profile.name || !profile.email) {
              setError("Your Google account did not provide a name and email address.");
              return;
            }
            setError("");
            setDetails({ name: profile.name, email: profile.email, phone: "", location: "" });
          } catch {
            setError("Google sign-in could not be completed. Please try again.");
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
      existingScript.addEventListener("error", () => setError("Google sign-in is unavailable right now."), { once: true });
    } else {
      const script = document.createElement("script");
      script.src = scriptUrl;
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogleSignIn;
      script.onerror = () => setError("Google sign-in is unavailable right now.");
      document.head.appendChild(script);
    }

    return () => {
      cancelled = true;
      if (buttonRef.current) buttonRef.current.replaceChildren();
    };
  }, [clientId]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!details) return;
    const formData = new FormData(event.currentTarget);
    setUser({
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      location: String(formData.get("location") ?? "").trim(),
    });
  };

  if (!user) {
    return (
      <>
        <style>{styles}</style>
        <section className="calculator-entry" aria-labelledby="calculator-entry-title">
          <div className="calculator-entry-card">
            <h1 id="calculator-entry-title">{details ? "A few details before you begin" : "Sign in to use the calculator"}</h1>
            <p className="calculator-entry-intro">
              {details
                ? "Your name and email are filled from your Google account."
                : "Continue with Google to fill your name and email, then add your contact details."}
            </p>
            {!details && <div className="calculator-google-button" ref={buttonRef} />}
            {error && <p className="calculator-entry-error" role="alert">{error}</p>}
            <form className="calculator-entry-form" onSubmit={handleSubmit}>
              <div className="calculator-entry-field">
                <label htmlFor="calculator-user-name">Name</label>
                <input id="calculator-user-name" name="name" autoComplete="name" value={details?.name ?? ""} readOnly={Boolean(details)} disabled={!details} required />
              </div>
              <div className="calculator-entry-field">
                <label htmlFor="calculator-user-phone">Contact number</label>
                <input id="calculator-user-phone" name="phone" type="tel" autoComplete="tel" minLength={8} maxLength={15} pattern="[+0-9() .-]{8,20}" placeholder="Enter your contact number" required />
              </div>
              <div className="calculator-entry-field">
                <label htmlFor="calculator-user-email">Email ID</label>
                <input id="calculator-user-email" name="email" type="email" autoComplete="email" value={details?.email ?? ""} readOnly={Boolean(details)} disabled={!details} required />
              </div>
              <div className="calculator-entry-field">
                <label htmlFor="calculator-user-location">Current location</label>
                <input id="calculator-user-location" name="location" autoComplete="address-level2" placeholder="Enter your current city" required />
              </div>
              <button className="calculator-entry-submit" type="submit" disabled={!details}>Enter the Calculator</button>
            </form>
          </div>
        </section>
      </>
    );
  }

  const firstName = user.name.split(/\s+/)[0];
  return (
    <>
      <style>{styles}</style>
      <aside className="calculator-personalized" aria-live="polite">
        <h2>Signed in with Google</h2>
        <p>
          You can now use the calculator and explore your results.
        </p>
      </aside>
      <Outlet />
    </>
  );
}
