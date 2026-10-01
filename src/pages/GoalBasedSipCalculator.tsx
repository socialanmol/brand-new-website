import { useId, useMemo, useState } from "react";

const formatINR = (value: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(value));

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, Number.isFinite(value) ? value : min));

export default function GoalBasedSipCalculator() {
  const targetId = useId();
  const yearsId = useId();
  const returnId = useId();

  const [targetAmount, setTargetAmount] = useState(5000000);
  const [years, setYears] = useState(10);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [targetText, setTargetText] = useState("50,00,000");
  const [yearsText, setYearsText] = useState("10");
  const [returnText, setReturnText] = useState("12");

  const projection = useMemo(() => {
    const months = years * 12;
    const monthlyRate = Math.pow(1 + expectedReturn / 100, 1 / 12) - 1;
    const monthlySip =
      monthlyRate === 0
        ? targetAmount / months
        : targetAmount / (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));

    return {
      months,
      monthlySip,
      invested: monthlySip * months,
      growth: targetAmount - monthlySip * months,
    };
  }, [targetAmount, years, expectedReturn]);

  const targetTrack = `linear-gradient(90deg, #1A3B9F 0 ${((targetAmount - 100000) / 49900000) * 100}%, #E2E8F0 0 100%)`;
  const yearsTrack = `linear-gradient(90deg, #1A3B9F 0 ${((years - 1) / 39) * 100}%, #E2E8F0 0 100%)`;
  const returnTrack = `linear-gradient(90deg, #1A3B9F 0 ${((expectedReturn - 5) / 15) * 100}%, #E2E8F0 0 100%)`;

  const setTarget = (value: number) => {
    const next = clamp(value, 100000, 50000000);
    setTargetAmount(next);
    setTargetText(next.toLocaleString("en-IN"));
  };

  const setYearsValue = (value: number) => {
    const next = clamp(value, 1, 40);
    setYears(next);
    setYearsText(String(next));
  };

  const setReturnValue = (value: number) => {
    const next = clamp(value, 5, 20);
    setExpectedReturn(next);
    setReturnText(String(next));
  };

  return (
    <div className="bg-[#F5F7FF] text-[#111827] antialiased">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="mb-8 rounded-[28px] bg-gradient-to-r from-[#091540] via-[#0D1E52] to-[#1A3B9F] p-8 text-white shadow-xl sm:p-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#8DC63F]/35 bg-[#8DC63F]/10 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#8DC63F]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#8DC63F]" />
            Goal Planning Tool
          </div>
          <h1 className="mt-5 font-['Montserrat',sans-serif] text-3xl font-extrabold sm:text-5xl">
            Goal-Based SIP Calculator
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">
            Start with the life goal you want to fund. We’ll calculate the monthly SIP required to reach it on time.
          </p>
        </section>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.35fr_0.95fr]">
          <div className="overflow-hidden rounded-[24px] border border-[#E2E8F0] bg-white shadow-sm">
            <div className="border-b border-[#E2E8F0] p-6">
              <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <label htmlFor={targetId} className="flex-1 text-base font-bold">
                  What amount do you want to build?
                  <span className="mt-1 block text-xs font-semibold text-[#6B7280]">Your target corpus</span>
                </label>
                <div className="flex h-12 w-full max-w-[220px] items-center rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFF] px-3 focus-within:border-[#1A3B9F]">
                  <span className="mr-2 text-sm font-bold text-[#6B7280]">₹</span>
                  <input
                    id={targetId}
                    type="text"
                    inputMode="numeric"
                    value={targetText}
                    onChange={(event) => {
                      const raw = event.target.value.replace(/[^0-9]/g, "");
                      setTargetText(raw ? Number(raw).toLocaleString("en-IN") : "");
                      if (raw) setTarget(Number(raw));
                    }}
                    onBlur={() => setTargetText(targetAmount.toLocaleString("en-IN"))}
                    className="w-full border-0 bg-transparent text-right text-xl font-extrabold text-[#1A3B9F] outline-none"
                  />
                </div>
              </div>
              <input type="range" min={100000} max={50000000} step={100000} value={targetAmount} onChange={(event) => setTarget(Number(event.target.value))} style={{ background: targetTrack }} className="h-2 w-full cursor-pointer appearance-none rounded-full accent-[#1A3B9F]" />
              <div className="mt-3 flex justify-between text-[11px] font-bold text-[#6B7280]"><span>₹1L</span><span>₹1Cr</span><span>₹2Cr</span><span>₹3Cr</span><span>₹5Cr</span></div>
            </div>

            <div className="border-b border-[#E2E8F0] p-6">
              <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <label htmlFor={yearsId} className="flex-1 text-base font-bold">
                  When do you need the money?
                  <span className="mt-1 block text-xs font-semibold text-[#6B7280]">Your investment horizon</span>
                </label>
                <div className="flex h-12 w-full max-w-[220px] items-center rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFF] px-3 focus-within:border-[#1A3B9F]">
                  <input id={yearsId} type="text" inputMode="numeric" value={yearsText} onChange={(event) => { const raw = event.target.value.replace(/[^0-9]/g, ""); setYearsText(raw); if (raw) setYearsValue(Number(raw)); }} onBlur={() => setYearsText(String(years))} className="w-full border-0 bg-transparent text-right text-xl font-extrabold text-[#1A3B9F] outline-none" />
                  <span className="ml-2 text-xs font-bold text-[#6B7280]">years</span>
                </div>
              </div>
              <input type="range" min={1} max={40} step={1} value={years} onChange={(event) => setYearsValue(Number(event.target.value))} style={{ background: yearsTrack }} className="h-2 w-full cursor-pointer appearance-none rounded-full accent-[#1A3B9F]" />
              <div className="mt-3 flex justify-between text-[11px] font-bold text-[#6B7280]"><span>1 year</span><span>10 years</span><span>20 years</span><span>30 years</span><span>40 years</span></div>
            </div>

            <div className="p-6">
              <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <label htmlFor={returnId} className="flex-1 text-base font-bold">
                  What return should we assume?
                  <span className="mt-1 block text-xs font-semibold text-[#6B7280]">Expected annual return</span>
                </label>
                <div className="flex h-12 w-full max-w-[220px] items-center rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFF] px-3 focus-within:border-[#1A3B9F]">
                  <input id={returnId} type="text" inputMode="decimal" value={returnText} onChange={(event) => { const raw = event.target.value.replace(/[^0-9.]/g, ""); setReturnText(raw); if (raw) setReturnValue(Number(raw)); }} onBlur={() => setReturnText(String(expectedReturn))} className="w-full border-0 bg-transparent text-right text-xl font-extrabold text-[#1A3B9F] outline-none" />
                  <span className="ml-2 text-xs font-bold text-[#6B7280]">%</span>
                </div>
              </div>
              <input type="range" min={5} max={20} step={0.1} value={expectedReturn} onChange={(event) => setReturnValue(Number(event.target.value))} style={{ background: returnTrack }} className="h-2 w-full cursor-pointer appearance-none rounded-full accent-[#1A3B9F]" />
              <div className="mt-3 flex justify-between text-[11px] font-bold text-[#6B7280]"><span>5%</span><span>10%</span><span>12.5%</span><span>15%</span><span>20%</span></div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-[24px] bg-[#091540] p-7 text-center text-white shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8DC63F]">Required monthly SIP</div>
              <div className="mt-3 text-4xl font-extrabold">₹ {formatINR(projection.monthlySip)}</div>
              <p className="mt-2 text-xs text-white/70">for {years} years to reach ₹ {formatINR(targetAmount)}</p>
            </div>
            <div className="overflow-hidden rounded-[24px] border border-[#E2E8F0] bg-white shadow-sm">
              <div className="border-b border-[#E2E8F0] p-5 text-center"><div className="text-xs font-semibold text-[#6B7280]">Total invested</div><div className="mt-1 text-2xl font-extrabold text-[#1A3B9F]">₹ {formatINR(projection.invested)}</div></div>
              <div className="border-b border-[#E2E8F0] p-5 text-center"><div className="text-xs font-semibold text-[#6B7280]">Estimated growth</div><div className="mt-1 text-2xl font-extrabold text-[#6AA32A]">₹ {formatINR(projection.growth)}</div></div>
              <div className="p-5 text-center"><div className="text-xs font-semibold text-[#6B7280]">Goal amount</div><div className="mt-1 text-2xl font-extrabold text-[#091540]">₹ {formatINR(targetAmount)}</div></div>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-[28px] bg-[#EFF8E2] p-7 text-[#091540]">
          <h2 className="font-['Montserrat',sans-serif] text-xl font-extrabold">A goal makes your SIP meaningful.</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#374151]">This illustration helps you understand the monthly discipline required for a target. Actual returns vary, and mutual fund investments are subject to market risks.</p>
        </div>
        <p className="mt-7 text-xs leading-relaxed text-[#6B7280]"><b>Disclaimer:</b> This calculator is for illustration only and assumes monthly investments at a constant annual return. Actual returns are not guaranteed. Mutual fund investments are subject to market risks; read all scheme-related documents carefully. Anmol Share Broking Pvt. Ltd. — AMFI-registered Mutual Fund Distributor, ARN: 114893.</p>
      </div>
    </div>
  );
}
