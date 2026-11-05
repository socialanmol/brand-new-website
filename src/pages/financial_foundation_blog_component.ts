import React from 'react';
import { Link } from 'react-router';

export default function BlogPost() {
  const handleDownloadPDF = (e: React.MouseEvent) => {
    e.preventDefault();
    window.print();
  };

  return (
    <div className="font-['Montserrat',sans-serif] bg-white text-[#111827] antialiased min-h-screen py-12 px-5 sm:px-8">
      <div className="max-w-[850px] mx-auto space-y-10">
        
        {/* Navigation & Print Action */}
        <div className="flex justify-between items-center flex-wrap gap-4">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#1A3B9F] bg-[#EEF2FB] px-4 py-2 rounded-[8px] hover:bg-[#dce5f8] transition-colors"
          >
            &larr; Back to News &amp; Updates
          </Link>
          <button
            onClick={handleDownloadPDF}
            className="inline-flex items-center gap-2 h-10 px-4 rounded-[8px] bg-white border border-[#E3E8F4] text-[#1A3B9F] font-extrabold text-xs hover:bg-[#EEF2FB] transition-all cursor-pointer shadow-sm"
          >
            Download PDF / Print
          </button>
        </div>

        {/* Blog Header */}
        <div className="space-y-4 border-b border-[#E3E8F4] pb-8">
          <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.14em] text-[#6AA32A] bg-[#EFF8E2] px-3.5 py-1.5 rounded-full">
            Financial Education &bull; MyAnmol Insights
          </span>
          <h1 className="font-['Montserrat',sans-serif] text-3xl sm:text-5xl font-bold text-[#091540] leading-tight">
            Building a Resilient Financial Foundation: A Practical Roadmap
          </h1>
          <div className="flex items-center gap-4 text-xs text-[#6B7280] pt-2 flex-wrap">
            <div>By: <b>MyAnmol Wealth Advisory Desk</b></div>
            <div>&bull;</div>
            <div>AMFI-Registered Distributor (ARN: 114893)</div>
            <div>&bull;</div>
            <div>6 min read</div>
          </div>
        </div>

        {/* Blog Body Content */}
        <div className="space-y-6 text-sm sm:text-base text-[#374151] leading-relaxed font-light">
          <p>
            Financial planning often sounds intimidating, largely because the industry wraps simple money habits in complex jargon. A common misconception is that you need substantial wealth before creating a plan; in reality, disciplined planning is the exact vehicle that creates financial stability in the first place.
          </p>
          <p>
            Building a lasting foundation doesn&apos;t require overhauling your life overnight. It comes down to four deliberate steps: taking inventory, setting focused goals, structuring cash flow, and building a safety buffer.
          </p>

          <h2 className="font-['Montserrat',sans-serif] text-2xl font-bold text-[#091540] pt-4">
            1. Take a Clean Financial Inventory
          </h2>
          <p>
            Before setting a target, you need an unfiltered view of where your money currently goes. Audit your cash flow across four core pillars:
          </p>
          <ul className="space-y-3 bg-[#EEF2FB]/50 border border-[#E3E8F4] p-6 rounded-[16px] text-xs sm:text-sm list-none">
            <li><b>Document exact take-home pay</b> after taxes and statutory deductions. Account for variable income separately if you rely on performance bonuses or freelance work.</li>
            <li><b>Track 60-90 days of actual spending.</b> Differentiate between non-negotiables (rent, utilities, groceries, EMIs) and lifestyle expenses (dining, entertainment, subscriptions).</li>
            <li><b>Catalog all unsecured loans,</b> personal loans, and credit card balances. Note their respective interest rates &mdash; high-cost debt must always take top repayment priority.</li>
            <li><b>Identify capital currently held</b> in low-yield savings accounts, fixed deposits, or liquid instruments that can be accessed immediately.</li>
          </ul>

          <h2 className="font-['Montserrat',sans-serif] text-2xl font-bold text-[#091540] pt-4">
            2. Prioritize Focused, Measurable Goals
          </h2>
          <p>
            Trying to fund six different objectives at once often leads to fragmented capital and slow progress. A more effective strategy is prioritizing 2 &ndash; 3 key milestones based on urgency and impact.
          </p>
          <p>
            Every goal should be defined by three parameters:
          </p>
          <ol className="space-y-1 list-decimal pl-5">
            <li>Short-term (under 1 year), medium-term (1&ndash;5 years), or long-term (5+ years).</li>
            <li>A specific target amount adjusted for estimated inflation.</li>
            <li>Matching the time horizon to the appropriate asset class (e.g., liquid/debt instruments for short-term needs, equity-oriented mutual funds for horizons beyond 5-7 years).</li>
          </ol>

          {/* Table from PDF */}
          <div className="my-6 overflow-x-auto border border-[#E3E8F4] rounded-[16px]">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-[#EEF2FB] text-[#091540] border-b border-[#E3E8F4] font-bold">
                  <th className="p-3.5 pl-5">Goal Type</th>
                  <th className="p-3.5">Typical Horizon</th>
                  <th className="p-3.5">Recommended Asset Focus</th>
                  <th className="p-3.5 pr-5">Priority Level</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E3E8F4] text-[#374151]">
                <tr>
                  <td className="p-3.5 pl-5 font-bold">Emergency Buffer</td>
                  <td className="p-3.5">Immediate</td>
                  <td className="p-3.5">Liquid Mutual Funds / Sweep-in FDs</td>
                  <td className="p-3.5 pr-5 font-semibold text-[#1A3B9F]">Non-negotiable</td>
                </tr>
                <tr>
                  <td className="p-3.5 pl-5 font-bold">High-Cost Debt Payoff</td>
                  <td className="p-3.5">6-18 months</td>
                  <td className="p-3.5">Focused Cash Flow Reallocation</td>
                  <td className="p-3.5 pr-5 font-semibold text-[#E65100]">Critical</td>
                </tr>
                <tr>
                  <td className="p-3.5 pl-5 font-bold">Mid-Term Purchases</td>
                  <td className="p-3.5">2 - 5 years</td>
                  <td className="p-3.5">Short-Duration Debt Funds / Arbitrage</td>
                  <td className="p-3.5 pr-5 font-semibold text-[#6B7280]">Discretionary</td>
                </tr>
                <tr>
                  <td className="p-3.5 pl-5 font-bold">Long-Term Wealth / Retirement</td>
                  <td className="p-3.5">7+ years</td>
                  <td className="p-3.5">Diversified Equity Funds (via disciplined SIPs)</td>
                  <td className="p-3.5 pr-5 font-semibold text-[#6AA32A]">Essential</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="font-['Montserrat',sans-serif] text-2xl font-bold text-[#091540] pt-4">
            3. Create a Cash-Flow Allocation Strategy
          </h2>
          <p>
            A budget shouldn&apos;t feel restrictive; it is simply a framework to ensure your money works toward your defined priorities before discretionary spending takes over.
          </p>
          <ul className="space-y-2 list-disc pl-5">
            <li><b>Automate Transfers:</b> The moment income lands, automate transfers directly to your investments and emergency reserves rather than saving whatever happens to be left at the end of the month.</li>
            <li><b>Partition Spending:</b> Split spending into fixed commitments, goal-linked investments, and flexible spending. Keeping everyday spending within a dedicated account prevents lifestyle creep from eating into investment capital.</li>
            <li><b>Dynamic Adjustments:</b> Cash flow isn&apos;t static. As increments occur or liabilities wind down, adjust your automated allocations immediately to maintain an upward savings trajectory.</li>
          </ul>

          <h2 className="font-['Montserrat',sans-serif] text-2xl font-bold text-[#091540] pt-4">
            4. Construct a Realistic Emergency Buffer
          </h2>
          <p>
            Unplanned medical needs, temporary job disruptions, or sudden household repairs can quickly dismantle an investment strategy if you are forced to break long-term holdings or take on high-interest loans.
          </p>
          <ul className="space-y-2 list-disc pl-5">
            <li><b>Survival Expenses:</b> Focus strictly on mandatory survival expenses (rent, food, insurance premiums, EMIs), not your total gross salary.</li>
            <li><b>Scale Progressively:</b> Striving for a lump-sum 6-month buffer right away can feel paralyzing. Start by securing a 1-month baseline, then progressively scale the reserve with consistent monthly contributions.</li>
            <li><b>Safe Parking:</b> Park this capital where capital preservation and immediate access are the priorities &mdash; such as high-yield savings accounts, sweep-in bank deposits, or overnight/liquid funds &mdash; rather than volatile market products.</li>
          </ul>

          <h2 className="font-['Montserrat',sans-serif] text-2xl font-bold text-[#091540] pt-4">
            The Next Step
          </h2>
          <p>
            A solid financial foundation is built on consistency rather than market timing or aggressive speculation. Securing your cash flow and ring-fencing your downside allows you to invest for long-term growth with confidence and clarity.
          </p>
        </div>

        {/* Disclaimer Footer */}
        <div className="bg-[#F8FAFE] border border-[#E3E8F4] rounded-[20px] p-6 text-xs text-[#6B7280] space-y-2">
          <p>
            <b>Disclaimer:</b> This article is published purely for financial literacy and educational purposes. It does not constitute individual financial, tax, or investment advice. Asset allocation and financial planning depend on an individual&apos;s unique risk profile, financial position, and goals. Please consult a qualified financial advisor before executing investments or restructuring debt.
          </p>
          <p>
            Anmol Share Broking Pvt. Ltd. &mdash; AMFI-registered Mutual Fund Distributor, ARN: 114893.
          </p>
        </div>

      </div>
    </div>
  );
}
