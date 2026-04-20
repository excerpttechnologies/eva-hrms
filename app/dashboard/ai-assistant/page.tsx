'use client';
import { useState, useEffect } from 'react';
import { getAIRecommendations, generateInsight } from '@/lib/ai/mockAI';
import { AIInsightCard } from '@/components/ai/AIInsightCard';
import { AIRecommendations } from '@/components/ai/AIRecommendations';
import { PageSkeleton } from '@/components/ui/Skeleton';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { RiRobot2Line, RiSparklingLine, RiBrainLine, RiAlertLine, RiBarChartLine, RiUserLine } from 'react-icons/ri';

const attritionData = [
  { month: 'Jan', risk: 2, actual: 0 }, { month: 'Feb', risk: 3, actual: 1 },
  { month: 'Mar', risk: 5, actual: 2 }, { month: 'Apr', risk: 4, actual: 1 },
  { month: 'May', risk: 6, actual: 3 }, { month: 'Jun', risk: 4, actual: 2 },
];
const productivityData = [
  { week: 'W1', score: 78 }, { week: 'W2', score: 82 }, { week: 'W3', score: 79 },
  { week: 'W4', score: 85 }, { week: 'W5', score: 88 }, { week: 'W6', score: 84 },
  { week: 'W7', score: 91 }, { week: 'W8', score: 89 },
];

export default function AIAssistantPage() {
  const [loading, setLoading] = useState(true);
  useEffect(() => { setTimeout(() => setLoading(false), 700); }, []);
  if (loading) return <PageSkeleton />;

  return (
    <div className="fade-in-up">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
        <div style={{ width: 52, height: 52, borderRadius: 16, background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(59,130,246,0.4)' }}>
          <RiRobot2Line size={26} color="white" />
        </div>
        <div>
          <h1 className="page-title">NexusAI Intelligence Center</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 2 }}>AI-powered insights, predictions & recommendations across your entire workforce</p>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center', padding: '8px 14px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 10 }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', display: 'inline-block', animation: 'pulse 2s infinite' }} />
          <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }`}</style>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#10b981' }}>AI Engine Active</span>
        </div>
      </div>

      {/* AI Score cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Org Health Score', value: '82/100', sub: '+4 this month', color: '#10b981', icon: RiSparklingLine },
          { label: 'Attrition Risk', value: '4 employees', sub: 'High risk flagged', color: '#ef4444', icon: RiAlertLine },
          { label: 'Productivity Index', value: '89%', sub: '↑ 6% vs last month', color: '#3b82f6', icon: RiBarChartLine },
          { label: 'AI Recommendations', value: '5 active', sub: '2 urgent actions', color: '#8b5cf6', icon: RiBrainLine },
        ].map(s => (
          <div key={s.label} className="card fade-in-up" style={{ padding: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</div>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: s.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <s.icon size={16} color={s.color} />
              </div>
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>{s.value}</div>
            <div style={{ fontSize: 11, color: s.color, fontWeight: 600, marginTop: 4 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Charts + Recommendations */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 14, fontFamily: 'var(--font-display)', color: 'var(--text-primary)', marginBottom: 4 }}>Attrition Prediction</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6 }}>
            <RiSparklingLine size={12} color="#8b5cf6" /> AI-predicted vs actual attrition
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={attritionData} barSize={14}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="risk" name="AI Risk Prediction" fill="#ef444460" radius={[4,4,0,0]} />
              <Bar dataKey="actual" name="Actual Attrition" fill="#ef4444" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 14, fontFamily: 'var(--font-display)', color: 'var(--text-primary)', marginBottom: 4 }}>Productivity Trend</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6 }}>
            <RiSparklingLine size={12} color="#3b82f6" /> Team performance index (AI scored)
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={productivityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} domain={[70, 95]} />
              <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }} />
              <Line type="monotone" dataKey="score" name="Score" stroke="#3b82f6" strokeWidth={2.5} dot={{ fill: '#3b82f6', r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recommendations + Insights */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        <AIRecommendations context="dashboard" />
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 14, fontFamily: 'var(--font-display)', color: 'var(--text-primary)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <RiSparklingLine size={15} color="#8b5cf6" /> AI Anomaly Alerts
          </div>
          <AIInsightCard module="payroll" />
        </div>
      </div>

      {/* AI Report Generator */}
      <div className="card" style={{ padding: 24, background: 'linear-gradient(135deg, rgba(59,130,246,0.04), rgba(139,92,246,0.04))', border: '1px solid rgba(139,92,246,0.15)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <RiBrainLine size={20} color="#8b5cf6" />
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>AI Report Generator</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Describe what report you need — AI generates it instantly</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 14 }}>
          {['Generate monthly HR report', 'Attrition analysis Q1', 'Payroll cost breakdown', 'Department performance comparison', 'Hiring funnel summary'].map(prompt => (
            <button key={prompt} style={{ padding: '7px 14px', borderRadius: 20, border: '1px solid rgba(139,92,246,0.3)', background: 'rgba(139,92,246,0.08)', color: '#8b5cf6', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
              onClick={() => alert(`AI generating: "${prompt}"`)}>
              {prompt}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <input className="input" placeholder='Type a report request, e.g. "Show me Q1 attendance trends by department"' style={{ flex: 1 }} />
          <button className="btn-primary" style={{ whiteSpace: 'nowrap' }}><RiSparklingLine size={14} /> Generate with AI</button>
        </div>
      </div>
    </div>
  );
}
