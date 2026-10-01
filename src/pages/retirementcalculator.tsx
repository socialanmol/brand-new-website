import React, { useState, useId, useMemo } from 'react';
import { Link } from 'react-router';

export default function RetirementCalculator() {
  const reqAmtId = useId();
  const ageId = useId();
  const retAgeId = useId();
  const infRateId = useId();
  const retRateId = useId();
  const curSavId = useId();

  // Input states
  const [targetMonthly, setTargetMonthly] = useState<number>(100000); // Amount wanted at retirement per month (or total lifestyle need)
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(60);
  const [inflationRate, setInflationRate] = useState<number>(6.0);
  const [returnRate, setReturnRate] = useState<number>(12.0);
  const [currentSavings, setCurrentSavings] = useState<number>(500000);

  const calculations = useMemo(() => {
    const age = Math.max(18, Math.min(99, isNaN(currentAge) ? 30 : currentAge));
    const retAge = Math.max(age + 1, Math.min(100, isNaN(retirementAge) ? 60 : retirementAge));
    const yearsToRetire = retAge - age;
    const inf = Math.max(0, Math.min(15, isNaN(inflationRate) ? 6 : inflationRate));
    const ret = Math.max(1, Math.min(25, isNaN(returnRate) ? 12 : returnRate));
    const sav = Math.max(0, isNaN(currentSavings) ? 0 : currentSavings);
    const monthlyNeed = Math.max(10000, isNaN(targetMonthly) ? 100000 : targetMonthly);

    // 1. Retirement amount (inflation adjusted)
    // If targetMonthly represents desired monthly expense at retirement:
    const futureMonthlyNeed = monthlyNeed * Math.pow(1 + inf / 100, yearsToRetire);
    // Standard rule of thumb corpus needed = 200x to 250x monthly expense at retirement (or annuity calculation)
    const inflationAdjustedCorpus = futureMonthlyNeed * 200; 

    // 2. Growth of current savings amount until retirement
    const growthOfCurrentSavings = sav * Math.pow(1 + ret / 100, yearsToRetire);

    // 3. Final targeted amount (minus growth of current savings)
    const finalTargetAmount = Math.max(0, inflationAdjustedCorpus - growthOfCurrentSavings);

    // 4. Number of years you need to save
    const saveYears = yearsToRetire;
    const totalMonths = saveYears * 12;

    // 5. Monthly savings required (SIP formula solving for PMT)
    const monthlyRate = Math.pow(1 + ret / 100, 1 / 12) - 1;
    let monthlySavingsReq = 0;
    if (monthlyRate === 0) {
      monthlySavingsReq = finalTargetAmount / totalMonths;
    } else {
      // FV = PMT * [((1 + i)^n - 1) / i] * (1 + i)
      const denominator = ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate);
      monthlySavingsReq = denominator > 0 ? finalTargetAmount / denominator : 0;
    }

    // 6. Total amount invested over the saving period
    const totalAmountInvested = monthlySavingsReq * totalMonths;

    // 7. Total growth amount
    const totalGrowthAmount = Math.max(0, finalTargetAmount - totalAmountInvested);

    return {
      yearsToRetire,
      futureMonthlyNeed,
      inflationAdjustedCorpus,
      growthOfCurrentSavings,
      finalTargetAmount,
      saveYears,
      monthlySavingsReq,
      totalAmountInvested,
      totalGrowthAmount
    };
  }, [targetMonthly, currentAge, retirementAge, inflationRate, returnRate, currentSavings]);

  const inr = (v: number) => Math.round(v).toLocaleString('en-IN');
  const rs = (v: number) => '₹ ' + inr(v);

  return (
    <div className="font-[var(--fs)] bg-white text-[#111827] antialiased min-h-screen py-10 px-5">
      <div className="max-w-[1140px] mx-auto">
        <div className="mb-8">
          <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.14em] text-[#6AA32A] bg-[#EFF8E2] px-3 py-1.5 rounded-full mb-3">
            Retirement Planning
          </span>
          <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-bold text-[#091540]">
            Retirement Calculator
          </h2>
          <p className="text-sm text-[#6B7280] mt-2">
            Calculate your inflation-adjusted retirement target and discover the exact monthly investment required to live your golden years in absolute financial freedom.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-6 items-start">
          {/* Controls Card */}
          <div className="bg-white border border-[#E3E8F4] rounded-[20px] shadow-sm overflow-hidden">
            {/* Field 1: Target Monthly Amount */}
            <div className="p-7 border-b border-[#E3E8F4]">
              <div className="flex justify-between items-center gap-4 mb-4 flex-wrap">
                <label htmlFor={reqAmtId} className="text-base font-bold text-[#111827] flex-1 min-w-[220px]">
                  Desired monthly retirement income (today's value)
                  <span className="block text-xs font-semibold text-[#6B7280] mt-0.5">₹ per month</span>
                </label>
                <div className="flex items-center bg-[#EEF2FB] border border-transparent focus-within:border-[#1A3B9F] rounded-[8px] px-3.5 h-12 w-[190px]">
                  <span className="text-sm font-bold text-[#6B7280] mr-1.5">₹</span>
                  <input
                    id={reqAmtId}
                    type="text"
                    inputMode="numeric"
                    value={targetMonthly.toLocaleString('en-IN')}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/[^0-9]/g, '');
                      const val = Number(raw);
                      if (!isNaN(val)) setTargetMonthly(Math.min(5000000, Math.max(10000, val)));
                    }}
                    className="border-0 bg-transparent outline-0 font-['Nunito_Sans',sans-serif] text-xl font-extrabold text-[#1A3B9F] text-right w-full"
                  />
                </div>
              </div>
              <input
                type="range"
                min="10000"
                max="1000000"
                step="5000"
                value={targetMonthly}
                onChange={(e) => setTargetMonthly(Number(e.target.value))}
                style={{ background: `linear-gradient(90deg, #1A3B9F 0 ${((targetMonthly - 10000) / (1000000 - 10000)) * 100}%, #E5E9F2 0 100%)` }}
                className="w-full h-2 rounded-full cursor-pointer appearance-none bg-[#E5E9F2] accent-[#1A3B9F]"
              />
              <div className="flex justify-between mt-3 text-xs font-bold text-[#6B7280]">
                <i>₹10k</i><i>₹2.5L</i><i>₹5L</i><i>₹7.5L</i><i>₹10L</i>
              </div>
            </div>

            {/* Field 2: Current Age */}
            <div className="p-7 border-b border-[#E3E8F4]">
              <div className="flex justify-between items-center gap-4 mb-4 flex-wrap">
                <label htmlFor={ageId} className="text-base font-bold text-[#111827] flex-1 min-w-[220px]">
                  Your current age
                  <span className="block text-xs font-semibold text-[#6B7280] mt-0.5">Years</span>
                </label>
                <div className="flex items-center bg-[#EEF2FB] border border-transparent focus-within:border-[#1A3B9F] rounded-[8px] px-3.5 h-12 w-[190px]">
                  <input
                    id={ageId}
                    type="text"
                    inputMode="numeric"
                    value={currentAge}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/[^0-9]/g, '');
                      const val = Number(raw);
                      if (!isNaN(val)) setCurrentAge(Math.min(80, Math.max(18, val)));
                    }}
                    className="border-0 bg-transparent outline-0 font-['Nunito_Sans',sans-serif] text-xl font-extrabold text-[#1A3B9F] text-right w-full"
                  />
                  <span className="text-xs font-bold text-[#6B7280] ml-1.5">years</span>
                </div>
              </div>
              <input
                type="range"
                min="18"
                max="80"
                step="1"
                value={currentAge}
                onChange={(e) => setCurrentAge(Number(e.target.value))}
                style={{ background: `linear-gradient(90deg, #1A3B9F 0 ${((currentAge - 18) / (80 - 18)) * 100}%, #E5E9F2 0 100%)` }}
                className="w-full h-2 rounded-full cursor-pointer appearance-none bg-[#E5E9F2] accent-[#1A3B9F]"
              />
              <div className="flex justify-between mt-3 text-xs font-bold text-[#6B7280]">
                <i>18 yrs</i><i>35 yrs</i><i>50 yrs</i><i>65 yrs</i><i>80 yrs</i>
              </div>
            </div>

            {/* Field 3: Retirement Age */}
            <div className="p-7 border-b border-[#E3E8F4]">
              <div className="flex justify-between items-center gap-4 mb-4 flex-wrap">
                <label htmlFor={retAgeId} className="text-base font-bold text-[#111827] flex-1 min-w-[220px]">
                  Planned retirement age
                  <span className="block text-xs font-semibold text-[#6B7280] mt-0.5">Years</span>
                </label>
                <div className="flex items-center bg-[#EEF2FB] border border-transparent focus-within:border-[#1A3B9F] rounded-[8px] px-3.5 h-12 w-[190px]">
                  <input
                    id={retAgeId}
                    type="text"
                    inputMode="numeric"
                    value={retirementAge}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/[^0-9]/g, '');
                      const val = Number(raw);
                      if (!isNaN(val)) setRetirementAge(Math.min(90, Math.max(currentAge + 1, val)));
                    }}
                    className="border-0 bg-transparent outline-0 font-['Nunito_Sans',sans-serif] text-xl font-extrabold text-[#1A3B9F] text-right w-full"
                  />
                  <span className="text-xs font-bold text-[#6B7280] ml-1.5">years</span>
                </div>
              </div>
              <input
                type="range"
                min={currentAge + 1}
                max="90"
                step="1"
                value={retirementAge}
                onChange={(e) => setRetirementAge(Number(e.target.value))}
                style={{ background: `linear-gradient(90deg, #1A3B9F 0 ${((retirementAge - (currentAge + 1)) / (90 - (currentAge + 1) || 1)) * 100}%, #E5E9F2 0 100%)` }}
                className="w-full h-2 rounded-full cursor-pointer appearance-none bg-[#E5E9F2] accent-[#1A3B9F]"
              />
              <div className="flex justify-between mt-3 text-xs font-bold text-[#6B7280]">
                <i>{currentAge + 1} yrs</i><i>50 yrs</i><i>60 yrs</i><i>75 yrs</i><i>90 yrs</i>
              </div>
            </div>

            {/* Field 4: Inflation Rate */}
            <div className="p-7 border-b border-[#E3E8F4]">
              <div className="flex justify-between items-center gap-4 mb-4 flex-wrap">
                <label htmlFor={infRateId} className="text-base font-bold text-[#111827] flex-1 min-w-[220px]">
                  Expected inflation rate
                  <span className="block text-xs font-semibold text-[#6B7280] mt-0.5">% per annum</span>
                </label>
                <div className="flex items-center bg-[#EEF2FB] border border-transparent focus-within:border-[#1A3B9F] rounded-[8px] px-3.5 h-12 w-[190px]">
                  <input
                    id={infRateId}
                    type="text"
                    inputMode="decimal"
                    value={inflationRate}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/[^0-9.]/g, '');
                      const val = Number(raw);
                      if (!isNaN(val)) setInflationRate(Math.min(15, Math.max(3, val)));
                    }}
                    className="border-0 bg-transparent outline-0 font-['Nunito_Sans',sans-serif] text-xl font-extrabold text-[#1A3B9F] text-right w-full"
                  />
                  <span className="text-xs font-bold text-[#6B7280] ml-1.5">%</span>
                </div>
              </div>
              <input
                type="range"
                min="3"
                max="15"
                step="0.5"
                value={inflationRate}
                onChange={(e) => setInflationRate(Number(e.target.value))}
                style={{ background: `linear-gradient(90deg, #1A3B9F 0 ${((inflationRate - 3) / (15 - 3)) * 100}%, #E5E9F2 0 100%)` }}
                className="w-full h-2 rounded-full cursor-pointer appearance-none bg-[#E5E9F2] accent-[#1A3B9F]"
              />
              <div className="flex justify-between mt-3 text-xs font-bold text-[#6B7280]">
                <i>3%</i><i>6%</i><i>9%</i><i>12%</i><i>15%</i>
              </div>
            </div>

            {/* Field 5: Expected Return Rate */}
            <div className="p-7 border-b border-[#E3E8F4]">
              <div className="flex justify-between items-center gap-4 mb-4 flex-wrap">
                <label htmlFor={retRateId} className="text-base font-bold text-[#111827] flex-1 min-w-[220px]">
                  Expected return on investments
                  <span className="block text-xs font-semibold text-[#6B7280] mt-0.5">% per annum</span>
                </label>
                <div className="flex items-center bg-[#EEF2FB] border border-transparent focus-within:border-[#1A3B9F] rounded-[8px] px-3.5 h-12 w-[190px]">
                  <input
                    id={retRateId}
                    type="text"
                    inputMode="decimal"
                    value={returnRate}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/[^0-9.]/g, '');
                      const val = Number(raw);
                      if (!isNaN(val)) setReturnRate(Math.min(25, Math.max(6, val)));
                    }}
                    className="border-0 bg-transparent outline-0 font-['Nunito_Sans',sans-serif] text-xl font-extrabold text-[#1A3B9F] text-right w-full"
                  />
                  <span className="text-xs font-bold text-[#6B7280] ml-1.5">%</span>
                </div>
              </div>
              <input
                type="range"
                min="6"
                max="25"
                step="0.5"
                value={returnRate}
                onChange={(e) => setReturnRate(Number(e.target.value))}
                style={{ background: `linear-gradient(90deg, #1A3B9F 0 ${((returnRate - 6) / (25 - 6)) * 100}%, #E5E9F2 0 100%)` }}
                className="w-full h-2 rounded-full cursor-pointer appearance-none bg-[#E5E9F2] accent-[#1A3B9F]"
              />
              <div className="flex justify-between mt-3 text-xs font-bold text-[#6B7280]">
                <i>6%</i><i>10%</i><i>15%</i><i>20%</i><i>25%</i>
              </div>
            </div>

            {/* Field 6: Current Savings */}
            <div className="p-7">
              <div className="flex justify-between items-center gap-4 mb-4 flex-wrap">
                <label htmlFor={curSavId} className="text-base font-bold text-[#111827] flex-1 min-w-[220px]">
                  Your current retirement savings
                  <span className="block text-xs font-semibold text-[#6B7280] mt-0.5">₹ lump sum</span>
                </label>
                <div className="flex items-center bg-[#EEF2FB] border border-transparent focus-within:border-[#1A3B9F] rounded-[8px] px-3.5 h-12 w-[190px]">
                  <span className="text-sm font-bold text-[#6B7280] mr-1.5">₹</span>
                  <input
                    id={curSavId}
                    type="text"
                    inputMode="numeric"
                    value={currentSavings.toLocaleString('en-IN')}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/[^0-9]/g, '');
                      const val = Number(raw);
                      if (!isNaN(val)) setCurrentSavings(Math.min(100000000, Math.max(0, val)));
                    }}
                    className="border-0 bg-transparent outline-0 font-['Nunito_Sans',sans-serif] text-xl font-extrabold text-[#1A3B9F] text-right w-full"
                  />
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="10000000"
                step="50000"
                value={currentSavings}
                onChange={(e) => setCurrentSavings(Number(e.target.value))}
                style={{ background: `linear-gradient(90deg, #1A3B9F 0 ${(currentSavings / 10000000) * 100}%, #E5E9F2 0 100%)` }}
                className="w-full h-2 rounded-full cursor-pointer appearance-none bg-[#E5E9F2] accent-[#1A3B9F]"
              />
              <div className="flex justify-between mt-3 text-xs font-bold text-[#6B7280]">
                <i>₹0</i><i>₹25L</i><i>₹50L</i><i>₹75L</i><i>₹1Cr</i>
              </div>
            </div>
          </div>

          {/* Results Side (As requested: all required breakdown metrics) */}
          <div className="flex flex-col gap-4">
            <div className="bg-white border border-[#E3E8F4] rounded-[20px] shadow-sm overflow-hidden text-center">
              <div className="p-4 border-b border-[#E3E8F4]">
                <div className="text-xs font-semibold text-[#6B7280]">Retirement amount (inflation adjusted)</div>
                <div className="text-xl font-extrabold text-[#1A3B9F] mt-1">{rs(calculations.inflationAdjustedCorpus)}</div>
                <span className="text-[10px] text-[#6B7280]">Future monthly need: {rs(calculations.futureMonthlyNeed)}</span>
              </div>

              <div className="p-4 border-b border-[#E3E8F4]">
                <div className="text-xs font-semibold text-[#6B7280]">Growth of your savings amount</div>
                <div className="text-xl font-extrabold text-[#8DC63F] mt-1">{rs(calculations.growthOfCurrentSavings)}</div>
                <span className="text-[10px] text-[#6B7280]">From your current savings of {rs(currentSavings)}</span>
              </div>

              <div className="p-4 border-b border-[#E3E8F4]">
                <div className="text-xs font-semibold text-[#6B7280]">Final targeted amount (minus growth)</div>
                <div className="text-xl font-extrabold text-[#1A3B9F] mt-1">{rs(calculations.finalTargetAmount)}</div>
              </div>

              <div className="p-4 border-b border-[#E3E8F4]">
                <div className="text-xs font-semibold text-[#6B7280]">Number of years you need to save</div>
                <div className="text-xl font-extrabold text-[#374151] mt-1">{calculations.saveYears} years</div>
                <span className="text-[10px] text-[#6B7280]">({calculations.saveYears * 12} monthly instalments)</span>
              </div>

              <div className="p-5 bg-[#EEF2FB] border-b border-[#E3E8F4]">
                <div className="text-xs font-semibold text-[#1A3B9F]">Monthly savings required</div>
                <div className="text-3xl font-extrabold text-[#1A3B9F] mt-1">{rs(calculations.monthlySavingsReq)}</div>
              </div>

              <div className="p-4 border-b border-[#E3E8F4]">
                <div className="text-xs font-semibold text-[#6B7280]">Total amount invested</div>
                <div className="text-lg font-extrabold text-[#374151] mt-1">{rs(calculations.totalAmountInvested)}</div>
              </div>

              <div className="p-5 bg-[#1A3B9F] text-white">
                <div className="text-xs font-semibold opacity-80">Total growth amount</div>
                <div className="text-2xl font-extrabold mt-1 text-[#8DC63F]">{rs(calculations.totalGrowthAmount)}</div>
              </div>
            </div>

            {/* Action CTA */}
            <div className="bg-[#091540] rounded-[20px] p-6 text-white text-center">
              <h3 className="font-[var(--fd)] text-xl text-white mb-2">Want a custom retirement roadmap?</h3>
              <p className="text-xs text-white/80 mb-4">Our experts build custom asset allocation plans mapped to your exact lifestyle goals.</p>
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-[8px] bg-[#8DC63F] text-[#091540] font-extrabold text-xs hover:bg-[#9ED64A] transition-all">
                Talk to an advisor →
              </Link>
            </div>
          </div>
        </div>

        <p className="mt-8 text-xs text-[#6B7280] leading-relaxed">
          <b>Disclaimer:</b> Retirement projections are based on assumed rates of inflation and investment returns. Actual market conditions vary and are not guaranteed. Anmol Share Broking Pvt. Ltd. — AMFI-registered Mutual Fund Distributor, ARN: 114893.
        </p>
      </div>
    </div>
  );
}