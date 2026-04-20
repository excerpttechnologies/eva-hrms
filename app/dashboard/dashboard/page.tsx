'use client';
import { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { StatCard } from '@/components/ui/StatCard';
import { AIRecommendations } from '@/components/ai/AIRecommendations';
import { AIInsightCard } from '@/components/ai/AIInsightCard';
import { RiTeamLine, RiCalendarCheckLine, RiMoneyDollarCircleLine, RiBriefcaseLine, RiArrowRightLine, RiSparklingLine } from 'react-icons/ri';
import { monthlyChartData, departmentData, activityFeed, employees } from '@/lib/mock-data';
import { formatCurrency, formatDate } from '@/lib/utils';
import { PageSkeleton } from '@/components/ui/Skeleton';
import Link from 'next/link';

const activityEmoji: Record<string, string> = { leave: '🏖️', deal: '💰', employee: '👤', project: '📋', report: '📊', ticket: '🎫' };

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  useEffect(() => { setTimeout(() => setLoading(false), 800); }, []);
  if (loading) return <PageSkeleton />;

  const activeEmps = employees.filter(e => e.status === 'active').length;

  return (
    <div className="fade-in-up">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 2 }}>Welcome back, Alex — here's your AI-powered overview.</p>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <Link href="/dashboard/ai-assistant" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', border: '1px solid rgba(139,92,246,0.25)', borderRadius: 10, color: '#8b5cf6', fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>
            <RiSparklingLine size={14} /> Open AI Center
          </Link>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', background: 'var(--bg-tertiary)', padding: '6px 12px', borderRadius: 8, border: '1px solid var(--border)' }}>
            {new Date().toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <StatCard title="Total Employees" value={employees.length} change="+3 this month" changeType="up" icon={<RiTeamLine size={20} />} color="#3b82f6" subtitle={`${activeEmps} active`} />
        <StatCard title="Present Today" value="58" change="+2 vs yesterday" changeType="up" icon={<RiCalendarCheckLine size={20} />} color="#10b981" subtitle="Out of 65 scheduled" />
        <StatCard title="Monthly Payroll" value={formatCurrency(485000)} change="+5.2%" changeType="up" icon={<RiMoneyDollarCircleLine size={20} />} color="#8b5cf6" subtitle="Jan 2024" />
        <StatCard title="Open Positions" value="8" change="-2 filled" changeType="down" icon={<RiBriefcaseLine size={20} />} color="#f59e0b" subtitle="3 interviews today" />
      </div>

      {/* Secondary stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Pending Leaves', value: '6', color: '#f59e0b' },
          { label: 'Open Tickets', value: '12', color: '#ef4444' },
          { label: 'Active Projects', value: '7', color: '#06b6d4' },
          { label: 'CRM Leads', value: '24', color: '#10b981' },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</div>
              <div style={{ fontSize: 22, fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--text-primary)', marginTop: 4 }}>{s.value}</div>
            </div>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.color, boxShadow: `0 0 8px ${s.color}80` }} />
          </div>
        ))}
      </div>

      {/* Charts + AI */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20, marginBottom: 20 }}>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>Revenue vs Expenses</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>Monthly comparison 2024</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyChartData} barSize={14} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} tickFormatter={v => `$${v/1000}k`} />
              <Tooltip formatter={(v: any) => formatCurrency(v as number)} contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="revenue" name="Revenue" fill="#3b82f6" radius={[4,4,0,0]} />
              <Bar dataKey="expenses" name="Expenses" fill="#e2e8f0" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)', fontFamily: 'var(--font-display)', marginBottom: 4 }}>Dept. Breakdown</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 14 }}>Employees by department</div>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie data={departmentData} cx="50%" cy="50%" innerRadius={42} outerRadius={72} paddingAngle={3} dataKey="value">
                {departmentData.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 8 }}>
            {departmentData.slice(0, 4).map(d => (
              <div key={d.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <div style={{ width: 7, height: 7, borderRadius: 2, background: d.color }} />
                  <span style={{ color: 'var(--text-secondary)' }}>{d.name}</span>
                </div>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Recommendations + Activity */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        <AIRecommendations context="dashboard" />

        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>Activity Feed</div>
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Today</span>
          </div>
          {activityFeed.map((a, i) => (
            <div key={a.id} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '9px 0', borderBottom: i < activityFeed.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
              <div style={{ fontSize: 16, lineHeight: 1 }}>{activityEmoji[a.type] || '📌'}</div>
              <div style={{ flex: 1 }}>
                <span style={{ fontWeight: 600, fontSize: 12, color: 'var(--text-primary)' }}>{a.user}</span>
                <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}> {a.action}</span>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>{a.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Insights Row */}
      <div className="card" style={{ padding: 20, marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <RiSparklingLine size={16} color="#8b5cf6" />
          <div style={{ fontWeight: 700, fontSize: 14, fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>AI-Detected Anomalies</div>
        </div>
        <AIInsightCard module="attendance" />
      </div>

      {/* Quick actions */}
      <div className="card" style={{ padding: 20 }}>
        <div style={{ fontWeight: 700, fontSize: 14, fontFamily: 'var(--font-display)', color: 'var(--text-primary)', marginBottom: 14 }}>Quick Actions</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(155px, 1fr))', gap: 10 }}>
          {[
            { label: 'Add Employee', href: '/dashboard/employees', color: '#3b82f6' },
            { label: 'Process Payroll', href: '/dashboard/payroll', color: '#8b5cf6' },
            { label: 'AI Insights', href: '/dashboard/ai-assistant', color: '#6366f1' },
            { label: 'Leave Requests', href: '/dashboard/leave', color: '#f59e0b' },
            { label: 'View Reports', href: '/dashboard/reports', color: '#ef4444' },
            { label: 'Org Health', href: '/dashboard/org-health', color: '#10b981' },
          ].map(q => (
            <Link key={q.label} href={q.href}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 14px', background: 'var(--bg-tertiary)', borderRadius: 10, textDecoration: 'none', transition: 'all 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = q.color + '15'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--bg-tertiary)'; }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>{q.label}</span>
              <RiArrowRightLine size={14} style={{ color: q.color }} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
