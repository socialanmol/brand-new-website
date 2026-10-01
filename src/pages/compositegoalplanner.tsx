import React, { useState, useId, useMemo } from 'react';

export default function CompositeGoalPlanner() {
  const currentAgeId = useId();
  const inflationId = useId();
  const savingsId = useId();
  const returnId = useId();

  const [currentAge, setCurrentAge] = useState<number>(25);
  const [inflation, setInflation] = useState<number>(7.5);
  const [existingSavings, setExistingSavings] = useState<number>(500000);
  const [expectedReturn, setExpectedReturn] = useState<number>(12.5);

  const [activeTab, setActiveTab] = useState<'education' | 'wealth' | 'purchase'>('education');

  // Specific tab inputs
  // Tab 1: Child Education
  const [eduGoalCost, setEduGoalCost] = useState<number>(2500000);
  const [childAge, setChildAge] = useState<number>(5);
  const [eduTargetAge, setEduTargetAge] = useState<number>(25);

  // Tab 2: Wealth Creation
  const [wealthTarget, setWealthTarget] = useState<number>(50000000);
  const [wealthYears, setWealthYears] = useState<number>(20);

  // Tab 3: Dream Item Purchase
  const [itemCost, setItemCost] = useState<number>(10000000);
  const [itemYears, setItemYears] = useState<number>(10);

  const calculations = useMemo(() => {
    const inf = inflation / 100;
    const ret = expectedReturn / 100;

    // 1. Child Education calculations
    const eduYearsToGoal = Math.max(1, eduTargetAge - childAge);
    const eduFutureCost = eduGoalCost * Math.pow(1 + inf, eduYearsToGoal);
    const eduSavingsFutureValue = existingSavings * Math.pow(1 + ret, eduYearsToGoal);
    const eduRemainingTarget = Math.max(0, eduFutureCost - eduSavingsFutureValue);

    // 2. Wealth Creation calculations
    const wealthFutureCost = wealthTarget * Math.pow(1 + inf, wealthYears);
    const wealthSavingsFutureValue = existingSavings * Math.pow(1 + ret, wealthYears);
    const wealthRemainingTarget = Math.max(0, wealthFutureCost - wealthSavingsFutureValue);

    // 3. Dream Item Purchase calculations
    const itemFutureCost = itemCost * Math.pow(1 + inf, itemYears);
    const itemSavingsFutureValue = existingSavings * Math.pow(1 + ret, itemYears);
    const itemRemainingTarget = Math.max(0, itemFutureCost - itemSavingsFutureValue);

    // Active tab metrics for the chart & summary
    let activeGoalTarget = eduFutureCost;
    let activeSavingsFV = eduSavingsFutureValue;
    let activeRemaining = eduRemainingTarget;
    let activeHorizon = eduYearsToGoal;

    if (activeTab === 'wealth') {
      activeGoalTarget = wealthFutureCost;
      activeSavingsFV = wealthSavingsFutureValue;
      activeRemaining = wealthRemainingTarget;
      activeHorizon = wealthYears;
    } else if (activeTab === 'purchase') {
      activeGoalTarget = itemFutureCost;
      activeSavingsFV = itemSavingsFutureValue;
      activeRemaining = itemRemainingTarget;
      activeHorizon = itemYears;
    }

    // Yearly breakdown for active goal chart
    const monthlyRate = Math.pow(1 + ret, 1 / 12) - 1;
    const totalMonths = activeHorizon * 12;
    // Solve monthly SIP required for remaining target
    const sipReq = monthlyRate === 0 
      ? activeRemaining / totalMonths 
      : activeRemaining / (((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate));

    const yearlyData = [];
    const startYear = new Date().getFullYear();
    let currentInvested = 0;
    let currentVal = 0;

    for (let y = 1; y <= activeHorizon; y++) {
      let yrInv = 0;
      for (let m = 1; m <= 12; m++) {
        currentInvested += Math.round(sipReq);
        yrInv += Math.round(sipReq);
        currentVal = (currentVal + Math.round(sipReq)) * (1 + monthlyRate);
      }
      yearlyData.push({
        year: startYear + y,
        invested: currentInvested,
        interest: Math.max(0, Math.round(currentVal - currentInvested)),
        total: Math.round(currentVal)
      });
    }

    return {
      edu: { target: eduFutureCost, fvSavings: eduSavingsFutureValue, remaining: eduRemainingTarget },
      wealth: { target: wealthFutureCost, fvSavings: wealthSavingsFutureValue, remaining: wealthRemainingTarget },
      purchase: { target: itemFutureCost, fvSavings: itemSavingsFutureValue, remaining: itemRemainingTarget },
      active: { target: activeGoalTarget, fvSavings: activeSavingsFV, remaining: activeRemaining, horizon: activeHorizon },
      yearlyData,
      totalInvestedSummary: yearlyData[yearlyData.length - 1]?.invested || 0,
      totalInterestSummary: yearlyData[yearlyData.length - 1]?.interest || 0,
      totalAmountSummary: yearlyData[yearlyData.length - 1]?.total || 0
    };
  }, [inflation, expectedReturn, existingSavings, activeTab, eduGoalCost, childAge, eduTargetAge, wealthTarget, wealthYears, itemCost, itemYears]);

  const inr = (v: number) => Math.round(v).toLocaleString('en-IN');
  const rs = (v: number) => '₹ ' + inr(v);

  const handleDownloadPDF = (e: React.MouseEvent) => {
    e.preventDefault();
    window.print();
  };

  return (
    <div className="font-[var(--fs)] bg-white text-[#111827] antialiased min-h-screen py-10 px-5">
      <div className="max-w-[1240px] mx-auto">
        
        {/* Top Header & PDF Action */}
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.14em] text-[#6AA32A] bg-[#EFF8E2] px-3 py-1.5 rounded-full mb-2">
              Multi-Goal Financial Modeling
            </span>
            <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-bold text-[#091540]">
              Composite Goal Planner
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

        {/* Global Inputs Card */}
        <div className="bg-white border border-[#E3E8F4] rounded-[20px] shadow-sm p-7 mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Current Age */}
          <div>
            <label htmlFor={currentAgeId} className="text-xs font-bold text-[#374151] block mb-2">
              What is your current age? (in years)
            </label>
            <div className="flex items-center bg-[#EEF2FB] rounded-[8px] px-3.5 h-11 border border-transparent focus-within:border-[#1A3B9F]">
              <input
                id={currentAgeId}
                type="text"
                inputMode="numeric"
                value={currentAge}
                onChange={(e) => {
                  const val = Number(e.target.value.replace(/[^0-9]/g, ''));
                  if (!isNaN(val)) setCurrentAge(Math.min(80, Math.max(18, val)));
                }}
                className="border-0 bg-transparent outline-0 font-bold text-[#1A3B9F] text-right w-full"
              />
              <span className="text-xs font-bold text-[#6B7280] ml-2">Years</span>
            </div>
            <input
              type="range"
              min="18"
              max="80"
              value={currentAge}
              onChange={(e) => setCurrentAge(Number(e.target.value))}
              style={{ background: `linear-gradient(90deg, #1A3B9F 0 ${((currentAge - 18) / 62) * 100}%, #E5E9F2 0 100%)` }}
              className="w-full h-1.5 rounded-full cursor-pointer appearance-none bg-[#E5E9F2] accent-[#1A3B9F] mt-3"
            />
          </div>

          {/* Expected Inflation */}
          <div>
            <label htmlFor={inflationId} className="text-xs font-bold text-[#374151] block mb-2">
              Expected rate of Inflation (% per annum)
            </label>
            <div className="flex items-center bg-[#EEF2FB] rounded-[8px] px-3.5 h-11 border border-transparent focus-within:border-[#1A3B9F]">
              <input
                id={inflationId}
                type="text"
                inputMode="decimal"
                value={inflation}
                onChange={(e) => {
                  const val = Number(e.target.value.replace(/[^0-9.]/g, ''));
                  if (!isNaN(val)) setInflation(Math.min(15, Math.max(1, val)));
                }}
                className="border-0 bg-transparent outline-0 font-bold text-[#1A3B9F] text-right w-full"
              />
              <span className="text-xs font-bold text-[#6B7280] ml-2">%</span>
            </div>
            <input
              type="range"
              min="1"
              max="15"
              step="0.5"
              value={inflation}
              onChange={(e) => setInflation(Number(e.target.value))}
              style={{ background: `linear-gradient(90deg, #1A3B9F 0 ${((inflation - 1) / 14) * 100}%, #E5E9F2 0 100%)` }}
              className="w-full h-1.5 rounded-full cursor-pointer appearance-none bg-[#E5E9F2] accent-[#1A3B9F] mt-3"
            />
          </div>

          {/* Existing Savings */}
          <div>
            <label htmlFor={savingsId} className="text-xs font-bold text-[#374151] block mb-2">
              Existing savings for the above goals? (Rs.)
            </label>
            <div className="flex items-center bg-[#EEF2FB] rounded-[8px] px-3.5 h-11 border border-transparent focus-within:border-[#1A3B9F]">
              <input
                id={savingsId}
                type="text"
                inputMode="numeric"
                value={existingSavings.toLocaleString('en-IN')}
                onChange={(e) => {
                  const val = Number(e.target.value.replace(/[^0-9]/g, ''));
                  if (!isNaN(val)) setExistingSavings(Math.min(100000000, Math.max(0, val)));
                }}
                className="border-0 bg-transparent outline-0 font-bold text-[#1A3B9F] text-right w-full"
              />
              <span className="text-xs font-bold text-[#6B7280] ml-2">₹</span>
            </div>
            <input
              type="range"
              min="0"
              max="10000000"
              step="50000"
              value={existingSavings}
              onChange={(e) => setExistingSavings(Number(e.target.value))}
              style={{ background: `linear-gradient(90deg, #1A3B9F 0 ${(existingSavings / 10000000) * 100}%, #E5E9F2 0 100%)` }}
              className="w-full h-1.5 rounded-full cursor-pointer appearance-none bg-[#E5E9F2] accent-[#1A3B9F] mt-3"
            />
          </div>

          {/* Expected Return */}
          <div>
            <label htmlFor={returnId} className="text-xs font-bold text-[#374151] block mb-2">
              Expected return on Investment? (% p.a.)
            </label>
            <div className="flex items-center bg-[#EEF2FB] rounded-[8px] px-3.5 h-11 border border-transparent focus-within:border-[#1A3B9F]">
              <input
                id={returnId}
                type="text"
                inputMode="decimal"
                value={expectedReturn}
                onChange={(e) => {
                  const val = Number(e.target.value.replace(/[^0-9.]/g, ''));
                  if (!isNaN(val)) setExpectedReturn(Math.min(25, Math.max(5, val)));
                }}
                className="border-0 bg-transparent outline-0 font-bold text-[#1A3B9F] text-right w-full"
              />
              <span className="text-xs font-bold text-[#6B7280] ml-2">%</span>
            </div>
            <input
              type="range"
              min="5"
              max="25"
              step="0.5"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(Number(e.target.value))}
              style={{ background: `linear-gradient(90deg, #1A3B9F 0 ${((expectedReturn - 5) / 20) * 100}%, #E5E9F2 0 100%)` }}
              className="w-full h-1.5 rounded-full cursor-pointer appearance-none bg-[#E5E9F2] accent-[#1A3B9F] mt-3"
            />
          </div>

        </div>

        {/* Goal Category Tabs */}
        <div className="flex border-b border-[#E3E8F4] mb-8 overflow-x-auto">
          {[
            { id: 'education', label: 'Child Education' },
            { id: 'wealth', label: 'Wealth Creation' },
            { id: 'purchase', label: 'Dream Item Purchase' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-4 px-8 text-sm font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'border-[#1A3B9F] text-[#1A3B9F] bg-[#EEF2FB]/50'
                  : 'border-transparent text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Active Tab Configuration & Growth Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.35fr] gap-8 items-start mb-12">
          
          {/* Tab Specific Controls */}
          <div className="bg-white border border-[#E3E8F4] rounded-[20px] shadow-sm p-7">
            {activeTab === 'education' && (
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-bold text-[#374151] block mb-2">What is your Child's Education Goal amount at today's cost?</label>
                  <div className="flex items-center bg-[#EEF2FB] rounded-[8px] px-3.5 h-11 border border-transparent focus-within:border-[#1A3B9F]">
                    <input
                      type="text"
                      value={eduGoalCost.toLocaleString('en-IN')}
                      onChange={(e) => {
                        const val = Number(e.target.value.replace(/[^0-9]/g, ''));
                        if (!isNaN(val)) setEduGoalCost(Math.min(10000000, Math.max(100000, val)));
                      }}
                      className="border-0 bg-transparent outline-0 font-bold text-[#1A3B9F] text-right w-full"
                    />
                    <span className="text-xs font-bold text-[#6B7280] ml-2">₹</span>
                  </div>
                  <input
                    type="range"
                    min="100000"
                    max="10000000"
                    step="50000"
                    value={eduGoalCost}
                    onChange={(e) => setEduGoalCost(Number(e.target.value))}
                    className="w-full h-1.5 rounded-full cursor-pointer appearance-none bg-[#E5E9F2] accent-[#1A3B9F] mt-3"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#374151] block mb-2">Current age of your child (Years)</label>
                  <div className="flex items-center bg-[#EEF2FB] rounded-[8px] px-3.5 h-11 border border-transparent focus-within:border-[#1A3B9F]">
                    <input
                      type="text"
                      value={childAge}
                      onChange={(e) => {
                        const val = Number(e.target.value.replace(/[^0-9]/g, ''));
                        if (!isNaN(val)) setChildAge(Math.min(20, Math.max(0, val)));
                      }}
                      className="border-0 bg-transparent outline-0 font-bold text-[#1A3B9F] text-right w-full"
                    />
                    <span className="text-xs font-bold text-[#6B7280] ml-2">Years</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={childAge}
                    onChange={(e) => setChildAge(Number(e.target.value))}
                    className="w-full h-1.5 rounded-full cursor-pointer appearance-none bg-[#E5E9F2] accent-[#1A3B9F] mt-3"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#374151] block mb-2">At what age the child would need the Education amount (Years)?</label>
                  <div className="flex items-center bg-[#EEF2FB] rounded-[8px] px-3.5 h-11 border border-transparent focus-within:border-[#1A3B9F]">
                    <input
                      type="text"
                      value={eduTargetAge}
                      onChange={(e) => {
                        const val = Number(e.target.value.replace(/[^0-9]/g, ''));
                        if (!isNaN(val)) setEduTargetAge(Math.min(30, Math.max(childAge + 1, val)));
                      }}
                      className="border-0 bg-transparent outline-0 font-bold text-[#1A3B9F] text-right w-full"
                    />
                    <span className="text-xs font-bold text-[#6B7280] ml-2">Years</span>
                  </div>
                  <input
                    type="range"
                    min={childAge + 1}
                    max="30"
                    value={eduTargetAge}
                    onChange={(e) => setEduTargetAge(Number(e.target.value))}
                    className="w-full h-1.5 rounded-full cursor-pointer appearance-none bg-[#E5E9F2] accent-[#1A3B9F] mt-3"
                  />
                </div>
              </div>
            )}

            {activeTab === 'wealth' && (
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-bold text-[#374151] block mb-2">Wealth Creation Target Amount (Rs.)</label>
                  <div className="flex items-center bg-[#EEF2FB] rounded-[8px] px-3.5 h-11 border border-transparent focus-within:border-[#1A3B9F]">
                    <input
                      type="text"
                      value={wealthTarget.toLocaleString('en-IN')}
                      onChange={(e) => {
                        const val = Number(e.target.value.replace(/[^0-9]/g, ''));
                        if (!isNaN(val)) setWealthTarget(Math.min(100000000, Math.max(1000000, val)));
                      }}
                      className="border-0 bg-transparent outline-0 font-bold text-[#1A3B9F] text-right w-full"
                    />
                    <span className="text-xs font-bold text-[#6B7280] ml-2">₹</span>
                  </div>
                  <input
                    type="range"
                    min="1000000"
                    max="100000000"
                    step="500000"
                    value={wealthTarget}
                    onChange={(e) => setWealthTarget(Number(e.target.value))}
                    className="w-full h-1.5 rounded-full cursor-pointer appearance-none bg-[#E5E9F2] accent-[#1A3B9F] mt-3"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#374151] block mb-2">Time Horizon (Years)</label>
                  <div className="flex items-center bg-[#EEF2FB] rounded-[8px] px-3.5 h-11 border border-transparent focus-within:border-[#1A3B9F]">
                    <input
                      type="text"
                      value={wealthYears}
                      onChange={(e) => {
                        const val = Number(e.target.value.replace(/[^0-9]/g, ''));
                        if (!isNaN(val)) setWealthYears(Math.min(40, Math.max(1, val)));
                      }}
                      className="border-0 bg-transparent outline-0 font-bold text-[#1A3B9F] text-right w-full"
                    />
                    <span className="text-xs font-bold text-[#6B7280] ml-2">Years</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="40"
                    value={wealthYears}
                    onChange={(e) => setWealthYears(Number(e.target.value))}
                    className="w-full h-1.5 rounded-full cursor-pointer appearance-none bg-[#E5E9F2] accent-[#1A3B9F] mt-3"
                  />
                </div>
              </div>
            )}

            {activeTab === 'purchase' && (
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-bold text-[#374151] block mb-2">Dream Item Cost at Today's Price (Rs.)</label>
                  <div className="flex items-center bg-[#EEF2FB] rounded-[8px] px-3.5 h-11 border border-transparent focus-within:border-[#1A3B9F]">
                    <input
                      type="text"
                      value={itemCost.toLocaleString('en-IN')}
                      onChange={(e) => {
                        const val = Number(e.target.value.replace(/[^0-9]/g, ''));
                        if (!isNaN(val)) setItemCost(Math.min(50000000, Math.max(500000, val)));
                      }}
                      className="border-0 bg-transparent outline-0 font-bold text-[#1A3B9F] text-right w-full"
                    />
                    <span className="text-xs font-bold text-[#6B7280] ml-2">₹</span>
                  </div>
                  <input
                    type="range"
                    min="500000"
                    max="50000000"
                    step="250000"
                    value={itemCost}
                    onChange={(e) => setItemCost(Number(e.target.value))}
                    className="w-full h-1.5 rounded-full cursor-pointer appearance-none bg-[#E5E9F2] accent-[#1A3B9F] mt-3"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#374151] block mb-2">Target Year Horizon (Years)</label>
                  <div className="flex items-center bg-[#EEF2FB] rounded-[8px] px-3.5 h-11 border border-transparent focus-within:border-[#1A3B9F]">
                    <input
                      type="text"
                      value={itemYears}
                      onChange={(e) => {
                        const val = Number(e.target.value.replace(/[^0-9]/g, ''));
                        if (!isNaN(val)) setItemYears(Math.min(30, Math.max(1, val)));
                      }}
                      className="border-0 bg-transparent outline-0 font-bold text-[#1A3B9F] text-right w-full"
                    />
                    <span className="text-xs font-bold text-[#6B7280] ml-2">Years</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    value={itemYears}
                    onChange={(e) => setItemYears(Number(e.target.value))}
                    className="w-full h-1.5 rounded-full cursor-pointer appearance-none bg-[#E5E9F2] accent-[#1A3B9F] mt-3"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Growth Chart & Metrics Card */}
          <div className="bg-white border border-[#E3E8F4] rounded-[20px] shadow-sm p-7">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
              <div className="flex gap-6 text-xs font-bold">
                <span className="inline-flex items-center gap-1.5"><i className="w-3 h-3 rounded-[3px] bg-[#FFC107] inline-block" />Invested Amount ({rs(calculations.totalInvestedSummary)})</span>
                <span className="inline-flex items-center gap-1.5"><i className="w-3 h-3 rounded-[3px] bg-[#6AA32A] inline-block" />Interest ({rs(calculations.totalInterestSummary)})</span>
                <span className="inline-flex items-center gap-1.5"><i className="w-3 h-3 rounded-[3px] bg-[#1A3B9F] inline-block" />Total Amount ({rs(calculations.totalAmountSummary)})</span>
              </div>
            </div>

            {/* Custom Bar/Line Chart Simulation */}
            <div className="h-[280px] flex items-end gap-2 pt-6 border-b border-[#E3E8F4] relative">
              {calculations.yearlyData.map((d, i) => {
                const maxVal = calculations.yearlyData[calculations.yearlyData.length - 1]?.total || 1;
                const totalH = (d.total / maxVal) * 220;
                const invH = (d.invested / maxVal) * 220;
                const intH = Math.max(0, totalH - invH);

                return (
                  <div key={i} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                    <div className="w-full flex flex-col items-center">
                      <div className="w-[85%] bg-[#6AA32A] rounded-t-[2px]" style={{ height: `${intH}px` }} />
                      <div className="w-[85%] bg-[#1A3B9F]" style={{ height: `${invH}px` }} />
                    </div>
                    <span className="text-[9px] text-[#6B7280] mt-2 block -rotate-45 sm:rotate-0">{d.year}</span>

                    {/* Tooltip */}
                    <div className="absolute bottom-full mb-2 hidden group-hover:block bg-[#091540] text-white text-[10px] p-2 rounded shadow-lg z-10 whitespace-nowrap">
                      <b>{d.year}</b><br />
                      Invested: {rs(d.invested)}<br />
                      Interest: {rs(d.interest)}<br />
                      Total: {rs(d.total)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Composite Goal Summary Bars Section */}
        <div className="bg-white border border-[#E3E8F4] rounded-[20px] shadow-sm p-7">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-[var(--fd)] text-xl font-bold text-[#091540]">Composite Goal Summary</h3>
            <div className="flex gap-4 text-xs font-bold text-[#374151]">
              <span className="inline-flex items-center gap-1.5"><i className="w-3 h-3 rounded-[3px] bg-[#1A3B9F] inline-block" />Goal Target Amount</span>
              <span className="inline-flex items-center gap-1.5"><i className="w-3 h-3 rounded-[3px] bg-[#6AA32A] inline-block" />Future Value of Current Savings</span>
              <span className="inline-flex items-center gap-1.5"><i className="w-3 h-3 rounded-[3px] bg-[#FFC107] inline-block" />Remaining Target Amount</span>
            </div>
          </div>

          <div className="space-y-8 mt-6">
            {[
              { label: 'Child Education', data: calculations.edu },
              { label: 'Wealth Creation', data: calculations.wealth },
              { label: 'Dream Item Purchase', data: calculations.purchase }
            ].map((goal, idx) => {
              const maxScale = Math.max(goal.data.target, 1);
              const targetW = 100;
              const savingsW = Math.min(100, (goal.data.fvSavings / maxScale) * 100);
              const remainingW = Math.min(100, (goal.data.remaining / maxScale) * 100);

              return (
                <div key={idx} className="space-y-2">
                  <div className="text-xs font-bold text-[#111827]">{goal.label}</div>
                  
                  {/* Bar 1: Target Amount */}
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-semibold text-[#6B7280] w-36 shrink-0">Goal Target Amount {rs(goal.data.target)}</span>
                    <div className="flex-1 h-5 bg-[#EEF2FB] rounded-[4px] overflow-hidden">
                      <div className="h-full bg-[#1A3B9F] rounded-[4px] transition-all" style={{ width: `${targetW}%` }} />
                    </div>
                  </div>

                  {/* Bar 2: FV of Savings */}
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-semibold text-[#6B7280] w-36 shrink-0">Future Value of Savings {rs(goal.data.fvSavings)}</span>
                    <div className="flex-1 h-5 bg-[#EEF2FB] rounded-[4px] overflow-hidden">
                      <div className="h-full bg-[#6AA32A] rounded-[4px] transition-all" style={{ width: `${savingsW}%` }} />
                    </div>
                  </div>

                  {/* Bar 3: Remaining Target */}
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-semibold text-[#6B7280] w-36 shrink-0">Remaining Target {rs(goal.data.remaining)}</span>
                    <div className="flex-1 h-5 bg-[#EEF2FB] rounded-[4px] overflow-hidden">
                      <div className="h-full bg-[#FFC107] rounded-[4px] transition-all" style={{ width: `${remainingW}%` }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <p className="mt-8 text-xs text-[#6B7280] leading-relaxed">
          <b>Disclaimer:</b> Composite goal planning calculations are for illustrative purposes and assume constant inflation and compound return rates. Actual returns and inflation vary. Anmol Share Broking Pvt. Ltd. — AMFI-registered Mutual Fund Distributor, ARN: 114893.
        </p>

      </div>
    </div>
  );
}