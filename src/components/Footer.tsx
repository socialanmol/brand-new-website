/**
 * MyAnmolFooter.tsx
 * ---------------------------------------------------------------------------
 * Site footer for MyAnmol (Anmol Share Broking Pvt. Ltd.)
 */

import React from "react"
import logoSrc from "@/imports/myanmolylogo.png"

/* ------------------------------------------------------------------ types */

export interface FooterLink {
  label: string
  href: string
}

export interface SocialLink {
  network: "instagram" | "facebook" | "x" | "linkedin" | "youtube" | "whatsapp"
  href: string
  label?: string
}

export interface MyAnmolFooterProps {
  arn?: string
  initialRegistration?: string
  arnValidUntil?: string
  pmsRegistration?: string
  appStoreUrl?: string
  playStoreUrl?: string
  legalLinks?: FooterLink[]
  socials?: SocialLink[]
  year?: number
  className?: string
}

/* --------------------------------------------------------------- defaults */

const DEFAULT_LEGAL_LINKS: FooterLink[] = [
  { label: "Terms and Conditions", href: "/terms-and-conditions" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Disclosures", href: "/disclosures" },
]

const DEFAULT_SOCIALS: SocialLink[] = [
  {
    network: "instagram",
    href: "https://www.instagram.com/myanmol/",
    label: "Instagram",
  },
  {
    network: "facebook",
    href: "https://www.facebook.com/AnmolShare/",
    label: "Facebook",
  },
  { network: "x", href: "https://x.com/AnmolShare", label: "X" },
  {
    network: "linkedin",
    href: "https://in.linkedin.com/company/myanmol",
    label: "LinkedIn",
  },
  {
    network: "youtube",
    href: "https://www.youtube.com/@myanmol6150/",
    label: "YouTube",
  },
  {
    network: "whatsapp",
    href: "https://wa.me/919742826665",
    label: "WhatsApp",
  },
]

const PILLARS = [
  { index: "01", title: "Save", lead: "A steady", tail: "foundation" },
  { index: "02", title: "Insure", lead: "Shield", tail: "what matters" },
  { index: "03", title: "Invest", lead: "Grow", tail: "for tomorrow" },
  { index: "04", title: "Grow", lead: "Multiply", tail: "your Wealth" },
]

/* ------------------------------------------------------------------ icons */

const SocialGlyph: React.FC<{ network: SocialLink["network"] }> = ({
  network,
}) => {
  const common = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": true as const,
    focusable: "false" as const,
  }

  switch (network) {
    case "instagram":
      return (
        <svg {...common}>
          <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.8 3.8 0 0 1-1.38-.9 3.8 3.8 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 1.98c-3.14 0-3.5.01-4.74.07-1.15.05-1.77.24-2.18.4-.55.21-.94.47-1.35.88-.41.41-.67.8-.88 1.35-.16.41-.35 1.03-.4 2.18-.06 1.24-.07 1.6-.07 4.74s.01 3.5.07 4.74c.05 1.15.24 1.77.4 2.18.21.55.47.94.88 1.35.41.41.8.67 1.35.88.41.16 1.03.35 2.18.4 1.24.06 1.6.07 4.74.07s3.5-.01 4.74-.07c1.15-.05 1.77-.24 2.18-.4.55-.21.94-.47 1.35-.88.41-.41.67-.8.88-1.35.16-.41.35-1.03.4-2.18.06-1.24.07-1.6.07-4.74s-.01-3.5-.07-4.74c-.05-1.15-.24-1.77-.4-2.18a3.6 3.6 0 0 0-.88-1.35 3.6 3.6 0 0 0-1.35-.88c-.41-.16-1.03-.35-2.18-.4-1.24-.06-1.6-.07-4.74-.07Zm0 3.37a4.49 4.49 0 1 1 0 8.98 4.49 4.49 0 0 1 0-8.98Zm0 7.4a2.91 2.91 0 1 0 0-5.82 2.91 2.91 0 0 0 0 5.82Zm5.72-7.6a1.05 1.05 0 1 1-2.1 0 1.05 1.05 0 0 1 2.1 0Z" />
        </svg>
      )
    case "facebook":
      return (
        <svg {...common}>
          <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.63A22 22 0 0 0 14.3 3.5c-2.4 0-4.05 1.47-4.05 4.16V9.9H7.5V13h2.75v8h3.25Z" />
        </svg>
      )
    case "x":
      return (
        <svg {...common}>
          <path d="M17.53 3h3.05l-6.66 7.61L21.75 21h-6.13l-4.8-6.28L5.32 21H2.27l7.12-8.14L2.25 3h6.29l4.34 5.74L17.53 3Zm-1.07 16.17h1.69L7.62 4.74H5.81l10.65 14.43Z" />
        </svg>
      )
    case "linkedin":
      return (
        <svg {...common}>
          <path d="M6.94 8.75V20H3.5V8.75h3.44ZM5.22 3.5c1.1 0 1.97.87 1.97 1.94 0 1.06-.87 1.94-1.97 1.94-1.09 0-1.97-.88-1.97-1.94 0-1.07.88-1.94 1.97-1.94ZM20.5 20h-3.44v-5.87c0-1.47-.53-2.47-1.84-2.47-1 0-1.6.68-1.87 1.34-.1.24-.12.57-.12.9V20H9.79s.05-10.2 0-11.25h3.44v1.6c.46-.71 1.28-1.72 3.11-1.72 2.27 0 3.97 1.48 3.97 4.68V20Z" />
        </svg>
      )
    case "youtube":
      return (
        <svg {...common}>
          <path d="M21.58 7.2a2.5 2.5 0 0 0-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.82.43A2.5 2.5 0 0 0 2.42 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .42 4.8 2.5 2.5 0 0 0 1.76 1.77C5.75 19 12 19 12 19s6.25 0 7.82-.43a2.5 2.5 0 0 0 1.76-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.42-4.8ZM10.05 15V9l5.2 3-5.2 3Z" />
        </svg>
      )
    case "whatsapp":
      return (
        <svg {...common}>
          <path d="M12.03 3C7.06 3 3.02 7.03 3.02 12c0 1.6.42 3.1 1.16 4.4L3 21l4.75-1.24A9 9 0 0 0 12.03 21c4.97 0 9-4.03 9-9s-4.03-9-9-9Zm0 16.4a7.4 7.4 0 0 1-3.77-1.03l-.27-.16-2.82.74.75-2.75-.18-.28a7.4 7.4 0 1 1 6.29 3.48Zm4.07-5.54c-.22-.11-1.32-.65-1.52-.73-.2-.07-.35-.11-.5.11-.15.23-.58.73-.71.88-.13.15-.26.17-.48.06-.22-.11-.94-.35-1.79-1.1-.66-.59-1.11-1.32-1.24-1.54-.13-.22-.01-.34.1-.45.1-.1.22-.26.33-.39.11-.13.15-.23.22-.38.07-.15.04-.28-.02-.39-.06-.11-.5-1.2-.68-1.65-.18-.43-.36-.37-.5-.38h-.42c-.15 0-.39.06-.59.28-.2.23-.77.76-.77 1.85s.79 2.15.9 2.3c.11.15 1.56 2.38 3.78 3.34.53.23.94.36 1.26.46.53.17 1.01.15 1.39.09.42-.06 1.32-.54 1.5-1.06.19-.52.19-.97.13-1.06-.05-.1-.2-.16-.42-.27Z" />
        </svg>
      )
    default:
      return null
  }
}

const AppleGlyph: React.FC = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M16.36 12.63c-.02-2.2 1.8-3.26 1.88-3.31-1.02-1.5-2.62-1.7-3.19-1.72-1.36-.14-2.65.8-3.34.8-.69 0-1.75-.78-2.87-.76-1.48.02-2.84.86-3.6 2.18-1.53 2.66-.39 6.6 1.1 8.76.73 1.06 1.6 2.24 2.75 2.2 1.1-.05 1.52-.71 2.85-.71 1.33 0 1.71.71 2.87.69 1.19-.02 1.94-1.07 2.66-2.13.84-1.22 1.19-2.4 1.21-2.46-.03-.01-2.31-.89-2.32-3.54ZM14.2 6.2c.6-.74 1.01-1.76.9-2.78-.87.04-1.93.58-2.56 1.31-.56.65-1.05 1.69-.92 2.69.97.07 1.96-.49 2.58-1.22Z" />
  </svg>
)

const PlayGlyph: React.FC = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M3.7 2.4a1 1 0 0 0-.5.88v17.44a1 1 0 0 0 .5.88l9.5-9.6-9.5-9.6Z"
      fill="#00D0FF"
    />
    <path
      d="m13.2 12 3.02-3.05 3.9 2.2c.78.44.78 1.26 0 1.7l-3.9 2.2L13.2 12Z"
      fill="#FFD400"
    />
    <path
      d="M3.2 20.72a1 1 0 0 0 1.03.06l12-6.73-3.03-3.05-10 9.72Z"
      fill="#FF3A44"
    />
    <path
      d="M4.23 2.22a1 1 0 0 0-1.03.06l10 9.72 3.03-3.05-12-6.73Z"
      fill="#00E676"
    />
  </svg>
)

const LogoMark: React.FC = () => (
  <span
    style={{
      width: 40,
      height: 40,
      borderRadius: 9,
      background: "var(--white, #FFFFFF)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 7,
      overflow: "hidden",
      flexShrink: 0,
    }}
  >
    <img
      src={logoSrc}
      width="26"
      height="26"
      alt="MyAnmol"
      style={{ objectFit: "contain" }}
    />
  </span>
)

/* ------------------------------------------------------------------ style */

const CSS = `
.ma-footer *,
.ma-footer *::before,
.ma-footer *::after { box-sizing: border-box; }

.ma-footer {
  --ma-bar:     var(--navy-deep, #091540);
  --ma-body:    var(--navy-dark, #0D1E52);
  --ma-raised:  color-mix(in srgb, var(--navy, #1A3B9F) 22%, var(--navy-deep, #091540));
  --ma-hover:   color-mix(in srgb, var(--navy, #1A3B9F) 38%, var(--navy-deep, #091540));
  --ma-rule:    color-mix(in srgb, var(--white, #fff) 12%, transparent);
  --ma-accent:  var(--lime, #8DC63F);
  --ma-fg:      var(--white, #FFFFFF);
  --ma-fg-mid:  color-mix(in srgb, var(--white, #fff) 68%, var(--navy, #1A3B9F));
  --ma-fg-soft: color-mix(in srgb, var(--white, #fff) 46%, var(--navy, #1A3B9F));

  --ma-gutter: clamp(28px, 5.5vw, 140px);
  --ma-max: none;

  background: var(--ma-body);
  color: var(--ma-fg);
  font-family: var(--fs, 'Nunito Sans', sans-serif);
  font-size: 15px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

@supports not (color: color-mix(in srgb, #000 50%, #fff)) {
  .ma-footer {
    --ma-raised:  #142455;
    --ma-hover:   #1C2F6B;
    --ma-rule:    rgba(255,255,255,.12);
    --ma-fg-mid:  #AEBBDF;
    --ma-fg-soft: #7B88B4;
    --ma-dot-ring: rgba(141,198,63,.20);
  }
}

.ma-footer .ma-inner {
  width: 100%;
  max-width: var(--ma-max, none);
  margin-inline: auto;
  padding-inline: var(--ma-gutter);
}

.ma-footer a { color: inherit; text-decoration: none; transition: color .18s ease; }
.ma-footer a:hover { color: var(--ma-accent); }
.ma-footer a:focus-visible {
  outline: 2px solid var(--ma-accent);
  outline-offset: 3px;
  border-radius: var(--r-sm, 8px);
}

/* --- credentials strip --- */
.ma-creds {
  overflow: hidden;
  
  background: var(--ma-bar);
  border-bottom: 1px solid var(--ma-rule);
}
.ma-creds-track {
  display: flex;
  width: max-content;
  animation: ma-creds-scroll 24s linear infinite;
  will-change: transform;
}
.ma-creds-row {
  display: flex;
  width: max-content;
  flex: none;
  flex-wrap: nowrap;
  gap: 8px 30px;
  padding: 11px max(var(--ma-gutter), 30px);
  font-size: 12.5px;
}
.ma-cred { display: inline-flex; align-items: center; gap: 8px; flex: none; white-space: nowrap; }
.ma-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: var(--ma-accent);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--lime, #8DC63F) 20%, transparent);
  flex: none;
}
.ma-cred b { font-weight: 700; letter-spacing: .01em; }
.ma-cred span { color: var(--ma-fg-soft); }
@keyframes ma-creds-scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
@media (prefers-reduced-motion: reduce) {
  .ma-creds-track { animation: none; }
  .ma-creds-row[aria-hidden="true"] { display: none; }
}

/* --- save · insure · invest · grow --- */
.ma-pillars-head { padding: 56px 0 30px; text-align: center; }
.ma-pillars-head h2 {
  margin: 0;
  font-family: var(--fd, 'Playfair Display', serif);
  font-weight: 700;
  font-size: clamp(30px, 3.6vw, 58px);
  letter-spacing: .01em;
  line-height: 1.14;
}
.ma-pillars-head p { margin: 10px 0 0; color: var(--ma-fg-mid); font-size: 14.5px; }
.ma-pillars-head p b { color: var(--ma-accent); font-weight: 700; font-style: italic; }

/* 4-column layout */
.ma-pillars {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-top: 1px solid var(--ma-rule);
  border-bottom: 1px solid var(--ma-rule);
}
.ma-pillar { padding: 26px 0 30px; }
.ma-pillar + .ma-pillar {
  border-left: 1px solid var(--ma-rule);
  padding-left: clamp(20px, 2.5vw, 48px);
}
.ma-pillar-i {
  display: block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .18em;
  color: var(--ma-accent);
  margin-bottom: 12px;
}
.ma-pillar h3 {
  margin: 0 0 4px;
  font-family: var(--fd, 'Playfair Display', serif);
  font-weight: 700;
  font-size: 21px;
  letter-spacing: .04em;
  text-transform: uppercase;
}
.ma-pillar p { margin: 0; font-size: 14px; color: var(--ma-fg-mid); }
.ma-pillar p b { color: var(--ma-accent); font-weight: 600; }

/* --- main grid --- */
.ma-main {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr;
  gap: clamp(32px, 5vw, 110px);
  padding-block: 46px 40px;
}

.ma-brand-row { display: flex; align-items: center; gap: 12px; }
.ma-brand-name {
  margin: 0;
  font-family: var(--fd, 'Playfair Display', serif);
  font-weight: 700;
  font-size: 22px;
  letter-spacing: .01em;
}
.ma-brand-sub {
  margin: 2px 0 0;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .22em;
  text-transform: uppercase;
  color: var(--ma-fg-soft);
}
.ma-brand-copy { margin: 18px 0 0; max-width: 30ch; font-size: 14px; color: var(--ma-fg-mid); }

.ma-stores { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 22px; }
.ma-store {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 9px 16px 9px 13px;
  border: 1px solid var(--ma-rule);
  border-radius: var(--r-sm, 8px);
  background: var(--ma-raised);
  transition: border-color .18s ease, background .18s ease, transform .18s ease;
}
.ma-store:hover {
  border-color: color-mix(in srgb, var(--lime, #8DC63F) 55%, transparent);
  background: var(--ma-hover);
  color: var(--ma-fg);
  transform: translateY(-1px);
}
.ma-store-lines { display: flex; flex-direction: column; line-height: 1.15; }
.ma-store-lines small { font-size: 9.5px; letter-spacing: .08em; color: var(--ma-fg-soft); }
.ma-store-lines strong { font-size: 13.5px; font-weight: 700; }

.ma-col-title {
  margin: 0 0 16px;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: .16em;
  text-transform: uppercase;
  color: var(--ma-accent);
}
.ma-facts { margin: 0; font-size: 13.5px; }
.ma-facts div { padding: 5px 0; }
.ma-facts dt { display: inline; color: var(--ma-fg); font-weight: 600; }
.ma-facts dd { display: inline; margin: 0; color: var(--ma-fg-mid); }
.ma-list { margin: 0; padding: 0; list-style: none; font-size: 13.5px; color: var(--ma-fg-mid); }
.ma-list li { padding: 5px 0; }
.ma-list li.ma-strong { color: var(--ma-fg); font-weight: 600; }

.ma-socials { display: flex; flex-wrap: wrap; gap: 9px; margin-top: 22px; }
.ma-social {
  width: 34px; height: 34px;
  display: inline-flex; align-items: center; justify-content: center;
  border-radius: 50%;
  background: var(--ma-raised);
  border: 1px solid var(--ma-rule);
  color: var(--ma-fg-mid);
  transition: color .18s ease, border-color .18s ease, transform .18s ease;
}
.ma-social:hover {
  color: var(--ma-accent);
  border-color: color-mix(in srgb, var(--lime, #8DC63F) 55%, transparent);
  transform: translateY(-1px);
}

/* --- legal links --- */
.ma-legal {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-top: 1px solid var(--ma-rule);
  border-bottom: 1px solid var(--ma-rule);
  text-align: center;
  font-size: 13.5px;
}
.ma-legal a { padding: 15px 8px; }
.ma-legal a + a { border-left: 1px solid var(--ma-rule); }

/* --- fine print --- */
.ma-fine { background: var(--ma-bar); }
.ma-fine-inner { padding-block: 22px 26px; }
.ma-fine p { margin: 0; font-size: 11.5px; line-height: 1.75; color: var(--ma-fg-soft); }
.ma-fine p b { color: var(--ma-fg-mid); font-weight: 700; }
.ma-fine p + p { margin-top: 8px; }

/* Responsive adjustments */
@media (max-width: 900px) {
  .ma-pillars {
    grid-template-columns: repeat(2, 1fr);
  }
  .ma-pillar:nth-child(n+3) {
    border-top: 1px solid var(--ma-rule);
  }
  .ma-pillar:nth-child(2n+1) {
    border-left: 0;
    padding-left: 0;
  }
  .ma-pillar:nth-child(2n) {
    border-left: 1px solid var(--ma-rule);
    padding-left: clamp(20px, 3vw, 40px);
  }
  .ma-main { grid-template-columns: 1fr 1fr; gap: 34px; }
  .ma-main > :first-child { grid-column: 1 / -1; }
}

@media (max-width: 640px) {
  .ma-pillars { grid-template-columns: 1fr; }
  .ma-pillar { padding: 20px 0; }
  .ma-pillar + .ma-pillar {
    border-left: 0 !important;
    padding-left: 0 !important;
    border-top: 1px solid var(--ma-rule) !important;
  }
  .ma-main { grid-template-columns: 1fr; }
  .ma-legal { grid-template-columns: 1fr 1fr; }
  .ma-legal a + a { border-left: 0; }
  .ma-legal a:nth-child(even) { border-left: 1px solid var(--ma-rule); }
  .ma-legal a:nth-child(n+3) { border-top: 1px solid var(--ma-rule); }
  .ma-brand-copy { max-width: none; }
}

@media (prefers-reduced-motion: reduce) {
  .ma-footer * { transition: none !important; }
}
`

const FooterStyles: React.FC = () => (
  <style dangerouslySetInnerHTML={{ __html: CSS }} />
)

/* -------------------------------------------------------------- component */

export const MyAnmolFooter: React.FC<MyAnmolFooterProps> = ({
  arn = "114893",
  initialRegistration = "16 Sep 2016",
  arnValidUntil = "15 Sep 2028",
  pmsRegistration = "APRN01456",
  appStoreUrl = "https://apps.apple.com/in/app/myanmol-mutual-funds/id6748212457",
  playStoreUrl = "https://play.google.com/store/apps/details?id=com.myanmol.app&pcampaignid=web_share",
  legalLinks = DEFAULT_LEGAL_LINKS,
  socials = DEFAULT_SOCIALS,
  year = new Date().getFullYear(),
  className = "",
}) => {
  return (
    <footer className={`ma-footer ${className}`.trim()} role="contentinfo">
      <FooterStyles />

      {/* credentials strip */}
      <div className="ma-creds" role="region" aria-label="Registration credentials">
        <div className="ma-creds-track">
          {[false, true].map((isDuplicate) => (
            <div className="ma-creds-row" aria-hidden={isDuplicate || undefined} key={String(isDuplicate)}>
              <span className="ma-cred">
                <i className="ma-dot" />
                <b>AMFI Registered Mutual Fund & SIF Distributor</b> <span>ARN - {arn}</span>
              </span>
              <span className="ma-cred">
                <i className="ma-dot" />
                <b>APMI Registered PMS Distributor</b> <span>ARN - {pmsRegistration}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* save · insure · invest · grow */}
      <div className="ma-inner">
        <div className="ma-pillars-head">
          <h2>Save. Insure. Invest. Grow.</h2>
          <p>
            for a happy future — <b>with MyAnmol.</b>
          </p>
        </div>

        <div className="ma-pillars">
          {PILLARS.map((p) => (
            <section className="ma-pillar" key={p.index}>
              <span className="ma-pillar-i">{p.index}</span>
              <h3>{p.title}</h3>
              <p>
                <b>{p.lead}</b> {p.tail}
              </p>
            </section>
          ))}
        </div>
      </div>

      {/* brand + registration details */}
      <div className="ma-inner ma-main">
        <div>
          <div className="ma-brand-row">
            <LogoMark />
            <div>
              <p className="ma-brand-name">MyAnmol</p>
            </div>
          </div>

          <p className="ma-brand-copy">
            Protecting and growing what matters most — for every Indian
            household.
          </p>

          <div className="ma-stores">
            <a
              className="ma-store"
              href={appStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download MyAnmol on the App Store"
            >
              <AppleGlyph />
              <span className="ma-store-lines">
                <small>Download on the</small>
                <strong>App Store</strong>
              </span>
            </a>

            <a
              className="ma-store"
              href={playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get MyAnmol on Google Play"
            >
              <PlayGlyph />
              <span className="ma-store-lines">
                <small>Get it on</small>
                <strong>Google Play</strong>
              </span>
            </a>
          </div>
        </div>

        <div>
          <h4 className="ma-col-title">Registration</h4>
          <dl className="ma-facts">
            <div>
              <dt>AMFI Registration No:</dt> <dd>{arn}</dd>
            </div>
            <div>
              <dt>Initial Registration:</dt> <dd>{initialRegistration}</dd>
            </div>
            <div>
              <dt>Current Validity of ARN:</dt> <dd>{arnValidUntil}</dd>
            </div>
          </dl>
        </div>

        <div>
          <h4 className="ma-col-title">ARN Holder</h4>
          <ul className="ma-list">
            <li className="ma-strong">Anmol Share Broking Pvt Ltd</li>
            <li>AMFI-registered Mutual Fund Distributor</li>
            <li>AMFI-registered SIF Distributor</li>
            <li>APMI-registered PMS Distributor — {pmsRegistration}</li>
          </ul>

          <div className="ma-socials">
            {socials.map((s) => (
              <a
                key={s.network}
                className="ma-social"
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label ?? s.network}
              >
                <SocialGlyph network={s.network} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* legal links */}
      <div className="ma-inner">
        <nav className="ma-legal" aria-label="Legal">
          {legalLinks.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
      </div>

      {/* fine print */}
      <div className="ma-fine">
        <div className="ma-inner ma-fine-inner">
          <p>
            <b>Anmol Share Broking Private Limited</b>, operating as MyAnmol, is
            an AMFI-registered mutual fund distributor (ARN {arn}) and an
            APMI-registered PMS distributor ({pmsRegistration}). Mutual funds
            and securities investments are subject to market risks. Past
            performance does not indicate future performance of the schemes of
            the fund. Please read all offer documents carefully before
            investing. Insurance is the subject matter of solicitation.
            Registration granted by the regulators in no way guarantees the
            performance of the intermediary or assures any returns to investors.
          </p>
          <p>© {year} Anmol Share Broking Pvt. Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default MyAnmolFooter
