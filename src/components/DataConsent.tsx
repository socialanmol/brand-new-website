import { Link } from "react-router";

export function DataConsent({
  checked,
  onChange,
  id,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  id: string;
}) {
  return (
    <label htmlFor={id} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 12.5, lineHeight: 1.5, color: "#374151", fontWeight: 500 }}>
      <input
        id={id}
        name="consent"
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        required
        style={{ marginTop: 3, accentColor: "#1A3B9F", flexShrink: 0 }}
      />
      <span>
        I agree that MyAnmol may use the details in this form to respond to my request. I can withdraw this consent by emailing{" "}
        <a href="mailto:mutualfunds@myanmol.com" style={{ color: "#1A3B9F" }}>mutualfunds@myanmol.com</a>.
        {" "}Read the <Link to="/privacy-policy" style={{ color: "#1A3B9F" }}>Privacy Policy</Link>.
      </span>
    </label>
  );
}
