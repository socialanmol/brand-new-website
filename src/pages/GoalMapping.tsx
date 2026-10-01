import React from "react";
import { Link } from "react-router";

const ROADMAP_ELEMENTS = [
  {
    num: "01",
    title: "Your Goals — What Are You Trying to Achieve?",
    desc: "Every strong financial plan starts with a clear goal. Ask yourself: Where do I want to be in the next 10 years? What kind of life do I want at 50 or 60? Goals give your money purpose.",
  },
  {
    num: "02",
    title: "Your Longevity — Planning for a Long Life",
    desc: "People today live much longer, often well into their 80s or 90s. This means your money must last longer too, so build your financial strategy with optimism and a sustainable horizon.",
  },
  {
    num: "03",
    title: "Income & Expenses — Understanding Your Money Flow",
    desc: "Write down what you earn and what you spend. Identify where your money goes — bills, lifestyle, savings, and investments — to optimize your monthly surplus.",
  },
  {
    num: "04",
    title: "Your Assets — What You Already Own",
    desc: "Take inventory of your financial tools: stocks, mutual funds, SIPs, bonds, retirement funds, gold, real estate, and bank balances.",
  },
  {
    num: "05",
    title: "Your Lifestyle — Balancing Today and Tomorrow",
    desc: "Your lifestyle heavily impacts your financial journey. A balanced lifestyle leaves you with more capital to invest in your future without sacrificing your quality of life.",
  },
  {
    num: "06",
    title: "Your Savings Plan — Will It Be Enough?",
    desc: "Everyone saves something, but not everyone saves effectively. A well-designed savings plan is the difference between financial stress and confidence.",
  },
  {
    num: "07",
    title: "Investment Risk Level — Finding Your Comfort Zone",
    desc: "Understand your risk-taking ability and comfort with market ups and downs before putting your money into equities, debt, or alternatives.",
  },
  {
    num: "08",
    title: "Retirement Income — Sustaining Your Lifestyle",
    desc: "Plan for the years when you stop working actively. Systematic withdrawal plans (SWPs) and pension structuring ensure a stress-free retired life.",
  },
  {
    num: "09",
    title: "Your Estate Plan — Protecting the Next Generation",
    desc: "A good estate plan reduces family burdens, ensures your wealth goes where intended, minimizes taxes, and provides absolute clarity.",
  },
  {
    num: "10",
    title: "Your Emergency Fund — The Ultimate Safety Net",
    desc: "Life is full of surprises. Keeping 3 to 6 months of living expenses in liquid instruments protects your long-term investments from forced liquidations.",
  },
];

export default function GoalMapping() {
  return (
    <div className="font-[var(--fs)] bg-white text-[#111827] antialiased min-h-screen">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#091540] via-[#0D1E52] to-[#1A3B9F] py-16 sm:py-24 text-center text-white px-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[580px] bg-[radial-gradient(circle,rgba(141,198,63,0.18)_0%,transparent_65%)] filter blur-3xl pointer-events-none" />
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8DC63F]/15 border border-[#8DC63F]/35 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" />
            <span className="text-[11px] font-extrabold uppercase tracking-[.18em] text-[#8DC63F]">
              Wealth Plan Strategy
            </span>
          </div>

          <h1 className="font-[var(--fd)] text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight mb-4">
            Goal Mapping
          </h1>

          <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed max-w-xl mx-auto mb-8">
            A good roadmap points you in the right direction. It gives you direction, control, and absolute confidence over your financial future.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/wp/review"
              className="bg-[#8DC63F] hover:bg-[#9ED64A] text-[#091540] font-extrabold text-sm sm:text-base px-8 py-3.5 rounded-full shadow-lg transition-all"
            >
              Book a Goal-Mapping Session →
            </Link>
          </div>
        </div>
      </section>

      {/* INTRO PHILOSOPHY SECTION */}
      <section className="py-14 sm:py-20 bg-white border-b border-[rgba(26,59,159,0.08)]">
        <div className="max-w-[820px] mx-auto px-6">
          <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#1A3B9F] block mb-2">
            The Financial Roadmap
          </span>
          <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-bold text-[#091540] tracking-tight mb-4">
            Where you stand today, where you want to go, and how to get there.
          </h2>
          <p className="text-sm sm:text-base text-[#4B5563] font-light leading-relaxed mb-6">
            Most people save money, but not everyone saves with a destination in mind. Without goal mapping, your investments lack purpose and can easily get derailed by short-term market noise or lifestyle inflation.
          </p>
          <div className="p-5 rounded-2xl bg-[#F8FAFE] border border-[rgba(26,59,159,0.12)] text-sm font-semibold text-[#091540]">
            "Think of your goals as the destination on your map. When you know why you're investing, saving and planning becomes much easier."
          </div>
        </div>
      </section>

      {/* 10 ELEMENTS GRID */}
      <section className="py-16 sm:py-24 bg-[#F8FAFE]">
        <div className="max-w-[1140px] mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#8DC63F] block mb-2">
              Comprehensive Framework
            </span>
            <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-bold text-[#091540] tracking-tight">
              The 10 Elements of Your Roadmap
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ROADMAP_ELEMENTS.map((el) => (
              <div
                key={el.num}
                className="bg-white border border-[rgba(26,59,159,0.12)] rounded-3xl p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-[#1A3B9F] block mb-2 font-mono">
                    Element {el.num}
                  </span>
                  <h3 className="font-[var(--fd)] text-xl font-bold text-[#091540] mb-3">
                    {el.title}
                  </h3>
                  <p className="text-sm text-[#4B5563] font-light leading-relaxed">
                    {el.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-[#091540] to-[#0D1E52] text-white text-center">
        <div className="max-w-xl mx-auto px-6">
          <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#8DC63F] block mb-3">
            Expert Guidance
          </span>
          <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Ready to Build Your Own Financial Roadmap?
          </h2>
          <p className="text-sm sm:text-base text-white/80 font-light mb-8 leading-relaxed">
            Your future deserves clarity, confidence, and expert guidance — not guesswork. Sit down with our Bengaluru team for a free review.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/wp/review"
              className="bg-[#8DC63F] hover:bg-[#9ED64A] text-[#091540] font-extrabold text-sm sm:text-base px-8 py-3.5 rounded-full shadow-lg transition-all"
            >
              Book Your Goal-Mapping Session →
            </Link>
          </div>
          <p className="mt-8 text-xs text-white/45">
            Anmol Share Broking Pvt. Ltd. · AMFI ARN: 114893 · Jayanagar, Bengaluru
          </p>
        </div>
      </section>
    </div>
  );
}