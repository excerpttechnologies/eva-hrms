'use client';
import { useState, useEffect } from 'react';
import { employees } from '@/lib/mock-data';
import { StatCard } from '@/components/ui/StatCard';
import { PageSkeleton } from '@/components/ui/Skeleton';
import { getInitials } from '@/lib/utils';
import { RiBarChartLine, RiStarLine, RiAddLine } from 'react-icons/ri';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const okrs = [
  { objective: 'Improve Employee Retention', keyResults: [{ kr: 'Reduce churn to < 5%', progress: 72 }, { kr: 'Conduct quarterly surveys', progress: 100 }, { kr: 'Launch mentorship program', progress: 45 }] },
  { objective: 'Scale Engineering Team', keyResults: [{ kr: 'Hire 5 senior devs', progress: 60 }, { kr: 'Onboard 100% within 30 days', progress: 90 }] },
  { objective: 'Revenue Growth Q1', keyResults: [{ kr: 'Close 20 enterprise deals', progress: 55 }, { kr: 'Expand APAC region', progress: 30 }] },
];

const radarData = [
  { metric: 'Communication', score: 85 },
  { metric: 'Teamwork', score: 90 },
  { metric: 'Technical', score: 78 },
  { metric: 'Leadership', score: 70 },
  { metric: 'Delivery', score: 88 },
  { metric: 'Innovation', score: 75 },
];

const appraisalData = employees.slice(0, 6).map((e, i) => ({
  ...e, rating: [4.2, 3.8, 4.5, 4.0, 3.5, 4.8][i], status: ['completed', 'pending', 'completed', 'in-progress', 'pending', 'completed'][i],
}));

export default function PerformancePage() {
  const [loading, setLoading] = useState(true);
  const [activeOkr, setActiveOkr] = useState(0);
  useEffect(() => { setTimeout(() => setLoading(false), 600); }, []);
  if (loading) return <PageSkeleton />;

  return (
    <div className="fade-in-up">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 className="page-title">Performance</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 2 }}>OKRs, appraisals and feedback</p>
        </div>
        <button className="btn-primary"><RiAddLine size={16} /> Add OKR</button>
      </div>

      <div className="stats-grid">
        <StatCard title="Avg Rating" value="4.1/5" icon={<RiStarLine size={18} />} color="#f59e0b" change="+0.2" changeType="up" />
        <StatCard title="Appraisals Done" value="68%" icon={<RiBarChartLine size={18} />} color="#10b981" subtitle="Q1 cycle" />
        <StatCard title="OKRs On Track" value="7/12" icon={<RiBarChartLine size={18} />} color="#3b82f6" />
        <StatCard title="Pending Reviews" value="8" icon={<RiBarChartLine size={18} />} color="#f59e0b" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        {/* OKRs */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 14, fontFamily: 'var(--font-display)', color: 'var(--text-primary)', marginBottom: 16 }}>OKRs — Q1 2024</div>
          {okrs.map((o, i) => {
            const avg = Math.round(o.keyResults.reduce((s, kr) => s + kr.progress, 0) / o.keyResults.length);
            return (
              <div key={i} style={{ marginBottom: 16, cursor: 'pointer' }} onClick={() => setActiveOkr(i)}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{o.objective}</div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: avg >= 70 ? '#10b981' : '#f59e0b' }}>{avg}%</span>
                </div>
                <div className="progress-bar" style={{ marginBottom: 8 }}>
                  <div className="progress-fill" style={{ width: `${avg}%`, background: avg >= 70 ? '#10b981' : '#f59e0b' }} />
                </div>
                {activeOkr === i && (
                  <div style={{ paddingLeft: 12, borderLeft: '2px solid var(--border)' }}>
                    {o.keyResults.map((kr, j) => (
                      <div key={j} style={{ marginBottom: 8 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4, color: 'var(--text-secondary)' }}>
                          <span>{kr.kr}</span><span style={{ fontWeight: 600 }}>{kr.progress}%</span>
                        </div>
                        <div className="progress-bar" style={{ height: 4 }}>
                          <div className="progress-fill" style={{ width: `${kr.progress}%`, height: 4 }} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Radar */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 14, fontFamily: 'var(--font-display)', color: 'var(--text-primary)', marginBottom: 4 }}>Performance Metrics</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 12 }}>Team average Q1 2024</div>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="var(--border)" />
              <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} />
              <Radar dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.15} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Appraisals */}
      <div className="card">
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', fontWeight: 700, fontSize: 14, fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>Appraisal Tracker</div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead><tr><th>Employee</th><th>Department</th><th>Rating</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {appraisalData.map(e => (
                <tr key={e.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: 'white' }}>{getInitials(e.name)}</div>
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: 13 }}>{e.name}</span>
                    </div>
                  </td>
                  <td><span className="badge badge-blue">{e.department}</span></td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <span style={{ fontWeight: 700, fontSize: 13 }}>{e.rating}</span>
                      <span style={{ color: '#f59e0b', fontSize: 14 }}>★</span>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${e.status === 'completed' ? 'badge-success' : e.status === 'pending' ? 'badge-warning' : 'badge-info'}`}>{e.status}</span>
                  </td>
                  <td><button className="btn-ghost" style={{ fontSize: 12 }}>{e.status === 'pending' ? 'Start Review' : 'View'}</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
