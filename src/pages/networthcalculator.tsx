import React, { useState, useId, useMemo } from 'react';

export default function NetworthCalculator() {
  // Asset IDs
  const sharesId = useId();
  const fixedIncId = useId();
  const cashId = useId();
  const propertyId = useId();
  const goldId = useId();
  const otherAssetsId = useId();

  // Liability IDs
  const homeLoanId = useId();
  const personalLoanId = useId();
  const taxOwedId = useId();
  const billsId = useId();
  const ccDuesId = useId();
  const otherLiabId = useId();

  const clientNameId = useId();

  // State for Assets
  const [shares, setShares] = useState<number>(500000);
  const [fixedInc, setFixedInc] = useState<number>(200000);
  const [cash, setCash] = useState<number>(300000);
  const [property, setProperty] = useState<number>(200000);
  const [gold, setGold] = useState<number>(200000);
  const [otherAssets, setOtherAssets] = useState<number>(200000);

  // State for Liabilities
  const [homeLoan, setHomeLoan] = useState<number>(50000);
  const [personalLoan, setPersonalLoan] = useState<number>(250000);
  const [taxOwed, setTaxOwed] = useState<number>(200000);
  const [bills, setBills] = useState<number>(500000);
  const [ccDues, setCcDues] = useState<number>(200000);
  const [otherLiab, setOtherLiab] = useState<number>(20000);

  const [addClient, setAddClient] = useState<boolean>(false);
  const [clientName, setClientName] = useState<string>('');
  const [inputDrafts, setInputDrafts] = useState<Record<string, string>>({});

  const calculation = useMemo(() => {
    const totalAssets = shares + fixedInc + cash + property + gold + otherAssets;
    const totalLiabilities = homeLoan + personalLoan + taxOwed + bills + ccDues + otherLiab;
    const networth = totalAssets - totalLiabilities;

    return {
      totalAssets,
      totalLiabilities,
      networth
    };
  }, [shares, fixedInc, cash, property, gold, otherAssets, homeLoan, personalLoan, taxOwed, bills, ccDues, otherLiab]);

  const inr = (v: number) => Math.round(v).toLocaleString('en-IN');
  const rs = (v: number) => 'Rs. ' + inr(v);

  // Number to Words converter helper for Indian Currency
  const numberToWords = (num: number) => {
    if (num === 0) return '(Rupees Zero Only)';
    if (num >= 10000000) return `(Rupees ${(num / 10000000).toFixed(2)} Crore Only)`;
    if (num >= 100000) return `(Rupees ${(num / 100000).toFixed(2)} Lakh Only)`;
    if (num >= 1000) return `(Rupees ${(num / 1000).toFixed(1)} Thousand Only)`;
    return `(Rupees ${num} Only)`;
  };

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
              Financial Health Audit
            </span>
            <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-bold text-[#091540]">
              Networth Calculator
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
          
          {/* Inputs Card */}
          <div className="bg-white border border-[#E3E8F4] rounded-[20px] shadow-sm p-7 space-y-8">
            
            {/* Financial Assets Section */}
            <div>
              <h3 className="font-[var(--fd)] text-lg font-bold text-[#E65100] mb-5 pb-2 border-b border-[#E3E8F4]">
                Financial Assets
              </h3>

              <div className="space-y-5">
                {[
                  { label: "Shares & Equity Mutual Funds (Rs.)", val: shares, set: setShares, id: sharesId },
                  { label: "Fixed Income Assets (Rs.) \n(Fixed deposits, Bonds, debt funds, PPF etc.)", val: fixedInc, set: setFixedInc, id: fixedIncId },
                  { label: "Cash and Bank Accounts (Rs.) \n(Savings accounts, Cash in hand, liquid funds, etc.)", val: cash, set: setCash, id: cashId },
                  { label: "Property (Rs.)", val: property, set: setProperty, id: propertyId },
                  { label: "Gold and Jewellery (Rs.)", val: gold, set: setGold, id: goldId },
                  { label: "Others (if any) (Rs.)", val: otherAssets, set: setOtherAssets, id: otherAssetsId },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <label htmlFor={item.id} className="text-xs font-bold text-[#374151] block whitespace-pre-line">
                      {item.label}
                    </label>
                    <div className="flex items-center bg-[#EEF2FB] rounded-[8px] px-3.5 h-11 border border-transparent focus-within:border-[#1A3B9F]">
                      <input
                        id={item.id}
                        type="text"
                        inputMode="numeric"
                        value={inputDrafts[item.id] ?? item.val.toLocaleString('en-IN')}
                        onFocus={() => setInputDrafts((drafts) => ({ ...drafts, [item.id]: String(item.val) }))}
                        onChange={(e) => {
                          const raw = e.target.value.replace(/[^0-9]/g, '');
                          setInputDrafts((drafts) => ({ ...drafts, [item.id]: raw }));
                          item.set(raw ? Number(raw) : 0);
                        }}
                        onBlur={() => {
                          setInputDrafts((drafts) => {
                            const next = { ...drafts };
                            delete next[item.id];
                            return next;
                          });
                        }}
                        className="border-0 bg-transparent outline-0 font-bold text-[#1A3B9F] text-right w-full"
                      />
                      <span className="text-xs font-bold text-[#6B7280] ml-2">Rs</span>
                    </div>
                    <span className="text-[10px] text-[#6B7280] italic block text-right">{numberToWords(item.val)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Liabilities Section */}
            <div>
              <h3 className="font-[var(--fd)] text-lg font-bold text-[#1A3B9F] mb-5 pb-2 border-b border-[#E3E8F4]">
                Liabilities
              </h3>

              <div className="space-y-5">
                {[
                  { label: "Home Loan (Rs.)", val: homeLoan, set: setHomeLoan, id: homeLoanId },
                  { label: "Personal & other Loans (Rs.)", val: personalLoan, set: setPersonalLoan, id: personalLoanId },
                  { label: "Income Tax owed (Rs.)", val: taxOwed, set: setTaxOwed, id: taxOwedId },
                  { label: "Outstanding bills / payments (Rs.)", val: bills, set: setBills, id: billsId },
                  { label: "Credit Card dues (Rs.)", val: ccDues, set: setCcDues, id: ccDuesId },
                  { label: "Other liabilities (if any) (Rs.)", val: otherLiab, set: setOtherLiab, id: otherLiabId },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <label htmlFor={item.id} className="text-xs font-bold text-[#374151] block whitespace-pre-line">
                      {item.label}
                    </label>
                    <div className="flex items-center bg-[#EEF2FB] rounded-[8px] px-3.5 h-11 border border-transparent focus-within:border-[#1A3B9F]">
                      <input
                        id={item.id}
                        type="text"
                        inputMode="numeric"
                        value={inputDrafts[item.id] ?? item.val.toLocaleString('en-IN')}
                        onFocus={() => setInputDrafts((drafts) => ({ ...drafts, [item.id]: String(item.val) }))}
                        onChange={(e) => {
                          const raw = e.target.value.replace(/[^0-9]/g, '');
                          setInputDrafts((drafts) => ({ ...drafts, [item.id]: raw }));
                          item.set(raw ? Number(raw) : 0);
                        }}
                        onBlur={() => {
                          setInputDrafts((drafts) => {
                            const next = { ...drafts };
                            delete next[item.id];
                            return next;
                          });
                        }}
                        className="border-0 bg-transparent outline-0 font-bold text-[#1A3B9F] text-right w-full"
                      />
                      <span className="text-xs font-bold text-[#6B7280] ml-2">Rs</span>
                    </div>
                    <span className="text-[10px] text-[#6B7280] italic block text-right">{numberToWords(item.val)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit & Client Name */}
            <div className="pt-4 border-t border-[#E3E8F4] space-y-4">
              <button
                type="button"
                className="w-full h-12 rounded-[8px] bg-[#1A3B9F] text-white font-extrabold text-sm hover:bg-[#132d7c] transition-all cursor-pointer shadow-sm border-0"
              >
                Submit
              </button>

              <div className="flex items-center gap-3 pt-2 flex-wrap">
                <label className="inline-flex items-center gap-2 text-xs font-bold text-[#374151] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={addClient}
                    onChange={(e) => setAddClient(e.target.checked)}
                    className="accent-[#1A3B9F]"
                  />
                  Add Client Name
                </label>
                {addClient && (
                  <input
                    id={clientNameId}
                    type="text"
                    placeholder="Enter Client Name"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="flex-1 bg-[#EEF2FB] border border-[#E3E8F4] rounded-[8px] px-3.5 h-10 text-xs font-semibold text-[#1A3B9F] outline-0"
                  />
                )}
              </div>
            </div>

          </div>

          {/* Results Side */}
          <div className="flex flex-col gap-5">
            
            {/* Multi-Segment Chart Card */}
            <div className="bg-white border border-[#E3E8F4] rounded-[20px] shadow-sm p-6 flex flex-col items-center">
              <h3 className="font-[var(--fd)] text-xl font-bold text-[#091540] mb-4">Networth Breakdown</h3>
              
              <div className="relative w-[210px] h-[210px]">
                <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
                  <circle cx="100" cy="100" r="80" fill="none" strokeWidth="28" stroke="#1A3B9F" strokeDasharray="300 500" />
                  <circle cx="100" cy="100" r="80" fill="none" strokeWidth="28" stroke="#6AA32A" strokeDasharray="150 500" strokeDashoffset="-300" />
                  <circle cx="100" cy="100" r="80" fill="none" strokeWidth="28" stroke="#FFC107" strokeDasharray="80 500" strokeDashoffset="-450" />
                  <circle cx="100" cy="100" r="80" fill="none" strokeWidth="28" stroke="#E65100" strokeDasharray="50 500" strokeDashoffset="-530" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <b className="font-[var(--fd)] text-lg text-[#091540]">{rs(calculation.networth)}</b>
                  <small className="text-[9px] font-extrabold text-[#6B7280] mt-1 tracking-widest uppercase">NETWORTH</small>
                </div>
              </div>

              <div className="flex gap-6 flex-wrap justify-center mt-5 text-xs font-bold text-[#374151]">
                <span className="inline-flex items-center gap-1.5"><i className="w-3 h-3 rounded-[3px] bg-[#1A3B9F] inline-block" />Financial Assets</span>
                <span className="inline-flex items-center gap-1.5"><i className="w-3 h-3 rounded-[3px] bg-[#E65100] inline-block" />Liabilities</span>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="bg-white border border-[#E3E8F4] rounded-[20px] shadow-sm overflow-hidden text-center divide-y divide-[#E3E8F4]">
              <div className="p-5">
                <div className="text-xs font-semibold text-[#6B7280]">Total Assets</div>
                <div className="text-xl font-extrabold text-[#1A3B9F] mt-1">{rs(calculation.totalAssets)}</div>
              </div>

              <div className="p-5">
                <div className="text-xs font-semibold text-[#6B7280]">Total Liabilities</div>
                <div className="text-xl font-extrabold text-[#E65100] mt-1">{rs(calculation.totalLiabilities)}</div>
              </div>

              <div className="p-6 bg-[#EEF2FB]">
                <div className="text-xs font-semibold text-[#1A3B9F]">Your Networth {clientName ? `for ${clientName}` : ''}</div>
                <div className="text-2xl font-extrabold text-[#091540] mt-1">{rs(calculation.networth)}</div>
              </div>
            </div>

          </div>

        </div>

        <p className="mt-8 text-xs text-[#6B7280] leading-relaxed">
          <b>Disclaimer:</b> Networth calculations provide an aggregate overview of financial health based on declared assets and liabilities. Anmol Share Broking Pvt. Ltd. — AMFI-registered Mutual Fund Distributor, ARN: 114893.
        </p>

      </div>
    </div>
  );
}