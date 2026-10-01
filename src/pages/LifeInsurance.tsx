import React, { useState } from "react";

function fmtINR(n: number): string {
  if (n >= 10000000) return "₹" + (n / 10000000).toFixed(2).replace(/\.00$/, "") + " Cr";
  if (n >= 100000) return "₹" + (n / 100000).toFixed(1).replace(/\.0$/, "") + " L";
  return "₹" + n.toLocaleString("en-IN");
}

export default function LifeInsurance() {
  const [age, setAge] = useState(30);
  const [income, setIncome] = useState(1000000);
  const [deps, setDeps] = useState(2);
  const [existing, setExisting] = useState(2000000);

  let multiplier = 6;
  if (age < 30) multiplier = 20;
  else if (age < 40) multiplier = 15;
  else if (age < 50) multiplier = 10;

  const baseCover = income * multiplier;
  const dependentBuffer = deps * 1000000;
  const totalNeed = baseCover + dependentBuffer;
  const additionalNeed = Math.max(0, totalNeed - existing);

  return (
    <div className="font-[var(--fs)] bg-white text-[#111827] antialiased">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#091540] via-[#0D1E52] to-[#1A3B9F] py-16 sm:py-24 text-center text-white">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(141,198,63,0.2)_0%,transparent_65%)] filter blur-3xl pointer-events-none" />
        <div className="max-w-2xl mx-auto px-6 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-[#8DC63F]/15 border border-[#8DC63F]/30 flex items-center justify-center text-3xl mx-auto mb-6">
            🛡️
          </div>
          <span className="text-[11px] font-extrabold uppercase tracking-[.18em] text-[#8DC63F] block mb-3">
            Life Insurance
          </span>
          <h1 className="font-[var(--fd)] text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-4">
            Insuring the future of your loved ones
          </h1>
          <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed">
            Protection from financial loss, built around what matters most to you.
          </p>
        </div>
      </section>

      {/* BASICS */}
      <section className="py-14 sm:py-18 bg-white">
        <div className="max-w-[900px] mx-auto px-6">
          <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#1A3B9F] block mb-3">
            First, the Basics
          </span>
          <div className="bg-[#EFF8E2]/60 border border-[rgba(141,198,63,0.3)] rounded-2xl p-6 sm:p-8">
            <p className="text-[#1A4A2A] text-base sm:text-lg leading-relaxed font-light">
              Insurance is a means of protection from financial loss. It is a form of risk management primarily used to hedge against the risk of a contingent, uncertain loss.
            </p>
            <div className="inline-flex items-center gap-2 bg-[#1A3B9F] text-white rounded-full px-5 py-2 mt-5 text-xs sm:text-sm font-semibold">
              The amount charged for a given coverage is called the{" "}
              <strong className="text-[#8DC63F] font-bold">Premium</strong>
            </div>
          </div>
        </div>
      </section>

      {/* WHY LIFE INSURANCE */}
      <section className="py-14 sm:py-20 bg-[#F8FAFE]">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="mb-10">
            <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#8DC63F] block mb-2">
              Life Insurance
            </span>
            <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#091540] tracking-tight">
              Why it belongs in your financial plan
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white border border-[rgba(26,59,159,0.1)] rounded-2xl p-6 flex gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-[#EEF2FB] flex items-center justify-center text-2xl shrink-0">
                👨‍👩‍👧
              </div>
              <div>
                <h3 className="font-[var(--fd)] text-base font-bold text-[#091540] mb-1">
                  Family Protection
                </h3>
                <p className="text-sm text-[#4B5563] leading-relaxed font-light">
                  Protects your family from financial distress after your death, giving them security when they need it most.
                </p>
              </div>
            </div>

            <div className="bg-white border border-[rgba(26,59,159,0.1)] rounded-2xl p-6 flex gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-[#EEF2FB] flex items-center justify-center text-2xl shrink-0">
                💵
              </div>
              <div>
                <h3 className="font-[var(--fd)] text-base font-bold text-[#091540] mb-1">
                  Tax-Free Payout
                </h3>
                <p className="text-sm text-[#4B5563] leading-relaxed font-light">
                  Proceeds are paid to your beneficiary tax-free — a lump sum they can use for any purpose, without deductions.
                </p>
              </div>
            </div>

            <div className="bg-white border border-[rgba(26,59,159,0.1)] rounded-2xl p-6 flex gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-[#EEF2FB] flex items-center justify-center text-2xl shrink-0">
                ⚖️
              </div>
              <div>
                <h3 className="font-[var(--fd)] text-base font-bold text-[#091540] mb-1">
                  Right-Sizing Your Cover
                </h3>
                <p className="text-sm text-[#4B5563] leading-relaxed font-light">
                  Helps you understand whether you're under-insured or over-insured, so your policies fit into your broader financial plan.
                </p>
              </div>
            </div>

            <div className="bg-white border border-[rgba(26,59,159,0.1)] rounded-2xl p-6 flex gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-[#EEF2FB] flex items-center justify-center text-2xl shrink-0">
                📈
              </div>
              <div>
                <h3 className="font-[var(--fd)] text-base font-bold text-[#091540] mb-1">
                  Savings Component
                </h3>
                <p className="text-sm text-[#4B5563] leading-relaxed font-light">
                  Depending on the policy you choose, life insurance can also build a savings component alongside your cover.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HUMAN LIFE VALUE CALCULATOR */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-[760px] mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#1A3B9F] block mb-2">
              Quick Check
            </span>
            <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#091540] tracking-tight mb-2">
              Am I under-insured?
            </h2>
            <p className="text-sm text-[#6B7280] font-light max-w-md mx-auto">
              A simple estimate using the Human Life Value (HLV) method — the same approach insurance advisors use as a starting point.
            </p>
          </div>

          <div className="bg-[#F8FAFE] border border-[rgba(26,59,159,0.1)] rounded-3xl p-6 sm:p-10 shadow-lg shadow-[rgba(26,59,159,0.04)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Age */}
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <label className="text-[11px] font-extrabold uppercase tracking-wider text-[#6B7280]">
                    Your Age
                  </label>
                  <span className="font-[var(--fd)] text-xl font-bold text-[#1A3B9F]">
                    {age} yrs
                  </span>
                </div>
                <input
                  type="range"
                  min="21"
                  max="60"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-[#1A3B9F]"
                />
                <div className="flex justify-between text-[10px] text-[#9CA3AF] mt-1">
                  <span>21</span>
                  <span>60</span>
                </div>
              </div>

              {/* Annual Income */}
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <label className="text-[11px] font-extrabold uppercase tracking-wider text-[#6B7280]">
                    Annual Income
                  </label>
                  <span className="font-[var(--fd)] text-xl font-bold text-[#1A3B9F]">
                    {fmtINR(income)}
                  </span>
                </div>
                <input
                  type="range"
                  min="300000"
                  max="10000000"
                  step="50000"
                  value={income}
                  onChange={(e) => setIncome(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-[#1A3B9F]"
                />
                <div className="flex justify-between text-[10px] text-[#9CA3AF] mt-1">
                  <span>₹3L</span>
                  <span>₹1Cr+</span>
                </div>
              </div>

              {/* Dependents */}
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <label className="text-[11px] font-extrabold uppercase tracking-wider text-[#6B7280]">
                    Dependents (spouse, kids, parents)
                  </label>
                  <span className="font-[var(--fd)] text-xl font-bold text-[#1A3B9F]">
                    {deps}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="6"
                  value={deps}
                  onChange={(e) => setDeps(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-[#1A3B9F]"
                />
                <div className="flex justify-between text-[10px] text-[#9CA3AF] mt-1">
                  <span>0</span>
                  <span>6+</span>
                </div>
              </div>

              {/* Existing Cover */}
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <label className="text-[11px] font-extrabold uppercase tracking-wider text-[#6B7280]">
                    Existing Life Cover
                  </label>
                  <span className="font-[var(--fd)] text-xl font-bold text-[#1A3B9F]">
                    {fmtINR(existing)}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20000000"
                  step="100000"
                  value={existing}
                  onChange={(e) => setExisting(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-[#1A3B9F]"
                />
                <div className="flex justify-between text-[10px] text-[#9CA3AF] mt-1">
                  <span>₹0</span>
                  <span>₹2Cr+</span>
                </div>
              </div>
            </div>

            {/* Result Display */}
            <div className="rounded-2xl p-6 bg-gradient-to-br from-[#091540] to-[#1A3B9F] text-center text-white shadow-md">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-white/70 block mb-2">
                Recommended Additional Cover
              </span>
              <div className="font-[var(--fd)] text-3xl sm:text-5xl font-extrabold text-[#8DC63F] mb-3">
                {additionalNeed === 0 ? "You look well covered" : fmtINR(additionalNeed)}
              </div>
              <p className="text-xs sm:text-sm text-white/75 max-w-md mx-auto leading-relaxed font-light">
                {additionalNeed === 0
                  ? "Your existing cover already meets this estimate — an advisor can confirm it aligns with your actual goals."
                  : `Based on ${multiplier}× your income for your age group, plus ₹10L per dependent, minus your existing cover.`}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-[#091540] to-[#0D1E52] text-white text-center">
        <div className="max-w-md mx-auto px-6">
          <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold tracking-tight mb-3">
            Not sure how much cover you need?
          </h2>
          <p className="text-white/75 text-sm sm:text-base leading-relaxed mb-6 font-light">
            Talk to a MyAnmol advisor to review your existing policies and build a life insurance plan that actually fits.
          </p>
          <a
            href="/get-started"
            className="inline-flex items-center gap-2 bg-[#8DC63F] hover:bg-[#9ED64A] text-[#091540] font-extrabold text-sm sm:text-base px-8 py-3.5 rounded-full transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Speak to an Advisor →
          </a>
        </div>
      </section>
    </div>
  );
}