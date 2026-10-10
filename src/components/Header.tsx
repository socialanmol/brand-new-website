import { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router';
import logoSrc from '@/imports/myanmolylogo.png';

/* ─── TYPES ─────────────────────────────────────────────────────────────────── */

type SimpleItem  = { label: string; to: string; sub?: string; icon?: string };
type NestedGroup = { label: string; to?: string; children: SimpleItem[] };
type DropItem    = SimpleItem | NestedGroup;

function isNested(x: DropItem): x is NestedGroup { return 'children' in x; }

type NavLeaf  = { kind: 'leaf'; label: string; to: string };
type NavDrop  = { kind: 'drop'; label: string; items: DropItem[]; wide?: boolean };
type NavEntry = NavLeaf | NavDrop;

/* ─── NAV DATA ───────────────────────────────────────────────────────────────── */

const NAV: NavEntry[] = [
  {
    kind: 'drop', label: 'Financial Wellness',
    items: [
      { label: 'Financial Wellness Check',            to: '/fw/check',    icon: '🩺' },
      { label: 'Financial Fitness Quiz',              to: '/fw/quiz',     icon: '📊' },
      { label: 'Build Your Own Wealth',               to: '/fw/build',    icon: '🏗️' },
      { label: '30-Day Financial Confidence Builder', to: '/fw/30-day',   icon: '📅' },
      { label: 'Zero Interest Planner',               to: '/fw/zero-int', icon: '🎯' },
    ],
  },
  {
    kind: 'drop', label: 'Wealth Plan',
    items: [
      { label: 'Save-Insure-Invest', to: '/wp/sii',    icon: '💡' },
      { label: 'Goal Mapping',       to: '/wp/goals',  icon: '🗺️' },
      { label: 'Book a Review',      to: '/wp/review', icon: '📞' },
    ],
  },
  {
    kind: 'drop', label: 'Our Solutions', wide: true,
    items: [
      { label: 'DocWealth',                  sub: 'For Doctors',              to: '/solutions/doc',      icon: '👨‍⚕️' },
      { label: 'For Salaried Professionals', sub: 'Employees & Executives',   to: '/solutions/salaried', icon: '💼'   },
      { label: "She is 'Anmol'",             sub: 'For Women',                to: '/solutions/women',    icon: '👩'   },
      { label: 'For Families',               sub: 'All life stages',          to: '/solutions/families', icon: '👨‍👩‍👧‍👦' },
      { label: 'For Retirees',               sub: 'Post-retirement planning', to: '/solutions/retirees', icon: '🌅'   },
      { label: 'For Teachers',                sub: 'Education & financial planning', to: '/solutions/teachers', icon: '📚'   },
      { label: 'For iGeneration',            sub: 'Gen Zs',                   to: '/solutions/genz',     icon: '🎓'   },
      { label: 'For NRI',                    sub: 'Non-resident Indians',     to: '/solutions/nri',      icon: '🌐'   },
      { label: 'For Armed Forces',           sub: 'Defence & paramilitary',   to: '/solutions/armed-forces', icon: '⭐'   },
      { label: 'For Business Owners & HUFs', sub: 'Entrepreneurs & HUFs',     to: '/solutions/business-owners', icon: '🏢'   },
    ],
  },
  {
    kind: 'drop', label: 'Our Services',
    items: [
      {
        label: 'Mutual Funds',
        children: [
          { label: 'Specialised Investment Funds (SIFs)',  to: '/services/sif',      icon: '📈' },
          { label: 'Portfolio Management Services (PMS)', to: '/services/pms',      icon: '🗂️' },
          { label: 'Alternative Investment Fund (AIF)',   to: '/services/aif',      icon: '🏛️' },
          { label: 'Gift City & Global Investing',        to: '/mutual-funds/gift-city', icon: '🌐' },
        ],
      },
      {
        label: 'Insurance',
        children: [
          { label: 'Term Insurance',    to: '/insurance/term',    icon: '🛡️' },
          { label: 'Life Insurance',    to: '/insurance/life',    icon: '❤️' },
          { label: 'Health Insurance',  to: '/insurance/health',  icon: '🏥' },
          { label: 'General Insurance', to: '/insurance/general', icon: '🧭', sub: 'Motor, Home & Travel' },
        ],
      },
      {
        label: 'Other Products',
        children: [
          { label: 'Wealth & Estate Planning', to: '/services/wealth-estate', icon: '🏛️' },
          { label: 'Real Estate Advisory', to: '/services/real-estate', icon: '🏠' },
          { label: 'Gold & Silver Commodities', to: '/services/commodities', icon: '🥇' },
          { label: 'Travel Solutions', to: '/services/travel', icon: '✈️' },
          { label: 'Tax Services', to: '/services/tax', icon: '🧾' },
          { label: 'Fixed Deposits', to: '/services/other/fixed-deposits', icon: '🏦' },
          { label: 'Equity Trading', to: '/services/other/equity-trading', icon: '📊' },
          { label: 'Tax Filing', to: '/services/other/tax-filing', icon: '🧮' },
        ],
      },
    ],
  },
  { kind: 'leaf', label: 'Tools & Calculators', to: '/tools' },
  {
    kind: 'drop', label: 'Insights & Learning',
    items: [
      { label: 'Glossary',                 to: '/insights/glossary',  icon: '📖' },
      { label: 'Our Insights',             to: '/insights/articles',  icon: '✍️' },
      { label: 'Learn, Unlearn & Relearn', to: '/insights/learn',     icon: '🔄' },
      { label: 'Seminars & Workshops',     to: '/insights/seminars',  icon: '🎤' },
    ],
  },
  {
    kind: 'drop', label: 'Who We Are',
    items: [
      {
        label: "What is 'Anmol'",
        children: [
          { label: 'Our Journey', to: '/about/journey' },
          { label: 'Our Team',    to: '/about/team' },
        ],
      },
      { label: 'Regulatory Disclosure', to: '/regulatory', icon: '📜' },
      {
        label: 'Careers',
        children: [
          { label: 'Intern with Us', to: '/careers/intern' },
        ],
      },
    ],
  },
];

/* ─── GET STARTED MODAL ──────────────────────────────────────────────────────── */

const INTERESTS = [
  'Insurance', 'Mutual Funds', 'Financial Planning', 'Wealth Management',
  'SIF / PMS / AIF', 'NRI Services', 'Wealth & Estate Planning',
  'Real Estate Advisory', 'Gold & Silver Commodities', 'Travel Solutions',
  'Tax Services', 'Fixed Deposits', 'Equity Trading', 'Tax Filing',
  'Gift City and Global Investments', 'Other',
];

export function GetStartedModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', city: '', interest: '' });
  const [submitted, setSubmitted] = useState(false);
  const upd = (k: keyof typeof form, v: string) => setForm(f => ({ ...f, [k]: v }));

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [onClose]);

  const inputStyle: React.CSSProperties = {
    display: 'block', width: '100%', padding: '10px 14px',
    fontFamily: 'var(--fs)', fontSize: 14.5,
    border: '1.5px solid rgba(26,59,159,.18)', borderRadius: 10,
    outline: 'none', color: '#111827', background: '#F8FAFE',
  };
  const labelStyle: React.CSSProperties = {
    display: 'block', fontFamily: 'var(--fs)', fontSize: 11, fontWeight: 700,
    letterSpacing: '.05em', textTransform: 'uppercase', color: '#6B7280', marginBottom: 5,
  };

  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}
    >
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(9,21,64,.8)', backdropFilter: 'blur(6px)' }} onClick={onClose} />
      <div style={{ position: 'relative', zIndex: 1, background: '#fff', borderRadius: 24, width: '100%', maxWidth: 460, boxShadow: '0 32px 80px rgba(9,21,64,.4)', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg,#091540,#1A3B9F)', padding: '24px 28px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: '#fff', padding: 4, flexShrink: 0 }}>
              <img src={logoSrc} alt="MyAnmol" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--fd)', fontSize: 18, fontWeight: 700, color: '#fff' }}>Get Started</div>
              <div style={{ fontFamily: 'var(--fs)', fontSize: 12, color: 'rgba(255,255,255,.55)' }}>An advisor will reach out within 24 hours.</div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '24px 28px 28px' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <div style={{ fontSize: 44, marginBottom: 14 }}>✅</div>
              <h3 style={{ fontFamily: 'var(--fd)', fontSize: 20, fontWeight: 700, color: '#111827', marginBottom: 8 }}>We'll be in touch!</h3>
              <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.7, marginBottom: 20 }}>
                Thank you, {form.name.split(' ')[0] || 'there'}. A MyAnmol advisor will call you at <strong>{form.phone}</strong> shortly.
              </p>
              <button onClick={onClose} style={{ fontFamily: 'var(--fs)', background: '#8DC63F', color: '#091540', fontSize: 14, fontWeight: 800, padding: '11px 28px', borderRadius: 100, border: 'none', cursor: 'pointer' }}>Close</button>
            </div>
          ) : (
          <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={labelStyle}>Full Name <span style={{ color: '#E04E2B' }}>*</span></label>
                  <input style={inputStyle} type="text" value={form.name} onChange={e => upd('name', e.target.value)} placeholder="Priya Sharma" required
                    onFocus={e => (e.target.style.borderColor = '#1A3B9F')} onBlur={e => (e.target.style.borderColor = 'rgba(26,59,159,.18)')} />
                </div>
                <div>
                  <label style={labelStyle}>Mobile <span style={{ color: '#E04E2B' }}>*</span></label>
                  <input style={inputStyle} type="tel" value={form.phone} onChange={e => upd('phone', e.target.value)} placeholder="10-digit number" required
                    onFocus={e => (e.target.style.borderColor = '#1A3B9F')} onBlur={e => (e.target.style.borderColor = 'rgba(26,59,159,.18)')} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Email Address <span style={{ color: '#E04E2B' }}>*</span></label>
                <input style={inputStyle} type="email" value={form.email} onChange={e => upd('email', e.target.value)} placeholder="you@example.com" required
                  onFocus={e => (e.target.style.borderColor = '#1A3B9F')} onBlur={e => (e.target.style.borderColor = 'rgba(26,59,159,.18)')} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={labelStyle}>City</label>
                  <input style={inputStyle} type="text" value={form.city} onChange={e => upd('city', e.target.value)} placeholder="Your city"
                    onFocus={e => (e.target.style.borderColor = '#1A3B9F')} onBlur={e => (e.target.style.borderColor = 'rgba(26,59,159,.18)')} />
                </div>
                <div>
                  <label style={labelStyle}>Interest</label>
                  <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.interest} onChange={e => upd('interest', e.target.value)}>
                    <option value="">Select…</option>
                    {INTERESTS.map(i => <option key={i}>{i}</option>)}
                  </select>
                </div>
              </div>
              <button type="submit"
                style={{ marginTop: 4, fontFamily: 'var(--fs)', background: '#1A3B9F', color: '#fff', fontSize: 14.5, fontWeight: 800, padding: '13px', borderRadius: 12, border: 'none', cursor: 'pointer' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#0D1E52')}
                onMouseLeave={e => (e.currentTarget.style.background = '#1A3B9F')}>
                Connect me with an advisor →
              </button>
              <p style={{ textAlign: 'center', fontFamily: 'var(--fs)', fontSize: 11, color: '#9CA3AF' }}>No spam. No cold calls. Just a personalised conversation.</p>
          </form>
          )}
        </div>

        <button onClick={onClose}
          style={{ position: 'absolute', top: 14, right: 14, width: 30, height: 30, borderRadius: '50%', background: 'rgba(255,255,255,.15)', border: 'none', cursor: 'pointer', color: '#fff', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,.25)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,.15)')}>✕</button>
      </div>
    </div>
  );
}

/* ─── DROPDOWN PANEL ─────────────────────────────────────────────────────────── */

function NestedItem({ item, onClose }: { item: NestedGroup; onClose: () => void }) {
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  const anyActive = item.children.some(c => loc.pathname === c.to);

  return (
    <div>
      {/* Section header — clickable to expand/collapse */}
      <button onClick={() => setOpen(o => !o)}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '8px 10px', borderRadius: 8, background: anyActive ? 'rgba(141,198,63,.1)' : open ? 'rgba(255,255,255,.05)' : 'transparent', border: 'none', cursor: 'pointer', gap: 6, transition: 'background .15s' }}>
        <span style={{ fontFamily: 'var(--fs)', fontSize: 11, fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase', color: anyActive ? '#8DC63F' : 'rgba(255,255,255,.55)', textAlign: 'left' }}>
          {item.label}
        </span>
        <svg style={{ width: 10, height: 10, color: 'rgba(255,255,255,.35)', flexShrink: 0, transition: 'transform .2s', transform: open ? 'rotate(90deg)' : 'none' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Children */}
      {open && (
        <div style={{ paddingBottom: 4 }}>
          {item.children.map(c => {
            const active = loc.pathname === c.to;
            return (
              <Link key={c.to} to={c.to} onClick={onClose}
                style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px 7px 14px', borderRadius: 8, fontFamily: 'var(--fs)', fontSize: 13, fontWeight: 500, color: active ? '#8DC63F' : 'rgba(255,255,255,.75)', textDecoration: 'none', background: active ? 'rgba(141,198,63,.08)' : 'transparent', transition: 'all .15s' }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.background = 'rgba(255,255,255,.06)'; e.currentTarget.style.color = '#fff'; } }}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,.75)'; } }}>
                {c.icon && <span style={{ fontSize: 14, flexShrink: 0, width: 18, textAlign: 'center' }}>{c.icon}</span>}
                <div>
                  <div style={{ lineHeight: 1.3 }}>{c.label}</div>
                  {c.sub && <div style={{ fontSize: 11, color: 'rgba(255,255,255,.35)', marginTop: 1 }}>{c.sub}</div>}
                </div>
                {active && <div style={{ marginLeft: 'auto', width: 5, height: 5, borderRadius: '50%', background: '#8DC63F', flexShrink: 0 }} />}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

function DropPanel({ entry, wide, onClose, align }: { entry: NavDrop; wide?: boolean; onClose: () => void; align: 'left' | 'right' | 'center' }) {
  const loc = useLocation();

  const posStyle: React.CSSProperties = {
    position: 'absolute',
    top: 'calc(100% + 6px)',
    ...(align === 'left'   ? { left: 0 }                         : {}),
    ...(align === 'right'  ? { right: 0 }                        : {}),
    ...(align === 'center' ? { left: '50%', transform: 'translateX(-50%)' } : {}),
    background: '#0D1E52',
    border: '1px solid rgba(255,255,255,.09)',
    borderRadius: 14,
    boxShadow: '0 20px 50px rgba(9,21,64,.55)',
    zIndex: 600,
    minWidth: wide ? 580 : 280,
    padding: 6,
  };

  if (wide) {
    return (
      <div style={posStyle}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2 }}>
          {entry.items.map((item, i) => {
            if (isNested(item)) return null;
            const si = item as SimpleItem;
            const active = loc.pathname === si.to;
            return (
              <Link key={i} to={si.to} onClick={onClose}
                style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '9px 10px', borderRadius: 8, textDecoration: 'none', background: active ? 'rgba(141,198,63,.1)' : 'transparent' }}
                onMouseEnter={e => !active && (e.currentTarget.style.background = 'rgba(255,255,255,.06)')}
                onMouseLeave={e => !active && (e.currentTarget.style.background = 'transparent')}>
                <span style={{ fontSize: 16, lineHeight: 1, marginTop: 1, flexShrink: 0 }}>{si.icon}</span>
                <div>
                  <div style={{ fontFamily: 'var(--fs)', fontSize: 12.5, fontWeight: 600, color: active ? '#8DC63F' : '#fff', lineHeight: 1.3 }}>{si.label}</div>
                  {si.sub && <div style={{ fontFamily: 'var(--fs)', fontSize: 10.5, color: 'rgba(255,255,255,.4)', marginTop: 1 }}>{si.sub}</div>}
                </div>
              </Link>
            );
          })}
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,.07)', padding: '8px 10px 4px' }}>
          <span style={{ fontFamily: 'var(--fs)', fontSize: 10.5, color: 'rgba(255,255,255,.3)' }}>Not sure which fits? Speak to an advisor →</span>
        </div>
      </div>
    );
  }

  return (
    <div style={posStyle}>
      {entry.items.map((item, i) => {
        if (isNested(item)) {
          return (
            <div key={i}>
              {i > 0 && <div style={{ height: 1, background: 'rgba(255,255,255,.07)', margin: '4px 6px' }} />}
              <NestedItem item={item} onClose={onClose} />
            </div>
          );
        }
        const si = item as SimpleItem;
        const active = loc.pathname === si.to;
        // If previous item was a nested group, add a divider above plain items too
        const prevIsNested = i > 0 && isNested(entry.items[i - 1]);
        return (
          <div key={i}>
            {prevIsNested && <div style={{ height: 1, background: 'rgba(255,255,255,.07)', margin: '4px 6px' }} />}
            <Link to={si.to} onClick={onClose}
              style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 8, textDecoration: 'none', background: active ? 'rgba(141,198,63,.1)' : 'transparent', transition: 'background .15s' }}
              onMouseEnter={e => !active && (e.currentTarget.style.background = 'rgba(255,255,255,.06)')}
              onMouseLeave={e => !active && (e.currentTarget.style.background = 'transparent')}>
              {si.icon && <span style={{ fontSize: 15, width: 20, textAlign: 'center', flexShrink: 0 }}>{si.icon}</span>}
              <div>
                <div style={{ fontFamily: 'var(--fs)', fontSize: 13, fontWeight: 600, color: active ? '#8DC63F' : '#fff', lineHeight: 1.3 }}>{si.label}</div>
                {si.sub && <div style={{ fontFamily: 'var(--fs)', fontSize: 11, color: 'rgba(255,255,255,.4)', marginTop: 1 }}>{si.sub}</div>}
              </div>
              {active && <div style={{ marginLeft: 'auto', width: 5, height: 5, borderRadius: '50%', background: '#8DC63F', flexShrink: 0 }} />}
            </Link>
          </div>
        );
      })}
    </div>
  );
}

/* ─── DESKTOP NAV ITEM ───────────────────────────────────────────────────────── */

function NavItem({ entry, index, openIdx, onToggle, onClose }: {
  entry: NavEntry; index: number; openIdx: number | null;
  onToggle: (i: number) => void; onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const loc = useLocation();
  const isOpen = openIdx === index;

  useEffect(() => {
    if (!isOpen) return;
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) onClose(); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [isOpen, onClose]);

  // For alignment: last few items should open to the right edge
  const totalItems = NAV.length;
  const align: 'left' | 'right' | 'center' =
    entry.kind === 'drop' && (entry as NavDrop).wide ? 'center' :
    index >= totalItems - 2 ? 'right' : 'left';

  if (entry.kind === 'leaf') {
    const active = loc.pathname === entry.to;
    return (
      <Link to={entry.to}
        style={{ display: 'inline-flex', alignItems: 'center', padding: '5px 8px', borderRadius: 6, fontFamily: 'var(--fs)', fontSize: 12.5, fontWeight: active ? 700 : 500, color: active ? '#8DC63F' : 'rgba(255,255,255,.82)', whiteSpace: 'nowrap', textDecoration: 'none', flexShrink: 0 }}
        onMouseEnter={e => { if (!active) e.currentTarget.style.color = '#fff'; }}
        onMouseLeave={e => { if (!active) e.currentTarget.style.color = 'rgba(255,255,255,.82)'; }}>
        {entry.label}
      </Link>
    );
  }

  const nd = entry as NavDrop;
  const anyActive = nd.items.some(i =>
    isNested(i) ? (i as NestedGroup).children.some(c => loc.pathname === c.to) : loc.pathname === (i as SimpleItem).to
  );

  return (
    <div ref={ref} style={{ position: 'relative', flexShrink: 0 }}>
      <button onClick={() => onToggle(index)}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 3, padding: '5px 8px', borderRadius: 6, fontFamily: 'var(--fs)', fontSize: 12.5, fontWeight: anyActive ? 700 : 500, color: anyActive ? '#8DC63F' : isOpen ? '#fff' : 'rgba(255,255,255,.82)', background: isOpen ? 'rgba(255,255,255,.1)' : 'transparent', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all .15s' }}
        onMouseEnter={e => { if (!anyActive && !isOpen) e.currentTarget.style.color = '#fff'; }}
        onMouseLeave={e => { if (!anyActive && !isOpen) e.currentTarget.style.color = 'rgba(255,255,255,.82)'; }}>
        {nd.label}
        <svg style={{ width: 10, height: 10, opacity: .6, transition: 'transform .2s', transform: isOpen ? 'rotate(180deg)' : 'none' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && <DropPanel entry={nd} wide={nd.wide} onClose={onClose} align={align} />}
    </div>
  );
}

/* ─── MOBILE ACCORDION ───────────────────────────────────────────────────────── */

function MobileEntry({ entry, onClose }: { entry: NavEntry; onClose: () => void }) {
  const [open, setOpen] = useState(false);
  const loc = useLocation();

  if (entry.kind === 'leaf') {
    const active = loc.pathname === entry.to;
    return (
      <Link to={entry.to} onClick={onClose}
        style={{ display: 'block', padding: '13px 20px', fontFamily: 'var(--fs)', fontSize: 15, fontWeight: active ? 700 : 500, color: active ? '#8DC63F' : '#fff', borderBottom: '1px solid rgba(255,255,255,.06)', textDecoration: 'none' }}>
        {entry.label}
      </Link>
    );
  }

  const nd = entry as NavDrop;
  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,.06)' }}>
      <button onClick={() => setOpen(o => !o)}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '13px 20px', fontFamily: 'var(--fs)', fontSize: 15, fontWeight: 500, color: '#fff', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
        {nd.label}
        <svg style={{ width: 14, height: 14, opacity: .5, transition: 'transform .2s', transform: open ? 'rotate(180deg)' : 'none', flexShrink: 0 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div style={{ background: 'rgba(0,0,0,.18)', paddingBottom: 6 }}>
          {nd.items.map((item, idx) => {
            if (isNested(item)) {
              return <MobileNestedEntry key={idx} item={item} onClose={onClose} />;
            }
            const si = item as SimpleItem;
            return (
              <Link key={idx} to={si.to} onClick={onClose}
                style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 20px', fontFamily: 'var(--fs)', fontSize: 13.5, fontWeight: 500, color: loc.pathname === si.to ? '#8DC63F' : 'rgba(255,255,255,.7)', textDecoration: 'none' }}>
                {si.icon && <span style={{ fontSize: 15 }}>{si.icon}</span>}
                <div>
                  <div>{si.label}</div>
                  {si.sub && <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,.4)', marginTop: 1 }}>{si.sub}</div>}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

function MobileNestedEntry({ item, onClose }: { item: NestedGroup; onClose: () => void }) {
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  return (
    <div>
      <button onClick={() => setOpen(o => !o)}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '10px 20px', fontFamily: 'var(--fs)', fontSize: 13.5, fontWeight: 600, color: 'rgba(255,255,255,.85)', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
        {item.label}
        <svg style={{ width: 11, height: 11, opacity: .4, flexShrink: 0, transition: 'transform .2s', transform: open ? 'rotate(90deg)' : 'none' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
      {open && item.children.map(c => (
        <Link key={c.to} to={c.to} onClick={onClose}
          style={{ display: 'block', padding: '8px 20px 8px 36px', fontFamily: 'var(--fs)', fontSize: 13, fontWeight: 500, color: loc.pathname === c.to ? '#8DC63F' : 'rgba(255,255,255,.55)', textDecoration: 'none' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={e => { if (loc.pathname !== c.to) e.currentTarget.style.color = 'rgba(255,255,255,.55)'; }}>
          {c.label}
        </Link>
      ))}
    </div>
  );
}

/* ─── MAIN HEADER ────────────────────────────────────────────────────────────── */

export default function Header({ onGetStarted }: { onGetStarted: () => void }) {
  const [openIdx, setOpenIdx]     = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled]   = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 4);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const closeAll = useCallback(() => setOpenIdx(null), []);
  const toggle   = (i: number) => setOpenIdx(p => p === i ? null : i);

  return (
    <>
      <header style={{
        position: 'sticky', top: 0, zIndex: 500,
        background: '#0D1E52',
        boxShadow: scrolled ? '0 3px 24px rgba(9,21,64,.45)' : 'none',
        transition: 'box-shadow .3s',
      }}>
        {/* ── SINGLE ROW ── */}
        <div style={{ display: 'flex', alignItems: 'center', height: 58, padding: '0 20px', gap: 12 }}>

          {/* Logo — fixed width */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', flexShrink: 0 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: '#fff', padding: 3, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={logoSrc} alt="MyAnmol" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <div style={{ lineHeight: 1 }}>
              <div style={{ fontFamily: 'var(--fd)', fontSize: 16, fontWeight: 700, color: '#fff', letterSpacing: '-.01em' }}>MyAnmol</div>
            </div>
          </Link>

          {/* Divider */}
          <div style={{ width: 1, height: 28, background: 'rgba(255,255,255,.1)', flexShrink: 0 }} className="hidden lg:block" />

          {/* Nav items — flex-1, no wrap, overflow hidden (clips gracefully) */}
          <nav
            className="hidden lg:flex"
            style={{ flex: 1, alignItems: 'center', gap: 0, overflow: 'visible', minWidth: 0 }}
          >
            {NAV.map((entry, i) => (
              <NavItem
                key={entry.label}
                entry={entry}
                index={i}
                openIdx={openIdx}
                onToggle={toggle}
                onClose={closeAll}
              />
            ))}
          </nav>

          {/* Spacer on small screens */}
          <div style={{ flex: 1 }} className="lg:hidden" />

          {/* Right buttons — fixed width, no shrink */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <Link to="/contact"
              className="hidden lg:inline-flex"
              style={{ fontFamily: 'var(--fs)', fontSize: 12.5, fontWeight: 700, color: 'rgba(255,255,255,.72)', padding: '6px 12px', borderRadius: 7, border: '1px solid rgba(255,255,255,.15)', textDecoration: 'none', whiteSpace: 'nowrap', transition: 'all .15s' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.35)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,.72)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.15)'; }}>
              Contact Us
            </Link>
            <Link to="/investment-services"
              className="hidden lg:inline-flex"
              style={{ fontFamily: 'var(--fs)', fontSize: 12.5, fontWeight: 700, color: 'rgba(255,255,255,.72)', padding: '6px 12px', borderRadius: 7, border: '1px solid rgba(255,255,255,.15)', textDecoration: 'none', whiteSpace: 'nowrap', transition: 'all .15s' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.35)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,.72)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.15)'; }}>
              View Portfolio
            </Link>
            <button
              onClick={onGetStarted}
              className="hidden lg:inline-flex"
              style={{ fontFamily: 'var(--fs)', fontSize: 12.5, fontWeight: 800, color: '#091540', background: '#8DC63F', padding: '7px 16px', borderRadius: 100, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all .2s', alignItems: 'center' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#9ED64A'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#8DC63F'; }}>
              Get Started
            </button>

            {/* Hamburger — < lg */}
            <button onClick={() => setMobileOpen(m => !m)}
              className="flex lg:hidden"
              style={{ background: 'rgba(255,255,255,.08)', border: 'none', borderRadius: 8, width: 36, height: 36, alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', flexShrink: 0 }}
              aria-label="Toggle menu">
              <svg style={{ width: 17, height: 17 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                {mobileOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        {/* ── MOBILE DRAWER ── */}
        {mobileOpen && (
          <div
            className="lg:hidden"
            style={{ position: 'fixed', inset: 0, top: 58, background: '#091540', overflowY: 'auto', zIndex: 490 }}>
            {NAV.map(entry => (
              <MobileEntry key={entry.label} entry={entry} onClose={() => setMobileOpen(false)} />
            ))}
            <div style={{ padding: '14px 20px 40px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Link to="/contact"
                onClick={() => setMobileOpen(false)}
                style={{ fontFamily: 'var(--fs)', fontSize: 14.5, fontWeight: 700, color: '#fff', padding: '13px', borderRadius: 10, border: '1px solid rgba(255,255,255,.18)', textAlign: 'center', textDecoration: 'none' }}>
                Contact Us
              </Link>
              <Link to="/investment-services"
                style={{ fontFamily: 'var(--fs)', fontSize: 14.5, fontWeight: 700, color: '#fff', padding: '13px', borderRadius: 10, border: '1px solid rgba(255,255,255,.18)', textAlign: 'center', textDecoration: 'none' }}>
                View Portfolio
              </Link>
              <button onClick={() => { setMobileOpen(false); onGetStarted(); }}
                style={{ fontFamily: 'var(--fs)', fontSize: 14.5, fontWeight: 800, color: '#091540', background: '#8DC63F', padding: '13px', borderRadius: 10, border: 'none', cursor: 'pointer' }}>
                Get Started
              </button>
            </div>
          </div>
        )}
      </header>

    </>
  );
}
