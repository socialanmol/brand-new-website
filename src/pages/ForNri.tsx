import React, { useState } from "react";
import { Link } from "react-router";

const QUIZ_QUESTIONS = [
  { q: "Where do you currently live?", opts: ["UAE / Gulf", "USA / Canada", "UK / Europe", "Singapore / Australia"] },
  { q: "What's your main goal for India money?", opts: ["Grow savings in India", "Buy property", "Plan my return", "Protect my family"] },
  { q: "Annual India investment amount?", opts: ["Under ₹5 lakhs", "₹5L – ₹25L", "₹25L – ₹1 crore", "Above ₹1 crore"] }
];

export default function ForNri() {
  const [quizStep, setQuizStep] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [quizFinished, setQuizFinished] = useState(false);

  // Calculators State
  const [fdAmt, setFdAmt] = useState<number>(1000000);
  const [fdRate, setFdRate] = useState<number>(6.5);
  const [fdYears, setFdYears] = useState<number>(3);
  const [fdResult, setFdResult] = useState<{ maturity: number; interest: number } | null>(null);

  const [sipAmt, setSipAmt] = useState<number>(25000);
  const [sipRet, setSipRet] = useState<number>(15);
  const [sipYrs, setSipYrs] = useState<number>(10);
  const [sipResult, setSipResult] = useState<{ corpus: number; invested: number } | null>(null);

  const [dtaaInt, setDtaaInt] = useState<number>(500000);
  const [dtaaRate, setDtaaRate] = useState<number>(12.5);
  const [dtaaSaving, setDtaaSaving] = useState<number | null>(null);

  const handleQuizSel = (i: number) => {
    setSelectedOpt(i);
    setTimeout(() => {
      setSelectedOpt(null);
      if (quizStep < QUIZ_QUESTIONS.length - 1) {
        setQuizStep(quizStep + 1);
      } else {
        setQuizFinished(true);
      }
    }, 300);
  };

  const calcFD = () => {
    if (!fdAmt || !fdRate || !fdYears) return;
    const r = fdRate / 100;
    const maturity = fdAmt * Math.pow(1 + r / 4, 4 * fdYears);
    setFdResult({ maturity, interest: maturity - fdAmt });
  };

  const calcSIP = () => {
    if (!sipAmt || !sipRet || !sipYrs) return;
    const r = sipRet / 100 / 12;
    const n = sipYrs * 12;
    const corpus = sipAmt * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    setSipResult({ corpus, invested: sipAmt * n });
  };

  const calcDTAA = () => {
    if (!dtaaInt) return;
    const defaultTDS = dtaaInt * 0.309;
    const dtaaTDS = dtaaInt * (dtaaRate / 100);
    setDtaaSaving(defaultTDS - dtaaTDS);
  };

  const fmt = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");

  return (
    <div className="font-[var(--fs)] bg-[#F5F3EE] text-[#16241B] antialiased min-h-screen">
      {/* ── TICKER ── */}
      <div className="bg-[#0D1E52] text-white py-3 overflow-hidden border-b border-white/10">
        <div className="flex whitespace-nowrap animate-[ticker_34s_linear_infinite] w-max">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center shrink-0">
              {[
                "NRE FD rates up to 7.25% p.a. (Apr 2026)",
                "UAE DTAA: MF capital gains 0% tax (ITAT Oct 2024)",
                "GIFT City USD FD 4.8–5.5% p.a.",
                "Gold ETFs — 12.5% LTCG after 12 months",
                "RBI repo rate 5.25% (Apr 2026 MPC)",
                "SGB discontinued — Gold ETF is the alternative",
                "Term insurance GST: 0% from Sept 2025",
                "SM REIT min investment: ₹10 lakh (SEBI 2024)",
                "NPS age limit extended to 85 years",
              ].map((item, idx) => (
                <span key={idx} className="text-xs text-white/75 px-7 flex items-center gap-2 border-r border-white/15">
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── HERO SECTION ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#091540] via-[#0D1E52] to-[#1A3B9F] py-20 lg:py-28 text-white px-6">
        <div className="max-w-[1160px] mx-auto grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-14 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#8DC63F]/40 text-[#8DC63F] text-xs font-bold uppercase tracking-widest mb-6 bg-[#8DC63F]/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F] animate-pulse" />
              NRI Investment Specialists — Bengaluru
            </div>

            <h1 className="font-[var(--fd)] text-4xl sm:text-6xl font-bold tracking-tight mb-6 leading-tight">
              Your money in India, working as hard as you do.
            </h1>

            <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed mb-8 max-w-xl">
              Expert NRI investment planning — mutual funds, GIFT City, fixed deposits, real estate, insurance, gold and more. Built by Anmol Share Broking, trusted since 2005.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <Link
                to="/wp/review"
                className="bg-[#8DC63F] hover:bg-[#9ED64A] text-[#091540] font-extrabold text-sm px-8 py-3.5 rounded-xl shadow-lg transition-all"
              >
                Get your free plan →
              </Link>
              <a
                href="#nri-products"
                className="border border-white/30 hover:bg-white/10 text-white font-bold text-sm px-8 py-3.5 rounded-xl transition-all"
              >
                Explore products
              </a>
            </div>

            <div className="pt-6 border-t border-white/15 flex flex-wrap gap-6 text-xs text-white/80 font-semibold">
              <span className="flex items-center gap-1.5">✓ AMFI ARN 114893</span>
              <span className="flex items-center gap-1.5">✓ SEBI Compliant</span>
              <span className="flex items-center gap-1.5">✓ Est. 2005</span>
              <span className="flex items-center gap-1.5">✓ Zero hidden fees</span>
            </div>
          </div>

          {/* Interactive Quiz Card */}
          <div className="bg-white text-[#16241B] rounded-3xl p-8 shadow-2xl">
            <div className="flex gap-1.5 mb-4">
              {QUIZ_QUESTIONS.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    i <= quizStep ? "w-6 bg-[#8DC63F]" : "w-1.5 bg-gray-200"
                  }`}
                />
              ))}
            </div>

            <span className="text-[10px] font-bold uppercase tracking-widest text-[#1A3B9F] block mb-2">
              Find your NRI investment plan — 3 questions
            </span>

            {!quizFinished ? (
              <div>
                <h3 className="font-[var(--fd)] text-xl font-bold text-[#091540] mb-6">
                  {QUIZ_QUESTIONS[quizStep].q}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                  {QUIZ_QUESTIONS[quizStep].opts.map((opt, oi) => (
                    <button
                      key={oi}
                      onClick={() => handleQuizSel(oi)}
                      className={`text-left p-3.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                        selectedOpt === oi
                          ? "bg-[#1A3B9F] text-white border-[#1A3B9F]"
                          : "bg-[#F5F3EE] border-[rgba(26,74,42,0.14)] hover:border-[#1A3B9F]"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                <div className="text-[11px] text-[#5C6B60] text-center">
                  Question {quizStep + 1} of {QUIZ_QUESTIONS.length}
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <h3 className="font-[var(--fd)] text-2xl font-bold text-[#091540] mb-2">
                  Your plan is ready
                </h3>
                <p className="text-xs text-[#5C6B60] mb-6 leading-relaxed">
                  Based on your answers we've mapped out the right NRI investment strategy for you. Book a free call to walk through it.
                </p>
                <Link
                  to="/wp/review"
                  className="w-full bg-[#1A3B9F] hover:bg-[#0D1E52] text-white font-extrabold text-xs py-3.5 rounded-xl shadow-md transition-all block text-center"
                >
                  See my plan — Book free call
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── PRODUCTS GRID ── */}
      <section id="nri-products" className="py-20 bg-white px-6">
        <div className="max-w-[1160px] mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#1A3B9F] block mb-2">
            What we offer
          </span>
          <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-bold text-[#091540] mb-3">
            Every NRI investment, one trusted platform
          </h2>
          <p className="text-sm sm:text-base text-[#5C6B60] font-light mb-12">
            All AMFI, SEBI and IRDAI regulated products — explained clearly, invested intelligently.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { id: "nri-fd", title: "NRE / NRO / FCNR FD", desc: "Tax-free NRE FD, NRO for Indian income, FCNR in USD/GBP/EUR. No currency conversion risk on FCNR.", rate: "Up to 7.25% p.a. (Apr 2026)" },
              { id: "nri-mf", title: "Mutual Funds", desc: "All 36 SEBI categories. UAE NRIs: 0% capital gains via DTAA. US NRIs: GIFT City MF solves PFIC.", rate: "12–18% equity CAGR (historical)" },
              { id: "nri-gift", title: "GIFT City", desc: "USD investments in India's IFSC. Solves FATCA/PFIC for US NRIs. Section 10(4D) — fully tax exempt.", rate: "4.8–5.5% USD FD" },
              { id: "nri-reit", title: "Real Estate & REITs", desc: "Direct property, listed REITs from ₹440/unit, SM REITs from ₹10L. Section 54 tax planning included.", rate: "5.5–7.8% REIT dividend yield" },
              { id: "nri-insurance", title: "Insurance", desc: "Term life 30–60% cheaper than UAE/UK plans. GST removed Sept 2025. Health cover for parents in India.", rate: "₹1 Cr cover from ₹8,000/year" },
              { id: "nri-gold", title: "Gold", desc: "Gold ETFs — 12.5% LTCG after 12 months. SGBs discontinued (Budget 2025). NRIs cannot buy new SGBs.", rate: "ETF · Mutual Fund · Physical · Digital" },
              { id: "nri-nps", title: "Pensions & Annuities", desc: "NPS for Indian citizens (not OCI). Annuity planning for retirement income. Age limit now 85. ₹50K extra deduction.", rate: "60% lump sum tax-free at 60" },
              { id: "nri-saga", title: "SAGA — Guaranteed Income", desc: "HDFC Life Sanchay Aajeevan Guaranteed Advantage. Lock in your retirement income rate today. Guaranteed annuity for life.", rate: "Annuity rates 6.4%–21% locked at inception" },
              { id: "nri-qrops", title: "QROPS — UK Pension Transfer", desc: "Transfer your UK pension to India tax-efficiently. Avoid the 50–55% UK withdrawal tax. HMRC-approved Indian schemes.", rate: "Avoid up to 55% UK withdrawal tax" },
              { id: "nri-consult", title: "PMS & AIF", desc: "Portfolio Management Services from ₹50L. AIF from USD 75K in GIFT City. For HNI NRIs.", rate: "Min ₹50L (PMS) / USD 75K (AIF)" },
            ].map((p, i) => (
              <a
                key={i}
                href={`#${p.id}`}
                className="bg-[#F5F3EE] border border-[rgba(26,59,159,0.12)] rounded-2xl p-6 shadow-sm hover:border-[#1A3B9F] hover:-translate-y-1 transition-all flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-[var(--fd)] text-lg font-bold text-[#091540] mb-2">{p.title}</h3>
                  <p className="text-xs text-[#5C6B60] font-light leading-relaxed mb-4">{p.desc}</p>
                </div>
                <div className="text-xs font-bold text-[#1A3B9F] pt-3 border-t border-[rgba(26,59,159,0.1)]">
                  {p.rate}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO WE SERVE SECTION ── */}
      <section className="py-20 bg-[#F8FAFE] px-6 border-t border-gray-200">
        <div className="max-w-[1160px] mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#1A3B9F] block mb-2">
            Who we serve
          </span>
          <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-bold text-[#091540] mb-3">
            Built for every chapter of the NRI journey
          </h2>
          <p className="text-sm sm:text-base text-[#5C6B60] font-light mb-12">
            Whether you just landed abroad or have been planning your India return for decades — we have a roadmap for you.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { tag: "Building wealth abroad", title: "Foreign salary, India goals", desc: "You earn in AED, GBP or USD and want your India savings working smarter — tax-efficient, fully repatriable, zero hassle." },
              { tag: "Planning to return", title: "India return in 5–10 years", desc: "RNOR strategy, RFC conversion, property planning — the tax optimisation needs to start 3–5 years before you land." },
              { tag: "Managing Indian assets", title: "Rent, property, old investments", desc: "Rental income, property sales, repatriation, inherited wealth — India-side money that needs professional attention." },
            ].map((s, i) => (
              <div key={i} className="bg-white border border-[rgba(26,59,159,0.12)] rounded-2xl p-8 shadow-sm">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#1A3B9F] block mb-2">{s.tag}</span>
                <h3 className="font-[var(--fd)] text-xl font-bold text-[#091540] mb-3">{s.title}</h3>
                <p className="text-xs sm:text-sm text-[#5C6B60] font-light leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NRE / NRO / FCNR SECTION ── */}
      <section id="nri-fd" className="py-20 bg-white px-6">
        <div className="max-w-[1160px] mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#1A3B9F] block mb-2">Fixed Deposits</span>
          <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-bold text-[#091540] mb-6">
            NRE, NRO &amp; FCNR — which one is yours?
          </h2>

          <div className="bg-[#EEF2FB] border-l-4 border-[#1A3B9F] p-4 rounded-xl text-xs sm:text-sm text-[#4B5563] mb-8 font-light">
            <strong>April 2026 rate update:</strong> Following RBI's rate cuts through 2025 (repo rate now 5.25%), NRE FD rates at major banks have moderated to 6.25–7.25%.
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <thead className="bg-[#0D1E52] text-white">
                  <tr>
                    <th className="p-3.5">Feature</th>
                    <th className="p-3.5">NRE FD</th>
                    <th className="p-3.5">NRO FD</th>
                    <th className="p-3.5">FCNR FD</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-[#4B5563]">
                  <tr><td className="p-3.5 font-bold text-[#091540]">Currency</td><td className="p-3.5">INR</td><td className="p-3.5">INR</td><td className="p-3.5">USD/GBP/EUR</td></tr>
                  <tr><td className="p-3.5 font-bold text-[#091540]">Source of funds</td><td className="p-3.5">Foreign earnings</td><td className="p-3.5">Indian income</td><td className="p-3.5">Foreign earnings</td></tr>
                  <tr><td className="p-3.5 font-bold text-[#091540]">India tax</td><td className="p-3.5 text-emerald-600 font-bold">Zero — 10(4)</td><td className="p-3.5 text-rose-600 font-bold">30% TDS</td><td className="p-3.5 text-emerald-600 font-bold">Zero — 10(4)</td></tr>
                  <tr><td className="p-3.5 font-bold text-[#091540]">Repatriation</td><td className="p-3.5 text-emerald-600 font-bold">100% free</td><td className="p-3.5">USD 1M/year</td><td className="p-3.5 text-emerald-600 font-bold">100% free</td></tr>
                  <tr><td className="p-3.5 font-bold text-[#091540]">Min tenure</td><td className="p-3.5">1 year</td><td className="p-3.5">7 days</td><td className="p-3.5">1 year</td></tr>
                </tbody>
              </table>
            </div>

            <div className="space-y-6">
              <div className="bg-[#F8FAFE] border border-gray-200 rounded-2xl p-6">
                <h4 className="font-bold text-sm text-[#091540] mb-3">Where to check live NRE FD rates</h4>
                <ul className="space-y-2 text-xs text-gray-600 font-light list-disc pl-4">
                  <li>Bank websites directly — always the most current</li>
                  <li>Major banks: HDFC, ICICI, SBI, Axis, Federal, Kotak, Yes Bank, IndusInd</li>
                  <li>Rates change with RBI repo rate decisions — check before booking</li>
                </ul>
              </div>

              <div className="bg-[#F8FAFE] border border-gray-200 rounded-2xl p-6">
                <h4 className="font-bold text-sm text-[#091540] mb-3">DTAA on NRO FD — save lakhs</h4>
                <ul className="space-y-2 text-xs text-gray-600 font-light list-disc pl-4">
                  <li>Default TDS on NRO interest: 30.9%</li>
                  <li>UAE with TRC + Form 10F: 12.5% TDS</li>
                  <li>UK / USA with DTAA: 15% TDS</li>
                  <li>Singapore DTAA: 10% TDS</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MUTUAL FUNDS SECTION ── */}
      <section id="nri-mf" className="py-20 bg-[#F8FAFE] px-6">
        <div className="max-w-[1160px] mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#1A3B9F] block mb-2">Mutual Funds</span>
          <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-bold text-[#091540] mb-6">
            36 SEBI categories, one smart NRI guide
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <h4 className="font-bold text-sm text-[#091540] mb-3">NRI Taxation — April 2026</h4>
                <ul className="space-y-2 text-xs text-gray-600 font-light list-disc pl-4">
                  <li>Equity STCG (&lt;12 months): 20%</li>
                  <li>Equity LTCG (≥12 months): 12.5% above ₹1.25L exemption</li>
                  <li>Debt STCG (&lt;36 months): Slab rate (30% for most NRIs)</li>
                  <li>Debt LTCG (≥36 months): 12.5% without indexation</li>
                </ul>
              </div>

              <div className="bg-[#EFF8E2] border-l-4 border-[#8DC63F] p-4 rounded-xl text-xs sm:text-sm text-[#091540] font-light">
                <strong>UAE NRI game-changer:</strong> ITAT Mumbai ruled October 2024 that UAE NRIs are exempt from Indian capital gains on MFs under Article 13(5) of India-UAE DTAA. 0% capital gains for UAE NRIs.
              </div>

              <div className="bg-[#FDECEC] border-l-4 border-rose-500 p-4 rounded-xl text-xs sm:text-sm text-rose-900 font-light">
                <strong>US NRI warning:</strong> Indian mutual funds are classified as PFICs by the IRS. Form 8621 required per fund per year. Use GIFT City MF instead — not a PFIC.
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#1A3B9F] mb-3">Equity</h4>
                <ul className="space-y-1.5 text-xs text-gray-600 font-light">
                  <li>• Large Cap</li>
                  <li>• Mid Cap</li>
                  <li>• Small Cap</li>
                  <li>• Flexi Cap</li>
                  <li>• Index Funds</li>
                  <li>• ELSS (80C)</li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#1A3B9F] mb-3">Hybrid</h4>
                <ul className="space-y-1.5 text-xs text-gray-600 font-light">
                  <li>• Balanced Adv.</li>
                  <li>• Aggressive</li>
                  <li>• Conservative</li>
                  <li>• Multi-Asset</li>
                  <li>• Arbitrage</li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#1A3B9F] mb-3">Debt</h4>
                <ul className="space-y-1.5 text-xs text-gray-600 font-light">
                  <li>• Liquid / Overnight</li>
                  <li>• Short Duration</li>
                  <li>• Corporate Bond</li>
                  <li>• Gilt Funds</li>
                  <li>• Target Maturity</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GIFT CITY SECTION ── */}
      <section id="nri-gift" className="py-20 bg-white px-6">
        <div className="max-w-[1160px] mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#1A3B9F] block mb-2">GIFT City</span>
          <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-bold text-[#091540] mb-6">
            India's IFSC — the game-changer for US &amp; UAE NRIs
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-light max-w-3xl mb-10 leading-relaxed">
            GIFT City is treated as foreign territory under FEMA. Regulated by IFSCA. Section 10(4D) provides full capital gains exemption for non-residents. For UAE NRIs: 0% total tax. For US/Canada NRIs: no PFIC, no FATCA trap.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F8FAFE] border border-gray-200 rounded-2xl p-6">
              <h4 className="font-bold text-sm text-[#091540] mb-2">USD FD</h4>
              <ul className="space-y-1.5 text-xs text-gray-600 font-light">
                <li>• 4.8–5.5% p.a.</li>
                <li>• Min ~USD 500</li>
                <li>• Tax-free in India</li>
              </ul>
            </div>
            <div className="bg-[#F8FAFE] border border-gray-200 rounded-2xl p-6">
              <h4 className="font-bold text-sm text-[#091540] mb-2">Retail MF</h4>
              <ul className="space-y-1.5 text-xs text-gray-600 font-light">
                <li>• Tata AMC — Sept 2025</li>
                <li>• Min USD 500</li>
                <li>• Not a PFIC (US NRIs)</li>
              </ul>
            </div>
            <div className="bg-[#F8FAFE] border border-gray-200 rounded-2xl p-6">
              <h4 className="font-bold text-sm text-[#091540] mb-2">AIF</h4>
              <ul className="space-y-1.5 text-xs text-gray-600 font-light">
                <li>• Min USD 75K</li>
                <li>• Reduced Feb 2025</li>
                <li>• IFSCA regulated</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── REAL ESTATE & REITs SECTION ── */}
      <section id="nri-reit" className="py-20 bg-[#F8FAFE] px-6">
        <div className="max-w-[1160px] mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#1A3B9F] block mb-2">Real Estate &amp; REITs</span>
          <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-bold text-[#091540] mb-6">
            Own Indian real estate without the headache
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <thead className="bg-[#0D1E52] text-white">
                  <tr>
                    <th className="p-3.5">Feature</th>
                    <th className="p-3.5">Direct Property</th>
                    <th className="p-3.5">Listed REIT</th>
                    <th className="p-3.5">SM REIT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-[#4B5563]">
                  <tr><td className="p-3.5 font-bold text-[#091540]">Min investment</td><td className="p-3.5">₹30L–₹5Cr</td><td className="p-3.5">₹440/unit</td><td className="p-3.5">₹10 lakh</td></tr>
                  <tr><td className="p-3.5 font-bold text-[#091540]">Liquidity</td><td className="p-3.5 text-rose-600 font-bold">Very low</td><td className="p-3.5 text-emerald-600 font-bold">Daily exchange</td><td className="p-3.5">4–7 yr lock</td></tr>
                  <tr><td className="p-3.5 font-bold text-[#091540]">Net yield</td><td className="p-3.5">2–4%</td><td className="p-3.5 text-emerald-600 font-bold">5.5–7.8%</td><td className="p-3.5">8–14% IRR</td></tr>
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="text-xs font-bold text-[#1A3B9F]">Embassy REIT</div>
                <div className="font-bold text-base text-[#091540] my-1">~₹440</div>
                <div className="text-[11px] text-gray-500">5.56% yield · Bengaluru</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="text-xs font-bold text-[#1A3B9F]">Brookfield REIT</div>
                <div className="font-bold text-base text-[#091540] my-1">~₹335</div>
                <div className="text-[11px] text-gray-500">7.78% yield · Institutional</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="text-xs font-bold text-[#1A3B9F]">Mindspace</div>
                <div className="font-bold text-base text-[#091540] my-1">~₹350</div>
                <div className="text-[11px] text-gray-500">5–5.5% yield · Best CAGR</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="text-xs font-bold text-[#1A3B9F]">Nexus Select</div>
                <div className="font-bold text-base text-[#091540] my-1">~₹120</div>
                <div className="text-[11px] text-gray-500">5–6% yield · Malls</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INSURANCE SECTION ── */}
      <section id="nri-insurance" className="py-20 bg-white px-6">
        <div className="max-w-[1160px] mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#1A3B9F] block mb-2">Insurance</span>
          <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-bold text-[#091540] mb-6">
            Protect what matters — smarter from India
          </h2>

          <div className="bg-[#EFF8E2] border-l-4 border-[#8DC63F] p-4 rounded-xl text-xs sm:text-sm text-[#091540] mb-10 font-light">
            <strong>September 2025 update:</strong> GST on individual term life and health insurance reduced to 0%. Indian term plans now significantly cheaper than UAE/UK/USA equivalents.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F8FAFE] border border-gray-200 rounded-2xl p-6">
              <h4 className="font-bold text-base text-[#091540] mb-2">Term Life</h4>
              <ul className="space-y-1.5 text-xs text-gray-600 font-light">
                <li>• 30–60% cheaper than UAE/UK</li>
                <li>• GST: 0% from Sept 2025</li>
                <li>• Global death cover</li>
                <li>• ₹1 Cr from ~₹8K/year</li>
              </ul>
            </div>
            <div className="bg-[#F8FAFE] border border-gray-200 rounded-2xl p-6">
              <h4 className="font-bold text-base text-[#091540] mb-2">Health</h4>
              <ul className="space-y-1.5 text-xs text-gray-600 font-light">
                <li>• India coverage only</li>
                <li>• Parents in India: key use case</li>
                <li>• 80D: up to ₹75K deduction</li>
                <li>• Start now to clear waiting periods</li>
              </ul>
            </div>
            <div className="bg-[#F8FAFE] border border-gray-200 rounded-2xl p-6">
              <h4 className="font-bold text-base text-[#091540] mb-2">Critical Illness</h4>
              <ul className="space-y-1.5 text-xs text-gray-600 font-light">
                <li>• Lump sum on diagnosis</li>
                <li>• 30+ illnesses covered</li>
                <li>• Payout tax-free 10(10D)</li>
                <li>• Recommended: ₹50L–₹1Cr</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── GOLD SECTION ── */}
      <section id="nri-gold" className="py-20 bg-[#F8FAFE] px-6">
        <div className="max-w-[1160px] mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#1A3B9F] block mb-2">Gold</span>
          <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-bold text-[#091540] mb-6">
            Five ways to invest in gold — pick what's right for you
          </h2>

          <div className="bg-[#FDECEC] border-l-4 border-rose-500 p-4 rounded-xl text-xs sm:text-sm text-rose-900 mb-10 font-light">
            <strong>SGBs are completely closed for NRIs.</strong> FEMA prohibited NRIs from buying SGBs, and Budget 2025 discontinued new SGB issuances for everyone. Gold ETF is the recommended alternative.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h4 className="font-bold text-sm text-[#091540] mb-3">Top Gold ETFs (Apr 2026)</h4>
              <ul className="space-y-2 text-xs text-gray-600 font-light list-disc pl-4">
                <li>Nippon India Gold BeES — AUM ₹58,000 Cr, most liquid</li>
                <li>HDFC Gold ETF — 0.59% expense ratio</li>
                <li>SBI Gold ETF — strong institutional backing</li>
                <li>Kotak Gold ETF — 0.55% expense ratio</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h4 className="font-bold text-sm text-[#091540] mb-3">Gold ETF — why it's best for NRIs</h4>
              <ul className="space-y-2 text-xs text-gray-600 font-light list-disc pl-4">
                <li>SEBI regulated — audited, insured vaults</li>
                <li>No GST (vs 3% on physical gold) &amp; no storage cost</li>
                <li>LTCG at 12 months (vs 24M for physical)</li>
                <li>No TDS if sold on exchange</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── PENSIONS & ANNUITIES (NPS) SECTION ── */}
      <section id="nri-nps" className="py-20 bg-white px-6">
        <div className="max-w-[1160px] mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#1A3B9F] block mb-2">Pensions &amp; Annuities</span>
          <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-bold text-[#091540] mb-6">
            Plan your India retirement with a tax-efficient corpus
          </h2>

          <div className="bg-[#FDECEC] border-l-4 border-rose-500 p-4 rounded-xl text-xs sm:text-sm text-rose-900 mb-8 font-light">
            <strong>OCI NOT eligible.</strong> NPS is only for Indian citizens (valid Indian passport). OCI and PIO cardholders are excluded.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#F8FAFE] border border-gray-200 rounded-2xl p-6">
              <h4 className="font-bold text-sm text-[#091540] mb-3">December 2025 Rule Changes</h4>
              <ul className="space-y-2 text-xs text-gray-600 font-light list-disc pl-4">
                <li>Age limit extended from 70 to 85 years</li>
                <li>5-year private sector lock-in removed</li>
                <li>Lump sum withdrawal raised to 80%</li>
              </ul>
            </div>
            <div className="bg-[#F8FAFE] border border-gray-200 rounded-2xl p-6">
              <h4 className="font-bold text-sm text-[#091540] mb-3">Tax Benefits</h4>
              <ul className="space-y-2 text-xs text-gray-600 font-light list-disc pl-4">
                <li>80CCD(1): Up to ₹1.5L within 80CCE limit</li>
                <li>80CCD(1B): Extra ₹50K — exclusive to NPS</li>
                <li>60% lump sum tax-free at 60 under 10(12A)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── SAGA SECTION ── */}
      <section id="nri-saga" className="py-20 bg-[#F8FAFE] px-6">
        <div className="max-w-[1160px] mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#1A3B9F] block mb-2">SAGA — HDFC Life Sanchay Aajeevan Guaranteed Advantage</span>
          <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-bold text-[#091540] mb-6">
            Lock in your retirement income today — not 20 years from now
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-light max-w-3xl mb-8 leading-relaxed">
            SAGA is the only accumulation plan in India that lets you lock in your guaranteed annuity rate at the time of purchase — not at maturity. If you buy today at 40, you already know exactly what income you'll receive at 60.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h4 className="font-bold text-sm text-[#091540] mb-3">Two Plan Options</h4>
              <ul className="space-y-2 text-xs text-gray-600 font-light list-disc pl-4">
                <li><strong>Future Ready (Single Life):</strong> Individual accumulation + lifelong income.</li>
                <li><strong>Future Secure (Joint Life):</strong> Primary + secondary life with built-in Waiver of Premium.</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h4 className="font-bold text-sm text-[#091540] mb-3">Why SAGA works for NRIs</h4>
              <ul className="space-y-2 text-xs text-gray-600 font-light list-disc pl-4">
                <li><strong>UAE/GCC:</strong> Lock in guaranteed INR income at 0% UAE personal tax.</li>
                <li><strong>US NRIs:</strong> Not classified as PFIC by IRS — one of the few viable long-term products.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── QROPS SECTION ── */}
      <section id="nri-qrops" className="py-20 bg-white px-6">
        <div className="max-w-[1160px] mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#1A3B9F] block mb-2">QROPS — Qualifying Recognised Overseas Pension Scheme</span>
          <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-bold text-[#091540] mb-6">
            Transfer your UK pension to India without the tax hit
          </h2>

          <div className="bg-[#FDECEC] border-l-4 border-rose-500 p-4 rounded-xl text-xs sm:text-sm text-rose-900 mb-8 font-light">
            <strong>The problem QROPS solves:</strong> If you worked in the UK and want to withdraw your pension on returning to India, the UK taxes up to 50–55%. QROPS allows transfer to an approved Indian scheme without triggering this tax.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#F8FAFE] border border-gray-200 rounded-2xl p-6">
              <h4 className="font-bold text-sm text-[#091540] mb-3">HMRC-Approved Indian Providers</h4>
              <ul className="space-y-2 text-xs text-gray-600 font-light list-disc pl-4">
                <li>HDFC Life — multiple pension guaranteed plans</li>
                <li>ICICI Prudential Life — pension plans on HMRC list</li>
                <li>Tata AIA Life — Fortune Guarantee Pension Plan</li>
              </ul>
            </div>
            <div className="bg-[#F8FAFE] border border-gray-200 rounded-2xl p-6">
              <h4 className="font-bold text-sm text-[#091540] mb-3">Key Rules to Know</h4>
              <ul className="space-y-2 text-xs text-gray-600 font-light list-disc pl-4">
                <li><strong>25% Transfer Charge:</strong> Waived if both you and QROPS are in India at transfer.</li>
                <li><strong>10-year HMRC reporting:</strong> Provider reports all transactions to HMRC for 10 years.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── COUNTRIES SECTION ── */}
      <section className="py-20 bg-[#0D1E52] text-white px-6">
        <div className="max-w-[1160px] mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#8DC63F] block mb-2">By country</span>
          <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-bold mb-3">Your country, your rules</h2>
          <p className="text-sm text-white/70 font-light mb-12">Investment rules are not one-size-fits-all. Select your country for a tailored guide.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { country: "UAE", pop: "~3.5M NRIs · Largest market", tags: ["0% personal tax", "DTAA favourable", "MF gains 0%"] },
              { country: "United States", pop: "~1.4M NRIs + 4.5M PIO", tags: ["FATCA rules", "GIFT City", "PFIC guide"] },
              { country: "United Kingdom", pop: "~400K NRIs", tags: ["QROPS", "UK pension", "CRS"] },
              { country: "Canada", pop: "~1M NRIs · Fastest growing", tags: ["FATCA + CRS", "RRSP rules", "GIFT City"] },
              { country: "Saudi Arabia", pop: "~2.46M NRIs", tags: ["0% personal tax", "GOSI gratuity", "Exit planning"] },
              { country: "Singapore", pop: "~350K NRIs", tags: ["CRS only", "All MFs open", "CPF planning"] },
              { country: "Australia", pop: "~350K NRIs", tags: ["CRS", "Super planning", "All MFs open"] },
              { country: "Qatar · Kuwait · Oman…", pop: "All Gulf corridors covered", tags: ["Ask us for country guide →"] },
            ].map((c, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <h3 className="font-[var(--fd)] text-xl font-bold mb-1">{c.country}</h3>
                  <p className="text-xs text-white/50 mb-4 font-light">{c.pop}</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {c.tags.map((t, idx) => (
                    <span key={idx} className="text-[10px] bg-white/10 text-white px-2.5 py-1 rounded-full">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}