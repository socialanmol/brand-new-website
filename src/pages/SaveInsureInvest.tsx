import React, { useState } from "react";
import { Link } from "react-router";

export default function SaveInsureInvest() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "Do I have to complete each step before starting the next?",
      a: "Not entirely. Most people build the cushion while a term policy is already in force, and start a small SIP alongside. The order matters for priority, not for a strict lockstep. If money is tight, it tells you what gets funded first.",
    },
    {
      q: "I already have insurance through my employer. Is that enough?",
      a: "It's a start. Employer cover typically ends when the job does, rarely extends to parents, and the sum insured is often below what a single serious hospitalisation costs. Most people need an independent personal cover they own and control.",
    },
    {
      q: "What if I've already been investing for years without doing this?",
      a: "Common, and easily fixable. A review usually finds two things: an emergency cushion that's thinner than assumed, and protection bought as an investment product. Neither requires tearing down the portfolio or starting over.",
    },
    {
      q: "How much do I need to begin?",
      a: "An SIP can start small. The bigger constraint is usually sizing the cushion and the term protection, since those need to be matched to your actual household expenses and liabilities rather than to an arbitrary minimum.",
    },
  ];

  return (
    <div className="font-[var(--fs)] bg-white text-[#111827] antialiased min-h-screen">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#091540] via-[#0D1E52] to-[#1A3B9F] py-16 sm:py-24 text-center text-white px-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] bg-[radial-gradient(circle,rgba(141,198,63,0.18)_0%,transparent_65%)] filter blur-3xl pointer-events-none" />
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8DC63F]/15 border border-[#8DC63F]/35 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" />
            <span className="text-[11px] font-extrabold uppercase tracking-[.18em] text-[#8DC63F]">
              Wealth Plan Strategy
            </span>
          </div>

          <h1 className="font-[var(--fd)] text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight mb-4">
            Save. Insure. Invest.
          </h1>

          <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed max-w-xl mx-auto mb-8">
            Most people do these in the wrong order. They start investing before they have a cushion, and buy protection only after something goes wrong. The sequence matters more than the products.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/wp/review"
              className="bg-[#8DC63F] hover:bg-[#9ED64A] text-[#091540] font-extrabold text-sm sm:text-base px-8 py-3.5 rounded-full shadow-lg transition-all"
            >
              Book a Strategy Review →
            </Link>
            <a
              href="#si-save"
              className="border border-white/20 bg-white/10 hover:bg-white/15 text-white font-bold text-sm sm:text-base px-8 py-3.5 rounded-full transition-all"
            >
              Explore the Sequence ↓
            </a>
          </div>
        </div>
      </section>

      {/* WHY ORDER BEATS PRODUCT SELECTION */}
      <section className="py-14 sm:py-20 bg-white border-b border-[rgba(26,59,159,0.08)]">
        <div className="max-w-[820px] mx-auto px-6">
          <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#1A3B9F] block mb-2">
            Why This Order
          </span>
          <h2 className="font-[var(--fd)] text-2xl sm:text-4xl font-bold text-[#091540] tracking-tight mb-4">
            Why order beats product selection
          </h2>
          <p className="text-sm sm:text-base text-[#4B5563] font-light leading-relaxed mb-6">
            Ask ten people what they should do with a bonus and most will name a fund. Almost nobody asks what happens to that money if the car needs an unexpected repair in March, or if a hospital bill arrives before the investment has had time to compound.
          </p>

          <div className="bg-[#F8FAFE] border-l-4 border-[#1A3B9F] p-5 rounded-r-2xl mb-6 text-sm sm:text-base font-semibold text-[#091540] italic">
            That is the pattern we see most often: Not bad investment products. Bad sequencing.
          </div>

          <p className="text-sm sm:text-base text-[#4B5563] font-light leading-relaxed mb-8">
            A plan that runs in the right order survives contact with real life. One that doesn't gets liquidated at the worst possible moment, usually at a loss, to cover an emergency that a smaller, conservative cushion could have absorbed without touching your investments.
          </p>

          <div className="flex flex-wrap gap-2.5">
            <span className="text-xs font-extrabold tracking-wider uppercase text-[#1A3B9F] bg-[#EEF2FB] border border-[#1A3B9F]/20 px-4 py-2 rounded-full">
              01 · Save (Cushion)
            </span>
            <span className="text-xs font-extrabold tracking-wider uppercase text-[#1A3B9F] bg-[#EEF2FB] border border-[#1A3B9F]/20 px-4 py-2 rounded-full">
              02 · Insure (Income Defense)
            </span>
            <span className="text-xs font-extrabold tracking-wider uppercase text-[#091540] bg-[#EFF8E2] border border-[#8DC63F]/40 px-4 py-2 rounded-full">
              03 · Invest (Wealth Growth)
            </span>
          </div>
        </div>
      </section>

      {/* STEP 01: SAVE */}
      <section id="si-save" className="py-14 sm:py-20 bg-[#F8FAFE] border-b border-[rgba(26,59,159,0.08)] scroll-mt-16">
        <div className="max-w-[820px] mx-auto px-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-9 h-9 rounded-full bg-[#1A3B9F] text-white flex items-center justify-center font-bold text-sm">
              01
            </span>
            <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#091540]">
              Save
            </h2>
          </div>

          <p className="font-[var(--fd)] text-lg sm:text-xl italic text-[#1A3B9F] mb-6">
            Before anything grows, something has to sit still.
          </p>

          <p className="text-sm sm:text-base text-[#4B5563] font-light leading-relaxed mb-6">
            The first job is a liquid cushion that does nothing exciting. Money you can reach in 24 hours without selling anything at a bad market price, and without asking anyone's permission.
          </p>

          <div className="bg-white border border-[rgba(26,59,159,0.12)] rounded-2xl p-6 shadow-sm mb-6">
            <span className="block text-xs font-extrabold uppercase tracking-wider text-[#091540] mb-3">
              What this cushion absorbs
            </span>
            <ul className="space-y-2 text-sm text-[#4B5563] font-light">
              <li>• Job gaps, career sabbaticals, and delayed client payments</li>
              <li>• Medical out-of-pocket expenses your policy doesn't reimburse immediately</li>
              <li>• Home repairs, appliance replacements, or vehicle breakdowns</li>
              <li>• Unplanned family obligations that arrive on short notice</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-white border border-[rgba(26,59,159,0.1)] rounded-2xl p-5 shadow-sm">
              <span className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                How Much
              </span>
              <p className="text-xs sm:text-sm text-[#4B5563] font-light leading-relaxed">
                3 to 6 months of expenses for salaried individuals. Business owners, consultants, or single-earner households should target 6 to 12 months.
              </p>
            </div>

            <div className="bg-white border border-[rgba(26,59,159,0.1)] rounded-2xl p-5 shadow-sm">
              <span className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                Where It Sits
              </span>
              <p className="text-xs sm:text-sm text-[#4B5563] font-light leading-relaxed">
                High-liquidity instruments (sweep accounts, liquid mutual funds, short deposits) accessible in hours, not business days.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#EFF8E2] border border-[#8DC63F]/30 text-xs sm:text-sm text-[#1A4A2A]">
            <strong>Related:</strong> <Link to="/fw/zero-int" className="font-bold underline">Zero-Interest Planner</Link> — if you are servicing high-cost personal credit, eliminate it alongside your emergency reserve.
          </div>
        </div>
      </section>

      {/* STEP 02: INSURE */}
      <section id="si-insure" className="py-14 sm:py-20 bg-white border-b border-[rgba(26,59,159,0.08)] scroll-mt-16">
        <div className="max-w-[820px] mx-auto px-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-9 h-9 rounded-full bg-[#1A3B9F] text-white flex items-center justify-center font-bold text-sm">
              02
            </span>
            <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#091540]">
              Insure
            </h2>
          </div>

          <p className="font-[var(--fd)] text-lg sm:text-xl italic text-[#1A3B9F] mb-6">
            Protect the engine before you upgrade the fittings.
          </p>

          <p className="text-sm sm:text-base text-[#4B5563] font-light leading-relaxed mb-6">
            Your earning capability is the foundational engine funding every other goal in the plan. If it stops, the entire timeline collapses. Insurance is what keeps a single catastrophic health event from wiping out years of disciplined compounding.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-[#F8FAFE] border border-[rgba(26,59,159,0.12)] rounded-2xl p-6 shadow-sm">
              <span className="text-2xl block mb-2">🛡️</span>
              <h3 className="font-[var(--fd)] text-base font-bold text-[#091540] mb-1">
                Pure Term Insurance
              </h3>
              <p className="text-xs sm:text-sm text-[#4B5563] font-light leading-relaxed">
                Replaces lost income if you pass away prematurely. Zero investment gimmick, pure protection — giving you high sum assured at low annual premiums.
              </p>
            </div>

            <div className="bg-[#F8FAFE] border border-[rgba(26,59,159,0.12)] rounded-2xl p-6 shadow-sm">
              <span className="text-2xl block mb-2">🏥</span>
              <h3 className="font-[var(--fd)] text-base font-bold text-[#091540] mb-1">
                Comprehensive Health Cover
              </h3>
              <p className="text-xs sm:text-sm text-[#4B5563] font-light leading-relaxed">
                Prevents large hospital admissions from raiding your mutual fund portfolios. Independent personal coverage stays intact even if you change employers.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs sm:text-sm text-[#4B5563] mb-6">
            <strong className="text-[#091540]">The common mistake we fix:</strong> Mixing insurance with investment (ULIPs, traditional endowment policies). Separating the two — pure protection here, wealth growth in step three — delivers higher sum assured and superior post-tax compounding for the exact same outlay.
          </div>

          <div className="flex flex-wrap gap-3 text-xs">
            <Link to="/insurance/term" className="text-[#1A3B9F] font-bold underline">
              Term Insurance Guide →
            </Link>
            <span className="text-gray-300">·</span>
            <Link to="/insurance/health" className="text-[#1A3B9F] font-bold underline">
              Health Insurance Calculator →
            </Link>
          </div>
        </div>
      </section>

      {/* STEP 03: INVEST */}
      <section id="si-invest" className="py-14 sm:py-20 bg-[#F8FAFE] border-b border-[rgba(26,59,159,0.08)] scroll-mt-16">
        <div className="max-w-[820px] mx-auto px-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-9 h-9 rounded-full bg-[#1A3B9F] text-white flex items-center justify-center font-bold text-sm">
              03
            </span>
            <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#091540]">
              Invest
            </h2>
          </div>

          <p className="font-[var(--fd)] text-lg sm:text-xl italic text-[#1A3B9F] mb-6">
            Now your money can go to work.
          </p>

          <p className="text-sm sm:text-base text-[#4B5563] font-light leading-relaxed mb-6">
            With a cushion in place and your income defended, investing stops being an anxious gamble on timing and becomes a dependable function of time. You can hold through market corrections because short-term shocks don't force you to liquidate holdings.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white border border-[rgba(26,59,159,0.1)] rounded-2xl p-5 shadow-sm">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#6B7280] block mb-1">
                Short Horizon (&lt; 3 Yrs)
              </span>
              <h4 className="font-[var(--fd)] text-base font-bold text-[#091540] mb-2">
                Capital Stability
              </h4>
              <p className="text-xs text-[#4B5563] font-light">
                Arbitrage, short-duration debt funds, liquid instruments. Focus is preserving money earmarked for imminent goals.
              </p>
            </div>

            <div className="bg-white border border-[rgba(26,59,159,0.1)] rounded-2xl p-5 shadow-sm">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#6B7280] block mb-1">
                Medium Horizon (3–7 Yrs)
              </span>
              <h4 className="font-[var(--fd)] text-base font-bold text-[#091540] mb-2">
                Balanced Growth
              </h4>
              <p className="text-xs text-[#4B5563] font-light">
                Multi-asset, balanced advantage, hybrid strategies that compound capital while cushioning downward volatility.
              </p>
            </div>

            <div className="bg-white border border-[rgba(26,59,159,0.1)] rounded-2xl p-5 shadow-sm">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#6B7280] block mb-1">
                Long Horizon (&gt; 7 Yrs)
              </span>
              <h4 className="font-[var(--fd)] text-base font-bold text-[#091540] mb-2">
                Wealth Compounding
              </h4>
              <p className="text-xs text-[#4B5563] font-light">
                Diversified equity mutual funds, SIFs, PMS, and global allocations with the runway to outpace long-term inflation.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#EFF8E2] border border-[#8DC63F]/30 text-xs sm:text-sm text-[#1A4A2A]">
            <strong>Related:</strong> <Link to="/fw/build" className="font-bold underline">WealthPath Simulator</Link> — run scenario projections testing returns against inflation erosion.
          </div>
        </div>
      </section>

      {/* MATRIX TABLE: AT A GLANCE */}
      <section className="py-14 sm:py-20 bg-white border-b border-[rgba(26,59,159,0.08)]">
        <div className="max-w-[820px] mx-auto px-6">
          <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#1A3B9F] block mb-2">
            At a Glance
          </span>
          <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#091540] tracking-tight mb-6">
            What this looks like in practice
          </h2>

          <div className="border border-[rgba(26,59,159,0.12)] rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead className="bg-[#0D1E52] text-white">
                <tr>
                  <th className="p-3.5 font-bold uppercase tracking-wider text-[11px]"></th>
                  <th className="p-3.5 font-bold uppercase tracking-wider text-[11px]">01 · Save</th>
                  <th className="p-3.5 font-bold uppercase tracking-wider text-[11px]">02 · Insure</th>
                  <th className="p-3.5 font-bold uppercase tracking-wider text-[11px]">03 · Invest</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-[#EFF8E2]/50">
                  <td className="p-3.5 font-bold text-[#091540] bg-gray-50">Job</td>
                  <td className="p-3.5">Absorb shocks</td>
                  <td className="p-3.5">Protect income</td>
                  <td className="p-3.5">Build wealth</td>
                </tr>
                <tr className="hover:bg-[#EFF8E2]/50">
                  <td className="p-3.5 font-bold text-[#091540] bg-gray-50">Access Time</td>
                  <td className="p-3.5">Hours</td>
                  <td className="p-3.5">On claim</td>
                  <td className="p-3.5">By goal date</td>
                </tr>
                <tr className="hover:bg-[#EFF8E2]/50">
                  <td className="p-3.5 font-bold text-[#091540] bg-gray-50">Success Metric</td>
                  <td className="p-3.5">It's there when needed</td>
                  <td className="p-3.5">Never needing it</td>
                  <td className="p-3.5">Reaching the target corpus</td>
                </tr>
                <tr className="hover:bg-[#EFF8E2]/50">
                  <td className="p-3.5 font-bold text-[#091540] bg-gray-50">Common Error</td>
                  <td className="p-3.5 text-rose-600 font-semibold">Skipped entirely</td>
                  <td className="p-3.5 text-rose-600 font-semibold">Bought as an investment</td>
                  <td className="p-3.5 text-rose-600 font-semibold">Started before steps 1 &amp; 2</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-14 sm:py-20 bg-[#F8FAFE] border-b border-[rgba(26,59,159,0.08)]">
        <div className="max-w-[760px] mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#1A3B9F] block mb-2">
              FAQ
            </span>
            <h2 className="font-[var(--fd)] text-3xl font-bold text-[#091540] tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((f, idx) => (
              <div
                key={idx}
                className="bg-white border border-[rgba(26,59,159,0.12)] rounded-2xl p-4 sm:p-5 shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex justify-between items-center text-left font-bold text-sm sm:text-base text-[#091540] hover:text-[#1A3B9F] transition-colors"
                >
                  <span>{f.q}</span>
                  <span className="text-lg text-[#8DC63F] font-extrabold ml-3">
                    {openFaq === idx ? "−" : "+"}
                  </span>
                </button>
                {openFaq === idx && (
                  <p className="text-xs sm:text-sm text-[#4B5563] font-light leading-relaxed mt-3 pt-3 border-t border-gray-100">
                    {f.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-[#091540] to-[#0D1E52] text-white text-center">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            See where your money plan stands
          </h2>
          <p className="text-sm sm:text-base text-white/80 font-light mb-8 leading-relaxed">
            A short 45-minute review will show you which of the three steps is furthest behind. Zero sales pressure, no cost, no obligations.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/wp/review"
              className="bg-[#8DC63F] hover:bg-[#9ED64A] text-[#091540] font-extrabold text-sm sm:text-base px-8 py-3.5 rounded-full shadow-lg transition-all"
            >
              Book a Strategy Review →
            </Link>
            <Link
              to="/fw/quiz"
              className="border border-white/20 bg-white/10 hover:bg-white/15 text-white font-bold text-sm sm:text-base px-8 py-3.5 rounded-full transition-all"
            >
              Take Financial Fitness Quiz
            </Link>
          </div>
          <p className="mt-8 text-xs text-white/45">
            Anmol Share Broking Pvt. Ltd. · AMFI ARN: 114893 · IRDAI Licensed Insurance Advisory
          </p>
        </div>
      </section>
    </div>
  );
}