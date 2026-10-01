import React, { useState } from "react";
import { Link, useNavigate } from "react-router";

const MODULES = [
  { num: "01", title: "Money foundations: cash flow, budget and buffer", meta: "4 lessons · 2h", desc: "Where the money actually goes, and how much of it should be sitting still. You leave with a working budget and a sized emergency fund." },
  { num: "02", title: "Mutual funds, decoded", meta: "5 lessons · 2.5h", desc: "What a fund actually holds, what it charges you, and how to compare two of them honestly instead of by last year’s return." },
  { num: "03", title: "SIPs, goals and asset allocation", meta: "2h · 4 lessons", desc: "Turning 'I should invest' into a number, a date and a monthly instruction you can actually keep." },
  { num: "04", title: "Insurance essentials: term, health and general", meta: "2h · 4 lessons", desc: "Protection before growth. How much cover, of which type, and what the fine print actually excludes." },
  { num: "05", title: "Tax planning without last-minute panic", meta: "1.5h · 3 lessons", desc: "The two regimes, the deductions worth using, and how capital gains on funds are actually taxed." },
  { num: "06", title: "Capstone: your one-page financial plan", meta: "Project · 3h", desc: "Everything from the first five modules, assembled into a single page you can revisit once a year." },
];

export default function CourseLanding() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [openModule, setOpenModule] = useState<number | null>(0);
  const [showAllChips, setShowAllChips] = useState(false);

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, boolean> = {};
    if (name.trim().length < 2) newErrors.name = true;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) newErrors.email = true;
    if (!/^[6-9]\d{9}$/.test(phone.trim())) newErrors.phone = true;
    if (!consent) newErrors.consent = true;

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setIsSuccess(true);
    }
  };

  return (
    <div className="font-[var(--fs)] bg-white text-[#111827] antialiased min-h-screen">
      {/* ── HERO SECTION ── */}
      <header className="relative bg-[#091540] text-white overflow-hidden py-16 sm:py-20 px-6">
        <div className="absolute right-[-6%] top-1/2 -translate-y-1/2 w-[560px] opacity-20 pointer-events-none hidden lg:block">
          <svg viewBox="0 0 400 400" fill="none">
            <path d="M200 40a160 160 0 1 1-113.1 46.9" stroke="rgba(141,198,63,.5)" strokeWidth="1.5" />
            <path d="M200 40a160 160 0 0 1 113.1 273.1L200 200Z" fill="rgba(26,59,159,.4)" />
            <path d="M200 200l113.1 113.1A160 160 0 0 1 86.9 86.9" fill="rgba(141,198,63,.09)" />
            <circle cx="200" cy="200" r="88" stroke="rgba(255,255,255,.16)" strokeWidth="1" />
            <circle cx="200" cy="200" r="4" fill="#8DC63F" />
          </svg>
        </div>

        <div className="max-w-[1240px] mx-auto relative z-10 max-w-[680px] lg:mx-0">
          <div className="inline-flex items-center gap-2.5 mb-6">
            <span className="w-8 h-8 rounded-lg bg-white text-[#1A3B9F] font-[var(--fd)] font-bold grid place-items-center text-lg">
              M
            </span>
            <div>
              <b className="block text-sm font-bold">MyAnmol</b>
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-white/50">
                Learn · Unlearn · Relearn
              </span>
            </div>
          </div>

          <h1 className="font-[var(--fd)] text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
            Financial Fitness <span className="text-[#8DC63F] italic">Professional Certificate</span>
          </h1>

          <p className="text-base font-bold text-[#8DC63F] mb-3">
            Learn to plan, invest and protect — on your own terms.
          </p>
          <p className="text-sm sm:text-base text-white/75 font-light leading-relaxed mb-6 max-w-xl">
            Six self-paced modules covering budgeting, mutual funds, SIPs, insurance, and tax planning. Built for first-time investors and salaried professionals. No prior experience required.
          </p>

          <div className="flex items-center gap-3 text-xs sm:text-sm text-white/75 mb-8">
            <span className="w-6 h-6 rounded-full bg-[#8DC63F] text-[#091540] font-bold grid place-items-center text-xs">
              M
            </span>
            Instructor: <Link to="/about/team" className="text-white underline underline-offset-4">MyAnmol Advisory Team</Link>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="bg-[#8DC63F] hover:bg-[#9ED64A] text-[#091540] font-extrabold text-sm sm:text-base px-10 py-3.5 rounded-full shadow-lg transition-all cursor-pointer inline-flex flex-col items-center"
          >
            Enroll for free
            <small className="text-[10px] font-semibold opacity-75">Next cohort starts 1 Oct</small>
          </button>

          <p className="text-xs text-white/60 mt-4">
            <b>2,140</b> learners enrolled
          </p>

          <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap gap-4 text-xs text-white/50">
            <span className="flex items-center gap-2"><i className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" /> AMFI-registered distributor — ARN 114893</span>
            <span className="flex items-center gap-2"><i className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" /> IRDAI-licensed insurance advisory</span>
            <span className="flex items-center gap-2"><i className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" /> Education only, not investment advice</span>
          </div>
        </div>
      </header>

      {/* ── STATS BAR ── */}
      <div className="bg-gradient-to-b from-[#091540] to-white pt-6 pb-12">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 bg-white border border-[rgba(26,59,159,0.12)] rounded-2xl shadow-xl overflow-hidden divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
            <div className="p-6">
              <b className="block text-sm font-extrabold text-[#091540] mb-1.5 underline decoration-[#8DC63F] decoration-2 underline-offset-4">
                6 module series
              </b>
              <p className="text-xs text-gray-500">Earn a certificate that shows you can plan your own money</p>
            </div>
            <div className="p-6">
              <b className="block text-sm font-extrabold text-[#091540] mb-1.5">
                4.8 ★
              </b>
              <p className="text-xs text-gray-500">from 386 learner reviews across the programme</p>
            </div>
            <div className="p-6">
              <b className="block text-sm font-extrabold text-[#091540] mb-1.5">
                Beginner level
              </b>
              <p className="text-xs text-gray-500">No prior investing experience needed</p>
            </div>
            <div className="p-6">
              <b className="block text-sm font-extrabold text-[#091540] mb-1.5">
                Flexible schedule
              </b>
              <p className="text-xs text-gray-500">6 weeks at 3 hours a week · learn at your own pace</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── ABOUT SECTION ── */}
      <section className="py-16 sm:py-20 max-w-[1240px] mx-auto px-6 space-y-12">
        <div>
          <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#091540] mb-3">
            What you'll learn
          </h2>
          <p className="text-sm sm:text-base text-gray-500 font-light max-w-2xl mb-8">
            Every module ends with something you actually apply to your own money — not a quiz you forget.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "Build a monthly budget and an emergency fund that survives a real income shock.",
              "Read a mutual fund factsheet — NAV, expense ratio, exit load, rolling returns.",
              "Size a term and health cover correctly, and spot the riders that are not worth paying for.",
              "Write a one-page financial plan with goals, timelines and an allocation you can defend.",
            ].map((item, idx) => (
              <div key={idx} className="flex gap-3 text-sm text-[#374151]">
                <span className="w-5 h-5 rounded-full bg-[#EFF8E2] text-[#6AA32A] flex items-center justify-center text-xs shrink-0 font-bold mt-0.5">
                  ✓
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#1A3B9F] block mb-3">
            Skills you'll gain
          </span>
          <div className="flex flex-wrap gap-2">
            {[
              "Goal-based planning",
              "SIP structuring",
              "Asset allocation",
              "Risk profiling",
              "Fund selection",
              "Term insurance",
              "Health insurance",
              "Emergency fund design",
              ...(showAllChips
                ? ["Tax planning", "Portfolio review", "Retirement corpus maths", "Debt fund basics"]
                : []),
            ].map((chip, idx) => (
              <span key={idx} className="text-xs font-semibold bg-[#EEF2FB] text-[#0D1E52] border border-[rgba(26,59,159,0.12)] px-4 py-2 rounded-full">
                {chip}
              </span>
            ))}
            {!showAllChips && (
              <button
                onClick={() => setShowAllChips(true)}
                className="text-xs font-bold text-[#1A3B9F] underline underline-offset-2 ml-2 cursor-pointer"
              >
                Show all
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── DETAILS TO KNOW ── */}
      <section className="py-16 sm:py-20 bg-[#EEF2FB] px-6">
        <div className="max-w-[1240px] mx-auto">
          <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#091540] mb-2">
            Details to know
          </h2>
          <p className="text-sm text-gray-500 font-light mb-10">What you get, and what to expect before you start.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#091540] text-[#8DC63F] flex items-center justify-center shrink-0">
                🎓
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#091540] mb-1">Shareable certificate</h4>
                <p className="text-xs text-gray-500">Add it to your LinkedIn profile when you finish the capstone.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#091540] text-[#8DC63F] flex items-center justify-center shrink-0">
                🌐
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#091540] mb-1">Taught in English and Hindi</h4>
                <p className="text-xs text-gray-500">Regional language sessions on request.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#091540] text-[#8DC63F] flex items-center justify-center shrink-0">
                ⏱️
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#091540] mb-1">6 weeks, 3 hours a week</h4>
                <p className="text-xs text-gray-500">Fully self-paced — module access does not expire.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#091540] text-[#8DC63F] flex items-center justify-center shrink-0">
                🌱
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#091540] mb-1">No prior experience</h4>
                <p className="text-xs text-gray-500">Starts from first principles — no finance background needed.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CURRICULUM ACCORDION ── */}
      <section className="py-16 sm:py-20 max-w-[1240px] mx-auto px-6">
        <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#091540] mb-2">
          Course series
        </h2>
        <p className="text-sm text-gray-500 font-light mb-10">Six modules, in order. Each one builds on the last and ends with a worksheet.</p>

        <div className="border-t border-gray-200 divide-y divide-gray-200">
          {MODULES.map((m, idx) => {
            const isOpen = openModule === idx;
            return (
              <div key={idx} className="py-4">
                <button
                  onClick={() => setOpenModule(isOpen ? null : idx)}
                  className="w-full text-left flex items-center justify-between gap-4 py-2 cursor-pointer group"
                >
                  <div className="flex items-center gap-6">
                    <span className="text-xs font-extrabold uppercase tracking-widest text-[#6AA32A]">
                      {m.num}
                    </span>
                    <span className="font-[var(--fd)] text-lg font-bold text-[#091540] group-hover:text-[#1A3B9F] transition-colors">
                      {m.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-gray-400 font-medium hidden sm:inline">{m.meta}</span>
                    <span className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-xs font-bold text-[#1A3B9F]">
                      {isOpen ? "−" : "+"}
                    </span>
                  </div>
                </button>

                {isOpen && (
                  <div className="pl-14 pr-6 pt-2 pb-4 text-sm text-[#4B5563] font-light leading-relaxed">
                    <p className="mb-3">{m.desc}</p>
                    <ul className="space-y-1.5 text-xs text-gray-600">
                      <li>• Core concepts review &amp; definitions</li>
                      <li>• Practical calculations &amp; worksheet assignment</li>
                      <li>• End-of-module review quiz</li>
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── TESTIMONIALS & REVIEWS ── */}
      <section className="py-16 sm:py-20 bg-[#EEF2FB] px-6">
        <div className="max-w-[1240px] mx-auto space-y-16">
          <div>
            <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#091540] mb-2">
              What learners say
            </h2>
            <p className="text-sm text-gray-500 font-light mb-8">From people who finished the capstone and now run their own plan.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { quote: "I had four SIPs running and could not have told you why. Module 3 fixed that in an afternoon.", author: "Software engineer, Bengaluru" },
                { quote: "The insurance module saved me from a policy I was about to buy. That alone paid for the time.", author: "Small business owner, Jaipur" },
                { quote: "First time anyone explained expense ratio without making me feel stupid for asking.", author: "Teacher, New Delhi" },
              ].map((t, idx) => (
                <div key={idx} className="bg-white border border-gray-200 rounded-2xl p-6 relative shadow-sm">
                  <div className="absolute top-0 left-6 right-6 h-1 bg-[#8DC63F] rounded-b" />
                  <p className="font-[var(--fd)] text-base italic text-[#091540] mb-4 leading-relaxed">
                    "{t.quote}"
                  </p>
                  <span className="text-xs text-gray-500 font-semibold block">{t.author}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8 items-center bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
            <div className="bg-[#091540] text-white rounded-2xl p-6 text-center">
              <span className="font-[var(--fd)] text-5xl font-bold text-[#8DC63F] block mb-1">4.8</span>
              <div className="text-[#8DC63F] text-sm tracking-widest mb-2">★★★★★</div>
              <p className="text-xs text-white/60">386 reviews</p>
            </div>

            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex items-center gap-4">
                <span className="w-12">5 stars</span>
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-[#8DC63F]" style={{ width: "84%" }} /></div>
                <span className="w-8 text-right font-bold">84%</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="w-12">4 stars</span>
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-[#8DC63F]" style={{ width: "12%" }} /></div>
                <span className="w-8 text-right font-bold">12%</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="w-12">3 stars</span>
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-[#8DC63F]" style={{ width: "3%" }} /></div>
                <span className="w-8 text-right font-bold">3%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA ── */}
      <section className="py-16 sm:py-24 bg-[#091540] text-white text-center px-6">
        <div className="max-w-xl mx-auto">
          <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Start with <span className="text-[#8DC63F] italic">module one</span>, today
          </h2>
          <p className="text-sm sm:text-base text-white/75 font-light mb-8">
            Free to enroll. Six modules, a capstone, and a certificate at the end of it.
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-[#8DC63F] hover:bg-[#9ED64A] text-[#091540] font-extrabold text-base px-10 py-4 rounded-full shadow-lg transition-all cursor-pointer"
          >
            Enroll for free <span className="block text-xs font-semibold opacity-75">Takes under a minute</span>
          </button>
        </div>
      </section>

      {/* ── ENROLLMENT MODAL ── */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#091540]/70 backdrop-blur-sm overflow-y-auto"
        >
          <div className="relative w-full max-w-[440px] bg-white rounded-3xl shadow-2xl p-8">
            <button
              onClick={() => {
                setModalOpen(false);
                setIsSuccess(false);
              }}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 font-bold"
            >
              ×
            </button>

            {!isSuccess ? (
              <div>
                <h2 className="font-[var(--fd)] text-2xl font-bold text-[#091540] mb-2">
                  Enroll or sign in
                </h2>
                <p className="text-xs text-gray-500 mb-6">
                  Learn at your own pace, from an AMFI-registered advisory team. Free to start.
                </p>

                <form onSubmit={handleContinue} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#091540] mb-1">Full name *</label>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`w-full px-3.5 py-2.5 border rounded-xl text-sm focus:outline-none ${
                        errors.name ? "border-rose-500" : "border-gray-300 focus:border-[#1A3B9F]"
                      }`}
                    />
                    {errors.name && <p className="text-[11px] text-rose-500 mt-1">Please enter your name.</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#091540] mb-1">Email *</label>
                    <input
                      type="email"
                      placeholder="name@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full px-3.5 py-2.5 border rounded-xl text-sm focus:outline-none ${
                        errors.email ? "border-rose-500" : "border-gray-300 focus:border-[#1A3B9F]"
                      }`}
                    />
                    {errors.email && <p className="text-[11px] text-rose-500 mt-1">Please enter a valid email address.</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#091540] mb-1">Mobile number *</label>
                    <div className="flex">
                      <span className="px-3 py-2.5 bg-gray-100 border border-r-0 border-gray-300 rounded-l-xl text-xs font-bold text-gray-700 flex items-center">
                        +91
                      </span>
                      <input
                        type="tel"
                        maxLength={10}
                        placeholder="10-digit number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                        className={`w-full px-3.5 py-2.5 border rounded-r-xl text-sm focus:outline-none ${
                          errors.phone ? "border-rose-500" : "border-gray-300 focus:border-[#1A3B9F]"
                        }`}
                      />
                    </div>
                    {errors.phone && <p className="text-[11px] text-rose-500 mt-1">Please enter a 10-digit mobile number.</p>}
                  </div>

                  <label className="flex items-start gap-2 pt-2 text-xs text-gray-600">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-0.5 accent-[#1A3B9F]"
                    />
                    <span>
                      I agree to the <Link to="/terms-and-conditions" className="text-[#1A3B9F] underline">Terms</Link> and consent to being contacted by MyAnmol.
                    </span>
                  </label>
                  {errors.consent && <p className="text-[11px] text-rose-500">Please accept the terms to continue.</p>}

                  <button
                    type="submit"
                    className="w-full bg-[#1A3B9F] hover:bg-[#0D1E52] text-white font-extrabold text-sm py-3 rounded-xl transition-all shadow-md mt-4 cursor-pointer"
                  >
                    Continue
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 text-2xl flex items-center justify-center mx-auto mb-4 font-bold shadow-sm">
                  ✓
                </div>
                <h3 className="font-[var(--fd)] text-2xl font-bold text-[#091540] mb-2">
                  You're enrolled
                </h3>
                <p className="text-xs text-gray-500 mb-6 leading-relaxed">
                  Module one is unlocked. We've sent the access link to <strong>{email}</strong>.
                </p>
                <button
                  onClick={() => navigate(`/insights/workshops/financial-fitness-certificate/learn?name=${encodeURIComponent(name)}`)}
                  className="w-full bg-[#8DC63F] hover:bg-[#9ED64A] text-[#091540] font-extrabold text-sm py-3.5 rounded-full shadow-md transition-all cursor-pointer"
                >
                  Start module one →
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}