import { useState, type FormEvent } from "react";
import { Outlet } from "react-router";

type UserDetails = {
  name: string;
  phone: string;
  email: string;
  city: string;
};

const styles = `
.calculator-entry{max-width:760px;margin:40px auto;padding:0 20px;font-family:Montserrat,system-ui,sans-serif;color:#111827}
.calculator-entry-card{padding:32px;border:1px solid #e3e8f4;border-radius:24px;background:#fff;box-shadow:0 12px 32px rgba(13,30,82,.08)}
.calculator-entry h1{margin:0;color:#091540;font-size:clamp(24px,4vw,34px);font-weight:800;line-height:1.2}
.calculator-entry-intro{margin:10px 0 24px;color:#4b5563;font-size:14px;line-height:1.6}
.calculator-entry-form{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}
.calculator-entry-field{display:grid;gap:6px}
.calculator-entry-field label{color:#091540;font-size:13px;font-weight:700}
.calculator-entry-field input{width:100%;height:46px;padding:0 12px;border:1px solid #d1d5db;border-radius:10px;background:#fff;color:#111827;font:inherit}
.calculator-entry-field input:focus{outline:3px solid rgba(26,59,159,.16);border-color:#1a3b9f}
.calculator-entry-submit{grid-column:1/-1;min-height:46px;padding:0 18px;border:0;border-radius:10px;background:#8dc63f;color:#091540;font:700 14px Montserrat,system-ui,sans-serif;cursor:pointer}
.calculator-entry-error{grid-column:1/-1;margin:0;color:#b91c1c;font-size:13px}
.calculator-personalized{max-width:1152px;margin:24px auto 0;padding:18px 22px;border:1px solid #dce5f6;border-radius:16px;background:#f4f7fd;color:#091540;font-family:Montserrat,system-ui,sans-serif;line-height:1.6}
.calculator-personalized h2{margin:0 0 4px;font-size:19px;font-weight:800}
.calculator-personalized p{margin:0;color:#374151;font-size:14px}
@media(max-width:560px){.calculator-entry-card{padding:24px 18px}.calculator-entry-form{grid-template-columns:1fr}.calculator-entry-submit,.calculator-entry-error{grid-column:auto}.calculator-personalized{margin:18px 16px 0;padding:16px}}
`;

export default function CalculatorEntryGate() {
  const [user, setUser] = useState<UserDetails | null>(null);
  const [phoneError, setPhoneError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const details: UserDetails = {
      name: String(formData.get("name") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      city: String(formData.get("city") ?? "").trim(),
    };
    const phoneDigits = details.phone.replace(/\D/g, "");

    if (phoneDigits.length < 8 || phoneDigits.length > 15) {
      setPhoneError("Enter a valid contact number with 8 to 15 digits.");
      return;
    }

    setPhoneError("");
    setUser(details);
  };

  if (!user) {
    return (
      <>
        <style>{styles}</style>
        <section className="calculator-entry" aria-labelledby="calculator-entry-title">
          <div className="calculator-entry-card">
            <h1 id="calculator-entry-title">A quick introduction before you begin</h1>
            <p className="calculator-entry-intro">
              Enter your details to view and personalize your calculator. Your details stay in this browser session and are not sent or saved.
            </p>
            <form className="calculator-entry-form" onSubmit={handleSubmit}>
              <div className="calculator-entry-field">
                <label htmlFor="calculator-user-name">Name</label>
                <input id="calculator-user-name" name="name" autoComplete="name" required />
              </div>
              <div className="calculator-entry-field">
                <label htmlFor="calculator-user-phone">Contact number</label>
                <input id="calculator-user-phone" name="phone" type="tel" autoComplete="tel" required aria-describedby={phoneError ? "calculator-phone-error" : undefined} />
              </div>
              <div className="calculator-entry-field">
                <label htmlFor="calculator-user-email">Email ID</label>
                <input id="calculator-user-email" name="email" type="email" autoComplete="email" required />
              </div>
              <div className="calculator-entry-field">
                <label htmlFor="calculator-user-city">Current city</label>
                <input id="calculator-user-city" name="city" autoComplete="address-level2" required />
              </div>
              {phoneError && <p className="calculator-entry-error" id="calculator-phone-error" role="alert">{phoneError}</p>}
              <button className="calculator-entry-submit" type="submit">View Calculator</button>
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
        <h2>Heyy {firstName},</h2>
        <p>
          Play around with the calculator and if you love the estimated results, feel free to download the free PDF version / email of your analysis.
        </p>
      </aside>
      <Outlet />
    </>
  );
}
