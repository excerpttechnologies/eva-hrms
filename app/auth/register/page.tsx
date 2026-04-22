// 'use client';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { RiBuildingLine, RiArrowRightLine, RiArrowLeftLine } from 'react-icons/ri';

// export default function RegisterPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [form, setForm] = useState({ name: '', email: '', company: '', size: '', password: '' });
//   const upd = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm(f => ({ ...f, [k]: e.target.value }));

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     await new Promise(r => setTimeout(r, 1000));
//     router.push('/dashboard/dashboard');
//   };

//   return (
//     <div style={{ minHeight: '100vh', background: '#0a0f1e', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, fontFamily: 'var(--font-body)' }}>
//       <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(59,130,246,0.12) 0%, transparent 70%)' }} />
//       <div style={{ width: '100%', maxWidth: 460, position: 'relative', zIndex: 1 }}>
//         <div style={{ textAlign: 'center', marginBottom: 32 }}>
//           <div style={{ width: 52, height: 52, borderRadius: 14, background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
//             <RiBuildingLine size={26} color="white" />
//           </div>
//           <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, color: 'white', marginBottom: 6 }}>Create your account</h1>
//           <p style={{ color: '#64748b', fontSize: 14 }}>Start your 14-day free trial</p>
//         </div>
//         <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 32 }}>
//           <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
//             {[
//               { label: 'Full Name', key: 'name', type: 'text', placeholder: 'Alex Morrison' },
//               { label: 'Work Email', key: 'email', type: 'email', placeholder: 'alex@company.com' },
//               { label: 'Company Name', key: 'company', type: 'text', placeholder: 'Acme Corp' },
//               { label: 'Password', key: 'password', type: 'password', placeholder: 'Min 8 characters' },
//             ].map(f => (
//               <div key={f.key}>
//                 <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>{f.label}</label>
//                 <input className="input" type={f.type} placeholder={f.placeholder} value={(form as any)[f.key]} onChange={upd(f.key)} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }} required />
//               </div>
//             ))}
//             <div>
//               <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>Company Size</label>
//               <select className="input" value={form.size} onChange={upd('size')} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: form.size ? 'white' : '#475569' }} required>
//                 <option value="">Select size</option>
//                 {['1-10', '11-50', '51-200', '201-500', '500+'].map(s => <option key={s} value={s}>{s} employees</option>)}
//               </select>
//             </div>
//             <button type="submit" disabled={loading} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#3b82f6', color: 'white', border: 'none', borderRadius: 8, padding: '12px', fontWeight: 700, fontSize: 14, cursor: loading ? 'not-allowed' : 'pointer', marginTop: 4 }}>
//               {loading ? 'Creating account...' : <><span>Create account</span><RiArrowRightLine size={16} /></>}
//             </button>
//           </form>
//         </div>
//         <p style={{ textAlign: 'center', color: '#475569', fontSize: 13, marginTop: 20 }}>
//           Already have an account?{' '}
//           <button onClick={() => router.push('/auth/login')} style={{ background: 'none', border: 'none', color: '#3b82f6', fontWeight: 600, cursor: 'pointer', fontSize: 13 }}>Sign in</button>
//         </p>
//       </div>
//     </div>
//   );
// }




'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RiBuildingLine, RiArrowRightLine } from 'react-icons/ri';

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
    <div style={{
      minHeight: '100vh',
      background: '#fdf6f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      fontFamily: 'var(--font-body)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background blobs */}
      <div style={{
        position: 'fixed', inset: 0,
        background: 'radial-gradient(ellipse 70% 50% at 80% 10%, rgba(249,115,22,0.12) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'fixed', inset: 0,
        background: 'radial-gradient(ellipse 50% 40% at 10% 90%, rgba(249,115,22,0.08) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div style={{ width: '100%', maxWidth: 460, position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{
            width: 56, height: 56,
            borderRadius: 14,
            background: '#f97316',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px',
            boxShadow: '0 8px 24px rgba(249,115,22,0.35)',
          }}>
            <RiBuildingLine size={28} color="white" />
          </div>

          {/* NexusHR wordmark */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 10 }}>
            <div style={{
              width: 28, height: 28, borderRadius: 7,
              background: '#f97316',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, padding: 5 }}>
                {[0,1,2,3].map(i => (
                  <div key={i} style={{ width: 5, height: 5, borderRadius: 1.5, background: 'white' }} />
                ))}
              </div>
            </div>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20, color: '#1a0a00', letterSpacing: '-0.5px' }}>
              NexusHR
            </span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 28, fontWeight: 800,
            color: '#1a0a00',
            marginBottom: 6, letterSpacing: '-0.5px',
          }}>
            Create your account
          </h1>
          <p style={{ color: '#92694a', fontSize: 15 }}>Start your 14-day free trial</p>
        </div>

        {/* Card */}
        <div style={{
          background: '#ffffff',
          border: '1.5px solid rgba(249,115,22,0.15)',
          borderRadius: 20,
          padding: 36,
          boxShadow: '0 4px 32px rgba(249,115,22,0.08), 0 1px 4px rgba(0,0,0,0.06)',
        }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

            {[
              { label: 'Full Name', key: 'name', type: 'text', placeholder: 'Alex Morrison' },
              { label: 'Work Email', key: 'email', type: 'email', placeholder: 'alex@company.com' },
              { label: 'Company Name', key: 'company', type: 'text', placeholder: 'Acme Corp' },
              { label: 'Password', key: 'password', type: 'password', placeholder: 'Min 8 characters' },
            ].map(f => (
              <div key={f.key}>
                <label style={{
                  display: 'block', fontSize: 13, fontWeight: 700,
                  color: '#1a0a00', marginBottom: 8,
                }}>
                  {f.label}
                </label>
                <input
                  className="input"
                  type={f.type}
                  placeholder={f.placeholder}
                  value={(form as any)[f.key]}
                  onChange={upd(f.key)}
                  style={{
                    width: '100%',
                    paddingLeft: 14, paddingRight: 14,
                    paddingTop: 11, paddingBottom: 11,
                    background: '#fdf6f0',
                    border: '1.5px solid rgba(249,115,22,0.25)',
                    borderRadius: 10,
                    color: '#1a0a00',
                    fontSize: 14,
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => (e.target.style.borderColor = '#f97316')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(249,115,22,0.25)')}
                  required
                />
              </div>
            ))}

            {/* Company Size */}
            <div>
              <label style={{
                display: 'block', fontSize: 13, fontWeight: 700,
                color: '#1a0a00', marginBottom: 8,
              }}>
                Company Size
              </label>
              <select
                className="input"
                value={form.size}
                onChange={upd('size')}
                style={{
                  width: '100%',
                  paddingLeft: 14, paddingRight: 14,
                  paddingTop: 11, paddingBottom: 11,
                  background: '#fdf6f0',
                  border: '1.5px solid rgba(249,115,22,0.25)',
                  borderRadius: 10,
                  color: form.size ? '#1a0a00' : '#b07a55',
                  fontSize: 14,
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s',
                  appearance: 'none',
                  cursor: 'pointer',
                }}
                onFocus={e => (e.target.style.borderColor = '#f97316')}
                onBlur={e => (e.target.style.borderColor = 'rgba(249,115,22,0.25)')}
                required
              >
                <option value="">Select size</option>
                {['1-10', '11-50', '51-200', '201-500', '500+'].map(s => (
                  <option key={s} value={s}>{s} employees</option>
                ))}
              </select>
            </div>

            {/* Terms note */}
            <p style={{ fontSize: 12, color: '#92694a', textAlign: 'center', margin: '-4px 0 0' }}>
              By creating an account you agree to our{' '}
              <span style={{ color: '#f97316', fontWeight: 600, cursor: 'pointer' }}>Terms</span>
              {' '}&amp;{' '}
              <span style={{ color: '#f97316', fontWeight: 600, cursor: 'pointer' }}>Privacy Policy</span>
            </p>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                background: loading ? '#fdba74' : '#f97316',
                color: 'white',
                border: 'none',
                borderRadius: 10,
                padding: '13px',
                fontWeight: 800,
                fontSize: 15,
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                boxShadow: loading ? 'none' : '0 4px 16px rgba(249,115,22,0.4)',
                letterSpacing: '0.01em',
                marginTop: 4,
              }}
              onMouseEnter={e => { if (!loading) (e.currentTarget.style.background = '#ea6c0a'); }}
              onMouseLeave={e => { if (!loading) (e.currentTarget.style.background = '#f97316'); }}
            >
              {loading ? 'Creating account...' : <><span>Create account</span><RiArrowRightLine size={17} /></>}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p style={{ textAlign: 'center', color: '#92694a', fontSize: 13, marginTop: 24 }}>
          Already have an account?{' '}
          <button
            onClick={() => router.push('/auth/login')}
            style={{
              background: 'none', border: 'none',
              color: '#f97316', fontWeight: 700,
              cursor: 'pointer', fontSize: 13,
            }}
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}