import React, { useState } from "react";
import { Link, useOutletContext } from "react-router";

const SECTIONS = [
  {
    title: "Managing Medical and Health Costs",
    items: [
      { subtitle: "Emergency Health Fund", text: "Setting aside funds for sudden healthcare costs ensures emergencies do not disrupt financial stability." },
      { subtitle: "Long-Term Care Planning", text: "Planning financially for caregiving, nursing homes, or specialized care provides peace of mind as daily tasks become difficult." },
      { subtitle: "Covering Medicine and Check-ups", text: "Ongoing medical routines like doctor visits and medications should be included in the regular budget to avoid skipping essential treatments." },
      { subtitle: "Stay Healthy, Save Money", text: "Preventive care, healthy habits, and early interventions help reduce long-term healthcare costs." }
    ]
  },
  {
    title: "Financial Security in Retirement",
    items: [
      { subtitle: "Money That Lasts Your Lifetime", text: "Savings need to stretch comfortably throughout life, accounting for inflation, emergencies, and healthcare expenses." },
      { subtitle: "Getting a Regular Income After Retirement", text: "A stable, predictable source of monthly income is necessary to maintain lifestyle after active employment ends." },
      { subtitle: "Pay Less Tax, Keep More Money", text: "Tax-efficient strategies help legally reduce tax liabilities and preserve personal wealth." },
      { subtitle: "Prepare for Big Future Costs", text: "Unexpected expenses like home repairs, health emergencies, or family needs can be managed through structured financial preparation." },
      { subtitle: "Protect Your Savings from Risks", text: "Fraud, poor investments, and legal mistakes can drain savings, making safeguards and financial checks essential." }
    ]
  },
  {
    title: "Estate and Legacy Planning",
    items: [
      { subtitle: "Creating a Will", text: "A valid Will ensures possessions and wealth are distributed as intended, preventing future disputes." },
      { subtitle: "Choosing Trusted Helpers", text: "Appointing reliable individuals to manage finances or healthcare decisions provides added protection if needed." },
      { subtitle: "Protecting Elders from Fraud", text: "Older adults face increased risk of scams; proactive steps help minimize financial exploitation." },
      { subtitle: "Organizing Important Papers", text: "Storing property papers, bank details, and health records in an accessible, secure manner avoids future confusion." },
      { subtitle: "Passing on Life Lessons", text: "Sharing family traditions, stories, and values strengthens the next generation beyond financial inheritance." }
    ]
  },
  {
    title: "Reducing Financial Dependence",
    items: [
      { subtitle: "Earning Even After Retirement", text: "Options like investments, dividends, rental income, or consulting can generate income after retirement." },
      { subtitle: "Avoiding Tricks and Scams", text: "Recognizing and avoiding fraud is essential to protect assets and maintain financial security." },
      { subtitle: "Helping Family Without Hurting Yourself", text: "Supporting family financially should be balanced to avoid compromising personal financial stability." },
      { subtitle: "Teaching Money Skills to Family", text: "Providing basic financial education to children or grandchildren fosters responsible money management." },
      { subtitle: "Talking Openly About Money", text: "Clear family conversations about financial plans reduce misunderstandings and future conflicts." }
    ]
  }
];

export default function ForRetirees() {
  const { openGetStarted } = useOutletContext<{ openGetStarted: () => void }>();
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
            For Retirees &amp; Parents
          </span>
          <h1 className="font-[var(--fd)] text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Financial confidence, <span className="text-[#8DC63F] italic">at every stage of life.</span>
          </h1>
          <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed">
            You've spent a lifetime building. Here's a structured way to protect it, stretch it, and pass it on well.
          </p>
        </div>
      </section>

      {/* ── PAIN POINT QUOTES ── */}
      <section className="py-16 bg-[#F8FAFE] px-6">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            "\"I've worked hard all my life, but I'm unsure if my savings will last through retirement.\"",
            "\"I want to secure my children's future, but I don't know if I'm making the right financial decisions.\"",
            "\"I know I need to plan for healthcare, education, and legacy, but I don't know where to start.\"",
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
                          Contact us →
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
          <button
            type="button"
            onClick={openGetStarted}
            className="inline-flex items-center gap-2 bg-[#8DC63F] hover:bg-[#9ED64A] text-[#091540] font-extrabold text-sm px-8 py-3.5 rounded-full shadow-lg transition-all"
          >
            Talk to an Advisor →
          </button>
        </div>
      </section>
    </div>
  );
}