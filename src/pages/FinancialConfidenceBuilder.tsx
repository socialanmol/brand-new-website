import React, { useState } from "react";
import { Link } from "react-router";

interface DayTask {
  dayNum: number;
  title: string;
  linkHtml?: string;
}

interface WeekPlan {
  title: string;
  focus: string;
  days: string[];
}

const WEEKS: WeekPlan[] = [
  {
    title: "Week 1",
    focus: "Awareness, Budgeting, and Savings",
    days: [
      "Understand Financial Confidence",
      "Calculate Your Net Worth",
      "Track Your Spending for the Last Month",
      "Set Up a Monthly Budget (50/30/20 Rule)",
      "Open/Optimize a Savings Account",
      "Emergency Fund – Start Building",
      "Talk About Money at Home",
    ],
  },
  {
    title: "Week 2",
    focus: "Insurance, Risk Protection, & Security",
    days: [
      "Learn About Insurance Basics",
      "Check Life Insurance Coverage",
      "Review or Buy Health Insurance",
      "Make a Financial Contingency List",
      "Nomination & Will Basics",
      "Identify Personal Risks",
      "Secure Documents Digitally",
    ],
  },
  {
    title: "Week 3",
    focus: "Grow Your Wealth the Smart Way",
    days: [
      "Understand the Power of Compounding",
      "Investment Vehicles Overview",
      "Start SIP in Mutual Funds",
      "Know the Difference: Saving vs Investing",
      "Understand Inflation",
      "Automate Investments",
      "Know Your Risk Appetite",
    ],
  },
  {
    title: "Week 4",
    focus: "Long-term Planning & Review",
    days: [
      "Set Financial Goals",
      "Retirement Planning Basics",
      "Learn About Asset Allocation",
      "Understand Tax Implications",
      "Use a Financial Calculator",
      "Check Your Credit Score",
      "Monthly Review Ritual",
      "Learn One Financial Term Every Week",
      "Financial Confidence Checklist",
    ],
  },
];

const CUSTOM_LINKS: Record<number, React.ReactNode> = {
  6: (
    <a href="https://www.myanmol.com/blog/life-insurance-coverage" target="_blank" rel="noopener noreferrer">
      Read blog →
    </a>
  ),
  8: (
    <>
      <a href="https://www.myanmol.com/blog/will-nomination" target="_blank" rel="noopener noreferrer">
        Read blog →
      </a>
      <br />
      <a href="https://www.myanmol.com/contact-us" target="_blank" rel="noopener noreferrer">
        Contact us →
      </a>
    </>
  ),
  10: (
    <a href="https://www.myanmol.com/blog/risk-protection-guide" target="_blank" rel="noopener noreferrer">
      Read blog →
    </a>
  ),
  13: (
    <a href="https://www.myanmol.com/blog/investment-options-india" target="_blank" rel="noopener noreferrer">
      Read blog →
    </a>
  ),
  14: (
    <a href="https://www.myanmol.com/blog/how-to-start-sip" target="_blank" rel="noopener noreferrer">
      Read blog →
    </a>
  ),
  15: (
    <a href="https://www.myanmol.com/blog/saving-vs-investing" target="_blank" rel="noopener noreferrer">
      Read blog →
    </a>
  ),
  16: (
    <a href="https://www.myanmol.com/blog/inflation-impact" target="_blank" rel="noopener noreferrer">
      Read blog →
    </a>
  ),
  17: (
    <a href="https://www.myanmol.com/blog/automate-investments" target="_blank" rel="noopener noreferrer">
      Read blog →
    </a>
  ),
  19: (
    <a href="https://www.myanmol.com/contact-us" target="_blank" rel="noopener noreferrer">
      Want more information? Contact us →
    </a>
  ),
  21: (
    <a href="https://www.myanmol.com/blog/asset-allocation" target="_blank" rel="noopener noreferrer">
      Read blog →
    </a>
  ),
  22: (
    <a href="https://www.myanmol.com/blog/tax-planning" target="_blank" rel="noopener noreferrer">
      Read blog →
    </a>
  ),
  23: (
    <a href="https://www.myanmol.com/blog/financial-calculators" target="_blank" rel="noopener noreferrer">
      Read blog →
    </a>
  ),
  24: (
    <Link to="/tools">
      Explore our calculators →
    </Link>
  ),
};

export default function FinancialConfidenceBuilder() {
  const totalTasks = WEEKS.reduce((acc, w) => acc + w.days.length, 0);
  const [completedTasks, setCompletedTasks] = useState<Record<number, boolean>>({});
  const [activeWeek, setActiveWeek] = useState<number>(0);
  const [openDay, setOpenDay] = useState<number | null>(null);

  const completedCount = Object.values(completedTasks).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / totalTasks) * 100);

  let globalDayCounter = 0;

  return (
    <div className="font-[var(--fs)] bg-white text-[#111827] antialiased min-h-screen pb-20">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#091540] via-[#0D1E52] to-[#1A3B9F] py-16 sm:py-24 text-center text-white px-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[580px] bg-[radial-gradient(circle,rgba(141,198,63,0.18)_0%,transparent_65%)] filter blur-3xl pointer-events-none" />
        <div className="max-w-2xl mx-auto relative z-10">
          <span className="text-[11px] font-extrabold uppercase tracking-[.18em] text-[#8DC63F] block mb-3">
            30-Day Challenge
          </span>
          <h1 className="font-[var(--fd)] text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-4 text-white">
            Build financial confidence, <span className="text-[#8DC63F]">one day at a time.</span>
          </h1>
          <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed mb-6">
            Daily habits and core understanding to become financially confident and resilient — across four focused weeks.
          </p>

          <div className="flex justify-center gap-6 text-xs sm:text-sm font-bold text-[#8DC63F]">
            <span>💰 Save</span>
            <span>🛡️ Insure</span>
            <span>📈 Invest</span>
            <span>🌱 Grow</span>
          </div>
        </div>
      </section>

      {/* WHAT CAN YOU LEARN STRIP */}
      <section className="py-12 bg-[#091540] text-white border-t border-white/10">
        <div className="max-w-[960px] mx-auto px-6">
          <h2 className="font-[var(--fd)] text-xl sm:text-2xl font-bold text-center mb-8 text-white">
            What can you learn?
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 text-center">
            {[
              { icon: "🎯", label: "Goal Setting" },
              { icon: "💰", label: "Smart Saving" },
              { icon: "📈", label: "Investment Basics" },
              { icon: "🛡️", label: "Risk Protection" },
              { icon: "🧠", label: "Financial Confidence" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-[#8DC63F]/15 border border-[#8DC63F]/30 flex items-center justify-center text-2xl mb-3 shadow-sm">
                  {item.icon}
                </div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-white/90">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRESS BAR TRACK */}
      <section className="py-8 max-w-[820px] mx-auto px-6">
        <div className="flex justify-between items-center text-xs font-bold text-[#6B7280] mb-2 uppercase tracking-wider">
          <span>Challenge Progress</span>
          <span className="text-[#1A3B9F] font-extrabold">{completedCount} of {totalTasks} Days Completed</span>
        </div>
        <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
          <div
            className="h-full bg-gradient-to-r from-[#8DC63F] to-[#1A3B9F] rounded-full transition-all duration-500 flex items-center justify-end pr-2.5 text-[10px] font-extrabold text-white"
            style={{ width: `${progressPercent}%` }}
          >
            {progressPercent > 5 ? `${progressPercent}%` : ""}
          </div>
        </div>
      </section>

      {/* TABS + ACCORDION WEEKS */}
      <section className="max-w-[820px] mx-auto px-6">
        {/* Tab Row */}
        <div className="flex flex-wrap gap-2.5 justify-center mb-10">
          {WEEKS.map((week, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setActiveWeek(idx);
                setOpenDay(null);
              }}
              className={`text-sm font-bold px-6 py-3 rounded-full border transition-all ${
                activeWeek === idx
                  ? "bg-[#1A3B9F] text-white border-[#1A3B9F] shadow-md"
                  : "bg-white text-gray-600 border-gray-200 hover:border-[#1A3B9F] hover:text-[#1A3B9F]"
              }`}
            >
              {week.title}
            </button>
          ))}
        </div>

        {/* Active Week Card */}
        <div className="bg-white border border-[rgba(26,59,159,0.12)] rounded-3xl p-6 sm:p-10 shadow-sm">
          <div className="pb-6 mb-6 border-b border-gray-100">
            <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#091540] mb-1">
              {WEEKS[activeWeek].title}
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-[#8DC63F] uppercase tracking-wider">
              Focus: {WEEKS[activeWeek].focus}
            </p>
          </div>

          <div className="divide-y divide-gray-100">
            {WEEKS[activeWeek].days.map((dayTitle) => {
              const currentIdx = globalDayCounter++;
              // Recalculate global index accurately across weeks
              let absoluteIdx = 0;
              for (let w = 0; w < activeWeek; w++) {
                absoluteIdx += WEEKS[w].days.length;
              }
              absoluteIdx += currentIdx;

              const isChecked = !!completedTasks[absoluteIdx];
              const isOpen = openDay === absoluteIdx;

              return (
                <div
                  key={absoluteIdx}
                  className={`py-3 transition-colors ${isChecked ? "bg-gray-50/80 rounded-xl px-2 my-1" : ""}`}
                >
                  <div className="flex items-center justify-between gap-4 py-2 cursor-pointer">
                    <div
                      className="flex items-center gap-3.5 flex-1 min-w-0"
                      onClick={() => setOpenDay(isOpen ? null : absoluteIdx)}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => {
                          setCompletedTasks({
                            ...completedTasks,
                            [absoluteIdx]: e.target.checked,
                          });
                        }}
                        className="w-5 h-5 rounded accent-[#1A3B9F] cursor-pointer"
                      />
                      <span className={`text-sm sm:text-base font-bold ${isChecked ? "text-gray-400 line-through" : "text-[#111827]"}`}>
                        <span className="text-[#8DC63F] mr-2 font-extrabold text-xs uppercase">
                          Day {absoluteIdx + 1}
                        </span>
                        {dayTitle}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setOpenDay(isOpen ? null : absoluteIdx)}
                      className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-sm font-bold text-[#1A3B9F] transition-transform shrink-0"
                    >
                      {isOpen ? "−" : "+"}
                    </button>
                  </div>

                  {isOpen && (
                    <div className="pl-9 pr-4 pt-2 pb-3 text-xs sm:text-sm text-[#4B5563] font-light leading-relaxed border-t border-gray-100 mt-2">
                      {CUSTOM_LINKS[absoluteIdx] || `Complete today's action item: ${dayTitle}. Check off your progress once finished!`}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}