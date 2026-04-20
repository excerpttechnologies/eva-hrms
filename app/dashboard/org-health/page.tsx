'use client';
import { useState, useEffect } from 'react';
import { PageSkeleton } from '@/components/ui/Skeleton';
import { BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { RiHeartPulseLine, RiSparklingLine, RiAlertLine } from 'react-icons/ri';
import { employees } from '@/lib/mock-data';
import { getInitials } from '@/lib/utils';

const deptHealth = [
  { dept: 'Engineering', score: 78, morale: 82, burnout: 22, retention: 94 },
  { dept: 'Sales', score: 85, morale: 88, burnout: 15, retention: 91 },
  { dept: 'Marketing', score: 72, morale: 75, burnout: 28, retention: 88 },
  { dept: 'HR', score: 91, morale: 93, burnout: 9, retention: 97 },
  { dept: 'Finance', score: 80, morale: 79, burnout: 20, retention: 92 },
  { dept: 'Design', score: 88, morale: 90, burnout: 12, retention: 95 },
];

const burnoutRisk = employees.slice(0, 5).map((e, i) => ({
  ...e,
  hoursPerWeek: [58, 51, 44, 62, 47][i],
  lastLeave: ['92 days ago', '14 days ago', '5 days ago', '110 days ago', '21 days ago'][i],
  riskScore: [78, 45, 20, 85, 32][i],
}));

const healthDimensions = [
  { dim: 'Morale', score: 83 }, { dim: 'Engagement', score: 79 }, { dim: 'Wellbeing', score: 71 },
  { dim: 'Inclusion', score: 88 }, { dim: 'Work-Life', score: 68 }, { dim: 'Growth', score: 76 },
];

export default function OrgHealthPage() {
  const [loading, setLoading] = useState(true);
  useEffect(() => { setTimeout(() => setLoading(false), 700); }, []);
  if (loading) return <PageSkeleton />;

  const overallScore = Math.round(healthDimensions.reduce((s, d) => s + d.score, 0) / healthDimensions.length);

  return (
    <div className="fade-in-up">
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
        <div style={{ width: 46, height: 46, borderRadius: 14, background: 'linear-gradient(135deg, #10b981, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <RiHeartPulseLine size={22} color="white" />
        </div>
        <div>
          <h1 className="page-title">Organization Health</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 2 }}>AI-powered wellbeing, engagement & burnout detection</p>
        </div>
      </div>

      {/* Overall score */}
      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 20, marginBottom: 24 }}>
        <div className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Overall Health Score</div>
          <div style={{ position: 'relative', width: 120, height: 120, marginBottom: 16 }}>
            <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--bg-tertiary)" strokeWidth="3" />
              <circle cx="18" cy="18" r="15.9" fill="none" stroke={overallScore >= 80 ? '#10b981' : overallScore >= 60 ? '#f59e0b' : '#ef4444'}
                strokeWidth="3" strokeDasharray={`${overallScore} 100`} strokeLinecap="round" />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: 'var(--text-primary)' }}>{overallScore}</div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>/100</div>
            </div>
          </div>
          <span className="badge badge-success" style={{ fontSize: 11 }}>Good Health</span>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 8 }}>2 areas need attention</div>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 14, fontFamily: 'var(--font-display)', color: 'var(--text-primary)', marginBottom: 16 }}>Health Dimensions</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            {healthDimensions.map(d => (
              <div key={d.dim}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
                  <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{d.dim}</span>
                  <span style={{ fontWeight: 700, color: d.score >= 80 ? '#10b981' : d.score >= 65 ? '#f59e0b' : '#ef4444' }}>{d.score}</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${d.score}%`, background: d.score >= 80 ? '#10b981' : d.score >= 65 ? '#f59e0b' : '#ef4444' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dept comparison */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20, marginBottom: 20 }}>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 14, fontFamily: 'var(--font-display)', color: 'var(--text-primary)', marginBottom: 16 }}>Department Comparison</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={deptHealth} barSize={14}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="dept" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="score" name="Health Score" fill="#10b981" radius={[4,4,0,0]} />
              <Bar dataKey="burnout" name="Burnout Risk %" fill="#ef444450" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 14, fontFamily: 'var(--font-display)', color: 'var(--text-primary)', marginBottom: 4 }}>Team Radar</div>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={healthDimensions}>
              <PolarGrid stroke="var(--border)" />
              <PolarAngleAxis dataKey="dim" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} />
              <Radar dataKey="score" stroke="#10b981" fill="#10b981" fillOpacity={0.15} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Burnout risk */}
      <div className="card" style={{ padding: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <RiAlertLine size={16} color="#ef4444" />
          <div style={{ fontWeight: 700, fontSize: 14, fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>AI Burnout Risk Detection</div>
          <span style={{ fontSize: 10, padding: '2px 8px', background: '#fee2e2', color: '#991b1b', borderRadius: 20, fontWeight: 700 }}>2 Critical</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead><tr><th>Employee</th><th>Dept</th><th>Avg Hours/Week</th><th>Last Leave</th><th>Risk Score</th><th>Action</th></tr></thead>
            <tbody>
              {burnoutRisk.map(e => (
                <tr key={e.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 28, height: 28, borderRadius: '50%', background: e.riskScore >= 70 ? '#ef4444' : '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: 'white' }}>{getInitials(e.name)}</div>
                      <span style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-primary)' }}>{e.name}</span>
                    </div>
                  </td>
                  <td><span className="badge badge-blue">{e.department}</span></td>
                  <td style={{ fontWeight: 700, color: e.hoursPerWeek >= 55 ? '#ef4444' : 'var(--text-primary)' }}>{e.hoursPerWeek}h</td>
                  <td style={{ fontSize: 12, color: e.riskScore >= 70 ? '#ef4444' : 'var(--text-secondary)' }}>{e.lastLeave}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 56, height: 5, borderRadius: 3, background: 'var(--bg-tertiary)', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${e.riskScore}%`, background: e.riskScore >= 70 ? '#ef4444' : e.riskScore >= 45 ? '#f59e0b' : '#10b981', borderRadius: 3 }} />
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 700, color: e.riskScore >= 70 ? '#ef4444' : e.riskScore >= 45 ? '#f59e0b' : '#10b981' }}>{e.riskScore}%</span>
                    </div>
                  </td>
                  <td>
                    {e.riskScore >= 60 && <button className="btn-primary" style={{ fontSize: 11, padding: '4px 10px' }}>Assign Leave</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
