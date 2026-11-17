import { useEffect, useState } from "react";

interface MarketItem {
  name: string;
  level: string;
  today: string;
  todayNum: number;
  mtd: string;
  y1: string;
  y1Num: number;
}

interface MacroItem {
  indicator: string;
  frequency: string;
  period: string;
  value: string;
  unit: string;
}

interface CommodityItem {
  name: string;
  price: string;
  change: string;
  isPositive: boolean;
}

type WrapTab = "overview" | "sectors" | "macro" | "summary" | "sector_analysis";

const TABS: { id: WrapTab; label: string }[] = [
  { id: "overview", label: "📊 Market Overview & Levels" },
  { id: "sectors", label: "📈 Sector Performance" },
  { id: "macro", label: "🌐 Macro & Commodities" },
  { id: "summary", label: "📝 Daily Summary" },
  { id: "sector_analysis", label: "📑 Sector Analysis" },
];

function colorValue(val: string) {
  const isPos = val.startsWith("+");
  const isNeg = val.startsWith("-");
  return (
    <span style={{ color: isPos ? "#10B981" : isNeg ? "#EF4444" : "inherit", fontWeight: 600 }}>
      {val}
    </span>
  );
}

export default function DailyMarketWrap() {
  const [activeTab, setActiveTab] = useState<WrapTab>("overview");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) +
          " | " +
          now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
      );
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  const indicesLargeCap: MarketItem[] = [
    { name: "Nifty 50", level: "25,144.30", today: "-0.61%", todayNum: -0.61, mtd: "+9.07%", y1: "-2.84%", y1Num: -2.84 },
    { name: "BSE Sensex", level: "81,592.45", today: "-0.39%", todayNum: -0.39, mtd: "+9.58%", y1: "-3.42%", y1Num: -3.42 },
  ];

  const indicesBroad: MarketItem[] = [
    { name: "BSE 500", level: "37,160.37", today: "-0.46%", todayNum: -0.46, mtd: "+8.50%", y1: "-0.52%", y1Num: -0.52 },
    { name: "Nifty 500", level: "23,734.20", today: "-0.55%", todayNum: -0.55, mtd: "+8.40%", y1: "-0.34%", y1Num: -0.34 },
  ];

  const indicesMidSmall: MarketItem[] = [
    { name: "Nifty Next 50", level: "72,874.70", today: "-0.83%", todayNum: -0.83, mtd: "+7.63%", y1: "+4.33%", y1Num: 4.33 },
    { name: "Nifty Midcap 100", level: "61,889.50", today: "-0.24%", todayNum: -0.24, mtd: "+8.01%", y1: "+1.97%", y1Num: 1.97 },
    { name: "Nifty Smallcap 100", level: "19,656.45", today: "-0.26%", todayNum: -0.26, mtd: "+6.46%", y1: "+8.10%", y1Num: 8.10 },
  ];

  const worldMarkets: MarketItem[] = [
    { name: "Dow Jones", level: "52,297.09", today: "-0.36%", todayNum: -0.36, mtd: "+1.02%", y1: "+8.38%", y1Num: 8.38 },
    { name: "S&P 500", level: "7,592.40", today: "-0.35%", todayNum: -0.35, mtd: "+0.16%", y1: "+10.82%", y1Num: 10.82 },
    { name: "Nasdaq", level: "25,366.09", today: "-0.39%", todayNum: -0.39, mtd: "-0.28%", y1: "+8.37%", y1Num: 8.37 },
    { name: "FTSE 100", level: "10,863.09", today: "+0.25%", todayNum: 0.25, mtd: "+1.24%", y1: "+9.60%", y1Num: 9.60 },
    { name: "CAC 40", level: "8,361.36", today: "+0.34%", todayNum: 0.34, mtd: "+4.92%", y1: "+1.46%", y1Num: 1.46 },
    { name: "DAX", level: "26,771.88", today: "+0.41%", todayNum: 0.41, mtd: "+3.69%", y1: "+9.80%", y1Num: 9.80 },
    { name: "Nikkei", level: "61,712.84", today: "+0.74%", todayNum: 0.74, mtd: "-2.49%", y1: "+20.61%", y1Num: 20.61 },
    { name: "Hang Seng", level: "24,008.55", today: "-1.26%", todayNum: -1.26, mtd: "+3.07%", y1: "-11.01%", y1Num: -11.01 },
    { name: "CBOE VIX", level: "18.70", today: "+6.92%", todayNum: 6.92, mtd: "-3.71%", y1: "+6.80%", y1Num: 6.80 },
  ];

  const bestSectors = [
    { name: "IPO", val: 22.4 },
    { name: "TELECOM", val: 19.8 },
    { name: "HEALTHCARE", val: 18.7 },
    { name: "METAL", val: 15.4 },
    { name: "REIT & INVIT", val: 14.9 },
    { name: "SME IPO", val: 12.7 },
    { name: "POWER", val: 7.5 },
    { name: "BANKEX", val: 5.1 },
    { name: "SERVICES", val: 5.1 },
    { name: "INDUSTRIALS", val: 4.9 },
  ];

  const worstSectors = [
    { name: "IT", val: -15.6 },
    { name: "FMCG", val: -13.2 },
    { name: "TECK", val: -9.5 },
    { name: "OIL & GAS", val: -8.8 },
    { name: "ENERGY", val: -6.4 },
    { name: "HOUSING", val: -5.5 },
    { name: "CPSE", val: -4.2 },
    { name: "INFRASTRUCTURE", val: -3.6 },
    { name: "REALTY", val: -1.9 },
    { name: "POWER & ENERGY", val: -1.6 },
  ];

  const bseSectorsList = [
    { name: "IPO", level: "19,535.27", today: "+1.45%", mtd: "+9.42%", y1: "+22.44%" },
    { name: "Telecom", level: "3,761.21", today: "+0.28%", mtd: "+2.36%", y1: "+19.76%" },
    { name: "Healthcare", level: "52,884.38", today: "-0.24%", mtd: "+5.41%", y1: "+18.70%" },
    { name: "Metal", level: "40,457.16", today: "-0.93%", mtd: "+7.13%", y1: "+15.39%" },
    { name: "REIT & InvIT", level: "152.45", today: "-0.41%", mtd: "+1.14%", y1: "+14.88%" },
    { name: "SME IPO", level: "1,17,808.56", today: "+0.12%", mtd: "+4.65%", y1: "+12.65%" },
    { name: "Power", level: "7,211.51", today: "+0.33%", mtd: "+4.94%", y1: "+7.46%" },
    { name: "Bankex", level: "68,809.34", today: "-0.64%", mtd: "+12.04%", y1: "+5.14%" },
    { name: "Services", level: "1,713.62", today: "+0.45%", mtd: "+8.61%", y1: "+5.11%" },
    { name: "Industrials", level: "15,889.00", today: "-0.07%", mtd: "+6.45%", y1: "+4.88%" },
    { name: "Private Banks", level: "21,503.27", today: "+0.74%", mtd: "+13.08%", y1: "+4.02%" },
    { name: "Commodities", level: "8,220.22", today: "-1.11%", mtd: "+6.91%", y1: "+3.58%" },
  ];

  const commodities: CommodityItem[] = [
    { name: "Gold ($/oz)", price: "3,876.43", change: "-2.79%", isPositive: false },
    { name: "Silver ($/oz)", price: "50.02", change: "-3.19%", isPositive: false },
    { name: "Crude Oil ($/bbl)", price: "88.74", change: "+2.55%", isPositive: true },
    { name: "Natural Gas ($/MMBtu)", price: "3.34", change: "+3.89%", isPositive: true },
    { name: "USD/INR", price: "94.04", change: "+0.38%", isPositive: true },
    { name: "India VIX", price: "15.49", change: "-6.80%", isPositive: false },
  ];

  const macroData: MacroItem[] = [
    { indicator: "Inflation Rate", frequency: "Monthly", period: "Oct-2026", value: "6.09", unit: "percent" },
    { indicator: "Interest Rate", frequency: "Daily", period: "07-Oct-2026", value: "5.50", unit: "percent" },
    { indicator: "Unemployment Rate", frequency: "Monthly", period: "Sep-2026", value: "5.00", unit: "percent" },
    { indicator: "GDP", frequency: "Yearly", period: "2025", value: "3,956.07", unit: "USD Billion" },
    { indicator: "GDP Annual Growth Rate", frequency: "Quarterly", period: "Jun-2026", value: "7.80", unit: "percent" },
    { indicator: "Government Debt to GDP", frequency: "Yearly", period: "2025", value: "81.85", unit: "percent of GDP" },
    { indicator: "Government Spending", frequency: "Quarterly", period: "Jun-2026", value: "8,548.77", unit: "INR Billion" },
    { indicator: "Current Account to GDP", frequency: "Yearly", period: "2025", value: "-0.60", unit: "percent of GDP" },
    { indicator: "Consumer Price Index (CPI)", frequency: "Monthly", period: "Oct-2026", value: "110.05", unit: "points" },
  ];

  const levelCards = [
    { title: "NIFTY 50", level: "25,144.30", d1: "-0.61%", y1: "-2.84%", pos: false },
    { title: "BSE SENSEX", level: "81,592.45", d1: "-0.39%", y1: "-3.42%", pos: false },
    { title: "INDIA 10Y", level: "7.25%", d1: "+0.38%", y1: "+6.13%", pos: true },
    { title: "USD/INR", level: "94.04", d1: "+2.79%", y1: "+2.55%", pos: true },
    { title: "CRUDE OIL ($/bbl)", level: "$88.74", d1: "+2.55%", y1: "-7.60%", pos: true },
    { title: "GOLD ($/oz)", level: "$3,876.43", d1: "-2.79%", y1: "+51.72%", pos: false },
  ];

  const tape = [
    ...indicesLargeCap.map((item) => ({ name: item.name, figure: item.level, change: item.today })),
    ...indicesMidSmall.map((item) => ({ name: item.name, figure: item.level, change: item.today })),
    ...commodities.map((item) => ({ name: item.name, figure: item.price, change: item.change })),
    ...worldMarkets.map((item) => ({ name: item.name, figure: item.level, change: item.today })),
  ];
  const tapeLoop = [...tape, ...tape];

  const showOverview = activeTab === "overview" || activeTab === "summary" || activeTab === "sector_analysis";
  const showSectors = activeTab === "sectors" || activeTab === "overview";

  return (
    <div style={{ background: "var(--blue-tint)", color: "var(--ink)", fontFamily: "Montserrat, sans-serif", borderRadius: 20, overflow: "hidden" }}>
      <header style={{ background: "#091540", color: "#fff", borderBottom: "3px solid #8DC63F" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
            <div style={{ background: "#fff", padding: "8px 14px", borderRadius: "8px", display: "flex", alignItems: "center", gap: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>
              <span style={{ fontSize: "22px", fontWeight: 900, color: "#1A3B9F", letterSpacing: "-0.5px" }}>ANMOL</span>
              <div style={{ width: "2px", height: "24px", background: "#8DC63F" }} />
              <span style={{ fontSize: "11px", fontWeight: 700, color: "#374151", textTransform: "uppercase", lineHeight: "1.2" }}>Anmol Share Broking<br />Pvt Ltd</span>
            </div>
            <div>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "#8DC63F", textTransform: "uppercase", letterSpacing: "1px" }}>Daily Market Wrap</div>
              <div style={{ fontSize: "20px", fontWeight: 800, color: "#fff" }}>13 November 2026</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
            <div style={{ background: "rgba(255,255,255,0.1)", padding: "6px 14px", borderRadius: "20px", fontSize: "12px", color: "#EFF8E2", border: "1px solid rgba(141,198,63,0.3)" }}>
              Live Clock: {currentTime}
            </div>
            <div style={{ fontSize: "12px", textAlign: "right", opacity: 0.85 }}>
              Powered by <strong style={{ color: "#8DC63F" }}>NGEN Markets</strong>
            </div>
          </div>
        </div>
        <div style={{ background: "#0D1E52", borderTop: "1px solid rgba(255,255,255,0.1)", padding: "0 24px" }}>
          <div style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", gap: "8px", overflowX: "auto" }}>
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: activeTab === tab.id ? "#1A3B9F" : "transparent",
                  color: activeTab === tab.id ? "#fff" : "#94A3B8",
                  border: "none",
                  padding: "12px 20px",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  borderBottom: activeTab === tab.id ? "3px solid #8DC63F" : "3px solid transparent",
                  transition: "all 0.2s ease",
                  whiteSpace: "nowrap",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div style={{ background: "#1A3B9F", color: "#fff", padding: "8px 0", overflow: "hidden", whiteSpace: "nowrap", borderBottom: "1px solid rgba(141,198,63,0.3)" }}>
        <div className="marquee-track" style={{ display: "inline-block", animationDuration: "90s" }}>
          {tapeLoop.map((item, idx) => (
            <span key={idx} style={{ margin: "0 24px", fontSize: "13px" }}>
              <strong>{item.name}:</strong> {item.figure} &nbsp;
              {colorValue(item.change)}
            </span>
          ))}
        </div>
      </div>

      <main style={{ maxWidth: "1400px", margin: "24px auto", padding: "0 24px 32px", display: "flex", flexDirection: "column", gap: "32px" }}>
        {showOverview && (
          <>
            <div style={{ background: "#fff", borderRadius: "14px", padding: "24px", boxShadow: "0 4px 20px rgba(26,59,159,0.08)", borderLeft: "6px solid #1A3B9F" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", flexWrap: "wrap", gap: "8px" }}>
                <h2 style={{ margin: 0, fontSize: "18px", color: "#1A3B9F", fontWeight: 800 }}>MARKET COMMENTARY & MACRO CONTEXT</h2>
                <span style={{ fontSize: "11px", background: "#EFF8E2", color: "#6AA32A", padding: "4px 10px", borderRadius: "20px", fontWeight: 700 }}>Updated 13 Nov, 3:36 PM</span>
              </div>
              <p style={{ margin: "0 0 16px 0", fontSize: "14px", lineHeight: "1.7", color: "#374151" }}>
                Nifty 50 fell 0.61% to 25,144.30 while Sensex dropped 0.39% to 81,592.45; crude oil slipped 0.34% to USD 88.44/barrel, gold rose 0.39% to USD 3,900.50/oz, and INR weakened 0.22% to INR 94.25 per dollar.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "12px" }}>
                <div style={{ background: "#EEF2FB", padding: "12px 16px", borderRadius: "8px", fontSize: "13px" }}>
                  <strong>Export Momentum:</strong> India's October exports surged 29.9% year-on-year to USD 89.99 billion.
                </div>
                <div style={{ background: "#EEF2FB", padding: "12px 16px", borderRadius: "8px", fontSize: "13px" }}>
                  <strong>Auto Sector Growth:</strong> Passenger vehicle dispatches hit record 5.19 lakh units in October 2024.
                </div>
                <div style={{ background: "#EEF2FB", padding: "12px 16px", borderRadius: "8px", fontSize: "13px" }}>
                  <strong>Gold Demand:</strong> Domestic gold prices around INR 137,000 per 10 grams amid festive buying.
                </div>
                <div style={{ background: "#EEF2FB", padding: "12px 16px", borderRadius: "8px", fontSize: "13px" }}>
                  <strong>Trade Balance:</strong> India's trade deficit narrowed to USD 20.09 billion from USD 25.15 billion.
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
              {levelCards.map((card) => (
                <div key={card.title} style={{ background: "#fff", borderRadius: "12px", padding: "20px", boxShadow: "0 4px 15px rgba(0,0,0,0.05)", borderTop: `4px solid ${card.pos ? "#10B981" : "#EF4444"}` }}>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: "#6B7280", marginBottom: "8px" }}>{card.title}</div>
                  <div style={{ fontSize: "22px", fontWeight: 800, color: "#111827", marginBottom: "12px" }}>{card.level}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", gap: "8px" }}>
                    <span>1D: {colorValue(card.d1)}</span>
                    <span>1Y: {colorValue(card.y1)}</span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 520px), 1fr))", gap: "24px" }}>
              <div style={{ background: "#fff", borderRadius: "14px", padding: "24px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
                <h3 style={{ margin: "0 0 16px 0", fontSize: "16px", color: "#1A3B9F", fontWeight: 800 }}>LARGE CAP & BROAD MARKET INDICES</h3>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
                    <thead>
                      <tr style={{ background: "#EEF2FB", color: "#1A3B9F", borderBottom: "2px solid #1A3B9F" }}>
                        <th style={{ padding: "10px" }}>INDEX</th>
                        <th style={{ padding: "10px" }}>LEVEL</th>
                        <th style={{ padding: "10px" }}>TODAY %</th>
                        <th style={{ padding: "10px" }}>MTD</th>
                        <th style={{ padding: "10px" }}>1Y</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...indicesLargeCap, ...indicesBroad, ...indicesMidSmall].map((row) => (
                        <tr key={row.name} style={{ borderBottom: "1px solid #E5E7EB" }}>
                          <td style={{ padding: "10px", fontWeight: 600 }}>{row.name}</td>
                          <td style={{ padding: "10px" }}>{row.level}</td>
                          <td style={{ padding: "10px" }}>{colorValue(row.today)}</td>
                          <td style={{ padding: "10px" }}>{colorValue(row.mtd)}</td>
                          <td style={{ padding: "10px" }}>{colorValue(row.y1)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={{ background: "#fff", borderRadius: "14px", padding: "24px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
                <h3 style={{ margin: "0 0 16px 0", fontSize: "16px", color: "#1A3B9F", fontWeight: 800 }}>WORLD EQUITY MARKETS</h3>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
                    <thead>
                      <tr style={{ background: "#EEF2FB", color: "#1A3B9F", borderBottom: "2px solid #1A3B9F" }}>
                        <th style={{ padding: "10px" }}>INDEX</th>
                        <th style={{ padding: "10px" }}>LEVEL</th>
                        <th style={{ padding: "10px" }}>TODAY %</th>
                        <th style={{ padding: "10px" }}>MTD</th>
                        <th style={{ padding: "10px" }}>1Y</th>
                      </tr>
                    </thead>
                    <tbody>
                      {worldMarkets.map((row) => (
                        <tr key={row.name} style={{ borderBottom: "1px solid #E5E7EB" }}>
                          <td style={{ padding: "10px", fontWeight: 600 }}>{row.name}</td>
                          <td style={{ padding: "10px" }}>{row.level}</td>
                          <td style={{ padding: "10px" }}>{colorValue(row.today)}</td>
                          <td style={{ padding: "10px" }}>{colorValue(row.mtd)}</td>
                          <td style={{ padding: "10px" }}>{colorValue(row.y1)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}

        {showSectors && (
          <div style={{ background: "#fff", borderRadius: "14px", padding: "24px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
            <h2 style={{ margin: "0 0 20px 0", fontSize: "18px", color: "#1A3B9F", fontWeight: 800 }}>BEST & WORST BSE SECTORS (12-MONTH PERFORMANCE)</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))", gap: "32px" }}>
              <div>
                <h4 style={{ color: "#10B981", margin: "0 0 12px 0" }}>Best 10 Sectors (Profits in Green)</h4>
                {bestSectors.map((sector) => (
                  <div key={sector.name} style={{ marginBottom: "10px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", fontWeight: 600, marginBottom: "4px" }}>
                      <span>{sector.name}</span>
                      <span style={{ color: "#10B981" }}>+{sector.val}%</span>
                    </div>
                    <div style={{ width: "100%", background: "#F3F4F6", height: "10px", borderRadius: "5px", overflow: "hidden" }}>
                      <div style={{ width: `${(sector.val / 25) * 100}%`, background: "#10B981", height: "100%", borderRadius: "5px" }} />
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <h4 style={{ color: "#EF4444", margin: "0 0 12px 0" }}>Worst 10 Sectors (Losses in Red)</h4>
                {worstSectors.map((sector) => (
                  <div key={sector.name} style={{ marginBottom: "10px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", fontWeight: 600, marginBottom: "4px" }}>
                      <span>{sector.name}</span>
                      <span style={{ color: "#EF4444" }}>{sector.val}%</span>
                    </div>
                    <div style={{ width: "100%", background: "#F3F4F6", height: "10px", borderRadius: "5px", overflow: "hidden" }}>
                      <div style={{ width: `${(Math.abs(sector.val) / 18) * 100}%`, background: "#EF4444", height: "100%", borderRadius: "5px" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <h3 style={{ margin: "32px 0 16px 0", fontSize: "16px", color: "#1A3B9F", fontWeight: 800 }}>BSE SECTORS - TOP 12 BY 1Y</h3>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
                <thead>
                  <tr style={{ background: "#EEF2FB", color: "#1A3B9F", borderBottom: "2px solid #1A3B9F" }}>
                    <th style={{ padding: "10px" }}>SECTOR</th>
                    <th style={{ padding: "10px" }}>LEVEL</th>
                    <th style={{ padding: "10px" }}>TODAY %</th>
                    <th style={{ padding: "10px" }}>MTD</th>
                    <th style={{ padding: "10px" }}>1Y</th>
                  </tr>
                </thead>
                <tbody>
                  {bseSectorsList.map((row) => (
                    <tr key={row.name} style={{ borderBottom: "1px solid #E5E7EB" }}>
                      <td style={{ padding: "10px", fontWeight: 600 }}>{row.name}</td>
                      <td style={{ padding: "10px" }}>{row.level}</td>
                      <td style={{ padding: "10px" }}>{colorValue(row.today)}</td>
                      <td style={{ padding: "10px" }}>{colorValue(row.mtd)}</td>
                      <td style={{ padding: "10px" }}>{colorValue(row.y1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "macro" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))", gap: "24px" }}>
            <div style={{ background: "#fff", borderRadius: "14px", padding: "24px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
              <h3 style={{ margin: "0 0 16px 0", fontSize: "16px", color: "#1A3B9F", fontWeight: 800 }}>KEY MACRO ECONOMIC DATA</h3>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
                  <thead>
                    <tr style={{ background: "#EEF2FB", color: "#1A3B9F", borderBottom: "2px solid #1A3B9F" }}>
                      <th style={{ padding: "10px" }}>INDICATOR</th>
                      <th style={{ padding: "10px" }}>FREQ</th>
                      <th style={{ padding: "10px" }}>PERIOD</th>
                      <th style={{ padding: "10px" }}>VALUE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {macroData.map((row) => (
                      <tr key={row.indicator} style={{ borderBottom: "1px solid #E5E7EB" }}>
                        <td style={{ padding: "10px", fontWeight: 600 }}>{row.indicator}</td>
                        <td style={{ padding: "10px" }}>{row.frequency}</td>
                        <td style={{ padding: "10px" }}>{row.period}</td>
                        <td style={{ padding: "10px" }}>{row.value} {row.unit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div style={{ background: "#fff", borderRadius: "14px", padding: "24px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
              <h3 style={{ margin: "0 0 16px 0", fontSize: "16px", color: "#1A3B9F", fontWeight: 800 }}>COMMODITIES & FOREX</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px" }}>
                {commodities.map((item) => (
                  <div key={item.name} style={{ background: "#EEF2FB", borderRadius: "10px", padding: "16px", borderLeft: `4px solid ${item.isPositive ? "#10B981" : "#EF4444"}` }}>
                    <div style={{ fontSize: "12px", fontWeight: 700, color: "#374151", marginBottom: "6px" }}>{item.name}</div>
                    <div style={{ fontSize: "18px", fontWeight: 800, color: "#111827", marginBottom: "6px" }}>{item.price}</div>
                    <div>{colorValue(item.change)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div id="daily-summary" style={{ background: "#fff", borderRadius: "14px", padding: "32px", boxShadow: "0 4px 25px rgba(26,59,159,0.08)", borderTop: "6px solid #8DC63F" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "2px solid #EEF2FB", paddingBottom: "12px", flexWrap: "wrap", gap: "10px" }}>
            <div>
              <span style={{ fontSize: "11px", fontWeight: 700, color: "#8DC63F", textTransform: "uppercase", letterSpacing: "1px" }}>Daily Research Report</span>
              <h2 style={{ margin: "4px 0 0 0", fontSize: "22px", color: "#1A3B9F", fontWeight: 900 }}>DAILY SUMMARY</h2>
            </div>
            <div style={{ fontSize: "12px", color: "#6B7280", fontWeight: 600 }}>
              16 November 2026 | generated on 16-Nov-26 08:01 (Powered by NGEN Research)
            </div>
          </div>
          <h3 style={{ fontSize: "18px", color: "#111827", fontWeight: 800, marginBottom: "16px" }}>Indian Equity Markets Close Lower Amid Profit Booking</h3>
          <p style={{ lineHeight: "1.8", color: "#374151", marginBottom: "16px" }}>
            Indian equity benchmarks ended in negative territory on November 13, 2026, with broad-based selling pressure across major indices. The Nifty 50 declined 0.61% to close at 25,144.30, while the BSE SENSEX fell 0.39% to 81,592.45. Large-cap indices bore the brunt of the selloff, with the BSE LargeCap down 0.50% and the Nifty Next 50 declining 0.83%. The broader BSE 500 and Nifty 500 dropped 0.46% and 0.55% respectively. Mid and small-cap segments demonstrated relative resilience, with the BSE SmallCap shedding just 0.28% and the Nifty Midcap 100 down 0.24%, suggesting selective profit-taking in larger stocks.
          </p>
          <p style={{ lineHeight: "1.8", color: "#374151", marginBottom: "16px" }}>
            The month-to-date performance reveals a sharp recovery across all segments, with the BSE SENSEX surging 9.58% and the Nifty 50 up 9.07% in November. However, year-to-date figures paint a contrasting picture, with large-cap indices remaining under pressure. The Nifty 50 is down 3.77% YTD, while the BSE SENSEX has declined 4.26% and the BSE LargeCap has fallen 2.27%. The one-year performance continues to show weakness in large-caps, with the Nifty 50 down 2.84% and the SENSEX lower by 3.42%, indicating sustained headwinds for blue-chip stocks over the past year.
          </p>
          <p style={{ lineHeight: "1.8", color: "#374151", marginBottom: "16px" }}>
            Market capitalization segments are exhibiting stark performance divergence. Small-caps have emerged as clear outperformers with the BSE SmallCap up 10.29% YTD and 7.02% over one year, while the Nifty Smallcap 100 has gained 10.97% YTD and 8.10% over 12 months. Mid-caps occupy the middle ground, with the BSE MidCap posting 0.86% YTD returns and the Nifty Midcap 100 up 2.32%. Large-caps continue to lag significantly, weighed down by valuation concerns and persistent foreign institutional selling. The three-month returns highlight this trend further, with large-caps gaining 5.64% (SENSEX) versus mid-caps declining 3.44% and small-caps down 2.14%, though recent monthly momentum suggests rotation back into large-caps.
          </p>
          <p style={{ lineHeight: "1.8", color: "#374151", marginBottom: "20px" }}>
            The November rally has provided a strong technical bounce for benchmark indices, with large-caps leading monthly gains as evidenced by the SENSEX's 9.79% one-month return. However, the overall market structure remains fragmented, with investors navigating between growth opportunities in smaller companies and quality plays in established large-caps. The consistent underperformance of large-cap indices on a YTD and one-year basis, juxtaposed against their recent monthly outperformance, suggests a potential trend reversal may be underway. Market participants should monitor whether this large-cap resurgence has sustainability or represents merely a technical rebound within a broader risk-off environment favoring smaller, domestically-oriented growth stories.
          </p>
          <div style={{ background: "#EEF2FB", padding: "12px 16px", borderRadius: "8px", fontSize: "12px", color: "#6B7280", borderLeft: "4px solid #1A3B9F" }}>
            <strong>Disclaimer:</strong> This is an AI-generated summary produced by NGEN Research. It is intended for informational purposes only and should not be construed as investment advice.
          </div>
        </div>

        <div id="sector-analysis" style={{ background: "#fff", borderRadius: "14px", padding: "32px", boxShadow: "0 4px 25px rgba(26,59,159,0.08)", borderTop: "6px solid #1A3B9F" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "2px solid #EEF2FB", paddingBottom: "12px", flexWrap: "wrap", gap: "10px" }}>
            <div>
              <span style={{ fontSize: "11px", fontWeight: 700, color: "#1A3B9F", textTransform: "uppercase", letterSpacing: "1px" }}>Sector Intelligence Report</span>
              <h2 style={{ margin: "4px 0 0 0", fontSize: "22px", color: "#1A3B9F", fontWeight: 900 }}>SECTOR ANALYSIS</h2>
            </div>
            <div style={{ fontSize: "12px", color: "#6B7280", fontWeight: 600 }}>
              16 November 2026 | generated on 16-Nov-26 08:01 (Powered by NGEN Research)
            </div>
          </div>
          <h3 style={{ fontSize: "18px", color: "#111827", fontWeight: 800, marginBottom: "16px" }}>Indian Equity Sector Report - November 13, 2026</h3>
          <h4 style={{ color: "#1A3B9F", marginBottom: "8px" }}>Daily Performance Summary</h4>
          <p style={{ lineHeight: "1.8", color: "#374151", marginBottom: "16px" }}>
            Indian equity sectors displayed broad-based weakness on November 13, with Nifty Energy emerging as the sole green spot, posting a modest gain of +0.03%. The session's underperformers were concentrated in cyclical and mobility-related sectors, with Nifty Realty leading the decline at -1.39%, followed closely by Nifty Mobility and Nifty Transportation & Logistics, both down -1.16%. Traditional growth sectors also faced pressure, as Nifty Auto fell -1.07% and Nifty Commodities declined -1.06%. Defensive sectors showed relative resilience, with Nifty FMCG virtually flat at -0.01% and Nifty Non-Cyclical Consumer down only -0.20%.
          </p>
          <h4 style={{ color: "#1A3B9F", marginBottom: "8px" }}>Month-to-Date Trends and Sector Rotation</h4>
          <p style={{ lineHeight: "1.8", color: "#374151", marginBottom: "16px" }}>
            November has witnessed a pronounced rotation into financials and real estate, with Nifty Financial Services Ex-Bank surging +13.82% MTD, while Nifty Realty gained +13.19% and Nifty Financial Services advanced +12.72%. Banking subsectors showed exceptional strength, with Nifty PSU Bank up +12.43% and Nifty Bank climbing +11.61%. Consumer durables and auto sectors participated in the rally, gaining +11.33% and +9.86% respectively. In stark contrast, technology remains under significant pressure with Nifty IT declining -2.07% MTD, extending its year-to-date losses to a concerning -15.71%. The divergence between domestic cyclical sectors and export-oriented technology reflects a clear risk-on sentiment favoring India's domestic growth story.
          </p>
          <h4 style={{ color: "#1A3B9F", marginBottom: "8px" }}>Momentum Analysis and Year-to-Date Leaders</h4>
          <p style={{ lineHeight: "1.8", color: "#374151", marginBottom: "16px" }}>
            Year-to-date performance reveals a bifurcated market with clear winners and losers. Nifty Pharma stands as the undisputed leader with a +25.58% YTD return, supported by strong three-month momentum of +8.25% and one-year gains of +25.78%. Nifty MidSmall Healthcare shows similar strength at +23.54% YTD. The media sector demonstrates exceptional momentum with Nifty Media up +21.67% YTD and posting the strongest six-month performance at +25.99%. Conversely, structural weakness persists in consumer staples and technology, with Nifty FMCG down -15.58% YTD and Nifty IT declining -15.71%. The Nifty Metal index presents an interesting case, showing +13.25% YTD gains despite recent three-month weakness of -2.90%, suggesting potential consolidation after earlier gains.
          </p>
          <h4 style={{ color: "#1A3B9F", marginBottom: "8px" }}>Key Divergences and Tactical Considerations</h4>
          <p style={{ lineHeight: "1.8", color: "#374151", marginBottom: "20px" }}>
            Several notable divergences warrant attention. Within financials, Nifty Private Bank significantly outperforms with a one-year return of +6.49% versus Nifty Financial Services 25/50 at -0.34%, highlighting stock-specific dispersion. The energy complex shows internal division: Nifty Energy posts +5.87% YTD while Nifty Oil & Gas lags at -7.51%, reflecting diverging fortunes between upstream and integrated players. Mid-cap segments demonstrate resilience with Nifty Midcap Select gaining +8.81% MTD, outpacing large-cap equivalents. The sharp underperformance of Nifty Dividend Opportunities 50 at -8.09% YTD suggests investors are prioritizing growth over yield in the current environment, consistent with the risk-on positioning evident across domestic cyclical sectors.
          </p>
          <div style={{ background: "#EEF2FB", padding: "12px 16px", borderRadius: "8px", fontSize: "12px", color: "#6B7280", borderLeft: "4px solid #1A3B9F" }}>
            <strong>Disclaimer:</strong> This is an AI-generated summary produced by NGEN Research. It is intended for informational purposes only and should not be construed as investment advice.
          </div>
        </div>
      </main>

      <footer style={{ background: "#0D1E52", color: "#fff", padding: "24px 0", borderTop: "3px solid #8DC63F", textAlign: "center", fontSize: "12px" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 24px" }}>
          <p style={{ margin: "0 0 8px 0", opacity: 0.8 }}>Information only. NGEN Markets does not guarantee accuracy of prices, returns or statistics shown. NGEN Markets is not responsible for losses from decisions based on this report.</p>
          <p style={{ margin: 0, color: "#8DC63F", fontWeight: 600 }}>© 2026 Anmol Share Broking Pvt Ltd — Valuable Services - Invaluable Relationships</p>
        </div>
      </footer>
    </div>
  );
}
