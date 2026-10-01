import React, { useState } from "react";
import { Link } from "react-router";

export default function FinancialWellnessThemed() {
  const [activeNiche, setActiveNiche] = useState<string>("hr");

  return (
    <div className="font-[var(--fs)] bg-white text-[#111827] antialiased min-h-screen">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-white py-24 text-center px-6">
        <div className="absolute top-[-20%] left-[15%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(26,59,159,0.08)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute top-[-10%] right-[10%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(141,198,63,0.08)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#EEF2FB] border border-[rgba(26,59,159,0.2)] text-[#1A3B9F] text-xs font-bold px-4 py-2 rounded-full mb-8">
            <span className="w-2 h-2 rounded-full bg-[#8DC63F] shadow-[0_0_8px_#8DC63F]" />
            Financial Well-being for Every Life Stage
          </div>

          <h1 className="font-[var(--fd)] text-4xl sm:text-7xl font-extrabold tracking-tight text-[#091540] mb-6 leading-tight">
            The Financial <br />
            Well-being <br />
            Around You
          </h1>

          <p className="text-base sm:text-lg text-gray-600 font-light max-w-xl mx-auto mb-10 leading-relaxed">
            Expert-led programs that meet you where you are — whether you're building a business, planning retirement, or just starting out.
          </p>

          <div className="flex justify-center">
            <Link
              to="/wp/review"
              className="bg-[#1A3B9F] hover:bg-[#0D1E52] text-white font-extrabold text-sm px-8 py-4 rounded-xl shadow-lg transition-all"
            >
              Book a Free Session
            </Link>
          </div>
        </div>
      </section>

      {/* ── NICHE SELECTOR TABS ── */}
      <section className="bg-gradient-to-br from-[#091540] via-[#0D1E52] to-[#1A3B9F] pt-12 px-6">
        <div className="max-w-[1100px] mx-auto text-center pb-8">
          <h2 className="font-[var(--fd)] text-2xl sm:text-4xl font-bold text-white mb-2">
            Choose your financial journey
          </h2>
          <p className="text-sm text-white/70 font-light">Every program is tailored to your unique life stage and goals.</p>

          <div className="flex justify-center flex-wrap gap-2 pt-6 overflow-x-auto no-scrollbar">
            {[
              { id: "hr", icon: "🏢", label: "Corporate HR" },
              { id: "biz", icon: "📊", label: "Business Owners" },
              { id: "senior", icon: "🌸", label: "Senior Couples (60+)" },
              { id: "student", icon: "🎓", label: "Young Professionals" },
              { id: "freelancer", icon: "💻", label: "Freelancers & Gig" },
              { id: "homemaker", icon: "🏡", label: "Homemakers" },
              { id: "newlywed", icon: "💍", label: "Newlyweds" },
              { id: "singleparent", icon: "👩‍👦", label: "Single Parents" },
              { id: "preretiree", icon: "⏳", label: "Pre-Retirees (45–58)" },
              { id: "genz", icon: "📱", label: "Gen Z (18–22)" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveNiche(tab.id)}
                className={`px-4 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeNiche === tab.id
                    ? "bg-white text-[#091540] shadow-md"
                    : "bg-white/10 text-white/80 hover:bg-white/15"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── NICHE PAGES CONTAINER ── */}
      <div className="bg-[#091540]">
        {/* CORPORATE HR */}
        {activeNiche === "hr" && (
          <div className="bg-white text-[#111827]">
            <div className="bg-gradient-to-r from-[#EEF2FB] to-[#F8FAFE] py-16 text-center px-6">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#1A3B9F] block mb-2">For HR & People Leaders</span>
              <h2 className="font-[var(--fd)] text-3xl sm:text-5xl font-bold text-[#091540] mb-4">Your employees are drowning in money stress</h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto mb-6">India's workforce has a 27% financial literacy rate. When teams struggle financially — focus, morale, and retention all suffer. We fix that with certified workshops.</p>
              <a href="https://forms.cloud.microsoft/r/uK4ZDnpwRL" target="_blank" rel="noreferrer" className="inline-block bg-[#1A3B9F] text-white font-extrabold text-xs px-8 py-3.5 rounded-xl">Book a Free Intro Session →</a>
            </div>
            <div className="bg-[#0D1E52] py-8 text-white px-6">
              <div className="max-w-[1100px] mx-auto grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                <div><span className="text-2xl sm:text-3xl font-extrabold text-[#8DC63F] block">42%</span><span className="text-[11px] text-white/70">workers distracted by money worries</span></div>
                <div><span className="text-2xl sm:text-3xl font-extrabold text-[#8DC63F] block">13hrs</span><span className="text-[11px] text-white/70">lost per employee every month</span></div>
                <div><span className="text-2xl sm:text-3xl font-extrabold text-[#8DC63F] block">72%</span><span className="text-[11px] text-white/70">would stay for wellness benefits</span></div>
                <div><span className="text-2xl sm:text-3xl font-extrabold text-[#8DC63F] block">84%</span><span className="text-[11px] text-white/70">say it improves retention</span></div>
                <div><span className="text-2xl sm:text-3xl font-extrabold text-[#8DC63F] block">24%</span><span className="text-[11px] text-white/70">fewer unplanned sick days</span></div>
              </div>
            </div>
          </div>
        )}

        {/* BUSINESS OWNERS */}
        {activeNiche === "biz" && (
          <div className="bg-white text-[#111827]">
            <div className="bg-[#0D1E52] py-16 text-center text-white px-6">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#8DC63F] block mb-2">For Business Owners & Entrepreneurs</span>
              <h2 className="font-[var(--fd)] text-3xl sm:text-5xl font-bold mb-4">Your business runs. Does your personal wealth?</h2>
              <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto mb-6">Most business owners pour everything into the company — and forget to build personal financial security. We bridge that gap with structured, India-focused wealth planning.</p>
              <Link to="/contact" className="inline-block bg-[#8DC63F] text-[#091540] font-extrabold text-xs px-8 py-3.5 rounded-xl">Schedule a Consultation →</Link>
            </div>
          </div>
        )}

        {/* SENIOR COUPLES */}
        {activeNiche === "senior" && (
          <div className="bg-white text-[#111827]">
            <div className="bg-gradient-to-r from-pink-50 to-amber-50 py-16 text-center px-6">
              <span className="text-xs font-extrabold uppercase tracking-widest text-pink-700 block mb-2">For Couples & Individuals Aged 60+</span>
              <h2 className="font-[var(--fd)] text-3xl sm:text-5xl font-bold text-[#091540] mb-4">You've worked hard. Now let your money work for you.</h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto mb-6">Retirement isn't an end — it's a new financial chapter. We help senior couples protect their corpus, generate income, and plan for a dignified, independent life.</p>
              <Link to="/contact" className="inline-block bg-[#1A3B9F] text-white font-extrabold text-xs px-8 py-3.5 rounded-xl">Book a Free Retirement Consultation →</Link>
            </div>
          </div>
        )}

        {/* YOUNG PROFESSIONALS */}
        {activeNiche === "student" && (
          <div className="bg-white text-[#111827]">
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 py-16 text-center px-6">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#1A3B9F] block mb-2">For Young Professionals (22–32)</span>
              <h2 className="font-[var(--fd)] text-3xl sm:text-5xl font-bold text-[#091540] mb-4">Your first paycheck. Your first real shot at wealth.</h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto mb-6">The habits you build in your 20s will determine your financial future. Most young Indians start too late — we help you start now, with small steps that compound into millions.</p>
              <Link to="/contact" className="inline-block bg-[#1A3B9F] text-white font-extrabold text-xs px-8 py-3.5 rounded-xl">Start Your Financial Journey →</Link>
            </div>
          </div>
        )}

        {/* FREELANCERS */}
        {activeNiche === "freelancer" && (
          <div className="bg-white text-[#111827]">
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 py-16 text-center px-6">
              <span className="text-xs font-extrabold uppercase tracking-widest text-amber-700 block mb-2">For Freelancers, Consultants & Gig Workers</span>
              <h2 className="font-[var(--fd)] text-3xl sm:text-5xl font-bold text-[#091540] mb-4">Irregular income. Regular financial peace of mind.</h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto mb-6">No employer EPF. No guaranteed salary. No corporate insurance. Freelancers face unique financial challenges — and need a uniquely different playbook.</p>
              <Link to="/contact" className="inline-block bg-[#1A3B9F] text-white font-extrabold text-xs px-8 py-3.5 rounded-xl">Book a Freelancer Consultation →</Link>
            </div>
          </div>
        )}

        {/* HOMEMAKERS */}
        {activeNiche === "homemaker" && (
          <div className="bg-white text-[#111827]">
            <div className="bg-gradient-to-r from-pink-50 to-emerald-50 py-16 text-center px-6">
              <span className="text-xs font-extrabold uppercase tracking-widest text-pink-700 block mb-2">For Homemakers & Stay-at-Home Parents</span>
              <h2 className="font-[var(--fd)] text-3xl sm:text-5xl font-bold text-[#091540] mb-4">Managing a home is a full-time job. So is managing money.</h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto mb-6">Financial independence doesn't require a salary. Whether you manage household finances or want to build your own wealth — you deserve financial literacy and control.</p>
              <Link to="/contact" className="inline-block bg-[#1A3B9F] text-white font-extrabold text-xs px-8 py-3.5 rounded-xl">Start Your Financial Independence Journey →</Link>
            </div>
          </div>
        )}

        {/* NEWLYWEDS */}
        {activeNiche === "newlywed" && (
          <div className="bg-white text-[#111827]">
            <div className="bg-gradient-to-r from-rose-50 to-purple-50 py-16 text-center px-6">
              <span className="text-xs font-extrabold uppercase tracking-widest text-rose-700 block mb-2">For Newly Married Couples</span>
              <h2 className="font-[var(--fd)] text-3xl sm:text-5xl font-bold text-[#091540] mb-4">Two salaries. One shared future. Zero financial fights.</h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto mb-6">The first 3 years of marriage set the financial tone for decades. Build a strong joint foundation — shared goals, combined budgets, and a plan that works for both of you.</p>
              <Link to="/contact" className="inline-block bg-[#1A3B9F] text-white font-extrabold text-xs px-8 py-3.5 rounded-xl">Start Your Couples Journey →</Link>
            </div>
          </div>
        )}

        {/* SINGLE PARENTS */}
        {activeNiche === "singleparent" && (
          <div className="bg-white text-[#111827]">
            <div className="bg-gradient-to-r from-sky-50 to-blue-50 py-16 text-center px-6">
              <span className="text-xs font-extrabold uppercase tracking-widest text-sky-700 block mb-2">For Single Parents</span>
              <h2 className="font-[var(--fd)] text-3xl sm:text-5xl font-bold text-[#091540] mb-4">One income. Double the responsibility.</h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto mb-6">Single parents carry an extraordinary financial burden — providing for children, building security, and planning for the future, all on one salary. You deserve a plan built for your reality.</p>
              <Link to="/contact" className="inline-block bg-[#1A3B9F] text-white font-extrabold text-xs px-8 py-3.5 rounded-xl">Book a Single Parent Consultation →</Link>
            </div>
          </div>
        )}

        {/* PRE-RETIREES */}
        {activeNiche === "preretiree" && (
          <div className="bg-white text-[#111827]">
            <div className="bg-[#0D1E52] py-16 text-center text-white px-6">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#8DC63F] block mb-2">For Pre-Retirees Aged 45–58</span>
              <h2 className="font-[var(--fd)] text-3xl sm:text-5xl font-bold mb-4">10–15 years left. It's your most powerful window.</h2>
              <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto mb-6">The decade before retirement is when financial decisions have the highest impact. Max out, catch up, and lock in a retirement you'll actually enjoy.</p>
              <Link to="/contact" className="inline-block bg-[#8DC63F] text-[#091540] font-extrabold text-xs px-8 py-3.5 rounded-xl">Maximise Your Final Wealth Window →</Link>
            </div>
          </div>
        )}

        {/* GEN Z */}
        {activeNiche === "genz" && (
          <div className="bg-white text-[#111827]">
            <div className="bg-[#091540] py-16 text-center text-white px-6">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#8DC63F] block mb-2">For Gen Z — First Jobbers & Students (18–22)</span>
              <h2 className="font-[var(--fd)] text-3xl sm:text-5xl font-bold mb-4">You're early. That's your superpower.</h2>
              <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto mb-6">No debt. No obligations. No dependants. If you start investing at 18, you'll have 40 years of compounding on your side.</p>
              <Link to="/contact" className="inline-block bg-[#8DC63F] text-[#091540] font-extrabold text-xs px-8 py-3.5 rounded-xl">Start Your Journey →</Link>
            </div>
          </div>
        )}
      </div>

      {/* ── CTA BAND ── */}
      <section className="py-24 bg-gradient-to-br from-[#091540] via-[#0D1E52] to-[#1A3B9F] text-center text-white px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-[var(--fd)] text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
            Ready to secure <span className="text-[#8DC63F] italic">your financial future</span>?
          </h2>
          <p className="text-base text-white/80 font-light mb-10 max-w-md mx-auto leading-relaxed">
            Book a free introductory session. We'll customise the program to your team or personal goals.
          </p>
          <Link
            to="/contact"
            className="bg-[#8DC63F] hover:bg-[#9ED64A] text-[#091540] font-extrabold text-base px-10 py-4 rounded-full shadow-lg transition-all inline-block"
          >
            Book a Free Session →
          </Link>
        </div>
      </section>
    </div>
  );
}