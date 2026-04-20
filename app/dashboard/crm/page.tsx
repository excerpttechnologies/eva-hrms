'use client';
import { useState, useEffect } from 'react';
import { leads } from '@/lib/mock-data';
import { StatCard } from '@/components/ui/StatCard';
import { SearchFilter } from '@/components/ui/SearchFilter';
import { Pagination } from '@/components/ui/Pagination';
import { PageSkeleton } from '@/components/ui/Skeleton';
import { paginate, formatCurrency } from '@/lib/utils';
import { RiBriefcaseLine, RiAddLine } from 'react-icons/ri';

const stages = ['new', 'qualified', 'proposal', 'negotiation', 'won', 'lost'];
const stageColors: Record<string, string> = { new: '#64748b', qualified: '#3b82f6', proposal: '#8b5cf6', negotiation: '#f59e0b', won: '#10b981', lost: '#ef4444' };

export default function CRMPage() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [view, setView] = useState<'list' | 'pipeline'>('pipeline');
  useEffect(() => { setTimeout(() => setLoading(false), 600); }, []);
  if (loading) return <PageSkeleton />;

  const filtered = leads.filter(l => !search || l.company.toLowerCase().includes(search.toLowerCase()) || l.contact.toLowerCase().includes(search.toLowerCase()));
  const { data, total, pages } = paginate(filtered, page, 5);
  const totalValue = leads.reduce((s, l) => s + l.value, 0);

  return (
    <div className="fade-in-up">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 className="page-title">CRM</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 2 }}>Manage leads and deals pipeline</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {['pipeline', 'list'].map(v => <button key={v} className={view === v ? 'btn-primary' : 'btn-secondary'} onClick={() => setView(v as any)} style={{ textTransform: 'capitalize' }}>{v}</button>)}
          <button className="btn-primary"><RiAddLine size={16} /> Add Lead</button>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard title="Total Pipeline" value={formatCurrency(totalValue)} icon={<RiBriefcaseLine size={18} />} color="#3b82f6" change="+12%" changeType="up" />
        <StatCard title="Active Leads" value={leads.filter(l => !['won', 'lost'].includes(l.stage)).length} icon={<RiBriefcaseLine size={18} />} color="#8b5cf6" />
        <StatCard title="Won Deals" value={leads.filter(l => l.stage === 'won').length} icon={<RiBriefcaseLine size={18} />} color="#10b981" subtitle={formatCurrency(leads.filter(l => l.stage === 'won').reduce((s, l) => s + l.value, 0))} />
        <StatCard title="Conversion Rate" value="38%" icon={<RiBriefcaseLine size={18} />} color="#f59e0b" change="+5%" changeType="up" />
      </div>

      {view === 'pipeline' ? (
        <div>
          <SearchFilter search={search} onSearch={setSearch} placeholder="Search leads..." />
          <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 16 }}>
            {stages.map(stage => {
              const stageLeads = filtered.filter(l => l.stage === stage);
              const stageTotal = stageLeads.reduce((s, l) => s + l.value, 0);
              return (
                <div key={stage} className="kanban-column" style={{ minWidth: 240 }}>
                  <div style={{ marginBottom: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: stageColors[stage] }} />
                      <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', textTransform: 'capitalize' }}>{stage}</span>
                      <span style={{ fontSize: 10, color: 'var(--text-muted)', background: 'var(--bg-card)', borderRadius: 20, padding: '1px 6px', marginLeft: 'auto', fontWeight: 700 }}>{stageLeads.length}</span>
                    </div>
                    {stageTotal > 0 && <div style={{ fontSize: 11, color: stageColors[stage], fontWeight: 700 }}>{formatCurrency(stageTotal)}</div>}
                  </div>
                  {stageLeads.map(l => (
                    <div key={l.id} className="kanban-card">
                      <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--text-primary)', marginBottom: 2 }}>{l.company}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8 }}>{l.contact}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: '#10b981' }}>{formatCurrency(l.value)}</span>
                        <span style={{ fontSize: 10, color: 'var(--text-muted)', background: 'var(--bg-tertiary)', borderRadius: 4, padding: '2px 6px' }}>{l.source}</span>
                      </div>
                    </div>
                  ))}
                  {stageLeads.length === 0 && <div style={{ padding: 20, textAlign: 'center', fontSize: 12, color: 'var(--text-muted)', borderRadius: 8, border: '1px dashed var(--border)' }}>Empty</div>}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="card">
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
            <SearchFilter search={search} onSearch={v => { setSearch(v); setPage(1); }} onExport={t => alert(`Export ${t}`)} />
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead><tr><th>Company</th><th>Contact</th><th>Stage</th><th>Value</th><th>Source</th><th>Assigned</th><th>Action</th></tr></thead>
              <tbody>
                {data.map(l => (
                  <tr key={l.id}>
                    <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{l.company}</td>
                    <td><div>{l.contact}</div><div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{l.email}</div></td>
                    <td><span className="badge" style={{ background: stageColors[l.stage] + '20', color: stageColors[l.stage] }}>{l.stage}</span></td>
                    <td style={{ fontWeight: 700, color: '#10b981' }}>{formatCurrency(l.value)}</td>
                    <td style={{ fontSize: 12 }}>{l.source}</td>
                    <td style={{ fontSize: 12 }}>{l.assigned}</td>
                    <td><button className="btn-ghost" style={{ fontSize: 12 }}>View →</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination page={page} pages={pages} total={total} perPage={5} onChange={setPage} />
        </div>
      )}
    </div>
  );
}
