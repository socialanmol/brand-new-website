import { useEffect, useState } from "react";
import { MACRO_DATA, MARKET_WRAPS, type MarketWrapEdition } from "@/data/marketWraps";

type WrapTab = "overview" | "sectors" | "macro";

const TABS: { id: WrapTab; label: string }[] = [
  { id: "overview", label: "📊 Market Overview & Levels" },
  { id: "sectors", label: "📈 Sector Performance" },
  { id: "macro", label: "🌐 Macro & Commodities" },
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

export default function DailyMarketWrap({ edition = "13-nov" }: { edition?: MarketWrapEdition }) {
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

  const {
    dateLabel,
    updatedLabel,
    commentary,
    notes,
    lossScale,
    indicesLargeCap,
    indicesBroad,
    indicesMidSmall,
    worldMarkets,
    bestSectors,
    worstSectors,
    bseSectorsList,
    commodities,
    levelCards,
  } = MARKET_WRAPS[edition];
  const macroData = MACRO_DATA;

  const tape = [
    ...indicesLargeCap.map((item) => ({ name: item.name, figure: item.level, change: item.today })),
    ...indicesMidSmall.map((item) => ({ name: item.name, figure: item.level, change: item.today })),
    ...commodities.map((item) => ({ name: item.name, figure: item.price, change: item.change })),
    ...worldMarkets.map((item) => ({ name: item.name, figure: item.level, change: item.today })),
  ];
  const tapeLoop = [...tape, ...tape];

  const showOverview = activeTab === "overview";
  const showSectors = activeTab === "sectors" || activeTab === "overview";

  return (
    <div style={{ background: "var(--blue-tint)", color: "var(--ink)", fontFamily: "Montserrat, sans-serif", borderRadius: 20, overflow: "hidden" }}>
      <header style={{ background: "#091540", color: "#fff", borderBottom: "3px solid #8DC63F" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "#8DC63F", textTransform: "uppercase", letterSpacing: "1px" }}>Daily Market Wrap</div>
              <div style={{ fontSize: "20px", fontWeight: 800, color: "#fff" }}>{dateLabel}</div>
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
                <span style={{ fontSize: "11px", background: "#EFF8E2", color: "#6AA32A", padding: "4px 10px", borderRadius: "20px", fontWeight: 700 }}>{updatedLabel}</span>
              </div>
              <p style={{ margin: "0 0 16px 0", fontSize: "14px", lineHeight: "1.7", color: "#374151" }}>
                {commentary}
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "12px" }}>
                {notes.map((note) => (
                  <div key={note.title} style={{ background: "#EEF2FB", padding: "12px 16px", borderRadius: "8px", fontSize: "13px" }}>
                    <strong>{note.title}:</strong> {note.body}
                  </div>
                ))}
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
                      <div style={{ width: `${(Math.abs(sector.val) / lossScale) * 100}%`, background: "#EF4444", height: "100%", borderRadius: "5px" }} />
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
