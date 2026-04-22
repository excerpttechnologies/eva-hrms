// 'use client';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { RiBuildingLine, RiMailLine, RiLockLine, RiEyeLine, RiEyeOffLine, RiArrowRightLine } from 'react-icons/ri';

// export default function LoginPage() {
//   const router = useRouter();
//   const [showPass, setShowPass] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [form, setForm] = useState({ email: 'alex@nexushr.com', password: 'password' });

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     await new Promise(r => setTimeout(r, 900));
//     router.push('/dashboard/dashboard');
//   };

//   return (
//     <div style={{ minHeight: '100vh', background: '#0a0f1e', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, fontFamily: 'var(--font-body)' }}>
//       <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(59,130,246,0.12) 0%, transparent 70%)' }} />
//       <div style={{ width: '100%', maxWidth: 420, position: 'relative', zIndex: 1 }}>
//         <div style={{ textAlign: 'center', marginBottom: 32 }}>
//           <div style={{ width: 52, height: 52, borderRadius: 14, background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
//             <RiBuildingLine size={26} color="white" />
//           </div>
//           <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, color: 'white', marginBottom: 6 }}>Welcome back</h1>
//           <p style={{ color: '#64748b', fontSize: 14 }}>Sign in to NexusHR Enterprise</p>
//         </div>
//         <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 32 }}>
//           <div style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 10, padding: 12, marginBottom: 24, fontSize: 12 }}>
//             <div style={{ color: '#93c5fd', fontWeight: 700, marginBottom: 6 }}>Demo — click to fill</div>
//             {[['Admin', 'alex@nexushr.com'], ['Employee', 'sarah@nexushr.com']].map(([role, email]) => (
//               <div key={role} style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', marginBottom: 2 }}>
//                 <span>{role}:</span>
//                 <button onClick={() => setForm({ email, password: 'password' })} style={{ color: '#60a5fa', background: 'none', border: 'none', cursor: 'pointer', fontSize: 12 }}>{email}</button>
//               </div>
//             ))}
//           </div>
//           <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
//             <div>
//               <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>Email address</label>
//               <div style={{ position: 'relative' }}>
//                 <RiMailLine size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
//                 <input className="input" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} style={{ paddingLeft: 36, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }} required />
//               </div>
//             </div>
//             <div>
//               <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>Password</label>
//               <div style={{ position: 'relative' }}>
//                 <RiLockLine size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
//                 <input className="input" type={showPass ? 'text' : 'password'} value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} style={{ paddingLeft: 36, paddingRight: 36, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }} required />
//                 <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#475569', cursor: 'pointer' }}>
//                   {showPass ? <RiEyeOffLine size={14} /> : <RiEyeLine size={14} />}
//                 </button>
//               </div>
//             </div>
//             <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
//               <button type="button" onClick={() => router.push('/auth/forgot-password')} style={{ background: 'none', border: 'none', color: '#3b82f6', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}>Forgot password?</button>
//             </div>
//             <button type="submit" disabled={loading} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: loading ? '#1e3a8a' : '#3b82f6', color: 'white', border: 'none', borderRadius: 8, padding: '12px', fontWeight: 700, fontSize: 14, cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.2s' }}>
//               {loading ? 'Signing in...' : <><span>Sign In</span><RiArrowRightLine size={16} /></>}
//             </button>
//           </form>
//         </div>
//         <p style={{ textAlign: 'center', color: '#475569', fontSize: 13, marginTop: 20 }}>
//           No account?{' '}
//           <button onClick={() => router.push('/auth/register')} style={{ background: 'none', border: 'none', color: '#3b82f6', fontWeight: 600, cursor: 'pointer', fontSize: 13 }}>Create one free</button>
//         </p>
//       </div>
//     </div>
//   );
// }






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
      {/* Background blobs matching landing page feel */}
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

      <div style={{ width: '100%', maxWidth: 440, position: 'relative', zIndex: 1 }}>

        {/* Logo + Brand */}
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
            Welcome back
          </h1>
          <p style={{ color: '#92694a', fontSize: 15 }}>Sign in to NexusHR Enterprise</p>
        </div>

        {/* Card */}
        <div style={{
          background: '#ffffff',
          border: '1.5px solid rgba(249,115,22,0.15)',
          borderRadius: 20,
          padding: 36,
          boxShadow: '0 4px 32px rgba(249,115,22,0.08), 0 1px 4px rgba(0,0,0,0.06)',
        }}>

          {/* Demo credentials box */}
          <div style={{
            background: 'rgba(249,115,22,0.07)',
            border: '1px solid rgba(249,115,22,0.25)',
            borderRadius: 12,
            padding: '12px 16px',
            marginBottom: 28,
            fontSize: 12,
          }}>
            <div style={{ color: '#c2410c', fontWeight: 700, marginBottom: 8, fontSize: 12 }}>
              Demo — click to fill
            </div>
            {[['Admin', 'alex@nexushr.com'], ['Employee', 'sarah@nexushr.com']].map(([role, email]) => (
              <div key={role} style={{
                display: 'flex', justifyContent: 'space-between',
                color: '#92694a', marginBottom: 4, alignItems: 'center',
              }}>
                <span style={{ fontWeight: 500 }}>{role}:</span>
                <button
                  onClick={() => setForm({ email, password: 'password' })}
                  style={{
                    color: '#f97316', background: 'none', border: 'none',
                    cursor: 'pointer', fontSize: 12, fontWeight: 600,
                    textDecoration: 'underline', textDecorationStyle: 'dotted',
                    textUnderlineOffset: 3,
                  }}
                >
                  {email}
                </button>
              </div>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Email */}
            <div>
              <label style={{
                display: 'block', fontSize: 13, fontWeight: 700,
                color: '#1a0a00', marginBottom: 8,
              }}>
                Email address
              </label>
              <div style={{ position: 'relative' }}>
                <RiMailLine size={15} style={{
                  position: 'absolute', left: 13, top: '50%',
                  transform: 'translateY(-50%)', color: '#f97316',
                }} />
                <input
                  className="input"
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  style={{
                    width: '100%',
                    paddingLeft: 40, paddingRight: 14,
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
            </div>

            {/* Password */}
            <div>
              <label style={{
                display: 'block', fontSize: 13, fontWeight: 700,
                color: '#1a0a00', marginBottom: 8,
              }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <RiLockLine size={15} style={{
                  position: 'absolute', left: 13, top: '50%',
                  transform: 'translateY(-50%)', color: '#f97316',
                }} />
                <input
                  className="input"
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  style={{
                    width: '100%',
                    paddingLeft: 40, paddingRight: 42,
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
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={{
                    position: 'absolute', right: 12, top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none', border: 'none',
                    color: '#f97316', cursor: 'pointer', padding: 0,
                    display: 'flex', alignItems: 'center',
                  }}
                >
                  {showPass ? <RiEyeOffLine size={15} /> : <RiEyeLine size={15} />}
                </button>
              </div>
            </div>

            {/* Forgot password */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: -8 }}>
              <button
                type="button"
                onClick={() => router.push('/auth/forgot-password')}
                style={{
                  background: 'none', border: 'none',
                  color: '#f97316', fontSize: 13,
                  cursor: 'pointer', fontWeight: 600,
                  padding: 0,
                }}
              >
                Forgot password?
              </button>
            </div>

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
              }}
              onMouseEnter={e => { if (!loading) (e.currentTarget.style.background = '#ea6c0a'); }}
              onMouseLeave={e => { if (!loading) (e.currentTarget.style.background = '#f97316'); }}
            >
              {loading ? 'Signing in...' : <><span>Sign In</span><RiArrowRightLine size={17} /></>}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p style={{ textAlign: 'center', color: '#92694a', fontSize: 13, marginTop: 24 }}>
          No account?{' '}
          <button
            onClick={() => router.push('/auth/register')}
            style={{
              background: 'none', border: 'none',
              color: '#f97316', fontWeight: 700,
              cursor: 'pointer', fontSize: 13,
            }}
          >
            Create one free
          </button>
        </p>
      </div>
    </div>
  );
}