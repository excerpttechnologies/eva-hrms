'use client';
import { useState, useEffect } from 'react';
import { candidates } from '@/lib/mock-data';
import { StatCard } from '@/components/ui/StatCard';
import { SearchFilter } from '@/components/ui/SearchFilter';
import { Pagination } from '@/components/ui/Pagination';
import { PageSkeleton } from '@/components/ui/Skeleton';
import { paginate } from '@/lib/utils';
import { RiUserSearchLine, RiAddLine } from 'react-icons/ri';

const stages = ['applied', 'screening', 'technical', 'interview', 'offer', 'hired'];
const stageColors: Record<string, string> = {
  applied: '#64748b', screening: '#3b82f6', technical: '#8b5cf6',
  interview: '#f59e0b', offer: '#06b6d4', hired: '#10b981',
};
const stageBadge = (s: string) => (
  <span className="badge" style={{ background: stageColors[s] + '20', color: stageColors[s] }}>{s}</span>
);

export default function RecruitmentPage() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [view, setView] = useState<'list' | 'kanban'>('kanban');
  useEffect(() => { setTimeout(() => setLoading(false), 600); }, []);
  if (loading) return <PageSkeleton />;

  const filtered = candidates.filter(c => !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.position.toLowerCase().includes(search.toLowerCase()));
  const { data, total, pages } = paginate(filtered, page, 6);

  return (
    <div className="fade-in-up">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 className="page-title">Recruitment</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 2 }}>Manage hiring pipeline and candidates</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {['list', 'kanban'].map(v => (
            <button key={v} className={view === v ? 'btn-primary' : 'btn-secondary'} onClick={() => setView(v as any)} style={{ textTransform: 'capitalize' }}>{v}</button>
          ))}
          <button className="btn-primary"><RiAddLine size={16} /> Add Candidate</button>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard title="Total Candidates" value={candidates.length} icon={<RiUserSearchLine size={18} />} color="#3b82f6" />
        <StatCard title="In Pipeline" value={candidates.filter(c => !['applied','hired'].includes(c.stage)).length} icon={<RiUserSearchLine size={18} />} color="#8b5cf6" />
        <StatCard title="Offers Extended" value={candidates.filter(c => c.stage === 'offer').length} icon={<RiUserSearchLine size={18} />} color="#06b6d4" />
        <StatCard title="Hired" value={candidates.filter(c => c.stage === 'hired').length} icon={<RiUserSearchLine size={18} />} color="#10b981" />
      </div>

      {view === 'kanban' ? (
        <div>
          <SearchFilter search={search} onSearch={setSearch} placeholder="Search candidates..." />
          <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 16 }}>
            {stages.map(stage => {
              const stageCandidates = filtered.filter(c => c.stage === stage);
              return (
                <div key={stage} className="kanban-column" style={{ minWidth: 260 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: stageColors[stage] }} />
                      <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', textTransform: 'capitalize' }}>{stage}</span>
                    </div>
                    <span style={{ fontSize: 11, color: 'var(--text-muted)', background: 'var(--bg-card)', borderRadius: 20, padding: '1px 7px', fontWeight: 600 }}>{stageCandidates.length}</span>
                  </div>
                  {stageCandidates.map(c => (
                    <div key={c.id} className="kanban-card">
                      <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--text-primary)', marginBottom: 4 }}>{c.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 10 }}>{c.position}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{c.experience}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <div style={{ width: 32, height: 4, borderRadius: 2, background: 'var(--bg-tertiary)', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${c.score}%`, background: c.score >= 80 ? '#10b981' : c.score >= 60 ? '#f59e0b' : '#ef4444', borderRadius: 2 }} />
                          </div>
                          <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)' }}>{c.score}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {stageCandidates.length === 0 && (
                    <div style={{ padding: '20px', textAlign: 'center', fontSize: 12, color: 'var(--text-muted)', borderRadius: 8, border: '1px dashed var(--border)' }}>Empty stage</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="card">
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
            <SearchFilter search={search} onSearch={v => { setSearch(v); setPage(1); }} onExport={t => alert(`Export ${t}`)} placeholder="Search candidates..." />
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead><tr><th>Candidate</th><th>Position</th><th>Stage</th><th>Score</th><th>Applied</th><th>Actions</th></tr></thead>
              <tbody>
                {data.map(c => (
                  <tr key={c.id}>
                    <td>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{c.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{c.email}</div>
                    </td>
                    <td>{c.position}</td>
                    <td>{stageBadge(c.stage)}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 48, height: 4, borderRadius: 2, background: 'var(--bg-tertiary)', overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${c.score}%`, background: c.score >= 80 ? '#10b981' : '#f59e0b' }} />
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 700 }}>{c.score}</span>
                      </div>
                    </td>
                    <td style={{ fontSize: 12 }}>{c.appliedDate}</td>
                    <td><button className="btn-ghost" style={{ fontSize: 12 }}>View →</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination page={page} pages={pages} total={total} perPage={6} onChange={setPage} />
        </div>
      )}
    </div>
  );
}
