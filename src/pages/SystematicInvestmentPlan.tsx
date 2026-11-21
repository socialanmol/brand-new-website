import { useState } from "react";
import { Link } from "react-router";
import AdvisorBookingModal from "../components/AdvisorBookingModal";

const STEPS = [
  { title: "Choose the amount and the date", text: "Pick a fixed sum you can set aside, and a date each month or quarter. Many schemes start at ₹500 a month. Some allow ₹100." },
  { title: "The bank debit runs on its own", text: "After a one-time mandate, the amount moves from your bank account to the mutual fund on that date. There is no monthly cheque and no visit to the fund house." },
  { title: "Each instalment buys units", text: "The instalment buys units at that day's NAV. A lower NAV buys more units. A higher NAV buys fewer. Those units stay invested and can compound." },
];

const FEATURES = [
  {
    title: "Rupee cost averaging",
    points: [
      "A prominent feature that eliminates the need to worry about market fluctuations.",
      "When market prices are low, more mutual fund units are purchased with fixed SIP instalments.",
      "Averages out the cost of purchasing over time.",
    ],
  },
  {
    title: "Disciplined and consistent investing",
    points: [
      "The principle of systematic investing is simple as it works on regularity and periodicity.",
      "SIPs allow investors to contribute small sums regularly over an extended period.",
      "Payments can be weekly, monthly, or quarterly, promoting disciplined investment.",
    ],
  },
  {
    title: "Professional fund management",
    points: [
      "SIP gives access to professionally managed mutual funds.",
      "Experienced fund managers make investment decisions based on in-depth research and market analysis.",
    ],
  },
  {
    title: "Long-term wealth creation through Compounding",
    points: [
      "Gradual investment compounded over time.",
      "Maximizes potential returns for investors.",
    ],
  },
  {
    title: "Option to temporarily halt investments",
    points: [
      "Investors can pause or cancel an existing SIP, or start a new SIP, with minimal restrictions.",
      "Investors can adjust based on their financial situation.",
    ],
  },
  {
    title: "Unrestricted investment ceiling",
    points: [
      "Investors can start a SIP conveniently with any amount, for there is no upper limit to the SIP amount.",
      "Gradually increase investments as per their financial situation.",
    ],
  },
];

const EARLY_START = [
  { age: 25, investedLabel: "₹42 L", invested: 0.42, valueLabel: "₹5.2 Cr", value: 5.2 },
  { age: 30, investedLabel: "₹36 L", invested: 0.36, valueLabel: "₹3.0 Cr", value: 3.0 },
  { age: 35, investedLabel: "₹30 L", invested: 0.30, valueLabel: "₹1.6 Cr", value: 1.6 },
  { age: 40, investedLabel: "₹24 L", invested: 0.24, valueLabel: "₹0.9 Cr", value: 0.9 },
  { age: 45, investedLabel: "₹18 L", invested: 0.18, valueLabel: "₹0.4 Cr", value: 0.45 },
  { age: 50, investedLabel: "₹12 L", invested: 0.12, valueLabel: "₹0.2 Cr", value: 0.21 },
];
const CHART_MAX = 5.5;

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
            <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed font-light max-w-[680px]">
              A SIP invests a fixed amount into a mutual fund on a date you choose, every month or quarter. It is the regular way to buy units, using rupee cost averaging when markets move.
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
          <div className="bg-[#F8FAFE] border border-[#E3E8F4] rounded-[24px] p-6 sm:p-8 text-sm text-[#374151] leading-relaxed font-light">
            <p>
              A Systematic Investment Plan (SIP), more popularly known as SIP, is a facility offered by mutual funds to the investors to invest in a disciplined manner. SIP facility allows an investor to invest a fixed amount of money at pre-defined intervals in the selected mutual fund scheme. The fixed amount of money can be as low as Rs. 500, while the pre-defined SIP intervals can be on a weekly/monthly/quarterly/semi-annually or annual basis. By taking the SIP route to investments, the investor invests in a time-bound manner without worrying about the market dynamics and stands to benefit in the long-term due to average costing and power of compounding.
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
          <div className="space-y-3 max-w-[760px]">
            <span className="text-xs font-extrabold uppercase tracking-[.14em] text-[#6AA32A]">Features</span>
            <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#091540]">Features of SIP investment plans</h2>
            <p className="text-sm text-[#6B7280] leading-relaxed font-light">
              Systematic Investment Plan (SIP) is a very convenient route of investment in mutual funds for potential long term wealth creation. A systematic investment plan entails investing a fixed amount of money at regular intervals. Besides a simplistic approach, it has several features given below.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {FEATURES.map((feature, index) => (
              <div key={feature.title} className="bg-[#F8FAFE] border border-[#E3E8F4] rounded-[20px] p-6 space-y-3">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#1A3B9F] bg-white px-2.5 py-1 rounded-full">
                  0{index + 1}
                </span>
                <h3 className="font-[var(--fd)] text-base font-bold text-[#091540]">{feature.title}</h3>
                <ul className="space-y-2">
                  {feature.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-xs text-[#6B7280] leading-relaxed font-light">
                      <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#EEF6DE] text-[10px] font-extrabold text-[#6AA32A]" aria-hidden="true">₹</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-[.14em] text-[#6AA32A]">Benefits</span>
            <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#091540]">Benefits of SIP Investing</h2>
          </div>

          <div className="space-y-3">
            <h3 className="font-[var(--fd)] text-xl font-bold text-[#091540]">Power of Compounding</h3>
            <p className="text-sm text-[#374151] leading-relaxed font-light">
              When you invest regularly through SIP and invest for the long term, the benefits are magnified by the compounding effect. Compounding effect ensures that you earn returns not only on your principal amount (actual investment) but also on the gains on the principal amount i.e. your money grows over time as the money you invest earns returns. And the returns also earn returns.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-[var(--fd)] text-xl font-bold text-[#091540]">Power of Starting Early</h3>
            <p className="text-sm text-[#374151] leading-relaxed font-light">
              The earlier one starts saving and investing regularly, the easier it is to achieve your goals. The graph below shows the impact of beginning to invest Rs. 10,000 monthly at various stages of life till the age of 60 years (assuming a return of 12% p.a.).
            </p>

            <figure className="bg-[#F8FAFE] border border-[#E3E8F4] rounded-[24px] p-5 sm:p-8 space-y-5">
              <figcaption className="text-xs font-bold text-[#091540]">
                A 10 years&apos; early start results in an additional Rs. 2.1 crore in the final retirement corpus.
              </figcaption>
              <div className="flex flex-wrap gap-4 text-[11px] font-bold">
                <span className="inline-flex items-center gap-2 text-[#6AA32A]">
                  <span className="h-2.5 w-2.5 rounded-sm bg-[#8DC63F]" aria-hidden="true" />
                  Value of investment on Retirement
                </span>
                <span className="inline-flex items-center gap-2 text-[#1A3B9F]">
                  <span className="h-2.5 w-2.5 rounded-sm bg-[#1A3B9F]" aria-hidden="true" />
                  Amount invested via SIP
                </span>
              </div>
              <div className="overflow-x-auto">
                <svg
                  viewBox="0 0 720 320"
                  role="img"
                  aria-label="Bar chart of a Rs. 10,000 monthly SIP continued until age 60 at 12 percent a year. Starting at 30 grows to about Rs. 3 crore. Starting at 40 grows to about Rs. 0.9 crore."
                  className="w-full min-w-[560px] h-auto"
                >
                  <line x1="28" y1="236" x2="700" y2="236" stroke="#E3E8F4" strokeWidth="1" />
                  {EARLY_START.map((row, index) => {
                    const x = 78 + index * 104;
                    const valueHeight = (row.value / CHART_MAX) * 190;
                    const investedHeight = Math.max(6, (row.invested / CHART_MAX) * 190);
                    return (
                      <g key={row.age}>
                        <rect x={x} y={236 - valueHeight} width="26" height={valueHeight} rx="4" fill="#8DC63F" />
                        <rect x={x + 32} y={236 - investedHeight} width="26" height={investedHeight} rx="3" fill="#1A3B9F" />
                        <text x={x + 13} y={228 - valueHeight} textAnchor="middle" fill="#6AA32A" fontSize="12" fontWeight="700">{row.valueLabel}</text>
                        <text x={x + 29} y="258" textAnchor="middle" fill="#091540" fontSize="13" fontWeight="700">Age {row.age}</text>
                        <text x={x + 29} y="276" textAnchor="middle" fill="#1A3B9F" fontSize="11" fontWeight="700">{row.investedLabel}</text>
                      </g>
                    );
                  })}
                </svg>
              </div>
              <p className="text-[11px] text-[#6B7280] leading-relaxed">
                Static illustration. Rs. 10,000 invested every month until age 60, assuming 12% a year. Returns are not guaranteed.
              </p>
            </figure>

            <p className="text-sm text-[#374151] leading-relaxed font-light">
              If you start SIP at age 30, as per the illustration shown a corpus of approximately Rs. 3 crores can be generated at retirement. If you would have waited 10 years and started SIP at age 40, a corpus of approximately Rs. 0.9 crore would have been available to you at retirement i.e. a difference of Rs. 2.1 crore – which is the &apos;cost of delaying starting SIP&apos;.
            </p>
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
          Mutual fund investments are subject to market risks. Read all scheme-related documents carefully. A SIP does not guarantee returns. Anmol Share Broking Pvt. Ltd. is an AMFI-registered mutual fund distributor, ARN: 114893.
        </p>

        <AdvisorBookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </div>
  );
}
