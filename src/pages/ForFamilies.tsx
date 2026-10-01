import React, { useState } from "react";
import { Link } from "react-router";

const SECTIONS = [
  {
    title: "Managing Household Finances",
    items: [
      { subtitle: "Monthly Budget Planning", text: "Track your income and expenses to control spending and save consistently." },
      { subtitle: "Emergency Savings Fund", text: "Build a safety net for unexpected costs like medical emergencies or repairs." },
      { subtitle: "Family Expense Tracking", text: "Keep an eye on where your money goes to identify saving opportunities." },
      { subtitle: "Separate Needs from Wants", text: "Prioritize essential expenses and reduce unnecessary spending." },
      { subtitle: "Review Finances Regularly", text: "Set a monthly routine to check your family's financial health and adjust plans as needed." }
    ]
  },
  {
    title: "Goal-Based Family Investments",
    items: [
      { subtitle: "Set Financial Goals Together", text: "Discuss and define family goals like buying a home, funding education, or travel." },
      { subtitle: "Short-Term vs. Long-Term Planning", text: "Balance investments for immediate needs and future dreams." },
      { subtitle: "Diversify Across Asset Classes", text: "Spread your money across different investments to lower risk." },
      { subtitle: "Start Small but Stay Consistent", text: "Begin with manageable amounts and grow your investments steadily." },
      { subtitle: "Track Progress and Adjust", text: "Review investments regularly to ensure you're on the right track." }
    ]
  },
  {
    title: "Protecting Your Family with Insurance",
    items: [
      { subtitle: "Health Insurance for Medical Emergencies", text: "Cover medical costs so your family stays protected during health crises." },
      { subtitle: "Life Insurance for Family Security", text: "Ensure your dependents are financially secure if something happens to you." },
      { subtitle: "Insurance for Valuable Assets", text: "Protect your home, vehicles, and belongings from damage or loss." },
      { subtitle: "Understand Policy Details", text: "Know what your insurance covers and any exclusions to avoid surprises." },
      { subtitle: "Keep Policies Active", text: "Pay premiums on time to ensure your family's protection never lapses." }
    ]
  },
  {
    title: "Preparing for Life's Big Financial Milestones",
    items: [
      { subtitle: "Planning for Major Family Expenses", text: "Anticipate large expenses such as property purchase, higher education, or healthcare needs, so you are financially equipped when the time comes." },
      { subtitle: "Building Dedicated Savings for Life Events", text: "Set aside funds systematically for key milestones like weddings, home renovations, or significant celebrations, reducing the need for last-minute borrowing." },
      { subtitle: "Creating Financial Flexibility for Opportunities", text: "Be prepared to take advantage of life's opportunities, whether it's a career change, relocation, or investing in your personal or family growth." },
      { subtitle: "Ensuring Access to Emergency Reserves", text: "Maintain an accessible contingency fund to handle unexpected financial demands without disrupting your progress toward bigger goals." },
      { subtitle: "Aligning Financial Plans with Personal Aspirations", text: "Structure your savings and investments to reflect your family's aspirations, ensuring major life milestones are achieved comfortably and on schedule." }
    ]
  },
  {
    title: "Building Long-Term Security & Generational Wealth",
    items: [
      { subtitle: "Estate and Will Planning", text: "Ensure your assets are distributed as per your wishes with proper legal documents." },
      { subtitle: "Invest in Assets That Appreciate", text: "Build wealth with real estate, stocks, or businesses that grow over time." },
      { subtitle: "Teach Financial Skills to Children", text: "Equip the next generation with the knowledge to manage money wisely." },
      { subtitle: "Plan for Retirement Early", text: "Secure your future so you remain independent in your later years." },
      { subtitle: "Create a Family Financial Vision", text: "Align everyone towards shared financial goals and a stable future." }
    ]
  }
];

export default function ForFamilies() {
  const [activeTab, setActiveTab] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<string>("sec-0-item-0");

  const currentSection = SECTIONS[activeTab];

  return (
    <div className="font-[var(--fs)] bg-white text-[#111827] antialiased min-h-screen">
      {/* ── HERO SECTION ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#091540] via-[#0D1E52] to-[#1A3B9F] py-20 text-center text-white px-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[580px] bg-[radial-gradient(circle,rgba(141,198,63,0.18)_0%,transparent_65%)] filter blur-3xl pointer-events-none" />
        <div className="max-w-2xl mx-auto relative z-10">
          <span className="text-[11px] font-extrabold uppercase tracking-[.18em] text-[#8DC63F] block mb-3">
            For Families
          </span>
          <h1 className="font-[var(--fd)] text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Financial confidence, <span className="text-[#8DC63F] italic">built together.</span>
          </h1>
          <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed">
            Running a household is real financial expertise. Here's a structured way to turn it into a plan that protects and grows what matters to your family.
          </p>
        </div>
      </section>

      {/* ── PAIN POINT QUOTES ── */}
      <section className="py-16 bg-[#F8FAFE] px-6">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            "\"Our household expenses keep growing, and saving feels impossible.\"",
            "\"We want to plan for our children's future but don't know where to start.\"",
            "\"Managing day-to-day expenses while preparing for big life milestones feels overwhelming.\"",
          ].map((quote, i) => (
            <div key={i} className="bg-white border border-[rgba(26,59,159,0.12)] rounded-2xl p-6 shadow-sm">
              <p className="font-[var(--fd)] text-base italic text-[#091540] leading-relaxed">
                {quote}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TABS & ACCORDION SECTION ── */}
      <section className="py-20 bg-white px-6">
        <div className="max-w-[900px] mx-auto">
          {/* Tab Row */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {SECTIONS.map((sec, si) => (
              <button
                key={si}
                onClick={() => {
                  setActiveTab(si);
                  setOpenAccordion(`sec-${si}-item-0`);
                }}
                className={`text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full transition-all cursor-pointer ${
                  activeTab === si
                    ? "bg-[#1A3B9F] text-white shadow-sm"
                    : "bg-[#EEF2FB] text-[#4B5563] hover:bg-gray-100"
                }`}
              >
                {sec.title}
              </button>
            ))}
          </div>

          {/* Accordion Box */}
          <div className="bg-[#F8FAFE] border border-[rgba(26,59,159,0.12)] rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="divide-y divide-gray-200">
              {currentSection.items.map((item, ii) => {
                const itemId = `sec-${activeTab}-item-${ii}`;
                const isOpen = openAccordion === itemId;
                return (
                  <div key={ii} className="py-4 first:pt-0 last:pb-0">
                    <button
                      type="button"
                      onClick={() => setOpenAccordion(isOpen ? "" : itemId)}
                      className="w-full text-left flex items-center justify-between gap-4 py-2 font-bold text-sm sm:text-base text-[#091540] cursor-pointer group"
                    >
                      <span className="group-hover:text-[#1A3B9F] transition-colors">{item.subtitle}</span>
                      <span className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-xs font-bold text-[#1A3B9F] shrink-0">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="pt-3 pb-2 text-xs sm:text-sm text-[#4B5563] font-light leading-relaxed">
                        <p className="mb-3">{item.text}</p>
                        <Link to="/contact" className="text-xs font-bold text-[#1A3B9F] hover:underline">
                          Need help? Contact us →
                        </Link>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── QUOTE + CTA BAND ── */}
      <section className="py-20 bg-gradient-to-br from-[#091540] via-[#0D1E52] to-[#1A3B9F] text-center text-white px-6">
        <div className="max-w-xl mx-auto">
          <p className="font-[var(--fd)] text-xl sm:text-2xl italic leading-relaxed mb-8 text-white/90">
            "The best time to build your future was yesterday. The next best time is now."
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