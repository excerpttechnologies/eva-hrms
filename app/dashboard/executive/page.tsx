'use client';
import { useState, useEffect } from 'react';
import { PageSkeleton } from '@/components/ui/Skeleton';
import { AIRecommendations } from '@/components/ai/AIRecommendations';
import { formatCurrency } from '@/lib/utils';
import { monthlyChartData, departmentData } from '@/lib/mock-data';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { RiVipCrown2Line, RiSparklingLine, RiArrowUpLine, RiArrowDownLine } from 'react-icons/ri';

const kpiData = [
  { label: 'Annual Revenue', value: '$7.2M', change: '+18.5%', up: true, sub: 'FY 2024 forecast' },
  { label: 'Total Headcount', value: '72', change: '+50%', up: true, sub: 'vs start of year' },
  { label: 'Revenue per Employee', value: '$100K', change: '+12.3%', up: true, sub: 'industry avg: $85K' },
  { label: 'Employee NPS', value: '62', change: '+8pts', up: true, sub: 'Industry avg: 45' },
  { label: 'Attrition Rate', value: '4.2%', change: '-1.8%', up: false, sub: 'Below industry 7.5%' },
  { label: 'Time to Hire', value: '18 days', change: '-5 days', up: false, sub: 'Improved 22%' },
];

const quarterlyPL = [
  { q: 'Q1', revenue: 1345000, expenses: 905000, profit: 440000 },
  { q: 'Q2', revenue: 1655000, expenses: 1010000, profit: 645000 },
  { q: 'Q3', revenue: 1945000, expenses: 1150000, profit: 795000 },
  { q: 'Q4 (f)', revenue: 2255000, expenses: 1295000, profit: 960000 },
];

export default function ExecutivePage() {
  const [loading, setLoading] = useState(true);
  const [aiSummary, setAiSummary] = useState('');
  const [generatingSummary, setGeneratingSummary] = useState(false);
  useEffect(() => { setTimeout(() => setLoading(false), 700); }, []);
  if (loading) return <PageSkeleton />;

  const generateSummary = async () => {
    setGeneratingSummary(true);
    await new Promise(r => setTimeout(r, 1400));
    setAiSummary("**Q1 2024 Executive Summary — NexusAI Analysis**\n\nRevenue grew 18.5% YoY driven by 3 new enterprise contracts in the Sales pipeline. Headcount expanded by 50% (48→72), keeping revenue-per-employee above industry benchmarks at $100K.\n\nKey risks: 4 high-attrition employees flagged by AI. Engineering capacity at 94% — recommend 2 immediate hires. Marketing ROI up 32% following campaign restructuring.\n\nOverall outlook: **Positive**. Company on track to exceed $7M ARR target.");
    setGeneratingSummary(false);
  };

  return (
    <div className="fade-in-up">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
        <div style={{ width: 48, height: 48, borderRadius: 14, background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <RiVipCrown2Line size={24} color="white" />
        </div>
        <div>
          <h1 className="page-title">Executive Dashboard</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 2 }}>C-Level view — Combined HR & Financial intelligence</p>
        </div>
        <button onClick={generateSummary} disabled={generatingSummary} style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', borderRadius: 10, background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', border: 'none', color: 'white', fontWeight: 700, fontSize: 13, cursor: generatingSummary ? 'wait' : 'pointer' }}>
          <RiSparklingLine size={15} />
          {generatingSummary ? 'Generating...' : 'AI Executive Summary'}
        </button>
      </div>

      {/* AI Summary */}
      {aiSummary && (
        <div style={{ marginBottom: 24, padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.06), rgba(139,92,246,0.06))', border: '1px solid rgba(139,92,246,0.2)', borderRadius: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <RiSparklingLine size={16} color="#8b5cf6" />
            <span style={{ fontWeight: 700, fontSize: 13, color: '#8b5cf6' }}>NexusAI Executive Briefing</span>
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.7 }}>
            {aiSummary.split('\n').map((line, i) => {
              if (line.startsWith('**') && line.endsWith('**')) return <div key={i} style={{ fontWeight: 800, fontFamily: 'var(--font-display)', fontSize: 14, marginBottom: 6, marginTop: i > 0 ? 4 : 0 }}>{line.slice(2, -2)}</div>;
              const parts = line.split(/\*\*(.*?)\*\*/g);
              return <div key={i} style={{ marginBottom: 4 }}>{parts.map((p, j) => j % 2 === 1 ? <strong key={j}>{p}</strong> : p)}</div>;
            })}
          </div>
        </div>
      )}

      {/* KPI Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        {kpiData.map(kpi => (
          <div key={kpi.label} className="card" style={{ padding: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>{kpi.label}</div>
            <div style={{ fontSize: 28, fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--text-primary)', lineHeight: 1 }}>{kpi.value}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 8 }}>
              {kpi.up ? <RiArrowUpLine size={13} color="#10b981" /> : <RiArrowDownLine size={13} color="#10b981" />}
              <span style={{ fontSize: 12, fontWeight: 700, color: '#10b981' }}>{kpi.change}</span>
              <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>· {kpi.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* P&L Chart */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20, marginBottom: 20 }}>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 14, fontFamily: 'var(--font-display)', color: 'var(--text-primary)', marginBottom: 4 }}>P&L Overview — 2024</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 16 }}>Quarterly revenue, expenses and profit</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={quarterlyPL} barSize={22}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="q" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} tickFormatter={v => `$${v/1000}k`} />
              <Tooltip formatter={(v: any) => formatCurrency(v)} contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="revenue" name="Revenue" fill="#3b82f6" radius={[4,4,0,0]} />
              <Bar dataKey="expenses" name="Expenses" fill="#94a3b830" radius={[4,4,0,0]} />
              <Bar dataKey="profit" name="Profit" fill="#10b981" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 14, fontFamily: 'var(--font-display)', color: 'var(--text-primary)', marginBottom: 4 }}>Headcount Mix</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 12 }}>By department</div>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={departmentData} cx="50%" cy="50%" outerRadius={70} paddingAngle={3} dataKey="value">
                {departmentData.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 12px', marginTop: 8 }}>
            {departmentData.map(d => (
              <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10 }}>
                <div style={{ width: 6, height: 6, borderRadius: 2, background: d.color }} />
                <span style={{ color: 'var(--text-muted)' }}>{d.name} ({d.value})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AIRecommendations context="executive" />
    </div>
  );
}
