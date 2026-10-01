import React, { useRef } from "react";
import { Link } from "react-router";

export default function TermInsurance() {
  const storyRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const scrollToStory = () => {
    storyRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const perks = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v20M17 6H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
        </svg>
      ),
      title: "Instant Cash Flow",
      desc: "Delivers a large, tax-free lump sum payout to replace lost income immediately.",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 21V9l8-6 8 6v12M9 21v-6h6v6" />
        </svg>
      ),
      title: "Debt Elimination",
      desc: "Wipes out major liabilities — like home loans — in one go, so the family keeps their home.",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3z" />
        </svg>
      ),
      title: "Asset Protection",
      desc: "Prevents forced, distressed sales of gold, real estate, or long-term investments.",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 3v18M5 4h11l-3 4 3 4H5" />
        </svg>
      ),
      title: "Guaranteed Future Goals",
      desc: "Ensures money earmarked for college tuition and retirement stays untouched.",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 17l6-6 4 4 8-8M15 7h6v6" />
        </svg>
      ),
      title: "High Coverage, Low Cost",
      desc: "Provides massive financial protection for a small, affordable monthly premium.",
    },
  ];

  const reasons = [
    "Access to multiple leading insurance companies",
    "Expert financial advisors",
    "Personalized policy recommendations",
    "Transparent plan comparisons",
    "Hassle-free documentation",
    "Dedicated claim assistance",
    "Customer-first approach",
  ];

  return (
    <div className="font-[var(--fs)] bg-white text-[#111827] antialiased">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#091540] via-[#0D1E52] to-[#1A3B9F] py-16 sm:py-24 text-white">
        <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle,rgba(141,198,63,0.18)_0%,transparent_65%)] filter blur-3xl" />
        <div className="max-w-[1080px] mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8DC63F]/15 border border-[#8DC63F]/30 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#8DC63F] animate-pulse" />
                <span className="text-[11px] font-extrabold uppercase tracking-[.14em] text-[#8DC63F]">
                  The moment everything changes
                </span>
              </div>
              <h1 className="font-[var(--fd)] text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.08] mb-6">
                Term Insurance <br />
                <span className="text-[#8DC63F]">for complete peace</span>
              </h1>
              <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-xl font-light mb-8">
                Term Insurance is a life insurance plan that provides financial
                protection to your family in your absence — at an affordable premium.
                Here's what it actually protects them from.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={scrollToStory}
                  className="bg-[#8DC63F] hover:bg-[#9ED64A] text-[#091540] font-extrabold text-sm sm:text-base px-7 py-3.5 rounded-full transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
                >
                  See What This Prevents
                </button>
                <button
                  type="button"
                  onClick={scrollToContact}
                  className="border border-white/20 bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base px-7 py-3.5 rounded-full transition-all cursor-pointer"
                >
                  Talk to an Advisor
                </button>
              </div>
            </div>

            {/* Shield Motif Visual */}
            <div className="flex justify-center">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
                <div className="absolute inset-0 bg-white/5 rounded-full border border-white/10" />
                <svg className="w-56 h-56" viewBox="0 0 400 400" fill="none">
                  <line x1="200" y1="50" x2="200" y2="145" stroke="#8DC63F" strokeWidth="4" strokeLinecap="round" strokeDasharray="8 6" />
                  <path d="M200 148 L262 148 L262 208 C262 250 236 276 200 292 C164 276 138 250 138 208 L138 148 Z" stroke="#FFFFFF" strokeWidth="4" strokeLinejoin="round" fill="rgba(255,255,255,0.06)" />
                  <path d="M172 212 L192 232 L230 188" stroke="#8DC63F" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                  <g stroke="#8DC63F" strokeWidth="3" strokeLinecap="round">
                    <line x1="200" y1="128" x2="200" y2="116" />
                    <line x1="180" y1="134" x2="172" y2="126" />
                    <line x1="220" y1="134" x2="228" y2="126" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RAHUL'S STORY (CONSEQUENCE CASCADE) */}
      <section ref={storyRef} className="py-16 sm:py-24 bg-[#F8FAFE]">
        <div className="max-w-[760px] mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#1A3B9F] block mb-2">
              What Actually Happens
            </span>
            <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-bold text-[#091540] tracking-tight">
              Rahul's Story
            </h2>
          </div>

          <p className="text-[#4B5563] text-base sm:text-[16.5px] leading-relaxed mb-12 text-center max-w-2xl mx-auto font-light">
            Rahul is his family's sole breadwinner — covering a{" "}
            <strong className="text-[#091540] font-bold">₹50 lakh home loan</strong>, household bills, and his kids' school fees. When he suddenly passes away, his monthly income drops to zero instantly. Here's what follows, one consequence triggering the next.
          </p>

          <div className="relative pl-12 sm:pl-16 space-y-8 before:content-[''] before:absolute before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-[#1A3B9F] before:via-[#1A3B9F] before:to-gray-300">
            {/* Step 1 */}
            <div className="relative bg-white border border-[rgba(26,59,159,0.1)] rounded-xl p-5 shadow-sm">
              <span className="absolute -left-12 sm:-left-16 top-4 w-10 h-10 rounded-full bg-[#1A3B9F] text-white flex items-center justify-center font-bold text-sm ring-4 ring-white">
                1
              </span>
              <h3 className="font-[var(--fd)] text-lg font-bold text-[#091540] mb-1">
                Income Stops, Instantly
              </h3>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                The household's entire monthly income disappears the moment Rahul is gone — with the ₹50 lakh loan and every bill still due.
              </p>
            </div>

            {/* Interruption banner */}
            <div className="relative bg-gradient-to-r from-[#EFF8E2] to-white border border-[#8DC63F] rounded-xl p-4 sm:p-5 flex items-center gap-4 text-[#1A4A2A] font-semibold text-sm shadow-sm">
              <div className="w-9 h-9 rounded-full bg-[#8DC63F] text-[#091540] flex items-center justify-center shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3z" />
                </svg>
              </div>
              <span>
                A term insurance payout arrives here — before any of what follows has to happen.
              </span>
            </div>

            {/* Faded Step 2 */}
            <div className="relative bg-white/70 border border-dashed border-gray-300 rounded-xl p-5 opacity-80 hover:opacity-100 transition-opacity">
              <span className="absolute -left-12 sm:-left-16 top-4 w-10 h-10 rounded-full bg-gray-200 border-2 border-dashed border-gray-400 text-gray-600 flex items-center justify-center font-bold text-sm ring-4 ring-white">
                2
              </span>
              <h3 className="font-[var(--fd)] text-base font-bold text-[#4B5563] mb-1">
                Savings Drained
              </h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                To keep the house and pay daily bills, his wife is forced to empty their savings just to stay afloat.
              </p>
            </div>

            {/* Faded Step 3 */}
            <div className="relative bg-white/70 border border-dashed border-gray-300 rounded-xl p-5 opacity-80 hover:opacity-100 transition-opacity">
              <span className="absolute -left-12 sm:-left-16 top-4 w-10 h-10 rounded-full bg-gray-200 border-2 border-dashed border-gray-400 text-gray-600 flex items-center justify-center font-bold text-sm ring-4 ring-white">
                3
              </span>
              <h3 className="font-[var(--fd)] text-base font-bold text-[#4B5563] mb-1">
                Gold Sold at a Loss
              </h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                Family gold gets sold under pressure, at whatever price is available — not the price it's actually worth.
              </p>
            </div>

            {/* Faded Step 4 */}
            <div className="relative bg-white/70 border border-dashed border-gray-300 rounded-xl p-5 opacity-80 hover:opacity-100 transition-opacity">
              <span className="absolute -left-12 sm:-left-16 top-4 w-10 h-10 rounded-full bg-gray-200 border-2 border-dashed border-gray-400 text-gray-600 flex items-center justify-center font-bold text-sm ring-4 ring-white">
                4
              </span>
              <h3 className="font-[var(--fd)] text-base font-bold text-[#4B5563] mb-1">
                Investments Broken
              </h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                Long-term investments meant for the children's education get broken early, losing years of intended growth.
              </p>
            </div>

            {/* Faded Step 5 */}
            <div className="relative bg-white/70 border border-dashed border-gray-300 rounded-xl p-5 opacity-80 hover:opacity-100 transition-opacity">
              <span className="absolute -left-12 sm:-left-16 top-4 w-10 h-10 rounded-full bg-gray-200 border-2 border-dashed border-gray-400 text-gray-600 flex items-center justify-center font-bold text-sm ring-4 ring-white">
                5
              </span>
              <h3 className="font-[var(--fd)] text-base font-bold text-[#4B5563] mb-1">
                A Forced Downgrade
              </h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                She eventually takes a low-paying job, and the family is pushed into a drastic lifestyle downgrade just to survive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PERKS SECTION */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-[1080px] mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#1A3B9F] block mb-2">
              The Solution
            </span>
            <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-bold text-[#091540] tracking-tight">
              Key Perks of Term Insurance
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {perks.map((p, idx) => (
              <div
                key={idx}
                className="bg-[#F8FAFE] border border-[rgba(26,59,159,0.1)] rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-[#EEF2FB] text-[#1A3B9F] flex items-center justify-center mb-5">
                  {p.icon}
                </div>
                <h3 className="font-[var(--fd)] text-lg font-bold text-[#091540] mb-2">
                  {p.title}
                </h3>
                <p className="text-sm text-[#4B5563] leading-relaxed font-light">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE ANMOL */}
      <section className="py-16 sm:py-20 bg-[#F8FAFE] border-y border-[rgba(26,59,159,0.08)]">
        <div className="max-w-[840px] mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#8DC63F] block mb-2">
              Why Anmol
            </span>
            <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#091540] tracking-tight">
              Why Thousands of Customers Choose Anmol Share Broking
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reasons.map((r, i) => (
              <div
                key={i}
                className="bg-white border border-[rgba(26,59,159,0.1)] rounded-xl p-4 flex items-center gap-3.5 shadow-sm"
              >
                <div className="w-6 h-6 rounded-full bg-[#EFF8E2] text-[#8DC63F] flex items-center justify-center shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-[#091540]">{r}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section ref={contactRef} className="py-16 sm:py-20 bg-gradient-to-br from-[#091540] to-[#1A3B9F] text-white text-center">
        <div className="max-w-xl mx-auto px-6">
          <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#8DC63F] block mb-3">
            Get Started Today
          </span>
          <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Secure Today. Protect Tomorrow.
          </h2>
          <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-8 font-light">
            Protect your family's future with the right term insurance plan. Our experts will help you compare policies, understand benefits, and choose the best coverage based on your financial goals.
          </p>
          <a
            href="https://wa.me/919742826665"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#8DC63F] hover:bg-[#9ED64A] text-[#091540] font-extrabold text-sm sm:text-base px-8 py-3.5 rounded-full transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Speak With an Advisor
          </a>
          <p className="mt-8 text-xs text-white/50">
            Anmol Share Broking Pvt. Ltd. · AMFI ARN 114893 · IRDAI Licensed Advisory
          </p>
        </div>
      </section>
    </div>
  );
}