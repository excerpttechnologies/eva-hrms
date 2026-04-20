'use client';
import { useState, useEffect } from 'react';
import { expenses } from '@/lib/mock-data';
import { StatCard } from '@/components/ui/StatCard';
import { SearchFilter } from '@/components/ui/SearchFilter';
import { Pagination } from '@/components/ui/Pagination';
import { PageSkeleton } from '@/components/ui/Skeleton';
import { paginate, formatCurrency, formatDate } from '@/lib/utils';
import { RiCoinLine, RiAddLine } from 'react-icons/ri';

const statusBadge = (s: string) => {
  const map: Record<string, string> = { approved: 'badge-success', rejected: 'badge-danger', pending: 'badge-warning' };
  return <span className={`badge ${map[s] || 'badge-default'}`}>{s}</span>;
};

const invoices = [
  { id: 'INV-001', client: 'TechCorp Inc', amount: 45000, due: '2024-02-15', status: 'paid' },
  { id: 'INV-002', client: 'Global Ventures', amount: 28500, due: '2024-02-28', status: 'pending' },
  { id: 'INV-003', client: 'Startup Hub', amount: 12000, due: '2024-03-10', status: 'overdue' },
  { id: 'INV-004', client: 'Enterprise Solutions', amount: 95000, due: '2024-02-20', status: 'paid' },
];

export default function FinancePage() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState<'expenses' | 'invoices'>('expenses');
  useEffect(() => { setTimeout(() => setLoading(false), 600); }, []);
  if (loading) return <PageSkeleton />;

  const filtered = expenses.filter(e => !search || e.description.toLowerCase().includes(search.toLowerCase()) || e.submittedBy.toLowerCase().includes(search.toLowerCase()));
  const { data, total, pages } = paginate(filtered, page, 5);

  return (
    <div className="fade-in-up">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 className="page-title">Finance</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 2 }}>Expenses, invoices and budgets</p>
        </div>
        <button className="btn-primary"><RiAddLine size={16} /> Add Expense</button>
      </div>

      <div className="stats-grid">
        <StatCard title="Total Expenses" value={formatCurrency(expenses.reduce((s, e) => s + e.amount, 0))} icon={<RiCoinLine size={18} />} color="#ef4444" change="+8%" changeType="up" />
        <StatCard title="Approved" value={formatCurrency(expenses.filter(e => e.status === 'approved').reduce((s, e) => s + e.amount, 0))} icon={<RiCoinLine size={18} />} color="#10b981" />
        <StatCard title="Pending Approval" value={expenses.filter(e => e.status === 'pending').length} icon={<RiCoinLine size={18} />} color="#f59e0b" subtitle="items" />
        <StatCard title="Invoiced" value={formatCurrency(invoices.reduce((s, i) => s + i.amount, 0))} icon={<RiCoinLine size={18} />} color="#3b82f6" subtitle="Total invoiced" />
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 16, background: 'var(--bg-tertiary)', padding: 4, borderRadius: 10, width: 'fit-content' }}>
        {['expenses', 'invoices'].map(t => (
          <button key={t} onClick={() => setActiveTab(t as any)} style={{ padding: '7px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600, transition: 'all 0.2s', textTransform: 'capitalize', background: activeTab === t ? 'var(--bg-card)' : 'transparent', color: activeTab === t ? 'var(--text-primary)' : 'var(--text-muted)', boxShadow: activeTab === t ? '0 1px 3px rgba(0,0,0,0.08)' : 'none' }}>{t}</button>
        ))}
      </div>

      {activeTab === 'expenses' ? (
        <div className="card">
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
            <SearchFilter search={search} onSearch={v => { setSearch(v); setPage(1); }} onExport={t => alert(`Export ${t}`)} />
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead><tr><th>Description</th><th>Category</th><th>Amount</th><th>Date</th><th>Submitted By</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {data.map(e => (
                  <tr key={e.id}>
                    <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{e.description}</td>
                    <td><span className="badge badge-default">{e.category}</span></td>
                    <td style={{ fontWeight: 700 }}>{formatCurrency(e.amount)}</td>
                    <td>{formatDate(e.date)}</td>
                    <td>{e.submittedBy}</td>
                    <td>{statusBadge(e.status)}</td>
                    <td>
                      {e.status === 'pending' && (
                        <div style={{ display: 'flex', gap: 4 }}>
                          <button className="btn-primary" style={{ padding: '3px 10px', fontSize: 11 }}>Approve</button>
                          <button className="btn-secondary" style={{ padding: '3px 10px', fontSize: 11 }}>Reject</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination page={page} pages={pages} total={total} perPage={5} onChange={setPage} />
        </div>
      ) : (
        <div className="card">
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead><tr><th>Invoice</th><th>Client</th><th>Amount</th><th>Due Date</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {invoices.map(i => (
                  <tr key={i.id}>
                    <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{i.id}</td>
                    <td style={{ fontWeight: 500 }}>{i.client}</td>
                    <td style={{ fontWeight: 700, color: '#10b981' }}>{formatCurrency(i.amount)}</td>
                    <td>{formatDate(i.due)}</td>
                    <td><span className={`badge ${i.status === 'paid' ? 'badge-success' : i.status === 'overdue' ? 'badge-danger' : 'badge-warning'}`}>{i.status}</span></td>
                    <td>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button className="btn-ghost" style={{ fontSize: 11 }}>View</button>
                        <button className="btn-ghost" style={{ fontSize: 11 }}>Download</button>
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
