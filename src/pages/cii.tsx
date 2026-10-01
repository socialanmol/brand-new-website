import React, { useState, useId, useMemo } from 'react';

// Official Indian Income Tax Cost Inflation Index (CII) dataset
const CII_DATA: Record<string, number> = {
  "2001-02": 100,
  "2002-03": 105,
  "2003-04": 109,
  "2004-05": 113,
  "2005-06": 117,
  "2006-07": 122,
  "2007-08": 129,
  "2008-09": 137,
  "2009-10": 148,
  "2010-11": 167,
  "2011-12": 184,
  "2012-13": 200,
  "2013-14": 220,
  "2014-15": 240,
  "2015-16": 254,
  "2016-17": 264,
  "2017-18": 272,
  "2018-19": 280,
  "2019-20": 289,
  "2020-21": 301,
  "2021-22": 317,
  "2022-13": 331, // fallback
  "2022-23": 331,
  "2023-24": 348,
  "2024-25": 363,
  "2025-26": 375,
  "2026-27": 390
};

export default function CostInflationIndexCalculator() {
  const purchaseYearId = useId();
  const purchaseValId = useId();
  const salesYearId = useId();
  const saleValId = useId();

  const yearsList = Object.keys(CII_DATA);

  const [purchaseYear, setPurchaseYear] = useState<string>("2012-13");
  const [purchaseValue, setPurchaseValue] = useState<number>(200000);
  const [salesYear, setSalesYear] = useState<string>("2016-17");
  const [saleValue, setSaleValue] = useState<number>(500000);

  const [purchaseValText, setPurchaseValText] = useState<string>("2,00,000");
  const [saleValText, setSaleValText] = useState<string>("5,00,000");

  // Sync formatted text inputs
  React.useEffect(() => { setPurchaseValText(purchaseValue.toLocaleString('en-IN')); }, [purchaseValue]);
  React.useEffect(() => { setSaleValText(saleValue.toLocaleString('en-IN')); }, [saleValue]);

  const calculation = useMemo(() => {
    const P = Math.max(1000, isNaN(purchaseValue) ? 200000 : purchaseValue);
    const S = Math.max(1000, isNaN(saleValue) ? 500000 : saleValue);

    const ciiPurchase = CII_DATA[purchaseYear] || 200;
    const ciiSale = CII_DATA[salesYear] || 264;

    // Indexed Cost of Acquisition = Purchase Value * (CII of Sale Year / CII of Purchase Year)
    const indexedCost = Math.round(P * (ciiSale / ciiPurchase));
    const capitalGain = Math.max(0, S - indexedCost);

    // Standard LTCG tax rate on indexed capital gains for property/assets prior to recent amendments is typically 20% with indexation
    const taxPercentage = 20;
    const capitalGainTax = Math.round(capitalGain * (taxPercentage / 100));

    return {
      ciiPurchase,
      ciiSale,
      indexedCost,
      capitalGain,
      taxPercentage,
      capitalGainTax
    };
  }, [purchaseYear, purchaseValue, salesYear, saleValue]);

  const inr = (v: number) => Math.round(v).toLocaleString('en-IN');
  const rs = (v: number) => 'Rs. ' + inr(v);

  const handleDownloadPDF = (e: React.MouseEvent) => {
    e.preventDefault();
    window.print();
  };

  return (
    <div className="font-[var(--fs)] bg-white text-[#111827] antialiased py-10 px-5">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Top Header & PDF Action */}
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.14em] text-[#6AA32A] bg-[#EFF8E2] px-3 py-1.5 rounded-full mb-2">
              Tax & Inflation Indexation
            </span>
            <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-bold text-[#091540]">
              Cost Inflation Index (CII) Calculator
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
          <div className="bg-white border border-[#E3E8F4] rounded-[20px] shadow-sm overflow-hidden p-7 space-y-6">
            
            {/* Field 1: Purchase Year */}
            <div className="space-y-2">
              <label htmlFor={purchaseYearId} className="text-xs font-bold text-[#374151] block">
                Purchase Year
              </label>
              <div className="relative">
                <select
                  id={purchaseYearId}
                  value={purchaseYear}
                  onChange={(e) => setPurchaseYear(e.target.value)}
                  className="w-full bg-[#EEF2FB] border border-[#E3E8F4] rounded-[8px] px-4 h-12 text-sm font-bold text-[#1A3B9F] outline-0 appearance-none cursor-pointer"
                >
                  {yearsList.map((yr) => (
                    <option key={yr} value={yr}>{yr} (CII: {CII_DATA[yr]})</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#1A3B9F] text-xs">▼</div>
              </div>
            </div>

            {/* Field 2: Purchase Value */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor={purchaseValId} className="text-xs font-bold text-[#374151]">
                  Purchase Value
                </label>
              </div>
              <div className="flex items-center bg-[#EEF2FB] border border-transparent focus-within:border-[#1A3B9F] rounded-[8px] px-3.5 h-12">
                <input
                  id={purchaseValId}
                  type="text"
                  inputMode="numeric"
                  value={purchaseValText}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, '');
                    setPurchaseValText(raw ? Number(raw).toLocaleString('en-IN') : '');
                    const val = Number(raw);
                    if (!isNaN(val)) setPurchaseValue(Math.min(100000000, Math.max(10000, val)));
                  }}
                  onBlur={() => {
                    const num = Number(purchaseValText.replace(/[^0-9]/g, '')) || 200000;
                    const clamped = Math.min(100000000, Math.max(10000, num));
                    setPurchaseValue(clamped);
                    setPurchaseValText(clamped.toLocaleString('en-IN'));
                  }}
                  className="border-0 bg-transparent outline-0 font-['Nunito_Sans',sans-serif] text-base font-extrabold text-[#1A3B9F] text-right w-full"
                />
                <span className="text-xs font-bold text-[#6B7280] ml-2">Rs</span>
              </div>
              <input
                type="range"
                min="50000"
                max="10000000"
                step="25000"
                value={purchaseValue}
                onChange={(e) => setPurchaseValue(Number(e.target.value))}
                style={{ background: `linear-gradient(90deg, #1A3B9F 0 ${((purchaseValue - 50000) / (10000000 - 50000)) * 100}%, #E5E9F2 0 100%)` }}
                className="w-full h-2 rounded-full cursor-pointer appearance-none bg-[#E5E9F2] accent-[#1A3B9F]"
              />
            </div>

            {/* Field 3: Sales Year */}
            <div className="space-y-2 pt-2">
              <label htmlFor={salesYearId} className="text-xs font-bold text-[#374151] block">
                Sales Year
              </label>
              <div className="relative">
                <select
                  id={salesYearId}
                  value={salesYear}
                  onChange={(e) => setSalesYear(e.target.value)}
                  className="w-full bg-[#EEF2FB] border border-[#E3E8F4] rounded-[8px] px-4 h-12 text-sm font-bold text-[#1A3B9F] outline-0 appearance-none cursor-pointer"
                >
                  {yearsList.map((yr) => (
                    <option key={yr} value={yr}>{yr} (CII: {CII_DATA[yr]})</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#1A3B9F] text-xs">▼</div>
              </div>
            </div>

            {/* Field 4: Sale Value */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor={saleValId} className="text-xs font-bold text-[#374151]">
                  Sale Value
                </label>
              </div>
              <div className="flex items-center bg-[#EEF2FB] border border-transparent focus-within:border-[#1A3B9F] rounded-[8px] px-3.5 h-12">
                <input
                  id={saleValId}
                  type="text"
                  inputMode="numeric"
                  value={saleValText}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, '');
                    setSaleValText(raw ? Number(raw).toLocaleString('en-IN') : '');
                    const val = Number(raw);
                    if (!isNaN(val)) setSaleValue(Math.min(100000000, Math.max(10000, val)));
                  }}
                  onBlur={() => {
                    const num = Number(saleValText.replace(/[^0-9]/g, '')) || 500000;
                    const clamped = Math.min(100000000, Math.max(10000, num));
                    setSaleValue(clamped);
                    setSaleValText(clamped.toLocaleString('en-IN'));
                  }}
                  className="border-0 bg-transparent outline-0 font-['Nunito_Sans',sans-serif] text-base font-extrabold text-[#1A3B9F] text-right w-full"
                />
                <span className="text-xs font-bold text-[#6B7280] ml-2">Rs</span>
              </div>
              <input
                type="range"
                min="100000"
                max="20000000"
                step="50000"
                value={saleValue}
                onChange={(e) => setSaleValue(Number(e.target.value))}
                style={{ background: `linear-gradient(90deg, #1A3B9F 0 ${((saleValue - 100000) / (20000000 - 100000)) * 100}%, #E5E9F2 0 100%)` }}
                className="w-full h-2 rounded-full cursor-pointer appearance-none bg-[#E5E9F2] accent-[#1A3B9F]"
              />
            </div>

          </div>

          {/* Results Side */}
          <div className="flex flex-col gap-4">
            
            {/* Top metric cards matching screenshot design */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#FFF9E6] border border-[#FFE8A3] rounded-[16px] p-5 text-center shadow-sm">
                <div className="text-xs font-semibold text-[#856404]">Capital Gain</div>
                <div className="text-xl font-extrabold text-[#D97706] mt-1.5">{rs(calculation.capitalGain)}</div>
              </div>
              <div className="bg-[#FFF9E6] border border-[#FFE8A3] rounded-[16px] p-5 text-center shadow-sm">
                <div className="text-xs font-semibold text-[#856404]">Capital Gain Tax Percentage</div>
                <div className="text-xl font-extrabold text-[#D97706] mt-1.5">{calculation.taxPercentage}%</div>
              </div>
            </div>

            {/* Main Tax Due Card */}
            <div className="bg-[#EEF2FB] border border-[#C5D3F2] rounded-[16px] p-6 text-center shadow-sm">
              <div className="text-xs font-semibold text-[#1A3B9F] uppercase tracking-wider">Capital Gain Tax Due</div>
              <div className="text-3xl font-extrabold text-[#1A3B9F] mt-2">{rs(calculation.capitalGainTax)}</div>
            </div>

            {/* Detailed Indexation Breakdown Card */}
            <div className="bg-white border border-[#E3E8F4] rounded-[20px] shadow-sm p-6 space-y-4">
              <h3 className="font-[var(--fd)] text-base font-bold text-[#091540] border-b border-[#E3E8F4] pb-3">
                Indexation & Acquisition Breakdown
              </h3>

              <div className="space-y-3 text-xs sm:text-sm text-[#374151]">
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">CII ({purchaseYear}):</span>
                  <span className="font-bold text-[#1A3B9F]">{calculation.ciiPurchase}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">CII ({salesYear}):</span>
                  <span className="font-bold text-[#1A3B9F]">{calculation.ciiSale}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Indexed Cost of Acquisition:</span>
                  <span className="font-bold text-[#091540]">{rs(calculation.indexedCost)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#E3E8F4]">
                  <span className="font-bold text-[#091540]">Net Long Term Capital Gain:</span>
                  <span className="font-extrabold text-[#6AA32A]">{rs(calculation.capitalGain)}</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        <p className="mt-8 text-xs text-[#6B7280] leading-relaxed">
          <b>Disclaimer:</b> Cost Inflation Index (CII) calculations are based on official Income Tax Department notifications for long-term capital assets. Actual tax liability may vary depending on grandfathering clauses and applicable surcharges. Anmol Share Broking Pvt. Ltd. — AMFI-registered Mutual Fund Distributor, ARN: 114893.
        </p>

      </div>
    </div>
  );
}