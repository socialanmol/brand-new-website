import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router";

export default function Teachers() {
  // Blackboard Intro Modal State
  const [showModal, setShowModal] = useState(true);
  const [teacherName, setTeacherName] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [submittedErrors, setSubmittedErrors] = useState(false);

  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showModal && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [showModal]);

  const isFormValid =
    teacherName.trim().length > 0 &&
    schoolName.trim().length > 0 &&
    subjectName.trim().length > 0;

  const handleStartLesson = (e: React.FormEvent) => {
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
      {/* ── BLACKBOARD INTRO GATE MODAL ── */}
      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[400] flex items-center justify-center p-4 sm:p-6 bg-[#04091A]/75 backdrop-blur-sm overflow-y-auto"
        >
          <div className="relative w-full max-w-[800px] my-auto rounded-2xl bg-gradient-to-br from-[#0C1733] via-[#0A1229] to-[#080F22] border-[10px] border-[#16255A] shadow-2xl p-6 sm:p-10 text-white/90">
            {/* Chalk tray accent */}
            <div className="absolute left-6 bottom-1 flex gap-2">
              <span className="w-10 h-2 rounded bg-white/80" />
              <span className="w-8 h-2 rounded bg-[#8DC63F]" />
            </div>

            {/* Blackboard Top Bar */}
            <div className="flex justify-between items-center text-sm font-semibold text-white/50 border-b border-white/15 pb-2 mb-6 font-serif">
              <span>Today's lesson</span>
              <span>Period 1</span>
            </div>

            <h2 className="font-[var(--fd)] text-2xl sm:text-4xl font-bold text-white mb-4 tracking-wide leading-snug">
              Before you read on — one question, from us to you.
            </h2>

            <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed mb-2">
              You have asked a thousand students where they see themselves in ten years.
            </p>
            <p className="text-base sm:text-lg text-[#8DC63F] font-semibold leading-relaxed mb-8 border-b border-[#8DC63F]/40 pb-2 inline-block">
              When did anyone last ask you?
            </p>

            <form onSubmit={handleStartLesson} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <span className="block text-[10px] font-extrabold uppercase tracking-widest text-white/50 mb-1">
                    Your Name
                  </span>
                  <input
                    ref={nameInputRef}
                    type="text"
                    placeholder="Write your name"
                    value={teacherName}
                    onChange={(e) => setTeacherName(e.target.value)}
                    className="w-full bg-transparent border-b-2 border-white/30 focus:border-[#8DC63F] px-1 py-1 text-lg font-medium text-white placeholder-white/25 focus:outline-none transition-colors"
                  />
                  {submittedErrors && !teacherName.trim() && (
                    <span className="text-xs text-rose-300 mt-1 block">
                      Please write your name
                    </span>
                  )}
                </div>

                <div>
                  <span className="block text-[10px] font-extrabold uppercase tracking-widest text-white/50 mb-1">
                    School / College
                  </span>
                  <input
                    type="text"
                    placeholder="Where you teach"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    className="w-full bg-transparent border-b-2 border-white/30 focus:border-[#8DC63F] px-1 py-1 text-lg font-medium text-white placeholder-white/25 focus:outline-none transition-colors"
                  />
                  {submittedErrors && !schoolName.trim() && (
                    <span className="text-xs text-rose-300 mt-1 block">
                      Please write your school
                    </span>
                  )}
                </div>

                <div>
                  <span className="block text-[10px] font-extrabold uppercase tracking-widest text-white/50 mb-1">
                    Subject Taught
                  </span>
                  <input
                    type="text"
                    placeholder="What you teach"
                    value={subjectName}
                    onChange={(e) => setSubjectName(e.target.value)}
                    className="w-full bg-transparent border-b-2 border-white/30 focus:border-[#8DC63F] px-1 py-1 text-lg font-medium text-white placeholder-white/25 focus:outline-none transition-colors"
                  />
                  {submittedErrors && !subjectName.trim() && (
                    <span className="text-xs text-rose-300 mt-1 block">
                      Please write your subject
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                <button
                  type="submit"
                  className="bg-[#8DC63F] hover:bg-[#9ED64A] text-[#091540] font-extrabold text-sm sm:text-base px-8 py-3 rounded-full transition-all shadow-md hover:shadow-lg cursor-pointer"
                >
                  Begin the lesson →
                </button>
                <span className="text-xs text-white/50 font-light italic">
                  Once a teacher, always a teacher.
                </span>
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
              For Teachers &amp; Educators
            </span>
            <h1 className="font-[var(--fd)] text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight mb-5">
              Financial planning <br />
              <span className="text-[#8DC63F]">for teachers</span>
            </h1>
            <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed mb-4">
              You already know that indiscipline and a lack of focus are not how a student's future gets built. The same is true of a salary that arrives, covers the month, and leaves nothing behind.
            </p>
            <p className="text-sm sm:text-base text-white/75 font-light leading-relaxed mb-8">
              This page sets out the syllabus: where your income actually goes, what inflation quietly takes from it, and what a systematic plan does over a teaching career.
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

      {/* ── THE RESPONSIBILITY ── */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-[1060px] mx-auto px-6">
          <div className="max-w-2xl">
            <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#1A3B9F] block mb-2">
              The responsibility
            </span>
            <h2 className="font-[var(--fd)] text-2xl sm:text-4xl font-bold text-[#091540] tracking-tight mb-4">
              You build responsibility into every student. Build it into your wealth.
            </h2>
            <p className="text-base text-[#4B5563] font-light leading-relaxed">
              Discipline, consistency, and a long view are the things you insist on in a classroom. They are also, almost exactly, the things that decide an investment outcome. The subject changes; the method does not.
            </p>
          </div>
        </div>
      </section>

      {/* ── INCOME VS GOALS (8 NAMES) ── */}
      <section className="py-14 sm:py-20 bg-[#EEF2FB] border-y border-[rgba(26,59,159,0.08)]">
        <div className="max-w-[1060px] mx-auto px-6">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#1A3B9F] block mb-2">
              The attendance register
            </span>
            <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#091540] tracking-tight mb-3">
              Your income is meeting your current needs
            </h2>
            <p className="text-sm sm:text-base text-[#4B5563] font-light leading-relaxed">
              Every month, the same eight names are called, and every month they all answer.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              "Food",
              "House rent",
              "Electricity bill",
              "Transportation",
              "Children's education",
              "Shopping",
              "Entertainment",
              "Miscellaneous",
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-[rgba(26,59,159,0.12)] rounded-2xl p-5 text-center shadow-sm"
              >
                <span className="font-[var(--fd)] text-base font-bold text-[#091540]">
                  {item}
                </span>
              </div>
            ))}
          </div>

          <p className="text-sm sm:text-base text-[#4B5563] font-light leading-relaxed max-w-2xl">
            Nothing on that list is wasteful. That is the problem. A budget that balances perfectly every month can still leave every long-term goal completely unfunded.
          </p>
        </div>
      </section>

      {/* ── POP QUIZ & FORMULA ── */}
      <section className="py-14 sm:py-20 bg-gradient-to-br from-[#091540] to-[#0D1E52] text-white">
        <div className="max-w-[1060px] mx-auto px-6">
          <div className="max-w-xl mb-8">
            <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#8DC63F] block mb-2">
              Pop quiz
            </span>
            <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold tracking-tight mb-2">
              But what about your dreams and goals?
            </h2>
            <p className="text-sm text-white/80 font-light">Choose the right answer.</p>
          </div>

          <ul className="space-y-3 max-w-md mb-10">
            <li className="flex items-center gap-3 p-3.5 rounded-xl border border-white/15 bg-white/5 text-sm text-white/70">
              <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center font-bold text-xs">
                a
              </span>
              Something will work out
            </li>
            <li className="flex items-center gap-3 p-3.5 rounded-xl border border-white/15 bg-white/5 text-sm text-white/70">
              <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center font-bold text-xs">
                b
              </span>
              Ignore them
            </li>
            <li className="flex items-center gap-3 p-3.5 rounded-xl border-2 border-[#8DC63F] bg-[#8DC63F]/15 text-sm font-bold text-white">
              <span className="w-6 h-6 rounded-full bg-[#8DC63F] text-[#091540] flex items-center justify-center font-extrabold text-xs">
                c
              </span>
              Plan for them (Correct)
            </li>
          </ul>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-center my-6">
            <span className="font-[var(--fd)] text-xl sm:text-2xl font-bold px-6 py-2.5 rounded-full border border-white/25">
              Income
            </span>
            <span className="text-2xl text-[#8DC63F] font-bold">+</span>
            <span className="font-[var(--fd)] text-xl sm:text-2xl font-bold px-6 py-2.5 rounded-full border border-white/25">
              Planning
            </span>
            <span className="text-2xl text-[#8DC63F] font-bold">=</span>
            <span className="font-[var(--fd)] text-xl sm:text-2xl font-bold px-6 py-2.5 rounded-full bg-[#8DC63F] text-[#091540]">
              Achieving dreams &amp; goals
            </span>
          </div>

          <p className="text-xs text-white/60 text-center max-w-lg mx-auto mt-4 font-light">
            Income alone funds the month. Planning alone funds nothing. The overlap is where goals actually get met.
          </p>
        </div>
      </section>

      {/* ── INFLATION DEPRECIATION LINE CHART ── */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-[1060px] mx-auto px-6">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#1A3B9F] block mb-2">
              The subject nobody revises
            </span>
            <h2 className="font-[var(--fd)] text-2xl sm:text-4xl font-bold text-[#091540] tracking-tight mb-3">
              ₹100 today buys less than it did in 1958
            </h2>
            <p className="text-sm sm:text-base text-[#4B5563] font-light leading-relaxed">
              An item that cost ₹1.20 in 1958 costs ₹100 today. Put the other way round:{" "}
              <strong className="text-[#091540] font-bold">
                ₹100 saved in 1958 lost 98.8% of its purchasing power over 62 years.
              </strong>
            </p>
          </div>

          {/* Line Chart SVG */}
          <div className="bg-white border border-[rgba(26,59,159,0.12)] rounded-2xl p-6 shadow-sm overflow-x-auto mb-8">
            <svg
              viewBox="0 0 760 260"
              className="w-full min-w-[560px] h-auto"
              role="img"
              aria-label="Line chart showing purchasing power of 100 rupees dropping from 1960 to 2020"
            >
              <line x1="48" y1="220" x2="718" y2="220" stroke="rgba(26,59,159,.20)" strokeWidth="1" />
              <polyline
                fill="none"
                stroke="#1A3B9F"
                strokeWidth="3"
                points="48,32 103,107 160,144 215,200 271,206 327,210 383,214 438,216 494,217 550,218 606,218.5 718,219"
              />
              <circle cx="48" cy="32" r="5" fill="#1A3B9F" />
              <circle cx="718" cy="219" r="5" fill="#8DC63F" />
              <text x="58" y="28" fill="#1A3B9F" fontSize="13" fontWeight="700">
                ₹100 in 1960
              </text>
              <text x="712" y="208" fill="#6AA32A" fontSize="13" fontWeight="700" textAnchor="end">
                ₹1.20 by 2020
              </text>
              <text x="48" y="240" fill="#6B7280" fontSize="11">
                1960
              </text>
              <text x="383" y="240" fill="#6B7280" fontSize="11" textAnchor="middle">
                1990
              </text>
              <text x="718" y="240" fill="#6B7280" fontSize="11" textAnchor="end">
                2020
              </text>
            </svg>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#EFF8E2] border border-[rgba(141,198,63,0.3)] rounded-2xl p-6">
              <span className="font-[var(--fd)] text-3xl font-extrabold text-[#1A3B9F] block mb-1">
                ₹67
              </span>
              <p className="text-xs text-[#4B5563]">what ₹100 was worth by 1965</p>
            </div>
            <div className="bg-[#EFF8E2] border border-[rgba(141,198,63,0.3)] rounded-2xl p-6">
              <span className="font-[var(--fd)] text-3xl font-extrabold text-[#1A3B9F] block mb-1">
                ₹11
              </span>
              <p className="text-xs text-[#4B5563]">what it was worth by 1990</p>
            </div>
            <div className="bg-[#EFF8E2] border border-[rgba(141,198,63,0.3)] rounded-2xl p-6">
              <span className="font-[var(--fd)] text-3xl font-extrabold text-[#1A3B9F] block mb-1">
                ₹1.20
              </span>
              <p className="text-xs text-[#4B5563]">what it was worth by 2020</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE 4 ASSET CLASSES ── */}
      <section className="py-14 sm:py-20 bg-[#F8FAFE] border-y border-[rgba(26,59,159,0.08)]">
        <div className="max-w-[1060px] mx-auto px-6">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#1A3B9F] block mb-2">
              The syllabus
            </span>
            <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#091540] tracking-tight mb-3">
              How do you get an A+ in money management?
            </h2>
            <p className="text-sm sm:text-base text-[#4B5563] font-light leading-relaxed">
              By making your money learn every subject it needs to pass the financial independence exam. Four asset classes, each doing a different job.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-[rgba(26,59,159,0.12)] rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-[#0D1E52] text-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider">
                Equity
              </div>
              <ul className="p-4 text-xs sm:text-sm text-[#4B5563] space-y-2">
                <li>• Equity mutual funds</li>
                <li>• Shares and stocks</li>
                <li>• Private equity</li>
              </ul>
            </div>

            <div className="bg-white border border-[rgba(26,59,159,0.12)] rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-[#0D1E52] text-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider">
                Debt / Fixed Income
              </div>
              <ul className="p-4 text-xs sm:text-sm text-[#4B5563] space-y-2">
                <li>• Debt mutual funds</li>
                <li>• Corporate bonds</li>
                <li>• GOI bonds</li>
                <li>• Infrastructure / RBI bonds</li>
              </ul>
            </div>

            <div className="bg-white border border-[rgba(26,59,159,0.12)] rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-[#0D1E52] text-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider">
                Cash &amp; Equivalent
              </div>
              <ul className="p-4 text-xs sm:text-sm text-[#4B5563] space-y-2">
                <li>• Fixed deposits</li>
                <li>• Savings account</li>
                <li>• Liquid mutual funds</li>
              </ul>
            </div>

            <div className="bg-white border border-[rgba(26,59,159,0.12)] rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-[#0D1E52] text-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider">
                Alternatives
              </div>
              <ul className="p-4 text-xs sm:text-sm text-[#4B5563] space-y-2">
                <li>• Gold</li>
                <li>• Art</li>
                <li>• Real estate</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 20-YEAR REPORT CARD COMPARISON ── */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-[1060px] mx-auto px-6">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#1A3B9F] block mb-2">
              Report card
            </span>
            <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#091540] tracking-tight mb-3">
              What ₹1 lakh became over 20 years (2002–2022)
            </h2>
            <p className="text-sm text-gray-500 font-light">
              Calendar years 2002 to 2022, on a CAGR basis, before any adjustment for inflation.
            </p>
          </div>

          {/* Nominal vs Real Table */}
          <div className="border border-[rgba(26,59,159,0.12)] rounded-2xl overflow-hidden shadow-sm mb-8">
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

      {/* ── 30-YEAR HOLDING PERIOD COMPOUNDING GRAPH ── */}
      <section className="py-14 sm:py-20 bg-gradient-to-br from-[#091540] to-[#1A3B9F] text-white">
        <div className="max-w-[1060px] mx-auto px-6">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#8DC63F] block mb-2">
              Term length
            </span>
            <h2 className="font-[var(--fd)] text-2xl sm:text-4xl font-bold tracking-tight mb-3">
              Some subjects take longer to master. So does wealth creation.
            </h2>
            <p className="text-sm sm:text-base text-white/80 font-light leading-relaxed">
              ₹1 lakh invested once and left alone. The gap between the two curves illustrates the difference between 8% and 12% CAGR over a full career.
            </p>
          </div>

          <div className="bg-white/5 border border-white/15 rounded-2xl p-6 sm:p-8 overflow-x-auto mb-6">
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
                ~₹30 lakh at 12%
              </text>
              <text x="730" y="145" fill="#AEBBDF" fontSize="13" fontWeight="700" textAnchor="end">
                ~₹10 lakh at 8%
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

          <p className="font-[var(--fd)] text-xl sm:text-2xl font-bold text-[#8DC63F] text-center">
            "Go for more time in the market than timing the market."
          </p>
        </div>
      </section>

      {/* ── COST OF DELAY TABLES ── */}
      <section className="py-14 sm:py-20 bg-[#F8FAFE]">
        <div className="max-w-[1060px] mx-auto px-6">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#1A3B9F] block mb-2">
              The late submission
            </span>
            <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#091540] tracking-tight mb-3">
              What a four-year delay actually costs
            </h2>
            <p className="text-sm sm:text-base text-[#4B5563] font-light leading-relaxed">
              A monthly SIP of ₹10,000 at an assumed 12% CAGR, run until retirement. The only variable is when you start.
            </p>
          </div>

          <div className="border border-[rgba(26,59,159,0.12)] rounded-2xl overflow-hidden shadow-sm bg-white mb-6">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead className="bg-[#0D1E52] text-white">
                <tr>
                  <th className="p-3.5">Years to Retirement</th>
                  <th className="p-3.5">Monthly SIP</th>
                  <th className="p-3.5">Total Invested</th>
                  <th className="p-3.5">Corpus at Retirement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-[#EFF8E2]/50 font-semibold text-[#091540]">
                  <td className="p-3.5">30 years</td>
                  <td className="p-3.5">₹10,000</td>
                  <td className="p-3.5">₹36.0 lakh</td>
                  <td className="p-3.5 text-[#1A3B9F] font-bold">₹3.53 crore</td>
                </tr>
                <tr className="hover:bg-[#EFF8E2]/50">
                  <td className="p-3.5">28 years</td>
                  <td className="p-3.5">₹10,000</td>
                  <td className="p-3.5">₹33.6 lakh</td>
                  <td className="p-3.5">₹2.76 crore</td>
                </tr>
                <tr className="hover:bg-[#EFF8E2]/50">
                  <td className="p-3.5">26 years</td>
                  <td className="p-3.5">₹10,000</td>
                  <td className="p-3.5">₹31.2 lakh</td>
                  <td className="p-3.5">₹2.15 crore</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-[#8DC63F] text-[#091540] font-extrabold text-center text-sm sm:text-base shadow-sm mb-12">
            Delaying 4 years (missing ₹4.8 lakh in contributions) costs ₹1.38 crore in final corpus.
          </div>

          <h3 className="font-[var(--fd)] text-xl font-bold text-[#091540] mb-4">
            Making up for lost time
          </h3>
          <div className="border border-[rgba(26,59,159,0.12)] rounded-2xl overflow-hidden shadow-sm bg-white mb-4">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead className="bg-[#0D1E52] text-white">
                <tr>
                  <th className="p-3.5">Years to Retirement</th>
                  <th className="p-3.5">Monthly SIP Needed</th>
                  <th className="p-3.5">Total Invested</th>
                  <th className="p-3.5">Corpus at Retirement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-[#EFF8E2]/50">
                  <td className="p-3.5 font-semibold">30 years</td>
                  <td className="p-3.5">₹10,000</td>
                  <td className="p-3.5">₹36.00 lakh</td>
                  <td className="p-3.5 font-bold text-[#1A3B9F]">₹3.53 crore</td>
                </tr>
                <tr className="hover:bg-[#EFF8E2]/50">
                  <td className="p-3.5 font-semibold">28 years</td>
                  <td className="p-3.5 text-rose-600 font-bold">₹12,900</td>
                  <td className="p-3.5">₹43.34 lakh</td>
                  <td className="p-3.5 font-bold text-[#1A3B9F]">₹3.53 crore</td>
                </tr>
                <tr className="hover:bg-[#EFF8E2]/50">
                  <td className="p-3.5 font-semibold">26 years</td>
                  <td className="p-3.5 text-rose-600 font-bold">₹16,600</td>
                  <td className="p-3.5">₹51.79 lakh</td>
                  <td className="p-3.5 font-bold text-[#1A3B9F]">₹3.53 crore</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── RETIREMENT SWP MODEL ── */}
      <section className="py-14 sm:py-20 bg-gradient-to-br from-[#091540] to-[#0D1E52] text-white">
        <div className="max-w-[1060px] mx-auto px-6">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#8DC63F] block mb-2">
              After the last bell
            </span>
            <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold tracking-tight mb-2">
              How an SWP works in retirement
            </h2>
            <p className="text-sm text-white/80 font-light">
              A systematic withdrawal plan turns an accumulated corpus into steady monthly income while the remainder stays invested.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-4">
            <div className="bg-white/5 border border-white/15 rounded-2xl p-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white/70 mb-2">
                At Age 60
              </h4>
              <span className="font-[var(--fd)] text-3xl font-extrabold text-[#8DC63F] block mb-1">
                ₹2.0 crore
              </span>
              <p className="text-xs text-white/60">Initial invested retirement corpus</p>
            </div>

            <div className="bg-white/5 border border-white/15 rounded-2xl p-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white/70 mb-2">
                Over 20 Years
              </h4>
              <span className="font-[var(--fd)] text-3xl font-extrabold text-[#8DC63F] block mb-1">
                ₹2.4 crore
              </span>
              <p className="text-xs text-white/60">Total withdrawn at ₹1 lakh/month</p>
            </div>

            <div className="bg-white/5 border border-white/15 rounded-2xl p-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white/70 mb-2">
                At Age 80
              </h4>
              <span className="font-[var(--fd)] text-3xl font-extrabold text-[#8DC63F] block mb-1">
                ₹1.97 crore
              </span>
              <p className="text-xs text-white/60">Remaining corpus (assuming 6% growth)</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TEACHER FAQ ── */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-[780px] mx-auto px-6">
          <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#091540] tracking-tight mb-8 text-center">
            Questions teachers ask us
          </h2>

          <div className="space-y-4">
            {[
              {
                q: "How much should a teacher invest each month?",
                a: "Start with what survives a bad month rather than what looks good on a spreadsheet. A SIP of ₹10,000 a month at an assumed 12% over 30 years illustrates a corpus of around ₹3.53 crore, but the figure matters less than the consistency — the same amount started four years later builds ₹1.38 crore less.",
              },
              {
                q: "Is PPF enough for a teacher's retirement?",
                a: "PPF is a sound, government-backed instrument and belongs in the debt portion of a portfolio. Over the 20 years to 2022, ₹1 lakh in PPF grew to ₹4.68 lakh nominally, which is ₹1.34 lakh in real terms after 6.33% average inflation. It preserves capital well. It is rarely sufficient on its own to fund a 20-year retirement.",
              },
              {
                q: "I am 45 and have not started. Is it too late?",
                a: "No, but the contribution has to rise. Reaching the same target with 26 years left instead of 30 needs roughly ₹16,600 a month rather than ₹10,000 — about ₹15.8 lakh more invested in total. Late is recoverable; never starting is not.",
              },
              {
                q: "What is an SWP and how does it help after retirement?",
                a: "A systematic withdrawal plan pays you a fixed amount from an invested corpus at regular intervals while the balance stays invested. On an illustration of a ₹2 crore corpus at age 60 withdrawing ₹1 lakh a month with 6% portfolio growth, ₹2.4 crore is withdrawn over 20 years and roughly ₹1.97 crore remains at age 80.",
              },
              {
                q: "Does a school pension mean I do not need to invest?",
                a: "A pension covers a base, usually in nominal terms. Inflation is the variable it does not answer: ₹100 in 1958 lost 98.8% of its purchasing power over 62 years. Investing is what keeps the real value of your income intact across a retirement that may run two decades or more.",
              },
              {
                q: "How is a mutual fund distributor paid?",
                a: "A mutual fund distributor is registered with AMFI, holds an ARN, and is remunerated by the asset management company rather than by you. A SEBI-registered investment advisor charges the client a fee instead. MyAnmol operates as an AMFI-registered mutual fund distributor under ARN 114893 and as an IRDAI-licensed insurance advisory.",
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
            Bring your salary slip and your goals. We will build the module.
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
              Request a Time Slot
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}