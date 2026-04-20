'use client';
import { useState, useEffect } from 'react';
import { leaveRequests } from '@/lib/mock-data';
import { StatCard } from '@/components/ui/StatCard';
import { SearchFilter } from '@/components/ui/SearchFilter';
import { Pagination } from '@/components/ui/Pagination';
import { Modal } from '@/components/ui/Modal';
import { PageSkeleton } from '@/components/ui/Skeleton';
import { paginate, formatDate } from '@/lib/utils';
import { RiTimeLine, RiCheckLine, RiCloseLine, RiAddLine } from 'react-icons/ri';

const statusBadge = (s: string) => {
  const map: Record<string, string> = { approved: 'badge-success', rejected: 'badge-danger', pending: 'badge-warning' };
  return <span className={`badge ${map[s] || 'badge-default'}`}>{s}</span>;
};

export default function LeavePage() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [page, setPage] = useState(1);
  const [showApply, setShowApply] = useState(false);
  const [form, setForm] = useState({ type: '', from: '', to: '', reason: '' });
  useEffect(() => { setTimeout(() => setLoading(false), 600); }, []);
  if (loading) return <PageSkeleton />;

  const filtered = leaveRequests.filter(l => {
    const q = search.toLowerCase();
    return (!q || l.employee.toLowerCase().includes(q) || l.type.toLowerCase().includes(q)) && (!filters.status || l.status === filters.status);
  });
  const { data, total, pages } = paginate(filtered, page, 6);

  const leaveBalances = [
    { type: 'Annual Leave', used: 8, total: 21, color: '#3b82f6' },
    { type: 'Sick Leave', used: 2, total: 10, color: '#10b981' },
    { type: 'Personal Leave', used: 1, total: 5, color: '#8b5cf6' },
    { type: 'Maternity/Paternity', used: 0, total: 90, color: '#f59e0b' },
  ];

  return (
    <div className="fade-in-up">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 className="page-title">Leave Management</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 2 }}>Manage leave requests and balances</p>
        </div>
        <button className="btn-primary" onClick={() => setShowApply(true)}><RiAddLine size={16} /> Apply for Leave</button>
      </div>

      <div className="stats-grid">
        <StatCard title="Pending Requests" value={leaveRequests.filter(l => l.status === 'pending').length} icon={<RiTimeLine size={18} />} color="#f59e0b" />
        <StatCard title="Approved" value={leaveRequests.filter(l => l.status === 'approved').length} icon={<RiCheckLine size={18} />} color="#10b981" />
        <StatCard title="Rejected" value={leaveRequests.filter(l => l.status === 'rejected').length} icon={<RiCloseLine size={18} />} color="#ef4444" />
        <StatCard title="Days Remaining" value="13" icon={<RiTimeLine size={18} />} color="#3b82f6" subtitle="Annual leave balance" />
      </div>

      {/* Leave Balance Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 24 }}>
        {leaveBalances.map(lb => (
          <div key={lb.type} className="card" style={{ padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{lb.type}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{lb.used}/{lb.total} used</div>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${(lb.used / lb.total) * 100}%`, background: lb.color }} />
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 8 }}>{lb.total - lb.used} days remaining</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
          <SearchFilter search={search} onSearch={v => { setSearch(v); setPage(1); }}
            filters={[
              { label: 'Status', value: 'status', options: ['pending','approved','rejected'].map(s => ({ label: s, value: s })) },
              { label: 'Type', value: 'type', options: ['Annual Leave','Sick Leave','Personal Leave','Maternity Leave'].map(s => ({ label: s, value: s })) },
            ]}
            filterValues={filters} onFilter={(k, v) => setFilters(f => ({ ...f, [k]: v }))}
            onExport={t => alert(`Export ${t}`)} />
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr><th>Employee</th><th>Leave Type</th><th>From</th><th>To</th><th>Days</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {data.map(l => (
                <tr key={l.id}>
                  <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{l.employee}</td>
                  <td>{l.type}</td>
                  <td>{formatDate(l.from)}</td>
                  <td>{formatDate(l.to)}</td>
                  <td><span style={{ fontWeight: 700 }}>{l.days}</span></td>
                  <td>{statusBadge(l.status)}</td>
                  <td>
                    {l.status === 'pending' && (
                      <div style={{ display: 'flex', gap: 4 }}>
                        <button className="btn-primary" style={{ padding: '4px 10px', fontSize: 11 }}>Approve</button>
                        <button className="btn-secondary" style={{ padding: '4px 10px', fontSize: 11 }}>Reject</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination page={page} pages={pages} total={total} perPage={6} onChange={setPage} />
      </div>

      <Modal open={showApply} onClose={() => setShowApply(false)} title="Apply for Leave"
        footer={<><button className="btn-secondary" onClick={() => setShowApply(false)}>Cancel</button><button className="btn-primary" onClick={() => { alert('Leave applied!'); setShowApply(false); }}>Submit Request</button></>}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>Leave Type</label>
            <select className="input" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
              <option value="">Select type</option>
              {['Annual Leave','Sick Leave','Personal Leave','Maternity Leave','Paternity Leave'].map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>From Date</label>
              <input className="input" type="date" value={form.from} onChange={e => setForm(f => ({ ...f, from: e.target.value }))} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>To Date</label>
              <input className="input" type="date" value={form.to} onChange={e => setForm(f => ({ ...f, to: e.target.value }))} />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>Reason</label>
            <textarea className="input" rows={3} value={form.reason} onChange={e => setForm(f => ({ ...f, reason: e.target.value }))} placeholder="Briefly describe the reason..." style={{ resize: 'none' }} />
          </div>
        </div>
      </Modal>
    </div>
  );
}
