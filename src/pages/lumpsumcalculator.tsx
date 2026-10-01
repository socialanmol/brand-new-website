import React, { useState, useEffect, useId, useMemo } from 'react';

export default function LumpsumCalculator() {
  const amtId = useId();
  const yrsId = useId();
  const rateId = useId();

  const [principal, setPrincipal] = useState<number>(5000000);
  const [years, setYears] = useState<number>(30);
  const [rate, setRate] = useState<number>(12);

  const [amtText, setAmtText] = useState<string>("50,00,000");
  const [yrsText, setYrsText] = useState<string>("30");
  const [rateText, setRateText] = useState<string>("12");

  useEffect(() => {
    setAmtText(principal.toLocaleString('en-IN'));
  }, [principal]);

  useEffect(() => {
    setYrsText(years.toString());
  }, [years]);

  useEffect(() => {
    setRateText(rate.toString());
  }, [rate]);

  const projection = useMemo(() => {
    const P = Math.max(1000, isNaN(principal) ? 5000000 : principal);
    const Y = Math.max(1, Math.min(50, isNaN(years) ? 30 : years));
    const R = Math.max(1, Math.min(30, isNaN(rate) ? 12 : rate));

    // Compound Interest Formula: A = P * (1 + R/100)^t
    const futureValue = P * Math.pow(1 + R / 100, Y);
    const totalGrowth = Math.max(0, futureValue - P);

    return {
      principal: P,
      years: Y,
      rate: R,
      futureValue,
      totalGrowth
    };
  }, [principal, years, rate]);

  const inr = (v: number) => Math.round(v).toLocaleString('en-IN');
  const rs = (v: number) => 'Rs. ' + inr(v);

  // SVG Donut metrics for Lumpsum
  const C = 2 * Math.PI * 80;
  const gap = 2;
  const invRatio = projection.futureValue > 0 ? projection.principal / projection.futureValue : 0;
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
              Wealth Growth Tool
            </span>
            <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-bold text-[#091540]">
              Lumpsum Calculator
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
            
            {/* Field 1: Lumpsum Amount */}
            <div className="p-7 border-b border-[#E3E8F4]">
              <div className="flex justify-between items-center gap-4 mb-4 flex-wrap">
                <label htmlFor={amtId} className="text-base font-bold text-[#111827] flex-1 min-w-[220px]">
                  How much lumpsum amount you want to invest?
                  <span className="block text-xs font-semibold text-[#6B7280] mt-0.5">Rs. total investment</span>
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
                      if (!isNaN(val)) setPrincipal(Math.min(100000000, Math.max(1000, val)));
                    }}
                    onBlur={() => {
                      const num = Number(amtText.replace(/[^0-9]/g, '')) || 1000;
                      const clamped = Math.min(100000000, Math.max(1000, num));
                      setPrincipal(clamped);
                      setAmtText(clamped.toLocaleString('en-IN'));
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

            {/* Field 2: Duration in Years */}
            <div className="p-7 border-b border-[#E3E8F4]">
              <div className="flex justify-between items-center gap-4 mb-4 flex-wrap">
                <label htmlFor={yrsId} className="text-base font-bold text-[#111827] flex-1 min-w-[220px]">
                  How many years after you need this amount?
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
            <div className="p-7">
              <div className="flex justify-between items-center gap-4 mb-4 flex-wrap">
                <label htmlFor={rateId} className="text-base font-bold text-[#111827] flex-1 min-w-[220px]">
                  Expected rate of return (% per annum)
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
                  <span className="text-xs font-bold text-[#6B7280] ml-2">% p.a.</span>
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
                  <b className="font-[var(--fd)] text-2xl text-[#091540]">{(projection.futureValue / (projection.principal || 1)).toFixed(1)}x</b>
                  <small className="text-[10px] font-extrabold text-[#6B7280] mt-1 tracking-widest">GROWTH MULTIPLE</small>
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
                <div className="text-[11px] font-semibold text-[#6B7280]">Your Lumpsum Amount</div>
                <div className="text-base font-extrabold text-[#1A3B9F] mt-1">{rs(projection.principal)}</div>
              </div>
              <div className="bg-white border border-[#E3E8F4] rounded-[16px] p-4 text-center">
                <div className="text-[11px] font-semibold text-[#6B7280]">Duration</div>
                <div className="text-base font-extrabold text-[#E65100] mt-1">{projection.years} Years</div>
              </div>
            </div>

            <div className="bg-[#EEF2FB] border border-[#E3E8F4] rounded-[16px] p-5 text-center shadow-sm">
              <div className="text-xs font-semibold text-[#1A3B9F]">Your Future Amount</div>
              <div className="text-2xl font-extrabold text-[#1A3B9F] mt-1">{rs(projection.futureValue)}</div>
              <div className="text-[11px] text-[#6B7280] mt-1">Includes total growth of {rs(projection.totalGrowth)}</div>
            </div>

          </div>

        </div>

        <p className="mt-8 text-xs text-[#6B7280] leading-relaxed">
          <b>Disclaimer:</b> Mutual fund investments are subject to market risks, read all scheme related documents carefully. This calculator is for illustration only and assumes a compound annual growth rate. Actual returns vary and are not guaranteed. Anmol Share Broking Pvt. Ltd. — AMFI-registered Mutual Fund Distributor, ARN: 114893.
        </p>

      </div>
    </div>
  );
}