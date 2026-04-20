'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RiBuildingLine, RiArrowRightLine, RiArrowLeftLine } from 'react-icons/ri';

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', company: '', size: '', password: '' });
  const upd = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    router.push('/dashboard/dashboard');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0f1e', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, fontFamily: 'var(--font-body)' }}>
      <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(59,130,246,0.12) 0%, transparent 70%)' }} />
      <div style={{ width: '100%', maxWidth: 460, position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <RiBuildingLine size={26} color="white" />
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, color: 'white', marginBottom: 6 }}>Create your account</h1>
          <p style={{ color: '#64748b', fontSize: 14 }}>Start your 14-day free trial</p>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 32 }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { label: 'Full Name', key: 'name', type: 'text', placeholder: 'Alex Morrison' },
              { label: 'Work Email', key: 'email', type: 'email', placeholder: 'alex@company.com' },
              { label: 'Company Name', key: 'company', type: 'text', placeholder: 'Acme Corp' },
              { label: 'Password', key: 'password', type: 'password', placeholder: 'Min 8 characters' },
            ].map(f => (
              <div key={f.key}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>{f.label}</label>
                <input className="input" type={f.type} placeholder={f.placeholder} value={(form as any)[f.key]} onChange={upd(f.key)} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }} required />
              </div>
            ))}
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>Company Size</label>
              <select className="input" value={form.size} onChange={upd('size')} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: form.size ? 'white' : '#475569' }} required>
                <option value="">Select size</option>
                {['1-10', '11-50', '51-200', '201-500', '500+'].map(s => <option key={s} value={s}>{s} employees</option>)}
              </select>
            </div>
            <button type="submit" disabled={loading} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#3b82f6', color: 'white', border: 'none', borderRadius: 8, padding: '12px', fontWeight: 700, fontSize: 14, cursor: loading ? 'not-allowed' : 'pointer', marginTop: 4 }}>
              {loading ? 'Creating account...' : <><span>Create account</span><RiArrowRightLine size={16} /></>}
            </button>
          </form>
        </div>
        <p style={{ textAlign: 'center', color: '#475569', fontSize: 13, marginTop: 20 }}>
          Already have an account?{' '}
          <button onClick={() => router.push('/auth/login')} style={{ background: 'none', border: 'none', color: '#3b82f6', fontWeight: 600, cursor: 'pointer', fontSize: 13 }}>Sign in</button>
        </p>
      </div>
    </div>
  );
}
