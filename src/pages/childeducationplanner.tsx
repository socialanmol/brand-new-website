import React, { useState, useEffect, useId, useMemo } from 'react';

export default function ChildEducationPlanner() {
  const goalId = useId();
  const curAgeId = useId();
  const colAgeId = useId();
  const rateId = useId();
  const infId = useId();

  const [currentGoalCost, setCurrentGoalCost] = useState<number>(2500000);
  const [currentChildAge, setCurrentChildAge] = useState<number>(5);
  const [collegeAge, setCollegeAge] = useState<number>(18);
  const [returnRate, setReturnRate] = useState<number>(12);
  const [inflationRate, setInflationRate] = useState<number>(6);

  const [goalText, setGoalText] = useState<string>("25,00,000");
  const [curAgeText, setCurAgeText] = useState<string>("5");
  const [colAgeText, setColAgeText] = useState<string>("18");
  const [rateText, setRateText] = useState<string>("12");
  const [infText, setInfText] = useState<string>("6");

  useEffect(() => { setGoalText(currentGoalCost.toLocaleString('en-IN')); }, [currentGoalCost]);
  useEffect(() => { setCurAgeText(currentChildAge.toString()); }, [currentChildAge]);
  useEffect(() => { setColAgeText(collegeAge.toString()); }, [collegeAge]);
  useEffect(() => { setRateText(returnRate.toString()); }, [returnRate]);
  useEffect(() => { setInfText(inflationRate.toString()); }, [inflationRate]);

  const calculation = useMemo(() => {
    const G = Math.max(100000, isNaN(currentGoalCost) ? 2500000 : currentGoalCost);
    const cAge = Math.max(0, Math.min(17, isNaN(currentChildAge) ? 5 : currentChildAge));
    const tAge = Math.max(cAge + 1, Math.min(25, isNaN(collegeAge) ? 18 : collegeAge));
    const R = Math.max(1, Math.min(30, isNaN(returnRate) ? 12 : returnRate));
    const I = Math.max(0, Math.min(20, isNaN(inflationRate) ? 6 : inflationRate));

    const yearsToGoal = tAge - cAge;
    
    // Future Education Cost adjusted for education inflation
    const futureGoalCost = G * Math.pow(1 + I / 100, yearsToGoal);
    const monthlyRate = Math.pow(1 + R / 100, 1 / 12) - 1;
    const totalMonths = yearsToGoal * 12;

    // Monthly SIP required to reach futureGoalCost
    let monthlySipReq = 0;
    if (monthlyRate === 0) {
      monthlySipReq = futureGoalCost / totalMonths;
    } else {
      const denominator = ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate);
      monthlySipReq = denominator > 0 ? futureGoalCost / denominator : 0;
    }

    const totalInvested = monthlySipReq * totalMonths;
    const totalGrowth = Math.max(0, futureGoalCost - totalInvested);

    // Yearly schedule
    const yearlyRows = [];
    let cumulativeInvested = 0;
    let cumulativeVal = 0;

    for (let y = 1; y <= yearsToGoal; y++) {
      let yrInv = 0;
      for (let m = 1; m <= 12; m++) {
        cumulativeInvested += Math.round(monthlySipReq);
        yrInv += Math.round(monthlySipReq);
        cumulativeVal = (cumulativeVal + Math.round(monthlySipReq)) * (1 + monthlyRate);
      }
      yearlyRows.push({
        year: `Year ${y} (Child Age ${cAge + y})`,
        investedThisYear: Math.round(yrInv),
        totalInvestedCumulative: Math.round(cumulativeInvested),
        endCorpus: Math.round(cumulativeVal)
      });
    }

    return {
      yearsToGoal,
      futureGoalCost: Math.round(futureGoalCost),
      monthlySipReq: Math.round(monthlySipReq),
      totalInvested: Math.round(totalInvested),
      totalGrowth: Math.round(totalGrowth),
      yearlyRows
    };
  }, [currentGoalCost, currentChildAge, collegeAge, returnRate, inflationRate]);

  const inr = (v: number) => Math.round(v).toLocaleString('en-IN');
  const rs = (v: number) => 'Rs. ' + inr(v);

  // Donut metrics
  const C = 2 * Math.PI * 80;
  const gap = 2;
  const invRatio = calculation.futureGoalCost > 0 ? calculation.totalInvested / calculation.futureGoalCost : 0;
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
              Milestone Goal Architecture
            </span>
            <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-bold text-[#091540]">
              Child Education Planner
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
            
            {/* Field 1: Current Education Cost */}
            <div className="p-7 border-b border-[#E3E8F4]">
              <div className="flex justify-between items-center gap-4 mb-4 flex-wrap">
                <label htmlFor={goalId} className="text-base font-bold text-[#111827] flex-1 min-w-[220px]">
                  Education Cost Today (Rs)
                  <span className="block text-xs font-semibold text-[#6B7280] mt-0.5">Estimated cost if needed today</span>
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
                      if (!isNaN(val)) setCurrentGoalCost(Math.min(20000000, Math.max(100000, val)));
                    }}
                    onBlur={() => {
                      const num = Number(goalText.replace(/[^0-9]/g, '')) || 500000;
                      const clamped = Math.min(20000000, Math.max(100000, num));
                      setCurrentGoalCost(clamped);
                      setGoalText(clamped.toLocaleString('en-IN'));
                    }}
                    className="border-0 bg-transparent outline-0 font-['Nunito_Sans',sans-serif] text-xl font-extrabold text-[#1A3B9F] text-right w-full"
                  />
                  <span className="text-xs font-bold text-[#6B7280] ml-2">Rs</span>
                </div>
              </div>
              <input
                type="range"
                min="200000"
                max="10000000"
                step="100000"
                value={currentGoalCost}
                onChange={(e) => setCurrentGoalCost(Number(e.target.value))}
                style={{ background: `linear-gradient(90deg, #1A3B9F 0 ${((currentGoalCost - 200000) / (10000000 - 200000)) * 100}%, #E5E9F2 0 100%)` }}
                className="w-full h-2 rounded-full cursor-pointer appearance-none bg-[#E5E9F2] accent-[#1A3B9F]"
              />
              <div className="flex justify-between mt-3 text-xs font-bold text-[#6B7280]">
                <i>Rs. 2L</i><i>Rs. 25L</i><i>Rs. 50L</i><i>Rs. 75L</i><i>Rs. 1Cr</i>
              </div>
            </div>

            {/* Field 2: Current Child Age */}
            <div className="p-7 border-b border-[#E3E8F4]">
              <div className="flex justify-between items-center gap-4 mb-4 flex-wrap">
                <label htmlFor={curAgeId} className="text-base font-bold text-[#111827] flex-1 min-w-[220px]">
                  Current Child Age (Years)
                  <span className="block text-xs font-semibold text-[#6B7280] mt-0.5">{currentChildAge} Years old</span>
                </label>
                <div className="flex items-center bg-[#EEF2FB] border border-transparent focus-within:border-[#1A3B9F] rounded-[8px] px-3.5 h-12 w-[190px]">
                  <input
                    id={curAgeId}
                    type="text"
                    inputMode="numeric"
                    value={curAgeText}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/[^0-9]/g, '');
                      setCurAgeText(raw);
                      const val = Number(raw);
                      if (!isNaN(val)) setCurrentChildAge(Math.min(17, Math.max(0, val)));
                    }}
                    onBlur={() => {
                      const num = Number(curAgeText.replace(/[^0-9]/g, '')) || 5;
                      const clamped = Math.min(17, Math.max(0, num));
                      setCurrentChildAge(clamped);
                      setCurAgeText(clamped.toString());
                    }}
                    className="border-0 bg-transparent outline-0 font-['Nunito_Sans',sans-serif] text-xl font-extrabold text-[#1A3B9F] text-right w-full"
                  />
                  <span className="text-xs font-bold text-[#6B7280] ml-2">Yrs</span>
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="17"
                step="1"
                value={currentChildAge}
                onChange={(e) => setCurrentChildAge(Number(e.target.value))}
                style={{ background: `linear-gradient(90deg, #1A3B9F 0 ${(currentChildAge / 17) * 100}%, #E5E9F2 0 100%)` }}
                className="w-full h-2 rounded-full cursor-pointer appearance-none bg-[#E5E9F2] accent-[#1A3B9F]"
              />
              <div className="flex justify-between mt-3 text-xs font-bold text-[#6B7280]">
                <i>0 Yrs</i><i>4 Yrs</i><i>8 Yrs</i><i>12 Yrs</i><i>17 Yrs</i>
              </div>
            </div>

            {/* Field 3: College Entry Age */}
            <div className="p-7 border-b border-[#E3E8F4]">
              <div className="flex justify-between items-center gap-4 mb-4 flex-wrap">
                <label htmlFor={colAgeId} className="text-base font-bold text-[#111827] flex-1 min-w-[220px]">
                  Age When Higher Education Begins
                  <span className="block text-xs font-semibold text-[#6B7280] mt-0.5">{calculation.yearsToGoal} Years remaining</span>
                </label>
                <div className="flex items-center bg-[#EEF2FB] border border-transparent focus-within:border-[#1A3B9F] rounded-[8px] px-3.5 h-12 w-[190px]">
                  <input
                    id={colAgeId}
                    type="text"
                    inputMode="numeric"
                    value={colAgeText}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/[^0-9]/g, '');
                      setColAgeText(raw);
                      const val = Number(raw);
                      if (!isNaN(val)) setCollegeAge(Math.min(25, Math.max(currentChildAge + 1, val)));
                    }}
                    onBlur={() => {
                      const num = Number(colAgeText.replace(/[^0-9]/g, '')) || 18;
                      const clamped = Math.min(25, Math.max(currentChildAge + 1, num));
                      setCollegeAge(clamped);
                      setColAgeText(clamped.toString());
                    }}
                    className="border-0 bg-transparent outline-0 font-['Nunito_Sans',sans-serif] text-xl font-extrabold text-[#1A3B9F] text-right w-full"
                  />
                  <span className="text-xs font-bold text-[#6B7280] ml-2">Yrs</span>
                </div>
              </div>
              <input
                type="range"
                min={currentChildAge + 1}
                max="25"
                step="1"
                value={collegeAge}
                onChange={(e) => setCollegeAge(Number(e.target.value))}
                style={{ background: `linear-gradient(90deg, #1A3B9F 0 ${((collegeAge - (currentChildAge + 1)) / (25 - (currentChildAge + 1) || 1)) * 100}%, #E5E9F2 0 100%)` }}
                className="w-full h-2 rounded-full cursor-pointer appearance-none bg-[#E5E9F2] accent-[#1A3B9F]"
              />
              <div className="flex justify-between mt-3 text-xs font-bold text-[#6B7280]">
                <i>{currentChildAge + 1} Yrs</i><i>20 Yrs</i><i>25 Yrs</i>
              </div>
            </div>

            {/* Field 4: Expected Return Rate */}
            <div className="p-7 border-b border-[#E3E8F4]">
              <div className="flex justify-between items-center gap-4 mb-4 flex-wrap">
                <label htmlFor={rateId} className="text-base font-bold text-[#111827] flex-1 min-w-[220px]">
                  Expected Return (% per annum)
                  <span className="block text-xs font-semibold text-[#6B7280] mt-0.5">% p.a. while investing</span>
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
                style={{ background: `linear-gradient(90deg, #1A3B9F 0 ${((returnRate - 1) / 29) * 100}%, #E5E9F2 0 100%)` }}
                className="w-full h-2 rounded-full cursor-pointer appearance-none bg-[#E5E9F2] accent-[#1A3B9F]"
              />
              <div className="flex justify-between mt-3 text-xs font-bold text-[#6B7280]">
                <i>1%</i><i>8%</i><i>15%</i><i>22%</i><i>30%</i>
              </div>
            </div>

            {/* Field 5: Education Inflation Rate */}
            <div className="p-7">
              <div className="flex justify-between items-center gap-4 mb-4 flex-wrap">
                <label htmlFor={infId} className="text-base font-bold text-[#111827] flex-1 min-w-[220px]">
                  Education Inflation Rate (% p.a.)
                  <span className="block text-xs font-semibold text-[#6B7280] mt-0.5">Higher ed inflation is typically ~6-8%</span>
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
                      const num = Number(infText.replace(/[^0-9.]/g, '')) || 6;
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
                  <b className="font-[var(--fd)] text-2xl text-[#091540]">{(calculation.futureGoalCost / (calculation.totalInvested || 1)).toFixed(1)}x</b>
                  <small className="text-[10px] font-extrabold text-[#6B7280] mt-1 tracking-widest">CORPUS MULTIPLE</small>
                </div>
              </div>
              <div className="flex gap-6 flex-wrap justify-center mt-5 text-xs font-bold text-[#374151]">
                <span className="inline-flex items-center gap-2"><i className="w-3 h-3 rounded-[3px] bg-[#FFC107] inline-block" />Total Invested</span>
                <span className="inline-flex items-center gap-2"><i className="w-3 h-3 rounded-[3px] bg-[#1A3B9F] inline-block" />Total Growth</span>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white border border-[#E3E8F4] rounded-[16px] p-4 text-center">
                <div className="text-[11px] font-semibold text-[#6B7280]">Years to Higher Education</div>
                <div className="text-base font-extrabold text-[#1A3B9F] mt-1">{calculation.yearsToGoal} Years</div>
              </div>
              <div className="bg-white border border-[#E3E8F4] rounded-[16px] p-4 text-center">
                <div className="text-[11px] font-semibold text-[#6B7280]">Total Amount Invested</div>
                <div className="text-base font-extrabold text-[#E65100] mt-1">{rs(calculation.totalInvested)}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white border border-[#E3E8F4] rounded-[16px] p-4 text-center">
                <div className="text-[11px] font-semibold text-[#6B7280]">Total Growth Amount</div>
                <div className="text-base font-extrabold text-[#6AA32A] mt-1">{rs(calculation.totalGrowth)}</div>
              </div>
              <div className="bg-white border border-[#E3E8F4] rounded-[16px] p-4 text-center">
                <div className="text-[11px] font-semibold text-[#6B7280]">Inflation Adjusted Cost</div>
                <div className="text-base font-extrabold text-[#1A3B9F] mt-1">{rs(calculation.futureGoalCost)}</div>
              </div>
            </div>

            <div className="bg-[#1A3B9F] text-white rounded-[16px] p-5 text-center shadow-md">
              <div className="text-xs font-semibold opacity-80">Required Monthly SIP</div>
              <div className="text-2xl font-extrabold mt-1 text-[#8DC63F]">{rs(calculation.monthlySipReq)} / month</div>
            </div>

          </div>

        </div>

        {/* Year-by-Year Schedule Table */}
        <div className="mt-12 bg-white border border-[#E3E8F4] rounded-[20px] shadow-sm overflow-hidden">
          <div className="p-6 border-b border-[#E3E8F4] bg-[#EEF2FB]">
            <h3 className="font-[var(--fd)] text-xl font-bold text-[#091540]">Child Education Amortization Schedule</h3>
            <p className="text-xs text-[#6B7280] mt-1">Yearly progression showing annual investments, cumulative capital, and corpus growth toward your child's education goal.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-white border-b border-[#E3E8F4] text-xs font-bold text-[#6B7280] uppercase tracking-wider">
                  <th className="p-4 pl-6">Milestone Year</th>
                  <th className="p-4">Invested This Year</th>
                  <th className="p-4">Cumulative Invested</th>
                  <th className="p-4 pr-6 text-right">Ending Corpus Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E3E8F4] text-[#374151]">
                {calculation.yearlyRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#F8FAFE] transition-colors">
                    <td className="p-4 pl-6 font-bold text-[#1A3B9F]">{row.year}</td>
                    <td className="p-4 font-semibold">{rs(row.investedThisYear)}</td>
                    <td className="p-4 text-[#E65100]">{rs(row.totalInvestedCumulative)}</td>
                    <td className="p-4 pr-6 text-right font-bold text-[#091540]">{rs(row.endCorpus)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-8 text-xs text-[#6B7280] leading-relaxed">
          <b>Disclaimer:</b> Child education calculations illustrate how education inflation impacts future college costs and required monthly SIPs. Actual market returns and education inflation fluctuate. Anmol Share Broking Pvt. Ltd. — AMFI-registered Mutual Fund Distributor, ARN: 114893.
        </p>

      </div>
    </div>
  );
}