'use client';
import { useState, useEffect } from 'react';
import { tickets } from '@/lib/mock-data';
import { StatCard } from '@/components/ui/StatCard';
import { SearchFilter } from '@/components/ui/SearchFilter';
import { Pagination } from '@/components/ui/Pagination';
import { Modal } from '@/components/ui/Modal';
import { PageSkeleton } from '@/components/ui/Skeleton';
import { paginate, formatDate } from '@/lib/utils';
import { RiTicketLine, RiAddLine } from 'react-icons/ri';

const statusBadge = (s: string) => {
  const map: Record<string, string> = { open: 'badge-danger', 'in-progress': 'badge-info', resolved: 'badge-success' };
  return <span className={`badge ${map[s] || 'badge-default'}`}>{s.replace('-', ' ')}</span>;
};
const priorityBadge = (p: string) => {
  const map: Record<string, string> = { high: 'badge-danger', medium: 'badge-warning', low: 'badge-success' };
  return <span className={`badge ${map[p]}`}>{p}</span>;
};

export default function HelpdeskPage() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [viewTicket, setViewTicket] = useState<any>(null);
  useEffect(() => { setTimeout(() => setLoading(false), 600); }, []);
  if (loading) return <PageSkeleton />;

  const filtered = tickets.filter(t => !search || t.subject.toLowerCase().includes(search.toLowerCase()) || t.employee.toLowerCase().includes(search.toLowerCase()));
  const { data, total, pages } = paginate(filtered, page, 5);

  return (
    <div className="fade-in-up">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 className="page-title">Helpdesk</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 2 }}>Support tickets and requests</p>
        </div>
        <button className="btn-primary"><RiAddLine size={16} /> New Ticket</button>
      </div>

      <div className="stats-grid">
        <StatCard title="Open Tickets" value={tickets.filter(t => t.status === 'open').length} icon={<RiTicketLine size={18} />} color="#ef4444" />
        <StatCard title="In Progress" value={tickets.filter(t => t.status === 'in-progress').length} icon={<RiTicketLine size={18} />} color="#06b6d4" />
        <StatCard title="Resolved" value={tickets.filter(t => t.status === 'resolved').length} icon={<RiTicketLine size={18} />} color="#10b981" />
        <StatCard title="Avg Resolution" value="1.4 days" icon={<RiTicketLine size={18} />} color="#3b82f6" />
      </div>

      <div className="card">
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
          <SearchFilter search={search} onSearch={v => { setSearch(v); setPage(1); }} onExport={t => alert(`Export ${t}`)} placeholder="Search tickets..." />
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead><tr><th>Ticket</th><th>Subject</th><th>Category</th><th>Priority</th><th>Status</th><th>Assignee</th><th>Created</th><th>Action</th></tr></thead>
            <tbody>
              {data.map(t => (
                <tr key={t.id}>
                  <td style={{ fontWeight: 700, color: '#3b82f6', fontSize: 12 }}>{t.id}</td>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{t.subject}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>By {t.employee}</div>
                  </td>
                  <td><span className="badge badge-default">{t.category}</span></td>
                  <td>{priorityBadge(t.priority)}</td>
                  <td>{statusBadge(t.status)}</td>
                  <td style={{ fontSize: 12 }}>{t.assignee}</td>
                  <td style={{ fontSize: 12 }}>{formatDate(t.created)}</td>
                  <td><button className="btn-ghost" style={{ fontSize: 12 }} onClick={() => setViewTicket(t)}>View →</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination page={page} pages={pages} total={total} perPage={5} onChange={setPage} />
      </div>

      {viewTicket && (
        <Modal open={!!viewTicket} onClose={() => setViewTicket(null)} title={`Ticket ${viewTicket.id}`}
          footer={<><button className="btn-secondary" onClick={() => setViewTicket(null)}>Close</button><button className="btn-primary">Assign & Resolve</button></>}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', gap: 8 }}>{priorityBadge(viewTicket.priority)}{statusBadge(viewTicket.status)}</div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>Subject</div>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{viewTicket.subject}</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[['Employee', viewTicket.employee], ['Category', viewTicket.category], ['Assignee', viewTicket.assignee], ['Created', formatDate(viewTicket.created)]].map(([k, v]) => (
                <div key={k} style={{ background: 'var(--bg-tertiary)', borderRadius: 8, padding: '10px 14px' }}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 2 }}>{k}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{v}</div>
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>Reply / Notes</div>
              <textarea className="input" rows={4} placeholder="Add a note or reply..." style={{ resize: 'none' }} />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
