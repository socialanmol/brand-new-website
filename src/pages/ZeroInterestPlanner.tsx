import React, { useState, useMemo, useRef } from "react";
import { Link } from "react-router";

/* ------------------------------------------------------------------ Calculation Helpers */

function calcEMI(P: number, annualRate: number, years: number) {
  const r = annualRate / 100 / 12;
  const n = years * 12;
  if (r === 0) return P / n;
  return (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

function calcStepUpFV(startPmt: number, stepPct: number, annualReturn: number, years: number) {
  const mr = annualReturn / 100 / 12;
  const sr = stepPct / 100;
  let fv = 0;
  let pmt = startPmt;
  for (let y = 0; y < years; y++) {
    for (let m = 0; m < 12; m++) {
      const monthsLeft = (years - y) * 12 - m;
      fv += pmt * Math.pow(1 + mr, monthsLeft);
    }
    pmt *= 1 + sr;
  }
  return fv;
}

function calcStepUpSIP(FV: number, stepPct: number, annualReturn: number, years: number) {
  if (stepPct === 0) {
    const r = annualReturn / 100 / 12;
    const months = years * 12;
    if (r === 0) return FV / months;
    return (FV * r) / (Math.pow(1 + r, months) - 1);
  }
  let lo = 0;
  let hi = 500000;
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    if (calcStepUpFV(mid, stepPct, annualReturn, years) < FV) {
      lo = mid;
    } else {
      hi = mid;
    }
  }
  return (lo + hi) / 2;
}

function remainingPrincipal(P: number, annualRate: number, years: number, monthsPaid: number) {
  const r = annualRate / 100 / 12;
  const n = years * 12;
  if (r === 0) return P - (P / n) * monthsPaid;
  return (P * (Math.pow(1 + r, n) - Math.pow(1 + r, monthsPaid))) / (Math.pow(1 + r, n) - 1);
}

function calcSipTotalInvested(startSIP: number, stepPct: number, years: number) {
  if (stepPct === 0) return startSIP * years * 12;
  let s = startSIP;
  let t = 0;
  for (let y = 0; y < years; y++) {
    t += s * 12;
    s *= 1 + stepPct / 100;
  }
  return t;
}

function fmtINR(n: number) {
  if (n >= 10000000) return "₹" + (n / 10000000).toFixed(2).replace(/\.00$/, "") + " Cr";
  if (n >= 100000) return "₹" + (n / 100000).toFixed(2).replace(/\.00$/, "") + " L";
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

/* ------------------------------------------------------------------ Component */

export default function ZeroInterestPlanner() {
  // Inputs
  const [loanAmount, setLoanAmount] = useState<number>(5000000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [tenureVal, setTenureVal] = useState<number>(20);
  const [tenureUnit, setTenureUnit] = useState<"years" | "months">("years");
  const [income, setIncome] = useState<number>(150000);
  const [assumedReturn, setAssumedReturn] = useState<number>(12);

  // Settings
  const [stepUp, setStepUp] = useState<number>(10);
  const [extend, setExtend] = useState<number>(0);
  const [inflationToggle, setInflationToggle] = useState<boolean>(true);
  const [inflationRate, setInflationRate] = useState<number>(6);
  const [customSipToggle, setCustomSipToggle] = useState<boolean>(false);
  const [customSipVal, setCustomSipVal] = useState<number>(5000);

  // UI state
  const [hasCalculated, setHasCalculated] = useState<boolean>(true);
  const [chartMode, setChartMode] = useState<"growth" | "interest" | "amort">("growth");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const resultsRef = useRef<HTMLDivElement>(null);

  // Normalize tenure in years
  const tenureYears = tenureUnit === "years" ? tenureVal : tenureVal / 12;
  const investYears = tenureYears + extend;

  // Primary calculations
  const results = useMemo(() => {
    const P = loanAmount || 0;
    const rate = interestRate || 8.5;
    const years = tenureYears || 20;
    const retRate = assumedReturn || 12;

    const emi = calcEMI(P, rate, years);
    const totalRepay = emi * years * 12;
    const totalInt = totalRepay - P;

    const sipReverseCalc = calcStepUpSIP(totalInt, stepUp, retRate, investYears);
    const sipTarget16_6pct = Math.round((emi * 0.166) / 100) * 100;
    const sipNeeded = customSipToggle && customSipVal > 0
      ? customSipVal
      : Math.max(sipReverseCalc, sipTarget16_6pct);

    const corpus = calcStepUpFV(sipNeeded, stepUp, retRate, investYears);
    const sipTotal = calcSipTotalInvested(sipNeeded, stepUp, investYears);

    const offsetRaw = totalInt > 0 ? (corpus / totalInt) * 100 : 0;
    const offsetDisplay = offsetRaw >= 100 ? 100 : Math.round(offsetRaw);

    const infRate = inflationToggle ? inflationRate / 100 : 0;
    const realCorpus = infRate > 0 ? corpus / Math.pow(1 + infRate, investYears) : corpus;

    // Break-even year calculation
    let beYear: number | null = null;
    for (let yr = 1; yr <= investYears; yr++) {
      const sipC = calcStepUpFV(sipNeeded, stepUp, retRate, yr);
      const loanYr = Math.min(yr, years);
      const principalPaid = P - remainingPrincipal(P, rate, years, loanYr * 12);
      const cumInt = emi * loanYr * 12 - principalPaid;
      if (sipC >= Math.max(0, cumInt)) {
        beYear = yr;
        break;
      }
    }
    const beDisplay = beYear !== null ? `Yr ${beYear}` : `Beyond Yr ${investYears}`;

    // Year 1 Tax benefit approximation (80C + 24b)
    const y1Bal = remainingPrincipal(P, rate, years, 12);
    const y1Principal = Math.min(P - y1Bal, 150000);
    const y1Interest = Math.min(emi * 12 - (P - y1Bal), 200000);
    const taxBenefitTotal = y1Principal + y1Interest;

    // Scenarios table
    const retLow = Math.max(6, retRate - 2);
    const retHigh = Math.min(18, retRate + 2);
    const scenarios = [
      { label: "Conservative", ret: retLow, cls: "text-[#6B8F7E]" },
      { label: "Your Assumed Rate", ret: retRate, cls: "text-[#1A3B9F] font-bold", active: true },
      { label: "Optimistic", ret: retHigh, cls: "text-[#8DC63F] font-bold" },
    ].map((sc) => {
      const s = calcStepUpSIP(totalInt, stepUp, sc.ret, investYears);
      const c = calcStepUpFV(s, stepUp, sc.ret, investYears);
      const st = calcSipTotalInvested(s, stepUp, investYears);
      const rc = infRate > 0 ? c / Math.pow(1 + infRate, investYears) : c;
      return {
        ...sc,
        sip: s,
        corp: c,
        sipT: st,
        realC: rc,
        off: totalInt > 0 ? Math.round((c / totalInt) * 100) : 0,
      };
    });

    // Chart timeline data points
    const chartPoints: { yr: number; valA: number; valB: number }[] = [];
    for (let yr = 0; yr <= investYears; yr++) {
      if (chartMode === "growth") {
        chartPoints.push({
          yr,
          valA: calcStepUpFV(sipNeeded, stepUp, retRate, yr),
          valB: yr <= years ? Math.max(0, remainingPrincipal(P, rate, years, yr * 12)) : 0,
        });
      } else if (chartMode === "interest") {
        const ip = yr === 0 ? 0 : Math.max(0, emi * Math.min(yr, years) * 12 - (P - remainingPrincipal(P, rate, years, Math.min(yr * 12, years * 12))));
        chartPoints.push({
          yr,
          valA: calcStepUpFV(sipNeeded, stepUp, retRate, yr),
          valB: ip,
        });
      } else {
        const mn = Math.min(yr * 12, years * 12);
        const pp = yr === 0 ? 0 : Math.max(0, P - remainingPrincipal(P, rate, years, mn));
        const ip = yr === 0 ? 0 : Math.max(0, emi * mn - pp);
        chartPoints.push({
          yr,
          valA: pp,
          valB: ip,
        });
      }
    }

    return {
      emi,
      totalRepay,
      totalInt,
      sipNeeded,
      corpus,
      sipTotal,
      realCorpus,
      offsetDisplay,
      beDisplay,
      taxBenefitTotal,
      scenarios,
      chartPoints,
    };
  }, [
    loanAmount,
    interestRate,
    tenureYears,
    assumedReturn,
    stepUp,
    extend,
    inflationToggle,
    inflationRate,
    customSipToggle,
    customSipVal,
    chartMode,
    investYears,
  ]);

  const handleCalculate = () => {
    setHasCalculated(true);
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const faqs = [
    { q: "What is the concept behind this Home Loan Wealth Planner?", a: "The planner illustrates how investing a disciplined monthly SIP alongside your home loan EMI may potentially build a corpus over time that could offset a significant portion of your estimated interest outgo. It's an educational illustration — not a guarantee of returns." },
    { q: "Does this mean I won't have to pay interest on my home loan?", a: "No. Your home loan interest is a contractual obligation with your lender. This planner shows how a parallel investment strategy — if maintained consistently with assumed market-linked returns — may build a corpus equivalent to your interest paid. The interest is still paid; the idea is to potentially build wealth that could match it." },
    { q: "What return rate should I assume for my SIP?", a: "The planner uses 12% as a default illustrative assumption, in line with long-term historical averages for diversified equity mutual funds in India. You can adjust it between 6% and 18%. These are assumptions only — not guaranteed returns." },
    { q: "What is a Step-Up SIP and why is it recommended?", a: "A Step-Up SIP allows you to increase your monthly SIP amount by a fixed percentage each year (e.g., 10–15%). This aligns with typical income growth patterns and significantly reduces your starting SIP requirement. Over time, increasing contributions can lead to a larger corpus than a flat SIP." },
    { q: "Is this a substitute for prepaying my home loan?", a: "Not necessarily. The choice between prepayment and investing depends on your loan interest rate, expected investment returns, tax benefits, and risk appetite. MyAnmol advisors can help you assess which approach — or a combination — may be more suitable for your specific situation." },
    { q: "What happens if markets underperform?", a: "Market-linked investments carry inherent risk. If returns are lower than assumed, your projected corpus will be smaller. This is why we show Conservative, Balanced, and Growth scenarios. The planner is a planning tool — not a predictor of actual market outcomes." },
    { q: "Do home loan EMIs qualify for tax benefits?", a: "Yes. Under Section 80C, principal repayment (up to ₹1.5 lakh p.a.) and under Section 24(b), interest paid (up to ₹2 lakh p.a. for self-occupied property) may be eligible for tax deductions. Please consult a tax advisor for your specific situation." },
    { q: "Are there tax implications for mutual fund SIP gains?", a: "Yes. Long-term capital gains on equity mutual funds are taxed per prevailing finance regulations. Tax laws may change. Consult a qualified tax advisor." },
    { q: "How does inflation affect this plan?", a: "Inflation reduces the real purchasing power of money. If inflation runs at 6% and investments return 12%, the real return is approximately 6%. Our planner allows you to toggle inflation adjustments to see both nominal and real corpus values." },
    { q: "What is the minimum SIP amount I should consider?", a: "Many mutual funds allow SIPs starting from ₹500 per month. However, for the strategy in this planner to be meaningful, a higher monthly commitment aligned with your loan size and tenure is recommended." },
    { q: "Can I start a SIP even if I already have a home loan?", a: "Absolutely. In fact, starting alongside an existing loan may be the most impactful decision you can make — the earlier you start, the more compounding works in your favour." },
    { q: "What is AMFI and why does it matter?", a: "AMFI (Association of Mutual Funds in India) is the industry body for mutual funds in India. A registered Mutual Fund Distributor (MFD) under AMFI is a licensed professional regulated by SEBI. MyAnmol (ARN: 114893) is a registered MFD." },
    { q: "What is MyAnmol's approach to recommendations?", a: "MyAnmol follows an education-first, goal-based financial wellness approach. We never promise guaranteed returns, use fear-based messaging, or push products for commissions alone. Our advice is aligned with your long-term financial wellness goals." },
    { q: "How is a Mutual Fund Distributor different from a financial advisor?", a: "An MFD is licensed to distribute mutual fund products and earns commissions from AMCs. A registered investment advisor (RIA) charges fees directly and provides advice. MyAnmol operates as an MFD with a strong advisory ethos — disclosing commissions transparently." },
    { q: "What is compounding and why does it matter here?", a: "Compounding is when your investment earnings themselves generate further earnings. Over long periods, this can be transformational. A ₹5,000 monthly SIP at 12% for 20 years may grow to over ₹55 lakhs — having invested only about ₹12 lakhs." },
    { q: "What is a loan amortization schedule?", a: "It's a table showing the breakdown of each EMI into principal and interest components over the loan tenure. In early years, most of your EMI goes towards interest; over time, more goes towards reducing principal." },
    { q: "Is the MyAnmol consultation free?", a: "Yes. The initial Financial Wellness Consultation is offered at no charge. It's a discovery conversation to understand your financial situation, goals, and whether MyAnmol's services are a suitable fit for you." },
    { q: "What information should I bring to a consultation?", a: "Ideally: your current home loan details (principal, rate, tenure, outstanding balance), monthly household income, existing investments and SIPs, financial goals, and insurance coverage." },
    { q: "Does MyAnmol manage my investments directly?", a: "MyAnmol facilitates mutual fund transactions through AMFI-registered platforms. You invest through official channels; MyAnmol assists with planning, fund selection, SIP management, and ongoing reviews." },
    { q: "What if I want to stop my SIP midway?", a: "SIPs can be paused or stopped at any time without penalty. However, consistency is the primary driver of long-term corpus creation. We recommend working with your advisor to adjust amounts rather than stopping completely." },
  ];

  return (
    <div className="font-[var(--fs)] bg-[#F8FAFE] text-[#111827] antialiased min-h-screen">
      {/* ── HERO SECTION ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#091540] via-[#0D1E52] to-[#1A3B9F] py-16 sm:py-24 text-center text-white px-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[580px] bg-[radial-gradient(circle,rgba(141,198,63,0.18)_0%,transparent_65%)] filter blur-3xl pointer-events-none" />
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8DC63F]/15 border border-[#8DC63F]/35 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" />
            <span className="text-[11px] font-extrabold uppercase tracking-[.18em] text-[#8DC63F]">
              Home Loan Wealth Strategy · Zero Interest Planner
            </span>
          </div>

          <h1 className="font-[var(--fd)] text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight mb-4">
            Is your Home Loan working for you — <br />
            <span className="text-[#8DC63F]">or only for your Bank?</span>
          </h1>

          <p className="text-sm sm:text-base text-white/80 font-light leading-relaxed max-w-xl mx-auto mb-8">
            Most homeowners pay close to double the value of their loan in interest over twenty years. A parallel wealth stream running alongside your EMI can build an asset base that potentially matches your interest outgo.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#planner"
              className="bg-[#8DC63F] hover:bg-[#9ED64A] text-[#091540] font-extrabold text-sm sm:text-base px-8 py-3.5 rounded-full shadow-lg transition-all"
            >
              Calculate My Wealth Plan ↓
            </a>
            <Link
              to="/wp/review"
              className="border border-white/20 bg-white/10 hover:bg-white/15 text-white font-bold text-sm sm:text-base px-8 py-3.5 rounded-full transition-all"
            >
              Book an Advisory Call
            </Link>
          </div>
        </div>
      </section>

      {/* ── THE HIDDEN COST FLOW ── */}
      <section className="py-14 sm:py-20 bg-white border-b border-[rgba(26,59,159,0.08)]">
        <div className="max-w-[1140px] mx-auto px-6 text-center">
          <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#1A3B9F] block mb-2">
            The Hidden Cost
          </span>
          <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-bold text-[#091540] tracking-tight mb-4">
            The interest you pay is often as large as the loan itself
          </h2>
          <p className="text-sm sm:text-base text-[#4B5563] font-light max-w-2xl mx-auto mb-12">
            On a ₹50 lakh home loan at 8.5% over 20 years, you pay ~₹54 lakhs just in interest. Here is how conventional loan repayment leaves wealth behind.
          </p>

          {/* Flow cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center mb-12">
            <div className="bg-[#F8FAFE] border border-[rgba(26,59,159,0.12)] rounded-2xl p-6 shadow-sm">
              <span className="text-3xl block mb-2">🏠</span>
              <div className="font-bold text-sm text-[#091540]">Home Loan</div>
              <div className="text-xs text-gray-500 mt-1">₹50 Lakhs @ 8.5%</div>
            </div>

            <div className="bg-[#F8FAFE] border border-[rgba(26,59,159,0.12)] rounded-2xl p-6 shadow-sm">
              <span className="text-3xl block mb-2">📅</span>
              <div className="font-bold text-sm text-[#091540]">Monthly EMI</div>
              <div className="text-xs text-gray-500 mt-1">~₹43,391 / month</div>
            </div>

            <div className="bg-[#FEE2E2] border border-rose-200 rounded-2xl p-6 shadow-sm">
              <span className="text-3xl block mb-2">💸</span>
              <div className="font-bold text-sm text-rose-700">Interest Paid</div>
              <div className="text-xs text-rose-600 mt-1">~₹54.1 Lakhs (Sunk Cost)</div>
            </div>

            <div className="bg-[#EFF8E2] border border-[#8DC63F]/40 rounded-2xl p-6 shadow-sm">
              <span className="text-3xl block mb-2">🌱</span>
              <div className="font-bold text-sm text-[#091540]">Parallel SIP Option</div>
              <div className="text-xs text-[#6AA32A] mt-1 font-semibold">~₹5,500/mo creates offset</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE WEALTH PLANNER CALCULATOR ── */}
      <section id="planner" className="py-14 sm:py-20 max-w-[1240px] mx-auto px-6 scroll-mt-16">
        <div className="text-center mb-10">
          <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#1A3B9F] block mb-2">
            Interactive Calculator
          </span>
          <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-bold text-[#091540] tracking-tight">
            Personalised Home Loan Wealth Planner
          </h2>
        </div>

        <div className="bg-white border border-[rgba(26,59,159,0.15)] rounded-3xl overflow-hidden shadow-xl">
          {/* Input Row 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 border-b border-gray-100">
            <div className="p-6 border-b sm:border-b-0 sm:border-r border-gray-100">
              <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#091540] mb-2">
                Outstanding Loan Amount (₹)
              </label>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full text-xl font-[var(--fd)] font-bold text-[#091540] bg-[#F8FAFE] border border-gray-200 rounded-xl px-4 py-2.5 focus:border-[#1A3B9F] focus:outline-none"
              />
              <span className="text-xs text-gray-400 mt-1 block">
                {fmtINR(loanAmount)}
              </span>
            </div>

            <div className="p-6 border-b sm:border-b-0 sm:border-r border-gray-100">
              <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#091540] mb-2">
                Loan Interest Rate (% p.a.)
              </label>
              <input
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full text-xl font-[var(--fd)] font-bold text-[#091540] bg-[#F8FAFE] border border-gray-200 rounded-xl px-4 py-2.5 focus:border-[#1A3B9F] focus:outline-none"
              />
              <span className="text-xs text-gray-400 mt-1 block">Annual bank rate</span>
            </div>

            <div className="p-6">
              <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#091540] mb-2">
                Loan Tenure
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={tenureVal}
                  onChange={(e) => setTenureVal(Number(e.target.value))}
                  className="w-full text-xl font-[var(--fd)] font-bold text-[#091540] bg-[#F8FAFE] border border-gray-200 rounded-xl px-4 py-2.5 focus:border-[#1A3B9F] focus:outline-none"
                />
                <div className="flex border border-gray-200 rounded-xl overflow-hidden shrink-0">
                  <button
                    type="button"
                    onClick={() => setTenureUnit("years")}
                    className={`px-3 py-2 text-xs font-bold ${tenureUnit === "years" ? "bg-[#1A3B9F] text-white" : "bg-white text-gray-600"}`}
                  >
                    Yrs
                  </button>
                  <button
                    type="button"
                    onClick={() => setTenureUnit("months")}
                    className={`px-3 py-2 text-xs font-bold ${tenureUnit === "months" ? "bg-[#1A3B9F] text-white" : "bg-white text-gray-600"}`}
                  >
                    Mos
                  </button>
                </div>
              </div>
              <span className="text-xs text-gray-400 mt-1 block">
                {tenureUnit === "years" ? `${tenureVal * 12} months` : `${(tenureVal / 12).toFixed(1)} years`}
              </span>
            </div>
          </div>

          {/* Input Row 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 border-b border-gray-100">
            <div className="p-6 border-b sm:border-b-0 sm:border-r border-gray-100">
              <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#091540] mb-2">
                Monthly In-Hand Income (₹) <span className="text-gray-400 font-normal">Optional</span>
              </label>
              <input
                type="number"
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
                className="w-full text-xl font-[var(--fd)] font-bold text-[#091540] bg-[#F8FAFE] border border-gray-200 rounded-xl px-4 py-2.5 focus:border-[#1A3B9F] focus:outline-none"
              />
              <span className="text-xs text-gray-400 mt-1 block">Assists in affordability ratios</span>
            </div>

            <div className="p-6">
              <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#091540] mb-2">
                Assumed Investment Return (% p.a.)
              </label>
              <input
                type="number"
                step="0.5"
                value={assumedReturn}
                onChange={(e) => setAssumedReturn(Number(e.target.value))}
                className="w-full text-xl font-[var(--fd)] font-bold text-[#091540] bg-[#F8FAFE] border border-gray-200 rounded-xl px-4 py-2.5 focus:border-[#1A3B9F] focus:outline-none"
              />
              <span className="text-xs text-gray-400 mt-1 block">Default 12% is typical for long-term equity</span>
            </div>
          </div>

          {/* Strategy Toggles */}
          <div className="p-6 bg-[#F8FAFE] border-b border-gray-100 grid grid-cols-1 sm:grid-cols-4 gap-6">
            <div>
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-500 mb-2">
                Annual Step-Up SIP
              </span>
              <div className="flex gap-2">
                {[0, 10, 15].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setStepUp(val)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                      stepUp === val ? "bg-[#1A3B9F] text-white border-[#1A3B9F]" : "bg-white text-gray-600 border-gray-200"
                    }`}
                  >
                    {val === 0 ? "None" : `${val}%`}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-500 mb-2">
                Invest Beyond Loan
              </span>
              <div className="flex gap-2">
                {[0, 3, 5, 10].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setExtend(val)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                      extend === val ? "bg-[#1A3B9F] text-white border-[#1A3B9F]" : "bg-white text-gray-600 border-gray-200"
                    }`}
                  >
                    {val === 0 ? "None" : `+${val} Yrs`}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-500">
                  Inflation Adjustment
                </span>
                <input
                  type="checkbox"
                  checked={inflationToggle}
                  onChange={(e) => setInflationToggle(e.target.checked)}
                />
              </div>
              <input
                type="number"
                disabled={!inflationToggle}
                value={inflationRate}
                onChange={(e) => setInflationRate(Number(e.target.value))}
                className="w-24 px-2 py-1 text-xs border border-gray-200 rounded bg-white"
              />
              <span className="text-[10px] text-gray-400 ml-2">% p.a.</span>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-500">
                  Set My Own SIP
                </span>
                <input
                  type="checkbox"
                  checked={customSipToggle}
                  onChange={(e) => setCustomSipToggle(e.target.checked)}
                />
              </div>
              <input
                type="number"
                disabled={!customSipToggle}
                value={customSipVal}
                onChange={(e) => setCustomSipVal(Number(e.target.value))}
                className="w-32 px-2 py-1 text-xs border border-gray-200 rounded bg-white"
              />
              <span className="text-[10px] text-gray-400 ml-2">₹/mo</span>
            </div>
          </div>

          {/* Action */}
          <div className="p-6 bg-white flex justify-center border-b border-gray-100">
            <button
              type="button"
              onClick={handleCalculate}
              className="bg-[#1A3B9F] hover:bg-[#0D1E52] text-white font-extrabold text-sm sm:text-base px-10 py-3.5 rounded-full transition-all shadow-md hover:shadow-lg"
            >
              Update &amp; Project Results →
            </button>
          </div>

          {/* Results Area */}
          {hasCalculated && (
            <div ref={resultsRef} className="p-6 sm:p-10 space-y-8 bg-white">
              {/* 10 KPI Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-100">
                  <span className="block text-[10px] font-extrabold uppercase tracking-wider text-rose-800 mb-1">
                    Monthly EMI
                  </span>
                  <span className="font-[var(--fd)] text-xl sm:text-2xl font-bold text-rose-900">
                    {fmtINR(results.emi)}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-100">
                  <span className="block text-[10px] font-extrabold uppercase tracking-wider text-rose-800 mb-1">
                    Total Interest
                  </span>
                  <span className="font-[var(--fd)] text-xl sm:text-2xl font-bold text-rose-900">
                    {fmtINR(results.totalInt)}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200">
                  <span className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-600 mb-1">
                    Total Repayment
                  </span>
                  <span className="font-[var(--fd)] text-xl sm:text-2xl font-bold text-[#091540]">
                    {fmtINR(results.totalRepay)}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#091540] text-white border border-[#091540]">
                  <span className="block text-[10px] font-extrabold uppercase tracking-wider text-[#8DC63F] mb-1">
                    Suggested Monthly SIP
                  </span>
                  <span className="font-[var(--fd)] text-xl sm:text-2xl font-bold text-white">
                    {fmtINR(results.sipNeeded)}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#091540] text-white border border-[#091540]">
                  <span className="block text-[10px] font-extrabold uppercase tracking-wider text-[#8DC63F] mb-1">
                    SIP as % of EMI
                  </span>
                  <span className="font-[var(--fd)] text-xl sm:text-2xl font-bold text-white">
                    {Math.round((results.sipNeeded / (results.emi || 1)) * 100)}%
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#EFF8E2] border border-[rgba(141,198,63,0.3)]">
                  <span className="block text-[10px] font-extrabold uppercase tracking-wider text-[#6AA32A] mb-1">
                    Projected Corpus
                  </span>
                  <span className="font-[var(--fd)] text-xl sm:text-2xl font-bold text-[#1A4A2A]">
                    {fmtINR(results.corpus)}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#EFF8E2] border border-[rgba(141,198,63,0.3)]">
                  <span className="block text-[10px] font-extrabold uppercase tracking-wider text-[#6AA32A] mb-1">
                    Real Corpus (Inflation Adj.)
                  </span>
                  <span className="font-[var(--fd)] text-xl sm:text-2xl font-bold text-[#1A4A2A]">
                    {fmtINR(results.realCorpus)}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200">
                  <span className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-600 mb-1">
                    Break-Even Year
                  </span>
                  <span className="font-[var(--fd)] text-xl sm:text-2xl font-bold text-[#091540]">
                    {results.beDisplay}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200">
                  <span className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-600 mb-1">
                    Est. Tax Benefit (Yr 1)
                  </span>
                  <span className="font-[var(--fd)] text-xl sm:text-2xl font-bold text-[#091540]">
                    {fmtINR(results.taxBenefitTotal)}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200">
                  <span className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-600 mb-1">
                    Total SIP Invested
                  </span>
                  <span className="font-[var(--fd)] text-xl sm:text-2xl font-bold text-[#091540]">
                    {fmtINR(results.sipTotal)}
                  </span>
                </div>
              </div>

              {/* Story summary banner */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-[#091540] to-[#1A3B9F] text-white flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#8DC63F] block mb-1">
                    Outcome Summary
                  </span>
                  <div className="text-sm sm:text-base font-light">
                    Interest Outgo: <strong>{fmtINR(results.totalInt)}</strong> → Projected SIP Corpus:{" "}
                    <strong className="text-[#8DC63F]">{fmtINR(results.corpus)}</strong>
                  </div>
                </div>

                <div className="text-center px-6 py-2.5 rounded-xl bg-white/10 border border-white/20">
                  <span className="font-[var(--fd)] text-3xl font-extrabold text-[#8DC63F] block leading-none">
                    {results.offsetDisplay}%
                  </span>
                  <span className="text-[10px] uppercase font-bold text-white/70">
                    Potential Interest Offset
                  </span>
                </div>
              </div>

              {/* Visual Graph & Mode Tabs */}
              <div className="border border-[rgba(26,59,159,0.1)] rounded-2xl p-6">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <h3 className="font-[var(--fd)] text-lg font-bold text-[#091540]">
                    Trajectory Over Time
                  </h3>
                  <div className="flex gap-2 text-xs">
                    {(
                      [
                        { id: "growth", label: "Investment vs Balance" },
                        { id: "interest", label: "Interest vs Corpus" },
                        { id: "amort", label: "Amortization" },
                      ] as const
                    ).map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setChartMode(t.id)}
                        className={`px-3 py-1.5 rounded-full font-bold border transition-colors ${
                          chartMode === t.id
                            ? "bg-[#1A3B9F] text-white border-[#1A3B9F]"
                            : "bg-gray-50 text-gray-600 border-gray-200"
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="h-60 w-full">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 500 160" preserveAspectRatio="none">
                    <line x1="0" y1="20" x2="500" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="0" y1="90" x2="500" y2="90" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="0" y1="160" x2="500" y2="160" stroke="#e2e8f0" strokeWidth="1" />

                    {/* Polyline A (Corpus or Principal) */}
                    <polyline
                      fill="none"
                      stroke="#8DC63F"
                      strokeWidth="3"
                      points={results.chartPoints
                        .map((p, i) => {
                          const max = Math.max(
                            ...results.chartPoints.map((x) => Math.max(x.valA, x.valB))
                          );
                          const x = (i / (results.chartPoints.length - 1)) * 500;
                          const y = 160 - (p.valA / (max * 1.05 || 1)) * 140;
                          return `${x},${y}`;
                        })
                        .join(" ")}
                    />

                    {/* Polyline B (Loan balance or Interest) */}
                    <polyline
                      fill="none"
                      stroke="#E04E2B"
                      strokeWidth="2.5"
                      strokeDasharray="4 2"
                      points={results.chartPoints
                        .map((p, i) => {
                          const max = Math.max(
                            ...results.chartPoints.map((x) => Math.max(x.valA, x.valB))
                          );
                          const x = (i / (results.chartPoints.length - 1)) * 500;
                          const y = 160 - (p.valB / (max * 1.05 || 1)) * 140;
                          return `${x},${y}`;
                        })
                        .join(" ")}
                    />
                  </svg>
                </div>
              </div>

              {/* Scenarios Table */}
              <div className="border border-[rgba(26,59,159,0.1)] rounded-2xl overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead className="bg-[#0D1E52] text-white">
                    <tr>
                      <th className="p-3">Strategy</th>
                      <th className="p-3">Return</th>
                      <th className="p-3">Monthly SIP</th>
                      <th className="p-3">Nominal Corpus</th>
                      <th className="p-3">Real Corpus (Inflation)</th>
                      <th className="p-3">Total Invested</th>
                      <th className="p-3">Potential Offset</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {results.scenarios.map((sc, i) => (
                      <tr key={i} className={`hover:bg-[#EFF8E2]/50 ${sc.active ? "bg-[#EFF8E2]/30" : ""}`}>
                        <td className={`p-3 ${sc.cls}`}>{sc.label}</td>
                        <td className="p-3">{sc.ret}% p.a.</td>
                        <td className="p-3 font-semibold">{fmtINR(sc.sip)}</td>
                        <td className="p-3 font-bold text-[#1A3B9F]">{fmtINR(sc.corp)}</td>
                        <td className="p-3">{fmtINR(sc.realC)}</td>
                        <td className="p-3">{fmtINR(sc.sipT)}</td>
                        <td className="p-3 font-bold text-[#6AA32A]">{sc.off}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── THE SHARMA VS PILLAI CASE STUDY ── */}
      <section className="py-16 sm:py-24 bg-[#091540] text-white">
        <div className="max-w-[1080px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#8DC63F] block mb-2">
              Real-Life Case Study
            </span>
            <h2 className="font-[var(--fd)] text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Two families. Identical loans. <br />
              <span className="text-[#8DC63F]">One twenty-year difference.</span>
            </h2>
            <p className="text-sm text-white/70 font-light">
              In 2004, two colleagues in Bengaluru took identical ₹60 lakh home loans. Here is how their financial positions looked 20 years later.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Path A */}
            <div className="p-8 rounded-3xl bg-rose-950/40 border border-rose-500/30 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-rose-300 block mb-2">
                  Path A — The Sharmas
                </span>
                <h3 className="font-[var(--fd)] text-2xl font-bold text-white mb-3">
                  EMI Only · "We'll invest after the loan"
                </h3>
                <p className="text-sm text-white/70 font-light leading-relaxed mb-6">
                  Focused entirely on paying their ₹52,069 monthly EMI. For 20 years, no parallel wealth stream was maintained.
                </p>
              </div>

              <div className="pt-4 border-t border-rose-500/20 text-xs sm:text-sm text-white/90 space-y-1">
                <div>• Home Value: ~₹1.8 Cr</div>
                <div>• Total Interest Paid: <span className="text-rose-300 font-bold">₹64.9 Lakhs (Sunk)</span></div>
                <div>• Investment Corpus: <span className="text-white/50">~₹0</span></div>
              </div>
            </div>

            {/* Path B */}
            <div className="p-8 rounded-3xl bg-[#1A3B9F]/40 border border-[#8DC63F]/40 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#8DC63F] block mb-2">
                  Path B — The Pillais
                </span>
                <h3 className="font-[var(--fd)] text-2xl font-bold text-white mb-3">
                  EMI + ₹6,600/month Parallel SIP
                </h3>
                <p className="text-sm text-white/70 font-light leading-relaxed mb-6">
                  Invested an additional 12.7% of their EMI into diversified equity mutual funds starting Day One.
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 text-xs sm:text-sm text-white/90 space-y-1">
                <div>• Home Value: ~₹1.8 Cr</div>
                <div>• Total Interest Paid: ₹64.9 Lakhs</div>
                <div>• SIP Corpus Accrued: <span className="text-[#8DC63F] font-bold">~₹66.5 Lakhs*</span></div>
                <div className="text-[11px] text-[#8DC63F]">Corpus offset the interest outgo completely.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ACCORDION ── */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-[820px] mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#1A3B9F] block mb-2">
              FAQs
            </span>
            <h2 className="font-[var(--fd)] text-3xl font-bold text-[#091540] tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((f, idx) => (
              <div
                key={idx}
                className="border border-[rgba(26,59,159,0.12)] rounded-2xl p-4 sm:p-5 bg-[#F8FAFE]"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex justify-between items-center text-left font-bold text-sm sm:text-base text-[#091540] hover:text-[#1A3B9F] transition-colors"
                >
                  <span>{f.q}</span>
                  <span className="text-lg text-[#8DC63F] font-extrabold ml-3">
                    {openFaq === idx ? "−" : "+"}
                  </span>
                </button>
                {openFaq === idx && (
                  <p className="text-xs sm:text-sm text-[#4B5563] font-light leading-relaxed mt-3 pt-3 border-t border-gray-200">
                    {f.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <section className="py-16 bg-[#091540] text-white text-center">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="font-[var(--fd)] text-3xl font-bold mb-4">
            Build your personalised Home Loan Wealth Plan
          </h2>
          <p className="text-sm text-white/75 font-light mb-8">
            Speak to a MyAnmol advisor to match your loan amortization with a personalized SIP schedule.
          </p>
          <Link
            to="/wp/review"
            className="inline-flex items-center gap-2 bg-[#8DC63F] hover:bg-[#9ED64A] text-[#091540] font-extrabold text-sm px-8 py-3.5 rounded-full transition-all shadow-md"
          >
            Book Free Review Session →
          </Link>
        </div>
      </section>
    </div>
  );
}