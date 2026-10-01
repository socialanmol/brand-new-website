import { useState } from 'react';

const navy = '#1A3B9F';
const navyDark = '#0D1E52';
const navyDeep = '#091540';
const lime = '#8DC63F';
const ink = '#111827';
const inkMid = '#374151';
const inkSoft = '#6B7280';
const tint = '#F8FAFE';

function fmtINR(n: number) {
  if (n >= 10000000) return '₹' + (n / 10000000).toFixed(2).replace(/\.00$/, '') + ' Cr';
  if (n >= 100000) return '₹' + (n / 100000).toFixed(1).replace(/\.0$/, '') + ' L';
  return '₹' + n.toLocaleString('en-IN');
}

function Over({ label }: { label: string }) {
  return <span style={{ fontFamily: 'var(--fs)', fontSize: 11, fontWeight: 800, letterSpacing: '.16em', textTransform: 'uppercase', color: lime, display: 'block', marginBottom: 10 }}>{label}</span>;
}

function Sec2({ label }: { label: string }) {
  return <h2 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(22px,2.8vw,30px)', fontWeight: 700, letterSpacing: '-.02em', color: ink, marginBottom: 14 }}>{label}</h2>;
}

function CoverageCalc() {
  const [cityTier, setCityTier] = useState(3);
  const [age, setAge] = useState(35);
  const [family, setFamily] = useState(3);
  const [existing, setExisting] = useState(500000);

  const cityLabels: Record<number, string> = { 1: 'Tier 3', 2: 'Tier 2', 3: 'Metro' };
  const baseByTier: Record<number, number> = { 1: 500000, 2: 700000, 3: 1000000 };
  const ageMultiplier = age < 35 ? 1 : age < 50 ? 1.3 : 1.6;
  const familyMultiplier = 1 + (family - 1) * 0.35;
  const totalNeed = Math.round((baseByTier[cityTier] * ageMultiplier * familyMultiplier) / 100000) * 100000;
  const recommended = Math.max(0, totalNeed - existing);

  const sliders = [
    { label: 'City Tier', val: cityLabels[cityTier], min: 1, max: 3, step: 1, value: cityTier, onChange: (v: number) => setCityTier(v), ends: ['Tier 3', 'Metro'] },
    { label: 'Age of Eldest Member', val: age + ' yrs', min: 18, max: 70, step: 1, value: age, onChange: (v: number) => setAge(v), ends: ['18', '70'] },
    { label: 'Family Members', val: String(family), min: 1, max: 6, step: 1, value: family, onChange: (v: number) => setFamily(v), ends: ['1', '6+'] },
    { label: 'Existing Cover', val: fmtINR(existing), min: 0, max: 5000000, step: 100000, value: existing, onChange: (v: number) => setExisting(v), ends: ['₹0', '₹50L+'] },
  ];

  return (
    <section style={{ padding: 'clamp(48px,6vw,72px) 0', background: tint }}>
      <div className="max-w-[1000px] mx-auto px-6">
        <div style={{ textAlign: 'center', maxWidth: 580, margin: '0 auto 36px' }}>
          <Over label="Quick check" />
          <h2 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(22px,2.8vw,30px)', fontWeight: 700, letterSpacing: '-.02em', color: ink, marginBottom: 10 }}>How much health cover do I need?</h2>
          <p style={{ fontSize: 14.5, color: inkSoft, lineHeight: 1.7 }}>A simple estimate based on where you live, your family size, and your age.</p>
        </div>

        <div style={{ maxWidth: 760, margin: '0 auto', background: '#fff', border: '1px solid rgba(26,59,159,.1)', borderRadius: 28, padding: 'clamp(24px,4vw,36px)', boxShadow: '0 20px 60px rgba(26,59,159,.08)' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-2">
            {sliders.map(f => (
              <div key={f.label}>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 800, letterSpacing: '.05em', textTransform: 'uppercase', color: inkSoft, marginBottom: 8 }}>{f.label}</label>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 6 }}>
                  <span style={{ fontFamily: 'var(--fd)', fontSize: 22, fontWeight: 700, color: navy }}>{f.val}</span>
                </div>
                <input type="range" min={f.min} max={f.max} step={f.step} value={f.value}
                  onChange={e => f.onChange(Number(e.target.value))}
                  style={{ width: '100%', accentColor: navy, height: 4 }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10.5, color: inkSoft, marginTop: 4 }}>
                  <span>{f.ends[0]}</span><span>{f.ends[1]}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 28, background: `linear-gradient(135deg,${navyDeep},${navy})`, borderRadius: 18, padding: '26px 28px', textAlign: 'center' }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,.55)', marginBottom: 8 }}>Recommended Sum Insured</div>
            <div style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(28px,5vw,44px)', fontWeight: 700, color: lime }}>
              {recommended === 0 ? 'You look well covered' : fmtINR(recommended)}
            </div>
            <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,.55)', marginTop: 10, lineHeight: 1.6, maxWidth: 460, marginLeft: 'auto', marginRight: 'auto' }}>
              {recommended === 0
                ? 'Your existing cover already meets this estimate — an advisor can confirm it aligns with your actual needs.'
                : `Based on ${cityLabels[cityTier]} healthcare costs, ${family} member${family > 1 ? 's' : ''} to cover, and your age bracket — minus your existing cover.`}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HealthInsurance() {
  return (
    <div style={{ fontFamily: 'var(--fs)' }}>

      {/* HERO */}
      <section style={{ background: `linear-gradient(135deg,${navyDeep} 0%,${navyDark} 50%,${navy} 100%)`, padding: 'clamp(60px,7vw,88px) 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-60px', left: '50%', width: 560, height: 560, borderRadius: '50%', background: 'radial-gradient(circle,rgba(141,198,63,.18),transparent 65%)', filter: 'blur(60px)', transform: 'translateX(-50%)', pointerEvents: 'none' }} />
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: .04 }} xmlns="http://www.w3.org/2000/svg">
          <defs><pattern id="g3" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="1"/></pattern></defs>
          <rect width="100%" height="100%" fill="url(#g3)" />
        </svg>
        <div className="max-w-[640px] mx-auto px-6 relative" style={{ zIndex: 1 }}>
          <div style={{ width: 72, height: 72, borderRadius: 20, background: 'rgba(141,198,63,.14)', border: '1px solid rgba(141,198,63,.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, margin: '0 auto 20px' }}>🏥</div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(141,198,63,.15)', border: '1px solid rgba(141,198,63,.35)', borderRadius: 100, padding: '5px 14px', marginBottom: 18 }}>
            <span style={{ fontFamily: 'var(--fs)', fontSize: 11, fontWeight: 800, letterSpacing: '.12em', textTransform: 'uppercase', color: lime }}>Insurance</span>
          </div>
          <h1 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(32px,5vw,52px)', fontWeight: 900, letterSpacing: '-.03em', color: '#fff', marginBottom: 16, lineHeight: 1.1 }}>
            Health Insurance<br /><span style={{ color: lime }}>for every family</span>
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.8, color: 'rgba(255,255,255,.78)', fontWeight: 300 }}>
            Because a medical emergency shouldn't become a financial one.
          </p>
        </div>
      </section>

      {/* WHAT IS IT */}
      <section style={{ padding: 'clamp(48px,6vw,72px) 0' }}>
        <div className="max-w-[1000px] mx-auto px-6">
          <div style={{ background: '#EFF8E2', border: '1px solid rgba(141,198,63,.25)', borderRadius: 22, padding: '30px 32px', borderLeft: `4px solid ${lime}` }}>
            <p style={{ fontSize: 16, lineHeight: 1.9, color: '#1A3B1A', fontWeight: 300 }}>
              Health insurance is a policy that covers hospitalisation and medical expenses in exchange for a premium. Instead of paying out of pocket during a health emergency, your insurer settles the bill — directly with the hospital, or by reimbursing you. It protects your savings from being wiped out by a single medical event, rather than building wealth like an investment product.
            </p>
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section style={{ padding: 'clamp(48px,6vw,72px) 0', background: tint }}>
        <div className="max-w-[1000px] mx-auto px-6">
          <div style={{ marginBottom: 28 }}>
            <Over label="The comparison" />
            <Sec2 label="Types of health insurance" />
            <p style={{ fontSize: 15.5, color: inkMid, fontWeight: 300, lineHeight: 1.7 }}>Which structure actually fits your household.</p>
          </div>
          <div style={{ overflowX: 'auto', borderRadius: 20, border: '1px solid rgba(26,59,159,.1)', boxShadow: '0 10px 40px rgba(26,59,159,.06)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', minWidth: 560 }}>
              <thead>
                <tr>
                  <th style={{ background: navyDark, color: '#fff', fontSize: 12, fontWeight: 700, letterSpacing: '.04em', textTransform: 'uppercase', padding: '14px 18px', textAlign: 'left' }}>What You Get</th>
                  <th style={{ background: navy, color: lime, fontSize: 12, fontWeight: 700, letterSpacing: '.04em', textTransform: 'uppercase', padding: '14px 18px', textAlign: 'left' }}>Family Floater ★</th>
                  <th style={{ background: navyDark, color: '#fff', fontSize: 12, fontWeight: 700, letterSpacing: '.04em', textTransform: 'uppercase', padding: '14px 18px', textAlign: 'left' }}>Individual Plan</th>
                  <th style={{ background: navyDark, color: '#fff', fontSize: 12, fontWeight: 700, letterSpacing: '.04em', textTransform: 'uppercase', padding: '14px 18px', textAlign: 'left' }}>Top-Up / Super Top-Up</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Who's covered", 'Entire family, one shared sum insured', 'One person only', 'Adds on top of an existing base policy'],
                  ['Premium', 'Usually cheaper per person', "Based on that person's age & health alone", 'Lowest — only kicks in above a threshold'],
                  ['How claims work', 'Sum insured shared across whoever falls ill', 'Full sum insured available for that one person', 'Pays only above the deductible amount'],
                  ['Best suited for', 'Young families wanting one simple policy', 'Senior parents, or anyone with distinct health needs', 'Boosting cover affordably without a new base plan'],
                ].map((row, ri) => (
                  <tr key={ri} style={{ background: ri % 2 === 0 ? '#fff' : tint }}>
                    <td style={{ padding: '13px 18px', fontSize: 13.5, fontWeight: 700, color: ink, borderBottom: '1px solid rgba(0,0,0,.05)' }}>{row[0]}</td>
                    <td style={{ padding: '13px 18px', fontSize: 13.5, color: '#1A4A1A', fontWeight: 600, background: 'rgba(141,198,63,.07)', borderBottom: '1px solid rgba(0,0,0,.05)' }}>{row[1]}</td>
                    <td style={{ padding: '13px 18px', fontSize: 13.5, color: inkMid, fontWeight: 300, borderBottom: '1px solid rgba(0,0,0,.05)' }}>{row[2]}</td>
                    <td style={{ padding: '13px 18px', fontSize: 13.5, color: inkMid, fontWeight: 300, borderBottom: '1px solid rgba(0,0,0,.05)' }}>{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* WHY IT MATTERS */}
      <section style={{ padding: 'clamp(48px,6vw,72px) 0' }}>
        <div className="max-w-[1000px] mx-auto px-6">
          <div style={{ marginBottom: 28 }}>
            <Over label="Why it matters" />
            <Sec2 label="Why health insurance belongs in your plan" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: '💳', title: 'Cashless Treatment', body: 'Get treated at network hospitals without paying upfront — your insurer settles directly with the hospital.' },
              { icon: '📈', title: 'Protection from Medical Inflation', body: 'Healthcare costs in India rise roughly 14% a year — a good policy keeps that inflation off your own balance sheet.' },
              { icon: '📋', title: 'Tax Benefits Under Section 80D', body: 'Premiums qualify for deduction under Section 80D, on top of the actual protection you\'re buying.' },
              { icon: '🩺', title: 'Beyond the Hospital Stay', body: 'Covers pre- and post-hospitalisation expenses — consultations, tests, and medicines before and after admission.' },
            ].map(c => (
              <div key={c.title} style={{ background: '#fff', border: '1px solid rgba(26,59,159,.1)', borderRadius: 20, padding: 24, display: 'flex', gap: 16, alignItems: 'flex-start', boxShadow: '0 4px 18px rgba(26,59,159,.05)' }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#EFF8E2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{c.icon}</div>
                <div>
                  <h3 style={{ fontFamily: 'var(--fd)', fontSize: 15.5, fontWeight: 700, color: ink, marginBottom: 5 }}>{c.title}</h3>
                  <p style={{ fontSize: 13.5, color: inkSoft, lineHeight: 1.7, fontWeight: 300 }}>{c.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COVERAGE CALCULATOR */}
      <CoverageCalc />

      {/* RIDERS */}
      <section style={{ padding: 'clamp(48px,6vw,72px) 0' }}>
        <div className="max-w-[1000px] mx-auto px-6">
          <div style={{ marginBottom: 22 }}>
            <Over label="Add-ons" />
            <Sec2 label="Riders worth considering" />
          </div>
          <div style={{ background: '#FFF8ED', border: '1px dashed rgba(184,99,26,.35)', borderRadius: 12, padding: '12px 18px', marginBottom: 22, fontSize: 13, color: '#8A5A2A', lineHeight: 1.7 }}>
            Common industry-standard riders shown for reference — a MyAnmol advisor will confirm which ones apply to your policy.
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: '❤️', title: 'Critical Illness Rider', body: 'Pays a lump sum on diagnosis of a covered illness like cancer or a heart condition, on top of your base cover.' },
              { icon: '🤱', title: 'Maternity Cover', body: 'Covers delivery and newborn care expenses, usually after a waiting period of 2–4 years.' },
              { icon: '⚡', title: 'Personal Accident Cover', body: 'An additional payout for accidental injury or disability, beyond standard hospitalisation cover.' },
            ].map(r => (
              <div key={r.title} style={{ background: tint, border: '1px solid rgba(26,59,159,.1)', borderRadius: 18, padding: 22 }}>
                <div style={{ fontSize: 24, marginBottom: 10 }}>{r.icon}</div>
                <h3 style={{ fontFamily: 'var(--fd)', fontSize: 16, fontWeight: 700, color: ink, marginBottom: 8 }}>{r.title}</h3>
                <p style={{ fontSize: 13.5, color: inkSoft, lineHeight: 1.7, fontWeight: 300 }}>{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHECKLIST */}
      <section style={{ padding: 'clamp(48px,6vw,72px) 0', background: tint }}>
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <Over label="Before you buy" />
              <Sec2 label="What to check before you buy" />
              <p style={{ fontSize: 14, color: inkSoft, fontWeight: 300, lineHeight: 1.65 }}>Four things most people miss when comparing health insurance plans.</p>
            </div>
            <div className="md:col-span-2">
              {[
                { title: 'Network Hospitals', body: 'Check that hospitals near you are included, so you can actually use cashless treatment when it matters.' },
                { title: 'Waiting Period', body: "Most policies have a waiting period for pre-existing conditions — understand exactly how long before you're fully covered." },
                { title: 'Room Rent Sub-Limits', body: "Some policies cap the room rent they'll cover, which can reduce your payout even within the sum insured." },
                { title: 'Claim Settlement Ratio & No-Claim Bonus', body: 'A strong settlement track record, plus a bonus that increases your cover each claim-free year.' },
              ].map((c, i) => (
                <div key={c.title} style={{ display: 'flex', gap: 16, padding: '18px 0', borderBottom: i < 3 ? '1px solid rgba(0,0,0,.07)' : 'none', alignItems: 'flex-start' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#EFF8E2', border: `1.5px solid ${lime}`, color: lime, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>✓</div>
                  <div>
                    <h3 style={{ fontFamily: 'var(--fd)', fontSize: 15.5, fontWeight: 700, color: ink, marginBottom: 4 }}>{c.title}</h3>
                    <p style={{ fontSize: 13.5, color: inkSoft, lineHeight: 1.7, fontWeight: 300 }}>{c.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MYTHS */}
      <section style={{ padding: 'clamp(48px,6vw,72px) 0' }}>
        <div className="max-w-[1000px] mx-auto px-6">
          <div style={{ marginBottom: 28 }}>
            <Over label="Set the record straight" />
            <Sec2 label="Common myths about health insurance" />
          </div>
          {[
            { myth: '"My employer\'s group cover is enough."', truth: "Group cover usually ends the day you leave the job, and the sum insured is often too low to handle a serious illness — a personal policy fills that gap." },
            { myth: '"I\'m young and healthy, I don\'t need it."', truth: "Premiums are lowest and waiting periods start earliest when you buy young — plus you're covered before any health issue can be called \"pre-existing.\"" },
            { myth: '"Health insurance covers everything."', truth: "Most policies exclude certain treatments, have waiting periods, and cap room rent — reading the fine print matters as much as buying the policy." },
          ].map(m => (
            <div key={m.myth} style={{ background: '#fff', border: '1px solid rgba(26,59,159,.1)', borderRadius: 18, padding: '22px 26px', marginBottom: 14, boxShadow: '0 4px 18px rgba(26,59,159,.05)' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase', color: '#E04E2B', background: 'rgba(224,78,43,.08)', padding: '3px 10px', borderRadius: 100, marginBottom: 10 }}>⚠ Myth</span>
              <div style={{ fontFamily: 'var(--fd)', fontSize: 16.5, fontStyle: 'italic', color: ink, marginBottom: 8, fontWeight: 700 }}>{m.myth}</div>
              <div style={{ fontSize: 14, color: inkMid, lineHeight: 1.75, fontWeight: 300 }}>{m.truth}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: `linear-gradient(135deg,${navyDeep} 0%,${navy} 100%)`, padding: 'clamp(56px,6vw,72px) 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-60px', right: '-40px', width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle,rgba(141,198,63,.2),transparent 65%)', filter: 'blur(50px)', pointerEvents: 'none' }} />
        <div className="max-w-[520px] mx-auto px-6 relative" style={{ zIndex: 1 }}>
          <h2 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(24px,3vw,34px)', fontWeight: 700, letterSpacing: '-.02em', color: '#fff', marginBottom: 14 }}>Not sure how much health cover you need?</h2>
          <p style={{ fontSize: 15.5, color: 'rgba(255,255,255,.72)', lineHeight: 1.75, fontWeight: 300, marginBottom: 28 }}>
            Talk to a MyAnmol advisor to build a health insurance plan that actually fits your family's needs.
          </p>
          <a href="/get-started" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--fs)', fontSize: 15, fontWeight: 800, color: navyDeep, background: lime, padding: '14px 32px', borderRadius: 100, transition: 'all .2s' }}
            className="hover:scale-105 hover:shadow-xl">
            Speak to an Advisor →
          </a>
        </div>
      </section>
    </div>
  );
}
