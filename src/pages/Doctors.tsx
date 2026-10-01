import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router";

export default function Doctors() {
  // Prescription Pad Modal State
  const [showModal, setShowModal] = useState(true);
  const [doctorName, setDoctorName] = useState("");
  const [address, setAddress] = useState("");
  const [rxDate, setRxDate] = useState("");
  const [submittedErrors, setSubmittedErrors] = useState(false);

  const nameInputRef = useRef<HTMLInputElement>(null);

  // Auto-fill today's date in DD / MM / YYYY
  useEffect(() => {
    const today = new Date();
    const pad = (v: number) => String(v).padStart(2, "0");
    setRxDate(`${pad(today.getDate())} / ${pad(today.getMonth() + 1)} / ${today.getFullYear()}`);
  }, []);

  useEffect(() => {
    if (showModal && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [showModal]);

  const isFormValid =
    doctorName.trim().length > 0 &&
    address.trim().length > 0 &&
    rxDate.trim().length > 0;

  const handleStartDiagnosis = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      setShowModal(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setSubmittedErrors(true);
    }
  };

  return (
    <div className="font-[var(--fs)] bg-white text-[#111827] antialiased min-h-screen">
      {/* ── PRESCRIPTION PAD INTRO MODAL ── */}
      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[400] flex items-center justify-center p-4 sm:p-6 bg-[#091540]/70 backdrop-blur-sm overflow-y-auto"
        >
          <div className="relative w-full max-w-[860px] my-auto bg-white rounded-3xl border border-[rgba(26,59,159,0.18)] shadow-2xl p-6 sm:p-12 text-[#111827]">
            {/* Pad header fields */}
            <form onSubmit={handleStartDiagnosis}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pb-6 mb-6 border-b border-[rgba(26,59,159,0.12)]">
                <div>
                  <span className="block text-[11px] font-extrabold uppercase tracking-wider text-[#6B7280] mb-1">
                    For <span className="text-rose-600">*</span>
                  </span>
                  <input
                    ref={nameInputRef}
                    type="text"
                    placeholder="Dr. Full Name"
                    value={doctorName}
                    onChange={(e) => setDoctorName(e.target.value)}
                    className="w-full bg-transparent border-b border-gray-300 focus:border-[#1A3B9F] py-1 text-base text-[#111827] placeholder-gray-300 focus:outline-none transition-colors"
                  />
                  {submittedErrors && !doctorName.trim() && (
                    <span className="text-xs text-rose-600 mt-1 block">
                      Please enter your name
                    </span>
                  )}
                </div>

                <div>
                  <span className="block text-[11px] font-extrabold uppercase tracking-wider text-[#6B7280] mb-1">
                    Hospital / Clinic <span className="text-rose-600">*</span>
                  </span>
                  <input
                    type="text"
                    placeholder="Clinic or Hospital Name"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-transparent border-b border-gray-300 focus:border-[#1A3B9F] py-1 text-base text-[#111827] placeholder-gray-300 focus:outline-none transition-colors"
                  />
                  {submittedErrors && !address.trim() && (
                    <span className="text-xs text-rose-600 mt-1 block">
                      Please enter a hospital/clinic
                    </span>
                  )}
                </div>

                <div>
                  <span className="block text-[11px] font-extrabold uppercase tracking-wider text-[#6B7280] mb-1">
                    Date <span className="text-rose-600">*</span>
                  </span>
                  <input
                    type="text"
                    value={rxDate}
                    onChange={(e) => setRxDate(e.target.value)}
                    className="w-full bg-transparent border-b border-gray-300 focus:border-[#1A3B9F] py-1 text-base text-[#111827] focus:outline-none transition-colors"
                  />
                  {submittedErrors && !rxDate.trim() && (
                    <span className="text-xs text-rose-600 mt-1 block">
                      Please enter a date
                    </span>
                  )}
                </div>
              </div>

              {/* Prescription Body */}
              <span className="font-[var(--fd)] text-5xl sm:text-6xl text-[#1A3B9F] font-bold block mb-4">
                R<sub className="text-2xl font-normal">x</sub>
              </span>

              <h2 className="font-[var(--fd)] text-2xl sm:text-4xl font-bold text-[#091540] tracking-tight leading-snug mb-4">
                Someone is prescribing medication and making a diagnosis without a degree or a day of experience.
              </h2>

              <p className="text-sm sm:text-base text-[#4B5563] font-light leading-relaxed mb-3">
                It is the search bar. Your patients arrive having already diagnosed themselves, chosen a drug, and decided on a dosage — and you spend the first ten minutes of the consultation undoing it.
              </p>
              <p className="text-sm sm:text-base text-[#091540] font-bold leading-relaxed mb-8">
                Most doctors do exactly the same thing with their own money.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[rgba(26,59,159,0.12)]">
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-[#8DC63F] hover:bg-[#9ED64A] text-[#091540] font-extrabold text-sm sm:text-base px-8 py-3 rounded-full transition-all shadow-md cursor-pointer"
                >
                  Read the diagnosis →
                </button>

                <div className="text-right">
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    Signature
                  </span>
                  <span className="font-serif italic text-lg text-[#1A3B9F]">
                    Once a doctor, always a doctor
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── HERO SECTION ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#091540] via-[#0D1E52] to-[#1A3B9F] py-16 sm:py-24 text-white px-6">
        <div className="max-w-[1060px] mx-auto relative z-10">
          <div className="max-w-2xl">
            <span className="inline-block text-[11px] font-extrabold uppercase tracking-[.2em] text-[#8DC63F] mb-3">
              DocWealth · Financial Planning for Doctors
            </span>
            <h1 className="font-[var(--fd)] text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight mb-5">
              Financial planning <br />
              <span className="text-[#8DC63F]">for doctors</span>
            </h1>
            <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed mb-4">
              You spend the first ten minutes of a consultation undoing a self-diagnosis. Most doctors then do exactly the same thing with their own money — a tip from a colleague, a policy bought in a hurry, a portfolio nobody has examined in years.
            </p>
            <p className="text-sm sm:text-base text-white/75 font-light leading-relaxed mb-8">
              This page sets out the alternative: the same method you already use on patients, applied to a balance sheet. Asset allocation, evidence over prediction, and a holding period long enough to matter.
            </p>
            <a
              href="tel:+919742826665"
              className="inline-flex items-center gap-2 bg-[#8DC63F] hover:bg-[#9ED64A] text-[#091540] font-extrabold text-sm sm:text-base px-8 py-3.5 rounded-full transition-all shadow-lg hover:shadow-xl"
            >
              Book a consultation →
            </a>
          </div>
        </div>
      </section>

      {/* ── THE SELF-DIAGNOSIS (SEARCH ENGINE DEMO) ── */}
      <section className="py-14 sm:py-20 bg-[#EEF2FB] border-b border-[rgba(26,59,159,0.08)]">
        <div className="max-w-[1060px] mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#1A3B9F] block mb-2">
              The Self-Diagnosis
            </span>
            <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#091540] tracking-tight">
              Three results, three different conclusions
            </h2>
            <p className="text-sm text-[#4B5563] font-light mt-2">
              This is what a symptom search returns. None of it knows the patient's history, and all of it sounds authoritative.
            </p>
          </div>

          <div className="max-w-xl mx-auto bg-white border border-[rgba(26,59,159,0.12)] rounded-2xl shadow-xl overflow-hidden">
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-3.5">
              <span className="text-sm text-[#111827] font-medium">Headache &amp; fever</span>
              <span className="w-8 h-8 rounded-lg bg-[#1A3B9F] text-white flex items-center justify-center text-xs">
                🔍
              </span>
            </div>
            <ul className="divide-y divide-gray-100 p-2 text-sm text-[#374151]">
              <li className="p-3">
                Headache &amp; fever <strong className="text-[#111827]">are the symptoms of malaria</strong>
              </li>
              <li className="p-3">
                Headache &amp; fever <strong className="text-[#111827]">tablet</strong>
              </li>
              <li className="p-3">
                Headache &amp; fever <strong className="text-[#111827]">remedies</strong>
              </li>
            </ul>
            <div className="p-4 bg-[#F8FAFE] border-t border-gray-100 text-xs text-[#6B7280]">
              A diagnosis, a drug and a home remedy — offered to someone with no way to tell which one applies to them.
            </div>
          </div>
        </div>
      </section>

      {/* ── THE TURN ── */}
      <section className="py-14 sm:py-20 bg-gradient-to-br from-[#091540] to-[#0D1E52] text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed mb-6">
            As a doctor, you already know why this is dangerous. Symptoms overlap. Context decides everything. A treatment that helps one patient harms another. You would never accept a diagnosis from someone who had not examined the person in front of them.
          </p>
          <p className="font-[var(--fd)] text-2xl sm:text-4xl font-bold text-[#8DC63F] tracking-tight leading-snug">
            So why take the same approach when planning your finances?
          </p>
        </div>
      </section>

      {/* ── WHY DOCTORS FACE UNIQUE CHALLENGES ── */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-[1060px] mx-auto px-6">
          <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#1A3B9F] block mb-2">
            Why this matters more for doctors
          </span>
          <h2 className="font-[var(--fd)] text-2xl sm:text-4xl font-bold text-[#091540] tracking-tight mb-8">
            A medical career has a financial shape most advice ignores
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F8FAFE] border border-[rgba(26,59,159,0.12)] rounded-2xl p-6 shadow-sm">
              <h3 className="font-[var(--fd)] text-lg font-bold text-[#091540] mb-2">
                Earnings start late
              </h3>
              <p className="text-sm text-[#4B5563] font-light leading-relaxed">
                Years of MBBS, MD/MS, and residency mean the compounding clock starts a decade behind most other professions. Every year of delay after that costs disproportionately.
              </p>
            </div>

            <div className="bg-[#F8FAFE] border border-[rgba(26,59,159,0.12)] rounded-2xl p-6 shadow-sm">
              <h3 className="font-[var(--fd)] text-lg font-bold text-[#091540] mb-2">
                Income is irregular
              </h3>
              <p className="text-sm text-[#4B5563] font-light leading-relaxed">
                Consultancy fees, procedure income, clinic revenue and hospital retainers rarely arrive as a flat monthly salary. A plan built for a fixed corporate pay cheque does not fit.
              </p>
            </div>

            <div className="bg-[#F8FAFE] border border-[rgba(26,59,159,0.12)] rounded-2xl p-6 shadow-sm">
              <h3 className="font-[var(--fd)] text-lg font-bold text-[#091540] mb-2">
                Time is the binding constraint
              </h3>
              <p className="text-sm text-[#4B5563] font-light leading-relaxed">
                Clinical hours, emergency calls, and surgeries leave little room to track markets. The plan has to work while you are in the OT — which rules out anything that needs constant supervision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE FINANCIAL DOCTOR DIAGNOSIS STEPS ── */}
      <section className="py-14 sm:py-20 bg-[#F8FAFE] border-y border-[rgba(26,59,159,0.08)]">
        <div className="max-w-[1060px] mx-auto px-6">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#1A3B9F] block mb-2">
              The alternative
            </span>
            <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#091540] tracking-tight mb-3">
              Consult a qualified expert — a financial doctor
            </h2>
            <p className="text-sm sm:text-base text-[#4B5563] font-light leading-relaxed">
              The diagnostic method is one you already use every day. Only the subject changes.
            </p>
          </div>

          <div className="space-y-4 max-w-3xl">
            <div className="flex gap-4 p-5 rounded-2xl bg-white border border-[rgba(26,59,159,0.1)] shadow-sm">
              <span className="w-8 h-8 rounded-full bg-[#1A3B9F] text-white flex items-center justify-center font-bold text-xs shrink-0">
                1
              </span>
              <div>
                <h3 className="font-[var(--fd)] text-base font-bold text-[#091540] mb-1">
                  Understands the symptoms
                </h3>
                <p className="text-sm text-[#4B5563] font-light">
                  Cash flow pressure, idle savings balances, surprise advance tax bills, or professional indemnity cover that has never been reviewed.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-5 rounded-2xl bg-white border border-[rgba(26,59,159,0.1)] shadow-sm">
              <span className="w-8 h-8 rounded-full bg-[#1A3B9F] text-white flex items-center justify-center font-bold text-xs shrink-0">
                2
              </span>
              <div>
                <h3 className="font-[var(--fd)] text-base font-bold text-[#091540] mb-1">
                  Examines your financial history
                </h3>
                <p className="text-sm text-[#4B5563] font-light">
                  What you already hold, what it has actually delivered post-inflation, what it costs you in fees, and what purpose it was purchased to achieve.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-5 rounded-2xl bg-white border border-[rgba(26,59,159,0.1)] shadow-sm">
              <span className="w-8 h-8 rounded-full bg-[#1A3B9F] text-white flex items-center justify-center font-bold text-xs shrink-0">
                3
              </span>
              <div>
                <h3 className="font-[var(--fd)] text-base font-bold text-[#091540] mb-1">
                  Makes a diagnosis
                </h3>
                <p className="text-sm text-[#4B5563] font-light">
                  Clinic expansion, children's global education, or retirement corpus mapped against timelines to identify the exact capital gap.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-5 rounded-2xl bg-white border border-[rgba(26,59,159,0.1)] shadow-sm">
              <span className="w-8 h-8 rounded-full bg-[#1A3B9F] text-white flex items-center justify-center font-bold text-xs shrink-0">
                4
              </span>
              <div>
                <h3 className="font-[var(--fd)] text-base font-bold text-[#091540] mb-1">
                  Prescribes the right dosage
                </h3>
                <p className="text-sm text-[#4B5563] font-light">
                  Asset allocation and contribution sizes calibrated to your practice cash flows — not to whichever fund or insurance policy happened to be pitched first.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 20-YEAR REPORT CARD COMPARISON ── */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-[1060px] mx-auto px-6">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#1A3B9F] block mb-2">
              The Evidence
            </span>
            <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#091540] tracking-tight mb-3">
              What ₹1 lakh became over 20 years (2002–2022)
            </h2>
            <p className="text-sm text-gray-500 font-light">
              Calendar years 2002 to 2022, on a CAGR basis, before and after 6.33% average annual inflation.
            </p>
          </div>

          <div className="border border-[rgba(26,59,159,0.12)] rounded-2xl overflow-hidden shadow-sm mb-6">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead className="bg-[#0D1E52] text-white">
                <tr>
                  <th className="p-3.5 font-bold uppercase tracking-wider text-[11px]">
                    Asset Class
                  </th>
                  <th className="p-3.5 font-bold uppercase tracking-wider text-[11px]">
                    Nominal Value
                  </th>
                  <th className="p-3.5 font-bold uppercase tracking-wider text-[11px]">
                    Inflation-Adjusted (Real)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-[#EFF8E2]/50 font-semibold text-[#091540]">
                  <td className="p-3.5">S&amp;P BSE Sensex</td>
                  <td className="p-3.5 text-[#1A3B9F] font-bold">₹18.01 lakh</td>
                  <td className="p-3.5 text-[#6AA32A] font-bold">₹5.15 lakh</td>
                </tr>
                <tr className="hover:bg-[#EFF8E2]/50">
                  <td className="p-3.5">Gold</td>
                  <td className="p-3.5">₹10.20 lakh</td>
                  <td className="p-3.5">₹2.92 lakh</td>
                </tr>
                <tr className="hover:bg-[#EFF8E2]/50">
                  <td className="p-3.5">Public Provident Fund (PPF)</td>
                  <td className="p-3.5">₹4.68 lakh</td>
                  <td className="p-3.5">₹1.34 lakh</td>
                </tr>
                <tr className="hover:bg-[#EFF8E2]/50">
                  <td className="p-3.5">Fixed Deposits (FD)</td>
                  <td className="p-3.5">₹3.94 lakh</td>
                  <td className="p-3.5">₹1.13 lakh</td>
                </tr>
                <tr className="hover:bg-[#EFF8E2]/50">
                  <td className="p-3.5">Savings Account</td>
                  <td className="p-3.5">₹1.98 lakh</td>
                  <td className="p-3.5">₹0.56 lakh</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-xs text-gray-400 font-light leading-relaxed">
            Source: Internal; CMIE, Bloomberg, IIFL Research, Morgan Stanley. Real values adjusted at 6.33% average inflation over the 20-year period.
          </p>
        </div>
      </section>

      {/* ── 30-YEAR COMPOUNDING GRAPH & DRAWDOWN CAUTION ── */}
      <section className="py-14 sm:py-20 bg-gradient-to-br from-[#091540] to-[#1A3B9F] text-white">
        <div className="max-w-[1060px] mx-auto px-6">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#8DC63F] block mb-2">
              Course Duration
            </span>
            <h2 className="font-[var(--fd)] text-2xl sm:text-4xl font-bold tracking-tight mb-3">
              Some treatments take time. So does wealth creation.
            </h2>
            <p className="text-sm sm:text-base text-white/80 font-light leading-relaxed">
              ₹1 lakh invested once, left alone. The compounding difference between 8% and 12% annual returns over a medical career:
            </p>
          </div>

          <div className="bg-white/5 border border-white/15 rounded-2xl p-6 sm:p-8 overflow-x-auto mb-8">
            <svg
              viewBox="0 0 760 260"
              className="w-full min-w-[560px] h-auto"
              role="img"
              aria-label="Graph comparing 8 percent vs 12 percent compounding over 30 years"
            >
              <line x1="40" y1="230" x2="730" y2="230" stroke="rgba(255,255,255,.25)" strokeWidth="1" />
              {/* 8% line */}
              <polyline
                fill="none"
                stroke="#AEBBDF"
                strokeWidth="2.5"
                points="40,225 150,220 300,210 450,195 600,170 730,150"
              />
              {/* 12% line */}
              <polyline
                fill="none"
                stroke="#8DC63F"
                strokeWidth="3.5"
                points="40,225 150,215 300,195 450,160 600,105 730,25"
              />
              <text x="730" y="20" fill="#8DC63F" fontSize="13" fontWeight="700" textAnchor="end">
                ₹29.96 lakh at 12%
              </text>
              <text x="730" y="145" fill="#AEBBDF" fontSize="13" fontWeight="700" textAnchor="end">
                ₹10.06 lakh at 8%
              </text>
              <text x="40" y="250" fill="rgba(255,255,255,.55)" fontSize="11">
                Year 1
              </text>
              <text x="385" y="250" fill="rgba(255,255,255,.55)" fontSize="11" textAnchor="middle">
                Year 15
              </text>
              <text x="730" y="250" fill="rgba(255,255,255,.55)" fontSize="11" textAnchor="end">
                Year 30
              </text>
            </svg>
          </div>

          <div className="p-6 rounded-2xl bg-white/10 border border-white/20 max-w-xl mx-auto text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8DC63F] block mb-2">
              Clinical Truth
            </span>
            <p className="text-lg font-[var(--fd)] font-bold">
              "Prediction is injurious to wealth. Do not time the market."
            </p>
          </div>
        </div>
      </section>

      {/* ── OUR PRESCRIPTION (4 CARDS) ── */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-[1060px] mx-auto px-6">
          <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#1A3B9F] block mb-2">
            Our Prescription
          </span>
          <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#091540] tracking-tight mb-8">
            Four things, taken consistently
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#F8FAFE] border border-[rgba(26,59,159,0.12)] rounded-2xl p-6 shadow-sm">
              <h3 className="font-[var(--fd)] text-base font-bold text-[#091540] mb-2">
                A balanced portfolio
              </h3>
              <p className="text-xs sm:text-sm text-[#4B5563] font-light leading-relaxed">
                Allocation across equity, debt, and liquid assets, sized to your milestones and actual risk tolerance.
              </p>
            </div>

            <div className="bg-[#F8FAFE] border border-[rgba(26,59,159,0.12)] rounded-2xl p-6 shadow-sm">
              <h3 className="font-[var(--fd)] text-base font-bold text-[#091540] mb-2">
                A systematic regime
              </h3>
              <p className="text-xs sm:text-sm text-[#4B5563] font-light leading-relaxed">
                Automated investing that executes whether you have time to review market news that month or not.
              </p>
            </div>

            <div className="bg-[#F8FAFE] border border-[rgba(26,59,159,0.12)] rounded-2xl p-6 shadow-sm">
              <h3 className="font-[var(--fd)] text-base font-bold text-[#091540] mb-2">
                Professional consultation
              </h3>
              <p className="text-xs sm:text-sm text-[#4B5563] font-light leading-relaxed">
                A review whenever circumstances shift — setting up a new clinic, welcoming a child, or taking on a major hospital liability.
              </p>
            </div>

            <div className="bg-[#F8FAFE] border border-[rgba(26,59,159,0.12)] rounded-2xl p-6 shadow-sm">
              <h3 className="font-[var(--fd)] text-base font-bold text-[#091540] mb-2">
                No self-medication
              </h3>
              <p className="text-xs sm:text-sm text-[#4B5563] font-light leading-relaxed">
                Never acting on WhatsApp tips, stock picks from colleagues, or unsolicited sales calls without checking against the roadmap.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── INVESTOR'S OATH ── */}
      <section className="py-12 sm:py-16 bg-[#F8FAFE]">
        <div className="max-w-2xl mx-auto px-6">
          <div className="bg-[#EFF8E2] border border-[rgba(141,198,63,0.32)] rounded-3xl p-8 sm:p-10 text-[#111827]">
            <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#6AA32A] block mb-2">
              Investor's Covenant
            </span>
            <h3 className="font-[var(--fd)] text-xl font-bold text-[#091540] mb-4">
              I swear to fulfil, to the best of my ability, this covenant that I will:
            </h3>
            <ul className="space-y-3 text-sm text-[#374151]">
              <li className="flex items-start gap-2.5">
                <span className="text-[#6AA32A] font-bold">✓</span>
                Invest for the long term, to make the most of my professional compounding runway.
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#6AA32A] font-bold">✓</span>
                Not take emotional or speculative decisions during temporary market drawdowns.
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#6AA32A] font-bold">✓</span>
                Seek qualified, regulated financial advice to execute calculated and informed wealth decisions.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── FAQ ACCORDION ── */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-[780px] mx-auto px-6">
          <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#091540] tracking-tight mb-8 text-center">
            Questions doctors ask us
          </h2>

          <div className="space-y-4">
            {[
              {
                q: "How much should a doctor invest each month?",
                a: "There is no single fixed figure, because medical revenue is rarely uniform. The workable approach is to set an affordable monthly floor that you never skip, and deploy windfalls from procedures or bonus retainers as separate top-ups. Discipline matters far more than starting size.",
              },
              {
                q: "I already have LIC policies and fixed deposits. Isn't that enough?",
                a: "Traditional fixed-income tools protect capital in nominal terms, but historically lag medical inflation. Over the 20 years to 2022, ₹1 lakh in FDs became ₹1.13 lakh in real purchasing power. They serve as your liquid emergency shield, but cannot build a retirement corpus alone.",
              },
              {
                q: "I don't have time to track markets. Does that rule investing out?",
                a: "It rules out active stock trading. A systematic mutual fund portfolio managed by SEBI-registered fund managers runs completely in the background without needing your supervision during clinic hours.",
              },
              {
                q: "Should I invest primarily in real estate instead?",
                a: "Real estate is illiquid, capital-intensive, and geographically concentrated. While a clinic premises is a productive asset, holding excessive residential land restricts liquidity when emergency capital is needed.",
              },
              {
                q: "What is the difference between a distributor and an advisor?",
                a: "A mutual fund distributor holds an AMFI ARN and is compensated by AMCs. A fee-only RIA charges the client directly. MyAnmol operates as an AMFI-registered distributor under ARN 114893 with full fee transparency.",
              },
              {
                q: "How long should I stay invested?",
                a: "Long enough for full market cycles to play out. Between 2004 and 2022, market drawdowns took up to six years to reclaim peaks, yet long-term equity investors achieved a ~15% CAGR across the full horizon.",
              },
            ].map((item, idx) => (
              <details
                key={idx}
                className="bg-[#F8FAFE] border border-[rgba(26,59,159,0.1)] rounded-2xl p-4 sm:p-5 group"
              >
                <summary className="font-[var(--fd)] text-base font-bold text-[#091540] cursor-pointer list-none flex justify-between items-center">
                  <span>{item.q}</span>
                  <span className="text-[#8DC63F] text-xl font-bold group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="text-sm text-[#4B5563] font-light leading-relaxed mt-3 border-t border-gray-200/60 pt-3">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONSULTATION CTA STRIP ── */}
      <section className="py-16 sm:py-20 bg-[#091540] text-white text-center">
        <div className="max-w-xl mx-auto px-6">
          <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#8DC63F] block mb-3">
            Book a Consultation
          </span>
          <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Bring your financial history. We will do the examination.
          </h2>
          <p className="text-sm sm:text-base text-white/80 font-light mb-8">
            A first conversation covers what you hold, what it was meant to do, and where the gaps are. No product is discussed until that is clear.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="tel:+919742826665"
              className="bg-[#8DC63F] hover:bg-[#9ED64A] text-[#091540] font-extrabold text-sm sm:text-base px-8 py-3.5 rounded-full shadow-lg transition-all"
            >
              Call +91 97428 26665
            </a>
            <Link
              to="/wp/review"
              className="border border-white/20 bg-white/10 hover:bg-white/15 text-white font-bold text-sm sm:text-base px-8 py-3.5 rounded-full transition-all"
            >
              Request a Review Session
            </Link>
          </div>
          <p className="mt-8 text-xs text-white/45">
            Anmol Share Broking Pvt. Ltd. · AMFI ARN 114893 · Save, Insure, Invest.
          </p>
        </div>
      </section>
    </div>
  );
}