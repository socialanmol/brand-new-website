import React from "react";
import { Link, useOutletContext } from "react-router";

export default function SheIsAnmol() {
  const { openGetStarted } = useOutletContext<{ openGetStarted: () => void }>();
  return (
    <div className="font-[var(--fs)] bg-[#FFF5F8] text-[#17211B] antialiased min-h-screen overflow-x-hidden">
      {/* ── HERO SECTION ── */}
      <section className="relative min-h-[90vh] bg-[#FFF5F8] grid grid-cols-1 lg:grid-cols-2 items-center py-20 px-6 sm:px-12 gap-12 overflow-hidden">
        {/* Glow / Blob Accents */}
        <div className="absolute w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(232,84,122,0.12)_0%,transparent_70%)] -top-[200px] -right-[150px] pointer-events-none animate-pulse" />
        <div className="absolute w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(201,160,65,0.08)_0%,transparent_70%)] -bottom-[100px] left-[10%] pointer-events-none" />

        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-2.5 bg-[#E8547A]/10 border border-[#E8547A]/30 text-[#E8547A] text-xs font-bold uppercase tracking-[2.5px] px-4 py-2 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8547A] animate-pulse" />
            Exclusively for Women
          </div>

          <h1 className="font-[var(--fd)] text-5xl sm:text-7xl font-bold leading-[0.95] tracking-tight text-[#0D0B09] mb-5">
            Your<br />
            Money,<br />
            Your<br />
            <em className="text-[#E8547A] italic">Power.</em>
          </h1>

          <p className="text-base text-[#5A3A4A] font-light leading-relaxed max-w-[400px] mb-8">
            MyAnmol is built around your goals, your pace, your life — making financial planning feel human, supportive, and completely yours.
          </p>

          <div className="flex flex-wrap gap-4 mb-8">
            <button
              type="button"
              onClick={openGetStarted}
              className="bg-[#E8547A] hover:bg-[#C43D66] text-white font-medium text-base px-8 py-3.5 rounded transition-all inline-flex items-center gap-2 shadow-lg hover:-translate-y-0.5"
            >
              Begin Your Journey ↗
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="text-[11px] font-medium tracking-wide text-[#8A4A60] bg-[#E8547A]/10 border border-[#E8547A]/20 px-3 py-1 rounded-full">
              AMFI · ARN 114893
            </span>
            <span className="text-[11px] font-medium tracking-wide text-[#8A4A60] bg-[#E8547A]/10 border border-[#E8547A]/20 px-3 py-1 rounded-full">
              SEBI Compliant
            </span>
            <span className="text-[11px] font-medium tracking-wide text-[#8A4A60] bg-[#E8547A]/10 border border-[#E8547A]/20 px-3 py-1 rounded-full">
              1000+ Women Served
            </span>
          </div>
        </div>

        {/* Hero Illustration & Floating Cards */}
        <div className="relative flex items-center justify-center z-10">
          <div className="absolute bottom-[18%] left-[-6%] bg-white/70 border border-[#E8547A]/20 backdrop-blur-md rounded-xl p-4 shadow-md hidden sm:block animate-bounce">
            <div className="text-[10px] text-[#8A4A60] tracking-wider uppercase mb-1">Women Empowered</div>
            <div className="font-[var(--fd)] text-2xl font-bold text-[#0D0B09]">1,000+</div>
            <div className="text-[11px] text-[#8BAF8E] mt-0.5">↑ and growing</div>
          </div>

          <div className="absolute top-[12%] right-[-5%] bg-white/70 border border-[#E8547A]/20 backdrop-blur-md rounded-xl p-4 shadow-md hidden sm:block">
            <div className="text-[10px] text-[#8A4A60] tracking-wider uppercase mb-1">Goals Achieved</div>
            <div className="font-[var(--fd)] text-2xl font-bold text-[#0D0B09]">3,200+</div>
            <div className="text-[11px] text-[#8BAF8E] mt-0.5">↑ and growing</div>
          </div>

          <svg viewBox="0 0 480 520" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[460px] drop-shadow-xl">
            <ellipse cx="240" cy="290" rx="195" ry="215" fill="#FFE8EE" />
            <path d="M150 310 C142 340 136 380 138 430 C140 460 155 490 175 498 C195 504 220 504 240 500 C260 496 280 488 292 472 C305 455 308 430 304 400 C300 370 290 340 282 310 Z" fill="url(#dressh)" />
            <ellipse cx="216" cy="188" rx="46" ry="50" fill="#FDDBB4" />
            <path d="M170 185 C165 155 175 125 190 112 C205 99 228 95 243 99 C260 103 270 118 272 138 C275 158 270 178 268 192" fill="#3D1F10" />
            <circle cx="208" cy="178" r="2" fill="#fff" />
            <circle cx="230" cy="178" r="2" fill="#fff" />
          </svg>
        </div>
      </section>

      {/* ── TICKER BAR ── */}
      <div className="bg-[#E8547A] py-3 overflow-hidden border-t border-b border-white/10">
        <div className="flex whitespace-nowrap animate-[ticker_28s_linear_infinite] w-max">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center shrink-0">
              <span className="inline-flex items-center gap-3 px-9 text-sm font-medium text-white tracking-wide border-r border-white/20">
                <span className="font-[var(--fd)] text-base font-bold">1000+</span> Women Empowered
              </span>
              <span className="inline-flex items-center gap-3 px-9 text-sm font-medium text-white tracking-wide border-r border-white/20">
                <span className="font-[var(--fd)] text-base font-bold">₹500 Cr+</span> Assets Under Management
              </span>
              <span className="inline-flex items-center gap-3 px-9 text-sm font-medium text-white tracking-wide border-r border-white/20">
                Trusted by Women, for Women
              </span>
              <span className="inline-flex items-center gap-3 px-9 text-sm font-medium text-white tracking-wide border-r border-white/20">
                <span className="font-[var(--fd)] text-base font-bold">ARN 114893</span> AMFI Registered
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── MARQUEE WORDS ── */}
      <div className="bg-gradient-to-r from-[#FFF0F3] via-[#FFE4EE] to-[#FFF0F3] py-5 overflow-hidden border-b border-[#E8547A]/15">
        <div className="marquee-track flex whitespace-nowrap w-max">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center shrink-0">
              {["Financial Freedom", "Invest Boldly", "Your Power", "Build Wealth", "No Limits"].map((word, idx) => (
                <span key={idx} className="font-[var(--fd)] text-3xl sm:text-5xl font-bold text-[#E8547A]/15 px-10 uppercase tracking-tight">
                  {word} <span className="text-[#E8547A]/30 ml-4">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── WHY IT MATTERS ── */}
      <section className="bg-[#FBF6EF] py-20 px-6 sm:px-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-12">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-[3px] text-[#E8547A] block mb-3">
                Why It Matters
              </span>
              <h2 className="font-[var(--fd)] text-4xl sm:text-6xl font-bold text-[#0D0B09] leading-none">
                Women face <em className="text-[#E8547A] italic">different</em> financial realities.
              </h2>
            </div>
            <p className="text-base text-[#7A6A5A] font-light leading-relaxed max-w-[380px]">
              Career breaks, wage gaps, longer lifespans — most financial advice ignores all of this. We built MyAnmol to address every single one.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-black/10 rounded-2xl overflow-hidden shadow-sm">
            {[
              { num: "7+", title: "Years of career breaks", desc: "Average time women step away for caregiving — creating gaps most planners don't account for. We build plans that flex with your life." },
              { num: "20%", title: "Gender pay gap", desc: "Lower income means smaller SIPs — but with the right strategy, compounding still works powerfully. Every rupee invested multiplies tomorrow." },
              { num: "+5 yrs", title: "Longer lifespan", desc: "Women outlive men on average — making a longer retirement horizon non-negotiable to plan for. Your wealth must last as long as you do." },
              { num: "1 in 3", title: "Feel financially confident", desc: "Only 1 in 3 women report genuine financial confidence. We exist to change that number — one conversation, one goal, one SIP at a time." },
            ].map((c, i) => (
              <div key={i} className="bg-[#FBF6EF] p-8 hover:bg-[#fff5f7] transition-all flex flex-col justify-between group">
                <div>
                  <div className="font-[var(--fd)] text-5xl font-bold text-[#E8547A] mb-3">{c.num}</div>
                  <h4 className="font-bold text-base text-[#0D0B09] mb-2">{c.title}</h4>
                  <p className="text-sm text-[#7A6A5A] font-light leading-relaxed">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FACTS / GAPS ── */}
      <section className="bg-gradient-to-br from-[#FFF8FA] via-[#FFE8F0] to-[#FFF0F5] py-20 px-6 sm:px-12">
        <div className="max-w-[1200px] mx-auto text-center mb-12">
          <span className="text-xs font-extrabold uppercase tracking-[3px] text-[#E8547A] block mb-3">
            Facts We're Fighting
          </span>
          <h2 className="font-[var(--fd)] text-4xl sm:text-6xl font-bold text-[#0D0B09] mb-3">
            The gaps we're <em className="text-[#E8547A] italic">closing.</em>
          </h2>
          <p className="text-base text-[#7A6A5A] font-light max-w-md mx-auto">
            Real numbers. Named honestly. Because you can't solve what you won't acknowledge.
          </p>
        </div>

        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-px bg-[#E8547A]/10 rounded-2xl overflow-hidden shadow-sm">
          <div className="bg-white/80 p-8 sm:p-10">
            <div className="font-[var(--fd)] text-6xl font-bold text-[#E8547A] mb-3">72%</div>
            <h4 className="font-bold text-base text-[#0D0B09] mb-2">Financially Sidelined</h4>
            <p className="text-sm text-[#7A6A5A] font-light leading-relaxed">
              Of Indian women leave major financial decisions entirely to male family members. Financial independence starts with awareness — and we're here to build it.
            </p>
          </div>

          <div className="bg-white/80 p-8 sm:p-10">
            <div className="font-[var(--fd)] text-6xl font-bold text-[#E8547A] mb-3">58%</div>
            <h4 className="font-bold text-base text-[#0D0B09] mb-2">Underinsured</h4>
            <p className="text-sm text-[#7A6A5A] font-light leading-relaxed">
              More than half have no health or life insurance policy in their own name. Protection is the foundation of every solid financial plan — and you deserve it.
            </p>
          </div>

          <div className="bg-white/80 p-8 sm:p-10">
            <div className="font-[var(--fd)] text-6xl font-bold text-[#E8547A] mb-3">14%</div>
            <h4 className="font-bold text-base text-[#0D0B09] mb-2">Investment Gap</h4>
            <p className="text-sm text-[#7A6A5A] font-light leading-relaxed">
              Only 14% of mutual fund investors in India are women — despite equal capability and intelligence. Closing this gap is exactly why MyAnmol exists.
            </p>
          </div>

          <div className="bg-white/80 p-8 sm:p-10">
            <div className="font-[var(--fd)] text-6xl font-bold text-[#E8547A] mb-3">82%</div>
            <h4 className="font-bold text-base text-[#0D0B09] mb-2">Wished They Started Sooner</h4>
            <p className="text-sm text-[#7A6A5A] font-light leading-relaxed">
              Of women who invest say they wished they'd started earlier — but lacked guidance or confidence. The best time to start is now, and we'll walk every step with you.
            </p>
          </div>
        </div>
      </section>

      {/* ── NO FEAR ZONE ── */}
      <section className="bg-gradient-to-br from-[#FFF5F8] via-[#FFEAF2] to-[#FFF8FB] py-20 px-6 sm:px-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="max-w-xl mb-12">
            <span className="text-xs font-extrabold uppercase tracking-[3px] text-[#E8547A] block mb-3">
              A Safe Space
            </span>
            <h2 className="font-[var(--fd)] text-4xl sm:text-6xl font-bold text-[#0D0B09] leading-tight mb-4">
              What you <em className="text-[#E8547A] italic">don't</em><br />
              get here.
            </h2>
            <p className="text-base text-[#7A6A5A] font-light leading-relaxed">
              We've removed every barrier that has traditionally kept women away from wealth creation. This is a fear-free zone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#E8547A]/10 rounded-2xl overflow-hidden shadow-sm">
            {[
              { title: "No Jargon", desc: "Plain language, warm guidance. We translate complex financial concepts into everyday conversations. Clarity is confidence." },
              { title: "No Judgment", desc: "No \"you should have started earlier.\" You are exactly where you need to be — right now. Every step forward is celebrated." },
              { title: "No Surprises", desc: "Transparent products. Honest timelines. Zero hidden charges. What you see is always exactly what you get." },
              { title: "No Cookie-Cutter Plans", desc: "Career breaks, joint finances, irregular income — your plan fits your actual life. We listen first, then build a strategy." },
              { title: "No Hype", desc: "Calm, evidence-based guidance for real, steady wealth. No noise, no false promises, no chasing trends." },
              { title: "No Going It Alone", desc: "A growing community of 1,000+ women taking charge of their finances — together, with us beside you every step." },
            ].map((nf, i) => (
              <div key={i} className="bg-white/70 p-8 hover:bg-white transition-all">
                <div className="font-[var(--fd)] text-2xl font-bold text-[#E8547A] mb-3">✕</div>
                <h4 className="font-bold text-base text-[#0D0B09] mb-2">{nf.title}</h4>
                <p className="text-sm text-[#7A6A5A] font-light leading-relaxed">{nf.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INVESTMENT LEARNING ── */}
      <section className="bg-[#F5EDE0] py-20 px-6 sm:px-12 text-[#0D0B09]">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-12">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-[3px] text-[#E8547A] block mb-3">
                Investment Learning
              </span>
              <h2 className="font-[var(--fd)] text-4xl sm:text-6xl font-bold leading-none">
                Learn at <em className="text-[#E8547A] italic">your</em> pace.
              </h2>
            </div>
            <p className="text-base text-[#7A6A5A] font-light leading-relaxed max-w-[340px]">
              From your very first SIP to a full long-term portfolio — structured, friendly, and confidence-building at every stage.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-black/10 rounded-2xl overflow-hidden shadow-sm">
            {[
              { level: "01 — Beginner", title: "Financial Foundations", tags: ["Budgeting basics", "Why invest", "Emergency funds", "Intro to SIPs"] },
              { level: "02 — Intermediate", title: "Building Your Portfolio", tags: ["Asset allocation", "Risk vs return", "Goal-based plans", "Tax saving"] },
              { level: "03 — Advanced", title: "Long-Term Wealth", tags: ["Equity investing", "Retirement planning", "Estate planning", "Rebalancing"] },
              { level: "04 — Masterclass", title: "Money & Life Planning", tags: ["Career breaks", "Joint finances", "Insurance planning", "Legacy & will"] },
            ].map((c, i) => (
              <div key={i} className="bg-[#F5EDE0] p-8 hover:bg-[#EEE0CC] transition-all flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold tracking-[2.5px] uppercase text-[#E8547A] block mb-3">
                    {c.level}
                  </span>
                  <h3 className="font-[var(--fd)] text-2xl font-bold text-[#0D0B09] mb-4">
                    {c.title}
                  </h3>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {c.tags.map((t, idx) => (
                      <span key={idx} className="text-[11px] bg-[#E8547A]/10 text-[#8A3050] border border-[#E8547A]/15 px-2.5 py-1 rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <Link to="/insights/learn" className="text-sm font-bold text-[#E8547A] inline-flex items-center gap-2 hover:gap-3 transition-all">
                  Explore course →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOUR PILLARS ── */}
      <section className="py-20 bg-gradient-to-br from-[#FFF0F5] via-[#FFE0EC] to-[#FFF5F8] px-6 sm:px-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-[3px] text-[#E8547A] block mb-3">
                Financial Literacy
              </span>
              <h2 className="font-[var(--fd)] text-4xl sm:text-6xl font-bold text-[#0D0B09] leading-tight">
                Four pillars of <em className="text-[#E8547A] italic">financial freedom.</em>
              </h2>
            </div>
            <p className="text-base text-[#7A6A5A] font-light leading-relaxed max-w-[380px]">
              Our approach to financial education is built on four simple, powerful ideas — each one building on the last, each one designed for the life a woman actually lives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#E8547A]/10 rounded-2xl overflow-hidden shadow-sm">
            {[
              { num: "01", title: "Know Where You Stand", desc: "Understanding your current financial health — income, expenses, debts, and assets — is the essential first step. Clarity always precedes confidence." },
              { num: "02", title: "Define What You Want", desc: "A dream home, your child's education, a secure retirement, a business of your own — giving money a goal gives it meaning, momentum, and purpose." },
              { num: "03", title: "Build With Discipline", desc: "Wealth is built in small, consistent steps. SIP discipline and smart budgeting are habits that quietly compound into significant wealth over time." },
              { num: "04", title: "Stay the Course", desc: "Markets fluctuate and life changes — but a well-built plan holds steady. We stand beside you through every phase, every career break, every milestone." },
            ].map((p, i) => (
              <div key={i} className="bg-white/80 p-8 sm:p-10 relative overflow-hidden">
                <div className="font-[var(--fd)] text-5xl font-bold text-[#E8547A]/20 mb-3">{p.num}</div>
                <h4 className="font-bold text-base text-[#0D0B09] mb-2">{p.title}</h4>
                <p className="text-sm text-[#7A6A5A] font-light leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REAL STORIES ── */}
      <section className="bg-[#FBF6EF] py-20 px-6 sm:px-12 text-[#0D0B09]">
        <div className="max-w-[1200px] mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-[3px] text-[#E8547A] block mb-3">
            Real Women, Real Stories
          </span>
          <h2 className="font-[var(--fd)] text-4xl sm:text-6xl font-bold mb-12">
            Voices that <em className="text-[#E8547A] italic">inspire.</em>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-black/10 rounded-2xl overflow-hidden shadow-sm">
            {[
              { name: "Harshita Naidu", role: "SIP Investor, Bengaluru", quote: "Investing with Anmol SIP has been a smooth and reliable experience. Their team provides clear guidance and timely updates, making me feel confident in my financial journey." },
              { name: "Madhushree C", role: "Mutual Fund Investor, Bengaluru", quote: "The team is highly knowledgeable and professional. They helped me to choose the right mutual fund investments based on my financial goals and risk." },
              { name: "Kavitha N", role: "Investor, Bengaluru", quote: "I have found them very courteous, transparent and methodical in their dealings. I have benefitted financially with their investment plan made for me." },
              { name: "Maitreyi Jain", role: "Investor, Bengaluru", quote: "Mohit is extremely efficient and understands your appetite for risks so well. He guides you from short term goals to long term goals. I trust him with my money — highly recommended." },
            ].map((s, i) => (
              <div key={i} className="bg-[#FBF6EF] p-8 flex flex-col justify-between">
                <div>
                  <div className="text-[#C9A041] text-xs tracking-widest mb-3">★★★★★</div>
                  <p className="font-[var(--fd)] text-base italic leading-relaxed text-[#0D0B09] mb-6">
                    "{s.quote}"
                  </p>
                </div>
                <div>
                  <div className="font-bold text-sm text-[#0D0B09]">{s.name}</div>
                  <div className="text-xs text-[#7A6A5A] mt-0.5">{s.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── IMPACT METRICS ── */}
      <section className="bg-[#E8547A] py-16 px-6 text-center text-white">
        <div className="max-w-[900px] mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-[3px] text-white/70 block mb-2">
            Our Impact
          </span>
          <h2 className="font-[var(--fd)] text-3xl sm:text-5xl font-bold mb-3">
            Numbers that <em className="italic">matter.</em>
          </h2>
          <p className="text-sm text-white/80 font-light max-w-sm mx-auto mb-10 leading-relaxed">
            Behind every number is a woman who decided her financial future deserved real attention.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/20 rounded-2xl overflow-hidden shadow-lg">
            <div className="bg-[#E8547A] p-8">
              <div className="font-[var(--fd)] text-5xl font-bold text-white mb-1">1000+</div>
              <div className="text-xs uppercase tracking-wider text-white/75">Women Empowered</div>
            </div>
            <div className="bg-[#E8547A] p-8">
              <div className="font-[var(--fd)] text-5xl font-bold text-white mb-1">₹500 Cr+</div>
              <div className="text-xs uppercase tracking-wider text-white/75">Assets Under Management</div>
            </div>
            <div className="bg-[#E8547A] p-8 flex flex-col justify-center">
              <div className="font-[var(--fd)] text-lg font-bold text-white mb-1 leading-snug">Trusted by Women, for Women</div>
              <div className="text-xs uppercase tracking-wider text-white/75">Our Promise</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-20 sm:py-28 bg-gradient-to-br from-[#3D0A1F] via-[#5A0E2A] to-[#2D0615] text-center text-white px-6 relative overflow-hidden">
        <div className="max-w-2xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8547A]/15 border border-[#E8547A]/35 text-xs font-bold uppercase tracking-[2.5px] text-[#F9A8C0] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF3D6E]" />
            Begin Today — It's Free
          </div>

          <h2 className="font-[var(--fd)] text-5xl sm:text-7xl font-bold tracking-tight mb-6 leading-tight">
            Start your <br />
            <em className="text-[#E8547A] italic">journey</em> today.
          </h2>

          <p className="text-base sm:text-lg text-white/80 font-light max-w-md mx-auto mb-10 leading-relaxed">
            No minimum amount. No prior knowledge. Just the decision to show up for your future self — and MyAnmol to guide every step.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <button
              type="button"
              onClick={openGetStarted}
              className="bg-[#E8547A] hover:bg-[#C43D66] text-white font-medium text-base px-10 py-4 rounded shadow-xl transition-all inline-flex items-center gap-2"
            >
              Book Free Consultation ↗
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}