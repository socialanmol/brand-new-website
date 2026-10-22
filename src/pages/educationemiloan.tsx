import React, { useState, useEffect, useId, useMemo } from 'react';
import { Link } from 'react-router';
import CalculatorActions from '../components/CalculatorActions';
import { composeLoan } from '../calculators/compose';

const LOAN_TABS = [
  { label: "Home Loan EMI Calculator", to: "/calculators/home-loan-emi-calculator" },
  { label: "Personal Loan EMI Calculator", to: "/calculators/personal-loan-emi-calculator" },
  { label: "Car Loan EMI Calculator", to: "/calculators/car-loan-emi-calculator" },
  { label: "Education Loan EMI Calculator", to: "/calculators/education-loan-emi-calculator" },
];

export default function EducationLoanCalculator() {
  const loanAmtId = useId();
  const rateId = useId();
  const tenureId = useId();
  const moraId = useId();
  const startYearId = useId();

  const [loanAmount, setLoanAmount] = useState<number>(2500000);
  const [interestRate, setInterestRate] = useState<number>(10.5);
  const [tenureType, setTenureType] = useState<'years' | 'months'>('years');
  const [tenureValue, setTenureValue] = useState<number>(20);
  const [moratoriumMonths, setMoratoriumMonths] = useState<number>(12);
  const [startYear, setStartYear] = useState<number>(new Date().getFullYear());
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');

  const [loanAmtText, setLoanAmtText] = useState<string>("25,00,000");
  const [rateText, setRateText] = useState<string>("10.5");
  const [tenureText, setTenureText] = useState<string>("20");
  const [moraText, setMoraText] = useState<string>("12");

  useEffect(() => { setLoanAmtText(loanAmount.toLocaleString('en-IN')); }, [loanAmount]);
  useEffect(() => { setRateText(interestRate.toString()); }, [interestRate]);
  useEffect(() => { setTenureText(tenureValue.toString()); }, [tenureValue]);
  useEffect(() => { setMoraText(moratoriumMonths.toString()); }, [moratoriumMonths]);

  const calculation = useMemo(() => {
    const P = Math.max(50000, isNaN(loanAmount) ? 2500000 : loanAmount);
    const R = Math.max(1, Math.min(30, isNaN(interestRate) ? 10.5 : interestRate));
    const T = tenureType === 'years' ? Math.max(1, Math.min(30, isNaN(tenureValue) ? 20 : tenureValue)) : Math.max(1, Math.min(360, isNaN(tenureValue) ? 240 : tenureValue));
    
    const totalMonths = tenureType === 'years' ? T * 12 : T;
    const mora = Math.max(0, Math.min(84, isNaN(moratoriumMonths) ? 0 : moratoriumMonths));
    const monthlyRate = R / 100 / 12;

    const yearlyRows = [];
    let balance = P;
    let moratoriumInterest = 0;
    let yearInterest = 0;
    for (let month = 1; month <= mora; month += 1) {
      const interestForMonth = balance * monthlyRate;
      moratoriumInterest += interestForMonth;
      yearInterest += interestForMonth;
      balance += interestForMonth;
      if (month % 12 === 0 || month === mora) {
        yearlyRows.push({
          year: startYear + yearlyRows.length,
          startBalance: 0,
          principalPaid: 0,
          interestPaid: Math.round(yearInterest),
          endBalance: Math.round(balance),
        });
        yearInterest = 0;
      }
    }
    const principalAtEmi = balance;

    let emi = 0;
    if (monthlyRate === 0) {
      emi = principalAtEmi / totalMonths;
    } else {
      const pow = Math.pow(1 + monthlyRate, totalMonths);
      emi = (principalAtEmi * monthlyRate * pow) / (pow - 1);
    }

    const totalPayment = emi * totalMonths;
    const totalInterestPayable = Math.max(0, totalPayment - P);

    for (let y = 1; y <= Math.ceil(totalMonths / 12); y++) {
      let yrPrincipal = 0;
      let yrInterest = 0;
      let startBal = balance;

      for (let m = 1; m <= 12; m++) {
        if ((y - 1) * 12 + m > totalMonths) break;
        const interestForMonth = balance * monthlyRate;
        const principalForMonth = emi - interestForMonth;
        yrInterest += interestForMonth;
        yrPrincipal += principalForMonth;
        balance = Math.max(0, balance - principalForMonth);
      }

      yearlyRows.push({
        year: startYear + yearlyRows.length,
        startBalance: Math.round(startBal),
        principalPaid: Math.round(yrPrincipal),
        interestPaid: Math.round(yrInterest),
        endBalance: Math.round(balance)
      });
    }

    return {
      principal: P,
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterestPayable),
      totalPayment: Math.round(totalPayment),
      totalMonths,
      moratoriumMonths: mora,
      moratoriumInterest: Math.round(moratoriumInterest),
      principalAtEmi: Math.round(principalAtEmi),
      yearlyRows
    };
  }, [loanAmount, interestRate, tenureType, tenureValue, moratoriumMonths, startYear]);

  const report = useMemo(() => composeLoan({
    slug: "education-loan-emi-calculator",
    heading: "Education Loan EMI Report",
    objective: "Education loan",
    principal: calculation.principal,
    emi: calculation.emi,
    interest: calculation.totalInterest,
    total: calculation.totalPayment,
    rate: interestRate,
    tenureLabel: calculation.moratoriumMonths
      ? `${calculation.totalMonths % 12 === 0 ? `${calculation.totalMonths / 12} years` : `${calculation.totalMonths} months`} + ${calculation.moratoriumMonths}m grace`
      : `${calculation.totalMonths} months`,
    repaymentMonths: calculation.totalMonths,
    balanceAtEmi: calculation.principalAtEmi,
    rows: calculation.yearlyRows,
  }), [calculation, interestRate]);

  const inr = (v: number) => Math.round(v).toLocaleString('en-IN');
  const rs = (v: number) => 'Rs. ' + inr(v);

  // Donut chart metrics
  const C = 2 * Math.PI * 80;
  const gap = 2;
  const princRatio = calculation.totalPayment > 0 ? calculation.principal / calculation.totalPayment : 0;
  const a = princRatio * C;
  const b = C - a;
  const princDash = `${Math.max(a - gap, 0)} ${C}`;
  const intDash = `${b > gap ? b - gap : 0} ${C}`;
  const intOffset = -a;

  return (
    <div className="font-[var(--fs)] bg-white text-[#111827] antialiased min-h-screen py-10 px-5">
      <div className="max-w-[1240px] mx-auto">
        
        {}
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <div className="text-xs font-semibold text-[#6B7280]">
            Know more about Educational Loan, Education Loan in India and calculate Education Loans using our Education Loan Calculator.
          </div>
          <CalculatorActions report={report} />
        </div>

        {/* Navigation Tabs Bar matching screenshot */}
        <div className="flex border-b border-[#E3E8F4] mb-8 overflow-x-auto">
          {LOAN_TABS.map((tab) => (
            <Link
              key={tab.to}
              to={tab.to}
              className={`py-3 px-6 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                tab.to.endsWith("education-loan-emi-calculator")
                  ? "border-[#1A3B9F] text-white bg-[#1A3B9F] rounded-t-[8px]"
                  : "border-transparent text-[#6B7280] hover:text-[#111827]"
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>

        {}
        <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-6 items-start mb-10">
          
          {/* Controls Card */}
          <div className="bg-white border border-[#E3E8F4] rounded-[20px] shadow-sm overflow-hidden">
            
            {/* Field 1: Education Loan Amount */}
            <div className="p-7 border-b border-[#E3E8F4]">
              <div className="flex justify-between items-center gap-4 mb-4 flex-wrap">
                <label htmlFor={loanAmtId} className="text-base font-bold text-[#111827] flex-1 min-w-[220px]">
                  Education Loan Amount (Rs)
                </label>
                <div className="flex items-center bg-[#EEF2FB] border border-transparent focus-within:border-[#1A3B9F] rounded-[8px] px-3.5 h-12 w-[190px]">
                  <input
                    id={loanAmtId}
                    type="text"
                    inputMode="numeric"
                    value={loanAmtText}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/[^0-9]/g, '');
                      setLoanAmtText(raw ? Number(raw).toLocaleString('en-IN') : '');
                      const val = Number(raw);
                      if (!isNaN(val)) setLoanAmount(Math.min(10000000, Math.max(50000, val)));
                    }}
                    onBlur={() => {
                      const num = Number(loanAmtText.replace(/[^0-9]/g, '')) || 500000;
                      const clamped = Math.min(10000000, Math.max(50000, num));
                      setLoanAmount(clamped);
                      setLoanAmtText(clamped.toLocaleString('en-IN'));
                    }}
                    className="border-0 bg-transparent outline-0 font-['Nunito_Sans',sans-serif] text-xl font-extrabold text-[#1A3B9F] text-right w-full"
                  />
                  <span className="text-xs font-bold text-[#6B7280] ml-2">Rs</span>
                </div>
              </div>
              <input
                type="range"
                min="100000"
                max="10000000"
                step="50000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                style={{ background: `linear-gradient(90deg, #1A3B9F 0 ${((loanAmount - 100000) / (10000000 - 100000)) * 100}%, #E5E9F2 0 100%)` }}
                className="w-full h-2 rounded-full cursor-pointer appearance-none bg-[#E5E9F2] accent-[#1A3B9F]"
              />
              <div className="flex justify-between mt-3 text-xs font-bold text-[#6B7280]">
                <i>Rs. 1,00,000</i><i>Rs. 1,00,00,000</i>
              </div>
            </div>

            {/* Field 2: Interest Rate */}
            <div className="p-7 border-b border-[#E3E8F4]">
              <div className="flex justify-between items-center gap-4 mb-4 flex-wrap">
                <label htmlFor={rateId} className="text-base font-bold text-[#111827] flex-1 min-w-[220px]">
                  Interest Rate (% per annum)
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
                      if (!isNaN(val)) setInterestRate(Math.min(30, Math.max(1, val)));
                    }}
                    onBlur={() => {
                      const num = Number(rateText.replace(/[^0-9.]/g, '')) || 10.5;
                      const clamped = Math.min(30, Math.max(1, num));
                      setInterestRate(clamped);
                      setRateText(clamped.toString());
                    }}
                    className="border-0 bg-transparent outline-0 font-['Nunito_Sans',sans-serif] text-xl font-extrabold text-[#1A3B9F] text-right w-full"
                  />
                  <span className="text-xs font-bold text-[#6B7280] ml-2">%</span>
                </div>
              </div>
              <input
                type="range"
                min="5"
                max="20"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                style={{ background: `linear-gradient(90deg, #1A3B9F 0 ${((interestRate - 5) / 15) * 100}%, #E5E9F2 0 100%)` }}
                className="w-full h-2 rounded-full cursor-pointer appearance-none bg-[#E5E9F2] accent-[#1A3B9F]"
              />
              <div className="flex justify-between mt-3 text-xs font-bold text-[#6B7280]">
                <i>5% PA</i><i>20% PA</i>
              </div>
            </div>

            <div className="p-7 border-b border-[#E3E8F4]">
              <div className="flex justify-between items-center gap-4 mb-4 flex-wrap">
                <label htmlFor={moraId} className="text-base font-bold text-[#111827] flex-1 min-w-[220px]">
                  Moratorium (course + grace)
                  <span className="block text-xs font-semibold text-[#6B7280] mt-0.5">Interest is added to the loan. EMI starts after this.</span>
                </label>
                <div className="flex items-center bg-[#EEF2FB] border border-transparent focus-within:border-[#1A3B9F] rounded-[8px] px-3.5 h-12 w-[190px]">
                  <input
                    id={moraId}
                    type="text"
                    inputMode="numeric"
                    value={moraText}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/[^0-9]/g, "");
                      setMoraText(raw);
                      const val = Number(raw);
                      if (!isNaN(val)) setMoratoriumMonths(Math.min(84, Math.max(0, val)));
                    }}
                    onBlur={() => {
                      const clamped = Math.min(84, Math.max(0, Number(moraText) || 0));
                      setMoratoriumMonths(clamped);
                      setMoraText(String(clamped));
                    }}
                    className="border-0 bg-transparent outline-0 font-['Nunito_Sans',sans-serif] text-xl font-extrabold text-[#1A3B9F] text-right w-full"
                  />
                  <span className="text-xs font-bold text-[#6B7280] ml-2">Months</span>
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="84"
                step="1"
                value={moratoriumMonths}
                onChange={(e) => setMoratoriumMonths(Number(e.target.value))}
                style={{ background: `linear-gradient(90deg, #1A3B9F 0 ${(moratoriumMonths / 84) * 100}%, #E5E9F2 0 100%)` }}
                className="w-full h-2 rounded-full cursor-pointer appearance-none bg-[#E5E9F2] accent-[#1A3B9F]"
              />
              <div className="flex justify-between mt-3 text-xs font-bold text-[#6B7280]">
                <i>No moratorium</i><i>7 years</i>
              </div>
            </div>

            {/* Field 3: Loan Tenure */}
            <div className="p-7">
              <div className="flex justify-between items-center gap-4 mb-4 flex-wrap">
                <div className="flex-1 min-w-[220px]">
                  <label htmlFor={tenureId} className="text-base font-bold text-[#111827] block">
                    Loan Tenure
                  </label>
                  <div className="flex gap-4 mt-1.5">
                    <label className="inline-flex items-center gap-2 text-xs font-bold text-[#374151] cursor-pointer">
                      <input
                        type="radio"
                        name="tenureTypeEdu"
                        checked={tenureType === 'years'}
                        onChange={() => { setTenureType('years'); setTenureValue(20); }}
                        className="accent-[#1A3B9F]"
                      />
                      Years
                    </label>
                    <label className="inline-flex items-center gap-2 text-xs font-bold text-[#374151] cursor-pointer">
                      <input
                        type="radio"
                        name="tenureTypeEdu"
                        checked={tenureType === 'months'}
                        onChange={() => { setTenureType('months'); setTenureValue(240); }}
                        className="accent-[#1A3B9F]"
                      />
                      Months
                    </label>
                  </div>
                </div>

                <div className="flex items-center bg-[#EEF2FB] border border-transparent focus-within:border-[#1A3B9F] rounded-[8px] px-3.5 h-12 w-[190px]">
                  <input
                    id={tenureId}
                    type="text"
                    inputMode="numeric"
                    value={tenureText}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/[^0-9]/g, '');
                      setTenureText(raw);
                      const val = Number(raw);
                      if (!isNaN(val)) setTenureValue(val);
                    }}
                    onBlur={() => {
                      const max = tenureType === 'years' ? 30 : 360;
                      const num = Number(tenureText.replace(/[^0-9]/g, '')) || (tenureType === 'years' ? 20 : 240);
                      const clamped = Math.min(max, Math.max(1, num));
                      setTenureValue(clamped);
                      setTenureText(clamped.toString());
                    }}
                    className="border-0 bg-transparent outline-0 font-['Nunito_Sans',sans-serif] text-xl font-extrabold text-[#1A3B9F] text-right w-full"
                  />
                  <span className="text-xs font-bold text-[#6B7280] ml-2">{tenureType === 'years' ? 'Years' : 'Months'}</span>
                </div>
              </div>

              <input
                type="range"
                min="1"
                max={tenureType === 'years' ? '30' : '360'}
                step="1"
                value={tenureValue}
                onChange={(e) => setTenureValue(Number(e.target.value))}
                style={{ background: `linear-gradient(90deg, #1A3B9F 0 ${((tenureValue - 1) / ((tenureType === 'years' ? 30 : 360) - 1)) * 100}%, #E5E9F2 0 100%)` }}
                className="w-full h-2 rounded-full cursor-pointer appearance-none bg-[#E5E9F2] accent-[#1A3B9F]"
              />
              <div className="flex justify-between mt-3 text-xs font-bold text-[#6B7280]">
                <i>1 Year</i><i>30 Years</i>
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
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                  <b className="font-[var(--fd)] text-xl text-[#091540]">{rs(calculation.emi)}</b>
                  <small className="text-[9px] font-extrabold text-[#6B7280] mt-1 tracking-widest">MONTHLY EMI</small>
                </div>
              </div>
              <div className="flex gap-6 flex-wrap justify-center mt-5 text-xs font-bold text-[#374151]">
                <span className="inline-flex items-center gap-2"><i className="w-3 h-3 rounded-[3px] bg-[#FFC107] inline-block" />Principal Amount</span>
                <span className="inline-flex items-center gap-2"><i className="w-3 h-3 rounded-[3px] bg-[#1A3B9F] inline-block" />Interest Amount</span>
              </div>
            </div>

            {/* Summary Banner Cards matching screenshot */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#FFFDF0] border border-[#FFE8A3] rounded-[16px] p-4 text-center shadow-sm">
                <div className="text-[11px] font-semibold text-[#856404]">Monthly Payment (EMI)</div>
                <div className="text-base font-extrabold text-[#D97706] mt-1">{rs(calculation.emi)}</div>
              </div>
              <div className="bg-[#FFFDF0] border border-[#FFE8A3] rounded-[16px] p-4 text-center shadow-sm">
                <div className="text-[11px] font-semibold text-[#856404]">Total Interest Payable</div>
                <div className="text-base font-extrabold text-[#D97706] mt-1">{rs(calculation.totalInterest)}</div>
              </div>
            </div>

            <div className="bg-[#EEF2FB] border border-[#C5D3F2] rounded-[16px] p-4 text-center shadow-sm">
              <div className="text-[11px] font-semibold text-[#1A3B9F]">Total Payment (Principal + Interest)</div>
              <div className="text-xl font-extrabold text-[#1A3B9F] mt-1">{rs(calculation.totalPayment)}</div>
              {calculation.moratoriumMonths > 0 && (
                <p className="mt-2 text-[11px] font-semibold leading-relaxed text-[#374151]">
                  During {calculation.moratoriumMonths} months of moratorium, {rs(calculation.moratoriumInterest)} of interest is added. EMI then runs on {rs(calculation.principalAtEmi)}.
                </p>
              )}
            </div>

          </div>

        </div>

        {}
        <div className="bg-white border border-[#E3E8F4] rounded-[20px] shadow-sm overflow-hidden mb-12">
          <div className="p-6 border-b border-[#E3E8F4] bg-[#EEF2FB] flex justify-between items-center flex-wrap gap-4">
            <div>
              <h3 className="font-[var(--fd)] text-base font-bold text-[#091540]">Equated Monthly Installment</h3>
              <p className="text-xs text-[#6B7280] mt-0.5">
                {calculation.moratoriumMonths > 0
                  ? `Moratorium from ${startYear}, then EMI on the balance after interest is added.`
                  : `EMI payments starting from ${startYear}.`}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <label htmlFor={startYearId} className="text-xs font-bold text-[#374151]">Start Year:</label>
                <select
                  id={startYearId}
                  value={startYear}
                  onChange={(e) => setStartYear(Number(e.target.value))}
                  className="bg-white border border-[#E3E8F4] rounded-[6px] px-3 py-1.5 text-xs font-bold text-[#1A3B9F] outline-0 cursor-pointer"
                >
                  {Array.from({ length: 8 }, (_, index) => new Date().getFullYear() + index).map((yr) => (
                    <option key={yr} value={yr}>{yr}</option>
                  ))}
                </select>
              </div>

              <div className="flex bg-[#E5E9F2] p-1 rounded-[8px]">
                <button
                  onClick={() => setViewMode('chart')}
                  className={`py-1.5 px-4 rounded-[6px] text-xs font-extrabold transition-all cursor-pointer border-0 ${
                    viewMode === 'chart' ? 'bg-[#1A3B9F] text-white shadow-sm' : 'bg-transparent text-[#374151]'
                  }`}
                >
                  Chart
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`py-1.5 px-4 rounded-[6px] text-xs font-extrabold transition-all cursor-pointer border-0 ${
                    viewMode === 'table' ? 'bg-[#1A3B9F] text-white shadow-sm' : 'bg-transparent text-[#374151]'
                  }`}
                >
                  Table
                </button>
              </div>
            </div>
          </div>

          {}
          {viewMode === 'chart' ? (
            <div className="p-7">
              {/* Legend matching screenshot */}
              <div className="flex justify-end gap-6 mb-6 text-xs font-bold text-[#374151]">
                <span className="inline-flex items-center gap-2"><i className="w-3 h-3 rounded-[3px] bg-[#22C55E] inline-block" />Principal</span>
                <span className="inline-flex items-center gap-2"><i className="w-3 h-3 rounded-[3px] bg-[#3B82F6] inline-block" />Interest</span>
                <span className="inline-flex items-center gap-2"><i className="w-3 h-3 rounded-full bg-[#EAB308] inline-block" />Balance</span>
              </div>

              {/* Stacked Bar Chart with Line overlay */}
              <div className="h-[320px] flex items-end gap-2 pt-6 border-b border-[#E3E8F4] relative">
                {calculation.yearlyRows.map((row, idx) => {
                  const maxBal = Math.max(calculation.principalAtEmi, calculation.principal, ...calculation.yearlyRows.map((item) => item.endBalance), 1);
                  const totalPaid = row.principalPaid + row.interestPaid;
                  const totalH = totalPaid > 0 ? Math.min(260, (totalPaid / (calculation.emi * 12 || 1)) * 180) : 0;
                  const princH = totalPaid > 0 ? (row.principalPaid / totalPaid) * totalH : 0;
                  const intH = totalPaid > 0 ? totalH - princH : 0;
                  const lineY = Math.max(10, (row.endBalance / maxBal) * 220);

                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                      <div className="w-full flex flex-col items-center">
                        <div className="w-[75%] bg-[#3B82F6] rounded-t-[2px]" style={{ height: `${intH > 0 ? Math.max(4, intH) : 0}px` }} />
                        <div className="w-[75%] bg-[#22C55E]" style={{ height: `${princH > 0 ? Math.max(4, princH) : 0}px` }} />
                      </div>
                      <span className="text-[10px] text-[#6B7280] mt-3 block font-semibold">{row.year}</span>

                      {/* Line point representation */}
                      <div className="absolute w-2 h-2 rounded-full bg-[#EAB308] border border-white shadow" style={{ bottom: `${lineY + 30}px` }} />

                      {/* Tooltip */}
                      <div className="absolute bottom-full mb-3 hidden group-hover:block bg-[#091540] text-white text-[11px] p-2.5 rounded shadow-xl z-20 whitespace-nowrap">
                        <b>Year: {row.year}</b><br />
                        Principal Paid: {rs(row.principalPaid)}<br />
                        Interest Paid: {rs(row.interestPaid)}<br />
                        Remaining Balance: {rs(row.endBalance)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-white border-b border-[#E3E8F4] text-xs font-bold text-[#6B7280] uppercase tracking-wider">
                    <th className="p-4 pl-6">Year</th>
                    <th className="p-4">Principal Paid</th>
                    <th className="p-4">Interest Paid</th>
                    <th className="p-4 pr-6 text-right">Remaining Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E3E8F4] text-[#374151]">
                  {calculation.yearlyRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#F8FAFE] transition-colors">
                      <td className="p-4 pl-6 font-bold text-[#1A3B9F]">{row.year}</td>
                      <td className="p-4 font-semibold text-[#22C55E]">{rs(row.principalPaid)}</td>
                      <td className="p-4 text-[#3B82F6]">{rs(row.interestPaid)}</td>
                      <td className="p-4 pr-6 text-right font-bold text-[#091540]">{rs(row.endBalance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p className="mt-8 text-xs text-[#6B7280] leading-relaxed">
          <b>Disclaimer:</b> Education loan EMI calculations are for illustrative purposes and assume fixed interest rates over the tenure. Actual bank terms and processing fees vary. Anmol Share Broking Pvt. Ltd. — AMFI-registered Mutual Fund Distributor, ARN: 114893.
        </p>

      </div>
    </div>
  );
}