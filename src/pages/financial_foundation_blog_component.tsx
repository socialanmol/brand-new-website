import React from 'react';

export default function FinancialFoundationBlog() {
  const handleDownloadPDF = (e: React.MouseEvent) => {
    e.preventDefault();
    window.print();
  };

  return (
    <article className="font-['Montserrat',sans-serif] bg-white text-[#111827] antialiased min-h-screen py-12 px-5 sm:px-8">
      <div className="max-w-[800px] mx-auto space-y-10">
        
        {/* Header Navigation / Action Bar */}
        <div className="flex justify-between items-center flex-wrap gap-4 border-b border-[#E3E8F4] pb-6">
          <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.14em] text-[#6AA32A] bg-[#EFF8E2] px-3.5 py-1.5 rounded-full">
            Financial Wellbeing
          </span>
          <button
            onClick={handleDownloadPDF}
            className="inline-flex items-center gap-2 h-10 px-4 rounded-[8px] bg-[#1A3B9F] text-white font-extrabold text-xs hover:bg-[#132d7c] transition-all cursor-pointer shadow-sm border-0"
          >
            Download / Print Article
          </button>
        </div>

        {/* Article Title & Metadata */}
        <header className="space-y-4">
          <h1 className="font-['Montserrat',sans-serif] text-3xl sm:text-5xl font-extrabold text-[#091540] tracking-tight leading-tight">
            Building a Strong Financial Foundation for Your Future
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm text-[#6B7280] border-l-4 border-[#1A3B9F] pl-4 py-1 bg-[#EEF2FB] rounded-r-[8px]">
            <div>
              <span className="font-bold text-[#091540]">By: Grant Gallagher</span>
              <span className="block text-xs text-[#1A3B9F] font-semibold">AVP Financial Wellbeing &amp; Brand Communications</span>
            </div>
            <div className="mt-2 sm:mt-0 font-medium">
              October 3, 2023
            </div>
          </div>
        </header>

        {/* Lead Introduction */}
        <div className="space-y-4 text-sm sm:text-base text-[#374151] font-light leading-relaxed">
          <p>
            When securing your financial future, having a well-thought-out plan is essential. Financial stability and achieving an overall sense of wellbeing plays a key role in your future. Developing a financial plan can be complex but is necessary to have in place in order to reach your goals. According to a Charles Schwab survey, only 33% of Americans have a financial plan<sup>1</sup>, and half of the respondents said they don’t have the money to make a plan worthwhile. On top of that, you will need to revise your plan over time as your family’s needs and your life circumstances change.
          </p>
        </div>

        {/* Section 1: Assessing Your Current Financial Situation */}
        <section className="space-y-4 pt-4 border-t border-[#E3E8F4]">
          <h2 className="font-['Montserrat',sans-serif] text-2xl font-bold text-[#091540]">
            Assessing Your Current Financial Situation
          </h2>
          <p className="text-sm sm:text-base text-[#374151] font-light leading-relaxed">
            Before you create a roadmap for your financial future, you need to understand where you currently stand. There are four things to consider when assessing your current financial situation:
          </p>
          
          <ul className="grid grid-cols-1 gap-3 my-4">
            <li className="bg-[#F8FAFE] border border-[#E3E8F4] p-4 rounded-[12px] flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-[#6AA32A] mt-2 flex-shrink-0"></span>
              <span className="text-sm text-[#374151]"><strong>Income:</strong> What is your monthly take-home pay?</span>
            </li>
            <li className="bg-[#F8FAFE] border border-[#E3E8F4] p-4 rounded-[12px] flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-[#6AA32A] mt-2 flex-shrink-0"></span>
              <span className="text-sm text-[#374151]"><strong>Expenses:</strong> Track your monthly spending to identify areas where you can cut back</span>
            </li>
            <li className="bg-[#F8FAFE] border border-[#E3E8F4] p-4 rounded-[12px] flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-[#6AA32A] mt-2 flex-shrink-0"></span>
              <span className="text-sm text-[#374151]"><strong>Debts:</strong> Lists all outstanding loans, credit card balances, and other debts</span>
            </li>
            <li className="bg-[#F8FAFE] border border-[#E3E8F4] p-4 rounded-[12px] flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-[#6AA32A] mt-2 flex-shrink-0"></span>
              <span className="text-sm text-[#374151]"><strong>Savings:</strong> How much do you have saved for emergencies and future goals?</span>
            </li>
          </ul>

          <p className="text-sm sm:text-base text-[#374151] font-light leading-relaxed">
            Understanding your current financial situation is important when making informed decisions about your future.
          </p>
        </section>

        {/* Section 2: Define Your Financial Goals */}
        <section className="space-y-4 pt-4 border-t border-[#E3E8F4]">
          <h2 className="font-['Montserrat',sans-serif] text-2xl font-bold text-[#091540]">
            Define Your Financial Goals
          </h2>
          <p className="text-sm sm:text-base text-[#374151] font-light leading-relaxed">
            What do you want to achieve in the short and long term? Setting clear financial goals is crucial. Your goals might include:
          </p>

          <div className="bg-[#EEF2FB] border border-[#C5D3F2] p-6 rounded-[16px] space-y-3">
            <ul className="space-y-2 text-sm text-[#091540] font-medium">
              <li className="flex items-center gap-2">✓ Building an emergency fund</li>
              <li className="flex items-center gap-2">✓ Paying off debt</li>
              <li className="flex items-center gap-2">✓ Saving for a down payment on a home</li>
              <li className="flex items-center gap-2">✓ Investing for retirement</li>
              <li className="flex items-center gap-2">✓ Funding your child’s education</li>
            </ul>
          </div>

          <p className="text-sm sm:text-base text-[#374151] font-light leading-relaxed">
            It’s okay to be a little ambitious but be realistic. You don’t have to work towards all of your goals at once, and your financial wellbeing will benefit from making notable progress on a few goals, as opposed to minor progress on many. Assign goal priority based on importance and timeliness, and focus on those first. Be specific about your goals, assign a timeline, and attach a dollar amount to each. This will give you a clear target to aim for.
          </p>
        </section>

        {/* Section 3: Creating a Budget */}
        <section className="space-y-4 pt-4 border-t border-[#E3E8F4]">
          <h2 className="font-['Montserrat',sans-serif] text-2xl font-bold text-[#091540]">
            Creating a Budget
          </h2>
          <p className="text-sm sm:text-base text-[#374151] font-light leading-relaxed">
            A budget is the foundation of any solid financial plan. It helps manage your money, allocate funds to your goals, and track your progress. Some tips and best practices for budgeting include:
          </p>

          <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-[#374151] font-light">
            <li>List your monthly income sources</li>
            <li>Categorize your expenses</li>
            <li>Allocate a portion of your income to each expense category</li>
            <li>Ensure that you’re saving towards your goals<sup>2</sup>, building or rebuilding your emergency fund, and paying down debt</li>
            <li>Regularly review and adjust your budget as needed</li>
          </ul>
        </section>

        {/* Section 4: Building an Emergency Fund */}
        <section className="space-y-4 pt-4 border-t border-[#E3E8F4]">
          <h2 className="font-['Montserrat',sans-serif] text-2xl font-bold text-[#091540]">
            Building an Emergency Fund
          </h2>
          <p className="text-sm sm:text-base text-[#374151] font-light leading-relaxed">
            Unexpected expenses can derail your financial plans. Traditional wisdom says to save three to six months' worth of living expenses, establishing an easily accessible account as an emergency fund, but this can be an overwhelmingly large goal to achieve depending on your lifestyle. Focus on budgeting to save what you can afford consistently on a monthly basis and be a bit more aggressive on replenishing when you’ve had to dip into your emergency fund, but don’t give yourself needless financial stress by focusing on whether it is “full.” Realistically, most people never have “enough” in this fund but having enough to cover any major household emergencies will help provide peace of mind and financial security.
          </p>
        </section>

        {/* Conclusion Callout */}
        <section className="bg-[#091540] text-white p-8 rounded-[20px] space-y-6 shadow-md">
          <p className="text-sm sm:text-base text-white/90 font-light leading-relaxed">
            Building a solid financial foundation for your future is not just a prudent choice; it’s a necessity. While the process may seem daunting, it’s a journey worth embarking upon. By taking these steps and seeking guidance when needed, you can pave the way for a financially secure tomorrow. So, don't hesitate to contact Affinity Federal Credit Union<sup>3</sup> today to kickstart your path toward financial wellbeing. Your future self will undoubtedly thank you for the proactive steps you take today.
          </p>
        </section>

        {/* Disclaimer Footer */}
        <footer className="pt-6 border-t border-[#E3E8F4] text-xs text-[#6B7280] font-light leading-relaxed space-y-2">
          <p>
            This information is for informational purposes only, is intended to provide general guidance, and does not constitute legal, tax, or financial advice. Each person's circumstances are different and may not apply to the specific information provided. You should seek the advice of a financial professional, tax consultant, and/or legal counsel to discuss your specific needs before making any financial or other commitments regarding the matters related to your condition.
          </p>
        </footer>

      </div>
    </article>
  );
}