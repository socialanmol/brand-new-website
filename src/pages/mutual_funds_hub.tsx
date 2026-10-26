import React, { useEffect, useState } from 'react';

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

const ONBOARDING_STEPS = [
  { step: "Step 1", title: "Free Discovery & Goal Mapping", desc: "We analyze your financial goals, risk appetite, and investment horizon (e.g. retirement, child's education, wealth creation)." },
  { step: "Step 2", title: "Tailored Portfolio Design", desc: "We curate a personalized mix of Regular Growth Schemes aligned specifically with your life milestones." },
  { step: "Step 3", title: "Easy Execution & SIP Setup", desc: "Seamless setup of Systematic Investment Plans (SIPs) or lump-sum investments with complete digital convenience." },
  { step: "Step 4", title: "Continuous Review & Rebalancing", desc: "Regular annual portfolio check-ups, tax-loss harvesting guidance, and strategic rebalancing as market conditions shift." },
];

const ADVISORY_POINTS = [
  { title: "Behavioral Coaching", desc: "Studies show that investor behavior dictates returns more than the market. We help you stay disciplined and avoid panic-selling during market downturns." },
  { title: "Active Portfolio Monitoring", desc: "Markets change; your portfolio should too. We track fund performance shifts, manager changes, and sector weightings so you don’t have to." },
  { title: "Integrated Financial Planning", desc: "Beyond just picking funds, we integrate your mutual fund investments with tax planning (ELSS), insurance adequacy, and asset allocation across debt and equity." },
];

const CATEGORY_GUIDE = [
  { title: "Equity - Flexi Cap:", text: "Invests across large, mid, and small-cap companies for balanced growth with built-in diversification." },
  { title: "Equity - Mid & Small Cap:", text: "High-growth potential funds for investors with a higher risk appetite and a long-term horizon (5+ years)." },
  { title: "ELSS Tax Saver:", text: "Save up to ₹1.5 Lakhs in taxes under Section 80C while building wealth with a 3-year lock-in." },
  { title: "Debt & Arbitrage:", text: "Lower-risk options designed for capital preservation, emergency funds, or short-term deployment." },
];

const FAQS = [
  {
    q: "What is the difference between a Regular Plan and a Direct Plan?",
    a: "Regular plans are routed through registered distributors like MyAnmol (ARN: 114893), offering you professional advisory, portfolio reviews, and dedicated support. Direct plans are bought straight from the fund house without advisory services.",
  },
  {
    q: "What is the minimum amount required to start an SIP?",
    a: "You can start a Systematic Investment Plan (SIP) with as little as ₹500/month, making wealth creation accessible at any budget.",
  },
  {
    q: "Are mutual fund investments safe?",
    a: "Mutual funds are subject to market risks, but professional fund management and diversification significantly lower individual stock-picking risks. All funds on our platform are regulated by SEBI.",
  },
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
      <div className="max-w-[1200px] mx-auto space-y-16">

        <div className="text-center max-w-[800px] mx-auto space-y-4">
          <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.14em] text-[#8DC63F] bg-[#EEF2FB] px-4 py-2 rounded-full border border-[#8DC63F]/30">
            AMFI Registered Distributor (ARN: 114893)
          </span>
          <h1 className="font-[var(--fd)] text-3xl sm:text-5xl font-extrabold text-[#091540] tracking-tight">
            Mutual Funds Hub — Regular Growth Schemes
          </h1>
          <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed font-light">
            At MyAnmol, we are proudly focused on <b className="text-[#1A3B9F]">Regular Growth Schemes</b> backed by dedicated advisory, goal-mapping, and ongoing portfolio reviews. Invest systematically with expert handholding at every step.
          </p>
        </div>

        <div className="bg-[#EEF2FB] border border-[#1A3B9F]/20 rounded-[24px] p-6 sm:p-8 flex items-center justify-between flex-wrap gap-6">
          <div className="space-y-2 max-w-[700px]">
            <h2 className="font-[var(--fd)] text-lg font-bold text-[#091540]">Why Choose Regular Growth Plans with MyAnmol?</h2>
            <p className="text-xs sm:text-sm text-[#374151] leading-relaxed">
              Unlike execution-only platforms, regular plans enable us to provide you with continuous professional guidance, annual rebalancing, tax advisory, and priority support from AMFI-certified advisors.
            </p>
          </div>
          <a
            href="tel:+919742826665"
            className="h-12 px-6 rounded-xl bg-[#8DC63F] text-[#091540] font-extrabold text-xs hover:bg-[#9ED64A] transition-all flex items-center gap-2 shadow-md no-underline"
          >
            Speak with an Advisor →
          </a>
        </div>

        <div className="space-y-6">
          <div className="text-center max-w-[700px] mx-auto space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-[.14em] text-[#6AA32A]">Onboarding Process</span>
            <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#091540]">
              How Your Investment Journey Works with MyAnmol
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7280]">
              Demystifying expert handholding through our 4-step transparent advisory framework.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ONBOARDING_STEPS.map((item) => (
              <div key={item.step} className="bg-[#F8FAFE] border border-[#E3E8F4] rounded-[20px] p-6 space-y-3 shadow-xs">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#1A3B9F] bg-[#EEF2FB] px-2.5 py-1 rounded-full">
                  {item.step}
                </span>
                <h3 className="font-[var(--fd)] text-base font-bold text-[#091540]">{item.title}</h3>
                <p className="text-xs text-[#6B7280] leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#091540] rounded-[28px] p-8 sm:p-12 text-white space-y-8 shadow-xl">
          <div className="max-w-[700px] space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-[.14em] text-[#8DC63F]">Advisory Transparency</span>
            <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold">
              Why Expert Advisory Matters in Mutual Funds
            </h2>
            <p className="text-xs sm:text-sm text-white/80 font-light">
              Proactively understanding the unmatched value of professional guidance over standalone DIY platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ADVISORY_POINTS.map((point) => (
              <div key={point.title} className="bg-white/5 border border-white/10 rounded-[20px] p-6 space-y-3">
                <div className="w-8 h-8 rounded-full bg-[#8DC63F]/20 text-[#8DC63F] flex items-center justify-center font-bold text-sm">
                  ✓
                </div>
                <h3 className="font-[var(--fd)] text-lg font-bold">{point.title}</h3>
                <p className="text-xs text-white/80 leading-relaxed font-light">{point.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#EEF2FB]/60 border border-[#1A3B9F]/15 rounded-[20px] p-6 text-xs text-[#374151] space-y-3">
          <div className="font-bold text-[#1A3B9F] uppercase tracking-wider text-sm">Quick Category Guide for Regular Growth Plans:</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CATEGORY_GUIDE.map((item) => (
              <div key={item.title} className="bg-white p-4 rounded-xl border border-[#E3E8F4]">
                <b>{item.title}</b> {item.text}
              </div>
            ))}
          </div>
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

        <div className="space-y-6 max-w-[900px] mx-auto">
          <div className="text-center space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-[.14em] text-[#6AA32A]">Got Questions?</span>
            <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#091540]">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7280]">
              Clear answers to common questions about regular mutual funds and our advisory services.
            </p>
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
            <a
              href="tel:+919742826665"
              className="h-12 px-8 rounded-xl bg-[#8DC63F] text-[#091540] font-extrabold text-xs hover:bg-[#9ED64A] transition-all flex items-center gap-2 shadow-xl no-underline"
            >
              📞 Call Now: +91-9742826665
            </a>
            <a
              href="mailto:mutualfunds@myanmol.com"
              className="h-12 px-8 rounded-xl bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs border border-white/20 transition-all flex items-center gap-2 no-underline"
            >
              ✉️ Email mutualfunds@myanmol.com
            </a>
          </div>
        </div>

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