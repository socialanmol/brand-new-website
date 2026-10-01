import React, { useState, useEffect, useId, useMemo } from 'react';

export default function CarLoanCalculator() {
  const loanAmtId = useId();
  const rateId = useId();
  const tenureId = useId();

  const [carType, setCarType] = useState<'new' | 'used'>('new');
  const [loanAmount, setLoanAmount] = useState<number>(1000000);
  const [interestRate, setInterestRate] = useState<number>(9.32);
  const [tenureValue, setTenureValue] = useState<number>(7);

  const [loanAmtText, setLoanAmtText] = useState<string>("10,00,000");
  const [rateText, setRateText] = useState<string>("9.32");
  const [tenureText, setTenureText] = useState<string>("7");

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => { setLoanAmtText(loanAmount.toLocaleString('en-IN')); }, [loanAmount]);
  useEffect(() => { setRateText(interestRate.toString()); }, [interestRate]);
  useEffect(() => { setTenureText(tenureValue.toString()); }, [tenureValue]);

  const maxTenure = carType === 'new' ? 8 : 5;

  const calculation = useMemo(() => {
    const P = Math.max(50000, isNaN(loanAmount) ? 1000000 : loanAmount);
    const R = Math.max(1, Math.min(30, isNaN(interestRate) ? 9.32 : interestRate));
    const T = Math.max(1, Math.min(maxTenure, isNaN(tenureValue) ? 7 : tenureValue));
    
    const totalMonths = T * 12;
    const monthlyRate = R / 100 / 12;

    let emi = 0;
    if (monthlyRate === 0) {
      emi = P / totalMonths;
    } else {
      const pow = Math.pow(1 + monthlyRate, totalMonths);
      emi = (P * monthlyRate * pow) / (pow - 1);
    }

    const totalPayment = emi * totalMonths;
    const totalInterestPayable = Math.max(0, totalPayment - P);

    // Amortization schedule per year
    const yearlyRows = [];
    let balance = P;
    const startYear = new Date().getFullYear();

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
        year: startYear + y - 1,
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
      yearlyRows
    };
  }, [loanAmount, interestRate, tenureValue, maxTenure]);

  const inr = (v: number) => Math.round(v).toLocaleString('en-IN');
  const rs = (v: number) => 'Rs. ' + inr(v);

  // Donut metrics
  const C = 2 * Math.PI * 80;
  const gap = 2;
  const princRatio = calculation.totalPayment > 0 ? calculation.principal / calculation.totalPayment : 0;
  const a = princRatio * C;
  const b = C - a;
  const princDash = `${Math.max(a - gap, 0)} ${C}`;
  const intDash = `${b > gap ? b - gap : 0} ${C}`;
  const intOffset = -a;

  const handleDownloadPDF = (e: React.MouseEvent) => {
    e.preventDefault();
    window.print();
  };

  const FAQS = [
    { q: "What is the typical tenure of a Car Loan in India?", a: "The typical tenure of a car loan can fall between 1 to 7 years. However, tenures can go up to 8 years for electric vehicles (EVs)." },
    { q: "Is the Car Loan EMI Calculator based on a Fixed or Floating Rate of Interest?", a: "Most car loans in India operate on fixed rates of interest throughout the tenure, meaning your EMI remains constant every month." },
    { q: "How to use the Car Loan EMI Calculator?", a: "Simply slide or type your required loan amount, interest rate, and preferred loan tenure. The calculator instantly computes your monthly EMI and total interest payable." },
    { q: "Is the Car Loan EMI fixed, or can it change in the future?", a: "For fixed-rate car loans, your EMI is locked and remains unchanged. If you opt for a rare floating rate loan, your EMI may fluctuate with repo rate changes." },
    { q: "How is EMI calculated for a Car Loan?", a: "EMI is calculated using the formula: [P x r x (1+r)^n] / [(1+r)^n - 1], where P is Principal, r is monthly interest rate, and n is tenure in months." },
    { q: "How much time does it take to use the calculator?", a: "It is instant and real-time! As soon as you adjust any slider, your EMI figures update automatically." }
  ];

  return (
    <div className="font-[var(--fs)] bg-white text-[#111827] antialiased min-h-screen py-10 px-5">
      <div className="max-w-[1240px] mx-auto">
        
        {/* Top Header & PDF Action */}
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.14em] text-[#6AA32A] bg-[#EFF8E2] px-3 py-1.5 rounded-full mb-2">
              Auto Financing Tool
            </span>
            <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-bold text-[#091540]">
              Calculate Your Car Loan EMI
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

        <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-6 items-start mb-10">
          
          {/* Controls Card */}
          <div className="bg-white border border-[#E3E8F4] rounded-[20px] shadow-sm overflow-hidden">
            
            {/* Buying a: New / Pre-owned */}
            <div className="p-7 border-b border-[#E3E8F4] bg-[#F8FAFE]">
              <div className="flex items-center gap-6 flex-wrap">
                <span className="text-sm font-bold text-[#374151]">Buying a</span>
                <label className="inline-flex items-center gap-2 text-sm font-bold text-[#111827] cursor-pointer">
                  <input
                    type="radio"
                    name="carTypeSelection"
                    checked={carType === 'new'}
                    onChange={() => { setCarType('new'); if (tenureValue > 8) setTenureValue(7); }}
                    className="accent-[#1A3B9F]"
                  />
                  New Car
                </label>
                <label className="inline-flex items-center gap-2 text-sm font-bold text-[#111827] cursor-pointer">
                  <input
                    type="radio"
                    name="carTypeSelection"
                    checked={carType === 'used'}
                    onChange={() => { setCarType('used'); if (tenureValue > 5) setTenureValue(5); }}
                    className="accent-[#1A3B9F]"
                  />
                  Pre-owned Car
                </label>
              </div>
            </div>

            {/* Field 1: Car Loan Amount */}
            <div className="p-7 border-b border-[#E3E8F4]">
              <div className="flex justify-between items-center gap-4 mb-4 flex-wrap">
                <label htmlFor={loanAmtId} className="text-base font-bold text-[#111827] flex-1 min-w-[220px]">
                  Loan Amount (Rs)
                  <span className="block text-xs font-semibold text-[#6B7280] mt-0.5">Principal loan value</span>
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
                      if (!isNaN(val)) setLoanAmount(Math.min(5000000, Math.max(50000, val)));
                    }}
                    onBlur={() => {
                      const num = Number(loanAmtText.replace(/[^0-9]/g, '')) || 500000;
                      const clamped = Math.min(5000000, Math.max(50000, num));
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
                max="5000000"
                step="50000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                style={{ background: `linear-gradient(90deg, #1A3B9F 0 ${((loanAmount - 100000) / (5000000 - 100000)) * 100}%, #E5E9F2 0 100%)` }}
                className="w-full h-2 rounded-full cursor-pointer appearance-none bg-[#E5E9F2] accent-[#1A3B9F]"
              />
              <div className="flex justify-between mt-3 text-xs font-bold text-[#6B7280]">
                <i>Rs. 1,00,000</i><i>Rs. 50,00,000</i>
              </div>
            </div>

            {/* Field 2: Loan Tenure */}
            <div className="p-7 border-b border-[#E3E8F4]">
              <div className="flex justify-between items-center gap-4 mb-4 flex-wrap">
                <label htmlFor={tenureId} className="text-base font-bold text-[#111827] flex-1 min-w-[220px]">
                  Loan Tenure
                  <span className="block text-xs font-semibold text-[#6B7280] mt-0.5">{tenureValue} Years duration</span>
                </label>
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
                      if (!isNaN(val)) setTenureValue(Math.min(maxTenure, Math.max(1, val)));
                    }}
                    onBlur={() => {
                      const num = Number(tenureText.replace(/[^0-9]/g, '')) || 5;
                      const clamped = Math.min(maxTenure, Math.max(1, num));
                      setTenureValue(clamped);
                      setTenureText(clamped.toString());
                    }}
                    className="border-0 bg-transparent outline-0 font-['Nunito_Sans',sans-serif] text-xl font-extrabold text-[#1A3B9F] text-right w-full"
                  />
                  <span className="text-xs font-bold text-[#6B7280] ml-2">Years</span>
                </div>
              </div>
              <input
                type="range"
                min="1"
                max={maxTenure}
                step="1"
                value={tenureValue}
                onChange={(e) => setTenureValue(Number(e.target.value))}
                style={{ background: `linear-gradient(90deg, #1A3B9F 0 ${((tenureValue - 1) / (maxTenure - 1 || 1)) * 100}%, #E5E9F2 0 100%)` }}
                className="w-full h-2 rounded-full cursor-pointer appearance-none bg-[#E5E9F2] accent-[#1A3B9F]"
              />
              <div className="flex justify-between mt-3 text-xs font-bold text-[#6B7280]">
                <i>1 year</i><i>{maxTenure} years</i>
              </div>
            </div>

            {/* Field 3: Interest Rate */}
            <div className="p-7">
              <div className="flex justify-between items-center gap-4 mb-4 flex-wrap">
                <label htmlFor={rateId} className="text-base font-bold text-[#111827] flex-1 min-w-[220px]">
                  Interest Rate (% per annum)
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
                      if (!isNaN(val)) setInterestRate(Math.min(30, Math.max(1, val)));
                    }}
                    onBlur={() => {
                      const num = Number(rateText.replace(/[^0-9.]/g, '')) || 9.32;
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
                min="7"
                max="15"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                style={{ background: `linear-gradient(90deg, #1A3B9F 0 ${((interestRate - 7) / 8) * 100}%, #E5E9F2 0 100%)` }}
                className="w-full h-2 rounded-full cursor-pointer appearance-none bg-[#E5E9F2] accent-[#1A3B9F]"
              />
              <div className="flex justify-between mt-3 text-xs font-bold text-[#6B7280]">
                <i>7% PA</i><i>15% PA</i>
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
                  <b className="font-[var(--fd)] text-2xl text-[#091540]">{rs(calculation.emi)}</b>
                  <small className="text-[10px] font-extrabold text-[#6B7280] mt-1 tracking-widest">MONTHLY EMI</small>
                </div>
              </div>
              <div className="flex gap-6 flex-wrap justify-center mt-5 text-xs font-bold text-[#374151]">
                <span className="inline-flex items-center gap-2"><i className="w-3 h-3 rounded-[3px] bg-[#FFC107] inline-block" />Principal Amount</span>
                <span className="inline-flex items-center gap-2"><i className="w-3 h-3 rounded-[3px] bg-[#1A3B9F] inline-block" />Interest Amount</span>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="bg-white border border-[#E3E8F4] rounded-[16px] p-4 flex justify-between items-center">
              <span className="text-xs font-semibold text-[#6B7280]">Amount Payable</span>
              <span className="text-base font-extrabold text-[#1A3B9F]">{rs(calculation.totalPayment)}</span>
            </div>

            <div className="bg-white border border-[#E3E8F4] rounded-[16px] p-4 flex justify-between items-center">
              <span className="text-xs font-semibold text-[#6B7280]">Interest Amount</span>
              <span className="text-base font-extrabold text-[#E65100]">{rs(calculation.totalInterest)}</span>
            </div>

            <div className="bg-white border border-[#E3E8F4] rounded-[16px] p-4 flex justify-between items-center">
              <span className="text-xs font-semibold text-[#6B7280]">Principal Amount</span>
              <span className="text-base font-extrabold text-[#091540]">{rs(calculation.principal)}</span>
            </div>

            {/* CTA Buttons */}
          </div>

        </div>

        {/* Amortization Schedule Table */}
        <div className="bg-white border border-[#E3E8F4] rounded-[20px] shadow-sm overflow-hidden mb-12">
          <div className="p-6 border-b border-[#E3E8F4] bg-[#EEF2FB]">
            <h3 className="font-[var(--fd)] text-xl font-bold text-[#091540]">Car Loan EMI Amortization Schedule</h3>
            <p className="text-xs text-[#6B7280] mt-1">Yearly breakdown showing principal paid, interest paid, and remaining car loan balance.</p>
          </div>
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
                    <td className="p-4 font-semibold text-[#6AA32A]">{rs(row.principalPaid)}</td>
                    <td className="p-4 text-[#E65100]">{rs(row.interestPaid)}</td>
                    <td className="p-4 pr-6 text-right font-bold text-[#091540]">{rs(row.endBalance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className="mb-12">
          <h3 className="font-[var(--fd)] text-3xl font-bold text-[#091540] text-center mb-8">Frequently Asked Questions</h3>
          
          <div className="bg-white border border-[#E3E8F4] rounded-[20px] shadow-sm overflow-hidden divide-y divide-[#E3E8F4]">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left p-6 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#111827] cursor-pointer hover:bg-[#F8FAFE] transition-colors"
                  >
                    <span className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-[#EEF2FB] text-[#1A3B9F] text-xs flex items-center justify-center font-bold">?</span>
                      {faq.q}
                    </span>
                    <span className="text-base text-[#1A3B9F]">{isOpen ? "▲" : "▼"}</span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-xs sm:text-sm text-[#374151] font-light leading-relaxed bg-[#F8FAFE]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <p className="mt-8 text-xs text-[#6B7280] leading-relaxed">
          <b>Disclaimer:</b> Car loan calculations are for illustrative purposes and assume fixed interest rates over the tenure. Actual bank terms and processing fees vary. Anmol Share Broking Pvt. Ltd. — AMFI-registered Mutual Fund Distributor, ARN: 114893.
        </p>

      </div>
    </div>
  );
}