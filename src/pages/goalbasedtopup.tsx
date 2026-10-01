import React, { useState, useEffect, useId, useMemo } from 'react';

export default function GoalBasedSipTopUpCalculator() {
  const goalId = useId();
  const yrsId = useId();
  const rateId = useId();
  const infId = useId();
  const topUpId = useId();

  const [targetGoal, setTargetGoal] = useState<number>(5000000);
  const [years, setYears] = useState<number>(30);
  const [returnRate, setReturnRate] = useState<number>(12);
  const [inflationRate, setInflationRate] = useState<number>(5);
  const [topUpPercent, setTopUpPercent] = useState<number>(10);

  const [goalText, setGoalText] = useState<string>("50,00,000");
  const [yrsText, setYrsText] = useState<string>("30");
  const [rateText, setRateText] = useState<string>("12");
  const [infText, setInfText] = useState<string>("5");
  const [topUpText, setTopUpText] = useState<string>("10");

  useEffect(() => { setGoalText(targetGoal.toLocaleString('en-IN')); }, [targetGoal]);
  useEffect(() => { setYrsText(years.toString()); }, [years]);
  useEffect(() => { setRateText(returnRate.toString()); }, [returnRate]);
  useEffect(() => { setInfText(inflationRate.toString()); }, [inflationRate]);
  useEffect(() => { setTopUpText(topUpPercent.toString()); }, [topUpPercent]);

  const calculation = useMemo(() => {
    const G = Math.max(10000, isNaN(targetGoal) ? 5000000 : targetGoal);
    const Y = Math.max(1, Math.min(50, isNaN(years) ? 30 : years));
    const R = Math.max(1, Math.min(30, isNaN(returnRate) ? 12 : returnRate));
    const I = Math.max(0, Math.min(20, isNaN(inflationRate) ? 5 : inflationRate));
    const T = Math.max(0, Math.min(50, isNaN(topUpPercent) ? 10 : topUpPercent));

    // Inflation Adjusted Targeted Amount = G * (1 + I/100)^Y
    const inflatedGoal = G * Math.pow(1 + I / 100, Y);
    const monthlyRate = Math.pow(1 + R / 100, 1 / 12) - 1;
    const totalMonths = Y * 12;

    // To find the initial monthly SIP required for a goal-based step-up SIP:
    // We can solve via binary search for base SIP (S_init) such that the final compounded value with annual top-ups equals inflatedGoal.
    let low = 10;
    let high = inflatedGoal;
    let bestSIP = 1000;

    for (let iter = 0; iter < 60; iter++) {
      const mid = (low + high) / 2;
      let curSip = mid;
      let totalVal = 0;

      for (let y = 1; y <= Y; y++) {
        for (let m = 1; m <= 12; m++) {
          totalVal = (totalVal + curSip) * (1 + monthlyRate);
        }
        if (y < Y) {
          curSip = curSip * (1 + T / 100);
        }
      }

      if (totalVal < inflatedGoal) {
        low = mid;
      } else {
        high = mid;
        bestSIP = mid;
      }
    }

    // Now simulate year by year with bestSIP
    let curSip = bestSIP;
    let totalInvested = 0;
    let totalVal = 0;
    const yearlyRows = [];

    for (let y = 1; y <= Y; y++) {
      let yearInvested = 0;
      let sipStart = curSip;

      for (let m = 1; m <= 12; m++) {
        totalInvested += curSip;
        yearInvested += curSip;
        totalVal = (totalVal + curSip) * (1 + monthlyRate);
      }

      yearlyRows.push({
        year: `Year ${y}`,
        sipPerMonth: Math.round(sipStart),
        investedThisYear: Math.round(yearInvested),
        totalInvestedCumulative: Math.round(totalInvested)
      });

      if (y < Y) {
        curSip = curSip * (1 + T / 100);
      }
    }

    const totalGrowth = Math.max(0, totalVal - totalInvested);

    return {
      inflatedGoal,
      initialSip: Math.round(bestSIP),
      totalInvested: Math.round(totalInvested),
      totalGrowth: Math.round(totalGrowth),
      finalAmount: Math.round(totalVal),
      yearlyRows
    };
  }, [targetGoal, years, returnRate, inflationRate, topUpPercent]);

  const inr = (v: number) => Math.round(v).toLocaleString('en-IN');
  const rs = (v: number) => 'Rs. ' + inr(v);

  // Donut metrics
  const C = 2 * Math.PI * 80;
  const gap = 2;
  const invRatio = calculation.finalAmount > 0 ? calculation.totalInvested / calculation.finalAmount : 0;
  const a = invRatio * C;
  const b = C - a;
  const invDash = `${Math.max(a - gap, 0)} ${C}`;
  const grDash = `${b > gap ? b - gap : 0} ${C}`;
  const grOffset = -a;

  const handleDownloadPDF = (e: React.MouseEvent) => {
    e.preventDefault();
    window.print();
  };

  return (
    <div className="font-[var(--fs)] bg-white text-[#111827] antialiased min-h-screen py-10 px-5">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Top Header & PDF Action */}
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.14em] text-[#6AA32A] bg-[#EFF8E2] px-3 py-1.5 rounded-full mb-2">
              Advanced Goal Architecture
            </span>
            <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-bold text-[#091540]">
              Goal-Based SIP Top-Up Calculator
            </h2>
          </div>
          <button
            onClick={handleDownloadPDF}
            className="inline-flex items-center gap-2 h-11 px-5 rounded-[8px] bg-[#1A3B9F] text-white font-extrabold text-xs hover:bg-[#132d7c] transition-all cursor-pointer shadow-sm border-0"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 4v11" /><path d="m7 10 5 5 5-5" /><path d="M5 20h14" /></svg>
            Download PDF / Print
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-6 items-start">
          
          {/* Controls Card */}
          <div className="bg-white border border-[#E3E8F4] rounded-[20px] shadow-sm overflow-hidden">
            
            {/* Field 1: Financial Goal */}
            <div className="p-7 border-b border-[#E3E8F4]">
              <div className="flex justify-between items-center gap-4 mb-4 flex-wrap">
                <label htmlFor={goalId} className="text-base font-bold text-[#111827] flex-1 min-w-[220px]">
                  Your Financial Goal (Rs)
                  <span className="block text-xs font-semibold text-[#6B7280] mt-0.5">At today's cost</span>
                </label>
                <div className="flex items-center bg-[#EEF2FB] border border-transparent focus-within:border-[#1A3B9F] rounded-[8px] px-3.5 h-12 w-[190px]">
                  <input
                    id={goalId}
                    type="text"
                    inputMode="numeric"
                    value={goalText}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/[^0-9]/g, '');
                      setGoalText(raw ? Number(raw).toLocaleString('en-IN') : '');
                      const val = Number(raw);
                      if (!isNaN(val)) setTargetGoal(Math.min(100000000, Math.max(10000, val)));
                    }}
                    onBlur={() => {
                      const num = Number(goalText.replace(/[^0-9]/g, '')) || 100000;
                      const clamped = Math.min(100000000, Math.max(10000, num));
                      setTargetGoal(clamped);
                      setGoalText(clamped.toLocaleString('en-IN'));
                    }}
                    className="border-0 bg-transparent outline-0 font-['Nunito_Sans',sans-serif] text-xl font-extrabold text-[#1A3B9F] text-right w-full"
                  />
                  <span className="text-xs font-bold text-[#6B7280] ml-2">Rs</span>
                </div>
              </div>
              <input
                type="range"
                min="50000"
                max="50000000"
                step="50000"
                value={targetGoal}
                onChange={(e) => setTargetGoal(Number(e.target.value))}
                style={{ background: `linear-gradient(90deg, #1A3B9F 0 ${((targetGoal - 50000) / (50000000 - 50000)) * 100}%, #E5E9F2 0 100%)` }}
                className="w-full h-2 rounded-full cursor-pointer appearance-none bg-[#E5E9F2] accent-[#1A3B9F]"
              />
              <div className="flex justify-between mt-3 text-xs font-bold text-[#6B7280]">
                <i>Rs. 50K</i><i>Rs. 1.25Cr</i><i>Rs. 2.5Cr</i><i>Rs. 3.75Cr</i><i>Rs. 5Cr</i>
              </div>
            </div>

            {/* Field 2: Investment Period */}
            <div className="p-7 border-b border-[#E3E8F4]">
              <div className="flex justify-between items-center gap-4 mb-4 flex-wrap">
                <label htmlFor={yrsId} className="text-base font-bold text-[#111827] flex-1 min-w-[220px]">
                  Investment Period (Years)
                  <span className="block text-xs font-semibold text-[#6B7280] mt-0.5">{years} Years</span>
                </label>
                <div className="flex items-center bg-[#EEF2FB] border border-transparent focus-within:border-[#1A3B9F] rounded-[8px] px-3.5 h-12 w-[190px]">
                  <input
                    id={yrsId}
                    type="text"
                    inputMode="numeric"
                    value={yrsText}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/[^0-9]/g, '');
                      setYrsText(raw);
                      const val = Number(raw);
                      if (!isNaN(val)) setYears(Math.min(50, Math.max(1, val)));
                    }}
                    onBlur={() => {
                      const num = Number(yrsText.replace(/[^0-9]/g, '')) || 10;
                      const clamped = Math.min(50, Math.max(1, num));
                      setYears(clamped);
                      setYrsText(clamped.toString());
                    }}
                    className="border-0 bg-transparent outline-0 font-['Nunito_Sans',sans-serif] text-xl font-extrabold text-[#1A3B9F] text-right w-full"
                  />
                  <span className="text-xs font-bold text-[#6B7280] ml-2">Years</span>
                </div>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                step="1"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                style={{ background: `linear-gradient(90deg, #1A3B9F 0 ${((years - 1) / (50 - 1)) * 100}%, #E5E9F2 0 100%)` }}
                className="w-full h-2 rounded-full cursor-pointer appearance-none bg-[#E5E9F2] accent-[#1A3B9F]"
              />
              <div className="flex justify-between mt-3 text-xs font-bold text-[#6B7280]">
                <i>1 Yr</i><i>12 Yrs</i><i>25 Yrs</i><i>37 Yrs</i><i>50 Yrs</i>
              </div>
            </div>

            {/* Field 3: Expected Return Rate */}
            <div className="p-7 border-b border-[#E3E8F4]">
              <div className="flex justify-between items-center gap-4 mb-4 flex-wrap">
                <label htmlFor={rateId} className="text-base font-bold text-[#111827] flex-1 min-w-[220px]">
                  What rate of return do you expect? (% per annum)
                  <span className="block text-xs font-semibold text-[#6B7280] mt-0.5">% p.a.</span>
                </label>
                <div className="flex items-center bg-[#EEF2FB] border border-transparent focus-within:border-[#1A3B9F] rounded-[8px] px-3.5 h-12 w-[190px]">
                  <input
                    id={rateId}
                    type="text"
                    inputMode="decimal"
                    value={rateText}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/[^0-9.]/g, '');
                      setRateText(raw);
                      const val = Number(raw);
                      if (!isNaN(val)) setReturnRate(Math.min(30, Math.max(1, val)));
                    }}
                    onBlur={() => {
                      const num = Number(rateText.replace(/[^0-9.]/g, '')) || 12;
                      const clamped = Math.min(30, Math.max(1, num));
                      setReturnRate(clamped);
                      setRateText(clamped.toString());
                    }}
                    className="border-0 bg-transparent outline-0 font-['Nunito_Sans',sans-serif] text-xl font-extrabold text-[#1A3B9F] text-right w-full"
                  />
                  <span className="text-xs font-bold text-[#6B7280] ml-2">%</span>
                </div>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                step="0.5"
                value={returnRate}
                onChange={(e) => setReturnRate(Number(e.target.value))}
                style={{ background: `linear-gradient(90deg, #1A3B9F 0 ${((returnRate - 1) / (30 - 1)) * 100}%, #E5E9F2 0 100%)` }}
                className="w-full h-2 rounded-full cursor-pointer appearance-none bg-[#E5E9F2] accent-[#1A3B9F]"
              />
              <div className="flex justify-between mt-3 text-xs font-bold text-[#6B7280]">
                <i>1%</i><i>8%</i><i>15%</i><i>22%</i><i>30%</i>
              </div>
            </div>

            {/* Field 4: Expected Inflation Rate */}
            <div className="p-7 border-b border-[#E3E8F4]">
              <div className="flex justify-between items-center gap-4 mb-4 flex-wrap">
                <label htmlFor={infId} className="text-base font-bold text-[#111827] flex-1 min-w-[220px]">
                  The expected rate of inflation over the years (% per annum)
                  <span className="block text-xs font-semibold text-[#6B7280] mt-0.5">% p.a.</span>
                </label>
                <div className="flex items-center bg-[#EEF2FB] border border-transparent focus-within:border-[#1A3B9F] rounded-[8px] px-3.5 h-12 w-[190px]">
                  <input
                    id={infId}
                    type="text"
                    inputMode="decimal"
                    value={infText}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/[^0-9.]/g, '');
                      setInfText(raw);
                      const val = Number(raw);
                      if (!isNaN(val)) setInflationRate(Math.min(20, Math.max(0, val)));
                    }}
                    onBlur={() => {
                      const num = Number(infText.replace(/[^0-9.]/g, '')) || 5;
                      const clamped = Math.min(20, Math.max(0, num));
                      setInflationRate(clamped);
                      setInfText(clamped.toString());
                    }}
                    className="border-0 bg-transparent outline-0 font-['Nunito_Sans',sans-serif] text-xl font-extrabold text-[#1A3B9F] text-right w-full"
                  />
                  <span className="text-xs font-bold text-[#6B7280] ml-2">%</span>
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                step="0.5"
                value={inflationRate}
                onChange={(e) => setInflationRate(Number(e.target.value))}
                style={{ background: `linear-gradient(90deg, #1A3B9F 0 ${(inflationRate / 20) * 100}%, #E5E9F2 0 100%)` }}
                className="w-full h-2 rounded-full cursor-pointer appearance-none bg-[#E5E9F2] accent-[#1A3B9F]"
              />
              <div className="flex justify-between mt-3 text-xs font-bold text-[#6B7280]">
                <i>0%</i><i>5%</i><i>10%</i><i>15%</i><i>20%</i>
              </div>
            </div>

            {/* Field 5: SIP Top-Up Rate */}
            <div className="p-7">
              <div className="flex justify-between items-center gap-4 mb-4 flex-wrap">
                <label htmlFor={topUpId} className="text-base font-bold text-[#111827] flex-1 min-w-[220px]">
                  SIP Top-Up (% per annum)
                  <span className="block text-xs font-semibold text-[#6B7280] mt-0.5">% per annum annual increase</span>
                </label>
                <div className="flex items-center bg-[#EEF2FB] border border-transparent focus-within:border-[#1A3B9F] rounded-[8px] px-3.5 h-12 w-[190px]">
                  <input
                    id={topUpId}
                    type="text"
                    inputMode="numeric"
                    value={topUpText}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/[^0-9]/g, '');
                      setTopUpText(raw);
                      const val = Number(raw);
                      if (!isNaN(val)) setTopUpPercent(Math.min(50, Math.max(0, val)));
                    }}
                    onBlur={() => {
                      const num = Number(topUpText.replace(/[^0-9]/g, '')) || 10;
                      const clamped = Math.min(50, Math.max(0, num));
                      setTopUpPercent(clamped);
                      setTopUpText(clamped.toString());
                    }}
                    className="border-0 bg-transparent outline-0 font-['Nunito_Sans',sans-serif] text-xl font-extrabold text-[#1A3B9F] text-right w-full"
                  />
                  <span className="text-xs font-bold text-[#6B7280] ml-2">%</span>
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                step="1"
                value={topUpPercent}
                onChange={(e) => setTopUpPercent(Number(e.target.value))}
                style={{ background: `linear-gradient(90deg, #1A3B9F 0 ${(topUpPercent / 50) * 100}%, #E5E9F2 0 100%)` }}
                className="w-full h-2 rounded-full cursor-pointer appearance-none bg-[#E5E9F2] accent-[#1A3B9F]"
              />
              <div className="flex justify-between mt-3 text-xs font-bold text-[#6B7280]">
                <i>0%</i><i>12%</i><i>25%</i><i>37%</i><i>50%</i>
              </div>
            </div>

          </div>

          {/* Results Side */}
          <div className="flex flex-col gap-4">
            
            {/* Donut Chart Card */}
            <div className="bg-white border border-[#E3E8F4] rounded-[20px] shadow-sm p-6 flex flex-col items-center">
              <div className="relative w-[210px] h-[210px]">
                <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
                  <circle cx="100" cy="100" r="80" fill="none" strokeWidth="26" stroke="#FFC107" strokeDasharray={invDash} />
                  <circle cx="100" cy="100" r="80" fill="none" strokeWidth="26" stroke="#1A3B9F" strokeDasharray={grDash} strokeDashoffset={grOffset} />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <b className="font-[var(--fd)] text-2xl text-[#091540]">{(calculation.finalAmount / (calculation.totalInvested || 1)).toFixed(1)}x</b>
                  <small className="text-[10px] font-extrabold text-[#6B7280] mt-1 tracking-widest">CORPUS MULTIPLE</small>
                </div>
              </div>
              <div className="flex gap-6 flex-wrap justify-center mt-5 text-xs font-bold text-[#374151]">
                <span className="inline-flex items-center gap-2"><i className="w-3 h-3 rounded-[3px] bg-[#FFC107] inline-block" />Amount Invested</span>
                <span className="inline-flex items-center gap-2"><i className="w-3 h-3 rounded-[3px] bg-[#1A3B9F] inline-block" />Total Growth</span>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white border border-[#E3E8F4] rounded-[16px] p-4 text-center">
                <div className="text-[11px] font-semibold text-[#6B7280]">Your Targeted Amount (Inflation adjusted)</div>
                <div className="text-base font-extrabold text-[#1A3B9F] mt-1">{rs(calculation.inflatedGoal)}</div>
              </div>
              <div className="bg-white border border-[#E3E8F4] rounded-[16px] p-4 text-center">
                <div className="text-[11px] font-semibold text-[#6B7280]">Number of years to achieve your goal</div>
                <div className="text-base font-extrabold text-[#E65100] mt-1">{years} Years</div>
              </div>
            </div>

            <div className="bg-[#EEF2FB] border border-[#E3E8F4] rounded-[16px] p-4 text-center">
              <div className="text-[11px] font-semibold text-[#1A3B9F]">Total Amount Invested in {years} years</div>
              <div className="text-xs text-[#6B7280]">(Sum of all your monthly installments with annual Top-Up in Rs.)</div>
              <div className="text-xl font-extrabold text-[#1A3B9F] mt-1">{rs(calculation.totalInvested)}</div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white border border-[#E3E8F4] rounded-[16px] p-4 text-center">
                <div className="text-[11px] font-semibold text-[#6B7280]">Monthly SIP Amount (For the First Year in Rs.)</div>
                <div className="text-base font-extrabold text-[#1A3B9F] mt-1">{rs(calculation.initialSip)}</div>
              </div>
              <div className="bg-white border border-[#E3E8F4] rounded-[16px] p-4 text-center">
                <div className="text-[11px] font-semibold text-[#6B7280]">Total Growth Amount</div>
                <div className="text-base font-extrabold text-[#6AA32A] mt-1">{rs(calculation.totalGrowth)}</div>
              </div>
            </div>

            <div className="bg-[#1A3B9F] text-white rounded-[16px] p-5 text-center shadow-md">
              <div className="text-xs font-semibold opacity-80">Final Amount</div>
              <div className="text-2xl font-extrabold mt-1 text-[#8DC63F]">{rs(calculation.finalAmount)}</div>
            </div>

          </div>

        </div>

        {/* Year-by-Year Schedule Table */}
        <div className="mt-12 bg-white border border-[#E3E8F4] rounded-[20px] shadow-sm overflow-hidden">
          <div className="p-6 border-b border-[#E3E8F4] bg-[#EEF2FB]">
            <h3 className="font-[var(--fd)] text-xl font-bold text-[#091540]">Goal-Based Step-Up Amortization Schedule</h3>
            <p className="text-xs text-[#6B7280] mt-1">Yearly progression showing initial monthly commitment, annual step-up increments, and cumulative investment.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-white border-b border-[#E3E8F4] text-xs font-bold text-[#6B7280] uppercase tracking-wider">
                  <th className="p-4 pl-6">Year</th>
                  <th className="p-4">SIP Amount / Month</th>
                  <th className="p-4">Invested Amount / Year</th>
                  <th className="p-4 pr-6 text-right">Total Invested (Cumulative)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E3E8F4] text-[#374151]">
                {calculation.yearlyRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#F8FAFE] transition-colors">
                    <td className="p-4 pl-6 font-bold text-[#1A3B9F]">{row.year}</td>
                    <td className="p-4 font-semibold">{rs(row.sipPerMonth)}</td>
                    <td className="p-4">{rs(row.investedThisYear)}</td>
                    <td className="p-4 pr-6 text-right font-bold text-[#091540]">{rs(row.totalInvestedCumulative)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-8 text-xs text-[#6B7280] leading-relaxed">
          <b>Disclaimer:</b> Mutual fund investments are subject to market risks, read all scheme related documents carefully. Goal-based calculations assume constant annual inflation and return rates. Anmol Share Broking Pvt. Ltd. — AMFI-registered Mutual Fund Distributor, ARN: 114893.
        </p>

      </div>
    </div>
  );
}