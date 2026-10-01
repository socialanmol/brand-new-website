import React, { useState, useEffect, useId, useMemo } from 'react';

export default function InflationImpactCalculator() {
  const invCostId = useId();
  const inflationId = useId();
  const yearsId = useId();

  const [initialCost, setInitialCost] = useState<number>(2500000);
  const [inflationRate, setInflationRate] = useState<number>(6);
  const [years, setYears] = useState<number>(10);

  const [invCostText, setInvCostText] = useState<string>("25,00,000");
  const [inflationText, setInflationText] = useState<string>("6");
  const [yearsText, setYearsText] = useState<string>("10");

  useEffect(() => { setInvCostText(initialCost.toLocaleString('en-IN')); }, [initialCost]);
  useEffect(() => { setInflationText(inflationRate.toString()); }, [inflationRate]);
  useEffect(() => { setYearsText(years.toString()); }, [years]);

  const calculation = useMemo(() => {
    const P = Math.max(10000, isNaN(initialCost) ? 2500000 : initialCost);
    const I = Math.max(0, Math.min(30, isNaN(inflationRate) ? 6 : inflationRate));
    const Y = Math.max(1, Math.min(50, isNaN(years) ? 10 : years));

    // Future Cost Formula: FV = P * (1 + I / 100)^Y
    const futureCost = P * Math.pow(1 + I / 100, Y);
    const inflationImpact = Math.max(0, futureCost - P);

    return {
      initialCost: P,
      inflationRate: I,
      years: Y,
      futureCost: Math.round(futureCost),
      inflationImpact: Math.round(inflationImpact)
    };
  }, [initialCost, inflationRate, years]);

  const inr = (v: number) => Math.round(v).toLocaleString('en-IN');
  const rs = (v: number) => 'Rs. ' + inr(v);

  const C = 2 * Math.PI * 80;
  const gap = 2;
  const totalVal = calculation.initialCost + calculation.futureCost || 1;
  const invRatio = calculation.initialCost / totalVal;
  const a = invRatio * C;
  const b = C - a;
  const invDash = `${Math.max(a - gap, 0)} ${C}`;
  const futDash = `${b > gap ? b - gap : 0} ${C}`;
  const futOffset = -a;

  const handleDownloadPDF = (e: React.MouseEvent) => {
    e.preventDefault();
    window.print();
  };

  return (
    <div className="font-[var(--fs)] bg-white text-[#111827] antialiased py-10 px-5">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Top Header & Download PDF */}
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.14em] text-[#6AA32A] bg-[#EFF8E2] px-3 py-1.5 rounded-full mb-2">
              Purchasing Power Analysis
            </span>
            <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-bold text-[#091540]">
              Inflation Impact Calculator
            </h2>
          </div>
          <button
            onClick={handleDownloadPDF}
            className="inline-flex items-center gap-2 h-11 px-5 rounded-[8px] bg-[#1A3B9F] text-white font-extrabold text-xs hover:bg-[#132d7c] transition-all cursor-pointer shadow-sm border-0"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 4v11" /><path d="m7 10 5 5 5-5" /><path d="M5 20h14" /></svg>
            Download PDF
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-6 items-start">
          
          {/* Controls Card */}
          <div className="bg-white border border-[#E3E8F4] rounded-[20px] shadow-sm overflow-hidden p-7 space-y-7">
            
            {/* Field 1: Inv. Cost */}
            <div className="space-y-3">
              <div className="flex justify-between items-center gap-4 flex-wrap">
                <label htmlFor={invCostId} className="text-base font-bold text-[#111827]">
                  Inv. Cost (Rs)
                </label>
                <div className="flex items-center bg-[#EEF2FB] border border-transparent focus-within:border-[#1A3B9F] rounded-[8px] px-3.5 h-12 w-[190px]">
                  <input
                    id={invCostId}
                    type="text"
                    inputMode="numeric"
                    value={invCostText}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/[^0-9]/g, '');
                      setInvCostText(raw ? Number(raw).toLocaleString('en-IN') : '');
                      const val = Number(raw);
                      if (!isNaN(val)) setInitialCost(Math.min(100000000, Math.max(10000, val)));
                    }}
                    onBlur={() => {
                      const num = Number(invCostText.replace(/[^0-9]/g, '')) || 2500000;
                      const clamped = Math.min(100000000, Math.max(10000, num));
                      setInitialCost(clamped);
                      setInvCostText(clamped.toLocaleString('en-IN'));
                    }}
                    className="border-0 bg-transparent outline-0 font-['Nunito_Sans',sans-serif] text-xl font-extrabold text-[#1A3B9F] text-right w-full"
                  />
                  <span className="text-xs font-bold text-[#6B7280] ml-2">Rs</span>
                </div>
              </div>
              <input
                type="range"
                min="50000"
                max="10000000"
                step="50000"
                value={initialCost}
                onChange={(e) => setInitialCost(Number(e.target.value))}
                style={{ background: `linear-gradient(90deg, #1A3B9F 0 ${((initialCost - 50000) / (10000000 - 50000)) * 100}%, #E5E9F2 0 100%)` }}
                className="w-full h-2 rounded-full cursor-pointer appearance-none bg-[#E5E9F2] accent-[#1A3B9F]"
              />
            </div>

            {/* Field 2: Inflation */}
            <div className="space-y-3">
              <div className="flex justify-between items-center gap-4 flex-wrap">
                <label htmlFor={inflationId} className="text-base font-bold text-[#111827]">
                  Inflation (% per annum)
                </label>
                <div className="flex items-center bg-[#EEF2FB] border border-transparent focus-within:border-[#1A3B9F] rounded-[8px] px-3.5 h-12 w-[190px]">
                  <input
                    id={inflationId}
                    type="text"
                    inputMode="decimal"
                    value={inflationText}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/[^0-9.]/g, '');
                      setInflationText(raw);
                      const val = Number(raw);
                      if (!isNaN(val)) setInflationRate(Math.min(30, Math.max(0, val)));
                    }}
                    onBlur={() => {
                      const num = Number(inflationText.replace(/[^0-9.]/g, '')) || 6;
                      const clamped = Math.min(30, Math.max(0, num));
                      setInflationRate(clamped);
                      setInflationText(clamped.toString());
                    }}
                    className="border-0 bg-transparent outline-0 font-['Nunito_Sans',sans-serif] text-xl font-extrabold text-[#1A3B9F] text-right w-full"
                  />
                  <span className="text-xs font-bold text-[#6B7280] ml-2">%</span>
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="25"
                step="0.5"
                value={inflationRate}
                onChange={(e) => setInflationRate(Number(e.target.value))}
                style={{ background: `linear-gradient(90deg, #1A3B9F 0 ${(inflationRate / 25) * 100}%, #E5E9F2 0 100%)` }}
                className="w-full h-2 rounded-full cursor-pointer appearance-none bg-[#E5E9F2] accent-[#1A3B9F]"
              />
            </div>

            {/* Field 3: Number of Years */}
            <div className="space-y-3">
              <div className="flex justify-between items-center gap-4 flex-wrap">
                <label htmlFor={yearsId} className="text-base font-bold text-[#111827]">
                  Number of Years
                </label>
                <div className="flex items-center bg-[#EEF2FB] border border-transparent focus-within:border-[#1A3B9F] rounded-[8px] px-3.5 h-12 w-[190px]">
                  <input
                    id={yearsId}
                    type="text"
                    inputMode="numeric"
                    value={yearsText}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/[^0-9]/g, '');
                      setYearsText(raw);
                      const val = Number(raw);
                      if (!isNaN(val)) setYears(Math.min(50, Math.max(1, val)));
                    }}
                    onBlur={() => {
                      const num = Number(yearsText.replace(/[^0-9.]/g, '')) || 10;
                      const clamped = Math.min(50, Math.max(1, num));
                      setYears(clamped);
                      setYearsText(clamped.toString());
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
            </div>

          </div>

          {/* Results Side matching reference image */}
          <div className="flex flex-col gap-4">
            
            {/* Donut Chart Card */}
            <div className="bg-white border border-[#E3E8F4] rounded-[20px] shadow-sm p-6 flex flex-col items-center">
              <div className="relative w-[210px] h-[210px]">
                <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
                  <circle cx="100" cy="100" r="80" fill="none" strokeWidth="26" stroke="#FFC107" strokeDasharray={invDash} />
                  <circle cx="100" cy="100" r="80" fill="none" strokeWidth="26" stroke="#1A3B9F" strokeDasharray={futDash} strokeDashoffset={futOffset} />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                  <b className="font-[var(--fd)] text-xl text-[#091540]">{rs(calculation.futureCost)}</b>
                  <small className="text-[9px] font-extrabold text-[#6B7280] mt-1 tracking-widest">FUTURE COST</small>
                </div>
              </div>
              <div className="flex gap-6 flex-wrap justify-center mt-5 text-xs font-bold text-[#374151]">
                <span className="inline-flex items-center gap-2"><i className="w-3 h-3 rounded-[3px] bg-[#FFC107] inline-block" />Inv. Cost</span>
                <span className="inline-flex items-center gap-2"><i className="w-3 h-3 rounded-[3px] bg-[#1A3B9F] inline-block" />Future Cost</span>
              </div>
            </div>

            {/* Bottom 4 Summary Metric Cards matching design */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#FFFDF0] border border-[#FFE8A3] rounded-[16px] p-4 text-center shadow-sm">
                <div className="text-[11px] font-semibold text-[#856404]">Inv. Cost</div>
                <div className="text-base font-extrabold text-[#D97706] mt-1">{rs(calculation.initialCost)}</div>
              </div>
              <div className="bg-[#FFFDF0] border border-[#FFE8A3] rounded-[16px] p-4 text-center shadow-sm">
                <div className="text-[11px] font-semibold text-[#856404]">Inflation (% per annum)</div>
                <div className="text-base font-extrabold text-[#D97706] mt-1">{calculation.inflationRate} %</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#EEF2FB] border border-[#C5D3F2] rounded-[16px] p-4 text-center shadow-sm">
                <div className="text-[11px] font-semibold text-[#1A3B9F]">Number of Years</div>
                <div className="text-base font-extrabold text-[#1A3B9F] mt-1">{calculation.years} Years</div>
              </div>
              <div className="bg-[#EEF2FB] border border-[#C5D3F2] rounded-[16px] p-4 text-center shadow-sm">
                <div className="text-[11px] font-semibold text-[#1A3B9F]">Future Cost</div>
                <div className="text-base font-extrabold text-[#1A3B9F] mt-1">{rs(calculation.futureCost)}</div>
              </div>
            </div>

          </div>

        </div>

        <p className="mt-8 text-xs text-[#6B7280] leading-relaxed">
          <b>Disclaimer:</b> Inflation impact calculations are for illustrative purposes and demonstrate how purchasing power degrades over time. Actual inflation rates vary. Anmol Share Broking Pvt. Ltd. — AMFI-registered Mutual Fund Distributor, ARN: 114893.
        </p>

      </div>
    </div>
  );
}