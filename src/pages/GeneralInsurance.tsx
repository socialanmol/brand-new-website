import { useState } from 'react';
import { useOutletContext } from 'react-router';

type GeneralInsuranceContext = {
  openGetStarted: () => void;
};

/* ── shared design tokens (mirrors CSS vars) ── */
const navy = '#1A3B9F';
const navyDark = '#0D1E52';
const navyDeep = '#091540';
const lime = '#8DC63F';
const ink = '#111827';
const inkMid = '#374151';
const inkSoft = '#6B7280';
const tint = '#F8FAFE';
const greenTint = '#EFF8E2';

const faqs = [
  { q: 'Is general insurance mandatory in India?', a: 'Only third-party motor insurance is legally mandatory, under the Motor Vehicles Act, 1988. Driving without it is an offence. Home and travel insurance are optional, though home loan lenders usually require property cover and several visa regimes require a minimum level of travel medical cover.' },
  { q: 'How long does a general insurance policy last?', a: 'Most general insurance policies run for a fixed short term and are then renewed. Motor policies typically run one year for own-damage cover. Home policies commonly run one to five years. Travel policies run for the length of a single trip, or a year for a multi-trip plan.' },
  { q: 'Can I claim on two policies for the same loss?', a: "You can hold two policies covering the same asset, but general insurance is indemnity-based, so you cannot profit from a loss. Where two policies cover the same event, the insurers share the claim in proportion to their sums insured. You recover the loss once, not twice." },
  { q: 'What is not covered under general insurance?', a: "Common exclusions include normal wear and tear, deliberate damage, and consequential losses. Motor policies exclude driving without a valid licence or under the influence of alcohol. Travel policies frequently exclude pre-existing medical conditions unless declared and accepted." },
  { q: 'Does home insurance cover a rented property?', a: "It depends on who is buying it. A landlord insures the structure. A tenant insures their own contents. Neither policy covers the other's interest automatically — a tenant relying on the landlord's cover is usually uninsured for their own belongings." },
  { q: 'How much travel insurance cover do I need?', a: "Start with the destination's requirement, then check whether it is realistic. Schengen visas require at least €30,000 of medical cover. For the United States, where treatment costs are substantially higher, a materially larger sum insured is usually appropriate." },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div onClick={() => setOpen(o => !o)} style={{ borderBottom: '1px solid rgba(0,0,0,.08)', cursor: 'pointer' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, padding: '18px 0' }}>
        <span style={{ fontFamily: 'var(--fd)', fontSize: 16, fontWeight: 700, color: ink, lineHeight: 1.4 }}>{q}</span>
        <span style={{ color: lime, fontFamily: 'var(--fs)', fontWeight: 800, fontSize: 20, lineHeight: 1, flexShrink: 0, transition: 'transform .2s', transform: open ? 'rotate(45deg)' : 'none' }}>+</span>
      </div>
      {open && <p style={{ fontSize: 14.5, lineHeight: 1.8, color: inkMid, fontWeight: 300, paddingBottom: 18, maxWidth: '80ch' }}>{a}</p>}
    </div>
  );
}

function Over({ label }: { label: string }) {
  return <span style={{ fontFamily: 'var(--fs)', fontSize: 11, fontWeight: 800, letterSpacing: '.16em', textTransform: 'uppercase', color: lime, display: 'block', marginBottom: 10 }}>{label}</span>;
}

function Sec2({ label }: { label: string }) {
  return <h2 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(22px,2.8vw,30px)', fontWeight: 700, letterSpacing: '-.02em', color: ink, marginBottom: 14 }}>{label}</h2>;
}

export default function GeneralInsurance() {
  const { openGetStarted } = useOutletContext<GeneralInsuranceContext>();
  return (
    <div style={{ fontFamily: 'var(--fs)' }}>

      {/* HERO */}
      <section style={{ background: `linear-gradient(135deg,${navyDeep} 0%,${navyDark} 50%,${navy} 100%)`, padding: 'clamp(60px,7vw,88px) 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '0%', left: '50%', width: 600, height: 600, borderRadius: '50%', background: `radial-gradient(circle,rgba(141,198,63,.18),transparent 65%)`, filter: 'blur(60px)', transform: 'translate(-50%,-50%)', pointerEvents: 'none' }} />
        {/* grid */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: .04 }} xmlns="http://www.w3.org/2000/svg">
          <defs><pattern id="g2" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="1"/></pattern></defs>
          <rect width="100%" height="100%" fill="url(#g2)" />
        </svg>
        <div className="max-w-[720px] mx-auto px-6 relative" style={{ zIndex: 1 }}>
          <div style={{ width: 72, height: 72, borderRadius: 20, background: 'rgba(141,198,63,.14)', border: '1px solid rgba(141,198,63,.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, margin: '0 auto 20px' }}>🧭</div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(141,198,63,.15)', border: '1px solid rgba(141,198,63,.35)', borderRadius: 100, padding: '5px 14px', marginBottom: 18 }}>
            <span style={{ fontFamily: 'var(--fs)', fontSize: 11, fontWeight: 800, letterSpacing: '.12em', textTransform: 'uppercase', color: lime }}>Insurance</span>
          </div>
          <h1 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(32px,5vw,52px)', fontWeight: 900, letterSpacing: '-.03em', color: '#fff', marginBottom: 20, lineHeight: 1.1 }}>General Insurance<br /><span style={{ color: lime }}>in India</span></h1>
          <p style={{ fontSize: 17, lineHeight: 1.8, color: 'rgba(255,255,255,.82)', fontWeight: 300, maxWidth: '58ch', margin: '0 auto' }}>
            General insurance covers what you own and specific risks you face — your vehicle, your home, or a trip — rather than your life or your medical bills. In India, only third-party motor cover is legally mandatory.
          </p>
        </div>
      </section>

      {/* WHAT IT COVERS */}
      <section style={{ padding: 'clamp(48px,6vw,72px) 0', background: '#fff' }}>
        <div className="max-w-[1000px] mx-auto px-6">
          <div style={{ maxWidth: 720, marginBottom: 28 }}>
            <Over label="The basics" />
            <Sec2 label="What does general insurance actually cover?" />
          </div>
          <p style={{ fontSize: 15.5, lineHeight: 1.85, color: inkMid, fontWeight: 300, marginBottom: 14 }}>
            General insurance is an umbrella term for every policy that protects an asset or an event rather than a person's life or health. In practice, for most households in India it comes down to three products: motor, home and travel.
          </p>
          <p style={{ fontSize: 15.5, lineHeight: 1.85, color: inkMid, fontWeight: 300, marginBottom: 14 }}>
            The structure differs from life insurance in two important ways. First, the term is short — a general insurance policy usually runs for one year, and lapses if you do not renew it. Second, the payout is indemnity-based: you are compensated for the actual loss, up to the sum insured, not a fixed sum on a defined event.
          </p>
          <p style={{ fontSize: 15.5, lineHeight: 1.85, color: inkMid, fontWeight: 300 }}>
            Life cover is about protecting people who depend on your income. General insurance is about protecting the things that would be expensive to replace, and the events that would be expensive to absorb.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
            {[
              { icon: '🚗', title: 'Motor', body: "Covers your vehicle and your liability to others. Third-party cover is required by law; own-damage cover protects your own car. Premium depends largely on the vehicle's insured declared value." },
              { icon: '🏠', title: 'Home', body: "Covers the building, the contents, or both. IRDAI's Bharat Griha Raksha gives a common baseline across insurers, making comparing quotes considerably easier." },
              { icon: '✈️', title: 'Travel', body: 'Covers medical emergencies abroad, trip cancellation, baggage loss and delays. Medical cover is the part that matters most — treatment costs overseas are the single largest risk on most trips.' },
            ].map(c => (
              <div key={c.title} style={{ background: '#fff', border: `1px solid rgba(26,59,159,.12)`, borderRadius: 20, padding: 24, borderTop: `3px solid ${lime}` }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{c.icon}</div>
                <h3 style={{ fontFamily: 'var(--fd)', fontSize: 18, fontWeight: 700, color: ink, marginBottom: 8 }}>{c.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: inkSoft, fontWeight: 300 }}>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TABLE */}
      <section style={{ padding: 'clamp(48px,6vw,72px) 0', background: tint }}>
        <div className="max-w-[1000px] mx-auto px-6">
          <div style={{ maxWidth: 720, marginBottom: 28 }}>
            <Over label="At a glance" />
            <Sec2 label="Motor, home and travel — compared" />
          </div>
          <div style={{ overflowX: 'auto', borderRadius: 20, border: '1px solid rgba(26,59,159,.1)', boxShadow: '0 10px 40px rgba(26,59,159,.06)', background: '#fff' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', minWidth: 640 }}>
              <thead>
                <tr>
                  {['', 'Motor', 'Home', 'Travel'].map((h, i) => (
                    <th key={i} style={{ background: navyDark, color: '#fff', fontSize: 12, fontWeight: 700, letterSpacing: '.04em', textTransform: 'uppercase', padding: '14px 18px', textAlign: 'left' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Mandatory?', 'Required under Motor Vehicles Act, 1988', 'Optional — lenders often require it for home loans', 'Optional — some visa regimes require minimum medical cover'],
                  ["Covers", 'Vehicle damage, theft, third-party liability', 'Structure, contents, fire, theft, natural disasters', 'Medical emergencies, cancellation, lost baggage, delays'],
                  ['Typical term', '1 year, renewable', '1–5 years, renewable', 'Trip duration, or annual multi-trip'],
                  ['Claim trigger', 'Accident, theft, damage', 'Fire, theft, natural disaster, structural damage', 'Medical event, cancellation, baggage loss, delay'],
                  ['Sum insured set by', 'Insured declared value of the vehicle', 'Rebuild cost of structure; replacement cost of contents', 'Chosen cover level, often set by destination requirements'],
                  ['Renewal matters because', 'No-claim bonus accumulates and is lost on a lapse', 'Cover should follow current rebuild cost, not purchase price', 'Each trip needs cover in force before departure'],
                ].map((row, ri) => (
                  <tr key={ri} style={{ background: ri % 2 === 0 ? '#fff' : tint }}>
                    <td style={{ padding: '13px 18px', fontSize: 13.5, fontWeight: 700, color: ink, borderBottom: '1px solid rgba(0,0,0,.05)' }}>{row[0]}</td>
                    {row.slice(1).map((cell, ci) => (
                      <td key={ci} style={{ padding: '13px 18px', fontSize: 13.5, color: inkMid, fontWeight: 300, borderBottom: '1px solid rgba(0,0,0,.05)', verticalAlign: 'top' }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* LEGAL */}
      <section style={{ padding: 'clamp(48px,6vw,72px) 0' }}>
        <div className="max-w-[1000px] mx-auto px-6">
          <div style={{ maxWidth: 720, marginBottom: 28 }}>
            <Over label="The legal position" />
            <Sec2 label="Which general insurance is mandatory in India?" />
          </div>
          <p style={{ fontSize: 15.5, lineHeight: 1.85, color: inkMid, fontWeight: 300, marginBottom: 14 }}>
            Only one: third-party motor insurance. Under the Motor Vehicles Act, 1988, every vehicle used in a public place must carry third-party liability cover. Driving without it is a punishable offence, and the absence of cover does not remove your liability — it simply means you pay the claim yourself.
          </p>
          <p style={{ fontSize: 15.5, lineHeight: 1.85, color: inkMid, fontWeight: 300 }}>
            Everything else is optional as a matter of law, but often mandatory as a matter of contract. Home loan lenders routinely require property insurance for the duration of the loan. Schengen visa applications require travel medical cover of at least €30,000. Neither is a legal requirement on you as a citizen; both are conditions imposed by whoever you are dealing with.
          </p>
        </div>
      </section>

      {/* MYTHS */}
      <section style={{ padding: 'clamp(48px,6vw,72px) 0', background: tint }}>
        <div className="max-w-[1000px] mx-auto px-6">
          <div style={{ maxWidth: 720, marginBottom: 28 }}>
            <Over label="Set the record straight" />
            <Sec2 label="What do people get wrong about general insurance?" />
          </div>
          {[
            { title: 'Is third-party motor insurance enough?', paras: ["No. Third-party cover pays for damage and injury you cause to other people and their property. Your own vehicle is not covered at all.", "If your car is hit in an accident, stolen, submerged in a flood or damaged by fire, a third-party policy pays nothing towards repairing or replacing it. That protection comes from own-damage cover, which is what turns a third-party policy into a comprehensive one."] },
            { title: 'Can renters buy home insurance?', paras: ["Yes. Home insurance treats the structure and the contents as two separate things, and a tenant can insure the second without owning the first.", "Furniture, appliances, electronics and personal belongings are just as exposed to fire, theft and water damage in a rented flat as in an owned one — and in a rented flat, the landlord's policy almost never covers them."] },
            { title: 'Is credit card travel insurance enough?', paras: ["Rarely, and the reason is the sum insured rather than the cover itself.", "Card-linked travel cover is typically capped well below what a hospital admission in the United States or Europe can cost. It also commonly excludes pre-existing conditions and adventure activities, and may only apply if the trip was booked on that card."] },
          ].map(m => (
            <div key={m.title} style={{ background: '#fff', border: '1px solid rgba(26,59,159,.1)', borderRadius: 18, padding: '22px 26px', marginBottom: 14 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase', color: '#E04E2B', background: 'rgba(224,78,43,.08)', padding: '3px 10px', borderRadius: 100, marginBottom: 12 }}>⚠ Common myth</span>
              <h3 style={{ fontFamily: 'var(--fd)', fontSize: 17, fontWeight: 700, color: ink, marginBottom: 10 }}>{m.title}</h3>
              {m.paras.map((p, i) => <p key={i} style={{ fontSize: 14.5, lineHeight: 1.8, color: inkMid, fontWeight: 300, marginTop: i > 0 ? 10 : 0 }}>{p}</p>)}
            </div>
          ))}
        </div>
      </section>

      {/* HOW TO CHOOSE */}
      <section style={{ padding: 'clamp(48px,6vw,72px) 0' }}>
        <div className="max-w-[1000px] mx-auto px-6">
          <div style={{ maxWidth: 720, marginBottom: 28 }}>
            <Over label="Making the decision" />
            <Sec2 label="How do you choose the right cover?" />
          </div>
          {[
            { n: 1, title: 'Start with what you could not afford to replace', body: "Insurance is worth buying where the loss would be materially painful, not merely annoying. A vehicle, a home, and an overseas medical bill qualify." },
            { n: 2, title: 'Check the sum insured, not the premium', body: "Two policies at similar premiums can differ enormously in what they pay. The sum insured, and how it is calculated, determines the size of your claim." },
            { n: 3, title: 'Read the exclusions before the features', body: "Add-ons are marketed; exclusions are disclosed. The exclusions list tells you what a policy will refuse to pay, and it is where most claim disputes originate." },
            { n: 4, title: "Look at the insurer's claim settlement record", body: "IRDAI publishes claim settlement data by insurer in its annual report. A cheaper premium from an insurer with a weak settlement record is not a saving." },
            { n: 5, title: 'Fit it into the rest of your plan', body: "General insurance protects assets. It sits alongside life cover for your dependants and estate planning for what happens to those assets afterwards." },
          ].map(s => (
            <div key={s.n} style={{ display: 'flex', gap: 18, padding: '18px 0', borderBottom: '1px solid rgba(0,0,0,.07)' }}>
              <div style={{ flexShrink: 0, width: 36, height: 36, borderRadius: '50%', background: navy, color: '#fff', fontWeight: 800, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{s.n}</div>
              <div>
                <h3 style={{ fontFamily: 'var(--fd)', fontSize: 16, fontWeight: 700, color: ink, marginBottom: 5 }}>{s.title}</h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.75, color: inkMid, fontWeight: 300 }}>{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: 'clamp(48px,6vw,72px) 0', background: tint }}>
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <Over label="Questions" />
              <h2 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(22px,2.8vw,30px)', fontWeight: 700, letterSpacing: '-.02em', color: ink }}>General insurance FAQs</h2>
              <p style={{ fontSize: 14, color: inkSoft, fontWeight: 300, lineHeight: 1.65, marginTop: 12 }}>Everything you need to know before buying general insurance in India.</p>
            </div>
            <div className="md:col-span-2">
              {faqs.map(f => <FaqItem key={f.q} q={f.q} a={f.a} />)}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: `linear-gradient(135deg,${navyDeep} 0%,${navy} 100%)`, padding: 'clamp(56px,6vw,72px) 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: 360, height: 360, borderRadius: '50%', background: `radial-gradient(circle,rgba(141,198,63,.2),transparent 65%)`, filter: 'blur(50px)', pointerEvents: 'none' }} />
        <div className="max-w-[560px] mx-auto px-6 relative" style={{ zIndex: 1 }}>
          <h2 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(24px,3vw,34px)', fontWeight: 700, letterSpacing: '-.02em', color: '#fff', marginBottom: 14 }}>Not sure which cover you need?</h2>
          <p style={{ fontSize: 16, fontWeight: 300, color: 'rgba(255,255,255,.72)', marginBottom: 28, lineHeight: 1.75 }}>
            Talk to a MyAnmol advisor about the right motor, home or travel policy for your situation.
          </p>
          <button type="button" onClick={openGetStarted} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--fs)', fontSize: 15, fontWeight: 800, color: navyDeep, background: lime, padding: '14px 32px', borderRadius: 100, transition: 'all .2s', border: 'none', cursor: 'pointer' }}
            className="hover:scale-105 hover:shadow-xl">
            Speak to an advisor →
          </button>
        </div>
      </section>

      {/* REGULATORY */}
      <section style={{ padding: '24px 0 36px', background: '#fff', borderTop: '1px solid rgba(0,0,0,.07)' }}>
        <div className="max-w-[1000px] mx-auto px-6">
          <p style={{ fontSize: 12, lineHeight: 1.75, color: '#9CA3AF', fontWeight: 300 }}>
            <strong style={{ color: inkSoft }}>Anmol Share Broking Private Limited</strong>, operating as MyAnmol, is an IRDAI-licensed insurance advisory firm (Licence No. XXXXX) and an AMFI-registered mutual fund distributor (ARN-XXXXX). Insurance is a subject matter of solicitation. This page is general information about categories of insurance products and is not a recommendation to buy any specific policy. Cover, exclusions, terms and claim conditions vary between insurers and are governed entirely by the policy wording issued to you.
          </p>
        </div>
      </section>
    </div>
  );
}
