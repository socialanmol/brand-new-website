import React, { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router";

export default function GiftCity() {
  const { openGetStarted } = useOutletContext<{ openGetStarted: () => void }>();
  const [audience, setAudience] = useState<"resident" | "nri">("resident");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const currentScroll = window.scrollY;
      setScrollProgress((currentScroll / totalScroll) * 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`font-[var(--fs)] bg-white text-[#111827] antialiased min-h-screen ${audience === "nri" ? "nri-mode" : ""}`}>
      {/* Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-[#8DC63F] to-[#1A3B9F] z-[200] transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Audience Switcher Bar */}
      <div className="sticky top-0 z-[99] bg-[#091540]/95 backdrop-blur-md border-b border-[#8DC63F]/20 flex items-center justify-center gap-4 px-6 h-[46px]">
        <span className="text-[10px] font-extrabold tracking-widest uppercase text-white/50">
          I am:
        </span>
        <div className="flex bg-white/10 border border-[#8DC63F]/30 rounded-full overflow-hidden p-0.5">
          <button
            type="button"
            onClick={() => setAudience("resident")}
            className={`px-5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full transition-all cursor-pointer ${
              audience === "resident" ? "bg-[#8DC63F] text-[#091540]" : "text-white/70 hover:text-white"
            }`}
          >
            An Indian Resident
          </button>
          <button
            type="button"
            onClick={() => setAudience("nri")}
            className={`px-5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full transition-all cursor-pointer ${
              audience === "nri" ? "bg-[#8DC63F] text-[#091540]" : "text-white/70 hover:text-white"
            }`}
          >
            🌐 An NRI
          </button>
        </div>
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#091540] via-[#0D1E52] to-[#1A3B9F] py-20 lg:py-28 text-white px-6">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(201,165,90,0.18)_0%,transparent_70%)] filter blur-3xl pointer-events-none" />

        <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-widest text-[#8DC63F] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F] animate-pulse" />
              India's First &amp; Only IFSC · GIFT City, Gujarat
            </div>

            {audience === "resident" ? (
              <>
                <h1 className="font-[var(--fd)] text-4xl sm:text-6xl font-bold tracking-tight mb-6 leading-tight">
                  Your Gateway to <br />
                  <span className="text-[#8DC63F] italic font-bold">Global Markets</span> <br />
                  via GIFT City
                </h1>
                <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed mb-10 max-w-xl">
                  Anmol connects Indian investors directly to the world's leading asset managers, global equities, and international financial instruments — all through the regulatory framework of India's premier International Financial Services Centre. We act as your registered distributor, every step of the way.
                </p>
              </>
            ) : (
              <>
                <h1 className="font-[var(--fd)] text-4xl sm:text-6xl font-bold tracking-tight mb-6 leading-tight">
                  NRIs &amp; OCIs: <br />
                  <span className="text-[#8DC63F] italic font-bold">Invest Back in India</span> <br />
                  &amp; Globally via GIFT City
                </h1>
                <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed mb-10 max-w-xl">
                  Anmol helps Non-Resident Indians, OCI cardholders, and PIOs access GIFT City's IFSCA-regulated investment ecosystem — enabling USD-denominated global portfolios and India-linked opportunities, without the complexity of routing funds through domestic Indian accounts.
                </p>
              </>
            )}

            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={openGetStarted}
                className="bg-[#8DC63F] hover:bg-[#9ED64A] text-[#091540] font-extrabold text-sm px-8 py-3.5 rounded-full shadow-lg transition-all"
              >
                Schedule a Consultation →
              </button>
              <a
                href="#what"
                className="border border-white/30 hover:border-[#8DC63F] bg-transparent hover:bg-[#8DC63F]/15 text-white font-medium text-sm px-8 py-3.5 rounded-full transition-all"
              >
                Explore GIFT City ↓
              </a>
            </div>
          </div>

          {/* Right Hero Callout Card */}
          <div className="bg-white/5 border border-white/10 border-l-4 border-l-[#8DC63F] rounded-2xl p-8 backdrop-blur-md">
            {audience === "resident" ? (
              <>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#8DC63F] block mb-4">
                  From the desk of Anmol
                </span>
                <p className="font-[var(--fd)] text-lg italic text-white/90 leading-relaxed mb-4">
                  "Global investing is no longer a privilege reserved for institutions. Through GIFT City, we bring the world's best asset managers directly to you — within India's own regulatory framework, in USD, with full transparency."
                </p>
                <p className="text-xs text-white/50 font-normal">
                  — Your GIFT City Partner
                </p>
              </>
            ) : (
              <>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#8DC63F] block mb-4">
                  A note for the Global Indian
                </span>
                <p className="font-[var(--fd)] text-lg italic text-white/90 leading-relaxed mb-4">
                  "You have built your wealth across borders. GIFT City is India's answer to the global financial centres you already know — regulated by IFSCA, operating in USD, and designed for investors like you."
                </p>
                <p className="text-xs text-white/50 font-normal">
                  — Your GIFT City Partner
                </p>
              </>
            )}
          </div>
        </div>

        {/* Hero Bottom Stats */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/20 border-t border-white/10 backdrop-blur-md flex flex-col sm:flex-row justify-center divide-y sm:divide-y-0 sm:divide-x divide-white/10 text-center">
          <div className="flex-1 p-5 max-w-[320px] mx-auto">
            <div className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#8DC63F]">
              {audience === "resident" ? "USD 250K" : "No LRS Cap"}
            </div>
            <div className="text-[11px] uppercase tracking-wider text-white/60 mt-1">
              {audience === "resident" ? "LRS Annual Limit per person" : "NRIs invest from foreign earnings"}
            </div>
          </div>
          <div className="flex-1 p-5 max-w-[320px] mx-auto">
            <div className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#8DC63F]">IFSCA</div>
            <div className="text-[11px] uppercase tracking-wider text-white/60 mt-1">Parliament-backed Regulator</div>
          </div>
          {audience === "nri" && (
            <div className="flex-1 p-5 max-w-[320px] mx-auto">
              <div className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#8DC63F]">DTAA</div>
              <div className="text-[11px] uppercase tracking-wider text-white/60 mt-1">Double Tax Treaty Benefits</div>
            </div>
          )}
        </div>
      </section>

      {/* ── WHAT IS GIFT CITY ── */}
      <section id="what" className="py-20 sm:py-28 bg-[#F8FAFE] px-6">
        <div className="max-w-[1140px] mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#1A3B9F] block mb-2">
            01 — Foundation
          </span>
          <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-bold text-[#091540] mb-6">
            What is <span className="text-[#1A3B9F] italic">GIFT City</span> &amp; Why Does it Matter?
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mt-10">
            <div className="space-y-6 text-sm sm:text-base text-[#4B5563] font-light leading-relaxed">
              <p>
                GIFT City — Gujarat International Finance Tec-City — is India's first and only International Financial Services Centre (IFSC), established by an Act of Parliament and regulated by the <strong>International Financial Services Centres Authority (IFSCA)</strong>. Located in Gandhinagar, Gujarat, it is purpose-built to be a world-class financial hub rivalling Singapore and Dubai's DIFC.
              </p>
              <h3 className="font-[var(--fd)] text-xl font-bold text-[#091540] pt-2">
                A Special Economic Zone for Finance
              </h3>
              <p>
                GIFT City operates as a Special Economic Zone (SEZ) with a dedicated IFSC, offering a unique regulatory and tax environment distinct from domestic Indian markets. Transactions here are denominated in foreign currencies, benefiting from a globally competitive framework.
              </p>
              <h3 className="font-[var(--fd)] text-xl font-bold text-[#091540] pt-2">
                Regulatory Clarity &amp; Safety
              </h3>
              <p>
                IFSCA was established under the International Financial Services Centres Authority Act, 2019 — providing a transparent, internationally aligned regulatory framework for custody, reporting, and investor protection.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { num: "Feature 01", title: "Foreign Currency Denomination", desc: "All transactions, investments, and returns within GIFT City's IFSC are in USD or foreign currencies." },
                { num: "Feature 02", title: "Internationally Competitive Tax Regime", desc: "Unified 12.5% LTCG Tax on foreign securities after 12–24 months. No Securities Transaction Tax (STT)." },
                { num: "Feature 03", title: "Access to Global Asset Classes", desc: "Equities, ETFs, bonds, derivatives, AIFs, and PMS accessible through licensed entities." },
                { num: "Feature 04", title: "Joint Holding Available", desc: "Strategic for managing US Estate Tax, which applies to US-situated assets exceeding USD 60,000." },
              ].map((c, i) => (
                <div key={i} className="bg-white border border-[rgba(26,59,159,0.12)] border-l-4 border-l-[#8DC63F] rounded-2xl p-6 shadow-sm">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#1A3B9F] block mb-1">
                    {c.num}
                  </span>
                  <h4 className="font-bold text-sm text-[#091540] mb-1">{c.title}</h4>
                  <p className="text-xs text-gray-500 font-light leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── NRI ONLY SECTION: ADVANTAGES ── */}
      {audience === "nri" && (
        <section className="py-20 sm:py-28 bg-white px-6 border-t border-gray-200">
          <div className="max-w-[1140px] mx-auto">
            <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#1A3B9F] block mb-2">
              02 — Key Advantages
            </span>
            <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-bold text-[#091540] mb-4">
              Why GIFT City is Ideal for <span className="text-[#1A3B9F] italic">NRIs, OCIs &amp; PIOs</span>
            </h2>
            <p className="text-sm sm:text-base text-[#4B5563] font-light max-w-2xl mb-12">
              GIFT City's IFSCA framework offers Non-Resident Indians regulatory clarity, currency flexibility, and global access without domestic routing hurdles.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: "🚫", title: "No LRS Annual Cap", desc: "NRIs, OCIs, and PIOs investing from foreign earnings or NRE accounts are not bound by the resident LRS annual ceiling of USD 250,000." },
                { icon: "💵", title: "USD-Denominated Portfolio", desc: "Eliminates currency conversion friction for wealth already held in USD or major foreign currencies, with returns credited in USD." },
                { icon: "🏛️", title: "DTAA Treaty Benefits", desc: "Claim treaty-based tax relief on dividends, interest, and capital gains depending on your country of tax residence." },
                { icon: "🔗", title: "India Connection, Global Scale", desc: "Maintain India-linked financial structures while accessing global markets with clear repatriation rules." },
                { icon: "📋", title: "Streamlined Compliance", desc: "Internationally aligned regulatory standards familiar to NRIs accustomed to financial systems in the US, UK, UAE, or Singapore." },
                { icon: "🏠", title: "Estate & Succession Planning", desc: "Manage multi-jurisdictional assets with joint holding flexibility to mitigate US Estate Tax exposure on US assets." },
              ].map((nri, i) => (
                <div key={i} className="bg-[#F8FAFE] border border-[rgba(26,59,159,0.12)] rounded-2xl p-6 shadow-sm">
                  <div className="text-2xl mb-3">{nri.icon}</div>
                  <h3 className="font-[var(--fd)] text-lg font-bold text-[#091540] mb-2">{nri.title}</h3>
                  <p className="text-xs sm:text-sm text-[#4B5563] font-light leading-relaxed">{nri.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── WHY INVEST GLOBALLY (RESIDENT MODE) ── */}
      {audience === "resident" && (
        <section className="py-20 sm:py-28 bg-white px-6">
          <div className="max-w-[1140px] mx-auto">
            <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#1A3B9F] block mb-2">
              02 — Investment Case
            </span>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <h2 className="font-[var(--fd)] text-3xl sm:text-5xl font-bold text-[#091540] leading-tight">
                Why should Indian investors look at <span className="text-[#1A3B9F] italic">global markets</span>?
              </h2>
              <p className="text-sm sm:text-base text-[#4B5563] font-light leading-relaxed">
                India has been an exceptional market — but concentrating 100% of your wealth in a single country exposes you to currency depreciation, regulatory changes, and sector cycles unique to India. Global diversification offers access to world-leading businesses while lowering cross-market volatility.
              </p>
            </div>

            <div className="border border-[rgba(26,59,159,0.12)] rounded-2xl overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead className="bg-[#0D1E52] text-white">
                  <tr>
                    <th className="p-3.5">Country</th>
                    <th className="p-3.5">Index</th>
                    <th className="p-3.5">30Y TSR</th>
                    <th className="p-3.5">20Y TSR</th>
                    <th className="p-3.5">10Y TSR</th>
                    <th className="p-3.5">30Y Rank</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="bg-[#EFF8E2]/40 font-bold text-[#091540]">
                    <td className="p-3.5">🇺🇸 United States</td>
                    <td className="p-3.5">S&amp;P 500</td>
                    <td className="p-3.5">10.3%</td>
                    <td className="p-3.5">10.9%</td>
                    <td className="p-3.5">15.5%</td>
                    <td className="p-3.5 text-[#6AA32A]">#1</td>
                  </tr>
                  <tr className="bg-[#EFF8E2]/40 font-bold text-[#091540]">
                    <td className="p-3.5">🇮🇳 India</td>
                    <td className="p-3.5">Nifty 50</td>
                    <td className="p-3.5">9.9%</td>
                    <td className="p-3.5">8.8%</td>
                    <td className="p-3.5">11.0%</td>
                    <td className="p-3.5 text-[#6AA32A]">#2</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="p-3.5">🇨🇳 China</td>
                    <td className="p-3.5">Shanghai Composite</td>
                    <td className="p-3.5">9.5%</td>
                    <td className="p-3.5">9.3%</td>
                    <td className="p-3.5">6.2%</td>
                    <td className="p-3.5">#3</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="p-3.5">🇦🇺 Australia</td>
                    <td className="p-3.5">ASX 200</td>
                    <td className="p-3.5">9.4%</td>
                    <td className="p-3.5">8.4%</td>
                    <td className="p-3.5">11.3%</td>
                    <td className="p-3.5">#4</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-gray-400 mt-3 font-light">
              Source: Bloomberg LP. 30-Year, 20-Year and 10-Year TSR calculated for period ending February 2026. All returns expressed in USD terms. Past performance is not indicative of future results.
            </p>
          </div>
        </section>
      )}

      {/* ── HOW ANMOL HELPS ── */}
      <section className="py-20 sm:py-28 bg-[#091540] text-white px-6">
        <div className="max-w-[1140px] mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#8DC63F] block mb-2">
            {audience === "resident" ? "03 — Our Role" : "04 — Our Role"}
          </span>
          <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-bold text-white mb-4">
            Anmol — your <span className="text-[#8DC63F] italic">registered distributor</span> for global investing through GIFT City
          </h2>
          <p className="text-sm sm:text-base text-white/70 font-light max-w-2xl mb-14 leading-relaxed">
            As a registered distributor specialising in GIFT City access, Anmol handles everything from investment advisory and PMS/AIF distribution to tax coordination.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "🔍", title: "Investment Advisory & Strategy", desc: "Personalised investment guidance tailored to your goals, risk appetite, and time horizon." },
              { icon: "🌐", title: "PMS & AIF Distribution", desc: "Curate and facilitate access to GIFT City-registered Portfolio Management Services and Alternative Investment Funds." },
              { icon: "📊", title: "Portfolio Monitoring & Reporting", desc: "Consolidated, plain-language performance reports covering your USD returns and INR equivalents." },
              { icon: "🏛️", title: "Tax & Compliance Coordination", desc: "Connect you with specialist tax advisors for GIFT City investments and year-end reporting." },
              { icon: "🤝", title: "Ongoing Relationship Management", desc: "Your single point of contact across all GIFT City investments throughout the entire investment lifecycle." },
            ].map((h, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-sm">
                <div className="text-2xl mb-3">{h.icon}</div>
                <h3 className="font-[var(--fd)] text-lg font-bold text-white mb-2">{h.title}</h3>
                <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section id="cta" className="py-20 sm:py-28 bg-gradient-to-br from-[#091540] to-[#1A3B9F] text-white text-center px-6">
        <div className="max-w-xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#8DC63F] block mb-2">
            Connect With Us
          </span>
          <h2 className="font-[var(--fd)] text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
            Ready to take your portfolio <span className="text-[#8DC63F] italic">global</span>?
          </h2>
          <p className="text-sm sm:text-base text-white/80 font-light mb-8 leading-relaxed">
            Speak with Anmol's GIFT City specialists today. We'll walk you through your options, answer every question, and help you invest globally with confidence.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              type="button"
              onClick={openGetStarted}
              className="bg-[#8DC63F] hover:bg-[#9ED64A] text-[#091540] font-extrabold text-sm px-8 py-3.5 rounded-full shadow-lg transition-all"
            >
              Schedule a Consultation →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}