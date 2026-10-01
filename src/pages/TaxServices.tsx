import React from "react";
import { Link } from "react-router";

export default function TaxServices() {
  return (
    <div className="font-[var(--fs)] bg-white text-[#111827] antialiased min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#091540] via-[#0D1E52] to-[#1A3B9F] py-20 text-center text-white px-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[580px] bg-[radial-gradient(circle,rgba(141,198,63,0.18)_0%,transparent_65%)] filter blur-3xl pointer-events-none" />
        <div className="max-w-2xl mx-auto relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-3xl mx-auto mb-6">
            📋
          </div>
          <span className="text-[11px] font-extrabold uppercase tracking-[.18em] text-[#8DC63F] block mb-3">
            Financial Compliance
          </span>
          <h1 className="font-[var(--fd)] text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Tax <span className="text-[#8DC63F] italic">Services</span>
          </h1>
          <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed">
            Proactive tax planning, capital gains optimization, and seamless compliance filings coordinated with your Chartered Accountant.
          </p>
        </div>
      </section>

      <section className="py-20 max-w-[1140px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: "📊", title: "Strategic Tax Planning", desc: "Structure your investments across ELSS, insurance, and asset classes to legally minimize annual tax outlays." },
            { icon: "📈", title: "Capital Gains Structuring", desc: "Optimize your short-term and long-term capital gains tax liability across equity, debt, and property sales." },
            { icon: "🤝", title: "CA Coordination", desc: "Collaborate directly with your chartered accountant to ensure clean year-end filings and complete compliance records." },
          ].map((s, i) => (
            <div key={i} className="bg-[#F8FAFE] border border-[rgba(26,59,159,0.12)] rounded-3xl p-8 shadow-sm">
              <div className="text-3xl mb-4">{s.icon}</div>
              <h3 className="font-[var(--fd)] text-xl font-bold text-[#091540] mb-3">{s.title}</h3>
              <p className="text-sm text-[#4B5563] font-light leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-[#091540] via-[#0D1E52] to-[#1A3B9F] text-center text-white px-6">
        <div className="max-w-xl mx-auto">
          <h2 className="font-[var(--fd)] text-3xl font-bold mb-4">Optimize your tax liabilities</h2>
          <p className="text-sm sm:text-base text-white/80 font-light mb-8">
            Speak with our advisory team to build a proactive tax strategy.
          </p>
          <Link
            to="/wp/review"
            className="inline-flex items-center gap-2 bg-[#8DC63F] hover:bg-[#9ED64A] text-[#091540] font-extrabold text-sm px-8 py-3.5 rounded-full shadow-lg transition-all"
          >
            Schedule a Consultation →
          </Link>
        </div>
      </section>
    </div>
  );
}