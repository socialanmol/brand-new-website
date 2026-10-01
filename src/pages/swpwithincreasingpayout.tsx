import React, { useState, useEffect, useId, useMemo } from 'react';

export default function SwpWithIncreasingPayoutCalculator() {
  const invId = useId();
  const wdrawId = useId();
  const yrsId = useId();
  const rateId = useId();
  const stepValId = useId();

  const [totalInvestment, setTotalInvestment] = useState<number>(5000000);
  const [withdrawalPerMonth, setWithdrawalPerMonth] = useState<number>(40000);
  const [years, setYears] = useState<number>(15);
  const [returnRate, setReturnRate] = useState<number>(12);
  const [stepMode, setStepMode] = useState<'percent' | 'amount'>('percent');
  const [stepValue, setStepValue] = useState<number>(5); // 5% annual increase

  const [invText, setInvText] = useState<string>("50,00,000");
  const [wdrawText, setWdrawText] = useState<string>("40,000");
  const [yrsText, setYrsText] = useState<string>("15");
  const [rateText, setRateText] = useState<string>("12");
  const [stepText, setStepText] = useState<string>("5");

  useEffect(() => { setInvText(totalInvestment.toLocaleString('en-IN')); }, [totalInvestment]);
  useEffect(() => { setWdrawText(withdrawalPerMonth.toLocaleString('en-IN')); }, [withdrawalPerMonth]);
  useEffect(() => { setYrsText(years.toString()); }, [years]);
  useEffect(() => { setRateText(returnRate.toString()); }, [returnRate]);
  useEffect(() => { setStepText(stepValue.toString()); }, [stepValue]);

  const calculation = useMemo(() => {
    const P = Math.max(10000, isNaN(totalInvestment) ? 5000000 : totalInvestment);
    const W_init = Math.max(500, isNaN(withdrawalPerMonth) ? 40000 : withdrawalPerMonth);
    const Y = Math.max(1, Math.min(40, isNaN(years) ? 15 : years));
    const R = Math.max(1, Math.min(30, isNaN(returnRate) ? 12 : returnRate));
    const sv = Math.max(0, isNaN(stepValue) ? 5 : stepValue);

    const monthlyRate = Math.pow(1 + R / 100, 1 / 12) - 1;
    const totalMonths = Y * 12;

    let balance = P;
    let totalWithdrawn = 0;
    let totalEarnings = 0;
    const yearlyRows = [];

    let currentYearWithdrawal = W_init;
    let currentYearStartBalance = P;
    let yearTotalWithdrawn = 0;

    for (let m = 1; m <= totalMonths; m++) {
      const yrNum = Math.ceil(m / 12);
      const monthInYear = (m - 1) % 12 + 1;

      // Beginning of month withdrawal with step-up at start of each new year
      if (monthInYear === 1 && yrNum > 1) {
        if (stepMode === 'percent') {
          currentYearWithdrawal = currentYearWithdrawal * (1 + sv / 100);
        } else {
          currentYearWithdrawal = currentYearWithdrawal + sv;
        }
      }

      const actualWithdrawal = Math.min(balance, currentYearWithdrawal);
      balance -= actualWithdrawal;
      totalWithdrawn += actualWithdrawal;
      yearTotalWithdrawn += actualWithdrawal;

      // Month growth
      const interestEarned = balance * monthlyRate;
      balance += interestEarned;
      totalEarnings += interestEarned;

      if (monthInYear === 12 || m === totalMonths) {
        yearlyRows.push({
          year: `Year ${yrNum}`,
          startBalance: Math.round(currentYearStartBalance),
          withdrawalPerMonth: Math.round(currentYearWithdrawal),
          withdrawn: Math.round(yearTotalWithdrawn),
          endBalance: Math.round(Math.max(0, balance))
        });
        currentYearStartBalance = Math.max(0, balance);
        yearTotalWithdrawn = 0;
      }
    }

    const finalValue = Math.max(0, balance);

    return {
      totalInvestment: P,
      totalWithdrawn: Math.round(totalWithdrawn),
      totalEarnings: Math.round(totalEarnings),
      finalValue: Math.round(finalValue),
      yearlyRows
    };
  }, [totalInvestment, withdrawalPerMonth, years, returnRate, stepMode, stepValue]);

  const inr = (v: number) => Math.round(v).toLocaleString('en-IN');
  const rs = (v: number) => 'Rs. ' + inr(v);

  // Donut metrics
  const C = 2 * Math.PI * 80;
  const gap = 2;
  const invRatio = calculation.totalWithdrawn > 0 ? Math.min(1, calculation.totalInvestment / (calculation.totalWithdrawn + calculation.finalValue || 1)) : 0;
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
              Inflation-Adjusted Income Generation
            </span>
            <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-bold text-[#091540]">
              SWP with Increasing Payout Calculator
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
            
            {/* Field 1: Total Investment */}
            <div className="p-7 border-b border-[#E3E8F4]">
              <div className="flex justify-between items-center gap-4 mb-4 flex-wrap">
                <label htmlFor={invId} className="text-base font-bold text-[#111827] flex-1 min-w-[220px]">
                  Total Investment Amount (Rs)
                  <span className="block text-xs font-semibold text-[#6B7280] mt-0.5">Initial corpus in fund</span>
                </label>
                <div className="flex items-center bg-[#EEF2FB] border border-transparent focus-within:border-[#1A3B9F] rounded-[8px] px-3.5 h-12 w-[190px]">
                  <input
                    id={invId}
                    type="text"
                    inputMode="numeric"
                    value={invText}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/[^0-9]/g, '');
                      setInvText(raw ? Number(raw).toLocaleString('en-IN') : '');
                      const val = Number(raw);
                      if (!isNaN(val)) setTotalInvestment(Math.min(100000000, Math.max(10000, val)));
                    }}
                    onBlur={() => {
                      const num = Number(invText.replace(/[^0-9]/g, '')) || 100000;
                      const clamped = Math.min(100000000, Math.max(10000, num));
                      setTotalInvestment(clamped);
                      setInvText(clamped.toLocaleString('en-IN'));
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
                value={totalInvestment}
                onChange={(e) => setTotalInvestment(Number(e.target.value))}
                style={{ background: `linear-gradient(90deg, #1A3B9F 0 ${((totalInvestment - 50000) / (50000000 - 50000)) * 100}%, #E5E9F2 0 100%)` }}
                className="w-full h-2 rounded-full cursor-pointer appearance-none bg-[#E5E9F2] accent-[#1A3B9F]"
              />
              <div className="flex justify-between mt-3 text-xs font-bold text-[#6B7280]">
                <i>Rs. 50K</i><i>Rs. 1.25Cr</i><i>Rs. 2.5Cr</i><i>Rs. 3.75Cr</i><i>Rs. 5Cr</i>
              </div>
            </div>

            {/* Field 2: Initial Withdrawal Per Month */}
            <div className="p-7 border-b border-[#E3E8F4]">
              <div className="flex justify-between items-center gap-4 mb-4 flex-wrap">
                <label htmlFor={wdrawId} className="text-base font-bold text-[#111827] flex-1 min-w-[220px]">
                  Initial Withdrawal Per Month (Rs)
                  <span className="block text-xs font-semibold text-[#6B7280] mt-0.5">₹ per month year 1 payout</span>
                </label>
                <div className="flex items-center bg-[#EEF2FB] border border-transparent focus-within:border-[#1A3B9F] rounded-[8px] px-3.5 h-12 w-[190px]">
                  <input
                    id={wdrawId}
                    type="text"
                    inputMode="numeric"
                    value={wdrawText}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/[^0-9]/g, '');
                      setWdrawText(raw ? Number(raw).toLocaleString('en-IN') : '');
                      const val = Number(raw);
                      if (!isNaN(val)) setWithdrawalPerMonth(Math.min(500000, Math.max(500, val)));
                    }}
                    onBlur={() => {
                      const num = Number(wdrawText.replace(/[^0-9]/g, '')) || 5000;
                      const clamped = Math.min(500000, Math.max(500, num));
                      setWithdrawalPerMonth(clamped);
                      setWdrawText(clamped.toLocaleString('en-IN'));
                    }}
                    className="border-0 bg-transparent outline-0 font-['Nunito_Sans',sans-serif] text-xl font-extrabold text-[#1A3B9F] text-right w-full"
                  />
                  <span className="text-xs font-bold text-[#6B7280] ml-2">Rs</span>
                </div>
              </div>
              <input
                type="range"
                min="1000"
                max="300000"
                step="1000"
                value={withdrawalPerMonth}
                onChange={(e) => setWithdrawalPerMonth(Number(e.target.value))}
                style={{ background: `linear-gradient(90deg, #1A3B9F 0 ${((withdrawalPerMonth - 1000) / (300000 - 1000)) * 100}%, #E5E9F2 0 100%)` }}
                className="w-full h-2 rounded-full cursor-pointer appearance-none bg-[#E5E9F2] accent-[#1A3B9F]"
              />
              <div className="flex justify-between mt-3 text-xs font-bold text-[#6B7280]">
                <i>₹1K</i><i>₹75k</i><i>₹1.5L</i><i>₹2.25L</i><i>₹3L</i>
              </div>
            </div>

            {/* Field 3: Withdrawal Period (Years) */}
            <div className="p-7 border-b border-[#E3E8F4]">
              <div className="flex justify-between items-center gap-4 mb-4 flex-wrap">
                <label htmlFor={yrsId} className="text-base font-bold text-[#111827] flex-1 min-w-[220px]">
                  Withdrawal Period (Years)
                  <span className="block text-xs font-semibold text-[#6B7280] mt-0.5">{years} Years duration</span>
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
                      if (!isNaN(val)) setYears(Math.min(40, Math.max(1, val)));
                    }}
                    onBlur={() => {
                      const num = Number(yrsText.replace(/[^0-9]/g, '')) || 10;
                      const clamped = Math.min(40, Math.max(1, num));
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
                max="40"
                step="1"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                style={{ background: `linear-gradient(90deg, #1A3B9F 0 ${((years - 1) / 39) * 100}%, #E5E9F2 0 100%)` }}
                className="w-full h-2 rounded-full cursor-pointer appearance-none bg-[#E5E9F2] accent-[#1A3B9F]"
              />
              <div className="flex justify-between mt-3 text-xs font-bold text-[#6B7280]">
                <i>1 Yr</i><i>10 Yrs</i><i>20 Yrs</i><i>30 Yrs</i><i>40 Yrs</i>
              </div>
            </div>

            {/* Field 4: Expected Return Rate */}
            <div className="p-7 border-b border-[#E3E8F4]">
              <div className="flex justify-between items-center gap-4 mb-4 flex-wrap">
                <label htmlFor={rateId} className="text-base font-bold text-[#111827] flex-1 min-w-[220px]">
                  Expected Return (% per annum)
                  <span className="block text-xs font-semibold text-[#6B7280] mt-0.5">% p.a. while withdrawing</span>
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

            {/* Field 5: Annual Payout Increase (Step-Up) */}
            <div className="p-7">
              <div className="flex justify-between items-center gap-4 mb-4 flex-wrap">
                <div className="flex-1 min-w-[220px]">
                  <label htmlFor={stepValId} className="text-base font-bold text-[#111827] block">
                    Annual Increase in Payout
                  </label>
                  <div className="flex gap-4 mt-1.5">
                    <label className="inline-flex items-center gap-2 text-xs font-bold text-[#374151] cursor-pointer">
                      <input
                        type="radio"
                        name="stepModeSWP"
                        checked={stepMode === 'percent'}
                        onChange={() => { setStepMode('percent'); setStepValue(5); }}
                        className="accent-[#1A3B9F]"
                      />
                      In Percent (%)
                    </label>
                    <label className="inline-flex items-center gap-2 text-xs font-bold text-[#374151] cursor-pointer">
                      <input
                        type="radio"
                        name="stepModeSWP"
                        checked={stepMode === 'amount'}
                        onChange={() => { setStepMode('amount'); setStepValue(2000); }}
                        className="accent-[#1A3B9F]"
                      />
                      In Amount (Rs.)
                    </label>
                  </div>
                </div>

                <div className="flex items-center bg-[#EEF2FB] border border-transparent focus-within:border-[#1A3B9F] rounded-[8px] px-3.5 h-12 w-[190px]">
                  <input
                    id={stepValId}
                    type="text"
                    inputMode="numeric"
                    value={stepText}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/[^0-9]/g, '');
                      setStepText(raw);
                      const val = Number(raw);
                      if (!isNaN(val)) setStepValue(val);
                    }}
                    onBlur={() => {
                      const num = Number(stepText.replace(/[^0-9]/g, '')) || (stepMode === 'percent' ? 5 : 2000);
                      setStepValue(num);
                      setStepText(num.toString());
                    }}
                    className="border-0 bg-transparent outline-0 font-['Nunito_Sans',sans-serif] text-xl font-extrabold text-[#1A3B9F] text-right w-full"
                  />
                  <span className="text-xs font-bold text-[#6B7280] ml-2">{stepMode === 'percent' ? '%' : 'Rs.'}</span>
                </div>
              </div>

              <input
                type="range"
                min={stepMode === 'percent' ? '0' : '500'}
                max={stepMode === 'percent' ? '25' : '20000'}
                step={stepMode === 'percent' ? '1' : '500'}
                value={stepValue}
                onChange={(e) => setStepValue(Number(e.target.value))}
                style={{ background: `linear-gradient(90deg, #1A3B9F 0 ${((stepValue - (stepMode === 'percent' ? 0 : 500)) / ((stepMode === 'percent' ? 25 : 20000) - (stepMode === 'percent' ? 0 : 500))) * 100}%, #E5E9F2 0 100%)` }}
                className="w-full h-2 rounded-full cursor-pointer appearance-none bg-[#E5E9F2] accent-[#1A3B9F]"
              />
              <div className="flex justify-between mt-3 text-xs font-bold text-[#6B7280]">
                <i>{stepMode === 'percent' ? '0%' : 'Rs. 500'}</i>
                <i>{stepMode === 'percent' ? '12%' : 'Rs. 10,000'}</i>
                <i>{stepMode === 'percent' ? '25%' : 'Rs. 20,000'}</i>
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
                  <b className="font-[var(--fd)] text-lg leading-tight text-[#091540]">{rs(calculation.finalValue)}</b>
                  <small className="text-[10px] font-extrabold text-[#6B7280] mt-1 tracking-widest">FINAL BALANCE</small>
                </div>
              </div>
              <div className="flex gap-6 flex-wrap justify-center mt-5 text-xs font-bold text-[#374151]">
                <span className="inline-flex items-center gap-2"><i className="w-3 h-3 rounded-[3px] bg-[#FFC107] inline-block" />Total Withdrawn</span>
                <span className="inline-flex items-center gap-2"><i className="w-3 h-3 rounded-[3px] bg-[#1A3B9F] inline-block" />Final Balance</span>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white border border-[#E3E8F4] rounded-[16px] p-4 text-center">
                <div className="text-[11px] font-semibold text-[#6B7280]">Initial Investment</div>
                <div className="text-base font-extrabold text-[#1A3B9F] mt-1">{rs(calculation.totalInvestment)}</div>
              </div>
              <div className="bg-white border border-[#E3E8F4] rounded-[16px] p-4 text-center">
                <div className="text-[11px] font-semibold text-[#6B7280]">Total Withdrawn</div>
                <div className="text-base font-extrabold text-[#E65100] mt-1">{rs(calculation.totalWithdrawn)}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white border border-[#E3E8F4] rounded-[16px] p-4 text-center">
                <div className="text-[11px] font-semibold text-[#6B7280]">Total Earnings</div>
                <div className="text-base font-extrabold text-[#6AA32A] mt-1">{rs(calculation.totalEarnings)}</div>
              </div>
              <div className="bg-white border border-[#E3E8F4] rounded-[16px] p-4 text-center">
                <div className="text-[11px] font-semibold text-[#6B7280]">Withdrawal Period</div>
                <div className="text-base font-extrabold text-[#1A3B9F] mt-1">{years} Years</div>
              </div>
            </div>

            <div className="bg-[#1A3B9F] text-white rounded-[16px] p-5 text-center shadow-md">
              <div className="text-xs font-semibold opacity-80">Ending Corpus Balance</div>
              <div className="text-2xl font-extrabold mt-1 text-[#8DC63F]">{rs(calculation.finalValue)}</div>
            </div>

          </div>

        </div>

        {/* Year-by-Year Schedule Table */}
        <div className="mt-12 bg-white border border-[#E3E8F4] rounded-[20px] shadow-sm overflow-hidden">
          <div className="p-6 border-b border-[#E3E8F4] bg-[#EEF2FB]">
            <h3 className="font-[var(--fd)] text-xl font-bold text-[#091540]">Increasing Payout SWP Amortization Schedule</h3>
            <p className="text-xs text-[#6B7280] mt-1">Yearly progression showing starting balance, escalating monthly payouts, annual total withdrawals, and remaining corpus.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-white border-b border-[#E3E8F4] text-xs font-bold text-[#6B7280] uppercase tracking-wider">
                  <th className="p-4 pl-6">Year</th>
                  <th className="p-4">Starting Balance</th>
                  <th className="p-4">Payout / Month</th>
                  <th className="p-4">Total Withdrawn (Year)</th>
                  <th className="p-4 pr-6 text-right">Ending Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E3E8F4] text-[#374151]">
                {calculation.yearlyRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#F8FAFE] transition-colors">
                    <td className="p-4 pl-6 font-bold text-[#1A3B9F]">{row.year}</td>
                    <td className="p-4 font-semibold">{rs(row.startBalance)}</td>
                    <td className="p-4 text-[#1A3B9F] font-bold">{rs(row.withdrawalPerMonth)}</td>
                    <td className="p-4 text-[#E65100]">{rs(row.withdrawn)}</td>
                    <td className="p-4 pr-6 text-right font-bold text-[#091540]">{rs(row.endBalance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-8 text-xs text-[#6B7280] leading-relaxed">
          <b>Disclaimer:</b> Systematic Withdrawal Plan (SWP) calculations with increasing payouts illustrate how inflation-adjusted cash flows impact corpus longevity. Actual market returns fluctuate. Anmol Share Broking Pvt. Ltd. — AMFI-registered Mutual Fund Distributor, ARN: 114893.
        </p>

      </div>
    </div>
  );
}