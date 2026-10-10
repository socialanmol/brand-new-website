import React from "react";
import { Link, useOutletContext } from "react-router";

export default function AlternativeInvestmentFunds() {
  const { openGetStarted } = useOutletContext<{ openGetStarted: () => void }>();
  return (
    <div className="font-[var(--fs)] bg-white text-[#111827] antialiased min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#091540] via-[#0D1E52] to-[#1A3B9F] py-16 sm:py-24 text-center text-white px-6">
        <Link
          to="/services/other"
          className="absolute top-6 left-6 inline-flex items-center gap-2 text-xs font-bold text-white/80 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-all"
        >
          ← Back to Services
        </Link>
        <div className="max-w-xl mx-auto relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-[#8DC63F]/15 border border-[#8DC63F]/30 flex items-center justify-center text-3xl mx-auto mb-6">
            🧭
          </div>
          <span className="text-[11px] font-extrabold uppercase tracking-[.18em] text-[#8DC63F] block mb-3">
            Wealth Management
          </span>
          <h1 className="font-[var(--fd)] text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Alternative Investment Funds
          </h1>
          <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed">
            Access strategies beyond the stock market — built for sophisticated investors.
          </p>
        </div>
      </section>

      {/* WHAT IS IT */}
      <section className="py-14 sm:py-18 bg-white max-w-[820px] mx-auto px-6">
        <div className="bg-[#EEF2FB] border border-[rgba(26,59,159,0.15)] rounded-3xl p-8">
          <p className="text-[#374151] text-base sm:text-lg leading-relaxed font-light mb-6">
            Alternative Investment Funds (AIFs) are privately pooled investment vehicles that invest in asset classes beyond traditional stocks, bonds, and mutual funds — such as private equity, venture capital, real estate, and structured credit. They're SEBI-regulated and built for investors seeking strategies not available through conventional routes.
          </p>
          <div className="inline-flex items-center gap-2 bg-[#091540] text-white px-5 py-2.5 rounded-full text-xs font-extrabold">
            Minimum Investment (SEBI-mandated): <span className="text-[#8DC63F]">₹1 Crore</span>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-14 sm:py-20 bg-[#F8FAFE] border-y border-[rgba(26,59,159,0.08)]">
        <div className="max-w-[820px] mx-auto px-6">
          <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#8DC63F] block mb-2">
            The Upside
          </span>
          <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#091540] mb-8">
            Pros of AIFs
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: "🚪", title: "Access to Unique Strategies", desc: "Invest in private equity, venture capital, real estate, and other opportunities unavailable through mutual funds or stocks." },
              { icon: "📈", title: "Higher Return Potential", desc: "Alternative strategies can generate returns less tied to traditional market cycles, especially over the long term." },
              { icon: "🧠", title: "Specialized Expertise", desc: "Managed by fund managers with deep expertise in niche, often complex asset classes." },
              { icon: "🧩", title: "True Diversification", desc: "Adds a layer of diversification well beyond conventional equity and debt investments." },
            ].map((b, i) => (
              <div key={i} className="bg-white border border-[rgba(26,59,159,0.12)] rounded-2xl p-6 shadow-sm flex gap-4">
                <div className="text-2xl shrink-0">{b.icon}</div>
                <div>
                  <h3 className="font-[var(--fd)] text-base font-bold text-[#091540] mb-1">{b.title}</h3>
                  <p className="text-sm text-[#4B5563] font-light leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRADE-OFFS */}
      <section className="py-16 bg-white max-w-[820px] mx-auto px-6">
        <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#1A3B9F] block mb-2">
          The Trade-Offs
        </span>
        <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#091540] mb-8">
          Cons of AIFs
        </h2>

        <div className="space-y-4">
          {[
            { num: "✕", title: "Very High Minimum Investment", desc: "₹1 crore minimum makes AIFs accessible only to a small segment of investors." },
            { num: "✕", title: "Limited Liquidity", desc: "Many AIFs have long lock-in periods, sometimes 5–10 years, with little to no early exit option." },
            { num: "✕", title: "Higher Risk", desc: "Alternative strategies can be more volatile and less transparent than traditional investments." },
            { num: "✕", title: "Complex Tax Treatment", desc: "Taxation varies significantly by AIF category and structure, often requiring specialized advice." },
          ].map((s, i) => (
            <div key={i} className="flex gap-4 p-5 rounded-2xl bg-[#F8FAFE] border border-[rgba(26,59,159,0.1)]">
              <span className="font-[var(--fd)] text-2xl font-bold text-rose-500">{s.num}</span>
              <div>
                <h3 className="font-[var(--fd)] text-base font-bold text-[#091540] mb-1">{s.title}</h3>
                <p className="text-sm text-[#4B5563] font-light">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-[#091540] to-[#0D1E52] text-white text-center px-6">
        <div className="max-w-xl mx-auto">
          <h2 className="font-[var(--fd)] text-3xl font-bold mb-4">Curious if AIFs fit your portfolio?</h2>
          <p className="text-sm sm:text-base text-white/80 font-light mb-8">
            Talk to a MyAnmol advisor about exploring Alternative Investment Funds and whether they suit your goals.
          </p>
          <button
            type="button"
            onClick={openGetStarted}
            className="inline-flex items-center gap-2 bg-[#8DC63F] hover:bg-[#9ED64A] text-[#091540] font-extrabold text-sm px-8 py-3.5 rounded-full shadow-lg transition-all"
          >
            Speak to an Advisor Now →
          </button>
        </div>
      </section>
    </div>
  );
}