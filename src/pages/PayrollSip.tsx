import React, { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router";

export default function PayrollSip() {
  const { openGetStarted } = useOutletContext<{ openGetStarted: () => void }>();
  // Mini Calculator State
  const [sip, setSip] = useState(5000);
  const [yrs, setYrs] = useState(10);
  const [rate, setRate] = useState(12);

  // FAQ open state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Financial Confidence Tab state
  const [activeTab, setActiveTab] = useState(0);
  const [openFcItem, setOpenFcItem] = useState<string | null>("fc-0-0");

  // Calculations
  const invested = sip * yrs * 12;
  const monthlyRate = rate / 100 / 12;
  const totalMonths = yrs * 12;
  const total = Math.round(sip * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate));
  const gain = total - invested;
  const pct = Math.round((gain / invested) * 100);
  const mult = (total / invested).toFixed(1);
  const barPct = Math.min(95, Math.max(5, Math.round((gain / total) * 100)));

  const fmtINR = (n: number) => {
    if (n >= 10000000) return "₹" + (n / 10000000).toFixed(2) + "Cr";
    if (n >= 100000) return "₹" + (n / 100000).toFixed(2) + "L";
    if (n >= 1000) return "₹" + (n / 1000).toFixed(1) + "K";
    return "₹" + Math.round(n).toLocaleString("en-IN");
  };

  const FAQS = [
    { q: "What is a Payroll-Linked SIP?", a: "A Payroll-Linked SIP allows employees to voluntarily direct a portion of their monthly salary into a Systematic Investment Plan (SIP) in mutual funds. It works just like PF deductions — seamlessly through payroll — making investing automatic and habit-driven. No bank mandate. No remembering. No skipping." },
    { q: "Is this mandatory for employees?", a: "No. Participation is entirely <strong>voluntary</strong>. Employees choose whether to enroll, how much to invest, and which funds to invest in. The employer's role is simply to facilitate the payroll integration — making it easy for willing employees to participate." },
    { q: 'How does "Save Before You Spend" actually work?', a: "Think of it like PF — except instead of retirement, it builds long-term wealth. A chosen amount is deducted from salary <strong>before it hits the employee's bank account</strong>. They never see it as money to spend, so they never feel the pinch. What remains in their account is guilt-free. Over time, the invested amount compounds quietly in the background — building a corpus the employee didn't have to think about." },
    { q: "Is this complicated for our HR team to implement?", a: "Not at all — and that's exactly why we're here. We work directly with your HR or payroll team to set everything up. There is no complex technology to integrate, no new systems to learn. We handle the coordination, the onboarding paperwork, and the employee communication. Your HR team simply processes one consolidated deduction per payroll cycle — like they already do for PF." },
    { q: "What does MyAnmol do in this process?", a: "MyAnmol acts as your organisation's <strong>financial wellness partner</strong>. We guide you through the onboarding process, conduct employee awareness sessions, help employees understand SIP basics, and provide ongoing support — so your workforce can make informed, confident investment decisions." },
    { q: "What support do you provide to HR professionals?", a: "We're available throughout — not just at setup. We help HR teams with employee communication, answer queries from staff directly, and ensure the monthly deduction process is smooth and error-free. If any employee has a question about their investment, they come to us — not your HR desk. We take that responsibility seriously." },
    { q: "Which types of businesses can partner with MyAnmol?", a: "We work with <strong>SMEs, MSMEs, educational institutions, healthcare organisations, NGOs, and corporates</strong> — any employer looking to offer meaningful financial benefits to their team. If you have a workforce and want to help them build long-term wealth, we'd love to connect." },
    { q: "My employees earn modest salaries. Can they still invest?", a: "Absolutely — and this is exactly who we're built for. A ₹500 SIP started today is worth more than a ₹5,000 SIP started five years from now. Compounding rewards consistency, not size. We've helped housekeeping staff, delivery workers, and factory floor employees start SIPs — and watched them build real savings over time." },
    { q: "What types of mutual fund schemes are available?", a: "We work with a wide range of AMFI-registered mutual fund schemes suited to different goals and risk appetites — from conservative debt funds for employees who want stability, to equity funds for those comfortable with a longer investment horizon and higher growth potential. During onboarding, we help each employee understand their options so they can choose what fits their life, not just their salary." },
    { q: "What are the benefits for my business?", a: "Offering payroll-linked SIPs signals that you <strong>genuinely invest in your employees' futures</strong> — not just their present paycheques. Research consistently shows that financially secure employees are more productive, loyal, and engaged. It's a benefit that costs your business nothing but can mean everything to your team." },
    { q: "Can an employee stop or change their SIP at any time?", a: "Yes, absolutely. Employees have full control — they can pause, reduce, increase, or stop their SIP at any point. The employer simply facilitates the deduction; employees manage their own investment directly. There is no lock-in and no penalty for making changes." },
    { q: "What happens to the SIP if an employee leaves the company?", a: "The SIP belongs entirely to the employee, not the employer. When someone leaves, their mutual fund investments continue unaffected under their own name and KYC. They simply switch to a direct bank mandate if they wish to keep investing. Their money is always theirs." },
    { q: "How do employees track their investments?", a: "Each employee has their own KYC-linked mutual fund account, accessible through the AMC's platform or app at any time. They can view their current value, transaction history, and returns whenever they choose. We also encourage employees to reach out to us directly if they have questions about their portfolio — we're always available to help." },
    { q: "How long does it take to get started?", a: "Onboarding is typically straightforward. Once we understand your organisation's structure and employee count, we work with your HR or payroll team to set up the process. Most employers are up and running within a few weeks. We handle the complexity so your team doesn't have to." },
    { q: "Are the SIP calculator results guaranteed?", a: "No. The calculator is <strong>illustrative only</strong>. Mutual fund investments are subject to market risks and returns are not guaranteed. Past performance does not indicate future results. Always read the scheme-related documents before investing." },
    { q: "How do I get started with MyAnmol?", a: "Simply reach out via the contact section below. Our team will schedule a free consultation to understand your organisation's needs, walk you through the process, and set up a tailored onboarding plan — at no obligation." }
  ];

  const FC_SECTIONS = [
    { title: "Plan Your Income Wisely", items: [
      { subtitle: "Monthly Budget", text: "Creating a clear record of your monthly income and expenses helps maintain control over your finances." },
      { subtitle: "Track Your Spending", text: "Monitoring where your money goes provides insight into spending patterns and areas for adjustment." },
      { subtitle: "Save Before You Spend", text: "Allocating a portion of income towards savings at the beginning of each month ensures financial discipline." },
      { subtitle: "Allocate for Essentials and Discretionary Expenses", text: "Dividing income between necessary expenses and lifestyle choices promotes balanced financial management." },
      { subtitle: "Prepare for Unexpected Costs", text: "Maintaining reserves for unforeseen expenses reduces the financial impact of emergencies." }
    ]},
    { title: "Invest With Goals In Mind", items: [
      { subtitle: "Define Clear Financial Objectives", text: "Understanding what you are investing for—such as retirement, education, or property—provides direction for financial decisions." },
      { subtitle: "Distinguish Between Short-Term and Long-Term Goals", text: "Recognizing which objectives require immediate funds versus those that can grow over time ensures appropriate investment strategies." },
      { subtitle: "Diversify Across Different Assets", text: "Spreading investments across asset classes helps mitigate risk and provides more stable returns." },
      { subtitle: "Periodically Assess Progress", text: "Regular evaluation of investment performance ensures alignment with personal financial goals." },
      { subtitle: "Seek Information for Informed Decisions", text: "Staying updated on financial instruments and market conditions contributes to better investment management." }
    ]},
    { title: "Insure the Right Way", items: [
      { subtitle: "Health Coverage for Medical Contingencies", text: "Health insurance provides financial protection against high medical expenses that may arise unexpectedly." },
      { subtitle: "Life Coverage to Secure Dependents", text: "Life insurance serves as a financial safeguard for dependents in the event of the policyholder's death." },
      { subtitle: "Protection for Valuable Assets", text: "Insuring significant assets like property or vehicles helps preserve their value against damage, theft, or accidents." },
      { subtitle: "Understand Policy Terms and Limitations", text: "Being aware of what is included and excluded in an insurance policy prevents unexpected financial shortfalls during claims." },
      { subtitle: "Maintain Policy Validity Through Timely Payments", text: "Consistent premium payments ensure that insurance coverage remains active when needed." }
    ]},
    { title: "Beat Inflation Smartly", items: [
      { subtitle: "Recognize the Impact of Inflation", text: "Inflation gradually erodes purchasing power, making it essential to account for rising costs over time." },
      { subtitle: "Aim for Investment Returns That Outpace Inflation", text: "Selecting financial instruments with the potential to generate returns above the inflation rate helps preserve wealth." },
      { subtitle: "Understand the Limitations of Low-Yield Savings", text: "Savings held in low-interest accounts may not keep pace with inflation, diminishing real value over time." },
      { subtitle: "Continuously Monitor Investment Performance", text: "Regular reviews ensure that investments are adapting to economic conditions and inflationary trends." },
      { subtitle: "Maintain a Long-Term Perspective", text: "Considering the long-term effect of inflation is critical when planning for future financial needs." }
    ]},
    { title: "Manage Debt With Discipline", items: [
      { subtitle: "Borrow with Clear Purpose", text: "Debt should be taken on only for necessary expenditures where repayment capacity is clearly defined." },
      { subtitle: "Adhere to Repayment Schedules", text: "Timely repayment of debt obligations prevents additional interest costs and protects credit standing." },
      { subtitle: "Prioritize High-Interest Debt Reduction", text: "Focusing on eliminating debts with higher interest rates can significantly reduce overall borrowing costs." },
      { subtitle: "Avoid Non-Essential Borrowing", text: "Minimizing borrowing for discretionary spending helps maintain financial stability." },
      { subtitle: "Maintain Manageable Debt Levels", text: "Keeping debt within sustainable limits supports financial security and reduces long-term repayment burdens." }
    ]},
    { title: "Build Financial Freedom", items: [
      { subtitle: "Establish an Emergency Fund", text: "A dedicated reserve for unforeseen circumstances provides a financial safety net." },
      { subtitle: "Develop Income-Generating Investments", text: "Investments that generate passive income contribute to financial independence over time." },
      { subtitle: "Reduce Financial Uncertainty", text: "Achieving a stable financial position minimizes day-to-day money concerns." },
      { subtitle: "Plan for Significant Life Milestones", text: "Strategic financial planning enables the pursuit of major goals such as property purchase, travel, or business ventures." },
      { subtitle: "Stay Informed About Financial Matters", text: "Continuous learning about financial concepts enhances the ability to make sound, well-informed decisions." }
    ]}
  ];

  return (
    <div className="font-[var(--fs)] bg-[#091540] text-white antialiased min-h-screen">
      {/* ── HERO SECTION ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#091540] via-[#0D1E52] to-[#1A3B9F] py-20 sm:py-28 px-6">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(141,198,63,0.15)_0%,transparent_70%)] filter blur-3xl pointer-events-none" />

        <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_440px] gap-12 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8DC63F]/15 border border-[#8DC63F]/35 text-xs font-bold uppercase tracking-widest text-[#8DC63F] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F] animate-pulse" />
              We've believed in this long before it became a policy
            </div>

            <h1 className="font-[var(--fd)] text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-tight text-white">
              What PF Did <br />
              For Retirement, <br />
              SIP Can Do For <br />
              <span className="text-[#8DC63F] italic">Wealth.</span>
            </h1>

            <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed mb-8 max-w-xl">
              We've spent over three decades helping India's working families build real wealth — one payslip at a time. Payroll-linked SIPs are the future, and we're already here to make it happen for your team.
            </p>

            <div className="inline-flex items-center gap-3 bg-white/10 border border-white/15 px-5 py-2.5 rounded-full text-sm mb-8 backdrop-blur-md">
              <span className="text-white/70">Helping employees move from</span>
              <span className="font-bold text-white">Earning</span>
              <span className="text-[#8DC63F]">→</span>
              <strong className="text-[#8DC63F]">Wealth Creation</strong>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={openGetStarted}
                className="bg-[#8DC63F] hover:bg-[#9ED64A] text-[#091540] font-extrabold text-sm px-8 py-3.5 rounded-full shadow-lg transition-all"
              >
                Partner With Us →
              </button>
            </div>
          </div>

          {/* SIP Calculator Hero Card */}
          <div className="bg-[#0D1E52] border border-white/15 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md">
            <div className="p-6 border-b border-white/10">
              <div className="text-xs font-extrabold uppercase tracking-widest text-white/60 mb-1">Quick SIP Estimate</div>
              <div className="flex items-baseline gap-2">
                <span className="font-[var(--fd)] text-3xl font-bold text-white">{fmtINR(total)}</span>
                <span className="bg-[#8DC63F]/20 border border-[#8DC63F]/35 text-[#8DC63F] text-xs font-bold px-2.5 py-0.5 rounded-full">{mult}×</span>
              </div>
              <div className="text-xs text-white/60 mt-1">Estimated corpus after {yrs} yrs</div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold uppercase text-white/75 mb-1.5">
                  <span>Monthly SIP</span>
                  <span className="text-[#8DC63F]">{fmtINR(sip)}</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="50000"
                  step="500"
                  value={sip}
                  onChange={(e) => setSip(Number(e.target.value))}
                  className="w-full accent-[#8DC63F] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold uppercase text-white/75 mb-1.5">
                  <span>Duration</span>
                  <span className="text-[#8DC63F]">{yrs} yrs</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={yrs}
                  onChange={(e) => setYrs(Number(e.target.value))}
                  className="w-full accent-[#8DC63F] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold uppercase text-white/75 mb-1.5">
                  <span>Expected Return</span>
                  <span className="text-[#8DC63F]">{rate}%</span>
                </div>
                <input
                  type="range"
                  min="6"
                  max="18"
                  step="0.5"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full accent-[#8DC63F] cursor-pointer"
                />
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mx-6 mb-4 bg-white/10 rounded-full overflow-hidden h-2">
              <div className="h-full bg-gradient-to-r from-[#1A3B9F] to-[#8DC63F] rounded-full transition-all" style={{ width: `${barPct}%` }} />
            </div>

            <div className="grid grid-cols-3 border-t border-white/10 text-center text-xs">
              <div className="p-3.5 border-r border-white/10">
                <div className="text-white/50 uppercase">Invested</div>
                <div className="font-bold text-white mt-0.5">{fmtINR(invested)}</div>
              </div>
              <div className="p-3.5 border-r border-white/10">
                <div className="text-white/50 uppercase">Gains</div>
                <div className="font-bold text-[#8DC63F] mt-0.5">{fmtINR(gain)}</div>
              </div>
              <div className="p-3.5">
                <div className="text-white/50 uppercase">Growth</div>
                <div className="font-bold text-[#8DC63F] mt-0.5">+{pct}%</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE STRIP ── */}
      <div className="bg-[#1A3B9F] py-3 overflow-hidden border-t border-b border-white/10">
        <div className="flex whitespace-nowrap animate-[ticker_20s_linear_infinite] w-max">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center shrink-0">
              {[
                "Payroll-Linked SIPs",
                "SEBI Regulated",
                "Financial Wellness",
                "SMEs & MSMEs",
                "Wealth Creation",
                "Mutual Funds",
                "33+ Years Experience",
                "AMFI Registered",
                "3,000+ Clients",
              ].map((m, idx) => (
                <span key={idx} className="text-xs uppercase tracking-wider text-white/80 px-8 flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" />
                  {m}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── WHY CHOOSE PARTNERSHIP ── */}
      <section className="py-20 bg-white text-[#111827] px-6">
        <div className="max-w-[1140px] mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-[.2em] text-[#1A3B9F] block mb-2">
            The Shift
          </span>
          <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-bold text-[#091540] mb-12">
            Employee Expectations Are Changing.
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-4">
              <p className="text-sm sm:text-base text-gray-600 font-light mb-6">
                Today's workforce is looking beyond salary, bonuses, and basic benefits. They increasingly value:
              </p>
              {[
                "🛡️ Financial security",
                "📈 Long-term planning",
                "⭐ Wealth creation opportunities",
                "❤️ Financial wellness support",
                "👥 Employers who genuinely care",
              ].map((v, i) => (
                <div key={i} className="bg-[#EEF2FB] border border-[rgba(26,59,159,0.1)] rounded-2xl p-4 text-sm font-bold text-[#091540]">
                  {v}
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <div className="bg-[#091540] text-white rounded-3xl p-8 shadow-md">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#8DC63F] block mb-2">
                  The Real Challenge
                </span>
                <h3 className="font-[var(--fd)] text-xl font-bold mb-3">
                  Most employees earn. Very few build long-term wealth.
                </h3>
                <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                  Many working professionals delay investing, struggle with financial discipline, and depend only on savings or PF.
                </p>
              </div>

              <div className="bg-[#EFF8E2] border-l-4 border-[#8DC63F] rounded-2xl p-8 text-[#091540]">
                <p className="font-[var(--fd)] text-lg italic leading-relaxed">
                  "A salary supports today. <strong className="font-bold not-italic">A disciplined SIP can help build tomorrow.</strong>"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT WE DO FOR YOU ── */}
      <section className="py-20 bg-[#0D1E52] text-white px-6">
        <div className="max-w-[1140px] mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-[.2em] text-[#8DC63F] block mb-2">
            What We Do For You
          </span>
          <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-bold text-white mb-4">
            We handle it all — you just show up for your people.
          </h2>
          <p className="text-sm sm:text-base text-white/70 font-light max-w-xl mb-12">
            From setup to ongoing management, MyAnmol takes payroll-linked SIPs off your plate entirely.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: "01", title: "Payroll-Linked SIPs", desc: "Employees may voluntarily allocate a part of salary towards SIP investments." },
              { num: "02", title: "Integrated with Payroll", desc: "Investing could become automated and aligned with monthly salary cycles." },
              { num: "03", title: "Encouraging Wealth", desc: "Small monthly investments can help build disciplined long-term investing habits." },
              { num: "04", title: "Expanding Participation", desc: "This may help bring more first-time investors into structured investing." },
            ].map((sol, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between">
                <span className="font-[var(--fd)] text-4xl font-bold text-white/10 absolute top-3 right-4">
                  {sol.num}
                </span>
                <div>
                  <h3 className="font-[var(--fd)] text-lg font-bold text-white mb-2">{sol.title}</h3>
                  <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">{sol.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINANCIAL CONFIDENCE FOR PROFESSIONALS ── */}
      <section className="py-20 bg-white text-[#111827] px-6">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-[.2em] text-[#1A3B9F] block mb-2">
              For Working Professionals
            </span>
            <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-bold text-[#091540] mb-4">
              Financial confidence, <span className="text-[#1A3B9F] italic">built deliberately.</span>
            </h2>
            <p className="text-sm text-gray-500 font-light leading-relaxed">
              Most professionals earn well — but converting income into lasting wealth takes more than a salary. Here's a structured way to think about it.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {FC_SECTIONS.map((sec, si) => (
              <button
                key={si}
                onClick={() => {
                  setActiveTab(si);
                  setOpenFcItem(`fc-${si}-0`);
                }}
                className={`text-xs font-bold px-4 py-2 rounded-full transition-all cursor-pointer ${
                  activeTab === si ? "bg-[#1A3B9F] text-white" : "bg-[#EEF2FB] text-[#4B5563] hover:bg-gray-200"
                }`}
              >
                {sec.title}
              </button>
            ))}
          </div>

          {/* Active Tab Content Accordion */}
          <div className="space-y-3">
            {FC_SECTIONS[activeTab].items.map((item, ii) => {
              const itemId = `fc-${activeTab}-${ii}`;
              const isOpen = openFcItem === itemId;
              return (
                <div key={ii} className="bg-[#F8FAFE] border border-[rgba(26,59,159,0.12)] rounded-2xl overflow-hidden shadow-sm">
                  <button
                    type="button"
                    onClick={() => setOpenFcItem(isOpen ? null : itemId)}
                    className="w-full text-left p-5 flex items-center justify-between font-bold text-sm sm:text-base text-[#091540] cursor-pointer"
                  >
                    <span>{item.subtitle}</span>
                    <span className="text-lg text-[#8DC63F]">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-3 border-t border-gray-100 text-xs sm:text-sm text-[#4B5563] font-light leading-relaxed">
                      {item.text}
                      <div className="mt-3">
                        <Link to="/wp/review" className="font-bold text-[#1A3B9F] hover:underline">
                          Need help? Contact us →
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FAQ ACCORDION ── */}
      <section className="py-20 bg-[#EEF2FB] px-6">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-extrabold uppercase tracking-[.2em] text-[#1A3B9F] block mb-2">
              Frequently Asked Questions
            </span>
            <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-bold text-[#091540]">
              Questions We Often Hear
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="bg-white border border-[rgba(26,59,159,0.12)] rounded-2xl overflow-hidden shadow-sm">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#091540] cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className="text-lg text-[#8DC63F]">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && (
                    <div
                      className="px-5 pb-5 text-xs sm:text-sm text-[#4B5563] font-light leading-relaxed border-t border-gray-100 pt-4"
                      dangerouslySetInnerHTML={{ __html: faq.a }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA ── */}
      <section className="py-24 bg-gradient-to-br from-[#091540] via-[#0D1E52] to-[#1A3B9F] text-center px-6 text-white">
        <div className="max-w-2xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#8DC63F] block mb-3">
            Get In Touch
          </span>
          <h2 className="font-[var(--fd)] text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
            India's salary ecosystem is evolving. <br />
            <span className="text-[#8DC63F] italic">Let's build financially confident teams together.</span>
          </h2>
          <p className="text-base text-white/75 font-light mb-8 max-w-lg mx-auto">
            Schedule a consultation with our institutional wealth team.
          </p>
          <button
            type="button"
            onClick={openGetStarted}
            className="bg-[#8DC63F] hover:bg-[#9ED64A] text-[#091540] font-extrabold text-base px-10 py-4 rounded-full shadow-xl transition-all inline-block"
          >
            Partner With Us →
          </button>
        </div>
      </section>
    </div>
  );
}