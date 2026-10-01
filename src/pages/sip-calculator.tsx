import { useEffect, useId, useMemo, useRef, useState } from 'react';
import type { CSSProperties, MouseEvent as ReactMouseEvent, ReactNode, TouchEvent as ReactTouchEvent } from 'react';

/*
 * MyAnmol SIP Calculator
 * Self-contained: all styling lives in the scoped stylesheet below (every class is prefixed `ma-`),
 * so colours, gradients and layout render the same with or without Tailwind.
 */

type ProjectionRow = { year: number; months: number; invested: number; growth: number; value: number };

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

const formatYears = (months: number) => {
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  const parts: string[] = [];
  if (years) parts.push(years + (years > 1 ? ' years' : ' year'));
  if (remainingMonths) parts.push(remainingMonths + (remainingMonths > 1 ? ' months' : ' month'));
  return parts.join(' ');
};

/** Smoothly tweens a number toward its target for count-up style result values. */
function useAnimatedNumber(target: number, duration = 450) {
  const [display, setDisplay] = useState(target);
  const fromRef = useRef(target);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const reduce = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
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

/* ───────────────────────── Icons ───────────────────────── */

const ICONS = {
  wallet: <><path d="M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0 0 4h14a2 2 0 0 1 2 2v3" /><path d="M3 5v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3" /><path d="M21 12h-4a2 2 0 0 0 0 4h4v-4Z" /></>,
  calendar: <><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" /></>,
  trend: <><path d="m22 7-8.5 8.5-5-5L2 17" /><path d="M16 7h6v6" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  download: <><path d="M12 4v11" /><path d="m7 10 5 5 5-5" /><path d="M5 20h14" /></>,
  phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z" />,
  reset: <><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" /></>,
  shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></>,
  target: <><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></>,
  sparkle: <path d="M12 3l1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z" />,
  repeat: <><path d="m17 2 4 4-4 4" /><path d="M3 11v-1a4 4 0 0 1 4-4h14" /><path d="m7 22-4-4 4-4" /><path d="M21 13v1a4 4 0 0 1-4 4H3" /></>,
  sliders: <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6" />,
  grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
  zap: <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" />,
  coins: <><circle cx="8" cy="8" r="6" /><path d="M18.1 10.4A6 6 0 1 1 10.3 18" /><path d="M7 6h1v4" /></>,
  pie: <><path d="M21.2 15.9A10 10 0 1 1 8 2.8" /><path d="M22 12A10 10 0 0 0 12 2v10Z" /></>,
  umbrella: <><path d="M22 12a10 10 0 0 0-20 0Z" /><path d="M12 12v8a2 2 0 0 0 4 0" /><path d="M12 2v1" /></>,
  receipt: <><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" /><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8M12 17.5v-11" /></>,
  layers: <><path d="m12 2 10 5-10 5L2 7l10-5Z" /><path d="m2 17 10 5 10-5" /><path d="m2 12 10 5 10-5" /></>,
  scale: <><path d="M12 3v18M7 21h10" /><path d="M3 7h18" /><path d="m6 7-3 7a3 3 0 0 0 6 0Z" /><path d="m18 7-3 7a3 3 0 0 0 6 0Z" /></>,
  chart: <><path d="M3 3v18h18" /><rect x="7" y="12" width="3" height="6" /><rect x="12" y="8" width="3" height="10" /><rect x="17" y="5" width="3" height="13" /></>,
  table: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M3 15h18M9 3v18" /></>,
  arrow: <><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></>,
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

const SIP_FACTS: Array<{ icon: IconName; value: string; text: string; green: boolean }> = [
  { icon: 'coins', value: '₹100', text: 'Minimum monthly SIP to get started', green: false },
  { icon: 'calendar', value: 'Monthly', text: 'or quarterly, on a date you choose', green: true },
  { icon: 'zap', value: 'Auto-debit', text: 'No cheques, no AMC office visits', green: true },
  { icon: 'shield', value: 'Zero', text: 'penalty to stop your SIP', green: false },
];

const HOW_IT_WORKS = [
  { title: 'Pick an amount', text: 'Choose a fixed sum and a date each month or quarter.' },
  { title: 'Auto-debit runs', text: 'The amount moves from your bank to the fund on that date.' },
  { title: 'Units accumulate', text: 'Each instalment buys units at that day’s NAV, and they compound.' },
];

const SIP_BENEFITS: Array<{ icon: IconName; title: string; text: string }> = [
  { icon: 'repeat', title: 'Builds a savings habit', text: 'You commit a fixed amount and invest it systematically every month or quarter, so investing becomes a habit.' },
  { icon: 'sliders', title: 'Flexibility', text: 'Starting or stopping a SIP is easy, and there is no penalty for closing it.' },
  { icon: 'grid', title: 'Wide choice', text: 'You get a wide range of mutual fund schemes across many asset management companies.' },
  { icon: 'zap', title: 'Convenient', text: 'No AMC visits or monthly cheques. Sign an auto-debit mandate once and the amount is deducted on your chosen SIP date.' },
  { icon: 'coins', title: 'Low investment amount', text: 'You can start a SIP in India with as little as ₹100 a month.' },
  { icon: 'pie', title: 'Diversification', text: 'An equity fund SIP spreads your risk across companies, sectors and markets. Investing on different dates in a month can spread it further.' },
  { icon: 'target', title: 'Helps achieve your goals', text: "Retirement, your children's higher education or marriage: set a target for each goal and size your monthly SIP to reach it." },
  { icon: 'umbrella', title: 'Free insurance', text: 'Some schemes and AMCs offer insurance cover of up to 100 times your SIP amount at no extra cost.' },
  { icon: 'receipt', title: 'Tax savings', text: 'A SIP in an ELSS scheme qualifies for deduction under Section 80C (old tax regime). Each instalment carries a 3-year lock-in.' },
  { icon: 'layers', title: 'Power of compounding', text: 'Starting early and investing regularly over a long period lets your returns earn returns of their own.' },
  { icon: 'scale', title: 'Rupee cost averaging', text: 'A fixed sum on a fixed schedule buys more units when the NAV is low and fewer when it is high.' },
];

const AMOUNT_PRESETS = [5000, 10000, 25000, 50000, 100000];
const YEAR_PRESETS = [5, 10, 15, 20, 25];
const RATE_PRESETS = [
  { label: 'Conservative', rate: 8 },
  { label: 'Balanced', rate: 12 },
  { label: 'Aggressive', rate: 15 },
];

const DEFAULTS = { amount: 25000, months: 120, rate: 12.5 };

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

/* ───────────────────────── Growth chart ───────────────────────── */

function SipGrowthChart({ rows }: { rows: ProjectionRow[] }) {
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
  const padLeft = narrow ? 52 : 68;
  const padRight = 12;
  const padTop = 20;
  const padBottom = 40;
  const innerWidth = width - padLeft - padRight;
  const innerHeight = height - padTop - padBottom;

  const maxValue = rows.reduce((max, row) => Math.max(max, row.value), 0);
  const gridStep = niceStep(maxValue / 4);
  const top = gridStep * 4 || 1;
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

  const handlePointer = (clientX: number) => {
    const node = wrapRef.current;
    if (!node || !rows.length) return;
    const rect = node.getBoundingClientRect();
    const scale = width / rect.width;
    const index = Math.floor(((clientX - rect.left) * scale - padLeft) / slot);
    setHoverIndex(index >= 0 && index < rows.length ? index : null);
  };

  const active = hoverIndex !== null ? rows[hoverIndex] : null;
  const tooltipLeft = hoverIndex !== null ? Math.min(Math.max(x(hoverIndex), 120), width - 120) : 0;

  // Rounded top corners for the upper segment of each stacked bar
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
      <svg viewBox={'0 0 ' + width + ' ' + height} role="img" aria-label="Year-wise SIP growth chart">
        <defs>
          <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={NAVY} stopOpacity={0.14} />
            <stop offset="100%" stopColor={NAVY} stopOpacity={0} />
          </linearGradient>
        </defs>

        {[0, 1, 2, 3, 4].map((step) => {
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
          const investedTop = y(row.invested);
          const valueTop = y(row.value);
          const hasGrowth = investedTop - valueTop > 0.5;
          const dim = hoverIndex !== null && hoverIndex !== index;
          return (
            <g key={row.year + '-' + row.months} opacity={dim ? 0.55 : 1} style={{ transition: 'opacity .15s' }}>
              {hasGrowth ? (
                <>
                  <rect x={bx} y={investedTop} width={barWidth} height={baseline - investedTop} fill={NAVY} />
                  <path d={topRounded(bx, valueTop, barWidth, investedTop - valueTop, radius)} fill={LIME} />
                </>
              ) : (
                <path d={topRounded(bx, investedTop, barWidth, baseline - investedTop, radius)} fill={NAVY} />
              )}
              {index % labelEvery === 0 && (
                <text x={cx} y={height - padBottom + 24} textAnchor="middle" className="ma-axis x">{row.year}</text>
              )}
            </g>
          );
        })}

        <polyline points={linePoints} fill="none" stroke={DEEP} strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
        {rows.length <= 30 && rows.map((row, index) => (
          <circle
            key={'dot-' + index}
            cx={x(index)}
            cy={y(row.value)}
            r={hoverIndex === index ? 6.5 : 4.5}
            fill={hoverIndex === index ? LIME : '#fff'}
            stroke={DEEP}
            strokeWidth={2.5}
          />
        ))}
      </svg>

      {active && (
        <div
          className="ma-tip"
          style={{ left: (tooltipLeft / width) * 100 + '%', top: (y(active.value) / height) * 100 + '%', transform: 'translate(-50%, calc(-100% - 14px))' }}
        >
          <div className="ma-tip-head">
            <b>{active.year}</b>
            <span>{formatYears(active.months)}</span>
          </div>
          <div className="ma-tip-row"><span><i className="ma-sw" style={{ background: '#6F8BE8' }} />Invested</span><b>₹ {formatINR(active.invested)}</b></div>
          <div className="ma-tip-row"><span><i className="ma-sw" style={{ background: LIME }} />Growth</span><b style={{ color: '#B5E07A' }}>₹ {formatINR(active.growth)}</b></div>
          <div className="ma-tip-row"><span><i className="ma-sw" style={{ background: '#fff' }} />Total value</span><b>₹ {formatINR(active.value)}</b></div>
        </div>
      )}
    </div>
  );
}

/* ───────────────────────── Main component ───────────────────────── */

export default function SipCalculator() {
  const amountId = useId();
  const monthsId = useId();
  const rateId = useId();

  const [monthlySip, setMonthlySip] = useState(DEFAULTS.amount);
  const [durationMonths, setDurationMonths] = useState(DEFAULTS.months);
  const [expectedReturn, setExpectedReturn] = useState(DEFAULTS.rate);

  const [monthlySipText, setMonthlySipText] = useState(DEFAULTS.amount.toLocaleString('en-IN'));
  const [durationText, setDurationText] = useState(String(DEFAULTS.months));
  const [rateText, setRateText] = useState(String(DEFAULTS.rate));
  const [view, setView] = useState<'chart' | 'table'>('chart');

  const projection = useMemo(() => {
    const p = monthlySip;
    const n = durationMonths;
    const monthlyRate = Math.pow(1 + expectedReturn / 100, 1 / 12) - 1;
    // Instalment at the start of each month, annual return compounded as an effective monthly rate
    const valueAt = (months: number) => monthlyRate === 0
      ? p * months
      : p * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);

    const futureValue = valueAt(n);
    const invested = p * n;
    const growth = futureValue - invested;
    const rows: ProjectionRow[] = [];
    const startingYear = new Date().getFullYear() + 1;

    // One bar per year; a final partial year (e.g. 125 months) gets its own bar
    for (let month = 12; month < n + 12; month += 12) {
      const capped = Math.min(month, n);
      const partialValue = valueAt(capped);
      rows.push({
        year: startingYear + Math.ceil(capped / 12) - 1,
        months: capped,
        invested: p * capped,
        growth: partialValue - p * capped,
        value: partialValue,
      });
    }

    return { invested, growth, futureValue, rows };
  }, [monthlySip, durationMonths, expectedReturn]);

  const animInvested = useAnimatedNumber(projection.invested);
  const animGrowth = useAnimatedNumber(projection.growth);
  const animFuture = useAnimatedNumber(projection.futureValue);

  const totalMultiple = (projection.futureValue / (projection.invested || 1)).toFixed(1);
  const investedShare = projection.futureValue > 0 ? (projection.invested / projection.futureValue) * 100 : 100;
  const growthShare = 100 - investedShare;

  const setAmount = (nextValue: number) => {
    const clamped = Math.min(10000000, Math.max(500, Number.isFinite(nextValue) ? nextValue : 500));
    setMonthlySip(clamped);
    setMonthlySipText(clamped.toLocaleString('en-IN'));
  };

  const setMonths = (nextValue: number) => {
    const clamped = Math.round(Math.min(999, Math.max(1, Number.isFinite(nextValue) ? nextValue : 12)));
    setDurationMonths(clamped);
    setDurationText(String(clamped));
  };

  const setRate = (nextValue: number) => {
    const clamped = Math.min(20, Math.max(5, Number.isFinite(nextValue) ? nextValue : 12));
    const rounded = Math.round(clamped * 10) / 10;
    setExpectedReturn(rounded);
    setRateText(String(rounded));
  };

  const resetAll = () => {
    setAmount(DEFAULTS.amount);
    setMonths(DEFAULTS.months);
    setRate(DEFAULTS.rate);
  };

  const handleDownload = () => {
    const rows = [
      ['MyAnmol SIP Calculator'],
      ['Monthly SIP (Rs)', monthlySip],
      ['Duration (months)', durationMonths],
      ['Expected return (% p.a.)', expectedReturn],
      [],
      ['Year', 'Months completed', 'Total invested (Rs)', 'Growth (Rs)', 'Total value (Rs)'],
      ...projection.rows.map((row) => [row.year, row.months, Math.round(row.invested), Math.round(row.growth), Math.round(row.value)]),
      [],
      ['Total SIP amount invested', Math.round(projection.invested)],
      ['Total growth', Math.round(projection.growth)],
      ['Total future value', Math.round(projection.futureValue)],
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
    anchor.download = 'MyAnmol-SIP-Projection.csv';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 500);
  };

  const mailBody = [
    'My SIP projection (MyAnmol SIP Calculator)',
    '',
    'Monthly SIP: ₹ ' + formatINR(monthlySip),
    'Duration: ' + durationMonths + ' months (' + formatYears(durationMonths) + ')',
    'Expected return: ' + expectedReturn + '% p.a.',
    '',
    'Total SIP amount invested: ₹ ' + formatINR(projection.invested),
    'Total growth: ₹ ' + formatINR(projection.growth),
    'Total future value: ₹ ' + formatINR(projection.futureValue),
    '',
    'Mutual fund investments are subject to market risks, read all scheme related documents carefully. Illustration only.',
  ].join('\n');
  const mailtoLink = 'mailto:?subject=' + encodeURIComponent('My SIP projection — MyAnmol') + '&body=' + encodeURIComponent(mailBody);

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
              <span className="ma-eyebrow dark">Investment tool</span>
              <h1 className="ma-h1">
                SIP Calculator
                <span>See your wealth grow, month by month.</span>
              </h1>
              <p className="ma-hero-lead">
                Estimate how your monthly SIP grows over time and see the impact of compounding on your long-term financial goals.
              </p>
              <div className="ma-badges">
                <span className="ma-badge"><Icon name="shield" size={14} />AMFI-registered MFD</span>
                <span className="ma-badge"><Icon name="target" size={14} />Goal-mapped planning</span>
                <span className="ma-badge"><Icon name="sparkle" size={14} />ARN: 114893</span>
              </div>
            </div>

            <div className="ma-live">
              <div className="ma-live-label">Your live projection</div>
              <div className="ma-live-text">
                <b>₹ {formatINR(monthlySip)}</b> a month for <b>{formatYears(durationMonths)}</b> at <b>{expectedReturn}%</b> could grow to
              </div>
              <div className="ma-live-value">₹ {formatShortINR(animFuture)}</div>
              <div className="ma-bar">
                <div style={{ width: investedShare + '%', background: 'rgba(255,255,255,.85)' }} />
                <div style={{ width: growthShare + '%', background: LIME }} />
              </div>
              <div className="ma-bar-legend">
                <span>Invested {Math.round(investedShare)}%</span>
                <span>Growth {Math.round(growthShare)}%</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Calculator ── */}
        <div className="ma-calc">
          <div className="ma-card ma-inputs ma-rise" style={{ animationDelay: '80ms' }}>
            <div className="ma-inputs-head">
              <div>
                <h2 className="ma-h2sm">Plan your SIP</h2>
                <p className="ma-sub">Drag a slider, type a value or pick a preset</p>
              </div>
              <button type="button" onClick={resetAll} className="ma-reset">
                <Icon name="reset" size={14} />Reset
              </button>
            </div>

            <SliderField
              id={amountId}
              step="01"
              icon="wallet"
              label="How much can you invest through monthly SIP?"
              hint="₹ per month"
              prefix="₹"
              text={monthlySipText}
              inputMode="numeric"
              onText={(value) => {
                const raw = value.replace(/[^0-9]/g, '');
                setMonthlySipText(raw ? Number(raw).toLocaleString('en-IN') : '');
                if (raw && Number(raw) >= 500 && Number(raw) <= 10000000) setMonthlySip(Number(raw));
              }}
              onBlur={() => setAmount(Number(monthlySipText.replace(/[^0-9]/g, '')) || monthlySip)}
              range={{ min: 500, max: 10000000, step: 500, value: monthlySip, onChange: setAmount }}
              ticks={['₹500', '₹25L', '₹50L', '₹75L', '₹1Cr']}
              presets={AMOUNT_PRESETS.map((amount) => (
                <Chip key={amount} active={monthlySip === amount} onClick={() => setAmount(amount)}>₹{formatShortINR(amount)}</Chip>
              ))}
            />

            <SliderField
              id={monthsId}
              step="02"
              icon="calendar"
              label="How many months will you continue the SIP?"
              hint={formatYears(durationMonths)}
              suffix="months"
              text={durationText}
              inputMode="numeric"
              onText={(value) => {
                const raw = value.replace(/[^0-9]/g, '');
                setDurationText(raw);
                if (raw && Number(raw) >= 1 && Number(raw) <= 999) setDurationMonths(Number(raw));
              }}
              onBlur={() => setMonths(Number(durationText) || durationMonths)}
              range={{ min: 1, max: 999, step: 1, value: durationMonths, onChange: setMonths }}
              ticks={['1', '250', '500', '750', '999']}
              presets={YEAR_PRESETS.map((years) => (
                <Chip key={years} active={durationMonths === years * 12} onClick={() => setMonths(years * 12)}>{years} yrs</Chip>
              ))}
            />

            <SliderField
              id={rateId}
              step="03"
              icon="trend"
              label="What rate of return do you expect?"
              hint="% per annum"
              suffix="%"
              text={rateText}
              inputMode="decimal"
              onText={(value) => {
                const raw = value.replace(/[^0-9.]/g, '');
                setRateText(raw);
                const parsed = Number(raw);
                if (raw && parsed >= 5 && parsed <= 20) setExpectedReturn(parsed);
              }}
              onBlur={() => setRate(Number(rateText) || expectedReturn)}
              range={{ min: 5, max: 20, step: 0.1, value: expectedReturn, onChange: setRate }}
              ticks={['5%', '7.5%', '10%', '12.5%', '15%', '17.5%', '20%']}
              presets={RATE_PRESETS.map((preset) => (
                <Chip key={preset.label} active={expectedReturn === preset.rate} onClick={() => setRate(preset.rate)}>
                  {preset.label} · {preset.rate}%
                </Chip>
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
                  <span className="ma-fv-label">Total future value</span>
                  <span className="ma-mult">{totalMultiple}x your money</span>
                </div>
                <div className="ma-fv-sub">(Your SIP Investment Amount + Growth)</div>
                <div className="ma-fv-value ma-num">₹ {formatINR(animFuture)}</div>
                <div className="ma-fv-meta">in {formatYears(durationMonths)} at {expectedReturn}% p.a.</div>
                <div className="ma-fv-actions">
                  <a href={mailtoLink} className="ma-btn-ghost"><Icon name="mail" size={16} />Email</a>
                  <button type="button" onClick={handleDownload} className="ma-btn-white"><Icon name="download" size={16} />Download</button>
                </div>
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
                    <b>{totalMultiple}x</b>
                    <small>YOUR MONEY</small>
                  </div>
                </div>

                <div className="ma-tiles">
                  <div className="ma-tile">
                    <div className="ma-tile-head">
                      <span><i className="ma-sw" style={{ background: NAVY }} />Total SIP Amount Invested</span>
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
            </div>
          </div>
        </div>

        {/* ── SIP Growth Chart ── */}
        <section className="ma-card ma-chart">
          <div className="ma-chart-head">
            <div>
              <h3 className="ma-h3">Systematic Investment Plan (SIP) Growth Chart</h3>
              <p>Year-by-year view of what you put in and what compounding adds.</p>
            </div>
            <div className="ma-seg" role="tablist">
              {(['chart', 'table'] as const).map((mode) => (
                <button key={mode} type="button" role="tab" aria-selected={view === mode} onClick={() => setView(mode)} className={view === mode ? 'on' : ''}>
                  <Icon name={mode} size={14} />{mode}
                </button>
              ))}
            </div>
          </div>

          <div className="ma-stats">
            <div className="ma-stat"><div className="ma-stat-k">Invested</div><div className="ma-stat-v">₹{formatShortINR(projection.invested)}</div></div>
            <div className="ma-stat gr"><div className="ma-stat-k">Growth</div><div className="ma-stat-v">₹{formatShortINR(projection.growth)}</div></div>
            <div className="ma-stat tot"><div className="ma-stat-k">Total value</div><div className="ma-stat-v">₹{formatShortINR(projection.futureValue)}</div></div>
          </div>

          {view === 'chart' ? (
            <>
              <div className="ma-legend">
                <span><i className="ma-sw" style={{ background: NAVY }} />SIP Investment</span>
                <span><i className="ma-sw" style={{ background: LIME }} />Growth</span>
                <span><i className="ma-line" />Total SIP Value</span>
              </div>
              <SipGrowthChart rows={projection.rows} />
            </>
          ) : (
            <div className="ma-table-wrap">
              <table className="ma-table">
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>Duration</th>
                    <th className="r">Invested</th>
                    <th className="r">Growth</th>
                    <th className="r">Total value</th>
                  </tr>
                </thead>
                <tbody>
                  {projection.rows.map((row) => (
                    <tr key={row.year + '-' + row.months}>
                      <td className="yr">{row.year}</td>
                      <td className="dur">{formatYears(row.months)}</td>
                      <td className="r inv">₹ {formatINR(row.invested)}</td>
                      <td className="r gr">₹ {formatINR(row.growth)}</td>
                      <td className="r tv">₹ {formatINR(row.value)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* ── What is SIP ── */}
        <section className="ma-about">
          <div>
            <span className="ma-eyebrow">The basics</span>
            <h2 className="ma-h2">What is SIP <span>(Systematic Investment Plan)?</span></h2>
            <p className="ma-p">
              A SIP is a facility offered by mutual funds that helps investors invest regularly, one step at a time. It works much like a recurring deposit with a bank or post office, where you put in a small amount every month.
            </p>
            <div className="ma-callout">
              The difference: with mutual funds, your money is invested in the market. You can start with as little as ₹100, monthly or quarterly.
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
            {SIP_FACTS.map((fact, index) => (
              <div key={fact.value} className={'ma-fact' + (fact.green ? ' green' : '') + (index % 2 === 1 ? ' stagger' : '')}>
                <div className="ma-fact-blob" />
                <span className="ma-fact-icon"><Icon name={fact.icon} /></span>
                <b className="ma-fact-v">{fact.value}</b>
                <span className="ma-fact-t">{fact.text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Benefits of SIP ── */}
        <section className="ma-benefits">
          <div className="ma-benefits-head">
            <div>
              <span className="ma-eyebrow">Why SIP works</span>
              <h2 className="ma-h2">Benefits of SIP</h2>
            </div>
            <p>Eleven reasons disciplined, regular investing tends to beat waiting for the “right time”.</p>
          </div>

          <div className="ma-bgrid">
            {SIP_BENEFITS.map((benefit, index) => (
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
              <h2>Ready to start your SIP?</h2>
              <p>Our advisors map every SIP to your specific financial goals before recommending any fund.</p>
            </div>
            <div className="ma-cta-btns">
              <a href="tel:+919742826665" className="ma-btn-lime"><Icon name="phone" size={16} />Talk to an advisor</a>
              <a href={mailtoLink} className="ma-btn-line">Email my projection<Icon name="arrow" size={16} /></a>
            </div>
          </div>
        </section>

        <p className="ma-disc">
          <b>Disclaimer:</b> Mutual fund investments are subject to market risks, read all scheme related documents carefully. This calculator is for illustration only and assumes a constant annual return with monthly investments made at the start of each month. Actual returns vary and are not guaranteed. Past performance is not indicative of future returns. Anmol Share Broking Pvt. Ltd. — AMFI-registered Mutual Fund Distributor, ARN: 114893.
        </p>
      </div>
    </div>
  );
}