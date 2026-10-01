import React, { useState, useMemo } from "react";
import { Link } from "react-router";

interface ArticlePost {
  title: string;
  cat: string;
  catLabel: string;
  date: string;
  readTime: string;
  icon: string;
  gradient: string;
  href: string;
  external?: boolean;
}

const ARTICLE_POSTS: ArticlePost[] = [
  {
    title: "A Good Road Map Can Point You in the Right Direction",
    cat: "financial-planning",
    catLabel: "Financial Planning",
    date: "Dec 10, 2025",
    readTime: "4 min read",
    icon: "🗺️",
    gradient: "from-[#534AB7] to-[#0D1E52]",
    href: "https://myanmol-good-road-map.netlify.app/",
    external: true,
  },
  {
    title: "Villa vs Apartment Investment: Which Is Better in India?",
    cat: "investment-academy",
    catLabel: "Investment Academy",
    date: "Jul 20",
    readTime: "3 min read",
    icon: "🏡",
    gradient: "from-[#1A5C30] to-[#0D1E52]",
    href: "https://myanmol-villas-and-apts-investments.netlify.app/",
    external: true,
  },
  {
    title: "FCNR(B) Deposits: The Opportunity NRI's Cannot Afford to Miss",
    cat: "update",
    catLabel: "Update",
    date: "Jun 29",
    readTime: "5 min read",
    icon: "💵",
    gradient: "from-[#1F3A5F] to-[#0D1E52]",
    href: "https://myanmol-fcnrb-deposits.netlify.app/",
    external: true,
  },
  {
    title: "ACCREDITED INVESTORS & ALTERNATIVE INVESTMENT FUNDS (AIF) IN INDIA",
    cat: "investors-education",
    catLabel: "Investor's Education",
    date: "Apr 9",
    readTime: "9 min read",
    icon: "📊",
    gradient: "from-[#993556] to-[#0D1E52]",
    href: "https://myanmol-aifs-accreditedinvestors.netlify.app/",
    external: true,
  },
  {
    title: "The Financial Lies We Tell Ourselves (The Cost We Pay Later)",
    cat: "savings-story",
    catLabel: "Inspiring Savings Story",
    date: "Dec 10, 2025",
    readTime: "4 min read",
    icon: "🎭",
    gradient: "from-[#C1543A] to-[#0D1E52]",
    href: "https://myanmol-financial-lies.netlify.app/",
    external: true,
  },
  {
    title: "Savings Are Not Investments & why confusing the two quietly destroys wealth",
    cat: "savings-story",
    catLabel: "Inspiring Savings Story",
    date: "Dec 10, 2025",
    readTime: "3 min read",
    icon: "💰",
    gradient: "from-[#0F6E56] to-[#0D1E52]",
    href: "https://myanmol-savings-not-investments.netlify.app/",
    external: true,
  },
  {
    title: "Is India Becoming the Most Attractive Emerging Market for Global Investors?",
    cat: "update",
    catLabel: "Update",
    date: "Aug 20",
    readTime: "9 min read",
    icon: "🌏",
    gradient: "from-[#3D6B8C] to-[#0D1E52]",
    href: "https://myanmol-india-the-attractive-market.netlify.app/",
    external: true,
  },
  {
    title: "Save & Invest: Building a Secure Financial Future",
    cat: "wealth-building",
    catLabel: "Wealth Building",
    date: "Sep 25, 2025",
    readTime: "3 min read",
    icon: "🐷",
    gradient: "from-[#C9A55A] to-[#1A3B9F]",
    href: "https://myanmol-save-and-invest.netlify.app/",
    external: true,
  },
  {
    title: "How to Prepare Yourself Financially to Buy Your Dream Home",
    cat: "real-estate",
    catLabel: "Real Estate",
    date: "Dec 10, 2025",
    readTime: "3 min read",
    icon: "🏠",
    gradient: "from-[#1A5C30] to-[#0D1E52]",
    href: "https://myanmol-buy-your-dream-home.netlify.app/",
    external: true,
  },
  {
    title: "Home Loan Issues",
    cat: "loans",
    catLabel: "Loans",
    date: "Sep 25, 2025",
    readTime: "3 min read",
    icon: "🏦",
    gradient: "from-[#1F3A5F] to-[#0D1E52]",
    href: "https://myanmol-home-loan-issues.netlify.app/",
    external: true,
  },
  {
    title: "Be a Smart Investor: Think Wisely Before Buying a House",
    cat: "home-buying",
    catLabel: "Home Buying",
    date: "Sep 25, 2025",
    readTime: "2 min read",
    icon: "🏘️",
    gradient: "from-[#B8631A] to-[#0D1E52]",
    href: "https://myanmol-smart-investor-buying-house.netlify.app/",
    external: true,
  },
  {
    title: "How Frequently Should You Switch a Property Investment?",
    cat: "real-estate",
    catLabel: "Real Estate",
    date: "Sep 25, 2025",
    readTime: "2 min read",
    icon: "🔄",
    gradient: "from-[#1A5C30] to-[#0D1E52]",
    href: "https://myanmol-switch-property.netlify.app/",
    external: true,
  },
  {
    title: "How Do You Choose the Right Mutual Fund?",
    cat: "mutual-funds",
    catLabel: "Mutual Funds",
    date: "Sep 25, 2025",
    readTime: "2 min read",
    icon: "📈",
    gradient: "from-[#0F6E56] to-[#0D1E52]",
    href: "https://myanmol-best-mutual-fund.netlify.app/",
    external: true,
  },
  {
    title: "WAYS TO SAVE YOURSELF FROM IMPULSE SHOPPING",
    cat: "wealth-building",
    catLabel: "Wealth Building",
    date: "Sep 25, 2025",
    readTime: "3 min read",
    icon: "🛍️",
    gradient: "from-[#993556] to-[#0D1E52]",
    href: "https://myanmol-impulse-shopping.netlify.app/",
    external: true,
  },
  {
    title: "How a systematic transfer plan helps you to deal with volatility",
    cat: "mutual-funds",
    catLabel: "Mutual Funds",
    date: "Sep 24, 2025",
    readTime: "2 min read",
    icon: "📉",
    gradient: "from-[#3D6B8C] to-[#0D1E52]",
    href: "https://myanmol-stp-volatility-page.netlify.app/",
    external: true,
  },
  {
    title: "4 Smart Moves to Secure Your Child's Educational Future",
    cat: "goal-planning",
    catLabel: "Goal Planning",
    date: "Sep 24, 2025",
    readTime: "3 min read",
    icon: "🎓",
    gradient: "from-[#534AB7] to-[#0D1E52]",
    href: "https://myanmol-secure-child-ed-future.netlify.app/",
    external: true,
  },
  {
    title: "How Intra-Day Traders Can Increase Wealth – Without Needing a Fortune",
    cat: "trading-investing",
    catLabel: "Trading & Investing",
    date: "Sep 24, 2025",
    readTime: "2 min read",
    icon: "⚡",
    gradient: "from-[#C1543A] to-[#0D1E52]",
    href: "https://myanmol-intraday-trading.netlify.app/",
    external: true,
  },
  {
    title: "Types of Investments",
    cat: "investing",
    catLabel: "Investing",
    date: "Sep 24, 2025",
    readTime: "3 min read",
    icon: "🧩",
    gradient: "from-[#0F6E56] to-[#0D1E52]",
    href: "https://myanmol-types-of-investments.netlify.app/",
    external: true,
  },
  {
    title: "Understanding Volatility in the Stock Market",
    cat: "markets",
    catLabel: "Markets",
    date: "Sep 25, 2025",
    readTime: "2 min read",
    icon: "📊",
    gradient: "from-[#3D6B8C] to-[#0D1E52]",
    href: "https://myanmol-stock-market-volatility.netlify.app/",
    external: true,
  },
  {
    title: "Smart Financial Planning: Building a Secure Future Together",
    cat: "financial-planning",
    catLabel: "Financial Planning",
    date: "Sep 24, 2025",
    readTime: "2 min read",
    icon: "🤝",
    gradient: "from-[#C9A55A] to-[#1A3B9F]",
    href: "https://myanmol-smart-financial-planning.netlify.app/",
    external: true,
  },
  {
    title: "Tips to Help You Repay Your Personal Loan Faster",
    cat: "loans",
    catLabel: "Loans",
    date: "Sep 24, 2025",
    readTime: "2 min read",
    icon: "💳",
    gradient: "from-[#1F3A5F] to-[#0D1E52]",
    href: "https://myanmol-repay-personal-loan.netlify.app/",
    external: true,
  },
  {
    title: "Tips to Choose the Best House in the Best Location",
    cat: "real-estate",
    catLabel: "Real Estate",
    date: "Sep 24, 2025",
    readTime: "2 min read",
    icon: "📍",
    gradient: "from-[#B8631A] to-[#0D1E52]",
    href: "https://myanmol-besthouse-bestlocation.netlify.app/",
    external: true,
  },
  {
    title: "How to Double Your Investment: Smart Strategies for Growth",
    cat: "investing",
    catLabel: "Investing",
    date: "Sep 24, 2025",
    readTime: "2 min read",
    icon: "🚀",
    gradient: "from-[#0F6E56] to-[#0D1E52]",
    href: "https://myanmol-double-your-investments.netlify.app/",
    external: true,
  },
  {
    title: "Buying a Home During Festive Season: A Gateway to Prosperity and Smart Deals",
    cat: "real-estate",
    catLabel: "Real Estate",
    date: "Sep 24, 2025",
    readTime: "2 min read",
    icon: "🪔",
    gradient: "from-[#993556] to-[#0D1E52]",
    href: "https://myanmol-festive-home-season.netlify.app/",
    external: true,
  },
];

const PRIMARY_CATS = [
  { id: "all", label: "All" },
  { id: "savings-story", label: "Inspiring Savings Story" },
  { id: "insurance", label: "Insurance & More" },
  { id: "nps", label: "New Pension Scheme (NPS)" },
  { id: "mutual-funds", label: "Mutual Funds" },
];

const MORE_CATS = [
  { id: "update", label: "Update" },
  { id: "taxation", label: "Taxation" },
  { id: "stocks-trade", label: "Stocks & Trade" },
  { id: "investment-academy", label: "Investment Academy" },
  { id: "newsletter", label: "Newsletter" },
  { id: "investors-education", label: "Investor's Education" },
  { id: "bonds", label: "Bonds" },
  { id: "legal", label: "Legal" },
  { id: "wealth-building", label: "Wealth Building" },
  { id: "real-estate", label: "Real Estate" },
  { id: "financial-planning", label: "Financial Planning" },
  { id: "home-buying", label: "Home Buying" },
  { id: "goal-planning", label: "Goal Planning" },
  { id: "trading-investing", label: "Trading & Investing" },
  { id: "investing", label: "Investing" },
  { id: "markets", label: "Markets" },
  { id: "loans", label: "Loans" },
];

const ALL_CATS = [...PRIMARY_CATS, ...MORE_CATS];

export default function ArticlesInsights() {
  const [activeCat, setActiveCat] = useState<string>("all");

  const filteredArticles = useMemo(() => {
    if (activeCat === "all") return ARTICLE_POSTS;
    return ARTICLE_POSTS.filter((p) => p.cat === activeCat);
  }, [activeCat]);

  const activeCategoryLabel = useMemo(() => {
    if (activeCat === "all") return "all articles";
    const found = ALL_CATS.find((c) => c.id === activeCat);
    return found ? `articles in "${found.label}"` : "articles";
  }, [activeCat]);

  return (
    <div className="font-[var(--fs)] bg-white text-[#111827] antialiased min-h-screen">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#091540] via-[#0D1E52] to-[#1A3B9F] py-16 sm:py-24 text-center text-white px-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[580px] bg-[radial-gradient(circle,rgba(141,198,63,0.18)_0%,transparent_65%)] filter blur-3xl pointer-events-none" />
        <div className="max-w-2xl mx-auto relative z-10">
          <span className="text-[11px] font-extrabold uppercase tracking-[.18em] text-[#8DC63F] block mb-3">
            MyAnmol Articles &amp; Insights
          </span>
          <h1 className="font-[var(--fd)] text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Insights for a <span className="text-[#8DC63F] italic">financially confident life.</span>
          </h1>
          <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed max-w-xl mx-auto">
            Straightforward reads on savings, insurance, investing, and everything in between — pick a topic below.
          </p>
        </div>
      </section>

      {/* CATEGORY FILTER BAR */}
      <div className="sm:sticky sm:top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 py-3.5 px-6 shadow-sm">
        <div className="max-w-[1180px] mx-auto flex flex-wrap items-center gap-2">
          {ALL_CATS.map((cat) => (
            <button
              key={cat.id}
              type="button"
              aria-pressed={activeCat === cat.id}
              onClick={() => setActiveCat(cat.id)}
              className={`text-xs sm:text-sm font-bold px-3 sm:px-4 py-2 rounded-full transition-all whitespace-nowrap cursor-pointer ${
                activeCat === cat.id
                  ? "bg-[#1A3B9F] text-white shadow-sm"
                  : "text-[#4B5563] hover:text-[#1A3B9F] hover:bg-gray-50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* ARTICLES GRID SECTION */}
      <section className="py-12 sm:py-16 max-w-[1180px] mx-auto px-6">
        <div className="text-xs sm:text-sm text-gray-500 font-semibold mb-6">
          Showing {activeCategoryLabel} ({filteredArticles.length})
        </div>

        {filteredArticles.length === 0 ? (
          <div className="text-center py-20 bg-white border border-dashed border-gray-300 rounded-3xl">
            <span className="text-4xl block mb-3">📭</span>
            <h3 className="font-[var(--fd)] text-xl font-bold text-[#091540] mb-1">
              No articles found in this category yet
            </h3>
            <p className="text-sm text-gray-500 font-light mb-6">
              Check back soon for upcoming insights or explore our other topics.
            </p>
            <button
              onClick={() => setActiveCat("all")}
              className="bg-[#1A3B9F] text-white font-bold text-xs px-6 py-2.5 rounded-full"
            >
              Show all articles
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article, idx) => (
              <a
                key={idx}
                href={article.href}
                target={article.external ? "_blank" : "_self"}
                rel={article.external ? "noopener noreferrer" : undefined}
                className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col justify-between"
              >
                <div
                  className={`w-full aspect-[16/10] bg-gradient-to-br ${article.gradient} relative flex items-center justify-center`}
                >
                  <span className="absolute top-3.5 left-3.5 bg-black/40 backdrop-blur-md text-[#DFC07A] text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full">
                    {article.catLabel}
                  </span>
                  <span className="text-5xl group-hover:scale-110 transition-transform">
                    {article.icon}
                  </span>
                </div>

                <div className="p-6 flex flex-col justify-between flex-1">
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                    <span className="w-5 h-5 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-[10px] shrink-0">
                      👤
                    </span>
                    <span>Team MyAnmol · {article.date} · {article.readTime}</span>
                  </div>

                  <h3 className="font-[var(--fd)] text-lg font-bold text-[#111827] group-hover:text-[#1A3B9F] transition-colors leading-snug">
                    {article.title}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}