import { useState } from "react";
import { Link } from "react-router";
import AdvisorBookingModal from "../components/AdvisorBookingModal";

type AssetClass = "equity" | "debt" | "hybrid" | "solution";

const ASSET_TABS: { id: AssetClass; label: string }[] = [
  { id: "equity", label: "Equity Funds" },
  { id: "debt", label: "Debt Funds" },
  { id: "hybrid", label: "Hybrid Funds" },
  { id: "solution", label: "Solution Oriented" },
];

const ADVANTAGES = [
  { title: "Professionally Managed", desc: "Your money is managed by professional fund managers with years of research and investing experience." },
  { title: "Superior Liquidity", desc: "Mutual Funds offer superior liquidity compared to traditional instruments as you can buy and redeem anytime." },
  { title: "Inflation-Beating Returns", desc: "Historically, mutual fund returns have outperformed traditional options like Bank FDs, RDs, and PPF over long horizons." },
  { title: "Affordability (SIP from ₹500)", desc: "Start your investments with as low as ₹500/month. You do not need large sums of capital to begin wealth creation." },
  { title: "Instant Diversification", desc: "As mutual funds invest in a basket of securities, you own a diversified portfolio instantly, lowering single-stock risk." },
  { title: "Strictly Regulated by SEBI", desc: "All mutual fund schemes are tightly regulated by SEBI, ensuring complete transparency and investor protection." },
];

const INVESTMENT_MODES: { title: string; desc: string; to?: string }[] = [
  { title: "Systematic Investment Plan (SIP)", desc: "Invest fixed amounts monthly (e.g. ₹1,000+) using rupee cost averaging to buy more units when markets dip.", to: "/mutual-funds/sip" },
  { title: "Lump Sum", desc: "Commit a larger capital amount at once, offering superior growth opportunities during periods of upward market momentum." },
  { title: "Systematic Transfer Plan (STP)", desc: "Systematically move money from a debt fund to an equity fund at set intervals for disciplined equity deployment." },
  { title: "Systematic Withdrawal Plan (SWP)", desc: "Withdraw a fixed amount or percentage periodically from your corpus while allowing the rest to continue growing." },
];

const GOALS_DATA = [
  { title: "Own Property", desc: "Save up for a down payment on home loan. Choose a fund based on your investment horizon.", tag: "LONG TERM PLAN" },
  { title: "Child Education", desc: "Save up for high education costs. Choose solution-oriented funds for dedicated investments through SIPs or lumpsum.", tag: "LONG TERM PLAN" },
  { title: "Emergency Fund", desc: "Create an emergency fund for unforeseen contingencies. Choose liquid or short-term debt funds for instant liquidity and capital protection.", tag: "LIQUIDITY PLAN" },
  { title: "Early Retirement", desc: "Plan for early retirement with Mutual Funds. Grow your corpus with compounding returns and appropriate risk allocation.", tag: "RETIREMENT PLAN" },
  { title: "Dream Vacation", desc: "Create a travel corpus for your dream vacation. Save affordably through SIPs with attractive returns.", tag: "SHORT TERM PLAN" },
  { title: "Major Purchase", desc: "Plan and save ahead for a major purchase with Mutual Funds. Diversify your investments for better returns at reduced risks.", tag: "GROWTH PLAN" },
];

const BEFORE_INVEST_GUIDE = [
  {
    title: "1. Investment Objective & Risk Tolerance",
    desc: "Define your financial goals clearly before choosing funds. Map your timeline for short-term, mid-term, or long-term horizons, and assess your risk appetite to balance high-growth equity with capital-protecting debt.",
  },
  {
    title: "2. Fund Research & Selection",
    desc: "Review past performance across multiple market cycles, analyze portfolio composition, check fund manager track records, and evaluate expense ratios to select schemes that align with your financial blueprint.",
  },
  {
    title: "3. Costs, Fees & Exit Loads",
    desc: "Understand the Total Expense Ratio (TER) which impacts your NAV returns, check for applicable exit loads upon early redemption, and choose regular growth schemes for professional advisory and execution support.",
  },
];

const FAQS = [
  { q: "What is the difference between a Regular Plan and a Direct Plan?", a: "Regular plans are routed through registered distributors like MyAnmol (ARN: 114893), offering you professional advisory, portfolio reviews, and dedicated support. Direct plans are bought straight from the fund house without advisory services." },
  { q: "What is the minimum amount required to start an SIP?", a: "You can start a Systematic Investment Plan (SIP) with as little as ₹500/month, making wealth creation accessible at any budget." },
  { q: "Are mutual fund investments safe?", a: "Mutual funds are subject to market risks, but professional fund management and diversification significantly lower individual stock-picking risks. All funds on our platform are regulated by SEBI." },
];

export default function MutualFundsHub() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeAssetTab, setActiveAssetTab] = useState<AssetClass>("equity");
  const [activeGoalTab, setActiveGoalTab] = useState(0);
  const [openBeforeInvestAccordion, setOpenBeforeInvestAccordion] = useState<number | null>(0);

  return (
    <div className="font-[var(--fs)] bg-white text-[#111827] antialiased min-h-screen py-12 px-5 sm:px-8">
      <div className="max-w-[1200px] mx-auto space-y-20">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-gradient-to-br from-[#EEF2FB] to-white rounded-[32px] p-8 sm:p-12 border border-[#1A3B9F]/15 shadow-sm">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.14em] text-[#8DC63F] bg-[#091540] px-4 py-2 rounded-full">
              AMFI Registered Distributor (ARN: 114893)
            </span>
            <h1 className="font-[var(--fd)] text-3xl sm:text-5xl font-extrabold text-[#091540] tracking-tight leading-tight">
              Invest in Mutual Funds Online with Expert Advisory
            </h1>
            <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed font-light">
              Mutual funds help you grow your wealth and achieve your financial goals by offering the potential to generate inflation-beating returns over the long term through disciplined <b>Regular Growth Schemes</b>.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="h-12 px-8 rounded-xl bg-[#1A3B9F] text-white font-extrabold text-xs hover:bg-[#132d7c] transition-all flex items-center gap-2 shadow-md cursor-pointer border-0"
              >
                Explore Mutual Funds →
              </button>
            </div>
          </div>

          <div className="bg-[#091540] rounded-[24px] p-6 text-white shadow-xl space-y-6">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <span className="text-xs text-white/60">Portfolio Overview</span>
              <span className="text-xs font-bold text-[#8DC63F] bg-[#8DC63F]/20 px-3 py-1 rounded-full">Active Growth</span>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-white/70">Total Portfolio Value</div>
              <div className="text-3xl font-extrabold">₹ 92,88 L</div>
              <div className="text-xs text-[#8DC63F] font-bold">↑ 14.07% Overall Returns (CAGR)</div>
            </div>
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10 text-center">
              <div className="bg-white/5 p-3 rounded-xl">
                <div className="text-[10px] text-white/60">Goals</div>
                <div className="text-sm font-bold mt-1">₹ 20,04,217</div>
              </div>
              <div className="bg-white/5 p-3 rounded-xl">
                <div className="text-[10px] text-white/60">Ultimate SIP</div>
                <div className="text-sm font-bold mt-1">₹ 1,34,228</div>
              </div>
              <div className="bg-white/5 p-3 rounded-xl">
                <div className="text-[10px] text-white/60">Monthly SIP</div>
                <div className="text-sm font-bold mt-1">₹ 50,000</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#EEF2FB] border border-[#1A3B9F]/20 rounded-[24px] p-6 sm:p-8 flex items-center justify-between flex-wrap gap-6">
          <div className="space-y-2 max-w-[700px]">
            <h2 className="font-[var(--fd)] text-lg font-bold text-[#091540]">Why Choose Regular Growth Plans with MyAnmol?</h2>
            <p className="text-xs sm:text-sm text-[#374151] leading-relaxed">
              Unlike execution-only platforms, regular plans enable us to provide you with continuous professional guidance, annual rebalancing, tax advisory, and priority support from AMFI-certified advisors.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="h-12 px-6 rounded-xl bg-[#1A3B9F] text-white font-extrabold text-xs hover:bg-[#132d7c] transition-all flex items-center gap-2 shadow-md cursor-pointer border-0"
          >
            Speak with an Advisor →
          </button>
        </div>

        <div className="space-y-8">
          <div className="text-center max-w-[700px] mx-auto space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-[.14em] text-[#6AA32A]">Core Fundamentals</span>
            <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#091540]">
              What Are Mutual Funds &amp; Why Invest?
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7280]">
              It is an investment vehicle where multiple investors pool funds. Professional fund managers invest across equity, debt, and gold to generate returns.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ADVANTAGES.map((item) => (
              <div key={item.title} className="bg-[#F8FAFE] border border-[#E3E8F4] rounded-[20px] p-6 space-y-3 shadow-xs">
                <div className="w-8 h-8 rounded-full bg-[#1A3B9F]/10 text-[#1A3B9F] flex items-center justify-center font-bold text-sm">✓</div>
                <h3 className="font-[var(--fd)] text-base font-bold text-[#091540]">{item.title}</h3>
                <p className="text-xs text-[#6B7280] leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="text-center max-w-[700px] mx-auto space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-[.14em] text-[#1A3B9F]">Investment Modes</span>
            <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#091540]">
              Methods of Mutual Fund Investments
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {INVESTMENT_MODES.map((mode, index) => {
              const className = `bg-white border border-[#E3E8F4] rounded-[20px] p-6 space-y-3 shadow-xs text-left block ${
                mode.to ? "hover:border-[#1A3B9F] hover:shadow-md transition-all" : ""
              }`;
              const body = (
                <>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#1A3B9F] bg-[#EEF2FB] px-2.5 py-1 rounded-full">
                    Mode 0{index + 1}
                  </span>
                  <h3 className="font-[var(--fd)] text-base font-bold text-[#091540]">{mode.title}</h3>
                  <p className="text-xs text-[#6B7280] leading-relaxed font-light">{mode.desc}</p>
                  {mode.to && (
                    <span className="inline-flex text-xs font-extrabold text-[#1A3B9F]">View SIP details →</span>
                  )}
                </>
              );
              return mode.to ? (
                <Link key={mode.title} to={mode.to} className={className}>
                  {body}
                </Link>
              ) : (
                <div key={mode.title} className={className}>
                  {body}
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          <div className="text-center max-w-[700px] mx-auto space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-[.14em] text-[#6AA32A]">Categories</span>
            <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#091540]">
              Types of Mutual Funds Based on Asset Class
            </h2>
          </div>
          <div className="flex justify-center border-b border-[#E3E8F4] overflow-x-auto gap-2">
            {ASSET_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveAssetTab(tab.id)}
                className={`py-3.5 px-6 text-sm font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer bg-transparent ${
                  activeAssetTab === tab.id
                    ? "border-[#1A3B9F] text-[#1A3B9F] bg-[#EEF2FB]/60 rounded-t-[8px]"
                    : "border-transparent text-[#6B7280] hover:text-[#111827]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="bg-[#F8FAFE] border border-[#E3E8F4] rounded-[24px] p-6 sm:p-8 text-xs sm:text-sm text-[#374151]">
            {activeAssetTab === "equity" && (
              <div className="space-y-4">
                <div className="font-bold text-sm text-[#091540]">Equity Funds — Invest primarily in company stocks for long-term growth.</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-[#E3E8F4]"><b>Large-Cap Funds:</b> Invests at least 80% in top 100 companies for stability.</div>
                  <div className="bg-white p-4 rounded-xl border border-[#E3E8F4]"><b>Mid-Cap Funds:</b> Invests at least 65% in 101st to 250th ranked companies.</div>
                  <div className="bg-white p-4 rounded-xl border border-[#E3E8F4]"><b>Small-Cap Funds:</b> High-growth potential funds for 251st and above companies.</div>
                  <div className="bg-white p-4 rounded-xl border border-[#E3E8F4]"><b>ELSS Tax Saver:</b> Save up to ₹1.5 Lakhs under 80C with 3-year lock-in.</div>
                </div>
              </div>
            )}
            {activeAssetTab === "debt" && (
              <div className="space-y-4">
                <div className="font-bold text-sm text-[#091540]">Debt Funds — Generate stable returns by lending to corporates and government securities.</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-[#E3E8F4]"><b>Liquid Funds:</b> Invests for up to 91 days with high safety and liquidity.</div>
                  <div className="bg-white p-4 rounded-xl border border-[#E3E8F4]"><b>Corporate Bond Funds:</b> Invests at least 80% in highest-rated corporate bonds.</div>
                  <div className="bg-white p-4 rounded-xl border border-[#E3E8F4]"><b>Money Market Funds:</b> Short-term lending instruments for up to 1 year.</div>
                </div>
              </div>
            )}
            {activeAssetTab === "hybrid" && (
              <div className="space-y-4">
                <div className="font-bold text-sm text-[#091540]">Hybrid Funds — Mix of equity, debt, and gold for balanced asset allocation.</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-[#E3E8F4]"><b>Aggressive Hybrid:</b> 65% to 80% in equities, remainder in debt.</div>
                  <div className="bg-white p-4 rounded-xl border border-[#E3E8F4]"><b>Balanced Advantage:</b> Dynamic equity/debt shifting based on valuation models.</div>
                  <div className="bg-white p-4 rounded-xl border border-[#E3E8F4]"><b>Multi-Asset Allocation:</b> Invests across equity, debt, and gold simultaneously.</div>
                </div>
              </div>
            )}
            {activeAssetTab === "solution" && (
              <div className="space-y-4">
                <div className="font-bold text-sm text-[#091540]">Solution-Oriented Funds — Target specific milestones like children&apos;s education or retirement.</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-[#E3E8F4]"><b>Children&apos;s Fund:</b> Lock-in period until the child attains majority age.</div>
                  <div className="bg-white p-4 rounded-xl border border-[#E3E8F4]"><b>Retirement Fund:</b> Lock-in period until retirement age (5 years or age 60).</div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-[#F8FAFE] border border-[#E3E8F4] rounded-[24px] p-8 space-y-6">
          <div className="text-center max-w-[700px] mx-auto space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-[.14em] text-[#1A3B9F]">Investor Checklist</span>
            <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#091540]">
              What To Know Before You Invest In Mutual Funds?
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7280]">
              Essential checkpoints to evaluate your objectives, research funds, and understand costs.
            </p>
          </div>
          <div className="space-y-3 max-w-[900px] mx-auto">
            {BEFORE_INVEST_GUIDE.map((guide, index) => {
              const isOpen = openBeforeInvestAccordion === index;
              return (
                <div key={guide.title} className="bg-white border border-[#E3E8F4] rounded-[16px] overflow-hidden transition-all">
                  <button
                    type="button"
                    onClick={() => setOpenBeforeInvestAccordion(isOpen ? null : index)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-sm text-[#091540] cursor-pointer bg-transparent border-0"
                    aria-expanded={isOpen}
                  >
                    <span>{guide.title}</span>
                    <span className="text-lg text-[#1A3B9F] font-extrabold">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-[#374151] font-light leading-relaxed border-t border-[#E3E8F4] pt-3">
                      {guide.desc}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-[#091540] rounded-[28px] p-8 sm:p-12 text-white space-y-8 shadow-xl">
          <div className="max-w-[700px] space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-[.14em] text-[#8DC63F]">Milestone Planning</span>
            <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold">Invest Now For Your Goals</h2>
            <p className="text-xs sm:text-sm text-white/80 font-light">
              Select your life milestone and explore our tailored regular growth recommendations.
            </p>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {GOALS_DATA.map((goal, index) => (
              <button
                key={goal.title}
                type="button"
                onClick={() => setActiveGoalTab(index)}
                className={`py-3 px-6 rounded-xl font-bold text-xs transition-all whitespace-nowrap cursor-pointer border ${
                  activeGoalTab === index
                    ? "bg-[#8DC63F] text-[#091540] border-[#8DC63F] shadow-md"
                    : "bg-white/5 text-white border-white/15 hover:bg-white/10"
                }`}
              >
                {goal.title}
              </button>
            ))}
          </div>
          <div className="bg-white/5 border border-white/10 rounded-[20px] p-6 sm:p-8 space-y-4">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8DC63F] bg-[#8DC63F]/15 px-3 py-1 rounded-full">
              {GOALS_DATA[activeGoalTab].tag}
            </span>
            <h3 className="font-[var(--fd)] text-2xl font-bold">{GOALS_DATA[activeGoalTab].title}</h3>
            <p className="text-sm text-white/80 leading-relaxed font-light">{GOALS_DATA[activeGoalTab].desc}</p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="h-11 px-6 rounded-xl bg-[#8DC63F] text-[#091540] font-extrabold text-xs hover:bg-[#9ED64A] transition-all cursor-pointer border-0 shadow-md"
              >
                Plan This Goal Now →
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#F8FAFE] border border-[#E3E8F4] rounded-[24px] p-8 space-y-5">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#1A3B9F] bg-[#EEF2FB] px-3 py-1 rounded-full">Onboarding Framework</span>
            <h3 className="font-[var(--fd)] text-xl font-bold text-[#091540]">How Your Investment Journey Works</h3>
            <div className="space-y-4 text-xs sm:text-sm text-[#374151]">
              <div><b>Step 1: Free Discovery &amp; Goal Mapping:</b> We analyze your financial goals, risk appetite, and investment horizon.</div>
              <div><b>Step 2: Tailored Portfolio Design:</b> We curate a personalized mix of Regular Growth Schemes aligned with your life milestones.</div>
              <div><b>Step 3: Easy Execution &amp; SIP Setup:</b> Seamless setup of SIPs or lump-sum investments with complete digital convenience.</div>
              <div><b>Step 4: Continuous Review &amp; Rebalancing:</b> Regular annual portfolio check-ups and strategic rebalancing as markets shift.</div>
            </div>
          </div>
          <div className="bg-[#F8FAFE] border border-[#E3E8F4] rounded-[24px] p-8 space-y-5">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#6AA32A] bg-[#EFF8E2] px-3 py-1 rounded-full">Advisory Transparency</span>
            <h3 className="font-[var(--fd)] text-xl font-bold text-[#091540]">Why Expert Advisory Matters</h3>
            <div className="space-y-4 text-xs sm:text-sm text-[#374151]">
              <div><b>Behavioral Coaching:</b> We help you stay disciplined and avoid panic-selling during market downturns.</div>
              <div><b>Active Portfolio Monitoring:</b> We track fund performance shifts, manager changes, and sector weightings.</div>
              <div><b>Integrated Financial Planning:</b> We integrate mutual funds with tax planning (ELSS) and insurance adequacy.</div>
            </div>
          </div>
        </div>

        <div className="space-y-6 max-w-[900px] mx-auto">
          <div className="text-center space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-[.14em] text-[#6AA32A]">Got Questions?</span>
            <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#091540]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={faq.q} className="bg-[#F8FAFE] border border-[#E3E8F4] rounded-[16px] overflow-hidden transition-all">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-sm text-[#091540] cursor-pointer bg-transparent border-0"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <span className="text-lg text-[#1A3B9F] font-extrabold">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-[#374151] font-light leading-relaxed border-t border-[#E3E8F4] pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#091540] via-[#0D1E52] to-[#1A3B9F] rounded-[32px] p-8 sm:p-12 text-white text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(141,198,63,0.15)_0%,transparent_70%)] rounded-full pointer-events-none" />
          <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.14em] text-[#8DC63F] bg-[#8DC63F]/15 px-4 py-1.5 rounded-full border border-[#8DC63F]/30">
            Start Your Mutual Funds Journey Today
          </span>
          <h2 className="font-[var(--fd)] text-2xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Build Your Goal-Mapped Mutual Fund Portfolio?
          </h2>
          <p className="text-xs sm:text-sm text-white/80 max-w-[650px] mx-auto font-light leading-relaxed">
            Connect with our certified wealth advisors at MyAnmol (ARN: 114893). Get personalized regular growth scheme recommendations tailored to your family&apos;s future milestones.
          </p>
          <div className="pt-2 flex justify-center gap-4 flex-wrap">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="h-12 px-8 rounded-xl bg-[#8DC63F] text-[#091540] font-extrabold text-xs hover:bg-[#9ED64A] transition-all flex items-center gap-2 shadow-xl cursor-pointer border-0"
            >
              📞 Call Now / Book Session: +91-9742826665
            </button>
          </div>
        </div>

        <AdvisorBookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      </div>
    </div>
  );
}