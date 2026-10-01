import React, { useState } from "react";
import { Link } from "react-router";
import scienceOfScalingImage from "../imports/The Science of Scaling.png";

const JARGON_TERMS = [
  { term: "NAV", def: "Net Asset Value — the per-unit price of a mutual fund on any given day. If NAV is ₹50 and you invest ₹5,000, you get 100 units. Lower NAV = more units. That's actually a good thing." },
  { term: "Expense Ratio", def: "The silent annual fee deducted to manage your portfolio. A 1% ratio on ₹1L = ₹1,000 gone every year. Always choose funds under 0.5% for index funds, under 1% for active funds." },
  { term: "AUM", def: "Assets Under Management — total money a fund manages. ₹10,000 Cr signals market trust. But for small-cap funds, too much AUM can actually hurt performance." },
  { term: "Volatility", def: "How wildly a fund's value swings. High volatility = big gains possible, but big drops too. Know your stomach before picking a fund." },
  { term: "Exit Load", def: "A penalty for leaving too soon. Redeem equity within 1 year? Pay 1%. Stay 12+ months and this charge disappears entirely." },
  { term: "CAGR", def: "Compound Annual Growth Rate — the most honest number in investing. If someone brags '80% returns', ask for the CAGR. That's the real story." },
  { term: "SIP", def: "Systematic Investment Plan — auto-invest even ₹500/month. Markets down? Buy cheap units. Markets up? Existing units grow. Beats timing the market every time." },
  { term: "ELSS", def: "Equity Linked Savings Scheme — saves taxes under 80C (up to ₹46,800/yr) AND grows wealth in equity. 3-year lock-in — shortest among all 80C options." },
  { term: "Diversification", def: "Spread your money across equity, debt, and gold. A diversified portfolio rarely has the highest return any single year — but almost never has the worst either." }
];

const MYTHS_DATA = [
  { myth: "You need a huge chunk of capital to start investing.", truth: "Start a SIP for as little as ₹100–₹500 a month — the price of one coffee. Compounding does the rest.", icon: "🪙" },
  { myth: "Insurance is only for when you get old or buy a house.", truth: "Term insurance is cheapest in your 20s. Every year you wait, premiums climb and coverage gets harder to secure.", icon: "🛡️" },
  { myth: "Investing takes hours of daily stock tracking.", truth: "A diversified index fund SIP needs zero daily monitoring. Set it once. Let compounding do its thing.", icon: "⏱️" },
  { myth: "Mutual funds are risky. FDs are safer.", truth: "FDs barely beat inflation. Over 10+ years, diversified equity funds have consistently and significantly outperformed.", icon: "📈" }
];

const QUIZ_QUESTIONS = [
  { q: "Market drops 10% on a Tuesday. You:", opts: [{ text: "Panic sell everything, immediately.", s: 0 }, { text: "Hold tight. This is fine.", s: 1 }, { text: "Buy the dip. Sale season.", s: 2 }] },
  { q: "Your investment horizon is:", opts: [{ text: "Under 2 years — I need the money soon.", s: 0 }, { text: "3–7 years — medium-term goals.", s: 1 }, { text: "10+ years — building real wealth.", s: 2 }] },
  { q: "You save from your monthly income:", opts: [{ text: "Less than 5% — barely anything.", s: 0 }, { text: "10–20% — I try to.", s: 1 }, { text: "20%+ — savings are non-negotiable.", s: 2 }] },
  { q: "You get a ₹50,000 bonus. What happens to it?", opts: [{ text: "Spent within a month — I earned it!", s: 0 }, { text: "Half fun, half savings.", s: 1 }, { text: "Straight into investments. Lifestyle stays the same.", s: 2 }] },
  { q: "How do you feel about debt (loans, credit cards)?", opts: [{ text: "I have some and it stresses me out.", s: 0 }, { text: "Only for big things like a home loan.", s: 1 }, { text: "I avoid all debt — I only spend what I have.", s: 2 }] },
  { q: "What best describes your current financial situation?", opts: [{ text: "Living paycheck to paycheck.", s: 0 }, { text: "I have some savings but no real plan.", s: 1 }, { text: "I have an emergency fund, SIPs running, and insurance in place.", s: 2 }] },
  { q: "Your reaction to a 25% portfolio gain in one year:", opts: [{ text: "Withdraw it before it disappears!", s: 0 }, { text: "Rebalance a little, let the rest ride.", s: 1 }, { text: "Stay the course — I'm in it for the long game.", s: 2 }] }
];

const PROFILES = [
  { label: "Conservative Investor", color: "#1A3B9F", emoji: "🌊", desc: "You value stability above big returns. Debt funds and liquid instruments are your natural starting point." },
  { label: "Balanced Investor", color: "#8DC63F", emoji: "⚖️", desc: "You want growth without wild swings. Hybrid funds — 60% equity, 40% debt — are your sweet spot." },
  { label: "Aggressive Investor", color: "#0D1E52", emoji: "🚀", desc: "You play the long game. Small-cap and flexi-cap funds will do the serious heavy lifting for you." }
];

const STORIES_DATA = [
  {
    tag: "#ScaleFast",
    title: "The Science of Scaling: Grow Your Business Bigger and Faster Than You Think Possible",
    sub: "Dr. Benjamin Hardy & Blake Erickson (Executive Review)",
    views: "Faculty Brief",
    bg: "bg-[#1A3B9F]",
    image: scienceOfScalingImage,
    href: "https://drive.google.com/file/d/1la3HyxKrSejW46mLJjfSyfl7zkbNiFBL/view?usp=sharing",
    external: true
  },
  { tag: "#SIPBasics", title: "What actually happens to your ₹500 every month?", views: "47K views", bg: "bg-[#0D1E52]" },
  { tag: "#SIPvsLumpsum", title: "Lumpsum or SIP? The answer depends on one thing most people ignore.", views: "58K views", bg: "bg-[#0A1540]" },
  { tag: "#Insurance", title: "Your company's health cover isn't enough. Here's why.", views: "71K views", bg: "bg-[#8DC63F]", dark: true },
  { tag: "#Retirement", title: "Start saving for retirement early — or pay the price later.", views: "83K views", bg: "bg-[#1A3B9F]" },
  { tag: "#GoldInvesting", title: "Every Indian buys gold. Almost none do it right.", views: "96K views", bg: "bg-[#0D1E52]" },
  { tag: "#CreditScore", title: "Your CIBIL score is costing you lakhs. Fix it this weekend.", views: "93K views", bg: "bg-[#091540]" },
];

export default function GenZHub() {
  const [monthly, setMonthly] = useState<number>(500);
  const [years, setYears] = useState<number>(5);
  const [rate, setRate] = useState<number>(12);

  const [openJargon, setOpenJargon] = useState<number | null>(null);
  const [openMyth, setOpenMyth] = useState<number | null>(null);

  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [currentQ, setCurrentQ] = useState<number>(0);
  const [scores, setScores] = useState<number[]>([]);

  const monthlyRate = rate / 100 / 12;
  const totalMonths = years * 12;
  const futureVal = monthly * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate);
  const totalInv = monthly * totalMonths;
  const wealthGained = futureVal - totalInv;
  const coffeeCount = Math.max(1, Math.round(monthly / 120));

  function formatINR(n: number) {
    if (n >= 10000000) return "₹" + (n / 10000000).toFixed(2) + " Cr";
    if (n >= 100000) return "₹" + (n / 100000).toFixed(1) + " L";
    if (n >= 1000) return "₹" + (n / 1000).toFixed(0) + " K";
    return "₹" + Math.round(n).toLocaleString("en-IN");
  }

  const handleAnswer = (s: number) => {
    const nextScores = [...scores, s];
    setScores(nextScores);
    if (currentQ < QUIZ_QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setCurrentQ(999);
    }
  };

  const totalScore = scores.reduce((a, b) => a + b, 0);
  const maxScore = QUIZ_QUESTIONS.length * 2;
  const profileIndex = totalScore <= maxScore * 0.33 ? 0 : totalScore <= maxScore * 0.66 ? 1 : 2;
  const currentProfile = PROFILES[profileIndex];

  return (
    <div className="font-[var(--fs)] bg-[#091540] text-white antialiased min-h-screen overflow-x-hidden">
      {/* ── HERO SECTION ── */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 py-20 overflow-hidden bg-gradient-to-br from-[#091540] via-[#0D1E52] to-[#1A3B9F]">
        <div className="absolute w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(141,198,63,0.18)_0%,transparent_65%)] filter blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#8DC63F]/15 border border-[#8DC63F]/35 text-[#8DC63F] text-[11px] font-extrabold uppercase tracking-[.1em] px-4 py-2 rounded-full mb-6">
            ✦ Built for the ones who ask "Why?"
          </div>

          <h1 className="font-[var(--fd)] text-4xl sm:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            <span className="text-white">Your Financial Story</span><br />
            <span className="text-[#8DC63F]">Begins Today.</span>
          </h1>

          <p className="text-base sm:text-lg text-white/80 font-light max-w-[580px] mx-auto mb-10 leading-relaxed">
            Move past traditional asset gatekeeping. Scale your savings effortlessly, monitor markets, and control your capital — with complete visibility.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-16">
            <a
              href="#calculator"
              className="bg-[#8DC63F] hover:bg-[#9ED64A] text-[#091540] font-extrabold text-sm px-8 py-3.5 rounded-full shadow-lg hover:scale-105 transition-all"
            >
              Try the SIP Tool →
            </a>
            <a
              href="#quiz"
              className="bg-white/10 hover:bg-white/15 text-white border border-white/20 font-bold text-sm px-8 py-3.5 rounded-full transition-all"
            >
              Find your risk profile
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-[#8DC63F]/15 border border-[#8DC63F]/30 rounded-2xl px-5 py-3 text-left min-w-[160px]">
              <span className="text-[10px] uppercase text-white/60 block mb-1">Monthly SIP</span>
              <span className="font-bold text-lg text-white">₹500</span>
              <span className="text-[10px] text-[#8DC63F] block mt-0.5">Auto-invest active</span>
            </div>
            <div className="bg-white/10 border border-white/20 rounded-2xl px-5 py-3 text-left min-w-[160px]">
              <span className="text-[10px] uppercase text-white/60 block mb-1">Balanced Fund</span>
              <span className="font-bold text-lg text-white">₹500/mo</span>
              <span className="text-[10px] text-[#8DC63F] block mt-0.5">SEBI Compliant</span>
            </div>
            <div className="bg-white/10 border border-white/20 rounded-2xl px-5 py-3 text-left min-w-[160px]">
              <span className="text-[10px] uppercase text-white/60 block mb-1">5Y CAGR</span>
              <span className="font-bold text-lg text-white">12.4%</span>
              <span className="text-[10px] text-[#8DC63F] block mt-0.5">Market average</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div className="bg-[#0D1E52] border-t border-b border-white/10 py-3 overflow-hidden">
        <div className="flex whitespace-nowrap animate-[ticker_22s_linear_infinite] w-max">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center shrink-0">
              {[
                "Nifty 50 ▲ 0.42%",
                "SIP Returns (10Y) ▲ 12.4%",
                "Gold ▲ 1.1%",
                "Sensex ▲ 0.38%",
                "ELSS Tax Saved ₹46,800",
                "Mutual Fund AUM ₹67 Lakh Cr",
                "SIP Folios 9.8 Cr+",
              ].map((item, idx) => (
                <span key={idx} className="text-xs text-white/70 px-7 flex items-center gap-2 border-r border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" />
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── TEASER ── */}
      <section className="bg-[#1A3B9F] text-white py-16 text-center px-6">
        <div className="max-w-2xl mx-auto">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#8DC63F] block mb-3">
            ☕ The Skip-the-Starbucks Tool
          </span>
          <h2 className="font-[var(--fd)] text-3xl sm:text-5xl font-extrabold mb-4 tracking-tight">
            Small daily skips.<br />Serious future money.
          </h2>
          <p className="text-base sm:text-lg font-light text-white/90 leading-relaxed">
            Every ₹500 you redirect monthly into a SIP writes a slower, quieter, richer story than any impulse buy ever could.
          </p>
        </div>
      </section>

      {/* ── CALCULATOR ── */}
      <section id="calculator" className="py-20 bg-[#091540] px-6">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="font-[var(--fd)] text-3xl sm:text-5xl font-bold text-center mb-12 text-white">
            Skip the Starbucks. <span className="text-[#8DC63F]">Grow the Bag.</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-[#0D1E52] border border-white/15 rounded-3xl p-8 sm:p-12 shadow-2xl">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-xs text-white/70 uppercase tracking-wider font-semibold">Monthly Investment</span>
                  <div className="flex items-center gap-1">
                    <span className="text-lg font-bold text-white">₹</span>
                    <input
                      type="number"
                      min="100"
                      max="1000000"
                      value={monthly}
                      onChange={(e) => setMonthly(Math.max(100, Number(e.target.value)))}
                      className="text-xl font-bold text-white bg-transparent border-b-2 border-[#8DC63F] w-28 text-right focus:outline-none"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min="100"
                  max="10000"
                  step="100"
                  value={monthly}
                  onChange={(e) => setMonthly(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/20 rounded-lg accent-[#8DC63F] cursor-pointer mb-1"
                />
                <div className="flex justify-between text-[11px] text-white/50">
                  <span>₹100</span>
                  <span>₹10,000</span>
                </div>
                <p className="text-xs text-[#8DC63F] font-semibold mt-2">
                  That's just {coffeeCount} coffee{coffeeCount > 1 ? "s" : ""} a month ☕
                </p>
              </div>

              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-xs text-white/70 uppercase tracking-wider font-semibold">Time Horizon</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={years}
                      onChange={(e) => setYears(Math.max(1, Number(e.target.value)))}
                      className="text-xl font-bold text-white bg-transparent border-b-2 border-[#8DC63F] w-16 text-right focus:outline-none"
                    />
                    <span className="text-lg font-bold text-white">yrs</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/20 rounded-lg accent-[#8DC63F] cursor-pointer mb-1"
                />
                <div className="flex justify-between text-[11px] text-white/50">
                  <span>1 yr</span>
                  <span>30 yrs</span>
                </div>
              </div>

              <div className="bg-[#1A3B9F]/25 border border-[#1A3B9F]/40 rounded-2xl p-5 space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-xs font-bold text-white">Expected Annual Return</div>
                    <div className="text-[10px] text-white/60 mt-0.5">Choose your own rate — be realistic!</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={rate}
                      onChange={(e) => setRate(Math.min(100, Math.max(1, Number(e.target.value))))}
                      className="text-2xl font-bold text-[#8DC63F] bg-transparent border-b-2 border-[#8DC63F]/50 w-16 text-right focus:outline-none"
                    />
                    <span className="text-xl font-bold text-[#8DC63F]">%</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  step="1"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/20 rounded-lg accent-[#8DC63F] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-white/50">
                  <span>1% (Savings)</span>
                  <span>12% (Equity avg)</span>
                  <span>100%</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between">
              <div className="bg-[#091540] border border-white/10 rounded-2xl p-8 text-center mb-6 shadow-inner">
                <span className="text-xs uppercase tracking-widest text-white/50 block mb-3">Projected Future Value</span>
                <div className="font-[var(--fd)] text-4xl sm:text-6xl font-black text-[#8DC63F] mb-3">
                  {formatINR(futureVal)}
                </div>
                <p className="text-xs text-white/60">
                  in {years} year{years > 1 ? "s" : ""} compounding at {rate}% p.a.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                  <span className="text-[10px] uppercase text-white/50 block mb-1">Total Invested</span>
                  <span className="font-bold text-base text-white">{formatINR(totalInv)}</span>
                </div>
                <div className="bg-[#8DC63F]/15 border border-[#8DC63F]/35 rounded-2xl p-4">
                  <span className="text-[10px] uppercase text-[#8DC63F] block mb-1">Wealth Gained</span>
                  <span className="font-bold text-base text-[#8DC63F]">{formatINR(wealthGained)}</span>
                </div>
              </div>

              <Link
                to="/wp/review"
                className="w-full bg-[#8DC63F] hover:bg-[#9ED64A] text-[#091540] font-extrabold text-sm py-4 rounded-xl shadow-lg transition-all text-center block"
              >
                Start My SIP Now →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUIZ SECTION ── */}
      <section id="quiz" className="py-20 bg-[#EEF2FB] text-[#111827] px-6">
        <div className="max-w-[700px] mx-auto text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[#1A3B9F] bg-[#1A3B9F]/10 border border-[#1A3B9F]/25 px-3.5 py-1.5 rounded-full inline-block mb-3">
            🎯 Alignment Assessment
          </span>
          <h2 className="font-[var(--fd)] text-3xl sm:text-5xl font-black mb-3 text-[#091540]">
            What kind of investor <br />
            <span className="text-[#1A3B9F]">are you, actually?</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-500 mb-10 max-w-md mx-auto">
            A vibe check that tells you which funds fit your real personality. No spreadsheet required.
          </p>

          <div className="bg-white border border-gray-200 rounded-3xl p-8 sm:p-10 shadow-xl text-left">
            {!quizStarted ? (
              <div className="text-center py-8">
                <button
                  onClick={() => setQuizStarted(true)}
                  className="bg-[#1A3B9F] hover:bg-[#0D1E52] text-white font-extrabold text-sm px-8 py-4 rounded-xl shadow-lg transition-all cursor-pointer"
                >
                  Take the Quiz →
                </button>
              </div>
            ) : currentQ < QUIZ_QUESTIONS.length ? (
              <div>
                <div className="flex gap-2 mb-6">
                  {QUIZ_QUESTIONS.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-all ${
                        i <= currentQ ? "bg-[#1A3B9F]" : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
                  Question {currentQ + 1} of {QUIZ_QUESTIONS.length}
                </div>
                <h3 className="font-[var(--fd)] text-xl sm:text-2xl font-bold text-[#091540] mb-6">
                  {QUIZ_QUESTIONS[currentQ].q}
                </h3>
                <div className="space-y-3">
                  {QUIZ_QUESTIONS[currentQ].opts.map((opt, oi) => (
                    <button
                      key={oi}
                      onClick={() => handleAnswer(opt.s)}
                      className="w-full text-left p-4 rounded-2xl border-2 border-gray-200 hover:border-[#1A3B9F] bg-[#EEF2FB]/50 hover:bg-[#EEF2FB] text-sm font-semibold text-[#091540] transition-all cursor-pointer"
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="text-5xl mb-4">{currentProfile.emoji}</div>
                <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">You are a</div>
                <div className="font-[var(--fd)] text-3xl font-bold mb-4" style={{ color: currentProfile.color }}>
                  {currentProfile.label}
                </div>
                <p className="text-sm text-gray-600 max-w-md mx-auto mb-8 leading-relaxed">
                  {currentProfile.desc}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    to="/wp/review"
                    className="bg-[#1A3B9F] text-white font-extrabold text-xs px-6 py-3.5 rounded-xl shadow-md"
                  >
                    Talk to a MyAnmol Advisor →
                  </Link>
                  <button
                    onClick={() => {
                      setQuizStarted(false);
                      setCurrentQ(0);
                      setScores([]);
                    }}
                    className="border border-gray-300 text-gray-600 font-bold text-xs px-6 py-3.5 rounded-xl hover:bg-gray-50"
                  >
                    Retake Quiz
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── STORIES / REELS (Updated with "The Science of Scaling") ── */}
      <section className="py-20 bg-[#091540] px-6">
        <div className="max-w-[1100px] mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#8DC63F] bg-[#8DC63F]/15 border border-[#8DC63F]/35 px-3.5 py-1.5 rounded-full inline-block mb-3">
            📱 #MyAnmol Finance Stories
          </span>
          <h2 className="font-[var(--fd)] text-3xl sm:text-5xl font-bold mb-4 text-white">
            Finance content, built for the ones who scroll.
          </h2>
          <p className="text-sm sm:text-base text-white/70 font-light mb-10 max-w-lg">
            Tap through the stories you wish your algorithm had been feeding you. This is money knowledge, remixed.
          </p>

          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            {STORIES_DATA.map((s, i) => {
              const cardContent = (
                <div
                  className={`${s.bg} shrink-0 w-[240px] h-[320px] rounded-2xl p-5 flex flex-col justify-between border border-white/10 cursor-pointer hover:-translate-y-2 transition-all shadow-lg relative overflow-hidden`}
                >
                  {s.image && (
                    <>
                      <img
                        src={s.image}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />
                    </>
                  )}
                  <span className={`relative z-10 text-[10px] font-bold px-2.5 py-1 rounded-full w-fit ${s.dark ? "bg-black/20 text-black" : "bg-white/20 text-white"}`}>
                    {s.tag}
                  </span>
                  <div className="relative z-10">
                    <h4 className={`font-[var(--fd)] text-sm font-bold leading-snug mb-1 ${s.dark ? "text-black" : "text-white"}`}>
                      {s.title}
                    </h4>
                    {s.sub && <p className="text-[11px] text-white/70 font-light mb-2">{s.sub}</p>}
                    <span className={`text-[11px] ${s.dark ? "text-black/60" : "text-white/60"}`}>{s.views}</span>
                  </div>
                </div>
              );

              if (s.href) {
                return (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer">
                    {cardContent}
                  </a>
                );
              }
              return <div key={i}>{cardContent}</div>;
            })}
          </div>
        </div>
      </section>

      {/* ── JARGON BUSTER ── */}
      <section className="py-20 bg-[#0D1E52] px-6">
        <div className="max-w-[1100px] mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#8DC63F] bg-[#8DC63F]/15 border border-[#8DC63F]/35 px-3.5 py-1.5 rounded-full inline-block mb-3">
            📚 Jargon Buster
          </span>
          <h2 className="font-[var(--fd)] text-3xl sm:text-5xl font-bold mb-4 text-white">
            Wall Street terms, <span className="text-[#8DC63F]">translated to human.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            {JARGON_TERMS.map((j, i) => {
              const isOpen = openJargon === i;
              return (
                <div
                  key={i}
                  onClick={() => setOpenJargon(isOpen ? null : i)}
                  className={`bg-white/5 border rounded-2xl p-5 cursor-pointer transition-all ${
                    isOpen ? "bg-[#8DC63F]/10 border-[#8DC63F]/50" : "border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className={`font-bold text-lg ${isOpen ? "text-[#8DC63F]" : "text-white"}`}>{j.term}</span>
                    <span className={`text-xs transition-transform ${isOpen ? "rotate-180 text-[#8DC63F]" : "text-white/40"}`}>▼</span>
                  </div>
                  {isOpen ? (
                    <p className="text-xs text-white/85 leading-relaxed pt-2 border-t border-white/10">{j.def}</p>
                  ) : (
                    <span className="text-[11px] text-white/40">Tap to learn →</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── MYTHS VS TRUTH ── */}
      <section className="py-20 bg-white text-[#111827] px-6">
        <div className="max-w-[800px] mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#1A3B9F] bg-[#EEF2FB] border border-[#1A3B9F]/25 px-3.5 py-1.5 rounded-full inline-block mb-3">
            🔍 Truth vs. Fiction Matrix
          </span>
          <h2 className="font-[var(--fd)] text-3xl sm:text-5xl font-bold mb-3 text-[#091540]">
            The old rules <span className="text-[#1A3B9F]">are lying to you.</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-500 mb-10 font-light">
            Corporate finance-speak has bad optics. Here's where the boomer scripts get it wrong.
          </p>

          <div className="space-y-3">
            {MYTHS_DATA.map((m, i) => {
              const isOpen = openMyth === i;
              return (
                <div key={i} className="border-2 border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                  <div
                    onClick={() => setOpenMyth(isOpen ? null : i)}
                    className="p-5 bg-white flex items-center gap-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#EEF2FB] flex items-center justify-center text-lg shrink-0">
                      {m.icon}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-0.5">Myth</span>
                      <p className="font-[var(--fd)] text-sm sm:text-base font-bold text-[#091540]">{m.myth}</p>
                    </div>
                    <span className={`ml-auto text-gray-400 text-sm transition-transform ${isOpen ? "rotate-180" : ""}`}>▼</span>
                  </div>

                  {isOpen && (
                    <div className="p-5 bg-[#EEF2FB] border-t border-gray-100 flex gap-3 items-start">
                      <div className="w-5 h-5 rounded-full bg-[#8DC63F] text-[#091540] font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        ✓
                      </div>
                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-light">
                        <strong className="text-[#091540]">Reality: </strong>
                        {m.truth}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24 bg-gradient-to-br from-[#091540] via-[#0D1E52] to-[#1A3B9F] text-center px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(141,198,63,0.18)_0%,transparent_65%)] filter blur-3xl opacity-30 pointer-events-none" />

        <div className="max-w-2xl mx-auto relative z-10">
          <h2 className="font-[var(--fd)] text-3xl sm:text-5xl font-bold mb-4 text-white">
            Ready to optimize your portfolio strategy?
          </h2>
          <p className="text-sm sm:text-base text-white/75 font-light mb-10 max-w-lg mx-auto leading-relaxed">
            Book a strictly zero-pressure conversation. We'll audit your setup, map your goals, and hand you a plan you actually understand.
          </p>
          <Link
            to="/wp/review"
            className="bg-[#8DC63F] hover:bg-[#9ED64A] text-[#091540] font-extrabold text-base px-10 py-4 rounded-2xl shadow-xl hover:scale-105 transition-all inline-block"
          >
            Get Portfolio Recommendations Now →
          </Link>
        </div>
      </section>
    </div>
  );
}