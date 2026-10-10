import React, { useState } from "react";
import { useOutletContext } from "react-router";

const FAQS_DATA = [
  {
    q: "I already have AGIF, NGIS or AFGIS cover. Do I still need a term plan?",
    a: "In most cases, yes. Group insurance is excellent value while you serve, but the cover available after retirement is at a significantly reduced sum assured, and it is tied to your service rather than to you. A personal term plan bought in your late twenties or thirties locks in a low premium for thirty or forty years and stays with you after the uniform comes off."
  },
  {
    q: "Do term insurance policies cover death in combat or war?",
    a: "This is the single most important question a serving person should ask, and the answer varies by insurer. Many retail term plans carry restrictions or exclusions around death attributable to war, warlike operations or active combat duty, and some insurers decline defence proposals or apply a loading. A few are meaningfully more accommodating than others. We will tell you exactly what a policy does and does not cover before you buy it, in writing."
  },
  {
    q: "Are armed forces personnel covered under NPS?",
    a: "Armed forces personnel are outside the National Pension System and continue under the defined-benefit pension arrangement, which is a significant advantage. Note that this does not extend to Agniveers under the Agnipath scheme, who receive a Seva Nidhi package instead of a pension. Certain defence-adjacent and civilian categories are treated differently, so confirm your own position with your record office."
  },
  {
    q: "What should an Agniveer do with the Seva Nidhi amount?",
    a: "The first step is to do nothing quickly. Park it in liquid or overnight funds while you decide, keep a clear emergency reserve, and only then commit to the next step — further education, a skill programme, a business, or an exam year with no income. It is the seed capital for a second career, and it is not replaceable. We help structure the drawdown so it lasts as long as you need it to."
  },
  {
    q: "What are the tax benefits available to Agniveers?",
    a: "The Agniveer Corpus Fund has its own treatment under the Income-tax Act — contributions attract a deduction under Section 80CCH, and the Seva Nidhi received on exit is exempt. Unlike most deductions, the 80CCH benefit is available under the new regime as well. Rules do change, so have your specific figures confirmed by a tax professional at the time of filing."
  },
  {
    q: "I have ECHS. Do I need a private health policy too?",
    a: "ECHS is a real and valuable benefit and we never suggest replacing it. The case for a private policy or top-up is about choice and access — the hospital you prefer, the city you have settled in, treatment without a referral chain, and cover for family members outside the dependent definition. A modest policy taken while you are still healthy is much easier to get than one taken at seventy."
  },
  {
    q: "How do I invest if I am posted to a field or high-altitude area?",
    a: "By setting it up so it does not need you. Automated SIPs from your salary account, a small number of funds rather than twenty, no strategy that depends on watching markets, and a mandate structure your spouse can operate. We complete the setup before you move and review it when you are on leave."
  },
  {
    q: "I was sold several LIC and endowment policies over the years. What do I do with them?",
    a: "Not all of them need to go. We work out the surrender value, the paid-up value and the effective return on each, and give you a plain verdict — continue, make it paid-up, or surrender — with the arithmetic shown. Sometimes an old policy with a good guaranteed rate is worth holding. Often it is not. Either way you see the numbers."
  },
  {
    q: "Can my spouse or family deal with you directly while I am posted out?",
    a: "Yes, and we prefer it. Your spouse is included in reviews by default and gets the same consolidated statement of what you hold and where. A plan only one person understands is not a plan."
  }
];

export default function ForArmedForces() {
  const { openGetStarted } = useOutletContext<{ openGetStarted: () => void }>();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="font-[var(--fs)] bg-white text-[#111827] antialiased min-h-screen">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#091540] via-[#0D1E52] to-[#1A3B9F] py-20 lg:py-28 text-white px-6">
        <div className="max-w-[1120px] mx-auto relative z-10">
          <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#8DC63F] block mb-4">
            For serving personnel, Agniveers &amp; veterans
          </span>
          <h1 className="font-[var(--fd)] text-4xl sm:text-6xl font-bold tracking-tight mb-6 leading-tight max-w-[18ch]">
            The uniform covers a great deal. It does not cover everything.
          </h1>
          <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed max-w-[64ch] mb-10">
            Defence service gives you a pension, a group insurance scheme and lifelong medical cover — advantages almost no civilian has. It also gives you a career that ends decades before theirs does. We help officers, JCOs, other ranks, Agniveers and veterans build the part of the plan the service does not provide.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <button
              type="button"
              onClick={openGetStarted}
              className="bg-[#8DC63F] hover:bg-[#9ED64A] text-[#091540] font-extrabold text-sm px-8 py-3.5 rounded-xl shadow-lg transition-all"
            >
              Book a consultation
            </button>
            <a
              href="#ledger"
              className="border border-white/30 hover:bg-white/10 text-white font-bold text-sm px-8 py-3.5 rounded-xl transition-all"
            >
              See what the service covers
            </a>
          </div>

          <div className="pt-8 border-t border-white/15 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-white/75">
            <div><strong className="block text-[#8DC63F] font-bold text-sm mb-1">AMFI-registered</strong>Mutual Fund Distributor, ARN 114893</div>
            <div><strong className="block text-[#8DC63F] font-bold text-sm mb-1">IRDAI-licensed</strong>Life, health and general insurance advisory</div>
            <div><strong className="block text-[#8DC63F] font-bold text-sm mb-1">Works from anywhere</strong>Reviews over video when you are posted out</div>
            <div><strong className="block text-[#8DC63F] font-bold text-sm mb-1">Family included</strong>Your spouse sits in every review, by default</div>
          </div>
        </div>
      </section>

      {/* ── THE GAP (What we see most often) ── */}
      <section className="py-20 bg-[#F8FAFE] px-6">
        <div className="max-w-[1120px] mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#1A3B9F] block mb-2">What we see most often</span>
          <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-bold text-[#091540] mb-3 max-w-[20ch]">
            Six gaps that show up again and again
          </h2>
          <p className="text-sm sm:text-base text-gray-500 font-light max-w-[60ch] mb-12">
            None of these come from carelessness. They come from a system that handles so much for you that the remaining pieces are easy to miss.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { tag: "Timeline", title: "Retirement at an age civilians call mid-career", desc: "Many PBOR leave in their late thirties, officers in their fifties. A pension starts, but so does a second working life of twenty or thirty years that nobody planned the money for." },
              { tag: "Mis-selling", title: "Endowment policies sold at the unit line", desc: "Agents know exactly where and when salaries are credited. The result is portfolios full of low-return, long-lock-in policies bought as 'tax saving'." },
              { tag: "Cover", title: "Group cover that shrinks the day you retire", desc: "AGIF, NGIS and AFGIS provide substantial cover while you serve. The post-retirement extension continues at a much smaller sum assured." },
              { tag: "Concentration", title: "Three plots and no portfolio", desc: "Land and flats bought across postings, often on AGIF or bank loans, held in cities you will never live in. Illiquid and hard to sell." },
              { tag: "Continuity", title: "A plan only one person understands", desc: "During a field or high-altitude posting, your spouse runs the household finances alone. If they do not know what exists, the plan has a single point of failure." },
              { tag: "Agnipath", title: "Four years, then a lump sum and no pension", desc: "An Agniveer exits in their early twenties with a Seva Nidhi package and no pension, no gratuity and no ECHS. What happens to that money decides the next decade." },
            ].map((g, i) => (
              <div key={i} className="bg-white border border-[rgba(26,59,159,0.12)] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#1A3B9F] block mb-2">{g.tag}</span>
                  <h3 className="font-[var(--fd)] text-lg font-bold text-[#091540] mb-2">{g.title}</h3>
                  <p className="text-xs sm:text-sm text-[#4B5563] font-light leading-relaxed">{g.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SIGNATURE LEDGER ── */}
      <section id="ledger" className="py-20 bg-white px-6">
        <div className="max-w-[1120px] mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#1A3B9F] block mb-2">The core idea</span>
          <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-bold text-[#091540] mb-3">
            What the service provides, and where it stops
          </h2>
          <p className="text-sm sm:text-base text-gray-500 font-light max-w-[62ch] mb-12">
            Almost every planning mistake we see in defence families comes from assuming a benefit continues when it does not. This is the honest map.
          </p>

          <div className="overflow-x-auto border border-gray-200 rounded-2xl shadow-sm">
            <table className="w-full text-left text-xs sm:text-sm border-collapse bg-white">
              <thead className="bg-[#0D1E52] text-white">
                <tr>
                  <th className="p-4">Need</th>
                  <th className="p-4">While you serve</th>
                  <th className="p-4">After you hang up the uniform</th>
                  <th className="p-4">What you must own yourself</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-[#4B5563]">
                {[
                  { need: "Monthly income", serve: "Pay, allowances and field concessions", after: "Pension — real, but a fraction of your last pay", own: "A second income or a corpus that bridges the drop" },
                  { need: "Medical care", serve: "Service hospitals for you and dependents", after: "ECHS, on a one-time contribution", own: "A private health policy or top-up for choice and access" },
                  { need: "Life cover", serve: "AGIF, NGIS or AFGIS group cover", after: "Extended scheme, at a much lower sum assured", own: "A personal term plan, bought young, that follows you out" },
                  { need: "Retirement savings", serve: "DSOP or AFPP Fund contributions", after: "Contributions stop at retirement", own: "A long-horizon equity portfolio started early in service" },
                  { need: "Housing", serve: "Married accommodation at your station", after: "Ends — you move to your own home", own: "A settlement plan for where you will actually live" },
                  { need: "Children's education", serve: "Education allowance and school concessions", after: "Largely ends", own: "A dated corpus — the big fees usually land after you retire" },
                  { need: "Emergency money", serve: "Unit support and AGIF loans", after: "No longer available on the same terms", own: "Six to twelve months of expenses, in liquid funds" },
                  { need: "Financial continuity", serve: "Not automatic", after: "Not automatic", own: "Updated nominations, a will, and a spouse who knows the plan" },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <th className="p-4 font-bold text-[#091540]">{row.need}</th>
                    <td className="p-4 text-emerald-700">{row.serve}</td>
                    <td className="p-4">{row.after}</td>
                    <td className="p-4 font-bold text-[#1A3B9F]">{row.own}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Career Arc Chart */}
          <div className="mt-12 bg-gradient-to-br from-[#091540] to-[#1A3B9F] rounded-3xl p-8 text-white shadow-xl">
            <svg viewBox="0 0 1100 260" role="img" className="w-full h-auto">
              <g stroke="rgba(255,255,255,.16)" strokeWidth="1">
                <line x1="60" y1="215" x2="1060" y2="215" />
              </g>
              <g fill="rgba(255,255,255,.55)" fontFamily="inherit" fontSize="13">
                <text x="60" y="240">Age 20</text>
                <text x="392" y="240">40</text>
                <text x="642" y="240">55</text>
                <text x="1010" y="240">85</text>
              </g>
              <rect x="60" y="60" width="835" height="26" rx="4" fill="rgba(255,255,255,.14)" />
              <text x="60" y="50" fill="rgba(255,255,255,.7)" fontSize="13">Civilian career — earning until 60 or beyond</text>
              <rect x="60" y="128" width="582" height="26" rx="4" fill="#8DC63F" />
              <rect x="642" y="128" width="418" height="26" rx="4" fill="rgba(141,198,63,0.3)" />
              <text x="60" y="118" fill="#8DC63F" fontSize="13">Service income</text>
              <text x="652" y="118" fill="rgba(255,255,255,.7)" fontSize="13">Pension, plus whatever you built</text>
            </svg>
            <p className="text-xs text-white/60 mt-4 italic">
              Illustrative. Retirement age varies widely by rank and commission — for many PBOR the gap opens far earlier than shown.
            </p>
          </div>
        </div>
      </section>

      {/* ── BY STAGE SECTION ── */}
      <section className="py-20 bg-[#F8FAFE] px-6">
        <div className="max-w-[1120px] mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#1A3B9F] block mb-2">Where you are right now</span>
          <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-bold text-[#091540] mb-12">
            Three very different planning problems
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { tag: "Serving", title: "Officers, JCOs and other ranks", desc: "Your advantage is time and a stable, predictable salary. The job is to convert that into a portfolio that runs on autopilot through field postings." },
              { tag: "Agniveer", title: "Four-year tenure under Agnipath", desc: "Your Seva Nidhi is not a windfall, it is seed capital for whatever comes next — further study, a skill, a business, or a competitive exam year." },
              { tag: "Veteran", title: "Retired, resettled or in a second career", desc: "Two income streams now, pension plus a job or business. How to invest a commutation or terminal lump sum, and how to turn a corpus into monthly income." },
            ].map((st, i) => (
              <div key={i} className="bg-white border border-[rgba(26,59,159,0.12)] rounded-2xl p-8 shadow-sm">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#1A3B9F] block mb-2">{st.tag}</span>
                <h3 className="font-[var(--fd)] text-xl font-bold text-[#091540] mb-3">{st.title}</h3>
                <p className="text-xs sm:text-sm text-[#4B5563] font-light leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT WE DO & WON'T DO ── */}
      <section className="py-20 bg-white px-6">
        <div className="max-w-[1120px] mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#1A3B9F] block mb-2">Straight talk</span>
          <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-bold text-[#091540] mb-12">
            What you will and will not hear from us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#F8FAFE] border border-[rgba(26,59,159,0.12)] rounded-3xl p-8">
              <h3 className="font-[var(--fd)] text-xl font-bold text-[#091540] mb-6">What we will do</h3>
              <ul className="space-y-4 text-sm text-[#4B5563] font-light">
                <li className="flex items-start gap-3">✓ Tell you when your existing policy is worth keeping</li>
                <li className="flex items-start gap-3">✓ Show the numbers behind every recommendation</li>
                <li className="flex items-start gap-3">✓ Work around your posting, your leave and your connectivity</li>
                <li className="flex items-start gap-3">✓ Plan for the second career, not just the pension</li>
                <li className="flex items-start gap-3">✓ Keep your spouse fully in the loop</li>
              </ul>
            </div>

            <div className="bg-[#091540] text-white rounded-3xl p-8 shadow-xl">
              <h3 className="font-[var(--fd)] text-xl font-bold text-[#8DC63F] mb-6">What we will not do</h3>
              <ul className="space-y-4 text-sm text-white/80 font-light">
                <li className="flex items-start gap-3">✕ Turn up at the unit line during salary week with one product</li>
                <li className="flex items-start gap-3">✕ Call an insurance policy a tax-saving investment</li>
                <li className="flex items-start gap-3">✕ Promise a return — nobody honest can</li>
                <li className="flex items-start gap-3">✕ Recommend a plan that needs you to monitor markets</li>
                <li className="flex items-start gap-3">✕ Use your service as a sales line</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ACCORDION ── */}
      <section className="py-20 bg-[#EEF2FB] px-6">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#1A3B9F] block mb-2">Questions we get asked</span>
            <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-bold text-[#091540]">
              Armed forces investment and insurance FAQs
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS_DATA.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="bg-white border border-[rgba(26,59,159,0.12)] rounded-2xl overflow-hidden shadow-sm">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#091540] cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className="text-lg text-[#8DC63F]">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-[#4B5563] font-light leading-relaxed border-t border-gray-100 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}