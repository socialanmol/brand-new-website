import React, { useState, useEffect, useId, useMemo } from 'react';

export default function CompoundingCalculator() {
  const princId = useId();
  const rateId = useId();
  const yrsId = useId();

  const [principal, setPrincipal] = useState<number>(2500000);
  const [rate, setRate] = useState<number>(12.5);
  const [years, setYears] = useState<number>(20);
  const [intervalMode, setIntervalMode] = useState<'Yearly' | 'Half Yearly' | 'Quarterly' | 'Monthly'>('Yearly');

  const [princText, setPrincText] = useState<string>("25,00,000");
  const [rateText, setRateText] = useState<string>("12.5");
  const [yrsText, setYrsText] = useState<string>("20");

  useEffect(() => {
    setPrincText(principal.toLocaleString('en-IN'));
  }, [principal]);

  useEffect(() => {
    setRateText(rate.toString());
  }, [rate]);

  useEffect(() => {
    setYrsText(years.toString());
  }, [years]);

  const calculation = useMemo(() => {
    const P = Math.max(1000, isNaN(principal) ? 2500000 : principal);
    const R = Math.max(0.1, Math.min(50, isNaN(rate) ? 12.5 : rate));
    const t = Math.max(1, Math.min(50, isNaN(years) ? 20 : years));

    let n = 1; // compounding frequency per year
    if (intervalMode === 'Half Yearly') n = 2;
    else if (intervalMode === 'Quarterly') n = 4;
    else if (intervalMode === 'Monthly') n = 12;

    // Compound Interest Formula: A = P * (1 + (R/100)/n)^(n*t)
    const annualRateDec = R / 100;
    const maturityAmount = P * Math.pow(1 + annualRateDec / n, n * t);
    const interestAmount = Math.max(0, maturityAmount - P);

    return {
      principal: P,
      rate: R,
      years: t,
      maturityAmount,
      interestAmount
    };
  }, [principal, rate, years, intervalMode]);

  const inr = (v: number) => Math.round(v).toLocaleString('en-IN');
  const rs = (v: number) => 'Rs. ' + inr(v);

  // SVG Donut metrics for Compounding
  const C = 2 * Math.PI * 80;
  const gap = 2;
  const princRatio = calculation.maturityAmount > 0 ? calculation.principal / calculation.maturityAmount : 0;
  const a = princRatio * C;
  const b = C - a;
  const princDash = `${Math.max(a - gap, 0)} ${C}`;
  const intDash = `${b > gap ? b - gap : 0} ${C}`;
  const intOffset = -a;

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
              Financial Intelligence
            </span>
            <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-bold text-[#091540]">
              Compounding Calculator
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
            
            {/* Field 1: Principal Amount */}
            <div className="p-7 border-b border-[#E3E8F4]">
              <div className="flex justify-between items-center gap-4 mb-4 flex-wrap">
                <label htmlFor={princId} className="text-base font-bold text-[#111827] flex-1 min-w-[220px]">
                  Principal Amount (Rs)
                  <span className="block text-xs font-semibold text-[#6B7280] mt-0.5">Initial investment</span>
                </label>
                <div className="flex items-center bg-[#EEF2FB] border border-transparent focus-within:border-[#1A3B9F] rounded-[8px] px-3.5 h-12 w-[190px]">
                  <input
                    id={princId}
                    type="text"
                    inputMode="numeric"
                    value={princText}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/[^0-9]/g, '');
                      setPrincText(raw ? Number(raw).toLocaleString('en-IN') : '');
                      const val = Number(raw);
                      if (!isNaN(val)) setPrincipal(Math.min(100000000, Math.max(1000, val)));
                    }}
                    onBlur={() => {
                      const num = Number(princText.replace(/[^0-9]/g, '')) || 1000;
                      const clamped = Math.min(100000000, Math.max(1000, num));
                      setPrincipal(clamped);
                      setPrincText(clamped.toLocaleString('en-IN'));
                    }}
                    className="border-0 bg-transparent outline-0 font-['Nunito_Sans',sans-serif] text-xl font-extrabold text-[#1A3B9F] text-right w-full"
                  />
                  <span className="text-xs font-bold text-[#6B7280] ml-2">Rs</span>
                </div>
              </div>
              <input
                type="range"
                min="1000"
                max="10000000"
                step="5000"
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                style={{ background: `linear-gradient(90deg, #1A3B9F 0 ${((principal - 1000) / (10000000 - 1000)) * 100}%, #E5E9F2 0 100%)` }}
                className="w-full h-2 rounded-full cursor-pointer appearance-none bg-[#E5E9F2] accent-[#1A3B9F]"
              />
              <div className="flex justify-between mt-3 text-xs font-bold text-[#6B7280]">
                <i>Rs. 1K</i><i>Rs. 25L</i><i>Rs. 50L</i><i>Rs. 75L</i><i>Rs. 1Cr</i>
              </div>
            </div>

            {/* Field 2: Interest Rate */}
            <div className="p-7 border-b border-[#E3E8F4]">
              <div className="flex justify-between items-center gap-4 mb-4 flex-wrap">
                <label htmlFor={rateId} className="text-base font-bold text-[#111827] flex-1 min-w-[220px]">
                  Interest Rate (% per annum)
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
                      if (!isNaN(val)) setRate(Math.min(30, Math.max(0.5, val)));
                    }}
                    onBlur={() => {
                      const num = Number(rateText.replace(/[^0-9.]/g, '')) || 12;
                      const clamped = Math.min(30, Math.max(0.5, num));
                      setRate(clamped);
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
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                style={{ background: `linear-gradient(90deg, #1A3B9F 0 ${((rate - 1) / (30 - 1)) * 100}%, #E5E9F2 0 100%)` }}
                className="w-full h-2 rounded-full cursor-pointer appearance-none bg-[#E5E9F2] accent-[#1A3B9F]"
              />
              <div className="flex justify-between mt-3 text-xs font-bold text-[#6B7280]">
                <i>1%</i><i>8%</i><i>15%</i><i>22%</i><i>30%</i>
              </div>
            </div>

            {/* Field 3: Period in Years */}
            <div className="p-7 border-b border-[#E3E8F4]">
              <div className="flex justify-between items-center gap-4 mb-4 flex-wrap">
                <label htmlFor={yrsId} className="text-base font-bold text-[#111827] flex-1 min-w-[220px]">
                  Period (in years)
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

            {/* Field 4: Compound Interval */}
            <div className="p-7">
              <div className="flex justify-between items-center gap-4 mb-4 flex-wrap">
                <div className="flex-1 min-w-[220px]">
                  <label className="text-base font-bold text-[#111827] block">
                    Compound interval
                  </label>
                  <span className="text-xs font-semibold text-[#6B7280]">{intervalMode} compounding frequency</span>
                </div>
                <div className="bg-[#EEF2FB] px-4 py-2.5 rounded-[8px] text-sm font-bold text-[#1A3B9F]">
                  {intervalMode}
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {(['Yearly', 'Half Yearly', 'Quarterly', 'Monthly'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setIntervalMode(mode)}
                    className={`py-2.5 px-2 rounded-[8px] text-xs font-extrabold transition-all border cursor-pointer ${
                      intervalMode === mode
                        ? 'bg-[#1A3B9F] text-white border-[#1A3B9F] shadow-sm'
                        : 'bg-white text-[#374151] border-[#E3E8F4] hover:bg-[#EEF2FB]'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Results Side */}
          <div className="flex flex-col gap-4">
            
            {/* Donut Chart Card */}
            <div className="bg-white border border-[#E3E8F4] rounded-[20px] shadow-sm p-6 flex flex-col items-center">
              <div className="relative w-[210px] h-[210px]">
                <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
                  <circle cx="100" cy="100" r="80" fill="none" strokeWidth="26" stroke="#FFC107" strokeDasharray={princDash} />
                  <circle cx="100" cy="100" r="80" fill="none" strokeWidth="26" stroke="#1A3B9F" strokeDasharray={intDash} strokeDashoffset={intOffset} />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <b className="font-[var(--fd)] text-2xl text-[#091540]">{(calculation.maturityAmount / (calculation.principal || 1)).toFixed(1)}x</b>
                  <small className="text-[10px] font-extrabold text-[#6B7280] mt-1 tracking-widest">MATURITY MULTIPLE</small>
                </div>
              </div>
              <div className="flex gap-6 flex-wrap justify-center mt-5 text-xs font-bold text-[#374151]">
                <span className="inline-flex items-center gap-2"><i className="w-3 h-3 rounded-[3px] bg-[#FFC107] inline-block" />Principal Amount</span>
                <span className="inline-flex items-center gap-2"><i className="w-3 h-3 rounded-[3px] bg-[#1A3B9F] inline-block" />Interest Amount</span>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white border border-[#E3E8F4] rounded-[16px] p-4 text-center">
                <div className="text-[11px] font-semibold text-[#6B7280]">Principal Amount</div>
                <div className="text-base font-extrabold text-[#1A3B9F] mt-1">{rs(calculation.principal)}</div>
              </div>
              <div className="bg-white border border-[#E3E8F4] rounded-[16px] p-4 text-center">
                <div className="text-[11px] font-semibold text-[#6B7280]">Interest Rate (% p.a.)</div>
                <div className="text-base font-extrabold text-[#E65100] mt-1">{calculation.rate}%</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white border border-[#E3E8F4] rounded-[16px] p-4 text-center">
                <div className="text-[11px] font-semibold text-[#6B7280]">Period</div>
                <div className="text-base font-extrabold text-[#1A3B9F] mt-1">{calculation.years} Years</div>
              </div>
              <div className="bg-white border border-[#E3E8F4] rounded-[16px] p-4 text-center">
                <div className="text-[11px] font-semibold text-[#6B7280]">Total Maturity Amount</div>
                <div className="text-sm font-extrabold text-[#6AA32A] mt-1">{rs(calculation.maturityAmount)}</div>
              </div>
            </div>

            <div className="bg-[#1A3B9F] text-white rounded-[16px] p-5 text-center shadow-md">
              <div className="text-xs font-semibold opacity-80">Compound Interest Earnings</div>
              <div className="text-2xl font-extrabold mt-1 text-[#8DC63F]">{rs(calculation.interestAmount)}</div>
            </div>

          </div>

        </div>

        <p className="mt-8 text-xs text-[#6B7280] leading-relaxed">
          <b>Disclaimer:</b> Compounding calculations are for illustrative purposes. Actual returns depend on applicable tax laws, compounding frequencies, and financial instruments. Anmol Share Broking Pvt. Ltd. — AMFI-registered Mutual Fund Distributor, ARN: 114893.
        </p>

      </div>
    </div>
  );
}