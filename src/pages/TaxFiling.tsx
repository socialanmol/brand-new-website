import React from "react";
import { Link } from "react-router";

export default function TaxFiling() {
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
            🧾
          </div>
          <span className="text-[11px] font-extrabold uppercase tracking-[.18em] text-[#8DC63F] block mb-3">
            Stay Compliant
          </span>
          <h1 className="font-[var(--fd)] text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Tax Filing
          </h1>
          <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed">
            File on time. Save more. Stress less.
          </p>
        </div>
      </section>

      {/* WHAT IS IT */}
      <section className="py-14 sm:py-18 bg-white max-w-[820px] mx-auto px-6">
        <div className="bg-[#EEF2FB] border border-[rgba(26,59,159,0.15)] rounded-3xl p-8">
          <p className="text-[#374151] text-base sm:text-lg leading-relaxed font-light">
            Tax filing is the process of reporting your income, deductions, and taxes paid to the Income Tax Department each year. Filing correctly and on time helps you stay compliant — and, more often than not, helps you save money too.
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
            Benefits of Filing on Time
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: "🚫", title: "Avoid Penalties", desc: "Late filing can attract fines and interest charges you don't need to pay." },
              { icon: "💰", title: "Maximize Deductions", desc: "Claim eligible exemptions under sections like 80C, 80D, and more." },
              { icon: "📄", title: "Build Financial Proof", desc: "ITR filings serve as income proof for loans, visas, and other approvals." },
              { icon: "🧘", title: "Peace of Mind", desc: "No last-minute scrambling or compliance worries come deadline time." },
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
            { num: "01", title: "Gather your documents", desc: "Form 16, bank statements, investment proofs, and other income records." },
            { num: "02", title: "Choose the right tax regime", desc: "Old vs New — we help you pick whichever saves you more." },
            { num: "03", title: "File & verify", desc: "We prepare, file, and verify your return well before the deadline." },
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
          <h2 className="font-[var(--fd)] text-3xl font-bold mb-4">Ready to file with confidence?</h2>
          <p className="text-sm sm:text-base text-white/80 font-light mb-8">
            Talk to a MyAnmol advisor to get your taxes filed accurately, on time, every time.
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