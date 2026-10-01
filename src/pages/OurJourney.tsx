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
              <div className="relative w-full max-w-[420px] aspect-[4/5] bg-gradient-to-b from-[#0D1E52] to-[#091540] rounded-3xl p-6 border border-white/10 shadow-2xl flex flex-col justify-between">
                <div className="flex justify-between items-center text-xs font-bold text-white/60">
                  <span>Pan-India Presence</span>
                  <span className="text-[#8DC63F]">5 Regional Hubs</span>
                </div>

                {/* Conceptual Schematic Points */}
                <div className="relative w-full h-[280px]">
                  {/* Ludhiana */}
                  <div className="absolute top-[18%] left-[28%] flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#8DC63F] animate-ping" />
                    <span className="text-[11px] font-bold text-white whitespace-nowrap">
                      Ludhiana
                    </span>
                  </div>

                  {/* New Delhi */}
                  <div className="absolute top-[28%] left-[34%] flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#8DC63F]" />
                    <span className="text-[11px] font-bold text-white whitespace-nowrap">
                      New Delhi
                    </span>
                  </div>

                  {/* Jaipur */}
                  <div className="absolute top-[38%] left-[24%] flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#8DC63F]" />
                    <span className="text-[11px] font-bold text-white whitespace-nowrap">
                      Jaipur
                    </span>
                  </div>

                  {/* Dibrugarh */}
                  <div className="absolute top-[26%] right-[8%] flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#8DC63F]" />
                    <span className="text-[11px] font-bold text-white whitespace-nowrap">
                      Dibrugarh
                    </span>
                  </div>

                  {/* Bengaluru */}
                  <div className="absolute bottom-[16%] left-[38%] flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#8DC63F] animate-pulse" />
                    <span className="text-[11px] font-bold text-white whitespace-nowrap">
                      Bengaluru
                    </span>
                  </div>
                </div>

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