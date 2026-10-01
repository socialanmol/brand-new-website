import React, { useState, useEffect, useId, useMemo } from 'react';

export default function NpsCalculator() {
  const ageId = useId();
  const monthlyId = useId();
  const rateId = useId();
  const annuityRateId = useId();
  const annuityPercentId = useId();

  const [currentAge, setCurrentAge] = useState<number>(30);
  const [monthlyInvest, setMonthlyInvest] = useState<number>(10000);
  const [returnRate, setReturnRate] = useState<number>(10);
  const [annuityReturnRate, setAnnuityReturnRate] = useState<number>(6);
  const [annuityPercent, setAnnuityPercent] = useState<number>(40);

  const [ageText, setAgeText] = useState<string>("30");
  const [monthlyText, setMonthlyText] = useState<string>("10,000");
  const [rateText, setRateText] = useState<string>("10");
  const [annuityRateText, setAnnuityRateText] = useState<string>("6");
  const [annuityPercentText, setAnnuityPercentText] = useState<string>("40");

  useEffect(() => { setAgeText(currentAge.toString()); }, [currentAge]);
  useEffect(() => { setMonthlyText(monthlyInvest.toLocaleString('en-IN')); }, [monthlyInvest]);
  useEffect(() => { setRateText(returnRate.toString()); }, [returnRate]);
  useEffect(() => { setAnnuityRateText(annuityReturnRate.toString()); }, [annuityReturnRate]);
  useEffect(() => { setAnnuityPercentText(annuityPercent.toString()); }, [annuityPercent]);

  const calculation = useMemo(() => {
    const age = Math.max(18, Math.min(65, isNaN(currentAge) ? 30 : currentAge));
    const retirementAge = 60;
    const years = Math.max(1, retirementAge - age);
    const P = Math.max(500, isNaN(monthlyInvest) ? 10000 : monthlyInvest);
    const R = Math.max(1, Math.min(20, isNaN(returnRate) ? 10 : returnRate));
    const annRate = Math.max(1, Math.min(15, isNaN(annuityReturnRate) ? 6 : annuityReturnRate));
    const annPct = Math.max(40, Math.min(100, isNaN(annuityPercent) ? 40 : annuityPercent));

    const totalMonths = years * 12;
    const monthlyRate = Math.pow(1 + R / 100, 1 / 12) - 1;

    // Compound Interest for SIP (NPS Corpus calculation)
    let totalCorpus = 0;
    let totalInvested = 0;
    for (let m = 1; m <= totalMonths; m++) {
      totalInvested += P;
      totalCorpus = (totalCorpus + P) * (1 + monthlyRate);
    }

    const totalGrowth = Math.max(0, totalCorpus - totalInvested);

    // Annuity breakdown (Mandatory lump sum vs annuity)
    const annuityAmount = totalCorpus * (annPct / 100);
    const lumpSumAmount = totalCorpus - annuityAmount;

    // Monthly pension estimation from annuity
    // Annual pension = annuityAmount * (annRate / 100)
    const monthlyPension = (annuityAmount * (annRate / 100)) / 12;

    return {
      yearsToRetire: years,
      totalInvested: Math.round(totalInvested),
      totalCorpus: Math.round(totalCorpus),
      totalGrowth: Math.round(totalGrowth),
      annuityAmount: Math.round(annuityAmount),
      lumpSumAmount: Math.round(lumpSumAmount),
      monthlyPension: Math.round(monthlyPension)
    };
  }, [currentAge, monthlyInvest, returnRate, annuityReturnRate, annuityPercent]);

  const inr = (v: number) => Math.round(v).toLocaleString('en-IN');
  const rs = (v: number) => 'Rs. ' + inr(v);

  // Donut metrics
  const C = 2 * Math.PI * 80;
  const gap = 2;
  const invRatio = calculation.totalCorpus > 0 ? calculation.totalInvested / calculation.totalCorpus : 0;
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
              Retirement & Pension Planning
            </span>
            <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-bold text-[#091540]">
              National Pension System (NPS) Calculator
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
            
            {/* Field 1: Current Age */}
            <div className="p-7 border-b border-[#E3E8F4]">
              <div className="flex justify-between items-center gap-4 mb-4 flex-wrap">
                <label htmlFor={ageId} className="text-base font-bold text-[#111827] flex-1 min-w-[220px]">
                  Current Age (Years)
                  <span className="block text-xs font-semibold text-[#6B7280] mt-0.5">Retirement age fixed at 60</span>
                </label>
                <div className="flex items-center bg-[#EEF2FB] border border-transparent focus-within:border-[#1A3B9F] rounded-[8px] px-3.5 h-12 w-[190px]">
                  <input
                    id={ageId}
                    type="text"
                    inputMode="numeric"
                    value={ageText}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/[^0-9]/g, '');
                      setAgeText(raw);
                      const val = Number(raw);
                      if (!isNaN(val)) setCurrentAge(Math.min(59, Math.max(18, val)));
                    }}
                    onBlur={() => {
                      const num = Number(ageText.replace(/[^0-9]/g, '')) || 30;
                      const clamped = Math.min(59, Math.max(18, num));
                      setCurrentAge(clamped);
                      setAgeText(clamped.toString());
                    }}
                    className="border-0 bg-transparent outline-0 font-['Nunito_Sans',sans-serif] text-xl font-extrabold text-[#1A3B9F] text-right w-full"
                  />
                  <span className="text-xs font-bold text-[#6B7280] ml-2">Yrs</span>
                </div>
              </div>
              <input
                type="range"
                min="18"
                max="59"
                step="1"
                value={currentAge}
                onChange={(e) => setCurrentAge(Number(e.target.value))}
                style={{ background: `linear-gradient(90deg, #1A3B9F 0 ${((currentAge - 18) / (59 - 18)) * 100}%, #E5E9F2 0 100%)` }}
                className="w-full h-2 rounded-full cursor-pointer appearance-none bg-[#E5E9F2] accent-[#1A3B9F]"
              />
              <div className="flex justify-between mt-3 text-xs font-bold text-[#6B7280]">
                <i>18 Yrs</i><i>28 Yrs</i><i>38 Yrs</i><i>48 Yrs</i><i>59 Yrs</i>
              </div>
            </div>

            {/* Field 2: Monthly Investment */}
            <div className="p-7 border-b border-[#E3E8F4]">
              <div className="flex justify-between items-center gap-4 mb-4 flex-wrap">
                <label htmlFor={monthlyId} className="text-base font-bold text-[#111827] flex-1 min-w-[220px]">
                  Monthly Contribution (Rs)
                  <span className="block text-xs font-semibold text-[#6B7280] mt-0.5">₹ per month</span>
                </label>
                <div className="flex items-center bg-[#EEF2FB] border border-transparent focus-within:border-[#1A3B9F] rounded-[8px] px-3.5 h-12 w-[190px]">
                  <input
                    id={monthlyId}
                    type="text"
                    inputMode="numeric"
                    value={monthlyText}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/[^0-9]/g, '');
                      setMonthlyText(raw ? Number(raw).toLocaleString('en-IN') : '');
                      const val = Number(raw);
                      if (!isNaN(val)) setMonthlyInvest(Math.min(500000, Math.max(500, val)));
                    }}
                    onBlur={() => {
                      const num = Number(monthlyText.replace(/[^0-9]/g, '')) || 500;
                      const clamped = Math.min(500000, Math.max(500, num));
                      setMonthlyInvest(clamped);
                      setMonthlyText(clamped.toLocaleString('en-IN'));
                    }}
                    className="border-0 bg-transparent outline-0 font-['Nunito_Sans',sans-serif] text-xl font-extrabold text-[#1A3B9F] text-right w-full"
                  />
                  <span className="text-xs font-bold text-[#6B7280] ml-2">Rs</span>
                </div>
              </div>
              <input
                type="range"
                min="500"
                max="200000"
                step="500"
                value={monthlyInvest}
                onChange={(e) => setMonthlyInvest(Number(e.target.value))}
                style={{ background: `linear-gradient(90deg, #1A3B9F 0 ${((monthlyInvest - 500) / (200000 - 500)) * 100}%, #E5E9F2 0 100%)` }}
                className="w-full h-2 rounded-full cursor-pointer appearance-none bg-[#E5E9F2] accent-[#1A3B9F]"
              />
              <div className="flex justify-between mt-3 text-xs font-bold text-[#6B7280]">
                <i>₹500</i><i>₹50k</i><i>₹1 Lakh</i><i>₹1.5 Lakh</i><i>₹2 Lakh</i>
              </div>
            </div>

            {/* Field 3: Expected Return Rate */}
            <div className="p-7 border-b border-[#E3E8F4]">
              <div className="flex justify-between items-center gap-4 mb-4 flex-wrap">
                <label htmlFor={rateId} className="text-base font-bold text-[#111827] flex-1 min-w-[220px]">
                  Expected Return (% per annum)
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
                      if (!isNaN(val)) setReturnRate(Math.min(20, Math.max(1, val)));
                    }}
                    onBlur={() => {
                      const num = Number(rateText.replace(/[^0-9.]/g, '')) || 10;
                      const clamped = Math.min(20, Math.max(1, num));
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
                max="20"
                step="0.5"
                value={returnRate}
                onChange={(e) => setReturnRate(Number(e.target.value))}
                style={{ background: `linear-gradient(90deg, #1A3B9F 0 ${((returnRate - 1) / (20 - 1)) * 100}%, #E5E9F2 0 100%)` }}
                className="w-full h-2 rounded-full cursor-pointer appearance-none bg-[#E5E9F2] accent-[#1A3B9F]"
              />
              <div className="flex justify-between mt-3 text-xs font-bold text-[#6B7280]">
                <i>1%</i><i>6%</i><i>10%</i><i>15%</i><i>20%</i>
              </div>
            </div>

            {/* Field 4: Annuity Percentage */}
            <div className="p-7 border-b border-[#E3E8F4]">
              <div className="flex justify-between items-center gap-4 mb-4 flex-wrap">
                <label htmlFor={annuityPercentId} className="text-base font-bold text-[#111827] flex-1 min-w-[220px]">
                  Annuity Investment (% of corpus)
                  <span className="block text-xs font-semibold text-[#6B7280] mt-0.5">Min 40% mandatory by PFRDA</span>
                </label>
                <div className="flex items-center bg-[#EEF2FB] border border-transparent focus-within:border-[#1A3B9F] rounded-[8px] px-3.5 h-12 w-[190px]">
                  <input
                    id={annuityPercentId}
                    type="text"
                    inputMode="numeric"
                    value={annuityPercentText}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/[^0-9]/g, '');
                      setAnnuityPercentText(raw);
                      const val = Number(raw);
                      if (!isNaN(val)) setAnnuityPercent(Math.min(100, Math.max(40, val)));
                    }}
                    onBlur={() => {
                      const num = Number(annuityPercentText.replace(/[^0-9]/g, '')) || 40;
                      const clamped = Math.min(100, Math.max(40, num));
                      setAnnuityPercent(clamped);
                      setAnnuityPercentText(clamped.toString());
                    }}
                    className="border-0 bg-transparent outline-0 font-['Nunito_Sans',sans-serif] text-xl font-extrabold text-[#1A3B9F] text-right w-full"
                  />
                  <span className="text-xs font-bold text-[#6B7280] ml-2">%</span>
                </div>
              </div>
              <input
                type="range"
                min="40"
                max="100"
                step="5"
                value={annuityPercent}
                onChange={(e) => setAnnuityPercent(Number(e.target.value))}
                style={{ background: `linear-gradient(90deg, #1A3B9F 0 ${((annuityPercent - 40) / 60) * 100}%, #E5E9F2 0 100%)` }}
                className="w-full h-2 rounded-full cursor-pointer appearance-none bg-[#E5E9F2] accent-[#1A3B9F]"
              />
              <div className="flex justify-between mt-3 text-xs font-bold text-[#6B7280]">
                <i>40% (Min)</i><i>60%</i><i>80%</i><i>100%</i>
              </div>
            </div>

            {/* Field 5: Annuity Return Rate */}
            <div className="p-7">
              <div className="flex justify-between items-center gap-4 mb-4 flex-wrap">
                <label htmlFor={annuityRateId} className="text-base font-bold text-[#111827] flex-1 min-w-[220px]">
                  Expected Annuity Return (% p.a.)
                  <span className="block text-xs font-semibold text-[#6B7280] mt-0.5">Pension generation rate</span>
                </label>
                <div className="flex items-center bg-[#EEF2FB] border border-transparent focus-within:border-[#1A3B9F] rounded-[8px] px-3.5 h-12 w-[190px]">
                  <input
                    id={annuityRateId}
                    type="text"
                    inputMode="decimal"
                    value={annuityRateText}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/[^0-9.]/g, '');
                      setAnnuityRateText(raw);
                      const val = Number(raw);
                      if (!isNaN(val)) setAnnuityReturnRate(Math.min(15, Math.max(1, val)));
                    }}
                    onBlur={() => {
                      const num = Number(annuityRateText.replace(/[^0-9.]/g, '')) || 6;
                      const clamped = Math.min(15, Math.max(1, num));
                      setAnnuityReturnRate(clamped);
                      setAnnuityRateText(clamped.toString());
                    }}
                    className="border-0 bg-transparent outline-0 font-['Nunito_Sans',sans-serif] text-xl font-extrabold text-[#1A3B9F] text-right w-full"
                  />
                  <span className="text-xs font-bold text-[#6B7280] ml-2">%</span>
                </div>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                step="0.5"
                value={annuityReturnRate}
                onChange={(e) => setAnnuityReturnRate(Number(e.target.value))}
                style={{ background: `linear-gradient(90deg, #1A3B9F 0 ${((annuityReturnRate - 1) / 14) * 100}%, #E5E9F2 0 100%)` }}
                className="w-full h-2 rounded-full cursor-pointer appearance-none bg-[#E5E9F2] accent-[#1A3B9F]"
              />
              <div className="flex justify-between mt-3 text-xs font-bold text-[#6B7280]">
                <i>1%</i><i>5%</i><i>9%</i><i>12%</i><i>15%</i>
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
                  <b className="font-[var(--fd)] text-2xl text-[#091540]">{(calculation.totalCorpus / (calculation.totalInvested || 1)).toFixed(1)}x</b>
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
                <div className="text-[11px] font-semibold text-[#6B7280]">Years to Retirement</div>
                <div className="text-base font-extrabold text-[#1A3B9F] mt-1">{calculation.yearsToRetire} Years</div>
              </div>
              <div className="bg-white border border-[#E3E8F4] rounded-[16px] p-4 text-center">
                <div className="text-[11px] font-semibold text-[#6B7280]">Total Amount Invested</div>
                <div className="text-base font-extrabold text-[#E65100] mt-1">{rs(calculation.totalInvested)}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white border border-[#E3E8F4] rounded-[16px] p-4 text-center">
                <div className="text-[11px] font-semibold text-[#6B7280]">Lump-Sum Withdrawal ({(100 - annuityPercent)}%)</div>
                <div className="text-sm font-extrabold text-[#6AA32A] mt-1">{rs(calculation.lumpSumAmount)}</div>
              </div>
              <div className="bg-white border border-[#E3E8F4] rounded-[16px] p-4 text-center">
                <div className="text-[11px] font-semibold text-[#6B7280]">Annuity Corpus ({annuityPercent}%)</div>
                <div className="text-sm font-extrabold text-[#1A3B9F] mt-1">{rs(calculation.annuityAmount)}</div>
              </div>
            </div>

            <div className="bg-[#1A3B9F] text-white rounded-[16px] p-5 text-center shadow-md">
              <div className="text-xs font-semibold opacity-80">Estimated Monthly Pension</div>
              <div className="text-2xl font-extrabold mt-1 text-[#8DC63F]">{rs(calculation.monthlyPension)} / month</div>
            </div>

            <div className="bg-[#EEF2FB] border border-[#E3E8F4] rounded-[16px] p-4 text-center">
              <div className="text-[11px] font-semibold text-[#1A3B9F]">Total Retirement Corpus (At Age 60)</div>
              <div className="text-xl font-extrabold text-[#091540] mt-1">{rs(calculation.totalCorpus)}</div>
            </div>

          </div>

        </div>

        <p className="mt-8 text-xs text-[#6B7280] leading-relaxed">
          <b>Disclaimer:</b> NPS calculations are for illustrative purposes and based on assumed compounding rates and mandatory PFRDA annuity purchase rules. Actual pension payouts depend on prevailing annuity rates at age 60. Anmol Share Broking Pvt. Ltd. — AMFI-registered Mutual Fund Distributor, ARN: 114893.
        </p>

      </div>
    </div>
  );
}