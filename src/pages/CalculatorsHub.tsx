import React, { useState, useMemo } from "react";
import { Link, useOutletContext } from "react-router";

type CalculatorsContext = {
  openGetStarted: () => void;
};

interface CalculatorItem {
  slug: string;
  name: string;
  desc: string;
  cat: "invest" | "goals" | "retire" | "loans" | "inflation";
  keywords: string;
  featured?: "large" | "wide";
  tag?: string;
  icon: string;
}

const CALCULATORS: CalculatorItem[] = [
  {
    slug: "retirement-planning-calculator",
    name: "Retirement Calculator",
    desc: "Estimates the corpus you need to stop working without cutting back on how you live.",
    cat: "retire",
    keywords: "retirement corpus pension freedom age target",
    featured: "wide",
    tag: "Most used",
    icon: "🌅",
  },
  {
    slug: "sip-calculator",
    name: "SIP Calculator",
    desc: "What a monthly SIP grows into over your chosen investment horizon.",
    cat: "invest",
    keywords: "sip monthly systematic investment plan mutual fund",
    featured: "large",
    tag: "Most used",
    icon: "📈",
  },
  {
    slug: "sip-topup-calculator",
    name: "SIP Top-Up",
    desc: "Step up your SIP each year with your salary and see the difference.",
    cat: "invest",
    keywords: "step up topup sip increase annually salary step-up",
    icon: "🚀",
  },
  {
    slug: "lumpsum-calculator",
    name: "Lumpsum Calculator",
    desc: "Growth on a one-time investment across any holding period.",
    cat: "invest",
    keywords: "lumpsum one time investment growth compounding",
    icon: "💰",
  },
  {
    slug: "lumpsum-target-calculator",
    name: "Lumpsum Target",
    desc: "The one-time amount needed today to reach a target corpus.",
    cat: "invest",
    keywords: "lumpsum target corpus required amount reverse",
    icon: "🎯",
  },
  {
    slug: "compounding-calculator",
    name: "Compounding Calculator",
    desc: "Shows what time, not timing, does to an invested rupee.",
    cat: "invest",
    keywords: "compounding power of compounding growth interest",
    icon: "🌱",
  },
  {
    slug: "goal-based-sip",
    name: "Goal-Based SIP",
    desc: "Work backwards from a target goal to the monthly SIP that funds it.",
    cat: "goals",
    keywords: "goal based sip custom target house vacation wedding",
    featured: "large",
    tag: "Full picture",
    icon: "🏆",
  },
  {
    slug: "composite-financial-goal-planner",
    name: "Composite Goal Planner",
    desc: "Map every goal — house, education, retirement — on one dashboard and see what each one costs you monthly.",
    cat: "goals",
    keywords: "composite financial goal planner multiple goals dashboard",
    icon: "📊",
  },
  {
    slug: "goal-based-topup-sip",
    name: "Goal-Based Top-Up SIP",
    desc: "A rising SIP tuned to a specific financial milestone and deadline.",
    cat: "goals",
    keywords: "goal based topup step up sip timeline",
    icon: "🧭",
  },
  {
    slug: "swp-calculator",
    name: "SWP Calculator",
    desc: "How long a corpus lasts at your chosen monthly withdrawal rate.",
    cat: "retire",
    keywords: "swp systematic withdrawal plan income monthly pension",
    icon: "💵",
  },
  {
    slug: "swp-with-increasing-payout",
    name: "SWP with Rising Payout",
    desc: "Withdrawals that grow each year to keep pace with rising prices.",
    cat: "retire",
    keywords: "swp increasing payout inflation adjusted withdrawal",
    icon: "⚖️",
  },
  {
    slug: "nps-calculator",
    name: "NPS Calculator",
    desc: "Maturity value and annuity split for your NPS contributions.",
    cat: "retire",
    keywords: "nps national pension scheme maturity annuity tier 1",
    icon: "🛡️",
  },
  {
    slug: "child-education-planner",
    name: "Child Education Planner",
    desc: "Tomorrow's college fee bill, and what you need to invest for it today.",
    cat: "goals",
    keywords: "child education planner college fees tuition university abroad",
    icon: "🎓",
  },
  {
    slug: "networth-calculator",
    name: "Net Worth Calculator",
    desc: "Assets minus liabilities — your genuine financial position.",
    cat: "goals",
    keywords: "networth net worth assets liabilities balance sheet",
    icon: "📑",
  },
  {
    slug: "home-loan-emi-calculator",
    name: "Home Loan EMI",
    desc: "Monthly EMI, total interest and the full amortisation schedule.",
    cat: "loans",
    keywords: "home loan emi housing interest tenure amortisation bank",
    icon: "🏠",
  },
  {
    slug: "personal-loan-emi-calculator",
    name: "Personal Loan EMI",
    desc: "EMI and total borrowing cost on an unsecured personal loan.",
    cat: "loans",
    keywords: "personal loan emi repayment interest",
    icon: "👤",
  },
  {
    slug: "car-loan-emi-calculator",
    name: "Car Loan EMI",
    desc: "Equated monthly instalments on a new or used vehicle loan.",
    cat: "loans",
    keywords: "car loan emi vehicle auto automobile",
    icon: "🚗",
  },
  {
    slug: "education-loan-emi-calculator",
    name: "Education Loan EMI",
    desc: "Repayment schedule on a study loan, moratorium period included.",
    cat: "loans",
    keywords: "education loan emi student study abroad",
    icon: "🏫",
  },
  {
    slug: "future-value-inflation-calculator",
    name: "Inflation Impact",
    desc: "What today's household expense will cost you decades from now.",
    cat: "inflation",
    keywords: "future value inflation cost of living purchasing power erosion",
    icon: "🔥",
  },
  {
    slug: "cost-inflation-index",
    name: "Cost Inflation Index (CII)",
    desc: "Official government CII table for indexing long-term capital gains.",
    cat: "inflation",
    keywords: "cost inflation index cii capital gains indexation tax it department",
    icon: "📜",
  },
];

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "invest", label: "Invest & grow" },
  { id: "goals", label: "Plan goals" },
  { id: "retire", label: "Retire & withdraw" },
  { id: "loans", label: "Loans" },
  { id: "inflation", label: "Inflation & tax" },
] as const;

export default function CalculatorsHub() {
  const { openGetStarted } = useOutletContext<CalculatorsContext>();
  const [selectedCat, setSelectedCat] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredCalculators = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return CALCULATORS.filter((item) => {
      const matchesCat = selectedCat === "all" || item.cat === selectedCat;
      const haystack = `${item.name} ${item.desc} ${item.keywords}`.toLowerCase();
      const matchesQuery = !q || haystack.includes(q);
      return matchesCat && matchesQuery;
    });
  }, [selectedCat, searchQuery]);

  return (
    <div className="font-[var(--fs)] bg-[#F8FAFE] text-[#111827] antialiased min-h-screen">
      {/* ── HERO SECTION ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#091540] via-[#0D1E52] to-[#1A3B9F] py-16 sm:py-24 text-white text-center px-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[580px] bg-[radial-gradient(circle,rgba(141,198,63,0.18)_0%,transparent_65%)] filter blur-3xl pointer-events-none" />
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8DC63F]/15 border border-[#8DC63F]/35 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" />
            <span className="text-[11px] font-extrabold uppercase tracking-[.18em] text-[#8DC63F]">
              Financial Tools &amp; Calculators
            </span>
          </div>

          <h1 className="font-[var(--fd)] text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight mb-4">
            Calculators for every <br />
            <span className="text-[#8DC63F]">money decision</span>
          </h1>

          <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed max-w-2xl mx-auto">
            Twenty calculators built on the same mathematics our advisors use in client reviews — SIPs, withdrawals, retirement corpus, loan EMIs, and inflation. Run the numbers yourself, then talk to us about what they mean.
          </p>
        </div>
      </section>

      {/* ── CONTROLS: SEARCH & CATEGORY CHIPS ── */}
      <section className="py-8 bg-white border-b border-[rgba(26,59,159,0.08)] sticky top-0 z-20 shadow-sm">
        <div className="max-w-[1240px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
              🔍
            </span>
            <input
              type="search"
              placeholder="Search calculators (SIP, EMI, retirement…)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAFE] border border-gray-200 rounded-xl text-xs sm:text-sm text-[#091540] focus:bg-white focus:border-[#1A3B9F] focus:outline-none transition-colors"
            />
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-2 overflow-x-auto w-full md:w-auto justify-start md:justify-end no-scrollbar">
            {CATEGORIES.map((c) => {
              const active = selectedCat === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedCat(c.id)}
                  className={`text-xs font-bold px-4 py-2 rounded-full border transition-all whitespace-nowrap ${
                    active
                      ? "bg-[#1A3B9F] text-white border-[#1A3B9F] shadow-sm"
                      : "bg-white text-gray-600 border-gray-200 hover:border-[#1A3B9F] hover:text-[#1A3B9F]"
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CALCULATORS GRID ── */}
      <section className="py-12 sm:py-16 max-w-[1240px] mx-auto px-6">
        <div className="flex justify-between items-center mb-6">
          <span className="text-xs text-gray-500 font-semibold">
            Showing <b className="text-[#091540] font-bold">{filteredCalculators.length}</b> of 20 calculators
          </span>
          {(searchQuery || selectedCat !== "all") && (
            <button
              onClick={() => {
                setSelectedCat("all");
                setSearchQuery("");
              }}
              className="text-xs font-bold text-[#1A3B9F] hover:underline"
            >
              Reset filters
            </button>
          )}
        </div>

        {filteredCalculators.length === 0 ? (
          <div className="p-16 text-center bg-white border border-dashed border-gray-300 rounded-3xl">
            <span className="text-4xl block mb-3">🔍</span>
            <h3 className="font-[var(--fd)] text-xl font-bold text-[#091540] mb-1">
              No calculator matches that search
            </h3>
            <p className="text-sm text-gray-500 font-light mb-6">
              Try searching for "SIP", "EMI", "retirement" or clear your filter.
            </p>
            <button
              onClick={() => {
                setSelectedCat("all");
                setSearchQuery("");
              }}
              className="bg-[#1A3B9F] text-white font-bold text-xs px-6 py-2.5 rounded-full"
            >
              Show all calculators
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 auto-rows-[220px]">
            {filteredCalculators.map((calc) => {
              // Large 2x2 Feature Tile
              if (calc.featured === "large") {
                return (
                  <Link
                    key={calc.slug}
                    to={`/calculators/${calc.slug}`}
                    className="sm:col-span-2 sm:row-span-2 rounded-3xl p-8 bg-gradient-to-br from-[#091540] via-[#0D1E52] to-[#1A3B9F] text-white flex flex-col justify-between shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all group relative overflow-hidden"
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#8DC63F] bg-[#8DC63F]/15 border border-[#8DC63F]/30 px-3 py-1 rounded-full">
                        {calc.tag}
                      </span>
                      <span className="text-4xl opacity-80 group-hover:scale-110 transition-transform">
                        {calc.icon}
                      </span>
                    </div>

                    <div className="mt-auto">
                      <h3 className="font-[var(--fd)] text-3xl font-extrabold tracking-tight text-white mb-3">
                        {calc.name}
                      </h3>
                      <p className="text-sm text-white/75 font-light leading-relaxed mb-6 max-w-md">
                        {calc.desc}
                      </p>
                      <span className="inline-flex items-center gap-2 bg-[#8DC63F] text-[#091540] font-extrabold text-xs px-5 py-2.5 rounded-full group-hover:bg-[#9ED64A] transition-colors">
                        Open calculator →
                      </span>
                    </div>
                  </Link>
                );
              }

              // Wide 2x1 Feature Tile
              if (calc.featured === "wide") {
                return (
                  <Link
                    key={calc.slug}
                    to={`/calculators/${calc.slug}`}
                    className="sm:col-span-2 rounded-3xl p-6 bg-gradient-to-br from-[#091540] to-[#1A3B9F] text-white flex flex-col justify-between shadow-md hover:shadow-xl hover:-translate-y-1 transition-all group"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#8DC63F] bg-[#8DC63F]/15 px-3 py-1 rounded-full">
                        {calc.tag}
                      </span>
                      <span className="text-2xl">{calc.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-[var(--fd)] text-2xl font-bold text-white mb-1">
                        {calc.name}
                      </h3>
                      <p className="text-xs text-white/75 font-light leading-relaxed mb-3">
                        {calc.desc}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-[#8DC63F] inline-flex items-center gap-1 group-hover:underline">
                      Open calculator →
                    </span>
                  </Link>
                );
              }

              // Standard Tile
              return (
                <Link
                  key={calc.slug}
                  to={`/calculators/${calc.slug}`}
                  className="bg-white border border-[rgba(26,59,159,0.12)] rounded-3xl p-6 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group"
                >
                  <div className="text-2xl mb-2">{calc.icon}</div>
                  <div>
                    <h3 className="font-[var(--fd)] text-lg font-bold text-[#091540] mb-1 group-hover:text-[#1A3B9F] transition-colors">
                      {calc.name}
                    </h3>
                    <p className="text-xs text-[#4B5563] font-light leading-relaxed line-clamp-2">
                      {calc.desc}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-[#1A3B9F] inline-flex items-center gap-1 group-hover:gap-2 transition-all mt-3">
                    Open →
                  </span>
                </Link>
              );
            })}

            {/* Promo Card: Financial Fitness Check */}
            <Link
              to="/fw/quiz"
              className="bg-gradient-to-br from-[#EFF8E2] to-[#E2F0CF] border border-[#8DC63F]/40 rounded-3xl p-6 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group"
            >
              <div className="text-2xl">💡</div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#6AA32A] block mb-1">
                  Not sure where to start?
                </span>
                <h3 className="font-[var(--fd)] text-base font-bold text-[#091540] mb-1">
                  Financial Fitness Check
                </h3>
                <p className="text-xs text-[#4B5563] font-light leading-relaxed">
                  Take the 2-minute quiz and we'll direct you to the exact right tool.
                </p>
              </div>
              <span className="text-xs font-extrabold text-[#1A4A2A] inline-flex items-center gap-1 group-hover:underline mt-2">
                Start the check →
              </span>
            </Link>
          </div>
        )}

        {/* Advisory Consultation Strip */}
        <div className="mt-12 bg-white border border-[rgba(26,59,159,0.12)] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div>
            <h3 className="font-[var(--fd)] text-xl font-bold text-[#091540] mb-1">
              Numbers are the easy part.
            </h3>
            <p className="text-sm text-[#4B5563] font-light">
              The hard part is deciding which fund, which cover, and in what order. Our team will walk you through it with no sales obligations.
            </p>
          </div>
          <button
            type="button"
            onClick={openGetStarted}
            className="inline-flex items-center gap-2 bg-[#8DC63F] hover:bg-[#9ED64A] text-[#091540] font-extrabold text-sm px-7 py-3 rounded-full transition-all shadow-md shrink-0"
          >
            Talk to an advisor →
          </button>
        </div>

        <p className="mt-8 text-xs text-gray-400 text-center font-light leading-relaxed">
          These calculators are illustrative tools. Results assume a constant rate of return and do not account for taxes, exit loads or expense ratios unless stated. Mutual fund investments are subject to market risks; read all scheme related documents carefully. Anmol Share Broking Pvt Ltd · ARN: 114893.
        </p>
      </section>
    </div>
  );
}