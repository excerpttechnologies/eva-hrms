'use client';
import { useState, useEffect } from 'react';
import { PageSkeleton } from '@/components/ui/Skeleton';
import { getInitials, formatDate } from '@/lib/utils';
import { RiEditLine, RiLockLine, RiHistoryLine, RiUserLine, RiMailLine, RiPhoneLine, RiBuildingLine } from 'react-icons/ri';

const activityLog = [
  { action: 'Logged in', time: 'Today, 9:02 AM', ip: '192.168.1.1' },
  { action: 'Approved leave for Sarah Chen', time: 'Today, 9:15 AM', ip: '192.168.1.1' },
  { action: 'Exported payroll report', time: 'Today, 10:30 AM', ip: '192.168.1.1' },
  { action: 'Updated employee record (E007)', time: 'Yesterday, 3:45 PM', ip: '192.168.1.2' },
  { action: 'Logged out', time: 'Yesterday, 6:00 PM', ip: '192.168.1.2' },
];

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: 'Alex Morrison', email: 'alex@nexushr.com', phone: '+1 555-0100', department: 'HR', position: 'HR Manager', location: 'New York' });
  useEffect(() => { setTimeout(() => setLoading(false), 600); }, []);
  if (loading) return <PageSkeleton />;

  const tabs = [
    { id: 'profile', label: 'Profile', icon: RiUserLine },
    { id: 'security', label: 'Security', icon: RiLockLine },
    { id: 'activity', label: 'Activity Log', icon: RiHistoryLine },
  ];

  return (
    <div className="fade-in-up">
      <h1 className="page-title" style={{ marginBottom: 24 }}>My Profile</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 20, alignItems: 'start' }}>
        {/* Sidebar card */}
        <div className="card" style={{ padding: 24, textAlign: 'center' }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, fontWeight: 800, color: 'white', margin: '0 auto 16px' }}>
            {getInitials(form.name)}
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, color: 'var(--text-primary)' }}>{form.name}</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{form.position}</div>
          <span className="badge badge-blue" style={{ marginTop: 8 }}>Admin</span>
          <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'left' }}>
            {[
              { icon: RiMailLine, val: form.email },
              { icon: RiPhoneLine, val: form.phone },
              { icon: RiBuildingLine, val: `${form.department} · ${form.location}` },
            ].map(({ icon: Icon, val }) => (
              <div key={val} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--text-secondary)' }}>
                <Icon size={14} style={{ flexShrink: 0 }} /> {val}
              </div>
            ))}
          </div>
          <button className="btn-secondary" style={{ width: '100%', marginTop: 20, justifyContent: 'center' }} onClick={() => setEditing(!editing)}>
            <RiEditLine size={14} /> Edit Profile
          </button>
        </div>

        {/* Main content */}
        <div>
          {/* Tabs */}
          <div style={{ display: 'flex', gap: 2, marginBottom: 20, background: 'var(--bg-tertiary)', padding: 4, borderRadius: 10, width: 'fit-content' }}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600, transition: 'all 0.2s', background: activeTab === t.id ? 'var(--bg-card)' : 'transparent', color: activeTab === t.id ? 'var(--text-primary)' : 'var(--text-muted)', boxShadow: activeTab === t.id ? '0 1px 3px rgba(0,0,0,0.08)' : 'none' }}>
                <t.icon size={14} /> {t.label}
              </button>
            ))}
          </div>

          {activeTab === 'profile' && (
            <div className="card" style={{ padding: 24 }}>
              <div style={{ fontWeight: 700, fontSize: 15, fontFamily: 'var(--font-display)', color: 'var(--text-primary)', marginBottom: 20 }}>Personal Information</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {[['Full Name', 'name'], ['Email', 'email'], ['Phone', 'phone'], ['Position', 'position'], ['Department', 'department'], ['Location', 'location']].map(([label, key]) => (
                  <div key={key}>
                    <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</label>
                    {editing ? (
                      <input className="input" value={(form as any)[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} />
                    ) : (
                      <div style={{ fontSize: 13, color: 'var(--text-primary)', fontWeight: 500, padding: '10px 0' }}>{(form as any)[key]}</div>
                    )}
                  </div>
                ))}
              </div>
              {editing && (
                <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
                  <button className="btn-primary" onClick={() => setEditing(false)}>Save Changes</button>
                  <button className="btn-secondary" onClick={() => setEditing(false)}>Cancel</button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'security' && (
            <div className="card" style={{ padding: 24 }}>
              <div style={{ fontWeight: 700, fontSize: 15, fontFamily: 'var(--font-display)', color: 'var(--text-primary)', marginBottom: 20 }}>Change Password</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 400 }}>
                {['Current Password', 'New Password', 'Confirm New Password'].map(label => (
                  <div key={label}>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>{label}</label>
                    <input className="input" type="password" placeholder="••••••••" />
                  </div>
                ))}
                <button className="btn-primary" style={{ width: 'fit-content' }} onClick={() => alert('Password updated!')}>Update Password</button>
              </div>
              <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)', marginBottom: 12 }}>Two-Factor Authentication</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: 'var(--bg-tertiary)', borderRadius: 10 }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>Authenticator App</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Use Google Authenticator or similar</div>
                  </div>
                  <button className="btn-primary" style={{ fontSize: 12 }}>Enable</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="card" style={{ padding: 24 }}>
              <div style={{ fontWeight: 700, fontSize: 15, fontFamily: 'var(--font-display)', color: 'var(--text-primary)', marginBottom: 20 }}>Recent Activity</div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {activityLog.map((log, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '12px 0', borderBottom: i < activityLog.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <RiHistoryLine size={14} style={{ color: 'var(--text-muted)' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{log.action}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 3 }}>{log.time} · IP: {log.ip}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
