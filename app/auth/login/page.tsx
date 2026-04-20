'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RiBuildingLine, RiMailLine, RiLockLine, RiEyeLine, RiEyeOffLine, RiArrowRightLine } from 'react-icons/ri';

export default function LoginPage() {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: 'alex@nexushr.com', password: 'password' });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    router.push('/dashboard/dashboard');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0f1e', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, fontFamily: 'var(--font-body)' }}>
      <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(59,130,246,0.12) 0%, transparent 70%)' }} />
      <div style={{ width: '100%', maxWidth: 420, position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <RiBuildingLine size={26} color="white" />
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, color: 'white', marginBottom: 6 }}>Welcome back</h1>
          <p style={{ color: '#64748b', fontSize: 14 }}>Sign in to NexusHR Enterprise</p>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 32 }}>
          <div style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 10, padding: 12, marginBottom: 24, fontSize: 12 }}>
            <div style={{ color: '#93c5fd', fontWeight: 700, marginBottom: 6 }}>Demo — click to fill</div>
            {[['Admin', 'alex@nexushr.com'], ['Employee', 'sarah@nexushr.com']].map(([role, email]) => (
              <div key={role} style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', marginBottom: 2 }}>
                <span>{role}:</span>
                <button onClick={() => setForm({ email, password: 'password' })} style={{ color: '#60a5fa', background: 'none', border: 'none', cursor: 'pointer', fontSize: 12 }}>{email}</button>
              </div>
            ))}
          </div>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>Email address</label>
              <div style={{ position: 'relative' }}>
                <RiMailLine size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
                <input className="input" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} style={{ paddingLeft: 36, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }} required />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>Password</label>
              <div style={{ position: 'relative' }}>
                <RiLockLine size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
                <input className="input" type={showPass ? 'text' : 'password'} value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} style={{ paddingLeft: 36, paddingRight: 36, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }} required />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#475569', cursor: 'pointer' }}>
                  {showPass ? <RiEyeOffLine size={14} /> : <RiEyeLine size={14} />}
                </button>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button type="button" onClick={() => router.push('/auth/forgot-password')} style={{ background: 'none', border: 'none', color: '#3b82f6', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}>Forgot password?</button>
            </div>
            <button type="submit" disabled={loading} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: loading ? '#1e3a8a' : '#3b82f6', color: 'white', border: 'none', borderRadius: 8, padding: '12px', fontWeight: 700, fontSize: 14, cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.2s' }}>
              {loading ? 'Signing in...' : <><span>Sign In</span><RiArrowRightLine size={16} /></>}
            </button>
          </form>
        </div>
        <p style={{ textAlign: 'center', color: '#475569', fontSize: 13, marginTop: 20 }}>
          No account?{' '}
          <button onClick={() => router.push('/auth/register')} style={{ background: 'none', border: 'none', color: '#3b82f6', fontWeight: 600, cursor: 'pointer', fontSize: 13 }}>Create one free</button>
        </p>
      </div>
    </div>
  );
}
