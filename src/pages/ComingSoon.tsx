import { Link, useLocation } from 'react-router';

export default function ComingSoon() {
  const { pathname } = useLocation();
  const label = pathname.split('/').filter(Boolean).pop()?.replace(/-/g, ' ') ?? 'This page';

  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--fs)', textAlign: 'center', padding: '80px 24px', background: '#F8FAFE' }}>
      <div>
        <div style={{ width: 80, height: 80, borderRadius: '24%', background: '#EEF2FB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, margin: '0 auto 24px', boxShadow: '0 8px 30px rgba(26,59,159,.12)' }}>🚧</div>
        <span style={{ fontFamily: 'var(--fs)', fontSize: 11, fontWeight: 800, letterSpacing: '.16em', textTransform: 'uppercase', color: '#8DC63F', display: 'block', marginBottom: 12 }}>Coming Soon</span>
        <h1 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(26px,4vw,38px)', fontWeight: 700, color: '#111827', marginBottom: 14, textTransform: 'capitalize', letterSpacing: '-.02em' }}>{label}</h1>
        <p style={{ fontSize: 15.5, lineHeight: 1.75, color: '#6B7280', fontWeight: 300, maxWidth: '42ch', margin: '0 auto 32px' }}>
          This page is being built. Check back soon, or explore what's already available.
        </p>
        <Link to="/"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--fs)', fontSize: 14, fontWeight: 800, color: '#091540', background: '#8DC63F', padding: '12px 26px', borderRadius: 100 }}>
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
