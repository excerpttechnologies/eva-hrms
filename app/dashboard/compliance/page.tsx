'use client';
import { useState, useEffect } from 'react';
import { PageSkeleton } from '@/components/ui/Skeleton';
import { Pagination } from '@/components/ui/Pagination';
import { paginate, formatDate } from '@/lib/utils';
import { RiShieldCheckLine, RiAlertLine, RiFileTextLine } from 'react-icons/ri';

const auditLogs = [
  { id: 'AL001', user: 'Alex Morrison', action: 'Exported employee data', module: 'Employees', ip: '192.168.1.1', time: '2024-01-15 09:12', risk: 'low' },
  { id: 'AL002', user: 'Priya Sharma', action: 'Approved leave request L002', module: 'Leave', ip: '192.168.1.3', time: '2024-01-15 09:45', risk: 'none' },
  { id: 'AL003', user: 'Marcus Johnson', action: 'Updated salary: Emma Thompson', module: 'Payroll', ip: '192.168.1.4', time: '2024-01-15 10:20', risk: 'medium' },
  { id: 'AL004', user: 'Alex Morrison', action: 'Deleted user session (forced logout)', module: 'Auth', ip: '192.168.1.1', time: '2024-01-15 11:00', risk: 'medium' },
  { id: 'AL005', user: 'Amara Osei', action: 'Accessed compliance documents', module: 'Documents', ip: '192.168.1.9', time: '2024-01-15 11:30', risk: 'none' },
  { id: 'AL006', user: 'Unknown', action: 'Failed login attempt × 3', module: 'Auth', ip: '185.220.101.8', time: '2024-01-15 13:00', risk: 'high' },
  { id: 'AL007', user: 'Alex Morrison', action: 'Changed role: Isaac Brown → Manager', module: 'Users', ip: '192.168.1.1', time: '2024-01-15 14:00', risk: 'medium' },
  { id: 'AL008', user: 'Emma Thompson', action: 'Submitted expense $599 (Adobe)', module: 'Finance', ip: '192.168.1.5', time: '2024-01-15 15:10', risk: 'none' },
];

const policies = [
  { name: 'Data Privacy Policy', version: 'v2.1', status: 'active', lastReview: '2024-01-01', nextReview: '2025-01-01', owner: 'Amara Osei' },
  { name: 'Leave Policy', version: 'v3.0', status: 'active', lastReview: '2023-11-15', nextReview: '2024-11-15', owner: 'Priya Sharma' },
  { name: 'Remote Work Policy', version: 'v1.2', status: 'review-needed', lastReview: '2023-06-01', nextReview: '2024-01-01', owner: 'Alex Morrison' },
  { name: 'Code of Conduct', version: 'v4.0', status: 'active', lastReview: '2024-01-10', nextReview: '2025-01-10', owner: 'Amara Osei' },
  { name: 'Expense Policy', version: 'v2.0', status: 'active', lastReview: '2023-09-01', nextReview: '2024-09-01', owner: 'Emma Thompson' },
];

const riskBadge = (r: string) => {
  const map: Record<string, string> = { high: 'badge-danger', medium: 'badge-warning', low: 'badge-info', none: 'badge-success' };
  return <span className={`badge ${map[r]}`}>{r}</span>;
};

export default function CompliancePage() {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState<'audit' | 'policies'>('audit');
  useEffect(() => { setTimeout(() => setLoading(false), 600); }, []);
  if (loading) return <PageSkeleton />;

  const { data, total, pages } = paginate(auditLogs, page, 6);

  return (
    <div className="fade-in-up">
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
        <div style={{ width: 46, height: 46, borderRadius: 14, background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <RiShieldCheckLine size={22} color="white" />
        </div>
        <div>
          <h1 className="page-title">Compliance & Audit</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 2 }}>Audit logs, policy tracking and compliance violations</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Audit Events Today', value: auditLogs.length, color: '#3b82f6' },
          { label: 'High Risk Events', value: auditLogs.filter(l => l.risk === 'high').length, color: '#ef4444' },
          { label: 'Policies Active', value: policies.filter(p => p.status === 'active').length, color: '#10b981' },
          { label: 'Reviews Overdue', value: policies.filter(p => p.status === 'review-needed').length, color: '#f59e0b' },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding: 18 }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 26, fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>{s.value}</div>
            <div style={{ width: 30, height: 3, background: s.color, borderRadius: 2, marginTop: 8 }} />
          </div>
        ))}
      </div>

      {/* High risk alert */}
      <div style={{ padding: '12px 16px', background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: 10, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
        <RiAlertLine size={16} color="#ef4444" />
        <span style={{ fontSize: 13, fontWeight: 600, color: '#991b1b' }}>Security Alert: Failed login attempts from unknown IP (185.220.101.8) — Jan 15, 2024 at 1:00 PM</span>
        <button style={{ marginLeft: 'auto', padding: '4px 12px', background: '#ef4444', color: 'white', border: 'none', borderRadius: 6, fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>Investigate</button>
      </div>

      <div style={{ display: 'flex', gap: 4, marginBottom: 16, background: 'var(--bg-tertiary)', padding: 4, borderRadius: 10, width: 'fit-content' }}>
        {['audit', 'policies'].map(t => (
          <button key={t} onClick={() => setActiveTab(t as any)} style={{ padding: '7px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600, transition: 'all 0.2s', textTransform: 'capitalize', background: activeTab === t ? 'var(--bg-card)' : 'transparent', color: activeTab === t ? 'var(--text-primary)' : 'var(--text-muted)', boxShadow: activeTab === t ? '0 1px 3px rgba(0,0,0,0.08)' : 'none' }}>{t === 'audit' ? 'Audit Log' : 'Policies'}</button>
        ))}
      </div>

      {activeTab === 'audit' ? (
        <div className="card">
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead><tr><th>ID</th><th>User</th><th>Action</th><th>Module</th><th>IP</th><th>Time</th><th>Risk</th></tr></thead>
              <tbody>
                {data.map(log => (
                  <tr key={log.id}>
                    <td style={{ fontFamily: 'monospace', fontSize: 11, color: '#3b82f6' }}>{log.id}</td>
                    <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{log.user}</td>
                    <td style={{ maxWidth: 220 }}>{log.action}</td>
                    <td><span className="badge badge-default">{log.module}</span></td>
                    <td style={{ fontFamily: 'monospace', fontSize: 11 }}>{log.ip}</td>
                    <td style={{ fontSize: 11 }}>{log.time}</td>
                    <td>{riskBadge(log.risk)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination page={page} pages={pages} total={total} perPage={6} onChange={setPage} />
        </div>
      ) : (
        <div className="card">
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead><tr><th>Policy</th><th>Version</th><th>Owner</th><th>Last Review</th><th>Next Review</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {policies.map(p => (
                  <tr key={p.name}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <RiFileTextLine size={14} color="#3b82f6" />
                        <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{p.name}</span>
                      </div>
                    </td>
                    <td><span className="badge badge-blue">{p.version}</span></td>
                    <td>{p.owner}</td>
                    <td>{formatDate(p.lastReview)}</td>
                    <td style={{ color: p.status === 'review-needed' ? '#ef4444' : 'var(--text-secondary)' }}>{formatDate(p.nextReview)}</td>
                    <td><span className={`badge ${p.status === 'active' ? 'badge-success' : 'badge-warning'}`}>{p.status === 'review-needed' ? 'Review Needed' : 'Active'}</span></td>
                    <td>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button className="btn-ghost" style={{ fontSize: 11 }}>View</button>
                        {p.status === 'review-needed' && <button className="btn-primary" style={{ fontSize: 11, padding: '4px 10px' }}>Review</button>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
