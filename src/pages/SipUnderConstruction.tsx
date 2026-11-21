import { Link } from "react-router";

export default function SipUnderConstruction() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center font-[var(--fs)] text-center px-6 py-20 bg-[#F8FAFE]">
      <div>
        <div className="w-20 h-20 rounded-[24%] bg-[#EEF2FB] flex items-center justify-center text-4xl mx-auto mb-6 shadow-[0_8px_30px_rgba(26,59,159,.12)]">
          🚧
        </div>
        <span className="block text-[11px] font-extrabold tracking-[.16em] uppercase text-[#8DC63F] mb-3">
          Under construction
        </span>
        <h1 className="font-[var(--fd)] text-[clamp(26px,4vw,38px)] font-bold text-[#111827] mb-3.5 tracking-tight">
          Systematic Investment Plan
        </h1>
        <p className="text-[15.5px] leading-relaxed text-[#6B7280] font-light max-w-[42ch] mx-auto mb-8">
          This page is under construction. Check back soon, or return to mutual funds.
        </p>
        <Link
          to="/mutual-funds"
          className="inline-flex items-center gap-2 text-sm font-extrabold text-[#091540] bg-[#8DC63F] px-6 py-3 rounded-full"
        >
          ← Back to Mutual Funds
        </Link>
      </div>
    </div>
  );
}
