import { useId, useMemo, useState } from "react";
import CalculatorActions from "../components/CalculatorActions";
import { composeLumpsum } from "../calculators/compose";

const formatINR = (value: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(value));

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, Number.isFinite(value) ? value : min));

export default function LumpsumTargetCalculator() {
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
    const required = targetAmount / Math.pow(1 + expectedReturn / 100, years);
    return {
      required,
      growth: targetAmount - required,
    };
  }, [targetAmount, years, expectedReturn]);

  const report = useMemo(() => composeLumpsum({
    slug: "lumpsum-target-calculator",
    heading: "Lumpsum Target Report",
    objective: "One-time amount for a future corpus",
    heroLabel: "Target corpus",
    principal: projection.required,
    years,
    rate: expectedReturn,
    futureValue: targetAmount,
    growth: projection.growth,
    frequency: "One-time investment",
    narrative: "The amount to invest today is the target divided by (1 + return) raised to the number of years. The table then compounds that amount forward.",
  }), [projection, targetAmount, years, expectedReturn]);

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
    const next = Math.round(clamp(value, 1, 30) * 10) / 10;
    setExpectedReturn(next);
    setReturnText(String(next));
  };

  return (
    <div className="bg-[#F5F7FF] text-[#111827] antialiased">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="mb-8 rounded-[28px] bg-gradient-to-r from-[#091540] via-[#0D1E52] to-[#1A3B9F] p-8 text-white shadow-xl sm:p-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#8DC63F]/35 bg-[#8DC63F]/10 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#8DC63F]">
            One-time investing
          </div>
          <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
            <h1 className="font-['Montserrat',sans-serif] text-3xl font-extrabold sm:text-5xl">Lumpsum Target</h1>
            <div className="rounded-2xl bg-white p-3">
              <CalculatorActions report={report} />
            </div>
          </div>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">
            Start with the corpus you want. This works out the one-time amount to invest today.
          </p>
        </section>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.35fr_0.95fr]">
          <div className="overflow-hidden rounded-[24px] border border-[#E2E8F0] bg-white shadow-sm">
            <Field id={targetId} label="What corpus do you want?" hint="Future value" prefix="₹" text={targetText} min={100000} max={50000000} step={100000} value={targetAmount} ticks={["₹1L", "₹1Cr", "₹2Cr", "₹3Cr", "₹5Cr"]} onText={(raw) => { setTargetText(raw ? Number(raw).toLocaleString("en-IN") : ""); if (raw) setTarget(Number(raw)); }} onBlur={() => setTargetText(targetAmount.toLocaleString("en-IN"))} onChange={setTarget} />
            <Field id={yearsId} label="How many years do you have?" hint="Investment horizon" suffix="years" text={yearsText} min={1} max={40} step={1} value={years} ticks={["1 year", "10 years", "20 years", "30 years", "40 years"]} onText={(raw) => { setYearsText(raw); if (raw) setYearsValue(Number(raw)); }} onBlur={() => setYearsText(String(years))} onChange={setYearsValue} />
            <Field id={returnId} label="What return should we assume?" hint="Expected annual return" suffix="%" text={returnText} min={1} max={30} step={0.1} value={expectedReturn} ticks={["1%", "8%", "12%", "18%", "30%"]} onText={(raw) => { setReturnText(raw); if (raw) setReturnValue(Number(raw)); }} onBlur={() => setReturnText(String(expectedReturn))} onChange={setReturnValue} last />
          </div>
          <div className="flex flex-col gap-4">
            <div className="rounded-[24px] bg-[#091540] p-7 text-center text-white shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8DC63F]">Invest today</div>
              <div className="mt-3 text-4xl font-extrabold">₹ {formatINR(projection.required)}</div>
              <p className="mt-2 text-xs text-white/70">to reach ₹ {formatINR(targetAmount)} in {years} years</p>
            </div>
            <div className="overflow-hidden rounded-[24px] border border-[#E2E8F0] bg-white shadow-sm">
              <div className="border-b border-[#E2E8F0] p-5 text-center"><div className="text-xs font-semibold text-[#6B7280]">Target</div><div className="mt-1 text-2xl font-extrabold text-[#091540]">₹ {formatINR(targetAmount)}</div></div>
              <div className="p-5 text-center"><div className="text-xs font-semibold text-[#6B7280]">Estimated growth</div><div className="mt-1 text-2xl font-extrabold text-[#6AA32A]">₹ {formatINR(projection.growth)}</div></div>
            </div>
          </div>
        </div>
        <p className="mt-7 text-xs leading-relaxed text-[#6B7280]"><b>Disclaimer:</b> This illustration assumes a constant annual return on a single investment. Actual returns are not guaranteed. Mutual fund investments are subject to market risks. Anmol Share Broking Pvt. Ltd. — AMFI-registered Mutual Fund Distributor, ARN: 114893.</p>
      </div>
    </div>
  );
}

function Field({ id, label, hint, prefix, suffix, text, min, max, step, value, ticks, onText, onBlur, onChange, last }: {
  id: string;
  label: string;
  hint: string;
  prefix?: string;
  suffix?: string;
  text: string;
  min: number;
  max: number;
  step: number;
  value: number;
  ticks: string[];
  onText: (raw: string) => void;
  onBlur: () => void;
  onChange: (value: number) => void;
  last?: boolean;
}) {
  const track = `linear-gradient(90deg, #1A3B9F 0 ${((value - min) / (max - min)) * 100}%, #E2E8F0 0 100%)`;
  return (
    <div className={last ? "p-6" : "border-b border-[#E2E8F0] p-6"}>
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <label htmlFor={id} className="flex-1 text-base font-bold">
          {label}
          <span className="mt-1 block text-xs font-semibold text-[#6B7280]">{hint}</span>
        </label>
        <div className="flex h-12 w-full max-w-[220px] items-center rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFF] px-3 focus-within:border-[#1A3B9F]">
          {prefix && <span className="mr-2 text-sm font-bold text-[#6B7280]">{prefix}</span>}
          <input id={id} type="text" inputMode="decimal" value={text} onChange={(event) => onText(event.target.value.replace(/[^0-9.]/g, ""))} onBlur={onBlur} className="w-full border-0 bg-transparent text-right text-xl font-extrabold text-[#1A3B9F] outline-none" />
          {suffix && <span className="ml-2 text-xs font-bold text-[#6B7280]">{suffix}</span>}
        </div>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} style={{ background: track }} className="h-2 w-full cursor-pointer appearance-none rounded-full accent-[#1A3B9F]" />
      <div className="mt-3 flex justify-between text-[11px] font-bold text-[#6B7280]">{ticks.map((tick) => <span key={tick}>{tick}</span>)}</div>
    </div>
  );
}
