'use client';
import { useState, useEffect } from 'react';
import { monthlyChartData, departmentData, employees } from '@/lib/mock-data';
import { StatCard } from '@/components/ui/StatCard';
import { PageSkeleton } from '@/components/ui/Skeleton';
import { formatCurrency } from '@/lib/utils';
import { RiPieChartLine, RiDownload2Line, RiPrinterLine } from 'react-icons/ri';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const reportTypes = ['Overview', 'HR Report', 'Payroll Report', 'Attendance Report', 'Financial Report'];

export default function ReportsPage() {
  const [loading, setLoading] = useState(true);
  const [activeReport, setActiveReport] = useState('Overview');
  const [dateRange, setDateRange] = useState('2024');
  const [department, setDepartment] = useState('');
  useEffect(() => { setTimeout(() => setLoading(false), 700); }, []);
  if (loading) return <PageSkeleton />;

  const handleExport = (type: string) => alert(`Exporting ${activeReport} as ${type.toUpperCase()}`);

  const totalRevenue = monthlyChartData.reduce((s, m) => s + m.revenue, 0);
  const totalExpenses = monthlyChartData.reduce((s, m) => s + m.expenses, 0);

  return (
    <div className="fade-in-up">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 className="page-title">Reports & Analytics</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 2 }}>Insights, metrics and downloadable reports</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn-secondary" onClick={() => handleExport('pdf')}><RiDownload2Line size={14} /> PDF</button>
          <button className="btn-secondary" onClick={() => handleExport('excel')}><RiDownload2Line size={14} /> Excel</button>
          <button className="btn-secondary" onClick={() => window.print()}><RiPrinterLine size={14} /> Print</button>
        </div>
      </div>

      {/* Report Type Tabs */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 20, flexWrap: 'wrap' }}>
        {reportTypes.map(r => (
          <button key={r} onClick={() => setActiveReport(r)} style={{ padding: '7px 16px', borderRadius: 8, border: '1px solid var(--border)', cursor: 'pointer', fontSize: 12, fontWeight: 600, transition: 'all 0.2s', background: activeReport === r ? '#3b82f6' : 'var(--bg-card)', color: activeReport === r ? 'white' : 'var(--text-secondary)' }}>{r}</button>
        ))}
      </div>

      {/* Filters */}
      <div className="card" style={{ padding: '14px 20px', marginBottom: 20, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>Filters:</span>
        <select className="input" style={{ width: 'auto', fontSize: 12 }} value={dateRange} onChange={e => setDateRange(e.target.value)}>
          {['2024', '2023', 'Q1 2024', 'Q4 2023', 'Last 30 days', 'Last 90 days'].map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        <select className="input" style={{ width: 'auto', fontSize: 12 }} value={department} onChange={e => setDepartment(e.target.value)}>
          <option value="">All Departments</option>
          {['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Design'].map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        <button className="btn-primary" style={{ fontSize: 12, padding: '8px 16px' }}>Apply Filters</button>
      </div>

      {/* KPI Summary */}
      <div className="stats-grid" style={{ marginBottom: 24 }}>
        <StatCard title="Total Revenue" value={formatCurrency(totalRevenue)} icon={<RiPieChartLine size={18} />} color="#10b981" change="+18.5%" changeType="up" subtitle="FY 2024" />
        <StatCard title="Total Expenses" value={formatCurrency(totalExpenses)} icon={<RiPieChartLine size={18} />} color="#ef4444" change="+12.3%" changeType="up" subtitle="FY 2024" />
        <StatCard title="Net Profit" value={formatCurrency(totalRevenue - totalExpenses)} icon={<RiPieChartLine size={18} />} color="#3b82f6" change="+24.8%" changeType="up" />
        <StatCard title="Headcount Growth" value="+50%" icon={<RiPieChartLine size={18} />} color="#8b5cf6" subtitle="48 → 72 employees" />
      </div>

      {/* Charts grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20, marginBottom: 20 }}>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 14, fontFamily: 'var(--font-display)', color: 'var(--text-primary)', marginBottom: 4 }}>Revenue vs Expenses — {dateRange}</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 16 }}>Monthly financial performance</div>
          <ResponsiveContainer width="100%" height={230}>
            <AreaChart data={monthlyChartData}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} tickFormatter={v => `$${v/1000}k`} />
              <Tooltip formatter={(v: any) => formatCurrency(v as number)} contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#3b82f6" fill="url(#revGrad)" strokeWidth={2} />
              <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#ef4444" fill="url(#expGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 14, fontFamily: 'var(--font-display)', color: 'var(--text-primary)', marginBottom: 4 }}>Dept. Distribution</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 12 }}>Headcount by department</div>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={departmentData} cx="50%" cy="50%" outerRadius={80} paddingAngle={3} dataKey="value">
                {departmentData.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 8 }}>
            {departmentData.map(d => (
              <div key={d.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <div style={{ width: 6, height: 6, borderRadius: 2, background: d.color }} />
                  <span style={{ color: 'var(--text-secondary)' }}>{d.name}</span>
                </div>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Headcount chart */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 14, fontFamily: 'var(--font-display)', color: 'var(--text-primary)', marginBottom: 4 }}>Headcount Growth</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 16 }}>Monthly employee count</div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={monthlyChartData} barSize={18}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} domain={[40, 80]} />
              <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="employees" name="Employees" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Summary table */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 14, fontFamily: 'var(--font-display)', color: 'var(--text-primary)', marginBottom: 16 }}>Quarterly Summary</div>
          <table className="data-table">
            <thead><tr><th>Quarter</th><th>Revenue</th><th>Expenses</th><th>Margin</th></tr></thead>
            <tbody>
              {[
                { q: 'Q1 2024', rev: 1345000, exp: 905000 },
                { q: 'Q2 2024', rev: 1655000, exp: 1010000 },
                { q: 'Q3 2024', rev: 1945000, exp: 1150000 },
                { q: 'Q4 2024', rev: 2255000, exp: 1295000 },
              ].map(q => {
                const margin = ((q.rev - q.exp) / q.rev * 100).toFixed(1);
                return (
                  <tr key={q.q}>
                    <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{q.q}</td>
                    <td style={{ color: '#10b981', fontWeight: 600 }}>{formatCurrency(q.rev)}</td>
                    <td style={{ color: '#ef4444' }}>{formatCurrency(q.exp)}</td>
                    <td><span className="badge badge-success">{margin}%</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
