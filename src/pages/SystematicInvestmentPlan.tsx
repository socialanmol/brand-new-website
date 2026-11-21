import { useState } from "react";
import { Link } from "react-router";
import AdvisorBookingModal from "../components/AdvisorBookingModal";

const STEPS = [
  { title: "Choose the amount and the date", text: "Pick a fixed sum you can set aside, and a date each month or quarter. Many schemes start at ₹500 a month. Some allow ₹100." },
  { title: "The bank debit runs on its own", text: "After a one-time mandate, the amount moves from your bank account to the mutual fund on that date. There is no monthly cheque and no visit to the fund house." },
  { title: "Each instalment buys units", text: "The instalment buys units at that day's NAV. A lower NAV buys more units. A higher NAV buys fewer. Those units stay invested and can compound." },
];

const POINTS = [
  { title: "Rupee cost averaging", text: "The same rupee amount buys more units when the NAV is low and fewer when it is high. You do not have to guess the right day to invest." },
  { title: "A habit, not a one-off decision", text: "The debit happens on the date you chose, so investing continues through busy months and through market swings." },
  { title: "Room to change course", text: "You can raise the amount, pause a SIP, or stop it. Stopping the SIP itself has no penalty. Redeeming units early can still attract the scheme's exit load." },
  { title: "Sized to a goal", text: "A SIP can be mapped to a home, education, or retirement target. The monthly amount is what you can sustain, not a lump you have to find today." },
];

const FAQS = [
  { q: "Is a SIP a separate product from a mutual fund?", a: "No. A SIP is the way you invest into a mutual fund scheme. You still own units of that scheme. The SIP only sets the amount and the schedule." },
  { q: "What is the smallest SIP I can start?", a: "Many regular schemes start at ₹500 a month. Some schemes allow ₹100. Your advisor confirms the minimum for the scheme you choose." },
  { q: "Can I stop a SIP?", a: "Yes. You can pause or stop a SIP, and there is no penalty for closing the SIP instruction. If you redeem the units you already hold, the scheme's exit load and tax rules still apply." },
  { q: "Does a SIP remove market risk?", a: "No. A SIP spreads your purchases over time. The value of the units still moves with the market, and returns are not guaranteed." },
];

export default function SystematicInvestmentPlan() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="font-[var(--fs)] bg-white text-[#111827] antialiased min-h-screen py-12 px-5 sm:px-8">
      <div className="max-w-[980px] mx-auto space-y-16">
        <div className="space-y-6">
          <Link to="/mutual-funds" className="inline-flex text-xs font-extrabold text-[#1A3B9F] hover:text-[#132d7c]">
            ← Back to Mutual Funds
          </Link>
          <div className="bg-gradient-to-br from-[#EEF2FB] to-white rounded-[32px] p-8 sm:p-12 border border-[#1A3B9F]/15 shadow-sm space-y-5">
            <span className="inline-flex text-[10px] font-extrabold uppercase tracking-wider text-[#1A3B9F] bg-white px-2.5 py-1 rounded-full">
              Mode 01
            </span>
            <h1 className="font-[var(--fd)] text-3xl sm:text-5xl font-extrabold text-[#091540] tracking-tight leading-tight">
              Systematic Investment Plan (SIP)
            </h1>
            <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed font-light">
              A Systematic Investment Plan (SIP), more popularly known as SIP, is a facility offered by mutual funds to the investors to invest in a disciplined manner. SIP facility allows an investor to invest a fixed amount of money at pre-defined intervals in the selected mutual fund scheme. The fixed amount of money can be as low as Rs. 100, while the pre-defined SIP intervals can be on a weekly/monthly/quarterly/semi-annually or annual basis. By taking the SIP route to investments, the investor invests in a time-bound manner without worrying about the market dynamics and stands to benefit in the long-term due to average costing and power of compounding.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="h-12 px-8 rounded-xl bg-[#1A3B9F] text-white font-extrabold text-xs hover:bg-[#132d7c] transition-all cursor-pointer border-0"
              >
                Start a SIP with an advisor →
              </button>
              <Link
                to="/calculators/sip-calculator"
                className="h-12 px-8 rounded-xl bg-white text-[#1A3B9F] font-extrabold text-xs border border-[#1A3B9F]/20 hover:border-[#1A3B9F] transition-all inline-flex items-center"
              >
                Open the SIP calculator
              </Link>
            </div>
          </div>
        </div>

        <section className="space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-[.14em] text-[#6AA32A]">The idea</span>
          <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#091540]">What a SIP is</h2>
          <div className="bg-[#F8FAFE] border border-[#E3E8F4] rounded-[24px] p-6 sm:p-8 space-y-4 text-sm text-[#374151] leading-relaxed font-light">
            <p>
              You commit an amount, such as ₹1,000 or ₹5,000, and a calendar date. On that date the money leaves your bank and buys units of the scheme at the NAV published for that day.
            </p>
            <p>
              The same ₹5,000 buys 250 units when the NAV is ₹20, and 200 units when the NAV is ₹25. Over many months, the average cost of your units sits between the highs and the lows.
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-[.14em] text-[#1A3B9F]">The schedule</span>
            <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#091540]">How a SIP runs</h2>
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STEPS.map((step, index) => (
              <li key={step.title} className="bg-white border border-[#E3E8F4] rounded-[20px] p-6 space-y-3 list-none">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#1A3B9F] bg-[#EEF2FB] px-2.5 py-1 rounded-full">
                  Step 0{index + 1}
                </span>
                <h3 className="font-[var(--fd)] text-base font-bold text-[#091540]">{step.title}</h3>
                <p className="text-xs text-[#6B7280] leading-relaxed font-light">{step.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-[.14em] text-[#6AA32A]">Why investors use it</span>
            <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#091540]">What a SIP is for</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {POINTS.map((point) => (
              <div key={point.title} className="bg-[#F8FAFE] border border-[#E3E8F4] rounded-[20px] p-6 space-y-2">
                <h3 className="font-[var(--fd)] text-base font-bold text-[#091540]">{point.title}</h3>
                <p className="text-xs text-[#6B7280] leading-relaxed font-light">{point.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#091540]">Questions about a SIP</h2>
          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={faq.q} className="border border-[#E3E8F4] rounded-[16px] bg-white">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left text-sm font-bold text-[#091540] cursor-pointer bg-transparent border-0"
                  >
                    <span>{faq.q}</span>
                    <span className="text-lg text-[#1A3B9F] font-extrabold">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-[#374151] font-light leading-relaxed border-t border-[#E3E8F4] pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <section className="bg-gradient-to-br from-[#091540] via-[#0D1E52] to-[#1A3B9F] rounded-[32px] p-8 sm:p-12 text-white text-center space-y-5">
          <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-extrabold tracking-tight">
            Ready to set up a SIP?
          </h2>
          <p className="text-sm text-white/80 max-w-[560px] mx-auto font-light leading-relaxed">
            An advisor at MyAnmol (ARN: 114893) matches the amount, the date, and the scheme to the goal you are funding.
          </p>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="h-12 px-8 rounded-xl bg-[#8DC63F] text-[#091540] font-extrabold text-xs hover:bg-[#9ED64A] transition-all cursor-pointer border-0"
          >
            Speak with an advisor
          </button>
        </section>

        <p className="text-[11px] text-[#6B7280] leading-relaxed">
          Mutual fund investments are subject to market risks. Read all scheme-related documents carefully. A SIP does not guarantee returns, and the unit example above only shows how NAV changes the number of units a fixed amount buys. Anmol Share Broking Pvt. Ltd. is an AMFI-registered mutual fund distributor, ARN: 114893.
        </p>

        <AdvisorBookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </div>
  );
}
