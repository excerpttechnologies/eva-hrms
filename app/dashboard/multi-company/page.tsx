'use client';
import { useState, useEffect } from 'react';
import { PageSkeleton } from '@/components/ui/Skeleton';
import { RiBuildingLine, RiAddLine, RiSettings3Line, RiArrowRightLine } from 'react-icons/ri';

const companies = [
  { id: 'C001', name: 'Acme Corporation', industry: 'Technology', employees: 72, plan: 'Enterprise', status: 'active', revenue: '$7.2M', logo: 'AC', color: '#3b82f6' },
  { id: 'C002', name: 'Global Ventures', industry: 'Finance', employees: 145, plan: 'Enterprise', status: 'active', revenue: '$18.4M', logo: 'GV', color: '#10b981' },
  { id: 'C003', name: 'Startup Hub', industry: 'SaaS', employees: 28, plan: 'Professional', status: 'active', revenue: '$1.2M', logo: 'SH', color: '#8b5cf6' },
  { id: 'C004', name: 'Retail Chain Co', industry: 'Retail', employees: 320, plan: 'Enterprise', status: 'active', revenue: '$42M', logo: 'RC', color: '#f59e0b' },
  { id: 'C005', name: 'New Tenant', industry: 'Healthcare', employees: 0, plan: 'Starter', status: 'pending', revenue: '-', logo: 'NT', color: '#94a3b8' },
];

export default function MultiCompanyPage() {
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState('C001');
  useEffect(() => { setTimeout(() => setLoading(false), 600); }, []);
  if (loading) return <PageSkeleton />;

  const selected = companies.find(c => c.id === active);

  return (
    <div className="fade-in-up">
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
        <div style={{ width: 46, height: 46, borderRadius: 14, background: 'linear-gradient(135deg, #1e3a8a, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <RiBuildingLine size={22} color="white" />
        </div>
        <div>
          <h1 className="page-title">Multi-Company Management</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 2 }}>Super Admin — Tenant and company management</p>
        </div>
        <button className="btn-primary" style={{ marginLeft: 'auto' }}><RiAddLine size={16} /> Add Company</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Total Companies', value: companies.length },
          { label: 'Total Employees', value: companies.reduce((s, c) => s + c.employees, 0) },
          { label: 'Active Tenants', value: companies.filter(c => c.status === 'active').length },
          { label: 'MRR', value: '$42.8K' },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding: 18, textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 26, fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
        {companies.map(c => (
          <div key={c.id} onClick={() => setActive(c.id)}
            className="card"
            style={{ padding: 20, cursor: 'pointer', borderLeft: `4px solid ${c.id === active ? c.color : 'transparent'}`, transition: 'all 0.2s' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: c.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, color: c.color, flexShrink: 0 }}>{c.logo}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)' }}>{c.name}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{c.industry}</div>
              </div>
              <span className={`badge ${c.status === 'active' ? 'badge-success' : 'badge-warning'}`}>{c.status}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              {[['Employees', c.employees], ['Plan', c.plan], ['Revenue', c.revenue]].map(([k, v]) => (
                <div key={k as string}>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 2 }}>{k}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
              <button className="btn-primary" style={{ fontSize: 11, flex: 1, justifyContent: 'center' }} onClick={() => alert(`Switching to ${c.name}`)}>
                Switch <RiArrowRightLine size={12} />
              </button>
              <button className="btn-secondary" style={{ fontSize: 11, padding: '6px 10px' }}><RiSettings3Line size={13} /></button>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="card" style={{ padding: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 15, fontFamily: 'var(--font-display)', color: 'var(--text-primary)', marginBottom: 16 }}>
            {selected.name} — Admin Panel
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {['Manage Users', 'Billing & Plan', 'Data Export', 'Integrations', 'Security Settings', 'Audit Logs'].map(action => (
              <button key={action} className="btn-secondary" style={{ justifyContent: 'space-between', fontSize: 12 }} onClick={() => alert(`${action} for ${selected.name}`)}>
                {action} <RiArrowRightLine size={12} />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
