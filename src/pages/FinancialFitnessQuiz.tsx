import React from "react";
import { Link } from "react-router";

export default function FinancialFitnessQuiz() {
  const quizzes = [
    {
      id: "quiz-1",
      number: "Quiz 1",
      icon: "🎯",
      title: "Financial Confidence Quiz",
      desc: "A complete picture of your financial health across five dimensions — emergency fund, insurance, investments, retirement, and goal planning. See exactly where you're strong and where to focus next.",
      meta: ["5 dimensions", "2 minutes", "Instant Scorecard"],
      externalUrl:
        "https://www.myanmol.com/financial-fitness-quiz/financial-fitness-quiz-one",
    },
    {
      id: "quiz-2",
      number: "Quiz 2",
      icon: "📊",
      title: "Investment Risk Profile Quiz",
      desc: "Understand your real risk appetite before you invest a single rupee. A short set of questions to find out whether your portfolio should lean conservative, balanced, or growth-focused.",
      meta: ["10 questions", "3 minutes", "Asset Allocation Guide"],
      externalUrl:
        "https://www.myanmol.com/financial-fitness-quiz/financial-fitness-quiz-two",
    },
  ];

  return (
    <div className="font-[var(--fs)] bg-[#F8FAFE] text-[#111827] antialiased min-h-screen">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#091540] via-[#0D1E52] to-[#1A3B9F] py-16 sm:py-24 text-center text-white">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] h-[540px] bg-[radial-gradient(circle,rgba(141,198,63,0.18)_0%,transparent_65%)] filter blur-3xl pointer-events-none" />
        <div className="max-w-2xl mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8DC63F]/15 border border-[#8DC63F]/30 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#8DC63F] animate-pulse" />
            <span className="text-[11px] font-extrabold uppercase tracking-[.18em] text-[#8DC63F]">
              Free · No Login · Instant Results
            </span>
          </div>

          <h1 className="font-[var(--fd)] text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.08] mb-5">
            Find out where you <br />
            <span className="text-[#8DC63F]">really stand.</span>
          </h1>

          <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed max-w-xl mx-auto">
            Two quick, honest quizzes to help you understand your financial health — pick the one that fits what you want to know right now.
          </p>
        </div>
      </section>

      {/* QUIZ CARDS */}
      <section className="py-14 sm:py-20 max-w-[1080px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {quizzes.map((q) => (
            <div
              key={q.id}
              className="bg-white border border-[rgba(26,59,159,0.12)] rounded-3xl p-8 sm:p-10 flex flex-col shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all group relative overflow-hidden"
            >
              {/* Top gradient accent line */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#1A3B9F] via-[#0D1E52] to-[#8DC63F]" />

              <div className="w-14 h-14 rounded-2xl bg-[#EEF2FB] text-3xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                {q.icon}
              </div>

              <span className="text-[11px] font-extrabold uppercase tracking-[.18em] text-[#8DC63F] block mb-2">
                {q.number}
              </span>

              <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#091540] tracking-tight mb-3">
                {q.title}
              </h2>

              <p className="text-[#4B5563] text-sm sm:text-[15px] font-light leading-relaxed mb-8 flex-1">
                {q.desc}
              </p>

              {/* Meta Checklist */}
              <div className="flex flex-wrap gap-x-4 gap-y-2 mb-8 pt-4 border-t border-gray-100">
                {q.meta.map((item, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#091540]"
                  >
                    <span className="text-[#8DC63F] font-bold">✓</span> {item}
                  </span>
                ))}
              </div>

              {/* Action Button */}
              <a
                href={q.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#8DC63F] hover:bg-[#9ED64A] text-[#091540] font-extrabold text-sm sm:text-base py-3.5 px-6 rounded-full transition-all shadow-md hover:shadow-lg"
              >
                Start {q.number} →
              </a>
            </div>
          ))}
        </div>

        {/* BOTTOM HELP / CONSULTATION CALLOUT */}
        <div className="mt-14 p-8 rounded-3xl bg-white border border-[rgba(26,59,159,0.1)] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div>
            <h3 className="font-[var(--fd)] text-xl font-bold text-[#091540] mb-1">
              Want an expert review of your answers?
            </h3>
            <p className="text-sm text-[#4B5563] font-light">
              Sit down for a free 45-minute discussion to map your goals to investments and insurance.
            </p>
          </div>
          <Link
            to="/wp/review"
            className="inline-flex items-center gap-2 bg-[#1A3B9F] hover:bg-[#0D1E52] text-white font-bold text-sm px-6 py-3 rounded-full transition-all shrink-0"
            style={{ color: "#FFFFFF" }}
          >
            Book a Free Review →
          </Link>
        </div>
      </section>
    </div>
  );
}