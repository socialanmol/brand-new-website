import React, { useState } from "react";
import { Link } from "react-router";

type N = {
  eyebrow: string; title: string; sub: string; cta: string; href?: string;
  hero: string; dark?: boolean; accent: string;
  stats?: [string, string][];
  painEyebrow: string; painTitle: string; pains: [string, string][];
  coverEyebrow: string; coverTitle: string; coverSub: string; tag: string; mods: [string, string][];
  tEyebrow: string; tTitle: string; tests: [string, string, string][];
};

const NICHES: Record<string, N> = {
  hr: {
    eyebrow: "For HR & People Leaders", title: "Your employees are drowning in money stress",
    sub: "India's workforce has a 27% financial literacy rate. When teams struggle financially — focus, morale, and retention all suffer. We fix that with certified workshops.",
    cta: "Book a Free Intro Session →", href: "https://forms.cloud.microsoft/r/uK4ZDnpwRL",
    hero: "bg-gradient-to-r from-[#EEF2FB] to-[#F8FAFE]", accent: "text-[#1A3B9F]",
    stats: [["42%", "workers distracted by money worries"], ["13hrs", "lost per employee every month"], ["72%", "would stay for wellness benefits"], ["84%", "say it improves retention"], ["24%", "fewer unplanned sick days"]],
    painEyebrow: "Why it matters", painTitle: "Money stress is silently costing your company",
    pains: [
      ["Boost Productivity", "Financial anxiety steals ~13 hours of focused work per employee every month. Our sessions give people practical tools to regain control."],
      ["Improve Retention", "72% of employees say they'd leave for a company that offers financial wellness. Be the employer they want to stay with."],
      ["Whole-person Well-being", "Financial stress spills into health and absenteeism. Companies with wellness programs see up to 24% fewer unplanned sick days."],
    ],
    coverEyebrow: "Business case", coverTitle: "The ROI your CFO will actually approve", coverSub: "", tag: "",
    mods: [
      ["Productivity recovered", "Financial stress costs 3 hrs of productive work/employee/week. A team of 100 loses 1,200+ hours monthly."],
      ["Attrition cost avoided", "Replacing a mid-level employee costs 50–200% of their annual salary. 84% of orgs confirm wellness reduces turnover."],
      ["Sick day savings", "Wellness programs reduce sick days by 1.5 days/employee/year. 200-person team = 300 recovered workdays."],
    ],
    tEyebrow: "Social proof", tTitle: "Trusted by HR leaders across India",
    tests: [
      ["Within a month of the Standard program, 80% of our staff opened SIPs or emergency funds. Engagement was unlike anything we'd seen from previous wellness initiatives.", "Priya Ramesh", "HR Head · Bangalore Tech Firm"],
      ["Attrition dropped noticeably after the Premium series. Employees feel genuinely cared for. The certified trainer made complex topics feel approachable for everyone.", "Anil Kumar", "VP People & Culture · Manufacturing"],
      ["We ran the Basic intro as a pilot. The response was so positive we immediately upgraded to Premium. ROI was clear within the first quarter.", "Sunita Menon", "Chief People Officer · Fintech Startup"],
    ],
  },
  biz: {
    eyebrow: "For Business Owners & Entrepreneurs", title: "Your business runs. Does your personal wealth?",
    sub: "Most business owners pour everything into the company — and forget to build personal financial security. We bridge that gap with structured, India-focused wealth planning.",
    cta: "Schedule a Consultation →", hero: "bg-[#0D1E52] text-white", dark: true, accent: "text-[#8DC63F]",
    stats: [["68%", "of Indian SMB owners have no personal retirement plan"], ["₹40L", "avg. personal wealth lost by founders with no exit plan"], ["3X", "more wealth accumulated by owners with a separate personal plan"], ["52%", "of SMB owners conflate personal and business finances"], ["₹0", "in emergency fund for 6 in 10 self-employed professionals"]],
    painEyebrow: "The blind spots", painTitle: "The financial traps business owners fall into",
    pains: [
      ["Mixing business & personal money", "Without clean separation, personal wealth gets eroded every time the business hits a rough patch. Your salary, your savings — they need protection too."],
      ["No retirement corpus outside the business", "Betting your retirement on the business sale is high risk. A personal NPS + mutual fund corpus is non-negotiable."],
      ["No succession or exit strategy", "70% of family businesses fail in the second generation. Proper legal structures, wills, and wealth transfer plans protect what you've built."],
      ["Underinsured personally", "Your company has business insurance — but do you have adequate term life, critical illness, and key-person coverage?"],
      ["Tax inefficiency on personal income", "Most owners extract money as salary without optimising for dividends, ELSS, HUF structuring, or Section 80C/80D deductions."],
      ["No liquid personal emergency fund", "When the business needs a cash infusion, personal savings get raided. A dedicated 6-month liquid fund keeps resilience separate."],
    ],
    coverEyebrow: "What we cover", coverTitle: "A complete personal wealth framework for founders", coverSub: "6 expert-led sessions built for the unique financial reality of Indian business owners.", tag: "Session",
    mods: [
      ["Separating Business & Personal Wealth", "Structure owner compensation, set up a personal salary, and create a firewall between company cash flow and personal finances."],
      ["Retirement Planning Beyond the Business", "NPS, mutual fund portfolios, and passive income strategies so retirement doesn't depend on a business exit."],
      ["Insurance Architecture for Owners", "Term life, keyman insurance, critical illness, and business continuity coverage — mapped to your stage."],
      ["Tax Strategy & Structuring", "HUF creation, dividend vs salary decisions, ELSS optimisation, and Section 80C mastery for owner-managers."],
      ["Exit Planning & Succession", "Business valuation basics, will drafting, family trust structures, and wealth transfer strategies."],
      ["Wealth Consolidation & Legacy", "A personal balance sheet, net worth tracker, and a 5-year wealth milestone roadmap."],
    ],
    tEyebrow: "What founders say", tTitle: "Built for those who built something of their own",
    tests: [
      ["I'd been running my business for 11 years but had almost nothing in personal savings. MyAnmol helped me build a framework I should have had from day one.", "Rajesh Kapoor", "Founder · Mumbai-based Manufacturing SME"],
      ["The session on owner compensation and tax structuring alone saved me over ₹2L in the first year. This is the program every entrepreneur in India needs.", "Deepa Sharma", "Co-founder · Bangalore EdTech Startup"],
      ["I finally separated my personal and business accounts properly. The peace of mind from having 6 months of personal reserves is something I can't put a price on.", "Vikram Nair", "Director · Family Business, Pune"],
    ],
  },
  senior: {
    eyebrow: "For Couples & Individuals Aged 60+", title: "You've worked hard. Now let your money work for you.",
    sub: "Retirement isn't an end — it's a new financial chapter. We help senior couples protect their corpus, generate income, and plan for a dignified, independent life.",
    cta: "Book a Free Retirement Consultation →", hero: "bg-gradient-to-r from-pink-50 to-amber-50", accent: "text-pink-700",
    painEyebrow: "What keeps you up at night", painTitle: "The real worries of life after 60",
    pains: [
      ["Medical expenses running out of control", "Healthcare costs are rising at 7% per year. Without proper health insurance and a medical corpus, one hospitalisation can disrupt 5 years of savings."],
      ["Corpus depleting faster than expected", "Many seniors draw too much too early. A proper withdrawal rate plan (the 4% rule, India-adjusted) ensures your money lasts as long as you do."],
      ["FD rates not keeping up with inflation", "Keeping everything in FDs means real returns may be negative after tax and inflation. We explore safer debt funds, SCSS, PMVVY, and hybrid options."],
      ["Will, nomination & estate confusion", "Many families face disputes because nominations weren't updated or wills were never written. A simple estate plan prevents decades of conflict."],
      ["Becoming a burden on children", "Financial independence in retirement is possible. We help you build income streams — pension, dividends, systematic withdrawals."],
      ["Fraud and financial scams targeting seniors", "Seniors are disproportionately targeted by investment fraud. We provide practical guidance on red flags, safe instruments, and protecting your assets."],
    ],
    coverEyebrow: "What we cover", coverTitle: "A retirement financial plan you'll actually follow", coverSub: "Gentle, jargon-free sessions designed for couples and individuals in the 55–75 age group.", tag: "Session",
    mods: [
      ["Corpus Assessment & Projection", "How much do you actually have? How long will it last? A realistic retirement runway model tailored to your lifestyle."],
      ["Income Streams in Retirement", "SCSS, PMVVY, dividend-paying funds, annuities, rent — multiple income sources so no single one is critical."],
      ["Health & Medical Planning", "Senior health insurance options, critical illness riders, a dedicated medical corpus, and cashless hospitalisation networks."],
      ["Wills, Nominations & Estate Planning", "Step-by-step guidance on writing a will, updating nominations, and transferring wealth smoothly."],
      ["Protecting Against Fraud", "Recognise investment scams, Ponzi schemes, and online fraud — with practical checklists you can reference any time."],
      ["Peace-of-Mind Financial Plan", "A simple one-page summary: income sources, expenses, corpus, insurance, and contacts — so your family knows the full picture."],
    ],
    tEyebrow: "Real stories", tTitle: "Retirement is better when you have a plan",
    tests: [
      ["My husband and I had ₹60L sitting in FDs. After the sessions we moved a portion into SCSS and balanced funds. Our monthly income nearly doubled with better safety.", "Leela Murthy", "Retired Teacher · Mysore, 68"],
      ["Finally got our wills and nominations in order after 30 years. The estate planning session was eye-opening. We had three accounts with outdated nominees.", "Govind Rao", "Retired Bank Manager · Hyderabad, 71"],
      ["The fraud awareness session helped my mother-in-law identify a scam she was about to invest ₹5L in. This program pays for itself many times over.", "Suresh Pillai", "Son-in-law, enrolled his parents · Kochi"],
    ],
  },
  student: {
    eyebrow: "For Young Professionals (22–32)", title: "Your first paycheck. Your first real shot at wealth.",
    sub: "The habits you build in your 20s will determine your financial future. Most young Indians start too late — we help you start now, with small steps that compound into millions.",
    cta: "Start Your Financial Journey →", hero: "bg-gradient-to-r from-indigo-50 to-blue-50", accent: "text-[#1A3B9F]",
    stats: [["₹2,000", "SIP/month at 22 = ₹1.8Cr by 60 at 12% returns"], ["67%", "of millennials live paycheck to paycheck"], ["1 in 3", "young Indians have zero savings"], ["₹0", "emergency fund for 59% of 22–30 year olds"], ["8 yrs", "avg head start you get by beginning at 22 vs 30"]],
    painEyebrow: "Built for beginners", painTitle: "Everything your school never taught you about money",
    pains: [
      ["Budgeting & the 50/30/20 Rule", "Create a budget that works on ₹25k–₹60k/month. Ditch the guilt, automate your savings, and still enjoy life."],
      ["First SIP & Mutual Fund Basics", "Everything you need to open your first SIP in 15 minutes. Index funds, ELSS, and flexi-cap — explained without jargon."],
      ["Emergency Fund & Debt Freedom", "Build a 3-month emergency fund, tackle student or personal loans smartly, and never be caught off guard again."],
      ["Planning Your First Home", "Down payment strategy, EMI calculations, and how to avoid over-borrowing when buying your first home in India."],
      ["Term & Health Insurance", "Why you need ₹1Cr term cover in your 20s (it's cheaper than you think), and how to choose the right health plan."],
      ["Goal-Based Investing", "Map every investment to a goal — wedding, travel, house, retirement. Build a portfolio with purpose and direction."],
    ],
    coverEyebrow: "How it works", coverTitle: "From zero to financially sorted in 4 steps", coverSub: "No prior knowledge needed. We start from scratch and make it genuinely fun.", tag: "Step",
    mods: [
      ["Free intro webinar — understand your financial health", "A free 45-minute session that audits your current savings, debt, and spending habits. No judgment, just clarity."],
      ["Personalised 3-month action plan", "A specific plan: which SIP to open, how much emergency fund to target, which insurance to get first."],
      ["Monthly workshops & accountability check-ins", "Group sessions with peers your age, monthly follow-ups, and a community to keep you motivated."],
      ["Track your growing net worth", "Track your personal balance sheet — assets, liabilities, net worth — every quarter."],
    ],
    tEyebrow: "From people just like you", tTitle: "Started young, ahead of the curve",
    tests: [
      ["I was 24 and had no idea what an SIP even was. Six months later I have 3 SIPs running, a health policy, and an emergency fund. It genuinely changed how I think about money.", "Aarav Verma", "Software Engineer · Pune, 25"],
      ["The session on goal-based investing made everything click. I now have a separate SIP for my Europe trip, one for my house, and one for retirement.", "Neha Singh", "Marketing Manager · Bangalore, 27"],
      ["Honestly, the term insurance session scared me into getting covered the very next day. Best ₹450/month I've ever spent. The peace of mind is real.", "Kiran Menon", "Product Designer · Chennai, 29"],
    ],
  },
  freelancer: {
    eyebrow: "For Freelancers, Consultants & Gig Workers", title: "Irregular income. Regular financial peace of mind.",
    sub: "No employer EPF. No guaranteed salary. No corporate insurance. Freelancers face unique financial challenges — and need a uniquely different playbook.",
    cta: "Book a Freelancer Consultation →", hero: "bg-gradient-to-r from-amber-50 to-orange-50", accent: "text-amber-700",
    stats: [["1.5Cr", "freelancers in India — the world's 2nd largest freelance workforce"], ["73%", "of freelancers have no retirement savings at all"], ["₹0", "in EPF or gratuity — unlike salaried employees"], ["44%", "of gig workers have zero health insurance coverage"], ["2.5X", "more income volatility vs salaried professionals"]],
    painEyebrow: "The freelancer's financial reality", painTitle: "Why standard financial advice doesn't work for you",
    pains: [
      ["Irregular income makes budgeting hard", "Most budgeting advice assumes a fixed salary. We teach percentage-based budgeting that flexes with your income — feast months and famine months alike."],
      ["No employer-side PF or gratuity", "Freelancers must build this themselves via NPS or voluntary PF — and most don't know how."],
      ["Advance tax and GST compliance stress", "Quarterly advance tax, GST filing, professional tax — we simplify the financial hygiene every freelancer needs."],
      ["No group health or life insurance", "Without a corporate plan, individual premiums are higher. We help you pick the right health plan and term cover for your budget."],
      ["No home/car loan due to income proof issues", "Banks often reject freelancers. We guide you on ITR filing, bank statement hygiene, and improving loan eligibility."],
      ["Dry-spell anxiety and no emergency buffer", "A 3–6 month liquid emergency fund is non-negotiable. We help you build it methodically even on ₹30k–₹50k months."],
    ],
    coverEyebrow: "The freelancer playbook", coverTitle: "Financial modules built for the self-employed", coverSub: "", tag: "Module",
    mods: [
      ["Percentage-Based Budgeting", "Never say \"I can't budget — my income is irregular.\" Allocate percentages, not fixed amounts."],
      ["Your DIY Retirement (No EPF? No Problem)", "NPS for the self-employed, voluntary PF, ELSS SIPs — build your own retirement corpus with full tax benefits."],
      ["Taxes & Compliance for Freelancers", "Advance tax calendar, presumptive taxation (44ADA), GST basics, and deductions freelancers often miss."],
      ["Insurance Without a Corporate Plan", "How to get ₹1Cr term cover and comprehensive health cover at freelancer-friendly premiums."],
      ["Building Loan Eligibility", "ITR filing best practices, GST records, and income averaging to qualify for home and vehicle loans."],
      ["Dry-Spell Survival Fund", "When big clients pay, a portion goes into liquid funds — automatically funding the lean months."],
    ],
    tEyebrow: "Freelancer success stories", tTitle: "Self-employed. Not self-unsecured.",
    tests: [
      ["I'd been freelancing for 4 years and paying almost no tax — turns out I was also saving nothing for retirement. The NPS + ELSS combination was a revelation.", "Prashant Das", "Freelance Developer · Hyderabad, 32"],
      ["The dry-spell fund idea was genius. I now auto-transfer 20% of every big payment to a liquid fund. Last month's dry spell was the first time I didn't stress at all.", "Meenakshi Kumar", "Freelance Designer · Bangalore, 29"],
      ["After 3 rejected home loan applications, the loan eligibility module changed everything. My CA and I restructured my ITRs and I was approved 6 months later.", "Rohit Patil", "Content Consultant · Pune, 35"],
    ],
  },
  homemaker: {
    eyebrow: "For Homemakers & Stay-at-Home Parents", title: "Managing a home is a full-time job. So is managing money.",
    sub: "Financial independence doesn't require a salary. Whether you manage household finances or want to build your own wealth — you deserve financial literacy and control.",
    cta: "Start Your Financial Independence Journey →", hero: "bg-gradient-to-r from-pink-50 to-emerald-50", accent: "text-pink-700",
    stats: [["160M", "homemakers in India — most with no personal financial plan"], ["82%", "of homemakers have no money in their own name"], ["₹5k", "per month can build ₹50L+ over 20 years via SIP"], ["2.3X", "more financial security when women have independent accounts"], ["91%", "of homemakers never received financial education of any kind"]],
    painEyebrow: "Why this matters", painTitle: "Financial independence is a form of security",
    pains: [
      ["Money in your own name", "A joint account isn't the same as financial independence. Learn how to open individual accounts, start SIPs, and build personal assets."],
      ["Children's education planning", "The cost of a good college degree in India doubles every 8 years. Start a dedicated Sukanya Samriddhi / ELSS SIP today — even ₹2,000/month makes a huge difference."],
      ["Household budget optimisation", "Track household spending, identify leaks, negotiate bills, and redirect savings into real wealth creation."],
      ["Protection in case of loss or separation", "Death, disability, or divorce can leave homemakers vulnerable. Know the safety nets: term insurance, nomination rights, and legal entitlements."],
      ["Your name on the property", "Co-ownership of property is both a financial and legal right. We explain how joint property works and why it matters."],
      ["Returning to work later", "An independent financial track record — credit history, savings, investments — dramatically improves re-entering the workforce."],
    ],
    coverEyebrow: "What we cover", coverTitle: "From household manager to financial decision-maker", coverSub: "", tag: "Module",
    mods: [
      ["Household Budget & Savings", "Build a monthly household budget, identify spending leaks, and create an automatic savings habit."],
      ["Investing Without a Salary", "How to start SIPs as a homemaker — including gifting provisions where a spouse can fund your investments with zero tax implications."],
      ["Children's Education Corpus", "Sukanya Samriddhi Yojana, ELSS for education, PPF laddering — build a ₹30–50L education fund over 15 years."],
      ["Insurance & Safety Nets", "Term life for the earning spouse, health floater for the family, and your own critical illness cover."],
      ["Legal Rights & Financial Entitlements", "Property co-ownership, nomination rights on all family accounts, inheritance rights, and what to do if the primary earner passes away."],
      ["Pathway to Financial Independence", "Building credit history, skill income streams, digital savings tools, and a long-term personal wealth roadmap."],
    ],
    tEyebrow: "Real stories of change", tTitle: "Because you deserve financial confidence too",
    tests: [
      ["I never thought I could invest without a salary. After the session I opened my first SIP in my own name — ₹3,000/month. It feels like my own money for the first time.", "Archana Joshi", "Homemaker · Nagpur, 38"],
      ["We started a Sukanya Samriddhi account for our daughter the same week. The planning module showed us we needed to start 5 years ago — but starting now is still powerful.", "Ritu Tiwari", "Stay-at-home Parent · Lucknow, 34"],
      ["The legal rights session was a wake-up call. I didn't know my name wasn't on any of our accounts as nominee. We fixed everything in one weekend.", "Padma Bhat", "Homemaker · Bangalore, 42"],
    ],
  },
  newlywed: {
    eyebrow: "For Newly Married Couples", title: "Two salaries. One shared future. Zero financial fights.",
    sub: "The first 3 years of marriage set the financial tone for decades. Build a strong joint foundation — shared goals, combined budgets, and a plan that works for both of you.",
    cta: "Start Your Couples Journey →", hero: "bg-gradient-to-r from-rose-50 to-purple-50", accent: "text-rose-700",
    stats: [["#1", "cause of marital conflict in India is money disagreements"], ["58%", "of couples never discuss finances before marriage"], ["2x", "faster wealth accumulation with a joint financial plan"], ["₹50L", "avg home down payment target for couples in metro cities"], ["3 yrs", "is the critical window to set lifelong financial habits together"]],
    painEyebrow: "Real couple challenges", painTitle: "The money conversations most couples avoid",
    pains: [
      ["Whose money is whose?", "Separate vs joint accounts — or both? We help couples design a money system that prevents resentment."],
      ["Home purchase — when and how much?", "Down payment savings, EMI affordability, which city, whose name on the deed. Buying too soon can derail 10 years of other goals."],
      ["Planning for a baby", "Maternity leave income gap, delivery costs (₹1–3L), and the first 5 years of childcare expenses. Most couples are shocked."],
      ["Dual income, no budget", "Two salaries can create a false sense of abundance. Without a joint budget, lifestyle inflation quietly consumes everything."],
      ["Insurance gap after marriage", "Your parents' health plan no longer covers you. And ₹1Cr term life cover for each spouse is suddenly very important."],
      ["Different financial personalities", "One saver, one spender. We help couples find a shared investment style that doesn't lead to arguments."],
    ],
    coverEyebrow: "What we cover", coverTitle: "Your couples financial masterclass", coverSub: "5 sessions designed for two — practical, honest, and built around real couple dynamics.", tag: "Session",
    mods: [
      ["Money Conversations That Don't End in Fights", "How to discuss finances as a team — income disclosure, spending styles, and a money system where both feel heard."],
      ["Joint Budget & Savings Architecture", "The 3-account system (his, hers, ours), joint emergency fund, and automated savings from both salaries."],
      ["Home, Baby & Big Life Goals", "Timeline-based goal mapping: first home in 5 years, first baby fund, car, and long-term retirement."],
      ["Couples Insurance Audit", "Term life for both, family floater health plan, maternity add-ons, and critical illness riders."],
      ["Investing Together", "Joint SIPs, ELSS tax savings for both, NPS for both spouses, and a combined portfolio with different risk appetites."],
      ["Joint Will & Nomination Cleanup", "Update all nominations after marriage, draft a simple joint will, and ensure full visibility of family accounts."],
    ],
    tEyebrow: "Couples who planned together", tTitle: "Money conversations that brought us closer",
    tests: [
      ["We'd been married 8 months and had never once talked about money seriously. The session forced us to, and honestly it was the best thing we could have done for our relationship.", "Ananya & Rohit", "Married 2023 · Bangalore"],
      ["We set up the 3-account system and started joint SIPs the same weekend. Six months in, we've saved ₹1.8L toward our home down payment. It feels real now.", "Pooja & Karan", "Married 2024 · Mumbai"],
      ["I'm a saver, my husband is a spender. We always argued. The session gave us a framework that works for both. We haven't had a money argument since.", "Nisha Varma", "Married 2023 · Pune"],
    ],
  },
  singleparent: {
    eyebrow: "For Single Parents", title: "One income. Double the responsibility.",
    sub: "Single parents carry an extraordinary financial burden — providing for children, building security, and planning for the future, all on one salary. You deserve a plan built for your reality.",
    cta: "Book a Single Parent Consultation →", hero: "bg-gradient-to-r from-sky-50 to-blue-50", accent: "text-sky-700",
    stats: [["13M+", "single-parent households in India — a largely underserved segment"], ["76%", "of single parents report high financial anxiety every month"], ["₹25k", "avg monthly childcare cost in Tier-1 cities for working single parents"], ["89%", "have no documented financial plan in case of their own illness or death"], ["3X", "more financial stress vs two-parent households at the same income"]],
    painEyebrow: "The single parent's reality", painTitle: "The financial challenges no one talks about",
    pains: [
      ["One income doing the work of two", "Every rupee has to work twice as hard. We help you build a lean, optimised budget without sacrificing your child's needs or your own dignity."],
      ["Child's future if something happens to you", "A term plan, a guardian clause in your will, and a trust structure can protect everything."],
      ["Education costs on one salary", "Private schooling, coaching, and higher education can cost ₹30–80L over 15 years. A dedicated education SIP started early is the best thing you can do."],
      ["Housing stability and home ownership", "Qualifying for a home loan as a single parent is harder. We guide you on improving eligibility and building a down payment corpus."],
      ["No safety net if you fall sick", "A health cover with zero deductible, a critical illness plan, and a 6-month emergency fund are non-negotiable."],
      ["No time — and decision fatigue", "We give you a simple, automated financial system that runs in the background — even when you don't have the energy to think about it."],
    ],
    coverEyebrow: "What we cover", coverTitle: "A financial plan built for one strong parent", coverSub: "Practical, compassionate, and designed around the real constraints of single-parent life in India.", tag: "Session",
    mods: [
      ["The Single-Income Budget System", "A lean, automated budget that covers essentials, builds savings, and still leaves room for life."],
      ["The Non-Negotiable Safety Net", "Term life ₹1–2Cr, family health cover, critical illness, and a 6-month emergency fund — the four pillars."],
      ["Child's Education & Future Fund", "Sukanya Samriddhi (for daughters), ELSS SIPs, and PPF — a corpus built on ₹8,000–₹12,000/month that grows to ₹40–60L."],
      ["Will, Guardian & Estate Planning", "Nominate a financial guardian, write a will, update all nominations, and create a sealed \"if something happens to me\" document."],
      ["Path to Home Ownership", "Build loan eligibility — optimising your ITR, clearing debts, saving for a down payment, and choosing the right loan tenure."],
      ["Your Retirement — Don't Forget Yourself", "Single parents often sacrifice their own retirement. We build both simultaneously."],
    ],
    tEyebrow: "Stories of resilience", tTitle: "Doing it alone — but not without a plan",
    tests: [
      ["After my divorce I had no idea where to even start. The session gave me a clear roadmap — emergency fund first, then education SIP for my daughter, then my own retirement.", "Smitha Rao", "Single Mother · Hyderabad, 36"],
      ["I had no will and my son had no financial guardian named anywhere. The estate planning module was sobering — and necessary. Everything is in order now and I sleep better.", "Arjun Thakur", "Single Father · Delhi, 41"],
      ["The automated budget system changed everything. My savings happen before I even see the money. I've built ₹2.4L in 9 months without feeling deprived.", "Meera Nambiar", "Single Mother · Kochi, 33"],
    ],
  },
  preretiree: {
    eyebrow: "For Pre-Retirees Aged 45–58", title: "10–15 years left. It's your most powerful window.",
    sub: "The decade before retirement is when financial decisions have the highest impact. Max out, catch up, and lock in a retirement you'll actually enjoy — before the window closes.",
    cta: "Maximise Your Final Wealth Window →", hero: "bg-[#0D1E52] text-white", dark: true, accent: "text-[#8DC63F]",
    stats: [["₹2Cr", "minimum corpus needed for a comfortable 25-yr retirement in India today"], ["10 yrs", "of aggressive saving at 48 can outperform 20 years of passive saving at 35"], ["71%", "of Indians aged 45–55 have less than ₹30L saved for retirement"], ["7%", "annual healthcare cost inflation — the biggest retirement risk"], ["22 yrs", "avg post-retirement life expectancy means money must last very long"]],
    painEyebrow: "The pre-retirement blind spots", painTitle: "Why 50 is the most critical financial age",
    pains: [
      ["Time is finite — but still powerful", "₹50,000/month invested at 12% from age 46 = ₹2.1Cr by 60. Every year of delay costs significantly."],
      ["FDs and gold won't cut it", "Inflation at 6% erodes FD returns. You still need equity exposure — just the right amount and type."],
      ["Children's education vs your retirement", "You're funding college just as you should be maxing out retirement savings. We help you balance both."],
      ["Home loan still running", "Carrying a mortgage into retirement is a risk. We build a prepayment vs invest strategy and show you the math."],
      ["Healthcare costs are about to surge", "Medical expenses typically triple in your 60s. You need a super top-up health plan, a medical corpus, and critical illness cover — locked in before 58."],
      ["No retirement income strategy", "A corpus is not a plan. SWP, annuities, dividend income, SCSS — your drawdown strategy determines whether your money lasts 15 or 30 years."],
    ],
    coverEyebrow: "The pre-retirement program", coverTitle: "Make the next 10 years your financial best", coverSub: "6 high-impact sessions for professionals in the 45–58 age bracket who are serious about their retirement.", tag: "Session",
    mods: [
      ["Retirement Corpus Gap Analysis", "A detailed projection model showing your exact shortfall — and a catch-up plan to close it."],
      ["Maximising the Final Accumulation Phase", "NPS top-up, ELSS catch-up, EPF voluntary contributions, and the right equity-debt glide path."],
      ["Home Loan vs Invest Decision", "The mathematical framework for deciding whether to prepay your mortgage or invest the surplus."],
      ["Healthcare Corpus & Insurance", "Lock in a super top-up health plan and critical illness cover now, before premiums spike at 60. Build a ₹20–30L medical corpus."],
      ["Retirement Income Architecture", "Design post-retirement income: SCSS, PMVVY, SWP from mutual funds, annuity laddering, and dividend income."],
      ["Estate, Will & Legacy Planning", "Will drafting, power of attorney, updating nominations, and wealth transfer strategies."],
    ],
    tEyebrow: "From those who took action in time", tTitle: "The last decade before retirement is everything",
    tests: [
      ["At 52 I thought I'd missed the boat. The gap analysis showed I had a ₹80L shortfall — but also a clear plan to close it. I maxed out NPS and started a ₹40k/month SIP.", "Suresh Kumar", "Senior Manager · Chennai, 53"],
      ["The home loan vs invest session was eye-opening. We stopped prepaying our mortgage and redirected ₹25k/month to a balanced advantage fund instead. Better outcome by far.", "Radha & Ganesh", "Couple, Both 50 · Coimbatore"],
      ["I locked in a ₹50L super top-up health plan at 54 — premium was ₹8,000/year. My colleague waited until 61 and pays ₹38,000/year for lesser cover. Timing matters so much.", "Vijay Prasad", "Deputy Director · Bangalore, 56"],
    ],
  },
  genz: {
    eyebrow: "For Gen Z — First Jobbers & Students (18–22)", title: "You're early. That's your superpower.",
    sub: "No debt. No obligations. No dependants. If you start investing at 18, you'll have 40 years of compounding on your side. Most people don't realise this until it's too late — you do.",
    cta: "Start Your Journey →", hero: "bg-[#091540] text-white", dark: true, accent: "text-[#8DC63F]",
    stats: [["₹1,000", "/month at 18 = ₹1.5Cr by 60 at 12% returns"], ["67%", "of Gen Z Indians have never invested in anything beyond FDs"], ["40 yrs", "of compounding available to an 18-year-old — nothing else compares"], ["₹0", "financial education in Indian schools or colleges"], ["3 in 5", "Gen Z investors lost money in crypto/F&O without understanding the risk"]],
    painEyebrow: "What Gen Z gets wrong", painTitle: "The traps waiting for your first paycheck",
    pains: [
      ["F&O and crypto FOMO", "90% of F&O traders lose money. We don't say avoid them forever — we say understand the risk before you touch them."],
      ["Credit card debt spiral", "A ₹50,000 balance at 40% annual interest doubles in under 2 years. Use credit cards as a tool — not a trap."],
      ["Lifestyle inflation from the first salary", "The biggest mistake: spending your entire raise on a better phone, trips, and subscriptions. Save first, then spend the rest guilt-free."],
      ["Savings account earning nothing", "Your savings account earns 3–4%. Inflation is 5–6%. Even a ₹500/month index fund SIP beats this significantly over 10 years."],
      ["\"I'm young, I don't need insurance\"", "A ₹1Cr term cover at 22 costs less than ₹400/month. At 35, around ₹800. At 45, around ₹2,200. The cheapest time is right now."],
      ["Fintech app overload with no strategy", "5 apps, 3 wallets, 2 demat accounts, 1 crypto exchange — and no coherent plan. We simplify into one clean financial system."],
    ],
    coverEyebrow: "The Gen Z money masterclass", coverTitle: "Everything you need to know before your second salary", coverSub: "Fast, honest, zero-jargon sessions built for the TikTok generation. No boring lectures — just what actually works.", tag: "Session",
    mods: [
      ["The ₹X Rule — How to Budget Your First Salary", "A simple 3-bucket system: automate savings before you spend. Build your first budget in under 20 minutes."],
      ["Your First SIP — Make Compounding Work", "Index funds, large cap, ELSS — explained for a total beginner. We open your first SIP live. Starting at ₹500/month is enough."],
      ["Crypto, F&O & Risk — The Real Truth", "The actual statistics, the tax implications, and the rule: never risk money you can't afford to lose entirely."],
      ["Credit Cards, Loans & Your CIBIL Score", "Build a CIBIL score from zero, earn rewards without paying interest, and avoid the EMI trap."],
      ["Term Insurance at 22 — Why It's Genius", "₹1Cr cover for ₹350/month. Pick the right term plan and riders, and avoid the endowment traps agents push."],
      ["The 30-Year Head Start Plan", "A simple 1-page roadmap: your SIP targets at 22, 25, 28, and 30 — and what ₹1Cr by 35 looks like."],
    ],
    tEyebrow: "From your generation", tTitle: "They started at 22. Watch what happens.",
    tests: [
      ["I used to spend my entire salary by the 20th. After the session I set up an auto-debit on salary day — ₹5k into index funds, ₹2k into liquid fund. I haven't even missed the money.", "Zaid Ahmad", "First Job, IT Sector · Pune, 22"],
      ["The crypto session saved me from putting ₹80k into a meme coin my friend was hyping. I put it in an index fund instead. 14 months ago — the fund is up 22%, the coin is down 70%.", "Ishika Sharma", "Final Year Student · Delhi, 21"],
      ["Got a ₹1Cr term plan at 23 for ₹380/month. My dad pays ₹2,800/month for the same cover at 47. That's the kind of financial head start nobody teaches you in college.", "Rahul Menon", "Software Developer · Bangalore, 23"],
    ],
  },
};

const PACKAGES: [string, string, string, string[], string][] = [
  ["Starter", "Basic", "One focused session for teams up to 30. Covers the essentials.", ["1 session · 90 minutes", "Budgeting & 50/30/20 rule", "SIP investing introduction", "Live Q&A", "Up to 30 participants"], "Get started"],
  ["Growth", "Standard", "2 sessions, 1 month of follow-up support. Deeper impact.", ["2 sessions · 1.5h each", "Budgeting + Debt management", "Insurance essentials", "Participant worksheets", "1-month email support", "Up to 50 participants"], "Book Standard"],
  ["Enterprise", "Premium", "5 expert modules, workbook, and 3 months of ongoing support.", ["5 modules (5×1h or 3×2h)", "Full curriculum + investing", "Participant workbook", "3 months follow-up tips", "Up to 100 participants", "Pre/post survey & reporting"], "Talk to us"],
];

function NicheCTA({ n }: { n: N }) {
  const cls = `inline-block font-extrabold text-xs px-8 py-3.5 rounded-xl ${n.dark ? "bg-[#8DC63F] text-[#091540]" : "bg-[#1A3B9F] text-white"}`;
  return n.href ? (
    <a href={n.href} target="_blank" rel="noreferrer" className={cls}>{n.cta}</a>
  ) : (
    <Link to="/contact" className={cls}>{n.cta}</Link>
  );
}

function NichePage({ id }: { id: string }) {
  const n = NICHES[id];
  return (
    <div className="bg-white text-[#111827]">
      {/* Hero */}
      <div className={`${n.hero} py-16 text-center px-6`}>
        <span className={`text-xs font-extrabold uppercase tracking-widest block mb-2 ${n.accent}`}>{n.eyebrow}</span>
        <h2 className="font-[var(--fd)] text-3xl sm:text-5xl font-bold mb-4 max-w-3xl mx-auto">{n.title}</h2>
        <p className={`text-sm sm:text-base max-w-xl mx-auto mb-6 ${n.dark ? "text-white/80" : "text-gray-600"}`}>{n.sub}</p>
        <NicheCTA n={n} />
      </div>

      {/* Stats */}
      {n.stats && (
        <div className="bg-[#0D1E52] py-8 text-white px-6">
          <div className="max-w-[1100px] mx-auto grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            {n.stats.map(([v, l]) => (
              <div key={v + l}>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#8DC63F] block">{v}</span>
                <span className="text-[11px] text-white/70">{l}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pain points / why it matters */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-[1000px] mx-auto">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#1A3B9F] block mb-2">{n.painEyebrow}</span>
          <h3 className="font-[var(--fd)] text-2xl sm:text-4xl font-bold text-[#091540] mb-8">{n.painTitle}</h3>
          <div className={`grid gap-4 ${id === "hr" ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
            {n.pains.map(([t, d]) => (
              <div key={t} className="rounded-2xl border border-gray-200 bg-white shadow-sm p-5">
                <h4 className="font-bold text-sm text-[#091540] mb-1.5">{t}</h4>
                <p className="text-xs text-gray-600 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HR-only: packages */}
      {id === "hr" && (
        <section className="bg-[#091540] py-16 px-6 text-white">
          <div className="max-w-[1000px] mx-auto">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#8DC63F] block mb-2">Session packages</span>
            <h3 className="font-[var(--fd)] text-2xl sm:text-4xl font-bold mb-2">Choose the right program for your team</h3>
            <p className="text-sm text-white/70 mb-8">Flexible formats — in-person workshops or live webinars — by AMFI-registered, SEBI-compliant educators.</p>
            <div className="grid md:grid-cols-3 gap-4">
              {PACKAGES.map(([tier, name, d, items, btn]) => (
                <div key={name} className={`relative rounded-2xl p-6 border ${name === "Standard" ? "border-[#8DC63F] bg-white/10" : "border-white/10 bg-white/5"}`}>
                  {name === "Standard" && <span className="absolute top-3 right-3 text-[10px] font-bold bg-[#8DC63F] text-[#091540] px-2 py-0.5 rounded-full">Most popular</span>}
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">{tier}</span>
                  <h4 className="font-[var(--fd)] text-2xl font-bold mb-1">{name}</h4>
                  <p className="text-xs text-white/70 mb-4">{d}</p>
                  <ul className="space-y-1.5 mb-5">
                    {items.map((i) => <li key={i} className="text-xs text-white/80">• {i}</li>)}
                  </ul>
                  <a href={n.href} target="_blank" rel="noreferrer" className="block text-center text-xs font-bold rounded-full border border-white/30 py-2.5 hover:bg-white/10">{btn}</a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Cover / modules / ROI / steps */}
      <section className={`py-16 px-6 ${id === "hr" ? "bg-white" : "bg-[#091540] text-white"}`}>
        <div className="max-w-[1000px] mx-auto">
          <span className={`text-[11px] font-extrabold uppercase tracking-widest block mb-2 ${id === "hr" ? "text-[#1A3B9F]" : "text-[#8DC63F]"}`}>{n.coverEyebrow}</span>
          <h3 className="font-[var(--fd)] text-2xl sm:text-4xl font-bold mb-2">{n.coverTitle}</h3>
          {n.coverSub && <p className="text-sm text-white/70 mb-8 max-w-xl">{n.coverSub}</p>}
          <div className={`grid gap-4 mt-6 ${n.mods.length === 4 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
            {n.mods.map(([t, d], i) => (
              <div key={t} className={`rounded-2xl p-5 border ${id === "hr" ? "bg-[#EEF2FB] border-[rgba(26,59,159,0.15)]" : "bg-white/5 border-white/10"}`}>
                <h4 className="font-[var(--fd)] font-bold text-base mb-1.5">{t}</h4>
                <p className={`text-xs leading-relaxed mb-3 ${id === "hr" ? "text-gray-600" : "text-white/70"}`}>{d}</p>
                {n.tag && <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#8DC63F]/20 text-[#8DC63F]">{n.tag} {i + 1}</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#F5F5F2] py-16 px-6">
        <div className="max-w-[1000px] mx-auto text-center">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#1A3B9F] block mb-2">{n.tEyebrow}</span>
          <h3 className="font-[var(--fd)] text-2xl sm:text-4xl font-bold text-[#091540] mb-8">{n.tTitle}</h3>
          <div className="grid md:grid-cols-3 gap-4 text-left">
            {n.tests.map(([q, name, role]) => (
              <div key={name} className="bg-white rounded-2xl shadow-sm p-5">
                <div className="text-[#8DC63F] text-xs mb-2">★★★★★</div>
                <p className="text-xs text-gray-700 leading-relaxed mb-4">"{q}"</p>
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-full bg-[#EEF2FB] text-[#1A3B9F] text-[10px] font-bold flex items-center justify-center">
                    {name.split(/[ &]+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("")}
                  </span>
                  <div>
                    <div className="text-xs font-bold text-[#091540]">{name}</div>
                    <div className="text-[10px] text-gray-500">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {id === "hr" && (
            <div className="flex justify-center flex-wrap gap-2 mt-8">
              {["AMFI Registered", "SEBI Guidelines Compliant", "33+ Years Experience"].map((b) => (
                <span key={b} className="text-[11px] font-bold px-3 py-1.5 rounded-lg bg-[#EEF2FB] text-[#1A3B9F] border border-[rgba(26,59,159,0.2)]">{b}</span>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function FinancialWellnessThemed() {
  const [activeNiche, setActiveNiche] = useState<string>("hr");

  return (
    <div className="font-[var(--fs)] bg-white text-[#111827] antialiased min-h-screen">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-white py-24 text-center px-6">
        <div className="absolute top-[-20%] left-[15%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(26,59,159,0.08)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute top-[-10%] right-[10%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(141,198,63,0.08)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#EEF2FB] border border-[rgba(26,59,159,0.2)] text-[#1A3B9F] text-xs font-bold px-4 py-2 rounded-full mb-8">
            <span className="w-2 h-2 rounded-full bg-[#8DC63F] shadow-[0_0_8px_#8DC63F]" />
            Financial Well-being for Every Life Stage
          </div>

          <h1 className="font-[var(--fd)] text-4xl sm:text-7xl font-extrabold tracking-tight text-[#091540] mb-6 leading-tight">
            The Financial <br />
            Well-being <br />
            Around You
          </h1>

          <p className="text-base sm:text-lg text-gray-600 font-light max-w-xl mx-auto mb-10 leading-relaxed">
            Expert-led programs that meet you where you are — whether you're building a business, planning retirement, or just starting out.
          </p>

          <div className="flex justify-center">
            <Link
              to="/wp/review"
              className="bg-[#1A3B9F] hover:bg-[#0D1E52] text-white font-extrabold text-sm px-8 py-4 rounded-xl shadow-lg transition-all"
            >
              Book a Free Session
            </Link>
          </div>
        </div>
      </section>

      {/* ── NICHE SELECTOR TABS ── */}
      <section className="bg-gradient-to-br from-[#091540] via-[#0D1E52] to-[#1A3B9F] pt-12 px-6">
        <div className="max-w-[1100px] mx-auto text-center pb-8">
          <h2 className="font-[var(--fd)] text-2xl sm:text-4xl font-bold text-white mb-2">
            Choose your financial journey
          </h2>
          <p className="text-sm text-white/70 font-light">Every program is tailored to your unique life stage and goals.</p>

          <div className="flex justify-center flex-wrap gap-2 pt-6 overflow-x-auto no-scrollbar">
            {[
              { id: "hr", icon: "\u{1F3E2}", label: "Corporate HR" },
              { id: "biz", icon: "\u{1F4CA}", label: "Business Owners" },
              { id: "senior", icon: "\u{1F338}", label: "Senior Couples (60+)" },
              { id: "student", icon: "\u{1F393}", label: "Young Professionals" },
              { id: "freelancer", icon: "\u{1F4BB}", label: "Freelancers & Gig" },
              { id: "homemaker", icon: "\u{1F3E1}", label: "Homemakers" },
              { id: "newlywed", icon: "\u{1F48D}", label: "Newlyweds" },
              { id: "singleparent", icon: "\u{1F469}\u{200D}\u{1F466}", label: "Single Parents" },
              { id: "preretiree", icon: "\u{23F3}", label: "Pre-Retirees (45–58)" },
              { id: "genz", icon: "\u{1F4F1}", label: "Gen Z (18–22)" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveNiche(tab.id)}
                className={`px-4 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeNiche === tab.id
                    ? "bg-white text-[#091540] shadow-md"
                    : "bg-white/10 text-white/80 hover:bg-white/15"
                }`}
              >
                <span style={{ fontFamily: '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif' }}>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── NICHE PAGES CONTAINER ── */}
      <div className="bg-[#091540]">
        <NichePage key={activeNiche} id={activeNiche} />
      </div>

      {/* ── CTA BAND ── */}
      <section className="py-24 bg-gradient-to-br from-[#091540] via-[#0D1E52] to-[#1A3B9F] text-center text-white px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-[var(--fd)] text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
            Ready to secure <span className="text-[#8DC63F] italic">your financial future</span>?
          </h2>
          <p className="text-base text-white/80 font-light mb-10 max-w-md mx-auto leading-relaxed">
            Book a free introductory session. We'll customise the program to your team or personal goals.
          </p>
          <Link
            to="/contact"
            className="bg-[#8DC63F] hover:bg-[#9ED64A] text-[#091540] font-extrabold text-base px-10 py-4 rounded-full shadow-lg transition-all inline-block"
          >
            Book a Free Session →
          </Link>
        </div>
      </section>
    </div>
  );
}
