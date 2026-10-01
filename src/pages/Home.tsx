"use client";
// MyAnmol home page — same layout and copy as the design PDF, recoloured to the navy + lime brand palette.
// Change colours in one place: the CSS variables at the top of `css`. Heading font: --hf.
// Search "TODO" for links and copy that need your input. Header/WhatsApp button live in layout.tsx.
import React, { useEffect, useState } from "react";
import GoogleReviewsBadge from "./googlereviewsbadge";

const SCORE = "/financial-score"; // TODO
const CALCS = "/tools-calculators"; // TODO

const scoreBars: [string, number][] = [["Emergency", 72], ["Insurance", 41], ["Investments", 63], ["Retirement", 28], ["Goals", 45]];

const who = [
  ["🏢", "Corporate HR", "Building a financial wellness program for your team? We help HR teams design SIP, insurance and planning sessions employees actually use — not another benefits PDF nobody opens."],
  ["📊", "Business Owners", "Business income is unpredictable — your personal plan shouldn't be. We help you separate personal and business goals, build a real emergency reserve, and invest surplus without waiting for \"the right time.\""],
  ["🌸", "Senior Couples (60+)", "At 60+, it's about protecting what you've built and making it last. We help structure withdrawals, healthcare cover and legacy planning — without dipping into principal too early."],
  ["🎨", "Young Professionals", "Your first few years of income set the tone for everything after. We help you start SIPs early, get the right term cover, and steer clear of ULIP/endowment plans dressed up as \"investments.\""],
  ["💻", "Freelancers & Gig", "Income that changes month to month needs a plan that flexes with it. We help freelancers build SIPs around irregular income, self-funded health cover, and a retirement plan with no employer PF to fall back on."],
  ["🏡", "Homemakers", "Running the household budget is real financial expertise — we help turn it into a plan in your own name. Independent investments, insurance and goals that are yours, not just tied to a spouse's income."],
  ["💍", "Newlyweds", "Two incomes, one set of goals — home, kids, travel, security. We help couples merge finances without merging chaos, with a joint plan mapped to shared milestones."],
  ["👤", "Single Parents", "Doing it alone means your plan has to work twice as hard — for you and your child's future. We help prioritise emergency funds, adequate life cover, and education goals, with zero generic advice."],
  ["⏳", "Pre-Retirees (45–58)", "The decade before retirement is where plans get corrected — or ruined. We stress-test your corpus, rebalance risk, and close any gaps before retirement, not during it."],
  ["🧮", "Gen Z (18–22)", "Starting to earn is the best time nobody tells you to invest. We help you build the habit early — SIPs from ₹500, real money basics, and staying clear of \"get rich quick\" noise."],
];
const slides = [who.slice(0, 3), who.slice(3, 6), who.slice(6)];

const pillars = [
  ["01 — Pillar One", "Save", "6", "Months", "to build a real emergency fund with a structured savings plan tailored to your income. Building that foundation matters more than anything else — most Indian families never get there, not because they can't, but because nobody showed them where to start. MyAnmol makes it structured, automatic, and achievable.", [
    ["🏦", "Emergency fund in 6 months", "A personalised monthly target to reach 6 months of expenses as your financial buffer — before anything else is touched."],
    ["📅", "Goal-mapped monthly savings", "Every rupee mapped to a specific purpose — home, education, travel, security. No vague \"save more\" advice."],
    ["⚡", "SIP automation with clarity", "SIPs that run automatically with full visibility into what each one is working toward. Discipline without friction."]]],
  ["02 — Pillar Two", "Insure", "1", "Event", "can undo everything you've worked for — one hospitalisation without cover erases years of savings in days. Insurance is not an expense, it's the protection layer that keeps your family stable when life doesn't go to plan. Most families are dangerously underinsured without realising it.", [
    ["❤️", "Term life cover — right-sized", "Most term plans are wildly undersized. We calculate your actual requirement based on income, liabilities, and dependants."],
    ["🏥", "Family health insurance", "The right plan for your family size, city, and history — reviewed every year as premiums and needs change."],
    ["⚖️", "Unbiased, zero-pressure advice", "We recommend what fits your need — not what pays us more. Full transparency on every recommendation."]]],
  ["03 — Pillar Three", "Invest", "20×", "Potential", "corpus growth potential with a ₹10,000/month SIP over 40 years at 12% CAGR — the discipline is where we help. Once your foundation is solid and your family is protected, every rupee you invest should be mapped to a real life goal, not market speculation or random fund picks. Goal-based, disciplined, long-term wealth creation.", [
    ["🌱", "SIPs from any amount", "Start with ₹500/month. Discipline and time matter far more than the starting amount. Compounding rewards consistency above everything."],
    ["🗺️", "Goal-mapped portfolios", "Every fund linked to a specific goal — education, retirement, home. No panic selling. Purpose drives every decision."],
    ["📊", "Wide fund access, full transparency", "Funds selected across categories on merit, not margins. Full disclosure on commissions and fund selection rationale."]]],
]; // TODO: compliance to review the "20×" projection wording

const journey = [["💼", "First Salary", "Start strong from day one."], ["🛡️", "Emergency Fund", "3–6 months of real security."], ["💍", "Marriage", "Plan big without chaos."], ["🏠", "Home Purchase", "Down payment + EMI readiness."], ["🎓", "Child Education", "Plan before fees become pressure."], ["🌅", "Retirement", "Independence, on your terms."]];

const three = [
  ["💰", "Save Better", "Build lasting financial security", "A financial plan without savings discipline is a house without a foundation. We help you build one that lasts — structured, automated, and goal-linked.", ["Emergency fund planning & tracking", "Goal-based savings structure", "Cash flow & expense mapping", "SIP automation & disciplined habits", "Monthly savings target setting"]],
  ["🛡️", "Protect Better", "Never lose what you've built", "Insurance is not an add-on — it's the foundation of a serious financial plan. Most Indian families are underinsured. We fix that, with full transparency and zero pressure.", ["Family health insurance review", "Term life cover sizing", "Critical illness & accident cover", "Honest risk gap assessment", "Annual insurance review"]],
  ["📈", "Grow Better", "Wealth that compounds for decades", "Every rupee you invest should be mapped to a real goal. We build portfolios with purpose — not predictions — and stay involved as your life evolves.", ["Mutual funds & SIP strategies", "Goal-mapped portfolio building", "Retirement corpus planning", "Tax-saving investments (ELSS)", "Long-term wealth creation"]],
];

const partner = [
  ["🎯", "Unbiased Advice", "Recommendations built entirely around your goals, your family, and your life stage — never around product incentives. We explain our reasoning so you understand the \"why\" behind every suggestion."],
  ["🏛️", "33+ Years of Experience", "A deep, earned understanding of how Indian families make financial decisions — across income levels, life stages, and the real pressures of everyday money management in India."],
  ["🤝", "Long-Term Partnership", "We stay involved as your life changes — marriage, children, promotions, relocations, retirement. Not a one-time transaction but a relationship built over years and decades."],
  ["🌿", "Complete Financial Wellness", "Save, protect, grow, and retire — all under one roof. One trusted advisor across your entire financial life so nothing falls through the cracks between products and providers."],
];

const assess: [string, string, number][] = [["🏦", "Emergency Fund", 62], ["🛡️", "Insurance Cover", 38], ["📈", "Investments", 55], ["🌅", "Retirement Plan", 22], ["🗺️", "Goal Planning", 34]];

const mistakes = [
  ["⏰", "Starting Too Late", "Delaying SIPs by even 5 years dramatically reduces your final corpus. Compounding years lost cannot be recovered — time is your scarcest asset.", "Start a SIP now, even if small."],
  ["🚨", "No Emergency Fund", "One job loss or hospitalisation can force you to break investments at the worst time — erasing years of discipline in a single stressful week.", "Build 6 months of expenses first."],
  ["🎭", "Wrong Insurance", "Mixing insurance with investment delivers poor cover AND poor returns. Most families are dangerously underinsured without realising it.", "Separate protection from investing."],
  ["😴", "Idle Money", "Excess savings sitting in a bank account loses purchasing power silently. Inflation is working 24×7 — your money should too.", "Use goal-based allocation strategies."],
  ["🧭", "No Retirement Plan", "Thinking \"I'll figure it out later\" is the most expensive retirement decision you can make. The earlier you start, the far less you need to invest.", "Start retirement investing today."],
  ["🎲", "No Goal Mapping", "Investing randomly without linking money to specific goals causes panic during market dips and leads to poor, emotional, costly decisions.", "Map every investment to a purpose."],
];

const steps = [
  ["Book a free consultation", "Speak with a MyAnmol advisor — completely free, no commitment, no pressure. Every consultation is free, every time."],
  ["Map your goals and income", "We understand your current situation, goals, timeline and risk comfort before recommending anything."],
  ["Get your personalised SIP plan", "A goal-mapped plan — which funds, how much per month, which goals each SIP is working toward."],
  ["Start and we stay with you", "We set everything up and review your plan with you regularly — not a one-time transaction, a long-term partnership."],
];

const segs = [
  ["🩺", "Doctors", "Income that doesn't run on a salary schedule.", "See plan for doctors →", "#0f766e"],
  ["🌸", "Women", "Independent goals, not just shared ones.", "See plan for women →", "#be185d"],
  ["🌍", "NRIs", "India-based investing, done right from anywhere.", "See plan for NRIs →", "#5b4bc4"],
  ["🎖️", "Armed Forces", "Postings change. Your financial plan shouldn't have to.", "See plan for armed forces →", "#1e3a8a"],
  ["🚀", "Gen Z", "Starting to earn is the best time to start investing.", "See plan for Gen Z →", "#b45309"],
  ["🧭", "None of these", "See guidance for every life stage.", "Explore all guidance →", "#081540"],
]; // TODO: segment page URLs

// TODO: compliance to review these FAQ answers
const faqs = [
  ["What exactly does MyAnmol help with?", "Savings, insurance and mutual fund investments — planned together around your goals, from emergency funds to retirement."],
  ["Who is MyAnmol for?", "Indian families and NRIs at every life stage, from first salary to retirement."],
  ["Do you work with NRIs?", "Yes. We guide NRIs on investing in India, including the process and documents involved."],
  ["Is MyAnmol SEBI/AMFI regulated?", "MyAnmol is operated by Anmol Share Broking Pvt. Ltd., an AMFI-registered mutual fund distributor (ARN 114893)."],
  ["Do I need a large income to start a SIP?", "No. You can start a SIP with as little as ₹500 a month."],
  ["How do you select which mutual funds are right for me?", "We match funds to each goal's time horizon and your risk comfort, choosing across categories on merit and explaining our reasoning."],
  ["Can I stop a SIP if I need the money?", "SIPs can generally be paused or stopped at any time. Exit loads may apply on redemption, depending on the fund."],
  ["What is the difference between SIP and lumpsum investing?", "A SIP invests a fixed amount at regular intervals; a lumpsum invests one large amount at once. SIPs build discipline and spread out timing risk."],
  ["Can you help with insurance as well as investments?", "Yes — term life and family health cover, sized to your needs and reviewed every year."],
  ["How do I know if I have enough insurance?", "We work out your requirement from income, liabilities and dependants, then compare it with the cover you already have."],
  ["What is the difference between term life and whole life insurance?", "Term insurance is pure protection for a fixed period at a lower premium. Whole life covers you for life and costs more."],
  ["Is the Financial Confidence Quiz free?", "Yes — it's free, takes about 2 minutes, and needs no login."],
  ["What happens after I book a consultation?", "An advisor speaks with you to understand your situation and goals. The consultation is free, with no obligation."],
];

const css = `
.h{--navy:#081540;--n2:#0c1f57;--lime:#8dc63f;--acc:#4d7a0f;--ink:#0a1440;--mut:#5a6486;--bg:#f4f6fb;--line:#e1e6f2;--dm:#b4bedc;--hf:Montserrat,sans-serif;
font-family:Montserrat,sans-serif;color:var(--ink);background:var(--bg);line-height:1.6}
.h *{box-sizing:border-box}.h a{color:inherit;text-decoration:none}
.h section{padding:72px 20px}.h .w{max-width:1120px;margin:0 auto}
.h h1,.h h2,.h h3{font-family:var(--hf);font-weight:700;line-height:1.15;margin:0}
.h h1{font-size:clamp(38px,6vw,62px)}.h h2{font-size:clamp(28px,4vw,42px)}.h h3{font-size:19px}
.h em{color:var(--acc)}.h .dk em{color:var(--lime)}
.h .dk{background:var(--navy);color:#fff}.h .dk .m{color:var(--dm)}.h .m{color:var(--mut)}
.h .gate.dk .card2 .m{color:#374151}
.h .ey{font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--acc);margin-bottom:12px}
.h .dk .ey{color:var(--lime)}
.h .btn{display:inline-block;padding:13px 24px;border-radius:12px;font:700 15px Montserrat,system-ui,sans-serif;border:1.5px solid var(--navy);cursor:pointer;background:none;color:var(--navy)}
.h .btn.p{background:var(--lime);border-color:var(--lime);color:var(--navy)}
.h .btn.wh{background:#fff;border-color:#fff;color:var(--navy)}
.h .btn:focus-visible,.h summary:focus-visible,.h input:focus-visible{outline:3px solid var(--lime);outline-offset:2px}
.h .g{display:grid;gap:18px;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));margin-top:32px}
.h .c{background:#fff;border:1px solid var(--line);border-radius:20px;padding:24px}
.h .dk .c{background:rgba(255,255,255,.07);border-color:rgba(255,255,255,.15)}
.h .ic{display:inline-flex;width:44px;height:44px;border-radius:12px;align-items:center;justify-content:center;font-size:22px;background:rgba(141,198,63,.16);margin-bottom:12px}
.h .two{display:grid;gap:40px;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));align-items:center}
.h .bar{height:6px;border-radius:9px;background:rgba(127,140,180,.25);flex:1}.h .bar i{display:block;height:100%;border-radius:9px;background:var(--lime)}
.h .row{display:flex;align-items:center;gap:12px;margin:12px 0;font-size:14px;font-weight:600}.h .row b{min-width:38px;text-align:right}
.h .ring{width:84px;height:84px;border-radius:50%;display:grid;place-items:center;flex:none;background:conic-gradient(var(--lime) 94%,rgba(255,255,255,.15) 0)}
.h .ring span{width:66px;height:66px;border-radius:50%;background:var(--n2);display:grid;place-items:center;font:700 26px var(--hf)}
.h .pl{border-radius:24px;padding:36px;margin-bottom:24px}
.h .big{display:flex;gap:20px;align-items:flex-start;margin:24px 0}.h .big b{font:800 80px/1 var(--hf)}.h .big small{display:block;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--dm)}
.h .nav{display:flex;gap:12px;justify-content:center;align-items:center;margin-top:28px}
.h .nav button{width:38px;height:38px;border-radius:50%;border:1px solid var(--line);background:#fff;cursor:pointer;font-size:16px}
.h .dot{width:8px;height:8px;border-radius:50%;background:var(--line)}.h .dot.on{width:26px;border-radius:9px;background:var(--navy)}
.h .ul{list-style:none;padding:14px 0 0;margin:18px 0 0;border-top:1px solid var(--line);font-size:13px}
.h .ul li{padding:8px 0;border-bottom:1px solid var(--line)}
.h .stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:20px;text-align:center;border-radius:24px;padding:32px;margin-top:32px}
.h .stats b{display:block;font:700 38px var(--hf)}
.h .tip{margin-top:14px;padding:10px 14px;border-radius:10px;background:var(--bg);color:var(--acc);font-size:13px;font-weight:700}
.h .prog{height:8px;border-radius:9px;background:var(--line);margin:16px auto;max-width:260px}.h .prog i{display:block;width:31%;height:100%;border-radius:9px;background:var(--lime)}
.h .jr{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));background:#fff;border:1px solid var(--line);border-radius:22px;margin-top:32px;overflow:hidden}
.h .jr div{padding:20px;border-right:1px solid var(--line);font-size:13px}
.h .gate{background:linear-gradient(var(--navy),var(--bg));padding-bottom:96px}
.h .card2{background:#fff;color:var(--ink);border-radius:24px;padding:36px;max-width:640px;margin:0 auto;text-align:center;box-shadow:0 20px 50px rgba(0,0,0,.25)}
.h input[type=range]{width:100%;accent-color:var(--lime)}
.h .fq{columns:2 340px;column-gap:40px;margin-top:32px}
.h details{break-inside:avoid;border-bottom:1px solid var(--line);padding:14px 0}.h summary{cursor:pointer;font-weight:700;font-size:14px}
.h details p{margin:8px 0 0;font-size:14px;color:var(--mut)}
.h footer{padding:36px 20px;font-size:12px}
`;

const fmt = (v: number) => (v >= 1e7 ? `₹${(v / 1e7).toFixed(2)} Cr` : `₹${(v / 1e5).toFixed(1)} L`);
const Bar = ({ v }: { v: number }) => <div className="bar"><i style={{ width: `${v}%` }} /></div>;

export default function HomePage() {
  const [s, setS] = useState(0);
  const [amt, setAmt] = useState(5000);
  useEffect(() => {
    const interval = window.setInterval(() => {
      setS((current) => (current + 1) % slides.length);
    }, 4000);

    return () => window.clearInterval(interval);
  }, []);
  const r = 0.01, n = 240;
  const corpus = amt * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);

  return (
    <main className="h">
      <style>{css}</style>

      {/* HERO */}
      <section>
        <div className="w two">
          <div>
            <div className="ey">● Financial wellness for every Indian family</div>
            <h1>Your money deserves a <em>plan, not a product.</em></h1>
            <p className="m" style={{ margin: "20px 0 28px", maxWidth: 520 }}>{"MyAnmol brings structure to your financial life — savings, insurance and investments mapped to your goals, not generic products. Wherever you're starting from, we help you build a plan that actually works for your life."}</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a className="btn" href={SCORE}>Check Your Financial Score →</a>
            </div>
          </div>
          <div className="c dk" style={{ background: "var(--navy)", padding: 28 }} aria-label="Sample financial wellness score">
            <div className="ey">Financial Wellness Score · Sample Profile</div>
            <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 12 }}>
              <div className="ring"><span>94</span></div>
              <div><b>Strong Financial Health</b><p className="m" style={{ margin: 0, fontSize: 13 }}>Excellent across savings and investments. Minor gaps in retirement corpus and goal mapping to address.</p></div>
            </div>
            {scoreBars.map(([l, v]) => (
              <div className="row" key={l}><span style={{ minWidth: 92 }}>{l}</span><Bar v={v} /><b>{v}</b></div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap", marginTop: 18 }}>
              <div><b>What&apos;s your score?</b><div className="m" style={{ fontSize: 12 }}>Free · 2 minutes · No login</div></div>
              <a className="btn p" href={SCORE}>Check My Score →</a>
            </div>
          </div>
        </div>
      </section>

      {/* WHO WE HELP */}
      <section style={{ background: "#fff" }}>
        <div className="w">
          <div className="ey">Who we help</div>
          <h2>Guidance built around <em>your life.</em></h2>
          <p className="m">{"Whoever you are and wherever you're starting from, there's a plan for it."}</p>
          <div className="g">
            {slides[s].map(([i, t, d]) => (
              <div className="c" key={t}><span className="ic">{i}</span><h3 style={{ fontSize: 17, fontFamily: "inherit" }}>{t}</h3><p className="m" style={{ fontSize: 14, marginBottom: 0 }}>{d}</p></div>
            ))}
          </div>
          <div className="nav">
            <button onClick={() => setS((s + 2) % 3)} aria-label="Previous">‹</button>
            {slides.map((_, i) => <span key={i} className={`dot${i === s ? " on" : ""}`} />)}
            <button onClick={() => setS((s + 1) % 3)} aria-label="Next">›</button>
          </div>
        </div>
      </section>

      {/* THREE PILLARS */}
      <section style={{ background: "#091540" }}>
        <div className="w">
          {pillars.map(([lab, name, big, unit, intro, feats]) => (
            <div className="pl dk" key={name as string}>
              <div style={{ display: "flex", gap: 16, alignItems: "baseline", flexWrap: "wrap", borderBottom: "1px solid rgba(255,255,255,.14)", paddingBottom: 16 }}>
                <span className="ey" style={{ margin: 0 }}>{lab as string}</span>
                <h2>{name as string} <em>Better.</em></h2>
              </div>
              <div className="big"><div><b>{big as string}</b><small>{unit as string}</small></div><p style={{ margin: 0, maxWidth: 640 }}>{intro as string}</p></div>
              <div className="g" style={{ marginTop: 0 }}>
                {(feats as string[][]).map(([i, t, d]) => (
                  <div className="c" key={t}><span className="ic">{i}</span><h3 style={{ fontSize: 15, fontFamily: "inherit" }}>{t}</h3><p className="m" style={{ fontSize: 13, marginBottom: 0 }}>{d}</p></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DID YOU KNOW */}
      <section className="gate dk">
        <div className="card2">
          <div className="ey">Did you know?</div>
          <h2 style={{ fontSize: 30 }}>Your savings are shrinking. You just <em>can&apos;t see it.</em></h2>
          <p className="m" style={{ fontSize: 13 }}>{"Keep ₹10,00,000 in a savings account, and in 20 years it'll only buy what"}</p>
          <div style={{ font: "700 44px var(--hf)", color: "var(--navy)" }}>₹3,11,805</div>
          <p className="m" style={{ fontSize: 13, margin: 0 }}>buys today — at 6% average inflation.</p>
          <div className="prog"><i /></div>
          <p className="m" style={{ fontSize: 13, fontStyle: "italic" }}>{"That's roughly the price of a decent car — gone, without a single transaction."}</p>
          <a className="btn p" href={SCORE}>I want to know how much I need →</a>
          <p className="m" style={{ fontSize: 12, marginBottom: 0 }}>Not right now? Scroll down to keep exploring ↓</p>
        </div>
      </section>

      {/* LIFE JOURNEY */}
      <section>
        <div className="w">
          <div className="ey">Your money · Your life</div>
          <h2>Your money journey is really <em>a life journey.</em></h2>
          <p className="m">Financial planning is not about products. It is about preparing for life&apos;s biggest moments — each one on time, on purpose.</p>
          <div className="jr">
            {journey.map(([i, t, d], k) => (
              <div key={t}><span className="m" style={{ fontSize: 11 }}>0{k + 1}</span><div style={{ fontSize: 22 }}>{i}</div><b>{t}</b><div className="m">{d}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section style={{ background: "#fff" }}>
        <div className="w">
          <div className="ey">What we do</div>
          <h2>Everything you need. <em>Nothing you don&apos;t.</em></h2>
          <p className="m">Three pillars. Complete financial wellness.</p>
          <div className="g">
            {three.map(([i, t, tag, d, items]) => (
              <div className="c" key={t as string} style={{ borderBottom: "4px solid var(--lime)" }}>
                <span className="ic">{i as string}</span><h3>{t as string}</h3>
                <div className="ey" style={{ fontSize: 11, margin: "6px 0 10px" }}>{tag as string}</div>
                <p className="m" style={{ fontSize: 14, margin: 0 }}>{d as string}</p>
                <ul className="ul">{(items as string[]).map((x) => <li key={x}>{x}</li>)}</ul>
              </div>
            ))}
          </div>
          <div className="stats dk">
            <div><b>33+</b><span className="m">Years of experience in Indian family finance</span></div>
            <div><b>3000+</b><span className="m">Families guided across all life stages</span></div>
            <div><b>Goal-First</b><span className="m">Goals before incentives — always</span></div>
          </div>
        </div>
      </section>

      {/* PARTNER */}
      <section className="dk">
        <div className="w">
          <h2>We are not a platform.<br /><em>We are your partner.</em></h2>
          <p className="m">Involved across every milestone — not just at the time of purchase.</p>
          <div className="g" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))" }}>
            {partner.map(([i, t, d]) => (
              <div className="c" key={t}><span className="ic">{i}</span><h3 style={{ fontSize: 17, fontFamily: "inherit" }}>{t}</h3><p className="m" style={{ fontSize: 14, marginBottom: 0 }}>{d}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* ASSESSMENT */}
      <section className="dk" style={{ background: "#050d2b" }}>
        <div className="w two">
          <div>
            <div className="ey">Assessment tool</div>
            <h2>How financially <em>prepared are you?</em> 🎯</h2>
            <p className="m">Most people are strong in one area and vulnerable in another. Find out where you stand — and what to fix first.</p>
            {assess.map(([i, l, v]) => (
              <div className="row" key={l}><span style={{ minWidth: 150 }}>{i} {l}</span><Bar v={v} /><b>{v}%</b></div>
            ))}
            <p className="m" style={{ fontSize: 12, fontStyle: "italic" }}>Illustrative — your profile will differ.</p>
          </div>
          <div className="c" style={{ textAlign: "center" }}>
            <h3 style={{ color: "var(--lime)", marginBottom: 10 }}>Check Your Score</h3>
            <p className="m" style={{ fontSize: 14 }}>Five dimensions. Two minutes. A clear picture of your financial health and exactly where to focus next.</p>
            <a className="btn wh" href={SCORE}>Check My Score →</a>
            <p style={{ fontSize: 13, marginBottom: 0 }}>✓ Free &nbsp;✓ 2 minutes &nbsp;✓ No login</p>
          </div>
        </div>
      </section>

      {/* HARD TRUTHS */}
      <section>
        <div className="w">
          <div className="ey">The hard truths</div>
          <h2>The money mistakes <em>nobody warned us about.</em> 🤫</h2>
          <p className="m">They are not dramatic. They are quiet. And they compound silently over years.</p>
          <div className="g">
            {mistakes.map(([i, t, d, tip], k) => (
              <div className="c" key={t}>
                <div className="ey" style={{ fontSize: 11 }}>Mistake 0{k + 1}</div>
                <div style={{ fontSize: 24 }}>{i}</div><h3 style={{ margin: "6px 0 8px" }}>{t}</h3>
                <p className="m" style={{ fontSize: 14, margin: 0 }}>{d}</p><div className="tip">✦ {tip}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* START TODAY */}
      <section id="consult" className="dk" style={{ background: "#091540" }}>
        <div className="w two" style={{ alignItems: "start" }}>
          <div>
            <div className="ey">Start today</div>
            <h2>Let&apos;s get you started on <em>your SIP — today.</em></h2>
            <p className="m">{"There's no perfect time to start. The best time was ten years ago. The second best time is now. Starting a SIP is simpler than most people think — here's exactly how it works with MyAnmol."}</p>
            {steps.map(([t, d], k) => (
              <div key={t} style={{ display: "flex", gap: 14, padding: "14px 0", borderBottom: "1px solid var(--line)" }}>
                <span className="ic" style={{ width: 32, height: 32, fontSize: 14, fontWeight: 700, flex: "none", borderRadius: "50%" }}>{k + 1}</span>
                <div><b>{t}</b><div className="m" style={{ fontSize: 14 }}>{d}</div></div>
              </div>
            ))}
          </div>
          <div className="c dk" style={{ background: "var(--navy)", padding: 28 }}>
            <div className="ey">Quick SIP Estimator</div>
            <div style={{ font: "700 44px var(--hf)" }}>₹{amt.toLocaleString("en-IN")}</div>
            <div className="m" style={{ fontSize: 13 }}>per month</div>
            <input type="range" min={500} max={100000} step={500} value={amt} onChange={(e) => setAmt(+e.target.value)} aria-label="Monthly SIP amount" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, margin: "16px 0" }}>
              <div className="c" style={{ padding: 14 }}><div className="m" style={{ fontSize: 12 }}>Amount Invested (20 yrs)</div><b style={{ color: "var(--lime)" }}>{fmt(amt * n)}</b></div>
              <div className="c" style={{ padding: 14 }}><div className="m" style={{ fontSize: 12 }}>Est. Corpus at 12% CAGR</div><b style={{ color: "var(--lime)" }}>{fmt(corpus)}</b></div>
            </div>
            <p className="m" style={{ fontSize: 11 }}>Illustration only. Actual returns depend on fund performance. Mutual fund investments are subject to market risks.</p>
            <a className="btn wh" href={CALCS} style={{ display: "block", textAlign: "center" }}>Explore All Calculators →</a>
          </div>
        </div>
      </section>

      {/* ONE QUICK QUESTION */}
      <section className="gate dk">
        <div className="card2" style={{ maxWidth: 860 }}>
          <div className="ey">One quick question</div>
          <h2 style={{ fontSize: 28 }}>Does one of these sound like <em>you?</em></h2>
          <div className="g" style={{ textAlign: "left" }}>
            {segs.map(([i, t, d, cta, col]) => (
              <div className="c" key={t} style={{ borderTop: `3px solid ${col}` }}>
                <span className="ic">{i}</span><h3>{t}</h3>
                <p className="m" style={{ fontSize: 14 }}>{d}</p>
                <a className="btn" href="#" style={{ background: col, borderColor: col, color: "#fff", fontSize: 13, padding: "10px 16px" }}>{cta}</a>
              </div>
            ))}
          </div>
          <p className="m" style={{ fontSize: 12, marginBottom: 0 }}>Scroll down for FAQs ↓</p>
        </div>
      </section>

      {/* FAQ */}
      <section>
        <div className="w" style={{ textAlign: "center" }}>
          <div className="ey">Got questions?</div>
          <h2>We&apos;ve answered <em>them all.</em></h2>
          <p className="m" style={{ maxWidth: 520, margin: "12px auto 0" }}>Everything you want to know about MyAnmol, mutual funds, SIPs, insurance and how we work — honestly answered.</p>
          <div className="fq" style={{ textAlign: "left" }}>
            {faqs.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
          </div>
        </div>
      </section>

      <GoogleReviewsBadge />
    </main>
  );
}
