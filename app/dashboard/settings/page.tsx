'use client';
import { useState, useEffect } from 'react';
import { PageSkeleton } from '@/components/ui/Skeleton';
import { RiSettings3Line, RiBuildingLine, RiBellLine, RiPaletteLine, RiShieldLine, RiGlobalLine } from 'react-icons/ri';

const settingsSections = [
  { id: 'company', label: 'Company', icon: RiBuildingLine },
  { id: 'notifications', label: 'Notifications', icon: RiBellLine },
  { id: 'appearance', label: 'Appearance', icon: RiPaletteLine },
  { id: 'security', label: 'Security', icon: RiShieldLine },
  { id: 'integrations', label: 'Integrations', icon: RiGlobalLine },
];

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('company');
  const [company, setCompany] = useState({ name: 'Acme Corporation', email: 'hr@acme.com', website: 'https://acme.com', industry: 'Technology', size: '51-200', timezone: 'America/New_York', currency: 'USD' });
  const [notifs, setNotifs] = useState({ emailLeave: true, emailPayroll: true, emailRecruitment: false, pushAll: true, weeklyReport: true });
  useEffect(() => { setTimeout(() => setLoading(false), 600); }, []);
  if (loading) return <PageSkeleton />;

  return (
    <div className="fade-in-up">
      <h1 className="page-title" style={{ marginBottom: 24 }}>Settings</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 20, alignItems: 'start' }}>
        {/* Sidebar nav */}
        <div className="card" style={{ padding: 8 }}>
          {settingsSections.map(s => (
            <button key={s.id} onClick={() => setActiveSection(s.id)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, marginBottom: 2, background: activeSection === s.id ? 'rgba(59,130,246,0.1)' : 'transparent', color: activeSection === s.id ? '#3b82f6' : 'var(--text-secondary)', textAlign: 'left', transition: 'all 0.15s' }}>
              <s.icon size={15} /> {s.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="card" style={{ padding: 28 }}>
          {activeSection === 'company' && (
            <div>
              <div style={{ fontWeight: 700, fontSize: 16, fontFamily: 'var(--font-display)', color: 'var(--text-primary)', marginBottom: 6 }}>Company Settings</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 24 }}>Update your organization's information</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {[['Company Name', 'name', 'text'], ['Email', 'email', 'email'], ['Website', 'website', 'url'], ['Industry', 'industry', 'text']].map(([label, key, type]) => (
                  <div key={key}>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>{label}</label>
                    <input className="input" type={type} value={(company as any)[key]} onChange={e => setCompany(c => ({ ...c, [key]: e.target.value }))} />
                  </div>
                ))}
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>Company Size</label>
                  <select className="input" value={company.size} onChange={e => setCompany(c => ({ ...c, size: e.target.value }))}>
                    {['1-10', '11-50', '51-200', '201-500', '500+'].map(s => <option key={s} value={s}>{s} employees</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>Currency</label>
                  <select className="input" value={company.currency} onChange={e => setCompany(c => ({ ...c, currency: e.target.value }))}>
                    {['USD', 'EUR', 'GBP', 'INR', 'CAD', 'AUD'].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <button className="btn-primary" style={{ marginTop: 20 }} onClick={() => alert('Settings saved!')}>Save Changes</button>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div>
              <div style={{ fontWeight: 700, fontSize: 16, fontFamily: 'var(--font-display)', color: 'var(--text-primary)', marginBottom: 6 }}>Notification Preferences</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 24 }}>Configure when and how you receive notifications</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { key: 'emailLeave', label: 'Leave Requests', desc: 'Email when employees submit leave requests' },
                  { key: 'emailPayroll', label: 'Payroll Alerts', desc: 'Email for payroll processing updates' },
                  { key: 'emailRecruitment', label: 'New Applications', desc: 'Email when candidates apply for positions' },
                  { key: 'pushAll', label: 'Push Notifications', desc: 'Browser push for all activity' },
                  { key: 'weeklyReport', label: 'Weekly Summary', desc: 'Weekly HR digest every Monday' },
                ].map(n => (
                  <div key={n.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16, background: 'var(--bg-tertiary)', borderRadius: 10 }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{n.label}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{n.desc}</div>
                    </div>
                    <button onClick={() => setNotifs(prev => ({ ...prev, [n.key]: !(prev as any)[n.key] }))} style={{ width: 44, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer', transition: 'background 0.2s', background: (notifs as any)[n.key] ? '#3b82f6' : 'var(--border)', position: 'relative' }}>
                      <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'white', position: 'absolute', top: 3, transition: 'left 0.2s', left: (notifs as any)[n.key] ? 23 : 3 }} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'appearance' && (
            <div>
              <div style={{ fontWeight: 700, fontSize: 16, fontFamily: 'var(--font-display)', color: 'var(--text-primary)', marginBottom: 6 }}>Appearance</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 24 }}>Customize how NexusHR looks for you</div>
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 12 }}>Theme</div>
                <div style={{ display: 'flex', gap: 12 }}>
                  {['Light', 'Dark', 'System'].map(t => (
                    <div key={t} style={{ flex: 1, padding: 16, borderRadius: 10, border: `2px solid ${t === 'Light' ? '#3b82f6' : 'var(--border)'}`, cursor: 'pointer', textAlign: 'center', fontSize: 13, fontWeight: 600, color: t === 'Light' ? '#3b82f6' : 'var(--text-secondary)' }}>
                      {t === 'Light' ? '☀️' : t === 'Dark' ? '🌙' : '💻'} {t}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 12 }}>Accent Color</div>
                <div style={{ display: 'flex', gap: 10 }}>
                  {['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4'].map(c => (
                    <div key={c} style={{ width: 32, height: 32, borderRadius: '50%', background: c, cursor: 'pointer', border: c === '#3b82f6' ? '3px solid var(--text-primary)' : '3px solid transparent', transition: 'border 0.15s' }} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {(activeSection === 'security' || activeSection === 'integrations') && (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
              <RiSettings3Line size={40} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
              <div style={{ fontWeight: 600, marginBottom: 4 }}>{activeSection === 'security' ? 'Security Settings' : 'Integrations'}</div>
              <div style={{ fontSize: 13 }}>This section is ready for backend integration</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
