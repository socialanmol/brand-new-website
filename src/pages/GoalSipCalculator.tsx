import { useEffect, useId, useMemo, useRef, useState } from 'react';
import type { CSSProperties, MouseEvent as ReactMouseEvent, ReactNode, TouchEvent as ReactTouchEvent } from 'react';

/*
 * MyAnmol Goal-based Top-up SIP Calculator
 * Self-contained: all styling lives in the scoped stylesheet below (every class is prefixed `ma-`),
 * so colours, gradients and layout render the same with or without Tailwind.
 */

type PlanRow = {
  year: number;
  label: number;
  sipPerMonth: number;
  investedThisYear: number;
  totalInvested: number;
  value: number;
  growth: number;
};

const NAVY = '#1A3B9F';
const LIME = '#8DC63F';
const DEEP = '#091540';

/* ───────────────────────── Scoped stylesheet ───────────────────────── */

const SIP_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap');

.ma-sip{--navy:#1A3B9F;--navy-2:#3558C9;--navy-dk:#0D1E52;--deep:#091540;--lime:#8DC63F;--lime-dk:#5B8F22;--lime-xdk:#4E7D1C;--lime-lt:#EFF8E2;--lime-bg:#F4FAEC;--tint:#EEF2FB;--tint-2:#F7F9FE;--line:#E3E8F4;--ink:#111827;--ink-2:#374151;--ink-3:#6B7280;--ink-4:#9CA3AF;--serif:'Montserrat',system-ui,-apple-system,'Segoe UI',sans-serif;--sans:'Montserrat',system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;
  font-family:var(--sans);color:var(--ink);background:linear-gradient(180deg,#F6F8FE 0%,#FFFFFF 520px);min-height:100%;line-height:1.55;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
.ma-sip *,.ma-sip *::before,.ma-sip *::after{box-sizing:border-box;margin:0;padding:0}
.ma-sip button{font:inherit;cursor:pointer;border:0;background:none;color:inherit}
.ma-sip a{text-decoration:none;color:inherit}
.ma-sip ol{list-style:none}
.ma-sip i{font-style:normal;display:inline-block;flex-shrink:0}
.ma-sip svg{display:block}
.ma-wrap{max-width:1152px;margin:0 auto;padding:32px 16px 48px}
.ma-num{font-variant-numeric:tabular-nums}
.ma-dots{position:absolute;inset:0;pointer-events:none;background-image:radial-gradient(rgba(255,255,255,.14) 1px,transparent 1px);background-size:18px 18px;opacity:.6}
.ma-glow{position:absolute;border-radius:50%;pointer-events:none;filter:blur(60px)}
@keyframes maRise{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
.ma-rise{animation:maRise .6s cubic-bezier(.2,.7,.2,1) both}
@media (prefers-reduced-motion:reduce){.ma-rise{animation:none}}

/* eyebrow */
.ma-eyebrow{display:inline-flex;align-items:center;gap:8px;border-radius:999px;padding:6px 12px;font-size:11px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;background:var(--lime-lt);color:var(--lime-dk)}
.ma-eyebrow::before{content:"";width:6px;height:6px;border-radius:50%;background:var(--lime)}
.ma-eyebrow.dark{background:rgba(141,198,63,.1);border:1px solid rgba(141,198,63,.35);color:var(--lime)}

/* hero */
.ma-hero{position:relative;overflow:hidden;margin-bottom:32px;border-radius:28px;color:#fff;background:linear-gradient(120deg,#091540 0%,#0D1E52 45%,#1A3B9F 100%);box-shadow:0 24px 60px rgba(9,21,64,.28)}
.ma-hero .g1{right:-96px;top:-96px;width:320px;height:320px;background:rgba(141,198,63,.28)}
.ma-hero .g2{left:33%;bottom:-128px;width:288px;height:288px;background:rgba(53,88,201,.45)}
.ma-hero-grid{position:relative;display:grid;gap:32px;padding:28px}
.ma-h1{font-family:var(--serif);font-weight:800;letter-spacing:-.01em;font-size:32px;line-height:1.1;margin-top:20px;color:#fff}
.ma-h1 span{display:block;margin-top:6px;font-size:.66em;line-height:1.2;color:var(--lime)}
.ma-hero-lead{margin-top:16px;max-width:560px;font-size:15px;line-height:1.65;color:rgba(255,255,255,.75)}
.ma-badges{margin-top:24px;display:flex;flex-wrap:wrap;gap:10px}
.ma-badge{display:inline-flex;align-items:center;gap:6px;border-radius:999px;border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.05);padding:6px 12px;font-size:12px;font-weight:700;color:rgba(255,255,255,.88)}
.ma-badge svg{color:var(--lime)}
.ma-live{border-radius:20px;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.07);padding:22px;-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px)}
.ma-live-label{font-size:11px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.6)}
.ma-live-text{margin-top:12px;font-size:14px;color:rgba(255,255,255,.8)}
.ma-live-text b{color:#fff}
.ma-live-value{margin-top:8px;font-family:var(--serif);font-weight:800;letter-spacing:-.01em;font-size:40px;line-height:1;color:var(--lime)}
.ma-bar{margin-top:20px;height:10px;border-radius:999px;overflow:hidden;background:rgba(255,255,255,.1);display:flex}
.ma-bar>div{height:100%;transition:width .5s ease}
.ma-bar-legend{margin-top:10px;display:flex;justify-content:space-between;font-size:12px;font-weight:700;color:rgba(255,255,255,.7)}
.ma-bar-legend span:last-child{color:#B5E07A}

/* layout */
.ma-calc{display:grid;gap:24px}
.ma-card{background:#fff;border:1px solid var(--line);border-radius:24px;box-shadow:0 1px 2px rgba(13,30,82,.04),0 12px 32px rgba(13,30,82,.06)}
.ma-inputs{overflow:hidden}
.ma-inputs-head{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:16px 24px;border-bottom:1px solid var(--line);background:#FAFBFF}
.ma-h2sm{font-family:var(--serif);font-weight:800;letter-spacing:-.01em;font-size:20px;color:var(--deep)}
.ma-sub{font-size:12px;font-weight:600;color:var(--ink-3)}
.ma-sip .ma-reset{display:inline-flex;align-items:center;gap:6px;border-radius:999px;border:1px solid var(--line);background:#fff;padding:6px 12px;font-size:12px;font-weight:700;color:var(--ink-2);transition:border-color .15s,color .15s}
.ma-sip .ma-reset:hover{border-color:var(--navy);color:var(--navy)}

/* field */
.ma-field{padding:24px}
.ma-field+.ma-field{border-top:1px solid var(--line)}
.ma-field-top{display:flex;flex-direction:column;gap:16px;margin-bottom:20px}
.ma-field-l{display:flex;align-items:flex-start;gap:14px;min-width:0;flex:1}
.ma-field-icon{position:relative;width:44px;height:44px;flex-shrink:0;border-radius:12px;display:flex;align-items:center;justify-content:center;background:var(--tint);color:var(--navy);transition:background .15s,color .15s}
.ma-field:focus-within .ma-field-icon{background:var(--navy);color:#fff}
.ma-step{position:absolute;right:-6px;top:-6px;min-width:20px;height:20px;padding:0 4px;border-radius:999px;background:var(--lime);color:var(--deep);font-size:10px;font-weight:900;display:flex;align-items:center;justify-content:center}
.ma-label{font-size:15px;font-weight:800;line-height:1.35;color:var(--ink)}
.ma-hint{display:block;margin-top:4px;font-size:12px;font-weight:600;color:var(--ink-3)}
.ma-box{display:flex;align-items:center;height:48px;width:100%;border-radius:12px;border:1.5px solid transparent;background:var(--tint);padding:0 14px;transition:border-color .15s,background .15s,box-shadow .15s}
.ma-box:focus-within{border-color:var(--navy);background:#fff;box-shadow:0 0 0 4px rgba(26,59,159,.08)}
.ma-box input{flex:1;width:100%;min-width:0;border:0;outline:0;background:transparent;text-align:right;font-family:var(--sans);font-size:20px;font-weight:900;color:var(--navy);font-variant-numeric:tabular-nums}
.ma-pre{margin-right:8px;font-size:14px;font-weight:700;color:var(--ink-3)}
.ma-suf{margin-left:8px;font-size:12px;font-weight:700;color:var(--ink-3);white-space:nowrap}
.ma-range{-webkit-appearance:none;appearance:none;display:block;width:100%;height:8px;border-radius:999px;outline:none;cursor:pointer;background:var(--line)}
.ma-range::-webkit-slider-thumb{-webkit-appearance:none;width:26px;height:26px;border-radius:50%;background:#fff;border:6px solid var(--navy);box-shadow:0 0 0 4px rgba(26,59,159,.12),0 4px 10px rgba(26,59,159,.35);transition:transform .15s,box-shadow .15s}
.ma-range::-webkit-slider-thumb:hover{transform:scale(1.1);box-shadow:0 0 0 7px rgba(26,59,159,.14),0 4px 12px rgba(26,59,159,.4)}
.ma-range::-moz-range-thumb{width:14px;height:14px;border-radius:50%;background:#fff;border:6px solid var(--navy);box-shadow:0 0 0 4px rgba(26,59,159,.12),0 4px 10px rgba(26,59,159,.35)}
.ma-range:focus-visible::-webkit-slider-thumb{box-shadow:0 0 0 4px var(--lime)}
.ma-ticks{margin-top:12px;display:flex;justify-content:space-between;font-size:11px;font-weight:700;color:var(--ink-4)}
.ma-chips{margin-top:16px;display:flex;flex-wrap:wrap;gap:8px}
.ma-sip .ma-chip{border-radius:999px;border:1px solid var(--line);background:#fff;padding:6px 12px;font-size:12px;font-weight:700;color:var(--ink-2);transition:all .15s}
.ma-sip .ma-chip:hover{border-color:rgba(26,59,159,.5);color:var(--navy)}
.ma-sip .ma-chip.on{border-color:var(--navy);background:var(--navy);color:#fff;box-shadow:0 4px 12px rgba(26,59,159,.25)}

/* results */
.ma-results{display:flex;flex-direction:column;gap:20px}
.ma-fv{position:relative;overflow:hidden;border-radius:24px;padding:24px;color:#fff;background:linear-gradient(135deg,#1A3B9F 0%,#0D1E52 100%);box-shadow:0 20px 44px rgba(26,59,159,.32)}
.ma-fv .g3{right:-64px;top:-64px;width:192px;height:192px;background:rgba(141,198,63,.3);filter:blur(40px)}
.ma-fv-in{position:relative}
.ma-fv-top{display:flex;align-items:center;justify-content:space-between;gap:8px}
.ma-fv-label{font-size:12px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.65)}
.ma-mult{border-radius:999px;background:var(--lime);padding:4px 10px;font-size:11px;font-weight:900;color:var(--deep);white-space:nowrap}
.ma-fv-sub{margin-top:4px;font-size:11px;font-weight:600;color:rgba(255,255,255,.55)}
.ma-fv-value{margin-top:12px;font-size:34px;font-weight:900;line-height:1;letter-spacing:-.01em}
.ma-fv-meta{margin-top:8px;font-size:14px;color:rgba(255,255,255,.7)}
.ma-fv-actions{margin-top:24px;display:grid;grid-template-columns:1fr 1fr;gap:12px}
.ma-sip .ma-btn-ghost,.ma-sip .ma-btn-white{display:inline-flex;align-items:center;justify-content:center;gap:8px;height:44px;border-radius:12px;font-size:14px;font-weight:800;transition:background .15s}
.ma-sip .ma-btn-ghost{border:1px solid rgba(255,255,255,.22);background:rgba(255,255,255,.1);color:#fff}
.ma-sip .ma-btn-ghost:hover{background:rgba(255,255,255,.2)}
.ma-sip .ma-btn-white{background:#fff;color:var(--navy)}
.ma-sip .ma-btn-white:hover{background:var(--lime-lt)}
.ma-split{padding:24px}
.ma-donut-row{display:flex;flex-direction:column;align-items:center;gap:24px}
.ma-donut{position:relative;width:180px;height:180px;flex-shrink:0}
.ma-donut svg{width:100%;height:100%;transform:rotate(-90deg)}
.ma-donut-mid{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}
.ma-donut-mid b{font-family:var(--serif);font-weight:800;letter-spacing:-.01em;font-size:34px;line-height:1;color:var(--deep)}
.ma-donut-mid small{margin-top:6px;font-size:10px;font-weight:800;letter-spacing:.18em;color:var(--ink-3)}
.ma-tiles{width:100%;display:flex;flex-direction:column;gap:12px}
.ma-tile{border-radius:14px;padding:16px;border:1px solid var(--line);background:var(--tint-2)}
.ma-tile.gr{border-color:#DCEFC4;background:var(--lime-bg)}
.ma-tile-head{display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:12px;font-weight:700;color:var(--ink-3)}
.ma-tile-head span{display:inline-flex;align-items:center;gap:8px}
.ma-tile.gr .ma-tile-head>span:last-child{color:var(--lime-dk)}
.ma-sw{width:10px;height:10px;border-radius:3px}
.ma-tile-v{margin-top:6px;font-size:22px;font-weight:900;color:var(--navy);font-variant-numeric:tabular-nums}
.ma-tile.gr .ma-tile-v{color:var(--lime-dk)}

/* chart */
.ma-chart{margin-top:24px;padding:20px}
.ma-chart-head{display:flex;flex-direction:column;gap:16px}
.ma-h3{font-family:var(--serif);font-weight:800;letter-spacing:-.01em;font-size:22px;line-height:1.25;color:var(--deep)}
.ma-chart-head p{margin-top:4px;font-size:14px;color:var(--ink-3)}
.ma-seg{display:inline-flex;align-self:flex-start;flex-shrink:0;border-radius:999px;background:var(--tint);padding:4px}
.ma-sip .ma-seg button{display:inline-flex;align-items:center;gap:6px;border-radius:999px;padding:6px 16px;font-size:12px;font-weight:800;text-transform:capitalize;color:var(--ink-3);transition:all .15s}
.ma-sip .ma-seg button:hover{color:var(--navy)}
.ma-sip .ma-seg button.on{background:#fff;color:var(--navy);box-shadow:0 1px 3px rgba(13,30,82,.12)}
.ma-stats{margin-top:20px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
.ma-stat{border-radius:14px;padding:12px;background:var(--tint-2)}
.ma-stat.gr{background:var(--lime-bg)}
.ma-stat.tot{background:var(--deep)}
.ma-stat-k{font-size:10px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;white-space:nowrap;color:var(--ink-4)}
.ma-stat.tot .ma-stat-k{color:rgba(255,255,255,.5)}
.ma-stat-v{margin-top:2px;font-size:14px;font-weight:900;white-space:nowrap;color:var(--navy);font-variant-numeric:tabular-nums}
.ma-stat.gr .ma-stat-v{color:var(--lime-dk)}
.ma-stat.tot .ma-stat-v{color:#fff}
.ma-legend{margin:16px 0 8px;display:flex;flex-wrap:wrap;align-items:center;gap:8px 20px;font-size:14px;font-weight:700;color:var(--ink-2)}
.ma-legend span{display:inline-flex;align-items:center;gap:8px}
.ma-legend .ma-sw{width:12px;height:12px}
.ma-legend .ma-line{width:16px;height:3px;border-radius:2px;background:var(--deep)}
.ma-chart-box{position:relative;width:100%;-webkit-user-select:none;user-select:none}
.ma-chart-box svg{width:100%;height:auto;overflow:visible}
.ma-axis{font-family:var(--sans);font-size:12px;font-weight:700;fill:var(--ink-4)}
.ma-axis.x{fill:var(--ink-3)}
.ma-tip{position:absolute;z-index:10;pointer-events:none;min-width:220px;border-radius:12px;background:var(--deep);padding:12px 16px;font-size:13px;color:#fff;box-shadow:0 14px 30px rgba(9,21,64,.35)}
.ma-tip-head{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:8px;padding-bottom:8px;border-bottom:1px solid rgba(255,255,255,.1)}
.ma-tip-head b{font-size:14px}
.ma-tip-head span{font-size:11px;font-weight:600;color:rgba(255,255,255,.6)}
.ma-tip-row{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-top:4px}
.ma-tip-row span{display:inline-flex;align-items:center;gap:8px;color:rgba(255,255,255,.75)}
.ma-tip-row b{font-variant-numeric:tabular-nums}
.ma-tip-row .ma-sw{width:8px;height:8px;border-radius:2px}
.ma-table-wrap{margin-top:16px;max-height:420px;overflow:auto;border-radius:14px;border:1px solid var(--line)}
.ma-table{width:100%;min-width:520px;border-collapse:collapse;font-size:14px}
.ma-table th{position:sticky;top:0;background:var(--tint-2);padding:12px 16px;text-align:left;font-size:11px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-3)}
.ma-table td{padding:12px 16px;border-top:1px solid #EEF1F7}
.ma-table tr:hover td{background:#FAFBFF}
.ma-table .r{text-align:right;font-variant-numeric:tabular-nums}
.ma-table .yr{font-weight:800;color:var(--deep)}
.ma-table .dur{color:var(--ink-3)}
.ma-table .inv{font-weight:700;color:var(--navy)}
.ma-table .gr{font-weight:700;color:var(--lime-dk)}
.ma-table .tv{font-weight:900;color:var(--ink)}

/* about */
.ma-about{margin-top:80px;display:grid;gap:40px;align-items:start}
.ma-h2{font-family:var(--serif);font-weight:800;letter-spacing:-.01em;font-size:30px;line-height:1.15;margin-top:16px;color:var(--deep)}
.ma-h2 span{color:var(--navy)}
.ma-p{margin-top:16px;font-size:16px;line-height:1.7;color:var(--ink-2)}
.ma-callout{margin-top:20px;border-left:4px solid var(--lime);background:var(--lime-bg);padding:12px 12px 12px 16px;font-size:15px;font-weight:700;line-height:1.6;color:#1F2937;border-radius:0 12px 12px 0}
.ma-steps{margin-top:28px;display:flex;flex-direction:column;gap:16px}
.ma-steps li{display:flex;gap:16px}
.ma-step-num{width:36px;height:36px;flex-shrink:0;border-radius:50%;border:2px solid var(--navy);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:900;color:var(--navy)}
.ma-step-t{font-weight:800;color:var(--ink)}
.ma-step-d{font-size:14px;color:var(--ink-3)}
.ma-facts{display:grid;gap:16px}
.ma-fact{position:relative;overflow:hidden;border-radius:20px;padding:24px;background:var(--tint);transition:transform .2s}
.ma-fact.green{background:var(--lime-lt)}
.ma-fact:hover{transform:translateY(-4px)}
.ma-fact-blob{position:absolute;right:-24px;top:-24px;width:96px;height:96px;border-radius:50%;background:rgba(26,59,159,.1)}
.ma-fact.green .ma-fact-blob{background:rgba(141,198,63,.22)}
.ma-fact-icon{position:relative;width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;background:var(--navy);color:#fff}
.ma-fact.green .ma-fact-icon{background:var(--lime);color:var(--deep)}
.ma-fact-v{position:relative;display:block;margin-top:20px;font-family:var(--serif);font-weight:800;letter-spacing:-.01em;font-size:28px;line-height:1;color:var(--navy)}
.ma-fact.green .ma-fact-v{color:var(--lime-xdk)}
.ma-fact-t{position:relative;display:block;margin-top:8px;font-size:14px;font-weight:600;line-height:1.6;color:var(--ink-2)}

/* benefits */
.ma-benefits{margin-top:96px}
.ma-benefits-head{display:flex;flex-direction:column;gap:12px}
.ma-benefits-head p{max-width:420px;font-size:14px;line-height:1.65;color:var(--ink-3)}
.ma-bgrid{margin-top:32px;display:grid;gap:16px}
.ma-b{position:relative;overflow:hidden;border-radius:20px;padding:24px;border:1px solid var(--line);background:#fff;transition:transform .2s,border-color .2s,box-shadow .2s}
.ma-b:hover{transform:translateY(-4px);border-color:rgba(26,59,159,.4);box-shadow:0 16px 34px rgba(13,30,82,.09)}
.ma-b.featured{border:0;color:#fff;background:linear-gradient(135deg,#1A3B9F 0%,#091540 100%);box-shadow:0 18px 40px rgba(26,59,159,.28)}
.ma-b.featured .g4{right:-40px;bottom:-80px;width:224px;height:224px;background:rgba(141,198,63,.3);filter:blur(40px)}
.ma-b-top{position:relative;display:flex;align-items:flex-start;justify-content:space-between}
.ma-b-icon{width:48px;height:48px;border-radius:14px;display:flex;align-items:center;justify-content:center;background:var(--tint);color:var(--navy);transition:transform .2s}
.ma-b.alt .ma-b-icon{background:var(--lime-lt);color:var(--lime-xdk)}
.ma-b.featured .ma-b-icon{background:var(--lime);color:var(--deep)}
.ma-b:hover .ma-b-icon{transform:scale(1.06)}
.ma-b-num{font-family:var(--serif);font-weight:800;letter-spacing:-.01em;font-size:34px;line-height:1;color:var(--line);transition:color .2s}
.ma-b:hover .ma-b-num{color:#C9D5F2}
.ma-b.featured .ma-b-num{color:rgba(255,255,255,.2)}
.ma-b-title{position:relative;margin-top:20px;font-size:17px;font-weight:800;color:var(--ink)}
.ma-b.featured .ma-b-title{font-family:var(--serif);font-weight:800;letter-spacing:-.01em;font-size:26px;color:#fff}
.ma-b-text{position:relative;margin-top:8px;font-size:14.5px;line-height:1.65;color:#4B5563}
.ma-b.featured .ma-b-text{max-width:520px;font-size:15px;color:rgba(255,255,255,.8)}

/* cta */
.ma-cta{position:relative;overflow:hidden;margin-top:80px;border-radius:28px;padding:32px;color:#fff;background:linear-gradient(120deg,#091540 0%,#1A3B9F 100%);box-shadow:0 24px 60px rgba(9,21,64,.25)}
.ma-cta .g5{left:-64px;top:-96px;width:256px;height:256px;background:rgba(141,198,63,.24)}
.ma-cta-ring{position:absolute;right:40px;bottom:-40px;width:160px;height:160px;border-radius:50%;border:18px solid rgba(255,255,255,.05);pointer-events:none}
.ma-cta-in{position:relative;display:flex;flex-direction:column;align-items:flex-start;gap:24px}
.ma-cta h2{font-family:var(--serif);font-weight:800;letter-spacing:-.01em;font-size:28px;line-height:1.2;color:#fff}
.ma-cta p{margin-top:8px;max-width:560px;font-size:15px;color:rgba(255,255,255,.75)}
.ma-cta-btns{display:flex;flex-direction:column;gap:12px;width:100%;flex-shrink:0}
.ma-sip .ma-btn-lime,.ma-sip .ma-btn-line{display:inline-flex;align-items:center;justify-content:center;gap:8px;height:48px;padding:0 24px;border-radius:12px;font-size:14px;font-weight:800;white-space:nowrap;transition:transform .15s,background .15s}
.ma-sip .ma-btn-lime{background:var(--lime);color:var(--deep);box-shadow:0 8px 20px rgba(141,198,63,.35)}
.ma-sip .ma-btn-lime:hover{background:#9ED64A;transform:translateY(-2px)}
.ma-sip .ma-btn-line{border:1px solid rgba(255,255,255,.28);color:#fff}
.ma-sip .ma-btn-line:hover{background:rgba(255,255,255,.1)}
.ma-disc{margin-top:32px;border-radius:16px;border:1px solid var(--line);background:#FAFBFF;padding:20px;font-size:12px;line-height:1.7;color:var(--ink-3)}
.ma-disc b{color:var(--ink-2)}

/* ≥640px */
@media (min-width:640px){
  .ma-wrap{padding:40px 24px 56px}
  .ma-hero-grid{padding:40px}
  .ma-h1{font-size:44px}
  .ma-live{padding:24px}
  .ma-live-value{font-size:46px}
  .ma-inputs-head{padding:16px 28px}
  .ma-field{padding:28px}
  .ma-label{font-size:16px}
  .ma-field-top{flex-direction:row;align-items:center;justify-content:space-between}
  .ma-box{width:210px;flex-shrink:0}
  .ma-fv{padding:28px}
  .ma-fv-value{font-size:40px}
  .ma-donut-row{flex-direction:row}
  .ma-chart{padding:28px}
  .ma-h3{font-size:24px}
  .ma-chart-head{flex-direction:row;align-items:flex-start;justify-content:space-between}
  .ma-stat{padding:12px 16px}
  .ma-stat-k{font-size:11px}
  .ma-stat-v{font-size:18px}
  .ma-h2{font-size:38px}
  .ma-facts{grid-template-columns:1fr 1fr}
  .ma-fact.stagger{transform:translateY(24px)}
  .ma-fact.stagger:hover{transform:translateY(20px)}
  .ma-benefits-head{flex-direction:row;align-items:flex-end;justify-content:space-between}
  .ma-bgrid{grid-template-columns:repeat(2,minmax(0,1fr))}
  .ma-b{padding:28px}
  .ma-b.featured{grid-column:span 2}
  .ma-cta{padding:40px}
  .ma-cta h2{font-size:34px}
  .ma-cta-btns{flex-direction:row;width:auto}
}
/* ≥1024px */
@media (min-width:1024px){
  .ma-wrap{padding:40px 32px 64px}
  .ma-hero-grid{grid-template-columns:1.25fr 1fr;align-items:center}
  .ma-calc{grid-template-columns:1.3fr 1fr}
  .ma-results{position:sticky;top:24px;align-self:start}
  .ma-donut-row{flex-direction:column}
  .ma-about{grid-template-columns:1fr 1.05fr;gap:56px}
  .ma-bgrid{grid-template-columns:repeat(3,minmax(0,1fr))}
  .ma-cta-in{flex-direction:row;align-items:center;justify-content:space-between}
}
/* ≥1280px */
@media (min-width:1280px){
  .ma-donut-row{flex-direction:row}
}

/* ── goal-based additions ── */
.ma-live-value small{margin-left:6px;font-size:.4em;font-weight:700;color:rgba(255,255,255,.7)}
.ma-live-steps{margin-top:18px;display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px;padding-top:14px;border-top:1px solid rgba(255,255,255,.12);font-size:12px;font-weight:700;color:rgba(255,255,255,.75)}
.ma-live-steps span{display:inline-flex;align-items:center;gap:6px}
.ma-live-steps span:first-child{color:#B5E07A}
.ma-compare{margin-top:14px;display:flex;align-items:center;gap:8px;border-radius:10px;background:rgba(141,198,63,.14);border:1px solid rgba(141,198,63,.35);padding:8px 12px;font-size:12.5px;color:rgba(255,255,255,.85)}
.ma-compare svg{color:var(--lime);flex-shrink:0}
.ma-compare b{color:#B5E07A}
.ma-goalbox{padding:20px 24px}
.ma-goalbox-row{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}
.ma-goalbox-k{font-size:13px;font-weight:800;color:var(--ink)}
.ma-goalbox-s{font-size:11px;font-weight:600;color:var(--ink-3)}
.ma-goalbox-v{font-size:24px;font-weight:900;color:var(--deep);font-variant-numeric:tabular-nums}
.ma-goalbox-bar{margin-top:14px;height:10px;border-radius:999px;background:linear-gradient(90deg,#DCEFC4,#8DC63F);overflow:hidden}
.ma-goalbox-today{height:100%;border-radius:999px;background:var(--navy);transition:width .45s ease}
.ma-goalbox-foot{margin-top:8px;display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;font-size:11.5px;font-weight:700;color:var(--ink-3)}
.ma-goalbox-foot span{display:inline-flex;align-items:center;gap:6px}
.ma-final{margin-top:16px;display:flex;align-items:center;justify-content:space-between;gap:12px;border-radius:14px;background:var(--deep);padding:14px 18px;color:#fff}
.ma-final span{font-size:12px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.6)}
.ma-final b{font-size:22px;font-weight:900}
.ma-stats-4{grid-template-columns:repeat(2,minmax(0,1fr))}
.ma-legend .ma-line.goal{background:repeating-linear-gradient(90deg,#5B8F22 0 5px,transparent 5px 8px)}
.ma-axis.goal{fill:#4E7D1C;font-weight:800}
.ma-yr-sub{display:block;font-size:11px;font-weight:600;color:var(--ink-4)}
.ma-progress{display:block;margin:6px 0 0 auto;width:90px;height:4px;border-radius:999px;background:#EEF1F7;overflow:hidden}
.ma-progress span{display:block;height:100%;background:var(--lime);border-radius:999px}
.ma-table{min-width:640px}
.ma-fact-v.sm{font-size:22px;line-height:1.15}
.ma-bgrid.even .ma-b.featured{grid-column:auto}
.ma-bgrid.even .ma-b.featured .ma-b-title{font-size:22px}
.ma-table .yr{white-space:nowrap}
.ma-final{flex-wrap:wrap}
.ma-final b{white-space:nowrap}
@media (min-width:640px){
  .ma-stats-4{grid-template-columns:repeat(4,minmax(0,1fr))}
  .ma-fact-v.sm{font-size:24px}
}
`;

/* ───────────────────────── Helpers ───────────────────────── */

const formatINR = (value: number) => new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(Math.round(value));

const formatShortINR = (value: number) => {
  if (value >= 1e7) {
    const crore = value / 1e7;
    return (crore >= 100 ? Math.round(crore).toLocaleString('en-IN') : String(+crore.toFixed(2))) + ' Cr';
  }
  if (value >= 1e5) return String(+(value / 1e5).toFixed(2)) + ' L';
  if (value >= 1e3) return String(+(value / 1e3).toFixed(1)) + 'K';
  return String(Math.round(value));
};

const formatAxisINR = (value: number) => {
  if (value >= 1e7) return String(+(value / 1e7).toFixed(1)) + ' Cr';
  if (value >= 1e5) return String(+(value / 1e5).toFixed(1)) + ' L';
  if (value >= 1e3) return Math.round(value / 1e3) + 'K';
  return String(Math.round(value));
};

const niceStep = (value: number) => {
  if (value <= 0) return 1;
  const exponent = Math.pow(10, Math.floor(Math.log10(value)));
  const fraction = value / exponent;
  const nice = fraction <= 1 ? 1 : fraction <= 2 ? 2 : fraction <= 2.5 ? 2.5 : fraction <= 5 ? 5 : 10;
  return nice * exponent;
};

const plural = (n: number, word: string) => n + ' ' + word + (n === 1 ? '' : 's');

/** Smoothly tweens a number toward its target for count-up style result values. */
function useAnimatedNumber(target: number, duration = 450) {
  const [display, setDisplay] = useState(target);
  const fromRef = useRef(target);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const reduce = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !Number.isFinite(target)) {
      setDisplay(target);
      fromRef.current = target;
      return;
    }
    const from = fromRef.current;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const next = from + (target - from) * eased;
      setDisplay(next);
      fromRef.current = next;
      if (t < 1) frameRef.current = requestAnimationFrame(tick);
    };
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [target, duration]);

  return display;
}

/* Goal slider runs on a log scale (₹1 L → ₹100 Cr) so every range is usable. */
const GOAL_MIN = 1e5;
const GOAL_MAX = 1e9;
const GOAL_STEPS = 1000;
const goalToPos = (goal: number) => Math.round((Math.log(goal / GOAL_MIN) / Math.log(GOAL_MAX / GOAL_MIN)) * GOAL_STEPS);
const posToGoal = (pos: number) => {
  const raw = GOAL_MIN * Math.pow(GOAL_MAX / GOAL_MIN, pos / GOAL_STEPS);
  const unit = raw >= 1e7 ? 1e5 : raw >= 1e6 ? 1e4 : 1e3;
  return Math.min(GOAL_MAX, Math.max(GOAL_MIN, Math.round(raw / unit) * unit));
};

/* ───────────────────────── Icons ───────────────────────── */

const ICONS = {
  target: <><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></>,
  calendar: <><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" /></>,
  trend: <><path d="m22 7-8.5 8.5-5-5L2 17" /><path d="M16 7h6v6" /></>,
  flame: <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.4-.5-2-1-3-1.1-2.1-.2-4 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.2.4-2.3 1-3.3.3 1.5 1.3 2.8 2.5 2.8Z" />,
  stairs: <><path d="M3 21h5v-5h5v-5h5V6h3" /><path d="m16 3 3 3-3 3" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  download: <><path d="M12 4v11" /><path d="m7 10 5 5 5-5" /><path d="M5 20h14" /></>,
  phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z" />,
  reset: <><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" /></>,
  shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></>,
  sparkle: <path d="M12 3l1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z" />,
  wallet: <><path d="M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0 0 4h14a2 2 0 0 1 2 2v3" /><path d="M3 5v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3" /><path d="M21 12h-4a2 2 0 0 0 0 4h4v-4Z" /></>,
  layers: <><path d="m12 2 10 5-10 5L2 7l10-5Z" /><path d="m2 17 10 5 10-5" /><path d="m2 12 10 5 10-5" /></>,
  sliders: <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6" />,
  scale: <><path d="M12 3v18M7 21h10" /><path d="M3 7h18" /><path d="m6 7-3 7a3 3 0 0 0 6 0Z" /><path d="m18 7-3 7a3 3 0 0 0 6 0Z" /></>,
  flag: <><path d="M4 22V4" /><path d="M4 4h13l-2 4 2 4H4" /></>,
  chart: <><path d="M3 3v18h18" /><rect x="7" y="12" width="3" height="6" /><rect x="12" y="8" width="3" height="10" /><rect x="17" y="5" width="3" height="13" /></>,
  table: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M3 15h18M9 3v18" /></>,
  arrow: <><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></>,
  down: <><path d="M12 5v14" /><path d="m19 12-7 7-7-7" /></>,
} satisfies Record<string, ReactNode>;

type IconName = keyof typeof ICONS;

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICONS[name]}
    </svg>
  );
}

/* ───────────────────────── Content ───────────────────────── */

const HOW_IT_WORKS = [
  { title: 'Name the goal in today’s money', text: 'A home, your child’s education or retirement, priced at what it costs today.' },
  { title: 'Adjust it for inflation', text: 'We project what that goal will actually cost in the year you need it.' },
  { title: 'Solve for your starting SIP', text: 'We work out the first-year SIP that, topped up every year, reaches that amount.' },
];

const GOAL_FACTS: Array<{ icon: IconName; value: string; text: string; green: boolean }> = [
  { icon: 'flame', value: 'Inflation-adjusted', text: 'Targets tomorrow’s cost of your goal, not today’s', green: false },
  { icon: 'stairs', value: 'Annual top-up', text: 'Your SIP steps up each year as your income grows', green: true },
  { icon: 'wallet', value: 'Lower start', text: 'A smaller first-year SIP than a flat SIP for the same goal', green: true },
  { icon: 'table', value: 'Year-wise plan', text: 'See exactly what to invest every year until the goal', green: false },
];

const BENEFITS: Array<{ icon: IconName; title: string; text: string }> = [
  { icon: 'stairs', title: 'Grows with your income', text: 'Salaries usually rise every year. A top-up SIP lets your investing rise with them, so a bigger goal becomes reachable without a big starting amount.' },
  { icon: 'wallet', title: 'Easier to start', text: 'Because later instalments are larger, the first-year SIP needed for the same goal is lower than a flat SIP.' },
  { icon: 'flame', title: 'Keeps pace with inflation', text: 'Planning against the inflation-adjusted cost means you aim for what the goal will really cost, not today’s price tag.' },
  { icon: 'flag', title: 'Goal-first discipline', text: 'Each goal gets its own amount, timeline and SIP, which makes progress easy to track and review.' },
  { icon: 'layers', title: 'Compounding on a larger base', text: 'Every top-up adds more money that starts compounding from the day it is invested.' },
  { icon: 'sliders', title: 'Adjustable over time', text: 'Your goal, top-up rate or timeline can be revisited at any review as life changes.' },
];

const GOAL_PRESETS = [
  { label: '₹25 L', value: 2500000 },
  { label: '₹50 L', value: 5000000 },
  { label: '₹1 Cr', value: 10000000 },
  { label: '₹2 Cr', value: 20000000 },
  { label: '₹5 Cr', value: 50000000 },
];
const YEAR_PRESETS = [5, 10, 15, 20, 30];
const RATE_PRESETS = [
  { label: 'Conservative', rate: 8 },
  { label: 'Balanced', rate: 12 },
  { label: 'Aggressive', rate: 15 },
];
const INFLATION_PRESETS = [4, 5, 6, 7];
const TOPUP_PRESETS = [0, 5, 10, 15];

const DEFAULTS = { goal: 5000000, years: 30, rate: 12, inflation: 5, topup: 10 };

/* ───────────────────────── Small UI pieces ───────────────────────── */

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={active} className={'ma-chip' + (active ? ' on' : '')}>
      {children}
    </button>
  );
}

type FieldProps = {
  id: string;
  step: string;
  icon: IconName;
  label: string;
  hint: string;
  prefix?: string;
  suffix?: string;
  text: string;
  inputMode: 'numeric' | 'decimal';
  onText: (raw: string) => void;
  onBlur: () => void;
  range: { min: number; max: number; step: number; value: number; onChange: (value: number) => void };
  ticks: string[];
  presets: ReactNode;
};

function SliderField({ id, step, icon, label, hint, prefix, suffix, text, inputMode, onText, onBlur, range, ticks, presets }: FieldProps) {
  const percent = ((range.value - range.min) / (range.max - range.min)) * 100;
  const track: CSSProperties = {
    background: 'linear-gradient(90deg, ' + NAVY + ' 0%, #3558C9 ' + percent + '%, #E3E8F4 ' + percent + '%, #E3E8F4 100%)',
  };
  return (
    <div className="ma-field">
      <div className="ma-field-top">
        <div className="ma-field-l">
          <span className="ma-field-icon">
            <Icon name={icon} />
            <span className="ma-step">{step}</span>
          </span>
          <label htmlFor={id} className="ma-label">
            {label}
            <span className="ma-hint">{hint}</span>
          </label>
        </div>
        <div className="ma-box">
          {prefix && <span className="ma-pre">{prefix}</span>}
          <input
            id={id}
            type="text"
            inputMode={inputMode}
            value={text}
            onChange={(event) => onText(event.target.value)}
            onBlur={onBlur}
            onKeyDown={(event) => { if (event.key === 'Enter') (event.target as HTMLInputElement).blur(); }}
          />
          {suffix && <span className="ma-suf">{suffix}</span>}
        </div>
      </div>

      <input
        type="range"
        aria-label={label}
        min={range.min}
        max={range.max}
        step={range.step}
        value={range.value}
        onChange={(event) => range.onChange(Number(event.target.value))}
        className="ma-range"
        style={track}
      />
      <div className="ma-ticks">
        {ticks.map((tick) => <span key={tick}>{tick}</span>)}
      </div>
      <div className="ma-chips">{presets}</div>
    </div>
  );
}

/** Numeric field state: committed value + free-typing text, clamped on blur. */
function useNumberField(initial: number, min: number, max: number, decimals: number, grouped = false) {
  const format = (v: number) => (grouped ? Math.round(v).toLocaleString('en-IN') : String(v));
  const [value, setValueRaw] = useState(initial);
  const [text, setText] = useState(format(initial));

  const clamp = (v: number) => {
    const bounded = Math.min(max, Math.max(min, Number.isFinite(v) ? v : initial));
    const factor = Math.pow(10, decimals);
    return Math.round(bounded * factor) / factor;
  };

  const setValue = (v: number) => {
    const next = clamp(v);
    setValueRaw(next);
    setText(format(next));
  };

  const onText = (input: string) => {
    const raw = input.replace(decimals > 0 ? /[^0-9.]/g : /[^0-9]/g, '');
    setText(grouped && raw ? Number(raw).toLocaleString('en-IN') : raw);
    const parsed = Number(raw);
    if (raw && Number.isFinite(parsed) && parsed >= min && parsed <= max) setValueRaw(parsed);
  };

  const onBlur = () => {
    const parsed = Number(text.replace(/[^0-9.]/g, ''));
    setValue(text.trim() === '' ? value : parsed);
  };

  return { value, text, setValue, onText, onBlur };
}

/* ───────────────────────── Plan chart ───────────────────────── */

function GoalChart({ rows, target }: { rows: PlanRow[]; target: number }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const gradientId = 'ma-area-' + useId().replace(/[^a-zA-Z0-9]/g, '');
  const [width, setWidth] = useState(900);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  useEffect(() => {
    const node = wrapRef.current;
    if (!node) return;
    const measure = () => setWidth(Math.max(node.clientWidth, 300));
    measure();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', measure);
      return () => window.removeEventListener('resize', measure);
    }
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const narrow = width < 560;
  const height = narrow ? 300 : 380;
  const padLeft = narrow ? 56 : 72;
  const padRight = 12;
  const padTop = 28;
  const padBottom = 40;
  const innerWidth = width - padLeft - padRight;
  const innerHeight = height - padTop - padBottom;

  const maxValue = Math.max(target, rows.reduce((max, row) => Math.max(max, row.value), 0));
  const gridStep = niceStep(maxValue / 5);
  const tickCount = Math.max(1, Math.ceil(maxValue / gridStep - 1e-9));
  const top = gridStep * tickCount || 1;
  const count = Math.max(rows.length, 1);
  const slot = innerWidth / count;
  const barWidth = Math.max(Math.min(slot * 0.58, 44), 1.5);
  const radius = barWidth > 10 ? 5 : 0;
  const labelEvery = Math.ceil(count / (narrow ? 6 : 12));

  const y = (value: number) => padTop + innerHeight - (value / top) * innerHeight;
  const x = (index: number) => padLeft + slot * index + slot / 2;
  const baseline = padTop + innerHeight;
  const linePoints = rows.map((row, index) => x(index).toFixed(1) + ',' + y(row.value).toFixed(1)).join(' ');
  const areaPath = rows.length
    ? 'M' + x(0) + ',' + baseline + ' L' + rows.map((row, index) => x(index) + ',' + y(row.value)).join(' L') + ' L' + x(rows.length - 1) + ',' + baseline + ' Z'
    : '';
  const targetY = y(target);

  const handlePointer = (clientX: number) => {
    const node = wrapRef.current;
    if (!node || !rows.length) return;
    const rect = node.getBoundingClientRect();
    const scale = width / rect.width;
    const index = Math.floor(((clientX - rect.left) * scale - padLeft) / slot);
    setHoverIndex(index >= 0 && index < rows.length ? index : null);
  };

  const active = hoverIndex !== null ? rows[hoverIndex] : null;
  const tooltipLeft = hoverIndex !== null ? Math.min(Math.max(x(hoverIndex), 130), width - 130) : 0;

  const topRounded = (bx: number, by: number, bw: number, bh: number, r: number) => {
    const rr = Math.min(r, bh, bw / 2);
    return 'M' + bx + ',' + (by + bh) + ' V' + (by + rr) + ' Q' + bx + ',' + by + ' ' + (bx + rr) + ',' + by +
      ' H' + (bx + bw - rr) + ' Q' + (bx + bw) + ',' + by + ' ' + (bx + bw) + ',' + (by + rr) + ' V' + (by + bh) + ' Z';
  };

  return (
    <div
      ref={wrapRef}
      className="ma-chart-box"
      onMouseMove={(event: ReactMouseEvent<HTMLDivElement>) => handlePointer(event.clientX)}
      onMouseLeave={() => setHoverIndex(null)}
      onTouchStart={(event: ReactTouchEvent<HTMLDivElement>) => handlePointer(event.touches[0].clientX)}
      onTouchMove={(event: ReactTouchEvent<HTMLDivElement>) => handlePointer(event.touches[0].clientX)}
      onTouchEnd={() => setHoverIndex(null)}
    >
      <svg viewBox={'0 0 ' + width + ' ' + height} role="img" aria-label="Year-wise goal SIP plan chart">
        <defs>
          <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={NAVY} stopOpacity={0.14} />
            <stop offset="100%" stopColor={NAVY} stopOpacity={0} />
          </linearGradient>
        </defs>

        {Array.from({ length: tickCount + 1 }, (_, i) => i).map((step) => {
          const value = gridStep * step;
          const gy = y(value);
          return (
            <g key={step}>
              <line x1={padLeft} x2={width - padRight} y1={gy} y2={gy} stroke={step ? '#EEF1F7' : '#C9D1E3'} strokeWidth={1} strokeDasharray={step ? '4 4' : undefined} />
              <text x={padLeft - 10} y={gy + 4} textAnchor="end" className="ma-axis">
                {step ? '₹' + formatAxisINR(value) : '0'}
              </text>
            </g>
          );
        })}

        {hoverIndex !== null && (
          <rect x={padLeft + slot * hoverIndex + 2} y={padTop} width={Math.max(slot - 4, 1)} height={innerHeight} rx={8} fill={NAVY} fillOpacity={0.06} />
        )}

        <path d={areaPath} fill={'url(#' + gradientId + ')'} />

        {rows.map((row, index) => {
          const cx = x(index);
          const bx = cx - barWidth / 2;
          const investedTop = y(row.totalInvested);
          const valueTop = y(row.value);
          const hasGrowth = investedTop - valueTop > 0.5;
          const dim = hoverIndex !== null && hoverIndex !== index;
          return (
            <g key={row.year} opacity={dim ? 0.55 : 1} style={{ transition: 'opacity .15s' }}>
              {hasGrowth ? (
                <>
                  <rect x={bx} y={investedTop} width={barWidth} height={baseline - investedTop} fill={NAVY} />
                  <path d={topRounded(bx, valueTop, barWidth, investedTop - valueTop, radius)} fill={LIME} />
                </>
              ) : (
                <path d={topRounded(bx, investedTop, barWidth, baseline - investedTop, radius)} fill={NAVY} />
              )}
              {index % labelEvery === 0 && (
                <text x={cx} y={height - padBottom + 24} textAnchor="middle" className="ma-axis x">{row.label}</text>
              )}
            </g>
          );
        })}

        <polyline points={linePoints} fill="none" stroke={DEEP} strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
        {rows.length <= 30 && rows.map((row, index) => (
          <circle key={'dot-' + index} cx={x(index)} cy={y(row.value)} r={hoverIndex === index ? 6.5 : 4} fill={hoverIndex === index ? LIME : '#fff'} stroke={DEEP} strokeWidth={2.5} />
        ))}

        <line x1={padLeft} x2={width - padRight} y1={targetY} y2={targetY} stroke="#5B8F22" strokeWidth={2} strokeDasharray="7 5" />
        <g transform={'translate(' + (padLeft + 8) + ',' + (targetY - 26) + ')'}>
          <rect width={narrow ? 118 : 142} height={20} rx={10} fill="#EFF8E2" stroke="#8DC63F" />
          <text x={10} y={14} className="ma-axis goal">{'Goal ₹' + formatShortINR(target)}</text>
        </g>
      </svg>

      {active && (
        <div
          className="ma-tip"
          style={{ left: (tooltipLeft / width) * 100 + '%', top: (y(active.value) / height) * 100 + '%', transform: 'translate(-50%, calc(-100% - 14px))' }}
        >
          <div className="ma-tip-head">
            <b>{active.label} · Year {active.year}</b>
            <span>₹ {formatINR(active.sipPerMonth)}/month</span>
          </div>
          <div className="ma-tip-row"><span><i className="ma-sw" style={{ background: '#6F8BE8' }} />Total invested</span><b>₹ {formatINR(active.totalInvested)}</b></div>
          <div className="ma-tip-row"><span><i className="ma-sw" style={{ background: LIME }} />Growth</span><b style={{ color: '#B5E07A' }}>₹ {formatINR(active.growth)}</b></div>
          <div className="ma-tip-row"><span><i className="ma-sw" style={{ background: '#fff' }} />Corpus value</span><b>₹ {formatINR(active.value)}</b></div>
          <div className="ma-tip-row"><span>Goal reached</span><b>{Math.min(100, Math.round((active.value / target) * 100))}%</b></div>
        </div>
      )}
    </div>
  );
}

/* ───────────────────────── Main component ───────────────────────── */

export default function GoalSipCalculator() {
  const goalId = useId();
  const yearsId = useId();
  const rateId = useId();
  const inflationId = useId();
  const topupId = useId();

  const goal = useNumberField(DEFAULTS.goal, GOAL_MIN, GOAL_MAX, 0, true);
  const years = useNumberField(DEFAULTS.years, 1, 100, 0);
  const rate = useNumberField(DEFAULTS.rate, 0, 25, 1);
  const inflation = useNumberField(DEFAULTS.inflation, 0, 25, 1);
  const topup = useNumberField(DEFAULTS.topup, 0, 100, 0);
  const [view, setView] = useState<'chart' | 'table'>('table');

  const plan = useMemo(() => {
    const Y = years.value;
    const R = rate.value / 100;
    const T = topup.value / 100;
    const target = goal.value * Math.pow(1 + inflation.value / 100, Y);

    // Instalments at the start of each month; annual return converted to an effective monthly rate.
    // `perYear` = value at year-end of ₹1 invested at the start of each of that year's 12 months.
    const rm = Math.pow(1 + R, 1 / 12) - 1;
    const perYear = rm === 0 ? 12 : ((Math.pow(1 + rm, 12) - 1) / rm) * (1 + rm);

    let unitTopUp = 0;
    let unitFlat = 0;
    for (let yr = 0; yr < Y; yr += 1) {
      const carry = Math.pow(1 + R, Y - yr - 1);
      unitTopUp += Math.pow(1 + T, yr) * perYear * carry;
      unitFlat += perYear * carry;
    }
    const firstSip = target / unitTopUp;
    const flatSip = target / unitFlat;

    const rows: PlanRow[] = [];
    const startYear = new Date().getFullYear() + 1;
    let value = 0;
    let totalInvested = 0;
    for (let yr = 0; yr < Y; yr += 1) {
      const sipPerMonth = firstSip * Math.pow(1 + T, yr);
      const investedThisYear = sipPerMonth * 12;
      totalInvested += investedThisYear;
      value = value * (1 + R) + sipPerMonth * perYear;
      rows.push({ year: yr + 1, label: startYear + yr, sipPerMonth, investedThisYear, totalInvested, value, growth: value - totalInvested });
    }

    const finalAmount = value;
    const growth = finalAmount - totalInvested;
    const lastSip = rows.length ? rows[rows.length - 1].sipPerMonth : firstSip;
    return { target, firstSip, flatSip, lastSip, totalInvested, growth, finalAmount, rows };
  }, [goal.value, years.value, rate.value, inflation.value, topup.value]);

  const animTarget = useAnimatedNumber(plan.target);
  const animFirst = useAnimatedNumber(plan.firstSip);
  const animInvested = useAnimatedNumber(plan.totalInvested);
  const animGrowth = useAnimatedNumber(plan.growth);
  const animFinal = useAnimatedNumber(plan.finalAmount);

  const investedShare = plan.finalAmount > 0 ? (plan.totalInvested / plan.finalAmount) * 100 : 100;
  const growthShare = 100 - investedShare;
  const multiple = (plan.finalAmount / (plan.totalInvested || 1)).toFixed(1);
  const inflationMultiple = (plan.target / goal.value).toFixed(1);
  const savingVsFlat = plan.flatSip > 0 ? Math.round((1 - plan.firstSip / plan.flatSip) * 100) : 0;
  const yearsText = plural(years.value, 'year');

  const resetAll = () => {
    goal.setValue(DEFAULTS.goal);
    years.setValue(DEFAULTS.years);
    rate.setValue(DEFAULTS.rate);
    inflation.setValue(DEFAULTS.inflation);
    topup.setValue(DEFAULTS.topup);
  };

  const handleDownload = () => {
    const rows = [
      ['MyAnmol Goal-based Top-up SIP Calculator'],
      ['Financial goal in today’s value (Rs)', goal.value],
      ['Investment period (years)', years.value],
      ['Expected return (% p.a.)', rate.value],
      ['Expected inflation (% p.a.)', inflation.value],
      ['SIP top-up (% p.a.)', topup.value],
      [],
      ['Targeted amount, inflation adjusted (Rs)', Math.round(plan.target)],
      ['Monthly SIP for the first year (Rs)', Math.round(plan.firstSip)],
      ['Total amount invested (Rs)', Math.round(plan.totalInvested)],
      ['Total growth (Rs)', Math.round(plan.growth)],
      ['Final amount (Rs)', Math.round(plan.finalAmount)],
      [],
      ['Year', 'Calendar year', 'SIP amount / month (Rs)', 'Invested amount / year (Rs)', 'Total invested amount (Rs)', 'Corpus value at year end (Rs)'],
      ...plan.rows.map((row) => [row.year, row.label, Math.round(row.sipPerMonth), Math.round(row.investedThisYear), Math.round(row.totalInvested), Math.round(row.value)]),
      [],
      ['Mutual fund investments are subject to market risks, read all scheme related documents carefully. Illustration only.'],
      ['Anmol Share Broking Pvt. Ltd. | ARN: 114893'],
    ];

    const csv = rows.map((row) => row.map((cell) => {
      const text = String(cell ?? '');
      return /[",]/.test(text) ? '"' + text.replace(/"/g, '""') + '"' : text;
    }).join(',')).join('\r\n');

    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'MyAnmol-Goal-SIP-Plan.csv';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 500);
  };

  const mailBody = [
    'My goal-based top-up SIP plan (MyAnmol)',
    '',
    'Goal in today’s value: ₹ ' + formatINR(goal.value),
    'Investment period: ' + yearsText,
    'Expected return: ' + rate.value + '% p.a. | Inflation: ' + inflation.value + '% p.a. | SIP top-up: ' + topup.value + '% p.a.',
    '',
    'Targeted amount (inflation adjusted): ₹ ' + formatINR(plan.target),
    'Monthly SIP for the first year: ₹ ' + formatINR(plan.firstSip),
    'Total amount invested: ₹ ' + formatINR(plan.totalInvested),
    'Total growth: ₹ ' + formatINR(plan.growth),
    'Final amount: ₹ ' + formatINR(plan.finalAmount),
    '',
    'Mutual fund investments are subject to market risks, read all scheme related documents carefully. Illustration only.',
  ].join('\n');
  const mailtoLink = 'mailto:?subject=' + encodeURIComponent('My goal SIP plan — MyAnmol') + '&body=' + encodeURIComponent(mailBody);

  const circumference = 2 * Math.PI * 80;
  const investedLength = circumference * (investedShare / 100);
  const investedArc = Math.max(investedLength - 3, 0);
  const growthArc = Math.max(circumference - investedLength - 3, 0);

  return (
    <div className="ma-sip">
      <style>{SIP_STYLES}</style>
      <div className="ma-wrap">

        {/* ── Hero ── */}
        <section className="ma-hero ma-rise">
          <div className="ma-dots" />
          <div className="ma-glow g1" />
          <div className="ma-glow g2" />
          <div className="ma-hero-grid">
            <div>
              <span className="ma-eyebrow dark">Goal planner</span>
              <h1 className="ma-h1">
                Goal-based Top-up SIP
                <span>Start small today. Step up every year. Reach your goal.</span>
              </h1>
              <p className="ma-hero-lead">
                Tell us what your goal costs today. We adjust it for inflation and work out the SIP to start with, topped up every year, to get you there on time.
              </p>
              <div className="ma-badges">
                <span className="ma-badge"><Icon name="shield" size={14} />AMFI-registered MFD</span>
                <span className="ma-badge"><Icon name="target" size={14} />Goal-mapped planning</span>
                <span className="ma-badge"><Icon name="sparkle" size={14} />ARN: 114893</span>
              </div>
            </div>

            <div className="ma-live">
              <div className="ma-live-label">Your goal plan</div>
              <div className="ma-live-text">
                <b>₹ {formatShortINR(goal.value)}</b> in today&rsquo;s money becomes <b>₹ {formatShortINR(plan.target)}</b> in {yearsText}. Start with
              </div>
              <div className="ma-live-value">₹ {formatINR(animFirst)}<small>/month</small></div>
              <div className="ma-live-steps">
                <span><Icon name="stairs" size={14} />+{topup.value}% every year</span>
                <span>Year {years.value}: ₹ {formatINR(plan.lastSip)}/month</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Calculator ── */}
        <div className="ma-calc">
          <div className="ma-card ma-inputs ma-rise" style={{ animationDelay: '80ms' }}>
            <div className="ma-inputs-head">
              <div>
                <h2 className="ma-h2sm">Plan your goal</h2>
                <p className="ma-sub">Drag a slider, type a value or pick a preset</p>
              </div>
              <button type="button" onClick={resetAll} className="ma-reset">
                <Icon name="reset" size={14} />Reset
              </button>
            </div>

            <SliderField
              id={goalId}
              step="01"
              icon="target"
              label="Your financial goal"
              hint="₹ in today's value"
              prefix="₹"
              text={goal.text}
              inputMode="numeric"
              onText={goal.onText}
              onBlur={goal.onBlur}
              range={{ min: 0, max: GOAL_STEPS, step: 1, value: goalToPos(goal.value), onChange: (pos) => goal.setValue(posToGoal(pos)) }}
              ticks={['₹1L', '₹10L', '₹1Cr', '₹10Cr', '₹100Cr']}
              presets={GOAL_PRESETS.map((preset) => (
                <Chip key={preset.value} active={goal.value === preset.value} onClick={() => goal.setValue(preset.value)}>{preset.label}</Chip>
              ))}
            />

            <SliderField
              id={yearsId}
              step="02"
              icon="calendar"
              label="Investment period"
              hint="Years until you need the money"
              suffix="years"
              text={years.text}
              inputMode="numeric"
              onText={years.onText}
              onBlur={years.onBlur}
              range={{ min: 1, max: 100, step: 1, value: years.value, onChange: years.setValue }}
              ticks={['1', '25', '50', '75', '100']}
              presets={YEAR_PRESETS.map((value) => (
                <Chip key={value} active={years.value === value} onClick={() => years.setValue(value)}>{value} yrs</Chip>
              ))}
            />

            <SliderField
              id={rateId}
              step="03"
              icon="trend"
              label="Expected rate of return"
              hint="% per annum"
              suffix="%"
              text={rate.text}
              inputMode="decimal"
              onText={rate.onText}
              onBlur={rate.onBlur}
              range={{ min: 0, max: 25, step: 0.1, value: rate.value, onChange: rate.setValue }}
              ticks={['0', '5%', '10%', '15%', '20%', '25%']}
              presets={RATE_PRESETS.map((preset) => (
                <Chip key={preset.label} active={rate.value === preset.rate} onClick={() => rate.setValue(preset.rate)}>{preset.label} · {preset.rate}%</Chip>
              ))}
            />

            <SliderField
              id={inflationId}
              step="04"
              icon="flame"
              label="Expected rate of inflation"
              hint="% per annum over the years"
              suffix="%"
              text={inflation.text}
              inputMode="decimal"
              onText={inflation.onText}
              onBlur={inflation.onBlur}
              range={{ min: 0, max: 25, step: 0.1, value: inflation.value, onChange: inflation.setValue }}
              ticks={['0', '5%', '10%', '15%', '20%', '25%']}
              presets={INFLATION_PRESETS.map((value) => (
                <Chip key={value} active={inflation.value === value} onClick={() => inflation.setValue(value)}>{value}%</Chip>
              ))}
            />

            <SliderField
              id={topupId}
              step="05"
              icon="stairs"
              label="SIP top-up"
              hint="% increase in your SIP every year"
              suffix="%"
              text={topup.text}
              inputMode="numeric"
              onText={topup.onText}
              onBlur={topup.onBlur}
              range={{ min: 0, max: 100, step: 1, value: topup.value, onChange: topup.setValue }}
              ticks={['0', '25%', '50%', '75%', '100%']}
              presets={TOPUP_PRESETS.map((value) => (
                <Chip key={value} active={topup.value === value} onClick={() => topup.setValue(value)}>{value === 0 ? 'No top-up' : value + '%'}</Chip>
              ))}
            />
          </div>

          {/* ── Results ── */}
          <div className="ma-results ma-rise" style={{ animationDelay: '160ms' }}>
            <div className="ma-fv">
              <div className="ma-dots" />
              <div className="ma-glow g3" />
              <div className="ma-fv-in">
                <div className="ma-fv-top">
                  <span className="ma-fv-label">Monthly SIP · first year</span>
                  <span className="ma-mult">+{topup.value}% / year</span>
                </div>
                <div className="ma-fv-sub">(Your starting SIP amount)</div>
                <div className="ma-fv-value ma-num">₹ {formatINR(animFirst)}</div>
                <div className="ma-fv-meta">to reach ₹ {formatINR(plan.target)} in {yearsText}</div>
                {topup.value > 0 && plan.flatSip > plan.firstSip && (
                  <div className="ma-compare">
                    <Icon name="down" size={14} />
                    <span><b>{savingVsFlat}% lower</b> than a flat SIP of ₹ {formatINR(plan.flatSip)}/month</span>
                  </div>
                )}
                <div className="ma-fv-actions">
                  <a href={mailtoLink} className="ma-btn-ghost"><Icon name="mail" size={16} />Email</a>
                  <button type="button" onClick={handleDownload} className="ma-btn-white"><Icon name="download" size={16} />Download</button>
                </div>
              </div>
            </div>

            <div className="ma-card ma-goalbox">
              <div className="ma-goalbox-row">
                <div>
                  <div className="ma-goalbox-k">Your targeted amount</div>
                  <div className="ma-goalbox-s">(Inflation adjusted)</div>
                </div>
                <div className="ma-goalbox-v">₹ {formatINR(animTarget)}</div>
              </div>
              <div className="ma-goalbox-bar">
                <div className="ma-goalbox-today" style={{ width: Math.max((goal.value / plan.target) * 100, 2) + '%' }} />
              </div>
              <div className="ma-goalbox-foot">
                <span><i className="ma-sw" style={{ background: NAVY }} />Today: ₹ {formatShortINR(goal.value)}</span>
                <span>{inflationMultiple}x by then · {yearsText}</span>
              </div>
            </div>

            <div className="ma-card ma-split">
              <div className="ma-donut-row">
                <div className="ma-donut">
                  <svg viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="80" fill="none" stroke="#F1F4FA" strokeWidth="24" />
                    <circle cx="100" cy="100" r="80" fill="none" stroke={NAVY} strokeWidth="24" strokeLinecap="round" strokeDasharray={investedArc + ' ' + circumference} style={{ transition: 'stroke-dasharray .45s ease' }} />
                    <circle cx="100" cy="100" r="80" fill="none" stroke={LIME} strokeWidth="24" strokeLinecap="round" strokeDasharray={growthArc + ' ' + circumference} strokeDashoffset={-investedLength} style={{ transition: 'stroke-dasharray .45s ease, stroke-dashoffset .45s ease' }} />
                  </svg>
                  <div className="ma-donut-mid">
                    <b>{multiple}x</b>
                    <small>YOUR MONEY</small>
                  </div>
                </div>

                <div className="ma-tiles">
                  <div className="ma-tile">
                    <div className="ma-tile-head">
                      <span><i className="ma-sw" style={{ background: NAVY }} />Total Amount Invested</span>
                      <span>{Math.round(investedShare)}%</span>
                    </div>
                    <div className="ma-tile-v">₹ {formatINR(animInvested)}</div>
                  </div>
                  <div className="ma-tile gr">
                    <div className="ma-tile-head">
                      <span><i className="ma-sw" style={{ background: LIME }} />Total Growth</span>
                      <span>{Math.round(growthShare)}%</span>
                    </div>
                    <div className="ma-tile-v">₹ {formatINR(animGrowth)}</div>
                  </div>
                </div>
              </div>
              <div className="ma-final">
                <span>Final amount</span>
                <b className="ma-num">₹ {formatINR(animFinal)}</b>
              </div>
            </div>
          </div>
        </div>

        {/* ── Year-wise plan ── */}
        <section className="ma-card ma-chart">
          <div className="ma-chart-head">
            <div>
              <h3 className="ma-h3">Goal based Top-up SIP Amount Invested Summary</h3>
              <p>What to invest each year, and how close you are to the goal.</p>
            </div>
            <div className="ma-seg" role="tablist">
              {(['table', 'chart'] as const).map((mode) => (
                <button key={mode} type="button" role="tab" aria-selected={view === mode} onClick={() => setView(mode)} className={view === mode ? 'on' : ''}>
                  <Icon name={mode} size={14} />{mode}
                </button>
              ))}
            </div>
          </div>

          <div className="ma-stats ma-stats-4">
            <div className="ma-stat"><div className="ma-stat-k">Years</div><div className="ma-stat-v">{years.value}</div></div>
            <div className="ma-stat"><div className="ma-stat-k">Invested</div><div className="ma-stat-v">₹{formatShortINR(plan.totalInvested)}</div></div>
            <div className="ma-stat gr"><div className="ma-stat-k">Growth</div><div className="ma-stat-v">₹{formatShortINR(plan.growth)}</div></div>
            <div className="ma-stat tot"><div className="ma-stat-k">Final amount</div><div className="ma-stat-v">₹{formatShortINR(plan.finalAmount)}</div></div>
          </div>

          {view === 'chart' ? (
            <>
              <div className="ma-legend">
                <span><i className="ma-sw" style={{ background: NAVY }} />Total invested</span>
                <span><i className="ma-sw" style={{ background: LIME }} />Growth</span>
                <span><i className="ma-line" />Corpus value</span>
                <span><i className="ma-line goal" />Goal</span>
              </div>
              <GoalChart rows={plan.rows} target={plan.target} />
            </>
          ) : (
            <div className="ma-table-wrap">
              <table className="ma-table">
                <thead>
                  <tr>
                    <th>Year</th>
                    <th className="r">SIP Amount / Month</th>
                    <th className="r">Invested Amount / Year</th>
                    <th className="r">Total Invested Amount</th>
                    <th className="r">Corpus Value</th>
                  </tr>
                </thead>
                <tbody>
                  {plan.rows.map((row) => (
                    <tr key={row.year}>
                      <td className="yr">Year {row.year}<span className="ma-yr-sub">{row.label}</span></td>
                      <td className="r inv">₹ {formatINR(row.sipPerMonth)}</td>
                      <td className="r">₹ {formatINR(row.investedThisYear)}</td>
                      <td className="r">₹ {formatINR(row.totalInvested)}</td>
                      <td className="r tv">
                        ₹ {formatINR(row.value)}
                        <span className="ma-progress"><span style={{ width: Math.min(100, (row.value / plan.target) * 100) + '%' }} /></span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* ── What is a goal-based top-up SIP ── */}
        <section className="ma-about">
          <div>
            <span className="ma-eyebrow">The basics</span>
            <h2 className="ma-h2">What is a <span>goal-based top-up SIP?</span></h2>
            <p className="ma-p">
              A goal-based SIP starts from the goal, not the amount. You decide what you are saving for and when you need it, and the plan works backwards to the monthly SIP that gets you there.
            </p>
            <div className="ma-callout">
              With a top-up, your SIP rises by a fixed percentage every year, so you can start lower and invest more as your income grows.
            </div>
            <ol className="ma-steps">
              {HOW_IT_WORKS.map((item, index) => (
                <li key={item.title}>
                  <span className="ma-step-num">{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <div className="ma-step-t">{item.title}</div>
                    <div className="ma-step-d">{item.text}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="ma-facts">
            {GOAL_FACTS.map((fact, index) => (
              <div key={fact.value} className={'ma-fact' + (fact.green ? ' green' : '') + (index % 2 === 1 ? ' stagger' : '')}>
                <div className="ma-fact-blob" />
                <span className="ma-fact-icon"><Icon name={fact.icon} /></span>
                <b className="ma-fact-v sm">{fact.value}</b>
                <span className="ma-fact-t">{fact.text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Benefits ── */}
        <section className="ma-benefits">
          <div className="ma-benefits-head">
            <div>
              <span className="ma-eyebrow">Why top-up SIPs work</span>
              <h2 className="ma-h2">Benefits of a goal-based top-up SIP</h2>
            </div>
            <p>Plan for what the goal will really cost, and let your investing grow as you do.</p>
          </div>

          <div className="ma-bgrid even">
            {BENEFITS.map((benefit, index) => (
              <div key={benefit.title} className={'ma-b' + (index === 0 ? ' featured' : index % 2 === 1 ? ' alt' : '')}>
                {index === 0 && <><div className="ma-dots" /><div className="ma-glow g4" /></>}
                <div className="ma-b-top">
                  <span className="ma-b-icon"><Icon name={benefit.icon} size={22} /></span>
                  <span className="ma-b-num">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <h4 className="ma-b-title">{benefit.title}</h4>
                <p className="ma-b-text">{benefit.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="ma-cta">
          <div className="ma-dots" />
          <div className="ma-glow g5" />
          <div className="ma-cta-ring" />
          <div className="ma-cta-in">
            <div>
              <h2>Put a plan behind your goal</h2>
              <p>Our advisors map every SIP to a specific goal and review it with you as life changes.</p>
            </div>
            <div className="ma-cta-btns">
              <a href="tel:+919742826665" className="ma-btn-lime"><Icon name="phone" size={16} />Talk to an advisor</a>
              <a href={mailtoLink} className="ma-btn-line">Email my plan<Icon name="arrow" size={16} /></a>
            </div>
          </div>
        </section>

        <p className="ma-disc">
          <b>Disclaimer:</b> Mutual fund investments are subject to market risks, read all scheme related documents carefully. This calculator is for illustration only. It assumes constant annual return and inflation rates, monthly SIP instalments made at the start of each month, and the SIP increased by the top-up percentage at the start of every year. Actual returns and inflation vary and are not guaranteed. Past performance is not indicative of future returns. Anmol Share Broking Pvt. Ltd. — AMFI-registered Mutual Fund Distributor, ARN: 114893.
        </p>
      </div>
    </div>
  );
}
