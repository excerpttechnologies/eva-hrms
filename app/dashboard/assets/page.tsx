'use client';
import { useState, useEffect } from 'react';
import { assets } from '@/lib/mock-data';
import { StatCard } from '@/components/ui/StatCard';
import { SearchFilter } from '@/components/ui/SearchFilter';
import { Pagination } from '@/components/ui/Pagination';
import { PageSkeleton } from '@/components/ui/Skeleton';
import { paginate, formatCurrency, formatDate } from '@/lib/utils';
import { RiComputerLine, RiAddLine } from 'react-icons/ri';

export default function AssetsPage() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  useEffect(() => { setTimeout(() => setLoading(false), 600); }, []);
  if (loading) return <PageSkeleton />;

  const filtered = assets.filter(a => !search || a.name.toLowerCase().includes(search.toLowerCase()) || a.assignedTo.toLowerCase().includes(search.toLowerCase()));
  const { data, total, pages } = paginate(filtered, page, 5);

  return (
    <div className="fade-in-up">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 className="page-title">Assets</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 2 }}>Track and manage company assets</p>
        </div>
        <button className="btn-primary"><RiAddLine size={16} /> Add Asset</button>
      </div>

      <div className="stats-grid">
        <StatCard title="Total Assets" value={assets.length} icon={<RiComputerLine size={18} />} color="#3b82f6" />
        <StatCard title="Assigned" value={assets.filter(a => a.status === 'assigned').length} icon={<RiComputerLine size={18} />} color="#10b981" />
        <StatCard title="Available" value={assets.filter(a => a.status === 'available').length} icon={<RiComputerLine size={18} />} color="#f59e0b" />
        <StatCard title="Total Value" value={formatCurrency(assets.reduce((s, a) => s + a.value, 0))} icon={<RiComputerLine size={18} />} color="#8b5cf6" />
      </div>

      <div className="card">
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
          <SearchFilter search={search} onSearch={v => { setSearch(v); setPage(1); }} onExport={t => alert(`Export ${t}`)} placeholder="Search assets..." />
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead><tr><th>Asset</th><th>Type</th><th>Serial No</th><th>Assigned To</th><th>Status</th><th>Purchase Date</th><th>Value</th><th>Actions</th></tr></thead>
            <tbody>
              {data.map(a => (
                <tr key={a.id}>
                  <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{a.name}</td>
                  <td><span className="badge badge-blue">{a.type}</span></td>
                  <td style={{ fontFamily: 'monospace', fontSize: 11 }}>{a.serialNo}</td>
                  <td>{a.assignedTo === '-' ? <span style={{ color: 'var(--text-muted)' }}>Unassigned</span> : a.assignedTo}</td>
                  <td><span className={`badge ${a.status === 'assigned' ? 'badge-success' : 'badge-warning'}`}>{a.status}</span></td>
                  <td>{formatDate(a.purchaseDate)}</td>
                  <td style={{ fontWeight: 600 }}>{formatCurrency(a.value)}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 4 }}>
                      <button className="btn-ghost" style={{ fontSize: 11 }}>Edit</button>
                      {a.status === 'available' && <button className="btn-primary" style={{ fontSize: 11, padding: '4px 10px' }}>Assign</button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination page={page} pages={pages} total={total} perPage={5} onChange={setPage} />
      </div>
    </div>
  );
}
