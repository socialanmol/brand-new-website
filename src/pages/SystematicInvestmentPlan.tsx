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
  { label: "50 Yrs", invested: 0.12, value: 0.22 },
  { label: "45 Yrs", invested: 0.18, value: 0.48 },
  { label: "40 Yrs", invested: 0.24, value: 0.92 },
  { label: "35 Yrs", invested: 0.30, value: 1.70 },
  { label: "30 Yrs", invested: 0.36, value: 3.08 },
  { label: "25 Yrs", invested: 0.42, value: 5.51 },
];
const CHART_MAX = 6;
const CHART_TOP = 46;
const CHART_BASE = 292;
const CHART_HEIGHT = CHART_BASE - CHART_TOP;

const SIP_TYPES = [
  {
    title: "Fixed SIP (Regular SIP)",
    paragraphs: [
      "A most simple and popular type of SIP. Investors can contribute a fixed amount at specific regular intervals for a desired investment term period. The frequency of SIP can be set either weekly, monthly, quarterly or annually as per the investor's convenience.",
    ],
  },
  {
    title: "Flexible SIP",
    paragraphs: [
      "A Flexible SIP option is similar to a regular SIP option but still has a difference. It allows an investor the opportunity to increase or decrease the investment amount as per his or her financial situation. The regular contribution of the investor can be adjusted according to the cashflow. Sometimes, some fund houses even give an option to change the intervals as per the financial crunch.",
      "The investor has to intimate the fund house for the change and should be communicated one week prior to the next due date of SIP.",
    ],
  },
  {
    title: "Perpetual SIP",
    paragraphs: [
      "In a perpetual SIP an investor does not set a time period and regularly contributes till he or she decides to stop or modify. Initially one could do it indefinitely but recently from October 2023 National Automated Clearing House (NACH) has introduced a maximum term of 30 years for setting up a SIP from the start date. It is now even mandatory to specify the collection date and will not be allowed perpetuity.",
    ],
  },
  {
    title: "Trigger SIP",
    paragraphs: [
      "A trigger SIP option allows investors to set triggers depending on when a specific event occurs in the market. It can be a pre-defined trigger prompting, when the market suddenly dips or has a favourable condition, a specific index level or even a net asset value of the units. An investor can start a SIP, redeem units or switch to another plan. It is suitable for investors who understand the dynamic nature of the market as it is based on speculations.",
    ],
  },
  {
    title: "Step-up SIP (Top-up SIP)",
    paragraphs: [
      "A Step-up SIP provides investors the facility to gradually increase their SIP instalment amount at a pre-determined rate at intervals. One can begin a SIP with a fixed amount and opt for a regular top-up on it. It is good for people expecting annual increments or receiving bonuses. An investor can gradually increase the recurring contributions to the SIP with increased cash flow and it will help accumulate a wealth corpus by parking more money.",
    ],
  },
  {
    title: "Value averaging investment plan (VIP)",
    paragraphs: [
      "A Value averaging investment plan is similar to a conventional SIP where an investor makes higher investments when the market dips to buy more units. Though it buys more when the market is low, and it may result in higher returns, investors would require a lot of liquid cash with them to enrol for a VIP. This is because investors will have to make extra investments whenever there is a big fall in the market. This lack of predictability is one of the main reasons why many average investors do not opt for VIP and it is usually suitable for HNIs.",
    ],
  },
  {
    title: "Multiple SIP (Multi Select SIP)",
    paragraphs: [
      "It is a unique SIP offering that allows an investor to invest across multiple mutual funds from one fund house with a single SIP facility. With one SIP, an investor can diversify the investment portfolio as the money is automatically distributed into multiple schemes. It also reduces the paperwork for managing multiple SIPs together.",
    ],
  },
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

            <figure className="bg-white border border-[#E3E8F4] rounded-[24px] p-4 sm:p-6 space-y-3">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex-1 min-w-0">
                  <svg
                    viewBox="0 0 640 380"
                    role="img"
                    aria-label="Bar chart. Rs. 10,000 invested per month at 12 percent a year till age 60. Blue bars are the value at retirement. Green bars are the amount invested. Starting at 25 reaches 5.51 crore. Starting at 30 reaches 3.08 crore. Starting at 40 reaches 0.92 crore."
                    className="w-full h-auto font-[var(--fs)]"
                  >
                    <text x="330" y="22" textAnchor="middle" fill="#111827" fontSize="13" fontWeight="700">₹ 10,000 invested per month @ 12% p.a till age 60</text>
                    <text x="16" y="176" textAnchor="middle" fill="#6B7280" fontSize="11" transform="rotate(-90 16 176)">₹ Crores</text>
                    {[0, 1, 2, 3, 4, 5, 6].map((tick) => {
                      const y = CHART_BASE - (tick / CHART_MAX) * CHART_HEIGHT;
                      return (
                        <g key={tick}>
                          <line x1="48" y1={y} x2="620" y2={y} stroke="#E5E7EB" strokeDasharray="4 4" />
                          <text x="42" y={y + 4} textAnchor="end" fill="#6B7280" fontSize="11">{tick}</text>
                        </g>
                      );
                    })}
                    {EARLY_START.map((row, index) => {
                      const groupX = 62 + index * 92;
                      const investedHeight = Math.max(2, (row.invested / CHART_MAX) * CHART_HEIGHT);
                      const valueHeight = (row.value / CHART_MAX) * CHART_HEIGHT;
                      const investedX = groupX;
                      const valueX = groupX + 24;
                      return (
                        <g key={row.label}>
                          <rect x={investedX} y={CHART_BASE - investedHeight} width="20" height={investedHeight} fill="#5EE0C0" />
                          <rect x={valueX} y={CHART_BASE - valueHeight} width="20" height={valueHeight} fill="#4EB3EA" />
                          <text x={investedX + 10} y={CHART_BASE - investedHeight - 6} textAnchor="middle" fill="#374151" fontSize="11">{row.invested.toFixed(2)}</text>
                          <text x={valueX + 10} y={CHART_BASE - valueHeight - 6} textAnchor="middle" fill="#374151" fontSize="11">{row.value.toFixed(2)}</text>
                          <text x={groupX + 22} y="314" textAnchor="middle" fill="#111827" fontSize="12">{row.label}</text>
                        </g>
                      );
                    })}
                    <text x="330" y="346" textAnchor="middle" fill="#2F80ED" fontSize="13" fontWeight="700">Age when SIP is started</text>
                  </svg>
                </div>
                <figcaption className="lg:w-[230px] shrink-0 space-y-4">
                  <p className="text-sm font-semibold text-[#111827] leading-relaxed">
                    10 Years&apos; early start result in an additional Rs. 2.1 crore in the final retirement corpus.
                  </p>
                  <ul className="space-y-2 text-xs text-[#374151]">
                    <li className="flex items-center gap-2">
                      <span className="h-3.5 w-3.5 rounded-full bg-[#4EB3EA] shrink-0" aria-hidden="true" />
                      Value of investment on Retirement
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-3.5 w-3.5 rounded-full bg-[#5EE0C0] shrink-0" aria-hidden="true" />
                      Amount invested via SIP
                    </li>
                  </ul>
                </figcaption>
              </div>
              <p className="text-[11px] text-[#6B7280] leading-relaxed">the above graph is for illustrative purpose only.</p>
              <p className="text-[11px] text-[#6B7280]">Source : internal</p>
            </figure>

            <p className="text-sm text-[#374151] leading-relaxed font-light">
              If you start SIP at age 30, as per the illustration shown a corpus of approximately Rs. 3 crores can be generated at retirement. If you would have waited 10 years and started SIP at age 40, a corpus of approximately Rs. 0.9 crore would have been available to you at retirement i.e. a difference of Rs. 2.1 crore – which is the &apos;cost of delaying starting SIP&apos;.
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-[.14em] text-[#1A3B9F]">Types</span>
            <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#091540]">What are types of SIP?</h2>
          </div>
          <div className="space-y-4">
            {SIP_TYPES.map((type, index) => (
              <div key={type.title} className="bg-[#F8FAFE] border border-[#E3E8F4] rounded-[20px] p-6 space-y-3">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#1A3B9F] bg-white px-2.5 py-1 rounded-full">
                  0{index + 1}
                </span>
                <h3 className="font-[var(--fd)] text-base font-bold text-[#091540]">{type.title}</h3>
                {type.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-sm text-[#374151] leading-relaxed font-light">{paragraph}</p>
                ))}
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
          Mutual fund investments are subject to market risks. Read all scheme-related documents carefully. A SIP does not guarantee returns. Anmol Share Broking Pvt. Ltd. is an AMFI-registered mutual fund distributor, ARN: 114893.
        </p>

        <AdvisorBookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </div>
  );
}
