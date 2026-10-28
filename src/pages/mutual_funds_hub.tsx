import React, { useEffect, useState } from "react";
import AdvisorBookingModal from "../components/AdvisorBookingModal";

interface MutualFundScheme {
  id: string;
  name: string;
  category: string;
  risk: string;
  aum: string;
  return1Yr: string;
  return3Yr: string;
  return5Yr: string;
  minSip?: number;
  fundHouse: string;
  description: string;
}

const SHEET_ID = "1OYTrtDxFN755cQ2qLzvgZ77a97JnG97atWOISbdVamg";
const CATEGORY_ORDER = ["Equity - Flexi Cap", "Equity - Mid Cap", "Equity - Small Cap", "ELSS Tax Saver", "Debt & Arbitrage", "Hybrid / Balanced"];

type AssetClass = "equity" | "debt" | "hybrid" | "solution";

const ASSET_TABS: { id: AssetClass; label: string }[] = [
  { id: "equity", label: "Equity Funds" },
  { id: "debt", label: "Debt Funds" },
  { id: "hybrid", label: "Hybrid Funds" },
  { id: "solution", label: "Solution Oriented" },
];

const ADVANTAGES = [
  { title: "Professionally Managed", desc: "Your money is managed by professional fund managers with years of research and investing experience." },
  { title: "Superior Liquidity", desc: "Mutual Funds offer superior liquidity compared to traditional instruments as you can buy and redeem anytime." },
  { title: "Inflation-Beating Returns", desc: "Historically, mutual fund returns have outperformed traditional options like Bank FDs, RDs, and PPF over long horizons." },
  { title: "Affordability (SIP from ₹500)", desc: "Start your investments with as low as ₹500/month. You do not need large sums of capital to begin wealth creation." },
  { title: "Instant Diversification", desc: "As mutual funds invest in a basket of securities, you own a diversified portfolio instantly, lowering single-stock risk." },
  { title: "Strictly Regulated by SEBI", desc: "All mutual fund schemes are tightly regulated by SEBI, ensuring complete transparency and investor protection." },
];

const INVESTMENT_MODES = [
  { title: "Systematic Investment Plan (SIP)", desc: "Invest fixed amounts monthly (e.g. ₹1,000+) using rupee cost averaging to buy more units when markets dip." },
  { title: "Lump Sum", desc: "Commit a larger capital amount at once, offering superior growth opportunities during periods of upward market momentum." },
  { title: "Systematic Transfer Plan (STP)", desc: "Systematically move money from a debt fund to an equity fund at set intervals for disciplined equity deployment." },
  { title: "Systematic Withdrawal Plan (SWP)", desc: "Withdraw a fixed amount or percentage periodically from your corpus while allowing the rest to continue growing." },
];

const GOALS_DATA = [
  { title: "Own Property", desc: "Save up for a down payment on home loan. Choose a fund based on your investment horizon.", tag: "LONG TERM PLAN" },
  { title: "Child Education", desc: "Save up for high education costs. Choose solution-oriented funds for dedicated investments through SIPs or lumpsum.", tag: "LONG TERM PLAN" },
  { title: "Emergency Fund", desc: "Create an emergency fund for unforeseen contingencies. Choose liquid or short-term debt funds for instant liquidity and capital protection.", tag: "LIQUIDITY PLAN" },
  { title: "Early Retirement", desc: "Plan for early retirement with Mutual Funds. Grow your corpus with compounding returns and appropriate risk allocation.", tag: "RETIREMENT PLAN" },
  { title: "Dream Vacation", desc: "Create a travel corpus for your dream vacation. Save affordably through SIPs with attractive returns.", tag: "SHORT TERM PLAN" },
  { title: "Major Purchase", desc: "Plan and save ahead for a major purchase with Mutual Funds. Diversify your investments for better returns at reduced risks.", tag: "GROWTH PLAN" },
];

const BEFORE_INVEST_GUIDE = [
  {
    title: "1. Investment Objective & Risk Tolerance",
    desc: "Define your financial goals clearly before choosing funds. Map your timeline for short-term, mid-term, or long-term horizons, and assess your risk appetite to balance high-growth equity with capital-protecting debt.",
  },
  {
    title: "2. Fund Research & Selection",
    desc: "Review past performance across multiple market cycles, analyze portfolio composition, check fund manager track records, and evaluate expense ratios to select schemes that align with your financial blueprint.",
  },
  {
    title: "3. Costs, Fees & Exit Loads",
    desc: "Understand the Total Expense Ratio (TER) which impacts your NAV returns, check for applicable exit loads upon early redemption, and choose regular growth schemes for professional advisory and execution support.",
  },
];

const FAQS = [
  { q: "What is the difference between a Regular Plan and a Direct Plan?", a: "Regular plans are routed through registered distributors like MyAnmol (ARN: 114893), offering you professional advisory, portfolio reviews, and dedicated support. Direct plans are bought straight from the fund house without advisory services." },
  { q: "What is the minimum amount required to start an SIP?", a: "You can start a Systematic Investment Plan (SIP) with as little as ₹500/month, making wealth creation accessible at any budget." },
  { q: "Are mutual fund investments safe?", a: "Mutual funds are subject to market risks, but professional fund management and diversification significantly lower individual stock-picking risks. All funds on our platform are regulated by SEBI." },
];
const MONTH_INDEX = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

function monthSortKey(label: string) {
  const match = label.trim().match(/^([A-Za-z]+)\s+(\d{4})$/);
  if (!match) return Number.MAX_SAFE_INTEGER;
  const month = MONTH_INDEX.findIndex((name) => match[1].toLowerCase().startsWith(name));
  return Number(match[2]) * 12 + (month < 0 ? 0 : month);
}

function parseCsv(text: string) {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    if (quoted) {
      if (char === "\"") {
        if (text[index + 1] === "\"") {
          cell += "\"";
          index += 1;
        } else {
          quoted = false;
        }
      } else {
        cell += char;
      }
    } else if (char === "\"") {
      quoted = true;
    } else if (char === ",") {
      row.push(cell);
      cell = "";
    } else if (char === "\n") {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else if (char !== "\r") {
      cell += char;
    }
  }
  if (cell.length > 0 || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }
  return rows.filter((entry) => entry.some((value) => value.trim()));
}

function cleanCell(value: string | undefined) {
  return (value ?? "").trim().replace(/^'+|'+$/g, "");
}

function parseMinSip(value: string | undefined) {
  if (!value || !value.trim()) return undefined;
  const amount = Number(value.replace(/[^\d.]/g, ""));
  return Number.isFinite(amount) && amount > 0 ? amount : undefined;
}

async function loadMonthNames() {
  const response = await fetch(`https://docs.google.com/spreadsheets/d/${SHEET_ID}/htmlview`, { cache: "no-store" });
  if (!response.ok) throw new Error("sheet list failed");
  const html = await response.text();
  const names: string[] = [];
  const pattern = /items\.push\(\{name:\s*"((?:\\.|[^"\\])*)"/g;
  let match = pattern.exec(html);
  while (match) {
    names.push(JSON.parse(`"${match[1]}"`));
    match = pattern.exec(html);
  }
  if (names.length === 0) throw new Error("no months");
  return names.sort((left, right) => monthSortKey(right) - monthSortKey(left));
}

async function loadSchemes(month: string) {
  const response = await fetch(
    `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(month)}`,
    { cache: "no-store" },
  );
  if (!response.ok) throw new Error("sheet rows failed");
  const rows = parseCsv(await response.text());
  const [header, ...body] = rows;
  if (!header) return [];
  const columns = header.map((name) => name.trim());
  return body.flatMap((row, index) => {
    const record = Object.fromEntries(columns.map((column, columnIndex) => [column, row[columnIndex] ?? ""]));
    const name = cleanCell(record.name);
    if (!name) return [];
    return [{
      id: cleanCell(record.id) || `${month}-${index}`,
      name,
      category: cleanCell(record.category),
      risk: cleanCell(record.risk),
      aum: cleanCell(record.aum),
      return1Yr: cleanCell(record.return1Yr),
      return3Yr: cleanCell(record.return3Yr),
      return5Yr: cleanCell(record.return5Yr),
      minSip: parseMinSip(record.minSip),
      fundHouse: cleanCell(record.fundHouse),
      description: cleanCell(record.description),
    }];
  });
}

export default function MutualFundsHub() {
  const [months, setMonths] = useState<string[]>([]);
  const [month, setMonth] = useState("");
  const [schemes, setSchemes] = useState<MutualFundScheme[]>([]);
  const [listStatus, setListStatus] = useState<"loading" | "ready" | "error">("loading");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [investModalScheme, setInvestModalScheme] = useState<MutualFundScheme | null>(null);
  const [sipAmount, setSipAmount] = useState<number>(5000);
  const [successMsg, setSuccessMsg] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeAssetTab, setActiveAssetTab] = useState<AssetClass>("equity");
  const [activeGoalTab, setActiveGoalTab] = useState(0);
  const [openBeforeInvestAccordion, setOpenBeforeInvestAccordion] = useState<number | null>(0);

  useEffect(() => {
    let ignore = false;
    loadMonthNames()
      .then((names) => {
        if (ignore) return;
        setMonths(names);
        setMonth(names[0] ?? "");
      })
      .catch(() => {
        if (!ignore) setListStatus("error");
      });
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    if (!month) return;
    let ignore = false;
    setListStatus("loading");
    setSelectedCategory("All");
    loadSchemes(month)
      .then((rows) => {
        if (ignore) return;
        setSchemes(rows);
        setListStatus("ready");
      })
      .catch(() => {
        if (ignore) return;
        setSchemes([]);
        setListStatus("error");
      });
    return () => {
      ignore = true;
    };
  }, [month]);

  const presentCategories = schemes.map((scheme) => scheme.category).filter(Boolean);
  const categories = [
    ...CATEGORY_ORDER.filter((category) => category !== "Hybrid / Balanced" || presentCategories.includes(category)),
    ...presentCategories.filter((category, index, all) => !CATEGORY_ORDER.includes(category) && all.indexOf(category) === index),
  ];
  const categoryChips = ["All", ...categories];

  const filteredSchemes = schemes.filter((scheme) => {
    const matchesCat = selectedCategory === "All" || scheme.category === selectedCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch = scheme.name.toLowerCase().includes(query) || scheme.fundHouse.toLowerCase().includes(query);
    return matchesCat && matchesSearch;
  });

  const showingFeatured = searchQuery.trim() === "" && selectedCategory === "All";
  const displayedSchemes = showingFeatured ? filteredSchemes.slice(0, 6) : filteredSchemes;

  const handleStartSip = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
      setInvestModalScheme(null);
    }, 2500);
  };

  return (
    <div className="font-[var(--fs)] bg-white text-[#111827] antialiased min-h-screen py-12 px-5 sm:px-8">
      <div className="max-w-[1200px] mx-auto space-y-20">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-gradient-to-br from-[#EEF2FB] to-white rounded-[32px] p-8 sm:p-12 border border-[#1A3B9F]/15 shadow-sm">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.14em] text-[#8DC63F] bg-[#091540] px-4 py-2 rounded-full">
              AMFI Registered Distributor (ARN: 114893)
            </span>
            <h1 className="font-[var(--fd)] text-3xl sm:text-5xl font-extrabold text-[#091540] tracking-tight leading-tight">
              Invest in Mutual Funds Online with Expert Advisory
            </h1>
            <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed font-light">
              Mutual funds help you grow your wealth and achieve your financial goals by offering the potential to generate inflation-beating returns over the long term through disciplined <b>Regular Growth Schemes</b>.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="h-12 px-8 rounded-xl bg-[#1A3B9F] text-white font-extrabold text-xs hover:bg-[#132d7c] transition-all flex items-center gap-2 shadow-md cursor-pointer border-0"
              >
                Explore Mutual Funds →
              </button>
            </div>
          </div>

          <div className="bg-[#091540] rounded-[24px] p-6 text-white shadow-xl space-y-6">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <span className="text-xs text-white/60">Portfolio Overview</span>
              <span className="text-xs font-bold text-[#8DC63F] bg-[#8DC63F]/20 px-3 py-1 rounded-full">Active Growth</span>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-white/70">Total Portfolio Value</div>
              <div className="text-3xl font-extrabold">₹ 92,88 L</div>
              <div className="text-xs text-[#8DC63F] font-bold">↑ 14.07% Overall Returns (CAGR)</div>
            </div>
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10 text-center">
              <div className="bg-white/5 p-3 rounded-xl">
                <div className="text-[10px] text-white/60">Goals</div>
                <div className="text-sm font-bold mt-1">₹ 20,04,217</div>
              </div>
              <div className="bg-white/5 p-3 rounded-xl">
                <div className="text-[10px] text-white/60">Ultimate SIP</div>
                <div className="text-sm font-bold mt-1">₹ 1,34,228</div>
              </div>
              <div className="bg-white/5 p-3 rounded-xl">
                <div className="text-[10px] text-white/60">Monthly SIP</div>
                <div className="text-sm font-bold mt-1">₹ 50,000</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#EEF2FB] border border-[#1A3B9F]/20 rounded-[24px] p-6 sm:p-8 flex items-center justify-between flex-wrap gap-6">
          <div className="space-y-2 max-w-[700px]">
            <h2 className="font-[var(--fd)] text-lg font-bold text-[#091540]">Why Choose Regular Growth Plans with MyAnmol?</h2>
            <p className="text-xs sm:text-sm text-[#374151] leading-relaxed">
              Unlike execution-only platforms, regular plans enable us to provide you with continuous professional guidance, annual rebalancing, tax advisory, and priority support from AMFI-certified advisors.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="h-12 px-6 rounded-xl bg-[#1A3B9F] text-white font-extrabold text-xs hover:bg-[#132d7c] transition-all flex items-center gap-2 shadow-md cursor-pointer border-0"
          >
            Speak with an Advisor →
          </button>
        </div>

        <div className="space-y-8">
          <div className="text-center max-w-[700px] mx-auto space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-[.14em] text-[#6AA32A]">Core Fundamentals</span>
            <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#091540]">
              What Are Mutual Funds &amp; Why Invest?
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7280]">
              It is an investment vehicle where multiple investors pool funds. Professional fund managers invest across equity, debt, and gold to generate returns.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ADVANTAGES.map((item) => (
              <div key={item.title} className="bg-[#F8FAFE] border border-[#E3E8F4] rounded-[20px] p-6 space-y-3 shadow-xs">
                <div className="w-8 h-8 rounded-full bg-[#1A3B9F]/10 text-[#1A3B9F] flex items-center justify-center font-bold text-sm">✓</div>
                <h3 className="font-[var(--fd)] text-base font-bold text-[#091540]">{item.title}</h3>
                <p className="text-xs text-[#6B7280] leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="text-center max-w-[700px] mx-auto space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-[.14em] text-[#1A3B9F]">Investment Modes</span>
            <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#091540]">
              Methods of Mutual Fund Investments
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {INVESTMENT_MODES.map((mode, index) => (
              <div key={mode.title} className="bg-white border border-[#E3E8F4] rounded-[20px] p-6 space-y-3 shadow-xs">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#1A3B9F] bg-[#EEF2FB] px-2.5 py-1 rounded-full">
                  Mode 0{index + 1}
                </span>
                <h3 className="font-[var(--fd)] text-base font-bold text-[#091540]">{mode.title}</h3>
                <p className="text-xs text-[#6B7280] leading-relaxed font-light">{mode.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="text-center max-w-[700px] mx-auto space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-[.14em] text-[#6AA32A]">Categories</span>
            <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#091540]">
              Types of Mutual Funds Based on Asset Class
            </h2>
          </div>
          <div className="flex justify-center border-b border-[#E3E8F4] overflow-x-auto gap-2">
            {ASSET_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveAssetTab(tab.id)}
                className={`py-3.5 px-6 text-sm font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer bg-transparent ${
                  activeAssetTab === tab.id
                    ? "border-[#1A3B9F] text-[#1A3B9F] bg-[#EEF2FB]/60 rounded-t-[8px]"
                    : "border-transparent text-[#6B7280] hover:text-[#111827]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="bg-[#F8FAFE] border border-[#E3E8F4] rounded-[24px] p-6 sm:p-8 text-xs sm:text-sm text-[#374151]">
            {activeAssetTab === "equity" && (
              <div className="space-y-4">
                <div className="font-bold text-sm text-[#091540]">Equity Funds — Invest primarily in company stocks for long-term growth.</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-[#E3E8F4]"><b>Large-Cap Funds:</b> Invests at least 80% in top 100 companies for stability.</div>
                  <div className="bg-white p-4 rounded-xl border border-[#E3E8F4]"><b>Mid-Cap Funds:</b> Invests at least 65% in 101st to 250th ranked companies.</div>
                  <div className="bg-white p-4 rounded-xl border border-[#E3E8F4]"><b>Small-Cap Funds:</b> High-growth potential funds for 251st and above companies.</div>
                  <div className="bg-white p-4 rounded-xl border border-[#E3E8F4]"><b>ELSS Tax Saver:</b> Save up to ₹1.5 Lakhs under 80C with 3-year lock-in.</div>
                </div>
              </div>
            )}
            {activeAssetTab === "debt" && (
              <div className="space-y-4">
                <div className="font-bold text-sm text-[#091540]">Debt Funds — Generate stable returns by lending to corporates and government securities.</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-[#E3E8F4]"><b>Liquid Funds:</b> Invests for up to 91 days with high safety and liquidity.</div>
                  <div className="bg-white p-4 rounded-xl border border-[#E3E8F4]"><b>Corporate Bond Funds:</b> Invests at least 80% in highest-rated corporate bonds.</div>
                  <div className="bg-white p-4 rounded-xl border border-[#E3E8F4]"><b>Money Market Funds:</b> Short-term lending instruments for up to 1 year.</div>
                </div>
              </div>
            )}
            {activeAssetTab === "hybrid" && (
              <div className="space-y-4">
                <div className="font-bold text-sm text-[#091540]">Hybrid Funds — Mix of equity, debt, and gold for balanced asset allocation.</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-[#E3E8F4]"><b>Aggressive Hybrid:</b> 65% to 80% in equities, remainder in debt.</div>
                  <div className="bg-white p-4 rounded-xl border border-[#E3E8F4]"><b>Balanced Advantage:</b> Dynamic equity/debt shifting based on valuation models.</div>
                  <div className="bg-white p-4 rounded-xl border border-[#E3E8F4]"><b>Multi-Asset Allocation:</b> Invests across equity, debt, and gold simultaneously.</div>
                </div>
              </div>
            )}
            {activeAssetTab === "solution" && (
              <div className="space-y-4">
                <div className="font-bold text-sm text-[#091540]">Solution-Oriented Funds — Target specific milestones like children&apos;s education or retirement.</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-[#E3E8F4]"><b>Children&apos;s Fund:</b> Lock-in period until the child attains majority age.</div>
                  <div className="bg-white p-4 rounded-xl border border-[#E3E8F4]"><b>Retirement Fund:</b> Lock-in period until retirement age (5 years or age 60).</div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div id="schemes" className="space-y-4">
          <div className="text-center max-w-[700px] mx-auto space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-[.14em] text-[#1A3B9F]">Live Scheme List</span>
            <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#091540]">Explore Mutual Fund Schemes</h2>
          </div>
        <div className="flex flex-col gap-4 bg-[#F8FAFE] border border-[#E3E8F4] p-5 rounded-[20px]">
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center">
            <label className="flex items-center gap-2 text-xs font-bold text-[#1A3B9F]">
              Month
              <select
                value={month}
                onChange={(event) => setMonth(event.target.value)}
                disabled={months.length === 0}
                className="h-12 min-w-[140px] rounded-[12px] border border-[#E3E8F4] bg-white px-3 text-xs font-semibold text-[#1A3B9F] outline-0 focus:border-[#1A3B9F]"
              >
                {months.length === 0 && <option value="">Loading…</option>}
                {months.map((name) => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
            </label>
            <input
              type="text"
              placeholder="Search by fund name or fund house (e.g. Parag Parikh, HDFC)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-[360px] bg-white border border-[#E3E8F4] rounded-[12px] px-4 h-12 text-xs font-semibold text-[#1A3B9F] outline-0 focus:border-[#1A3B9F]"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto w-full pb-1">
            {categoryChips.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`py-2 px-4 rounded-[10px] text-xs font-bold transition-all whitespace-nowrap cursor-pointer border ${
                  selectedCategory === cat
                    ? "bg-[#1A3B9F] text-white border-[#1A3B9F] shadow-sm"
                    : "bg-white text-[#374151] border-[#E3E8F4] hover:bg-[#EEF2FB]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center gap-3">
            <h2 className="font-[var(--fd)] text-xl font-bold text-[#091540]">
              Featured Regular Growth Schemes ({listStatus === "ready" ? displayedSchemes.length : 0})
            </h2>
            <span className="text-xs text-[#6B7280] text-right">
              {showingFeatured
                ? (filteredSchemes.length > 6
                  ? "Showing top 6 recommended schemes. Use search above for more."
                  : month ? `Schemes for ${month}` : "")
                : "Filtered results"}
            </span>
          </div>

          {listStatus === "loading" && (
            <p className="text-sm text-[#6B7280]">Loading schemes for {month || "the latest month"}…</p>
          )}
          {listStatus === "error" && (
            <p className="text-sm font-semibold text-rose-700">The scheme list could not be loaded from the Google Sheet.</p>
          )}
          {listStatus === "ready" && schemes.length === 0 && (
            <p className="text-sm text-[#6B7280]">No schemes are listed for {month}.</p>
          )}
          {listStatus === "ready" && schemes.length > 0 && filteredSchemes.length === 0 && (
            <p className="text-sm text-[#6B7280]">No schemes match this filter.</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedSchemes.map((scheme) => (
              <div
                key={scheme.id}
                className="bg-white border border-[#E3E8F4] rounded-[24px] p-6 shadow-sm hover:border-[#1A3B9F] hover:shadow-md transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#6AA32A] bg-[#EFF8E2] px-3 py-1 rounded-full">
                      {scheme.category}
                    </span>
                    <span className="text-[10px] font-bold text-[#D97706] bg-[#FFFDF0] border border-[#FFE8A3] px-2.5 py-1 rounded-full">
                      {scheme.risk}
                    </span>
                  </div>

                  <h3 className="font-[var(--fd)] text-lg font-bold text-[#091540] line-clamp-2 mt-2">
                    {scheme.name}
                  </h3>

                  <p className="text-xs text-[#6B7280] leading-relaxed line-clamp-2 font-light">
                    {scheme.description}
                  </p>
                </div>

                <div className="bg-[#F8FAFE] border border-[#E3E8F4] rounded-[16px] p-4 grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-[10px] text-[#6B7280] font-semibold">1Yr Return</div>
                    <div className="text-xs font-extrabold text-[#6AA32A] mt-0.5">{scheme.return1Yr}</div>
                  </div>
                  <div className="border-x border-[#E3E8F4]">
                    <div className="text-[10px] text-[#6B7280] font-semibold">3Yr Return</div>
                    <div className="text-xs font-extrabold text-[#1A3B9F] mt-0.5">{scheme.return3Yr}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#6B7280] font-semibold">AUM</div>
                    <div className="text-xs font-extrabold text-[#091540] mt-0.5">{scheme.aum}</div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E3E8F4] flex justify-between items-center">
                  <div className="text-xs text-[#6B7280]">
                    {scheme.minSip != null
                      ? <>Min. SIP: <b className="text-[#1A3B9F]">₹{scheme.minSip.toLocaleString("en-IN")}</b></>
                      : scheme.fundHouse}
                  </div>
                  <button
                    onClick={() => { setInvestModalScheme(scheme); setSipAmount(scheme.minSip ?? 5000); }}
                    className="h-10 px-5 rounded-xl bg-[#1A3B9F] text-white font-extrabold text-xs hover:bg-[#132d7c] transition-all cursor-pointer shadow-sm border-0"
                  >
                    Invest SIP →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>

        <div className="bg-[#F8FAFE] border border-[#E3E8F4] rounded-[24px] p-8 space-y-6">
          <div className="text-center max-w-[700px] mx-auto space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-[.14em] text-[#1A3B9F]">Investor Checklist</span>
            <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#091540]">
              What To Know Before You Invest In Mutual Funds?
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7280]">
              Essential checkpoints to evaluate your objectives, research funds, and understand costs.
            </p>
          </div>
          <div className="space-y-3 max-w-[900px] mx-auto">
            {BEFORE_INVEST_GUIDE.map((guide, index) => {
              const isOpen = openBeforeInvestAccordion === index;
              return (
                <div key={guide.title} className="bg-white border border-[#E3E8F4] rounded-[16px] overflow-hidden transition-all">
                  <button
                    type="button"
                    onClick={() => setOpenBeforeInvestAccordion(isOpen ? null : index)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-sm text-[#091540] cursor-pointer bg-transparent border-0"
                    aria-expanded={isOpen}
                  >
                    <span>{guide.title}</span>
                    <span className="text-lg text-[#1A3B9F] font-extrabold">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-[#374151] font-light leading-relaxed border-t border-[#E3E8F4] pt-3">
                      {guide.desc}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-[#091540] rounded-[28px] p-8 sm:p-12 text-white space-y-8 shadow-xl">
          <div className="max-w-[700px] space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-[.14em] text-[#8DC63F]">Milestone Planning</span>
            <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold">Invest Now For Your Goals</h2>
            <p className="text-xs sm:text-sm text-white/80 font-light">
              Select your life milestone and explore our tailored regular growth recommendations.
            </p>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {GOALS_DATA.map((goal, index) => (
              <button
                key={goal.title}
                type="button"
                onClick={() => setActiveGoalTab(index)}
                className={`py-3 px-6 rounded-xl font-bold text-xs transition-all whitespace-nowrap cursor-pointer border ${
                  activeGoalTab === index
                    ? "bg-[#8DC63F] text-[#091540] border-[#8DC63F] shadow-md"
                    : "bg-white/5 text-white border-white/15 hover:bg-white/10"
                }`}
              >
                {goal.title}
              </button>
            ))}
          </div>
          <div className="bg-white/5 border border-white/10 rounded-[20px] p-6 sm:p-8 space-y-4">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8DC63F] bg-[#8DC63F]/15 px-3 py-1 rounded-full">
              {GOALS_DATA[activeGoalTab].tag}
            </span>
            <h3 className="font-[var(--fd)] text-2xl font-bold">{GOALS_DATA[activeGoalTab].title}</h3>
            <p className="text-sm text-white/80 leading-relaxed font-light">{GOALS_DATA[activeGoalTab].desc}</p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="h-11 px-6 rounded-xl bg-[#8DC63F] text-[#091540] font-extrabold text-xs hover:bg-[#9ED64A] transition-all cursor-pointer border-0 shadow-md"
              >
                Plan This Goal Now →
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#F8FAFE] border border-[#E3E8F4] rounded-[24px] p-8 space-y-5">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#1A3B9F] bg-[#EEF2FB] px-3 py-1 rounded-full">Onboarding Framework</span>
            <h3 className="font-[var(--fd)] text-xl font-bold text-[#091540]">How Your Investment Journey Works</h3>
            <div className="space-y-4 text-xs sm:text-sm text-[#374151]">
              <div><b>Step 1: Free Discovery &amp; Goal Mapping:</b> We analyze your financial goals, risk appetite, and investment horizon.</div>
              <div><b>Step 2: Tailored Portfolio Design:</b> We curate a personalized mix of Regular Growth Schemes aligned with your life milestones.</div>
              <div><b>Step 3: Easy Execution &amp; SIP Setup:</b> Seamless setup of SIPs or lump-sum investments with complete digital convenience.</div>
              <div><b>Step 4: Continuous Review &amp; Rebalancing:</b> Regular annual portfolio check-ups and strategic rebalancing as markets shift.</div>
            </div>
          </div>
          <div className="bg-[#F8FAFE] border border-[#E3E8F4] rounded-[24px] p-8 space-y-5">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#6AA32A] bg-[#EFF8E2] px-3 py-1 rounded-full">Advisory Transparency</span>
            <h3 className="font-[var(--fd)] text-xl font-bold text-[#091540]">Why Expert Advisory Matters</h3>
            <div className="space-y-4 text-xs sm:text-sm text-[#374151]">
              <div><b>Behavioral Coaching:</b> We help you stay disciplined and avoid panic-selling during market downturns.</div>
              <div><b>Active Portfolio Monitoring:</b> We track fund performance shifts, manager changes, and sector weightings.</div>
              <div><b>Integrated Financial Planning:</b> We integrate mutual funds with tax planning (ELSS) and insurance adequacy.</div>
            </div>
          </div>
        </div>

        <div className="space-y-6 max-w-[900px] mx-auto">
          <div className="text-center space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-[.14em] text-[#6AA32A]">Got Questions?</span>
            <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#091540]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={faq.q} className="bg-[#F8FAFE] border border-[#E3E8F4] rounded-[16px] overflow-hidden transition-all">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-sm text-[#091540] cursor-pointer bg-transparent border-0"
                    aria-expanded={isOpen}
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
        </div>

        <div className="bg-gradient-to-br from-[#091540] via-[#0D1E52] to-[#1A3B9F] rounded-[32px] p-8 sm:p-12 text-white text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(141,198,63,0.15)_0%,transparent_70%)] rounded-full pointer-events-none" />
          <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.14em] text-[#8DC63F] bg-[#8DC63F]/15 px-4 py-1.5 rounded-full border border-[#8DC63F]/30">
            Start Your Mutual Funds Journey Today
          </span>
          <h2 className="font-[var(--fd)] text-2xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Build Your Goal-Mapped Mutual Fund Portfolio?
          </h2>
          <p className="text-xs sm:text-sm text-white/80 max-w-[650px] mx-auto font-light leading-relaxed">
            Connect with our certified wealth advisors at MyAnmol (ARN: 114893). Get personalized regular growth scheme recommendations tailored to your family&apos;s future milestones.
          </p>
          <div className="pt-2 flex justify-center gap-4 flex-wrap">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="h-12 px-8 rounded-xl bg-[#8DC63F] text-[#091540] font-extrabold text-xs hover:bg-[#9ED64A] transition-all flex items-center gap-2 shadow-xl cursor-pointer border-0"
            >
              📞 Call Now / Book Session: +91-9742826665
            </button>
          </div>
        </div>

        <AdvisorBookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        {investModalScheme && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
            <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-[500px] overflow-hidden p-6 sm:p-8 border border-[#E3E8F4] space-y-6">

              <div className="flex justify-between items-center">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#6AA32A] bg-[#EFF8E2] px-3 py-1 rounded-full">
                  Quick SIP Setup (Regular Growth)
                </span>
                <button
                  onClick={() => setInvestModalScheme(null)}
                  className="w-8 h-8 rounded-full bg-[#EEF2FB] text-[#6B7280] hover:text-[#111827] flex items-center justify-center cursor-pointer transition-colors border-0 font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-1">
                <h3 className="font-[var(--fd)] text-xl font-bold text-[#091540]">
                  {investModalScheme.name}
                </h3>
                <p className="text-xs text-[#6B7280]">{investModalScheme.fundHouse}</p>
              </div>

              {successMsg ? (
                <div className="text-center py-8 space-y-3">
                  <div className="w-14 h-14 bg-[#EFF8E2] text-[#6AA32A] rounded-full flex items-center justify-center mx-auto text-2xl font-bold shadow-sm">
                    ✓
                  </div>
                  <h4 className="font-[var(--fd)] text-lg font-bold text-[#091540]">SIP Order Initiated Successfully!</h4>
                  <p className="text-xs text-[#6B7280]">Our wealth desk will reach out to complete your regular growth mandate setup.</p>
                </div>
              ) : (
                <form onSubmit={handleStartSip} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#374151] block">Monthly SIP Amount (₹)</label>
                    <input
                      type="number"
                      min={investModalScheme.minSip ?? 500}
                      step="500"
                      value={sipAmount}
                      onChange={(e) => setSipAmount(Number(e.target.value))}
                      className="w-full bg-[#EEF2FB] border border-[#E3E8F4] rounded-[8px] px-4 h-12 text-base font-extrabold text-[#1A3B9F] outline-0 focus:border-[#1A3B9F]"
                    />
                    {investModalScheme.minSip != null && (
                      <p className="text-[11px] text-[#6B7280]">Minimum SIP amount is ₹{investModalScheme.minSip.toLocaleString("en-IN")}</p>
                    )}
                  </div>

                  <div className="bg-[#FFFDF0] border border-[#FFE8A3] rounded-[12px] p-4 text-xs text-[#856404] leading-relaxed">
                    <b>Note:</b> By initiating this Regular SIP, you unlock dedicated advisor support and annual portfolio reviews.
                  </div>

                  <button
                    type="submit"
                    className="w-full h-12 rounded-[8px] bg-[#1A3B9F] text-white font-extrabold text-sm hover:bg-[#132d7c] transition-all cursor-pointer shadow-sm border-0"
                  >
                    Confirm & Start SIP (₹{sipAmount.toLocaleString("en-IN")} / mo) →
                  </button>
                </form>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
}