import React from "react";
import { Link } from "react-router";

const PILLARS = [
  {
    num: "01",
    title: "Investor first",
    desc: "The goal comes before the product. We map where a family wants to go, then choose instruments that get them there - never the other way round.",
  },
  {
    num: "02",
    title: "Clarity over complexity",
    desc: "Finance is made deliberately hard to follow. We translate it into plain language, so a decision is understood before it is signed.",
  },
  {
    num: "03",
    title: "Integrity, in the open",
    desc: "Full disclosure of what we are, what we are paid and what a product can and cannot do. Nothing material is left to the fine print.",
  },
  {
    num: "04",
    title: "Competence, certified",
    desc: "Qualified, registered distributors who keep learning. Credentials are the floor of this profession, not the ceiling.",
  },
  {
    num: "05",
    title: "Relationships that outlast products",
    desc: "A folio lasts years; a relationship should last generations. We stay through the reviews, the corrections and the claims.",
  },
  {
    num: "06",
    title: "Literacy as a service",
    desc: "Every conversation leaves the investor more informed than we found them - whether or not it ends in a transaction.",
  },
];

const INDIA_OUTLINE =
  "M295.4 85.0 L296.0 88.5 L293.0 90.2 L293.7 95.9 L287.6 94.2 L276.5 100.6 L276.8 105.9 L272.1 113.7 L271.6 118.2 L267.8 125.8 L261.1 123.7 L260.8 133.3 L258.9 136.4 L259.8 140.4 L255.6 142.6 L251.0 127.9 L248.7 127.9 L247.3 133.8 L242.6 129.0 L245.2 123.8 L249.1 123.2 L253.0 115.4 L248.1 113.8 L240.2 113.9 L232.0 112.7 L231.3 106.2 L227.2 105.8 L220.4 101.8 L217.4 108.0 L223.5 113.0 L218.2 116.4 L216.3 119.8 L221.6 122.3 L220.1 127.8 L223.1 134.8 L224.4 142.4 L223.2 145.8 L217.4 145.7 L206.8 147.6 L207.3 154.6 L202.8 160.0 L190.4 166.3 L180.9 177.2 L174.4 183.0 L165.9 189.1 L165.9 193.3 L161.6 195.6 L153.9 198.9 L149.9 199.4 L147.3 206.5 L149.1 218.5 L149.6 226.2 L146.0 235.0 L145.9 250.7 L141.5 251.2 L137.6 258.2 L140.2 261.3 L132.4 263.9 L129.5 270.2 L126.1 272.9 L118.0 264.2 L114.1 251.3 L110.8 241.9 L107.8 237.6 L103.2 228.7 L101.1 217.1 L99.6 211.3 L91.8 198.6 L88.3 180.6 L85.7 168.8 L85.8 157.6 L84.1 148.9 L71.7 154.4 L65.6 153.3 L54.5 142.1 L58.6 138.8 L56.0 135.1 L46.0 127.3 L51.7 121.1 L70.5 121.1 L68.8 113.2 L64.0 108.5 L63.1 101.3 L57.5 97.2 L66.9 87.5 L76.8 88.2 L85.8 78.5 L91.1 69.1 L99.4 59.8 L99.3 53.2 L106.6 47.8 L99.7 43.3 L96.7 37.0 L93.7 28.9 L97.9 24.9 L110.9 27.2 L120.4 25.8 L128.7 18.0 L137.8 28.8 L137.0 36.4 L140.4 41.1 L140.1 45.9 L134.0 44.6 L136.4 54.8 L144.8 60.7 L156.6 67.2 L151.2 71.4 L147.9 80.0 L156.2 83.5 L164.3 88.1 L175.4 93.3 L187.1 94.5 L192.1 99.2 L198.7 100.1 L209.0 102.2 L216.1 102.1 L217.1 98.4 L216.0 92.5 L216.6 88.5 L221.8 86.6 L222.6 93.9 L222.7 95.7 L230.5 99.2 L235.9 97.8 L243.1 98.4 L250.1 98.1 L250.7 92.5 L247.2 89.5 L254.1 88.3 L261.9 81.5 L271.8 75.6 L278.9 77.8 L285.0 73.9 L289.0 79.7 L286.1 83.6 L295.4 85.0 Z";

const HUBS = [
  { name: "Ludhiana", x: 111.7, y: 60.5, anchor: "end", dx: -9 },
  { name: "New Delhi", x: 123.3, y: 81.7, anchor: "start", dx: 9 },
  { name: "Jaipur", x: 111.1, y: 97.5, anchor: "end", dx: -9 },
  { name: "Dibrugarh", x: 274.7, y: 92.3, anchor: "end", dx: -9 },
  { name: "Bengaluru", x: 126.6, y: 226.5, anchor: "start", dx: 9 },
];

const OFFICES = [
  {
    city: "Bengaluru",
    state: "KARNATAKA",
    address: [
      "4th Floor, 39/1, 33rd Cross",
      "Road, Above Iyengar's",
      "Bakery, 4th T Block East",
      "Pattabhirama Nagar,",
      "Jayanagar, Bengaluru,",
      "Karnataka 560041",
    ],
    mapQuery: "39/1+33rd+Cross+Road+Jayanagar+4th+T+Block+Bengaluru+560041",
  },
  {
    city: "Jaipur",
    state: "RAJASTHAN",
    address: [
      "Second Floor, Plot No. 501",
      "Opposite Centre for",
      "Happiness, Rani Sati Nagar,",
      "Nirman Nagar, Ajmer Road,",
      "Jaipur 302019",
    ],
    mapQuery: "Plot+No+501+Rani+Sati+Nagar+Nirman+Nagar+Jaipur+302019",
  },
  {
    city: "New Delhi",
    state: "DELHI NCR",
    address: [
      "E-4, 2nd Floor",
      "Defence Colony, Main",
      "Ring Road",
      "New Delhi 110024",
    ],
    mapQuery: "Defence+Colony+Main+Ring+Road+New+Delhi+110024",
  },
  {
    city: "Ludhiana",
    state: "PUNJAB",
    address: [
      "B-16, 577/8-A",
      "Vishwakarma Street,",
      "Gill Road",
      "Ludhiana 141003",
    ],
    mapQuery: "Vishwakarma+Street+Gill+Road+Ludhiana+141003",
  },


  {
    city: "Dibrugarh",
    state: "ASSAM",
    address: [
      "No. 6, Prerna,",
      "Chowkidinghi,",
      "P.O. C.R. Building,",
      "Dibrugarh 786003",
    ],
    mapQuery: "Chowkidinghi+CR+Building+Dibrugarh+786003",
  },

];

export default function OurJourney() {
  return (
    <div className="font-[var(--fs)] bg-white text-[#111827] antialiased">
      {/* ── SECTION 1: WHY WE DO THIS ── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-[1180px] mx-auto px-6">
          <h1 className="font-[var(--fd)] text-4xl sm:text-6xl font-extrabold tracking-tight text-[#091540] mb-12">
            Why we do this
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Card Left: Where we serve / Investor */}
            <div className="bg-white border border-[rgba(26,59,159,0.18)] rounded-3xl p-8 sm:p-12 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#1A3B9F] block mb-4">
                  Where we serve
                </span>
                <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-extrabold text-[#091540] tracking-tight leading-tight mb-6">
                  To make every Indian an{" "}
                  <span className="text-[#1A3B9F]">informed</span> investor.
                </h2>
                <div className="space-y-4 text-sm sm:text-base text-[#4B5563] font-light leading-relaxed">
                  <p>
                    Households reach their financial goals when they are guided
                    by credible, qualified distributors - professionals with a
                    visible presence on the web, a brand of their own, and the
                    standing this work deserves.
                  </p>
                  <p>
                    When household savings are channelled into the right
                    instruments, two things grow together: the financial literacy
                    of a population, and the economy it belongs to.
                  </p>
                </div>
              </div>
            </div>

            {/* Card Right: Our Mission */}
            <div className="bg-white border border-[rgba(26,59,159,0.18)] rounded-3xl p-8 sm:p-12 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#1A3B9F] block mb-4">
                  Our mission
                </span>
                <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-extrabold text-[#091540] tracking-tight leading-tight mb-6">
                  To bring every stakeholder in Indian finance onto one platform.
                </h2>
                <p className="text-sm sm:text-base text-[#4B5563] font-light leading-relaxed mb-8">
                  Financial literacy is a social cause, an educational cause and a
                  business cause at once. We build the common ground where all
                  three meet - and where every party gains from the same outcome.
                </p>
              </div>

              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-[.16em] text-[#1A3B9F] block mb-3">
                  Who that includes
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {[
                    "Manufacturers",
                    "Financial Distributors",
                    "Investors at Large",
                    "Government & Regulators",
                    "Educational Bodies",
                  ].map((label, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-lg border border-[rgba(26,59,159,0.22)] bg-[#EFF8E2]/60 text-xs font-bold text-[#1A3B9F]"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: OPERATING PRINCIPLES (6 CARDS) ── */}
      <section className="py-14 sm:py-20 bg-[#F8FAFE] border-y border-[rgba(26,59,159,0.08)]">
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#1A3B9F] block mb-2">
              Our Core Philosophy
            </span>
            <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-bold text-[#091540] tracking-tight">
              Principles that guide our practice
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PILLARS.map((item) => (
              <div
                key={item.num}
                className="bg-white border-2 border-[#1A3B9F] rounded-3xl p-8 sm:p-10 shadow-sm hover:shadow-xl transition-all"
              >
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#1A3B9F] block mb-3">
                  {item.num}
                </span>
                <h3 className="font-[var(--fd)] text-2xl font-bold text-[#091540] tracking-tight mb-3">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-[15px] text-[#4B5563] font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: PAN-INDIA FOOTPRINT HERO ── */}
      <section className="py-16 sm:py-24 bg-[#091540] text-white relative overflow-hidden">
        <div className="max-w-[1180px] mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
            {/* Left Copy */}
            <div>
              <h2 className="font-[var(--fd)] text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight mb-4">
                Where ever you are, <br />
                <span className="text-[#8DC63F]">we are already there.</span>
              </h2>
              <p className="text-sm sm:text-base text-white/80 font-light leading-relaxed mb-8 max-w-lg">
                Goal-mapped financial planning{" "}
                <span className="text-[#8DC63F] font-semibold">
                  for families across India
                </span>{" "}
                - and for{" "}
                <span className="text-[#8DC63F] font-semibold">
                  Indians worldwide.
                </span>
              </p>

            </div>

            {/* Right Map Visual */}
            <div className="flex justify-center items-center">
              <div className="relative w-full max-w-[420px] bg-gradient-to-b from-[#0D1E52] to-[#091540] rounded-3xl p-5 sm:p-6 border border-white/10 shadow-2xl flex flex-col gap-3">
                <div className="flex justify-between items-center text-xs font-bold text-white/60">
                  <span>Pan-India Presence</span>
                  <span className="text-[#8DC63F]">5 Regional Hubs</span>
                </div>

                <svg
                  viewBox="0 0 342 291"
                  className="w-full h-auto"
                  role="img"
                  aria-label="Map of India with offices in Ludhiana, New Delhi, Jaipur, Dibrugarh, and Bengaluru"
                >
                  <path
                    d={INDIA_OUTLINE}
                    fill="rgba(141,198,63,0.14)"
                    stroke="#8DC63F"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                  {HUBS.map((hub) => (
                    <g key={hub.name}>
                      <circle cx={hub.x} cy={hub.y} r="8" fill="#8DC63F" opacity="0.28">
                        <animate attributeName="r" values="4;10;4" dur="2.6s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.4;0;0.4" dur="2.6s" repeatCount="indefinite" />
                      </circle>
                      <circle cx={hub.x} cy={hub.y} r="3.4" fill="#8DC63F" stroke="#091540" strokeWidth="1" />
                      <text
                        x={hub.x + hub.dx}
                        y={hub.y + 4}
                        textAnchor={hub.anchor}
                        fill="#ffffff"
                        fontSize="12"
                        fontWeight="700"
                        style={{ paintOrder: "stroke", stroke: "#091540", strokeWidth: 3.5 }}
                      >
                        {hub.name}
                      </text>
                    </g>
                  ))}
                </svg>

                <div className="text-[11px] text-white/50 text-center font-light border-t border-white/10 pt-3">
                  Advisory sessions conducted both physically at offices &amp; via secure video conferencing worldwide.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: OUR OFFICES ── */}
      <section className="py-16 sm:py-20 bg-[#091540] text-white border-t border-white/10">
        <div className="max-w-[1240px] mx-auto px-6">
          <span className="text-xs font-extrabold uppercase tracking-[.2em] text-[#8DC63F] block mb-8">
            Our Offices
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {OFFICES.map((off, idx) => (
              <div
                key={idx}
                className="bg-[#2D3A54]/60 border border-white/10 rounded-2xl p-5 flex flex-col justify-between hover:bg-[#2D3A54] transition-colors"
              >
                <div>
                  <h3 className="font-[var(--fd)] text-lg font-bold text-white mb-0.5">
                    {off.city},
                  </h3>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#8DC63F] block mb-4">
                    {off.state}
                  </span>

                  <div className="text-xs text-white/75 font-light leading-relaxed mb-6 space-y-0.5">
                    {off.address.map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                </div>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${off.mapQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-white/90 hover:text-[#8DC63F] inline-flex items-center gap-1 transition-colors"
                >
                  Get Directions →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}