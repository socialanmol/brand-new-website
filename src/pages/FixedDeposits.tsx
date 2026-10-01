import React from "react";
import { Link } from "react-router";

export default function FixedDeposits() {
  return (
    <div className="font-[var(--fs)] bg-white text-[#111827] antialiased min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#091540] via-[#0D1E52] to-[#1A3B9F] py-16 sm:py-24 text-center text-white px-6">
        <Link
          to="/services/other"
          className="absolute top-6 left-6 inline-flex items-center gap-2 text-xs font-bold text-white/80 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-all"
        >
          ← Back to Other Services
        </Link>
        <div className="max-w-xl mx-auto relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-[#8DC63F]/15 border border-[#8DC63F]/30 flex items-center justify-center text-3xl mx-auto mb-6">
            💰
          </div>
          <span className="text-[11px] font-extrabold uppercase tracking-[.18em] text-[#8DC63F] block mb-3">
            Save With Confidence
          </span>
          <h1 className="font-[var(--fd)] text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Fixed Deposits
          </h1>
          <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed">
            A safe place for your money to grow — guaranteed.
          </p>
        </div>
      </section>

      {/* WHAT IS IT */}
      <section className="py-14 sm:py-18 bg-white max-w-[820px] mx-auto px-6">
        <div className="bg-[#EEF2FB] border border-[rgba(26,59,159,0.15)] rounded-3xl p-8">
          <p className="text-[#374151] text-base sm:text-lg leading-relaxed font-light">
            A Fixed Deposit (FD) is a savings option where you invest a lump sum with a bank for a fixed period, and earn a fixed rate of interest. Your money grows steadily and predictably — no market ups and downs, no guesswork.
          </p>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-14 sm:py-20 bg-[#F8FAFE] border-y border-[rgba(26,59,159,0.08)]">
        <div className="max-w-[820px] mx-auto px-6">
          <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#8DC63F] block mb-2">
            Why It Works
          </span>
          <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#091540] mb-8">
            Benefits of a Fixed Deposit
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: "✅", title: "Guaranteed Returns", desc: "Know exactly how much you'll earn before you invest — no surprises." },
              { icon: "📅", title: "Flexible Tenure", desc: "Choose anywhere from 7 days to 10 years, based on your goals." },
              { icon: "🛡️", title: "Safe & Secure", desc: "Your principal amount is protected, unlike market-linked investments." },
              { icon: "💧", title: "Easy Liquidity", desc: "Break your FD early if you need funds in an emergency, with minor charges." },
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

      {/* HOW IT WORKS */}
      <section className="py-16 bg-white max-w-[820px] mx-auto px-6">
        <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#1A3B9F] block mb-2">
          Getting Started
        </span>
        <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#091540] mb-8">
          How It Works
        </h2>

        <div className="space-y-4">
          {[
            { num: "01", title: "Choose your amount & tenure", desc: "Decide how much to invest and for how long." },
            { num: "02", title: "Lock in your interest rate", desc: "Your rate stays fixed for the entire tenure, regardless of market changes." },
            { num: "03", title: "Receive returns at maturity", desc: "Get your principal plus interest back, or simply reinvest it." },
          ].map((s, i) => (
            <div key={i} className="flex gap-4 p-5 rounded-2xl bg-[#F8FAFE] border border-[rgba(26,59,159,0.1)]">
              <span className="font-[var(--fd)] text-2xl font-bold text-[#8DC63F]">{s.num}</span>
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
          <h2 className="font-[var(--fd)] text-3xl font-bold mb-4">Ready to start saving smarter?</h2>
          <p className="text-sm sm:text-base text-white/80 font-light mb-8">
            Talk to a MyAnmol advisor about choosing the right Fixed Deposit for your goals.
          </p>
          <Link
            to="/wp/review"
            className="inline-flex items-center gap-2 bg-[#8DC63F] hover:bg-[#9ED64A] text-[#091540] font-extrabold text-sm px-8 py-3.5 rounded-full shadow-lg transition-all"
          >
            Talk to an Advisor →
          </Link>
        </div>
      </section>
    </div>
  );
}