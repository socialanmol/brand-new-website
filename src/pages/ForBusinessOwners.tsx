import React, { useState } from "react";
import { Link, useOutletContext } from "react-router";

const FAQS_DATA = [
  {
    q: "Can an HUF invest in mutual funds?",
    a: "Yes. An HUF invests as a non-individual investor in its own name, using its own PAN and its own bank account. The Karta signs on the HUF's behalf and is recorded as the authorised signatory. Folios are held by the HUF, not by any member personally."
  },
  {
    q: "What do I need to start investing in the name of my HUF?",
    a: "An HUF PAN, a declaration by the Karta listing the coparceners, a bank account in the HUF's name, and completed KYC in the HUF's name with the Karta's own KYC and identity documents. Your CA usually prepares the declaration; we handle the KYC, folio setup and portfolio."
  },
  {
    q: "Can an HUF claim deductions under Section 80C and 80D?",
    a: "An HUF is eligible for several deductions, including 80C and 80D, but only under the regime that permits them. Since the new regime is now the default, whether these deductions are available to your HUF depends on the regime it is assessed under for that year. This is a decision to take with your CA, and we build the portfolio around whichever regime you choose."
  },
  {
    q: "Can an HUF open a PPF account?",
    a: "No. An HUF cannot open a PPF account in its own name. For long-term, low-volatility goals inside an HUF, debt and hybrid mutual funds are usually the practical alternatives, and we size that allocation against the HUF's own time horizon."
  },
  {
    q: "How much term insurance does a business owner actually need?",
    a: "More than the salaried thumb rule of ten to fifteen times income, in most cases. The calculation should add up your personal guarantees, outstanding term loans and CC utilisation, any unsecured borrowing, your family's ongoing expenses for the years they would need to stabilise, and specific goals such as education. We work the number out line by line rather than quoting a multiple."
  },
  {
    q: "Is a keyman insurance premium a deductible business expense?",
    a: "Keyman insurance premiums are generally treated as an allowable business expense where the policy is genuinely taken by the business on the life of a key person. In return, the proceeds are typically taxed as business income rather than being exempt. It is a business continuity tool, not a tax shelter, and your CA should confirm the treatment for your entity."
  },
  {
    q: "Where can a business park surplus cash instead of leaving it in the current account?",
    a: "It depends entirely on when you need the money back. Overnight and liquid funds suit money needed in days or weeks, ultra-short and low-duration funds suit a few months, and arbitrage funds are often used for surplus with a slightly longer runway. All carry market risk and none guarantee a return — the point is matching the fund's redemption profile to your actual payment calendar."
  },
  {
    q: "Can my company, LLP or partnership firm invest in mutual funds directly?",
    a: "Yes. Companies, LLPs and partnership firms can invest as non-individual investors. It requires KYC in the entity's name, a board resolution or authorised signatory list, an ultimate beneficial owner declaration and FATCA documentation. We manage that onboarding for you."
  },
  {
    q: "Do you meet clients in person in Bengaluru?",
    a: "Yes. Our office is in Jayanagar and we regularly meet business families across South Bengaluru, at our office or at yours. Reviews can also be done over video if that suits your schedule better."
  }
];

export default function ForBusinessOwners() {
  const { openGetStarted } = useOutletContext<{ openGetStarted: () => void }>();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="font-[var(--fs)] bg-white text-[#111827] antialiased min-h-screen">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#091540] via-[#0D1E52] to-[#1A3B9F] py-20 lg:py-28 text-white px-6">
        <div className="max-w-[1120px] mx-auto relative z-10">
          <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#8DC63F] block mb-4">
            For business owners &amp; HUFs
          </span>
          <h1 className="font-[var(--fd)] text-4xl sm:text-6xl font-bold tracking-tight mb-6 leading-tight max-w-[17ch]">
            Your business is growing. Is your family's wealth growing with it?
          </h1>
          <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed max-w-[62ch] mb-10">
            Most business families run one balance sheet and hope it covers everything. We help promoters, proprietors, partners and Kartas in Bengaluru separate business money from family money — and put mutual funds and insurance behind each one deliberately.
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
              See how we structure it
            </a>
          </div>

          <div className="pt-8 border-t border-white/15 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-white/75">
            <div><strong className="block text-[#8DC63F] font-bold text-sm mb-1">AMFI-registered</strong>Mutual Fund Distributor, ARN 114893</div>
            <div><strong className="block text-[#8DC63F] font-bold text-sm mb-1">IRDAI-licensed</strong>Life, health and general insurance advisory</div>
            <div><strong className="block text-[#8DC63F] font-bold text-sm mb-1">Jayanagar, Bengaluru</strong>In-person reviews, not just a portal login</div>
            <div><strong className="block text-[#8DC63F] font-bold text-sm mb-1">Save · Insure · Invest</strong>Goals mapped first, products chosen second</div>
          </div>
        </div>
      </section>

      {/* ── THE GAP ── */}
      <section className="py-20 bg-[#F8FAFE] px-6">
        <div className="max-w-[1120px] mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#1A3B9F] block mb-2">The gap we see most often</span>
          <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-bold text-[#091540] mb-3 max-w-[20ch]">
            Everything is in the business. Including the risk.
          </h2>
          <p className="text-sm sm:text-base text-gray-500 font-light max-w-[62ch] mb-12">
            These are the five patterns that show up again and again when we open the books of a first- or second-generation business family.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { tag: "Concentration", title: "One asset, one outcome", desc: "Working capital, retirement, the children's education and the family's security are all riding on the same business cycle. A slow year hits all four at once." },
              { tag: "Idle cash", title: "Surplus parked in the current account", desc: "Money kept aside for GST, advance tax or a supplier payment sits earning nothing, because a current account pays no interest and an FD locks it up." },
              { tag: "Exposure", title: "Personal guarantees, no personal cover", desc: "The CC limit and the term loan are guaranteed personally. If something happens to the promoter, the lender's claim reaches the family home before anything else does." },
              { tag: "No safety net", title: "No EPF, no gratuity, no pension", desc: "A salaried peer retires with three funded structures. A business owner retires with whatever the business is worth on the day they stop — assuming there is a buyer." },
              { tag: "Unused structure", title: "An HUF PAN that does nothing", desc: "The HUF was created years ago on a CA's advice. It holds one property, has no bank mandate in order, and has never been used as the separate assessee it legally is." },
              { tag: "Succession", title: "Nothing written down", desc: "No will, stale nominations, no clarity on who runs the business or who inherits what. The most expensive gap on this list, and the cheapest to close." },
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
            One family, three balance sheets
          </h2>
          <p className="text-sm sm:text-base text-gray-500 font-light max-w-[62ch] mb-12">
            You are not one investor. You are an individual, a business entity, and — if your family has an HUF — a third, separate assessee with its own PAN and its own tax slab.
          </p>

          <div className="overflow-x-auto border border-gray-200 rounded-2xl shadow-sm">
            <table className="w-full text-left text-xs sm:text-sm border-collapse bg-white">
              <thead className="bg-[#0D1E52] text-white">
                <tr>
                  <th className="p-4">What the money is for</th>
                  <th className="p-4">You, as an individual</th>
                  <th className="p-4">The business</th>
                  <th className="p-4">The HUF</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-[#4B5563]">
                {[
                  { what: "Household emergency reserve", ind: "Primary — 6 to 12 months of household costs", biz: "Keep separate", huf: "Not the right home" },
                  { what: "Working-capital buffer & tax provisioning", ind: "Keep separate", biz: "Primary — liquid, overnight and arbitrage funds", huf: "Not the right home" },
                  { what: "Seasonal or one-off surplus", ind: "After drawings", biz: "Primary — staged into the market, not dumped", huf: "Only if the source qualifies" },
                  { what: "Long-term equity for family goals", ind: "Yes — core SIP portfolio", biz: "Rarely appropriate", huf: "Yes — a second, independent portfolio" },
                  { what: "Tax-efficient investing", ind: "Own slab and own capital-gains exemption", biz: "Taxed as business income", huf: "A separate slab and a separate exemption" },
                  { what: "Life cover on the promoter", ind: "Personal term cover — sized to debt plus family need", biz: "Keyman and partner buy-sell cover", huf: "Can pay premiums for members" },
                  { what: "Health cover", ind: "Family floater you own, independent of the business", biz: "Group health for employees", huf: "Can fund cover for members" },
                  { what: "Retirement corpus", ind: "Primary — built outside the business", biz: "A sale is a hope, not a plan", huf: "Belongs to the family, not to you" },
                  { what: "Ancestral assets and family gifts", ind: "Splits the tax benefit", biz: "Not the right home", huf: "Primary — this is what an HUF is for" },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <th className="p-4 font-bold text-[#091540]">{row.what}</th>
                    <td className="p-4 text-emerald-700 font-semibold">{row.ind}</td>
                    <td className="p-4">{row.biz}</td>
                    <td className="p-4 text-[#1A3B9F] font-semibold">{row.huf}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-4 italic">
            Indicative structure only. The right split depends on your entity type, your regime choice and your CA's view — we build it with them, not around them.
          </p>
        </div>
      </section>

      {/* ── BUSINESS OWNERS SECTION ── */}
      <section className="py-20 bg-[#F8FAFE] px-6">
        <div className="max-w-[1120px] mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#1A3B9F] block mb-2">If you own the business</span>
          <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-bold text-[#091540] mb-12">
            Six things we fix for promoters and proprietors
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { tag: "01 · Cash", title: "Make idle money work between cycles", desc: "Overnight, liquid, ultra-short and arbitrage funds are built for money you will need in weeks or months." },
              { tag: "02 · Investing", title: "SIPs that survive a lumpy income", desc: "Your income is not a salary, so a fixed monthly debit is the wrong default. We set a base SIP you can hold through a bad quarter." },
              { tag: "03 · Protection", title: "Cover sized to your guarantees, not a thumb rule", desc: "Term cover for a business owner should account for personal guarantees, the CC limit, unsecured borrowings and family needs." },
              { tag: "04 · Continuity", title: "Keyman and partner buy-sell cover", desc: "If a founder or a key employee is lost, the business needs cash to survive the gap — and surviving partners need funds to buy out the family's stake." },
              { tag: "05 · People", title: "Group health and group term for your team", desc: "Group cover is one of the cheapest retention tools available to a small business, and it is a deductible business expense." },
              { tag: "06 · Exit", title: "Retirement and succession, written down", desc: "A retirement corpus built outside the business, a will, refreshed nominations, and a clear line on who takes over." },
            ].map((bo, i) => (
              <div key={i} className="bg-white border border-[rgba(26,59,159,0.12)] rounded-2xl p-8 shadow-sm">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#1A3B9F] block mb-2">{bo.tag}</span>
                <h3 className="font-[var(--fd)] text-xl font-bold text-[#091540] mb-3">{bo.title}</h3>
                <p className="text-xs sm:text-sm text-[#4B5563] font-light leading-relaxed">{bo.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HUF SECTION ── */}
      <section className="py-20 bg-white px-6">
        <div className="max-w-[1120px] mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#1A3B9F] block mb-2">If your family has an HUF</span>
          <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-bold text-[#091540] mb-3">
            A second taxpayer your family already owns
          </h2>
          <p className="text-sm sm:text-base text-gray-500 font-light max-w-[62ch] mb-12">
            A Hindu Undivided Family is a separate assessee under the Income-tax Act, with its own PAN, its own return, its own slab and its own capital-gains exemption.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-[#F8FAFE] border border-[rgba(26,59,159,0.12)] rounded-3xl p-8">
              <h3 className="font-[var(--fd)] text-xl font-bold text-[#091540] mb-6">What an HUF can do</h3>
              <ul className="space-y-3 text-sm text-[#4B5563] font-light">
                <li>• Hold and invest in mutual funds in its own name</li>
                <li>• File its own return and use its own basic exemption</li>
                <li>• Claim its own long-term capital gains exemption on equity</li>
                <li>• Claim deductions such as 80C and 80D</li>
                <li>• Pay life and health insurance premiums for members</li>
              </ul>
            </div>

            <div className="bg-[#091540] text-white rounded-3xl p-8 shadow-xl">
              <h3 className="font-[var(--fd)] text-xl font-bold text-[#8DC63F] mb-6">What an HUF cannot do</h3>
              <ul className="space-y-3 text-sm text-white/80 font-light">
                <li>• Open a PPF account in the HUF's own name</li>
                <li>• Claim Section 87A rebate available to individuals</li>
                <li>• Exist meaningfully on a PAN alone without a real corpus</li>
                <li>• Be used to route your salary or professional income</li>
                <li>• Be formed by every family — restricted by religion</li>
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
              Business owner and HUF FAQs
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

      {/* ── CLOSING CTA ── */}
      <section id="book" className="py-24 bg-gradient-to-br from-[#091540] via-[#0D1E52] to-[#1A3B9F] text-center text-white px-6">
        <div className="max-w-2xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#8DC63F] block mb-3">
            Start here
          </span>
          <h2 className="font-[var(--fd)] text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
            One conversation about where your money actually sits
          </h2>
          <p className="text-base text-white/80 font-light mb-10 max-w-lg mx-auto leading-relaxed">
            Bring your entity list and your current policies. We will map the gaps in the first meeting and tell you which ones cost you the most to leave open.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-[#8DC63F] hover:bg-[#9ED64A] text-[#091540] font-extrabold text-sm px-8 py-3.5 rounded-full shadow-lg transition-all"
            >
              Book a consultation
            </Link>
            <a
              href="tel:+919742826665"
              className="border border-white/30 hover:bg-white/10 text-white font-bold text-sm px-8 py-3.5 rounded-full transition-all"
            >
              Call us now!
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}