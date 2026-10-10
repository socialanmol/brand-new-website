import React, { useState } from "react";
import { Link, useOutletContext } from "react-router";

interface StrategySpec {
  label: string;
  val: string;
}

interface StrategyItem {
  type: string;
  title: string;
  desc: string;
  specs: StrategySpec[];
}

const STRATEGIES: StrategyItem[] = [
  {
    type: "Equity-Oriented",
    title: "Equity Long-Short Fund",
    desc: "The flagship SIF strategy. Invests predominantly in equities while using derivatives to take short positions on overvalued stocks or indices — equity-like growth with some downside protection in volatile markets.",
    specs: [
      { label: "Min Equity", val: "≥ 80%" },
      { label: "Short Exposure", val: "Up to 25%" },
      { label: "Derivatives", val: "Exchange-traded only" },
    ],
  },
  {
    type: "Equity-Oriented",
    title: "Equity Ex-Top 100 Long-Short",
    desc: "Focused on mid and small-cap opportunities by excluding the top 100 stocks by market cap. Targets inefficiencies in under-researched market segments with long-short flexibility for risk management.",
    specs: [
      { label: "Min Equity", val: "≥ 65%" },
      { label: "Exclusion", val: "Top 100 stocks" },
      { label: "Universe", val: "Mid & Small Cap" },
    ],
  },
  {
    type: "Equity-Oriented",
    title: "Sector Rotation Long-Short",
    desc: "A tactical macro-driven strategy concentrating in up to 4 sectors. Goes long on outperforming sectors and short on underperformers — powerful during strong sectoral divergence driven by policy or earnings cycles.",
    specs: [
      { label: "Min Equity", val: "≥ 80%" },
      { label: "Max Sectors", val: "Up to 4" },
      { label: "Approach", val: "Tactical / Macro-driven" },
    ],
  },
  {
    type: "Debt-Oriented",
    title: "Debt Long-Short Fund",
    desc: "A sophisticated fixed income strategy across multiple durations using interest rate derivatives. Managers can go long on bonds expected to appreciate and short those expected to fall — ideal for active duration management.",
    specs: [
      { label: "Asset Class", val: "Multi-duration debt" },
      { label: "Derivatives", val: "Interest rate derivatives" },
      { label: "Strategy", val: "Active duration management" },
    ],
  },
  {
    type: "Debt-Oriented",
    title: "Sectoral Debt Long-Short",
    desc: "Concentrates fixed income across specific sectors such as banking, infrastructure, or PSUs. A cap of 75% per sector prevents excessive concentration while enabling active sector-based positioning in credit markets.",
    specs: [
      { label: "Min Sectors", val: "2 sectors" },
      { label: "Max Per Sector", val: "75%" },
      { label: "Focus", val: "Sector-specific credit" },
    ],
  },
  {
    type: "Hybrid",
    title: "Hybrid Long-Short Fund",
    desc: "Combines equity and debt with long-short capability across both. Suits moderate-risk investors seeking capital appreciation from equity alongside income from debt with active risk management through derivatives.",
    specs: [
      { label: "Min Equity", val: "≥ 25%" },
      { label: "Min Debt", val: "≥ 25%" },
      { label: "Style", val: "Balanced long-short" },
    ],
  },
  {
    type: "Hybrid",
    title: "Active Asset Allocator Long-Short",
    desc: "The most flexible SIF strategy — dynamic, unconstrained allocation authority across equity, debt, REITs, InvITs, and commodity derivatives. Managers freely shift allocations based on evolving market conditions.",
    specs: [
      { label: "Asset Classes", val: "Equity, Debt, REITs, Commodities" },
      { label: "Allocation", val: "Dynamic / Unconstrained" },
      { label: "Flexibility", val: "Highest among all SIF types" },
    ],
  },
];

const FAQS = [
  {
    q: "What is the key difference between a SIF and a regular mutual fund?",
    a: "The primary difference is the ability to use derivatives for unhedged short selling. Regular mutual funds can only use derivatives for hedging existing positions. SIFs can take short positions of up to 25% of net assets via exchange-traded derivatives — allowing fund managers to profit when specific stocks, sectors, or indices decline. Additionally, SIFs have a higher minimum investment (₹10 lakh) and require a separate folio.",
  },
  {
    q: "Can I spread the ₹10 lakh minimum across multiple SIF strategies or AMCs?",
    a: "Yes. The ₹10 lakh minimum is calculated as an aggregate across all SIF strategies under a single PAN — regardless of which AMC manages them. For example, ₹5 lakh in an Equity Long-Short Fund from one AMC and ₹5 lakh in a Debt Long-Short Fund from another AMC would together satisfy the ₹10 lakh threshold. However, total aggregate investment must always remain at or above ₹10 lakh to keep systematic plans active.",
  },
  {
    q: "Is a SIF safer than a regular mutual fund?",
    a: "Not necessarily. SIFs carry additional risks compared to standard mutual funds — specifically derivative exposure risk and the potential for amplified losses if short positions move against the fund. While the long-short structure can reduce volatility in some market conditions, it can also magnify losses if both long and short positions move unfavourably simultaneously. SIFs are not capital-preservation products and are not appropriate for risk-averse investors.",
  },
  {
    q: "What happens if my SIF balance drops below ₹10 lakh due to market losses?",
    a: "This is classified as a 'Passive Breach.' The investor is not penalised and can continue to hold their units without any forced redemption. However, partial redemption is not permitted — the investor can only fully exit the SIF or wait for the portfolio to recover above ₹10 lakh through market appreciation. Systematic plans (SIP/STP/SWP) may be suspended until the threshold is restored.",
  },
  {
    q: "Do I need a demat account to invest in SIFs?",
    a: "No. SIFs follow the mutual fund structure, so investments are held in units and a demat account is not mandatory — just like regular mutual fund investments. However, you will need a separate SIF folio and must complete fresh documentation and KYC verification with your chosen AMC or distributor at the time of onboarding.",
  },
  {
    q: "Are SIFs listed on stock exchanges for trading?",
    a: "No. SIFs are open-ended mutual fund schemes and are not listed on stock exchanges for secondary market trading. Investors transact directly with the AMC at NAV-based prices on applicable business days — similar to regular open-ended mutual funds. Liquidity is dependent on the redemption terms set by each scheme's SID.",
  },
];

export default function SpecializedInvestmentFunds() {
  const { openGetStarted } = useOutletContext<{ openGetStarted: () => void }>();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="font-[var(--fs)] bg-white text-[#111827] antialiased min-h-screen">
      {/* ── HERO SECTION ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#091540] via-[#0D1E52] to-[#1A3B9F] py-16 sm:py-24 text-white px-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[580px] bg-[radial-gradient(circle,rgba(141,198,63,0.18)_0%,transparent_65%)] filter blur-3xl pointer-events-none" />
        <div className="max-w-[1140px] mx-auto w-full relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="max-w-[540px]">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8DC63F]/15 border border-[#8DC63F]/35 text-[#8DC63F] text-xs font-extrabold uppercase tracking-widest mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F] animate-pulse" />
              SEBI Regulated · New Framework
            </div>

            <h1 className="font-[var(--fd)] text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.08] mb-6">
              Specialized <br />
              <span className="text-[#8DC63F]">Investment</span> <br />
              Funds
            </h1>

            <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed mb-8">
              A new SEBI-regulated investment category bridging mutual funds and PMS/AIFs — offering advanced strategies starting at ₹10 lakh.
            </p>

            <button
              type="button"
              onClick={openGetStarted}
              className="inline-flex items-center gap-2 bg-[#8DC63F] hover:bg-[#9ED64A] text-[#091540] font-extrabold text-sm px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
            >
              ✦ Begin Your SIF Journey Today
            </button>
            <p className="text-xs text-white/50 mt-3 font-light">
              Offered by leading AMCs (availability may vary)
            </p>
          </div>

          {/* Stat Cards Stack */}
          <div className="flex flex-col gap-3 shrink-0 w-full sm:w-auto">
            {[
              { num: "₹10L", lbl: "Minimum Investment" },
              { num: "25%", lbl: "Max short exposure (SEBI guidelines)" },
              { num: "Nil", lbl: "Fund-level tax (Sec 10(23D)*)" },
              { num: "7", lbl: "Strategy Types" },
            ].map((card, i) => (
              <div
                key={i}
                className="bg-white/10 border border-white/15 backdrop-blur-md rounded-2xl p-4 text-right shadow-sm sm:min-w-[240px]"
              >
                <div className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#8DC63F]">
                  {card.num}
                </div>
                <div className="text-xs text-white/80 font-light mt-0.5">
                  {card.lbl}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTRO STRIP ── */}
      <div className="bg-[#EEF2FB] border-t-4 border-[#1A3B9F] py-6 px-6 text-center shadow-sm">
        <p className="max-w-[860px] mx-auto text-sm sm:text-base text-[#374151] leading-relaxed font-light">
          A <strong className="text-[#1A3B9F] font-bold">Specialized Investment Fund (SIF)</strong> is a new framework by <strong className="text-[#1A3B9F] font-bold">SEBI</strong> combining the <strong className="text-[#1A3B9F] font-bold">simplicity and tax efficiency of mutual funds</strong> with <strong className="text-[#1A3B9F] font-bold">advanced portfolio strategies</strong> — including long-short positioning and derivatives — typically only available in PMS/AIF structures, but at a far lower minimum entry point.
        </p>
      </div>

      {/* ── WHY CHOOSE SIFS (FEATURES) ── */}
      <section className="py-16 sm:py-24 bg-white max-w-[1140px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-[.2em] text-[#1A3B9F] block mb-2">
              Advantages
            </span>
            <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-bold text-[#091540]">
              Why Choose a Specialized Investment Fund?
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#4B5563] font-light max-w-lg leading-relaxed">
            SIFs unlock advanced strategies typically reserved for institutional investors — without the complexity, opacity, or high minimums of AIFs or PMS.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: "🛡️",
              title: "Regulated & Transparent",
              desc: "SIFs operate within SEBI's mutual fund framework ensuring strong governance, investor protection, and rigorous disclosure standards. Portfolio composition disclosed every alternate month.",
              tags: ["SEBI Framework", "Bi-Monthly Disclosure", "Strong Governance"],
            },
            {
              icon: "📊",
              title: "Advanced Derivative Usage",
              desc: "Unlike standard mutual funds limited to hedging, SIFs permit unhedged short exposure via exchange-traded derivatives of up to 25% of net assets — enabling tactical shorting and alpha-generation.",
              tags: ["Unhedged Shorts", "Up to 25% Net Assets", "Exchange-Traded Only"],
            },
            {
              icon: "💡",
              title: "Tax Efficiency",
              desc: "No fund-level taxation under current Section 10(23D) provisions* — significantly more tax-efficient than AIF Category III structures or PMS where every trade triggers a taxable event.",
              tags: ["Section 10(23D)*", "No Fund-Level Tax", "Simpler than AIF Cat III"],
            },
            {
              icon: "🔑",
              title: "Accessible Entry Point",
              desc: "Minimum aggregate investment of ₹10 lakh across all SIF strategies per PAN — substantially lower than AIFs (₹1 crore) or PMS (₹50 lakh). Accredited investors may be exempt from this threshold.",
              tags: ["₹10L Minimum", "Per PAN Aggregate", "Accredited Exempt"],
            },
            {
              icon: "⚖️",
              title: "Positioned Between MF and PMS/AIF",
              desc: "SIFs occupy a strategic gap — offering more sophisticated strategies than standard mutual funds while remaining far below the minimums of AIFs and PMS. Active management with long-short flexibility.",
              tags: ["Between MF and PMS", "Higher Flexibility", "Regulated Structure"],
            },
            {
              icon: "🔄",
              title: "Systematic Plans Available",
              desc: "Once the minimum threshold is met, activate SIP, STP, and SWP within SIF strategies. Minimum SIP ₹5,000 with daily, weekly, and monthly frequency options.",
              tags: ["SIP / STP / SWP", "Min ₹5,000 SIP", "Daily / Weekly / Monthly"],
            },
          ].map((card, i) => (
            <div
              key={i}
              className="bg-[#F8FAFE] border border-[rgba(26,59,159,0.12)] rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#EEF2FB] text-[#1A3B9F] flex items-center justify-center text-xl mb-4 shadow-sm">
                  {card.icon}
                </div>
                <h3 className="font-[var(--fd)] text-lg font-bold text-[#091540] mb-3">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#4B5563] font-light leading-relaxed mb-6">
                  {card.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex flex-wrap gap-1.5">
                {card.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-semibold text-[#1A3B9F] bg-[#EEF2FB] px-2.5 py-1 rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TARGET INVESTORS (AUDIENCE) ── */}
      <section className="py-16 sm:py-24 bg-white border-t border-[rgba(26,59,159,0.08)] max-w-[1140px] mx-auto px-6">
        <span className="text-xs font-extrabold uppercase tracking-[.2em] text-[#1A3B9F] block mb-2">
          Target Investors
        </span>
        <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-bold text-[#091540] mb-3">
          Who Should Invest in SIFs?
        </h2>
        <p className="text-sm sm:text-base text-[#4B5563] font-light max-w-xl mb-10">
          Designed for experienced investors who want more than conventional mutual funds, without committing to full AIF or PMS minimums.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: "💼",
              title: "Affluent Retail Investors",
              desc: "Investors with ₹25L–₹2Cr in investable assets who want to graduate beyond standard mutual funds without the complexity of PMS. Regulated, transparent, professionally managed at an accessible minimum.",
              tag: "₹10L+ investable surplus",
            },
            {
              icon: "📈",
              title: "Market-Aware Investors",
              desc: "Individuals who understand long-short investing, derivatives, and risk-adjusted returns, and want to participate without building or managing positions themselves.",
              tag: "Familiar with derivatives",
            },
            {
              icon: "🔁",
              title: "Investors Seeking Alpha",
              desc: "Those dissatisfied with limited alpha from traditional long-only mutual funds. The long-short structure enables profit in both rising and falling markets.",
              tag: "Beyond index-linked returns",
            },
            {
              icon: "🏦",
              title: "Tax-Conscious Investors",
              desc: "No fund-level taxation* and investor-level taxation aligned with mutual funds. High-income investors facing tax drag in PMS structures will find SIFs a significantly more efficient vehicle.",
              tag: "Tax efficiency priority",
            },
            {
              icon: "🌐",
              title: "Accredited Investors",
              desc: "SEBI-recognised accredited investors — typically high net worth or income — may be eligible for lower minimum thresholds in certain SIF offerings.",
              tag: "Special SEBI status",
            },
            {
              icon: "🎯",
              title: "Goal-Oriented Long-Term Investors",
              desc: "Investors with a defined long-term goal who want a regulated, multi-asset, actively managed product. The Active Asset Allocator strategy suits dynamic, goal-aligned management.",
              tag: "5–10 year horizon",
            },
          ].map((aud, i) => (
            <div
              key={i}
              className="bg-[#F8FAFE] border border-[rgba(26,59,159,0.12)] rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="text-3xl mb-4">{aud.icon}</div>
                <h3 className="font-[var(--fd)] text-lg font-bold text-[#091540] mb-3">
                  {aud.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#4B5563] font-light leading-relaxed mb-6">
                  {aud.desc}
                </p>
              </div>

              <span className="inline-block self-start text-[11px] font-semibold text-[#1A3B9F] bg-white px-3 py-1 rounded-full border border-gray-200">
                {aud.tag}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── ELIGIBLE STRATEGIES GRID ── */}
      <section className="py-16 sm:py-24 bg-[#EEF2FB] px-6">
        <div className="max-w-[1140px] mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-[.2em] text-[#1A3B9F] block mb-2">
            Investment Strategies
          </span>
          <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-bold text-[#091540] mb-3">
            Eligible SIF Strategy Types
          </h2>
          <p className="text-sm sm:text-base text-[#4B5563] font-light max-w-xl mb-12">
            SEBI has defined seven eligible strategy types under the SIF framework, organised into three categories — each with specific mandates and constraints.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {STRATEGIES.map((st, i) => (
              <div
                key={i}
                className="bg-white border border-[rgba(26,59,159,0.15)] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#1A3B9F] bg-[#EEF2FB] px-3 py-1 rounded-full inline-block mb-4">
                    {st.type}
                  </span>
                  <h3 className="font-[var(--fd)] text-xl font-bold text-[#091540] mb-3">
                    {st.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4B5563] font-light leading-relaxed mb-6">
                    {st.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 space-y-2">
                  {st.specs.map((sp, idx) => (
                    <div key={idx} className="flex justify-between text-xs">
                      <span className="text-gray-500">{sp.label}</span>
                      <span className="text-[#1A3B9F] font-semibold">{sp.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW TO INVEST (STEPS) ── */}
      <section className="py-16 sm:py-24 bg-white max-w-[1140px] mx-auto px-6">
        <span className="text-xs font-extrabold uppercase tracking-[.2em] text-[#1A3B9F] block mb-2 text-center">
          Getting Started
        </span>
        <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-bold text-[#091540] mb-3 text-center">
          How to Invest in a SIF
        </h2>
        <p className="text-sm sm:text-base text-[#4B5563] font-light max-w-xl mx-auto mb-16 text-center">
          A structured process distinct from regular mutual fund investing — here is what to expect step by step.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative">
          {[
            { num: "01", title: "Check Eligibility", desc: "Confirm ₹10 lakh available to invest, or SEBI-recognised accredited status. Ensure KYC is up to date." },
            { num: "02", title: "Open a SIF Folio", desc: "SIF investments require a separate folio from standard mutual funds. Submit fresh documentation to your chosen AMC or distributor." },
            { num: "03", title: "Choose Your Strategy", desc: "Select from equity, debt, or hybrid long-short strategies matching your risk profile and horizon. Read the SID carefully." },
            { num: "04", title: "Invest the Minimum", desc: "Non-accredited investors must invest a minimum aggregate of ₹10 lakh across SIF strategies within a single AMC." },
            { num: "05", title: "Activate Systematic Plans", desc: "Once the minimum threshold is met, initiate SIP, STP, or SWP. Minimum SIP is ₹5,000." },
          ].map((st, i) => (
            <div key={i} className="bg-[#F8FAFE] rounded-2xl p-6 text-center border border-[rgba(26,59,159,0.12)]">
              <div className="w-12 h-12 rounded-full bg-[#1A3B9F] text-white font-serif font-bold text-lg flex items-center justify-center mx-auto mb-4 shadow-sm">
                {st.num}
              </div>
              <h3 className="font-[var(--fd)] text-base font-bold text-[#091540] mb-2">
                {st.title}
              </h3>
              <p className="text-xs text-[#4B5563] font-light leading-relaxed">
                {st.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ACCORDION ── */}
      <section className="py-16 sm:py-24 bg-[#EEF2FB] px-6">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-extrabold uppercase tracking-[.2em] text-[#1A3B9F] block mb-2">
              Frequently Asked Questions
            </span>
            <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-bold text-[#091540]">
              Common Questions About SIFs
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white border border-[rgba(26,59,159,0.12)] rounded-2xl overflow-hidden shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#091540] hover:text-[#1A3B9F] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="text-lg text-[#8DC63F] font-extrabold shrink-0">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-sm text-[#4B5563] font-light leading-relaxed border-t border-gray-100 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── RISK & INFO DISCLAIMERS ── */}
      <div className="bg-[#EEF2FB] border-t-4 border-[#1A3B9F] py-8 px-6 text-center">
        <p className="max-w-[780px] mx-auto text-xs sm:text-sm text-[#1A3B9F] leading-relaxed">
          This material is for informational purposes only and does not constitute investment advice, recommendation, or solicitation. Investments in SIFs are subject to market risks. Please read all scheme-related documents carefully before investing. Past performance is not indicative of future results. Investors should consult their financial advisor before making any investment decisions.
        </p>
      </div>

      <div className="bg-gradient-to-br from-[#FFF8E1] to-[#FFF3CD] border-t-4 border-amber-500 py-10 px-6 text-center">
        <h4 className="font-[var(--fd)] text-lg font-bold text-amber-900 mb-2 flex items-center justify-center gap-2">
          ⚠️ Risk Disclaimer
        </h4>
        <p className="max-w-[720px] mx-auto text-xs sm:text-sm text-amber-800 leading-relaxed mb-4">
          Investments in Specialized Investment Funds involve relatively higher risks than conventional mutual funds. Past performance is not indicative of future returns. Please consult a SEBI-registered financial advisor and read all scheme-related documents carefully before investing.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {[
            "Derivative Exposure Risk",
            "Liquidity Risk",
            "Market Volatility Risk",
            "Short Position Risk",
            "Concentration Risk",
            "Potential Capital Loss",
            "Regulatory Risk",
          ].map((t, idx) => (
            <span
              key={idx}
              className="text-[11px] font-semibold text-amber-900 bg-amber-500/15 px-3 py-1 rounded-full border border-amber-500/30"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}