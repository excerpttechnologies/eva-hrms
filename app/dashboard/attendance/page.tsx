'use client';
import { useState, useEffect } from 'react';
import { attendanceData } from '@/lib/mock-data';
import { StatCard } from '@/components/ui/StatCard';
import { SearchFilter } from '@/components/ui/SearchFilter';
import { Pagination } from '@/components/ui/Pagination';
import { PageSkeleton } from '@/components/ui/Skeleton';
import { paginate } from '@/lib/utils';
import { RiCalendarCheckLine, RiUserLine, RiTimeLine, RiAlertLine } from 'react-icons/ri';

const statusBadge = (s: string) => {
  const map: Record<string, string> = { present: 'badge-success', absent: 'badge-danger', late: 'badge-warning', 'half-day': 'badge-info' };
  return <span className={`badge ${map[s] || 'badge-default'}`}>{s}</span>;
};

export default function AttendancePage() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [page, setPage] = useState(1);
  const [view, setView] = useState<'table' | 'calendar'>('table');
  useEffect(() => { setTimeout(() => setLoading(false), 600); }, []);
  if (loading) return <PageSkeleton />;

  const filtered = attendanceData.filter(a => {
    const q = search.toLowerCase();
    return (!q || a.employee.toLowerCase().includes(q)) && (!filters.status || a.status === filters.status);
  });
  const { data, total, pages } = paginate(filtered, page, 8);

  const present = attendanceData.filter(a => a.status === 'present').length;
  const absent = attendanceData.filter(a => a.status === 'absent').length;
  const late = attendanceData.filter(a => a.status === 'late').length;

  const calDays = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="fade-in-up">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 className="page-title">Attendance</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 2 }}>Track employee attendance and time logs</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {['table', 'calendar'].map(v => (
            <button key={v} className={view === v ? 'btn-primary' : 'btn-secondary'} onClick={() => setView(v as any)} style={{ textTransform: 'capitalize' }}>{v}</button>
          ))}
        </div>
      </div>

      <div className="stats-grid">
        <StatCard title="Present Today" value={present} icon={<RiCalendarCheckLine size={18} />} color="#10b981" change="+2 vs yesterday" changeType="up" />
        <StatCard title="Absent" value={absent} icon={<RiUserLine size={18} />} color="#ef4444" />
        <StatCard title="Late" value={late} icon={<RiTimeLine size={18} />} color="#f59e0b" />
        <StatCard title="Avg Hours" value="8.9h" icon={<RiAlertLine size={18} />} color="#3b82f6" subtitle="Daily average" />
      </div>

      {view === 'table' ? (
        <div className="card">
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
            <SearchFilter search={search} onSearch={v => { setSearch(v); setPage(1); }}
              filters={[{ label: 'Status', value: 'status', options: ['present','absent','late','half-day'].map(s => ({ label: s, value: s })) }]}
              filterValues={filters} onFilter={(k, v) => setFilters(f => ({ ...f, [k]: v }))}
              onExport={t => alert(`Export ${t}`)} placeholder="Search employee..." />
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr><th>Employee</th><th>Date</th><th>Check In</th><th>Check Out</th><th>Hours</th><th>Status</th></tr>
              </thead>
              <tbody>
                {data.map(a => (
                  <tr key={a.id}>
                    <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{a.employee}</td>
                    <td>{a.date}</td>
                    <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{a.checkIn}</td>
                    <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{a.checkOut}</td>
                    <td>{a.hours}</td>
                    <td>{statusBadge(a.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination page={page} pages={pages} total={total} perPage={8} onChange={setPage} />
        </div>
      ) : (
        <div className="card" style={{ padding: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 15, fontFamily: 'var(--font-display)', marginBottom: 20, color: 'var(--text-primary)' }}>January 2024</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8 }}>
            {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
              <div key={d} style={{ textAlign: 'center', fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', paddingBottom: 8 }}>{d}</div>
            ))}
            {Array.from({length: 6}).map((_, i) => <div key={`pad-${i}`} />)}
            {calDays.map(d => {
              const pct = Math.random();
              const color = pct > 0.85 ? '#ef4444' : pct > 0.7 ? '#f59e0b' : '#10b981';
              return (
                <div key={d} style={{ aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer', background: d === 15 ? '#3b82f6' : 'var(--bg-tertiary)', color: d === 15 ? 'white' : 'var(--text-primary)', border: `2px solid ${d === 15 ? '#3b82f6' : 'transparent'}`, position: 'relative' }}>
                  {d}
                  <div style={{ position: 'absolute', bottom: 4, width: 4, height: 4, borderRadius: '50%', background: color }} />
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', gap: 16, marginTop: 20 }}>
            {[['#10b981', 'High attendance'], ['#f59e0b', 'Some absences'], ['#ef4444', 'Low attendance']].map(([c, l]) => (
              <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-muted)' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />{l}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
