'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RiBuildingLine, RiMailLine, RiArrowLeftLine, RiCheckLine } from 'react-icons/ri';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setSent(true);
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0f1e', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, fontFamily: 'var(--font-body)' }}>
      <div style={{ width: '100%', maxWidth: 400, position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: sent ? '#10b981' : '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', transition: 'background 0.3s' }}>
            {sent ? <RiCheckLine size={26} color="white" /> : <RiBuildingLine size={26} color="white" />}
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, color: 'white', marginBottom: 6 }}>{sent ? 'Check your email' : 'Reset password'}</h1>
          <p style={{ color: '#64748b', fontSize: 14 }}>{sent ? `We sent a reset link to ${email}` : 'Enter your email to receive a reset link'}</p>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 32 }}>
          {!sent ? (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>Email address</label>
                <div style={{ position: 'relative' }}>
                  <RiMailLine size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
                  <input className="input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="alex@company.com" style={{ paddingLeft: 36, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }} required />
                </div>
              </div>
              <button type="submit" disabled={loading} style={{ background: '#3b82f6', color: 'white', border: 'none', borderRadius: 8, padding: '12px', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
                {loading ? 'Sending...' : 'Send reset link'}
              </button>
            </form>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 20 }}>Didn't receive it? Check your spam folder or try again.</p>
              <button onClick={() => setSent(false)} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: 8, padding: '10px 20px', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>Try again</button>
            </div>
          )}
        </div>
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <button onClick={() => router.push('/auth/login')} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: '#475569', fontSize: 13, cursor: 'pointer' }}>
            <RiArrowLeftLine size={14} /> Back to sign in
          </button>
        </div>
      </div>
    </div>
  );
}
