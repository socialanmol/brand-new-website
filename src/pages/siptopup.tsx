import React, { useState, useEffect, useId, useMemo } from 'react';

export default function SipTopUpCalculator() {
  const amtId = useId();
  const yrsId = useId();
  const rateId = useId();
  const stepValId = useId();

  const [amt, setAmt] = useState<number>(25000);
  const [years, setYears] = useState<number>(25);
  const [rate, setRate] = useState<number>(12.5);
  const [stepMode, setStepMode] = useState<'percent' | 'amount'>('percent');
  const [stepValue, setStepValue] = useState<number>(10); // 10% or Rs 5000 etc

  const [amtText, setAmtText] = useState<string>("25,000");
  const [yrsText, setYrsText] = useState<string>("25");
  const [rateText, setRateText] = useState<string>("12.5");
  const [stepText, setStepText] = useState<string>("10");

  useEffect(() => {
    setAmtText(amt.toLocaleString('en-IN'));
  }, [amt]);

  useEffect(() => {
    setYrsText(years.toString());
  }, [years]);

  useEffect(() => {
    setRateText(rate.toString());
  }, [rate]);

  useEffect(() => {
    setStepText(stepValue.toString());
  }, [stepValue]);

  const projection = useMemo(() => {
    const P = Math.max(500, isNaN(amt) ? 25000 : amt);
    const Y = Math.max(1, Math.min(50, isNaN(years) ? 25 : years));
    const R = Math.max(1, Math.min(30, isNaN(rate) ? 12.5 : rate));
    const sv = Math.max(0, isNaN(stepValue) ? 10 : stepValue);

    const monthlyRate = Math.pow(1 + R / 100, 1 / 12) - 1;
    const totalMonths = Y * 12;

    // 1. Normal SIP Calculation
    let normalInv = 0;
    let normalVal = 0;
    const normalRows = [];

    for (let m = 1; m <= totalMonths; m++) {
      normalInv += P;
      // compounding value
      normalVal = (normalVal + P) * (1 + monthlyRate);
    }

    // Year by year breakdown for Normal & Step-Up
    let currentSip = P;
    let stepUpInv = 0;
    let stepUpVal = 0;
    const yearlyRows = [];

    for (let y = 1; y <= Y; y++) {
      let yearInv = 0;
      let startSipOfYear = currentSip;

      for (let m = 1; m <= 12; m++) {
        stepUpInv += currentSip;
        yearInv += currentSip;
        stepUpVal = (stepUpVal + currentSip) * (1 + monthlyRate);
      }

      yearlyRows.push({
        year: `Year ${y}`,
        sipPerMonth: Math.round(startSipOfYear),
        investedThisYear: Math.round(yearInv),
        totalInvestedCumulative: Math.round(stepUpInv),
        totalValueCumulative: Math.round(stepUpVal)
      });

      // Apply step-up for next year
      if (y < Y) {
        if (stepMode === 'percent') {
          currentSip = currentSip * (1 + sv / 100);
        } else {
          currentSip = currentSip + sv;
        }
      }
    }

    // Also calculate standard normal SIP year-by-year for comparison
    let normInvCum = 0;
    let normValCum = 0;
    const standardYearlyRows = [];
    for (let y = 1; y <= Y; y++) {
      let yrInv = 0;
      for (let m = 1; m <= 12; m++) {
        normInvCum += P;
        normValCum = (normValCum + P) * (1 + monthlyRate);
      }
      standardYearlyRows.push({
        year: `Year ${y}`,
        invested: Math.round(normInvCum),
        value: Math.round(normValCum)
      });
    }

    return {
      normal: {
        inv: P * totalMonths,
        fv: standardYearlyRows[standardYearlyRows.length - 1]?.value || 0,
        growth: (standardYearlyRows[standardYearlyRows.length - 1]?.value || 0) - (P * totalMonths)
      },
      stepUp: {
        inv: stepUpInv,
        fv: stepUpVal,
        growth: stepUpVal - stepUpInv
      },
      yearlyRows
    };
  }, [amt, years, rate, stepMode, stepValue]);

  const inr = (v: number) => Math.round(v).toLocaleString('en-IN');
  const rs = (v: number) => 'Rs. ' + inr(v);

  const multiple = (projection.stepUp.fv / (projection.stepUp.inv || 1)).toFixed(1);

  // SVG Donut metrics for StepUp
  const C = 2 * Math.PI * 80;
  const gap = 2;
  const invRatio = projection.stepUp.fv > 0 ? projection.stepUp.inv / projection.stepUp.fv : 0;
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
              Advanced Investment Planning
            </span>
            <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-bold text-[#091540]">
              SIP Top-Up (Step-Up) Calculator
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
            
            {/* Field 1: Monthly SIP */}
            <div className="p-7 border-b border-[#E3E8F4]">
              <div className="flex justify-between items-center gap-4 mb-4 flex-wrap">
                <label htmlFor={amtId} className="text-base font-bold text-[#111827] flex-1 min-w-[220px]">
                  How much can you invest through monthly SIP?
                  <span className="block text-xs font-semibold text-[#6B7280] mt-0.5">Rs. per month</span>
                </label>
                <div className="flex items-center bg-[#EEF2FB] border border-transparent focus-within:border-[#1A3B9F] rounded-[8px] px-3.5 h-12 w-[190px]">
                  <input
                    id={amtId}
                    type="text"
                    inputMode="numeric"
                    value={amtText}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/[^0-9]/g, '');
                      setAmtText(raw ? Number(raw).toLocaleString('en-IN') : '');
                      const val = Number(raw);
                      if (!isNaN(val)) setAmt(Math.min(10000000, Math.max(500, val)));
                    }}
                    onBlur={() => {
                      const num = Number(amtText.replace(/[^0-9]/g, '')) || 500;
                      const clamped = Math.min(10000000, Math.max(500, num));
                      setAmt(clamped);
                      setAmtText(clamped.toLocaleString('en-IN'));
                    }}
                    className="border-0 bg-transparent outline-0 font-['Nunito_Sans',sans-serif] text-xl font-extrabold text-[#1A3B9F] text-right w-full"
                  />
                  <span className="text-xs font-bold text-[#6B7280] ml-2">Rs</span>
                </div>
              </div>
              <input
                type="range"
                min="500"
                max="500000"
                step="500"
                value={amt}
                onChange={(e) => setAmt(Number(e.target.value))}
                style={{ background: `linear-gradient(90deg, #1A3B9F 0 ${((amt - 500) / (500000 - 500)) * 100}%, #E5E9F2 0 100%)` }}
                className="w-full h-2 rounded-full cursor-pointer appearance-none bg-[#E5E9F2] accent-[#1A3B9F]"
              />
              <div className="flex justify-between mt-3 text-xs font-bold text-[#6B7280]">
                <i>Rs. 500</i><i>Rs. 1.25L</i><i>Rs. 2.5L</i><i>Rs. 3.75L</i><i>Rs. 5L</i>
              </div>
            </div>

            {/* Field 2: Duration in Years */}
            <div className="p-7 border-b border-[#E3E8F4]">
              <div className="flex justify-between items-center gap-4 mb-4 flex-wrap">
                <label htmlFor={yrsId} className="text-base font-bold text-[#111827] flex-1 min-w-[220px]">
                  How many years will you continue the SIP?
                  <span className="block text-xs font-semibold text-[#6B7280] mt-0.5">{years} years</span>
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

            {/* Field 3: Expected Rate of Return */}
            <div className="p-7 border-b border-[#E3E8F4]">
              <div className="flex justify-between items-center gap-4 mb-4 flex-wrap">
                <label htmlFor={rateId} className="text-base font-bold text-[#111827] flex-1 min-w-[220px]">
                  What rate of return do you expect?
                  <span className="block text-xs font-semibold text-[#6B7280] mt-0.5">% per annum</span>
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
                      if (!isNaN(val)) setRate(Math.min(30, Math.max(1, val)));
                    }}
                    onBlur={() => {
                      const num = Number(rateText.replace(/[^0-9.]/g, '')) || 12;
                      const clamped = Math.min(30, Math.max(1, num));
                      setRate(clamped);
                      setRateText(clamped.toString());
                    }}
                    className="border-0 bg-transparent outline-0 font-['Nunito_Sans',sans-serif] text-xl font-extrabold text-[#1A3B9F] text-right w-full"
                  />
                  <span className="text-xs font-bold text-[#6B7280] ml-2">% per annum</span>
                </div>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                step="0.5"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                style={{ background: `linear-gradient(90deg, #1A3B9F 0 ${((rate - 1) / (30 - 1)) * 100}%, #E5E9F2 0 100%)` }}
                className="w-full h-2 rounded-full cursor-pointer appearance-none bg-[#E5E9F2] accent-[#1A3B9F]"
              />
              <div className="flex justify-between mt-3 text-xs font-bold text-[#6B7280]">
                <i>1%</i><i>8%</i><i>15%</i><i>22%</i><i>30%</i>
              </div>
            </div>

            {/* Field 4: Step-Up Mode & Value */}
            <div className="p-7">
              <div className="flex justify-between items-center gap-4 mb-4 flex-wrap">
                <div className="flex-1 min-w-[220px]">
                  <label htmlFor={stepValId} className="text-base font-bold text-[#111827] block">
                    How much percentage step up monthly SIP?
                  </label>
                  <div className="flex gap-4 mt-1.5">
                    <label className="inline-flex items-center gap-2 text-xs font-bold text-[#374151] cursor-pointer">
                      <input
                        type="radio"
                        name="stepMode"
                        checked={stepMode === 'percent'}
                        onChange={() => { setStepMode('percent'); setStepValue(10); }}
                        className="accent-[#1A3B9F]"
                      />
                      In Percent (%)
                    </label>
                    <label className="inline-flex items-center gap-2 text-xs font-bold text-[#374151] cursor-pointer">
                      <input
                        type="radio"
                        name="stepMode"
                        checked={stepMode === 'amount'}
                        onChange={() => { setStepMode('amount'); setStepValue(5000); }}
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
                      const num = Number(stepText.replace(/[^0-9]/g, '')) || (stepMode === 'percent' ? 10 : 5000);
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
                min={stepMode === 'percent' ? '1' : '500'}
                max={stepMode === 'percent' ? '50' : '50000'}
                step={stepMode === 'percent' ? '1' : '500'}
                value={stepValue}
                onChange={(e) => setStepValue(Number(e.target.value))}
                style={{ background: `linear-gradient(90deg, #1A3B9F 0 ${((stepValue - (stepMode === 'percent' ? 1 : 500)) / ((stepMode === 'percent' ? 50 : 50000) - (stepMode === 'percent' ? 1 : 500))) * 100}%, #E5E9F2 0 100%)` }}
                className="w-full h-2 rounded-full cursor-pointer appearance-none bg-[#E5E9F2] accent-[#1A3B9F]"
              />
              <div className="flex justify-between mt-3 text-xs font-bold text-[#6B7280]">
                <i>{stepMode === 'percent' ? '1%' : 'Rs. 500'}</i>
                <i>{stepMode === 'percent' ? '25%' : 'Rs. 25,000'}</i>
                <i>{stepMode === 'percent' ? '50%' : 'Rs. 50,000'}</i>
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
                  <b className="font-[var(--fd)] text-3xl text-[#091540]">{multiple}x</b>
                  <small className="text-[10px] font-extrabold text-[#6B7280] mt-1 tracking-widest">YOUR MONEY</small>
                </div>
              </div>
              <div className="flex gap-6 flex-wrap justify-center mt-5 text-xs font-bold text-[#374151]">
                <span className="inline-flex items-center gap-2"><i className="w-3 h-3 rounded-[3px] bg-[#FFC107] inline-block" />Total SIP Amount Invested</span>
                <span className="inline-flex items-center gap-2"><i className="w-3 h-3 rounded-[3px] bg-[#1A3B9F] inline-block" />Total Growth</span>
              </div>
            </div>

            {/* Standard SIP Summary Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white border border-[#E3E8F4] rounded-[16px] p-4 text-center">
                <div className="text-[11px] font-semibold text-[#6B7280]">Total SIP Amount Invested</div>
                <div className="text-base font-extrabold text-[#1A3B9F] mt-1">{rs(projection.normal.inv)}</div>
              </div>
              <div className="bg-white border border-[#E3E8F4] rounded-[16px] p-4 text-center">
                <div className="text-[11px] font-semibold text-[#6B7280]">Total Growth</div>
                <div className="text-base font-extrabold text-[#E65100] mt-1">{rs(projection.normal.growth)}</div>
              </div>
            </div>

            <div className="bg-[#EEF2FB] border border-[#E3E8F4] rounded-[16px] p-4 text-center">
              <div className="text-xs font-semibold text-[#1A3B9F]">Total Future Value (Normal SIP)</div>
              <div className="text-xl font-extrabold text-[#1A3B9F] mt-1">{rs(projection.normal.fv)}</div>
            </div>

            {/* Step-Up SIP Summary Cards */}
            <div className="grid grid-cols-2 gap-3 mt-2">
              <div className="bg-white border border-[#E3E8F4] rounded-[16px] p-4 text-center shadow-sm">
                <div className="text-[11px] font-semibold text-[#6B7280]">Total Invested with step up</div>
                <div className="text-base font-extrabold text-[#1A3B9F] mt-1">{rs(projection.stepUp.inv)}</div>
              </div>
              <div className="bg-white border border-[#E3E8F4] rounded-[16px] p-4 text-center shadow-sm">
                <div className="text-[11px] font-semibold text-[#6B7280]">Total Growth with step up</div>
                <div className="text-base font-extrabold text-[#6AA32A] mt-1">{rs(projection.stepUp.growth)}</div>
              </div>
            </div>

            <div className="bg-[#1A3B9F] text-white rounded-[16px] p-5 text-center shadow-md">
              <div className="text-xs font-semibold opacity-80">Total Future Value (With Step-Up)</div>
              <span className="text-[10px] opacity-70 block">(Your SIP Investment Amount + Growth with step up)</span>
              <div className="text-2xl font-extrabold mt-1 text-[#8DC63F]">{rs(projection.stepUp.fv)}</div>
            </div>

          </div>

        </div>

        {/* Year-by-Year Table Breakdown */}
        <div className="mt-12 bg-white border border-[#E3E8F4] rounded-[20px] shadow-sm overflow-hidden">
          <div className="p-6 border-b border-[#E3E8F4] bg-[#EEF2FB]">
            <h3 className="font-[var(--fd)] text-xl font-bold text-[#091540]">Year-by-Year Step-Up Projections</h3>
            <p className="text-xs text-[#6B7280] mt-1">Detailed schedule showing how your monthly commitment and corpus compound each year.</p>
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
                {projection.yearlyRows.map((row, idx) => (
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
          <b>Disclaimer:</b> Mutual fund investments are subject to market risks, read all scheme related documents carefully. This calculator is for illustration only and assumes annual step-up increments. Actual returns vary and are not guaranteed. Anmol Share Broking Pvt. Ltd. — AMFI-registered Mutual Fund Distributor, ARN: 114893.
        </p>

      </div>
    </div>
  );
}