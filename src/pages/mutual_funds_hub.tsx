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
    "All",
    ...CATEGORY_ORDER.filter((category) => presentCategories.includes(category)),
    ...presentCategories.filter((category, index, all) => !CATEGORY_ORDER.includes(category) && all.indexOf(category) === index),
  ];

  const filteredSchemes = schemes.filter((scheme) => {
    const matchesCat = selectedCategory === "All" || scheme.category === selectedCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch = scheme.name.toLowerCase().includes(query) || scheme.fundHouse.toLowerCase().includes(query);
    return matchesCat && matchesSearch;
  });

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
      <div className="max-w-[1200px] mx-auto space-y-10">
        
        {/* Top Header */}
        <div className="text-center max-w-[750px] mx-auto space-y-3">
          <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.14em] text-[#6AA32A] bg-[#EFF8E2] px-3.5 py-1.5 rounded-full">
            AMFI Registered Distributor (ARN: 114893)
          </span>
          <h1 className="font-[var(--fd)] text-3xl sm:text-5xl font-bold text-[#091540]">
            Explore Mutual Fund Schemes
          </h1>
          <p className="text-sm text-[#6B7280] leading-relaxed">
            Discover goal-mapped direct mutual fund schemes handpicked by expert wealth advisors. Invest systematically with zero hidden commissions.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#EEF2FB] border border-[#C5D3F2] p-4 rounded-[20px]">
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <label className="flex items-center gap-2 text-xs font-bold text-[#1A3B9F]">
              Month
              <select
                value={month}
                onChange={(event) => setMonth(event.target.value)}
                disabled={months.length === 0}
                className="h-11 min-w-[140px] rounded-[10px] border border-[#E3E8F4] bg-white px-3 text-xs font-semibold text-[#1A3B9F] outline-0 focus:border-[#1A3B9F]"
              >
                {months.length === 0 && <option value="">Loading…</option>}
                {months.map((name) => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
            </label>
            <input
              type="text"
              placeholder="Search by fund name or fund house..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-[320px] bg-white border border-[#E3E8F4] rounded-[10px] px-4 h-11 text-xs font-semibold text-[#1A3B9F] outline-0 focus:border-[#1A3B9F]"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`py-2 px-4 rounded-[8px] text-xs font-bold transition-all whitespace-nowrap cursor-pointer border ${
                  selectedCategory === cat
                    ? 'bg-[#1A3B9F] text-white border-[#1A3B9F] shadow-sm'
                    : 'bg-white text-[#374151] border-[#E3E8F4] hover:bg-[#EEF2FB]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
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
          <p className="text-sm text-[#6B7280]">No schemes match this search.</p>
        )}

        {/* Schemes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchemes.map((scheme) => (
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

                <p className="text-xs text-[#6B7280] leading-relaxed line-clamp-2">
                  {scheme.description}
                </p>
              </div>

              {/* Fund Metrics Box */}
              <div className="bg-[#F8FAFE] border border-[#E3E8F4] rounded-[16px] p-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div>
                  <div className="text-[10px] text-[#6B7280] font-semibold">1Yr Return</div>
                  <div className="text-xs font-extrabold text-[#6AA32A] mt-0.5">{scheme.return1Yr}</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#6B7280] font-semibold">3Yr Return</div>
                  <div className="text-xs font-extrabold text-[#1A3B9F] mt-0.5">{scheme.return3Yr}</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#6B7280] font-semibold">5Yr Return</div>
                  <div className="text-xs font-extrabold text-[#1A3B9F] mt-0.5">{scheme.return5Yr}</div>
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
                  className="h-10 px-5 rounded-[8px] bg-[#1A3B9F] text-white font-extrabold text-xs hover:bg-[#132d7c] transition-all cursor-pointer shadow-sm border-0"
                >
                  Invest SIP →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Instant SIP Investment Modal */}
        {investModalScheme && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
            <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-[500px] overflow-hidden p-6 sm:p-8 border border-[#E3E8F4] space-y-6">
              
              <div className="flex justify-between items-center">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#6AA32A] bg-[#EFF8E2] px-3 py-1 rounded-full">
                  Quick SIP Setup
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
                  <p className="text-xs text-[#6B7280]">Our wealth desk will reach out to complete your BSE Star MF mandate setup.</p>
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
                    <b>Note:</b> By initiating this SIP, you agree to AMFI guidelines and mandate verification through BSE Star MF. Zero distribution commissions.
                  </div>

                  <button
                    type="submit"
                    className="w-full h-12 rounded-[8px] bg-[#1A3B9F] text-white font-extrabold text-sm hover:bg-[#132d7c] transition-all cursor-pointer shadow-sm border-0"
                  >
                    Confirm & Start SIP (₹{sipAmount.toLocaleString('en-IN')} / mo) →
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