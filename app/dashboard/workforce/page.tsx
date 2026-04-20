'use client';
import { useState, useEffect } from 'react';
import { PageSkeleton } from '@/components/ui/Skeleton';
import { AIInsightCard } from '@/components/ai/AIInsightCard';
import { employees } from '@/lib/mock-data';
import { getInitials } from '@/lib/utils';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { RiBrainLine, RiSparklingLine, RiArrowUpLine } from 'react-icons/ri';

const skillGaps = [
  { skill: 'Kubernetes', have: 2, need: 11, gap: 9 },
  { skill: 'Rust', have: 0, need: 4, gap: 4 },
  { skill: 'LLM APIs', have: 2, need: 8, gap: 6 },
  { skill: 'GraphQL', have: 5, need: 9, gap: 4 },
  { skill: 'Terraform', have: 3, need: 7, gap: 4 },
  { skill: 'Data Science', have: 1, need: 5, gap: 4 },
];

const careerPaths = [
  { name: 'Sarah Chen', current: 'Senior Engineer', next: 'Staff Engineer', readiness: 78, timeline: '6 months' },
  { name: 'Zoe Martinez', current: 'Sales Executive', next: 'Sales Manager', readiness: 94, timeline: '1 month' },
  { name: 'David Park', current: 'UX Designer', next: 'Design Lead', readiness: 65, timeline: '9 months' },
  { name: 'Mei Lin', current: 'DevOps Engineer', next: 'Platform Lead', readiness: 82, timeline: '3 months' },
];

const skillRadar = [
  { skill: 'Technical', dept: 85 }, { skill: 'Leadership', dept: 62 },
  { skill: 'Communication', dept: 78 }, { skill: 'Problem Solving', dept: 88 },
  { skill: 'Adaptability', dept: 74 }, { skill: 'Collaboration', dept: 91 },
];

export default function WorkforcePage() {
  const [loading, setLoading] = useState(true);
  useEffect(() => { setTimeout(() => setLoading(false), 700); }, []);
  if (loading) return <PageSkeleton />;

  return (
    <div className="fade-in-up">
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
        <div style={{ width: 46, height: 46, borderRadius: 14, background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <RiBrainLine size={22} color="white" />
        </div>
        <div>
          <h1 className="page-title">Workforce Intelligence</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 2 }}>Skill gaps, career paths & AI growth tracking</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Skill Gaps Identified', value: '6', color: '#ef4444', sub: 'Across 3 departments' },
          { label: 'Ready for Promotion', value: '4', color: '#10b981', sub: 'AI-identified' },
          { label: 'Training Enrollments', value: '18', color: '#3b82f6', sub: 'Active learners' },
          { label: 'Avg Skill Score', value: '79.7', color: '#8b5cf6', sub: '/100 team avg' },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding: 18 }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 26, fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>{s.value}</div>
            <div style={{ fontSize: 11, color: s.color, fontWeight: 600, marginTop: 4 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        {/* Skill Gaps */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 14, fontFamily: 'var(--font-display)', color: 'var(--text-primary)', marginBottom: 4 }}>Critical Skill Gaps</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 5 }}><RiSparklingLine size={11} color="#8b5cf6" /> AI-detected gaps vs team needs</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={skillGaps} layout="vertical" barSize={10}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="skill" tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} axisLine={false} tickLine={false} width={72} />
              <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="have" name="Have" fill="#10b981" radius={[0,4,4,0]} />
              <Bar dataKey="need" name="Need" fill="#3b82f630" radius={[0,4,4,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Skill Radar */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 14, fontFamily: 'var(--font-display)', color: 'var(--text-primary)', marginBottom: 4 }}>Team Competency Map</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 12 }}>Average scores across skill dimensions</div>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={skillRadar}>
              <PolarGrid stroke="var(--border)" />
              <PolarAngleAxis dataKey="skill" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} />
              <Radar dataKey="dept" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.18} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Career Paths */}
      <div className="card" style={{ padding: 20, marginBottom: 20 }}>
        <div style={{ fontWeight: 700, fontSize: 14, fontFamily: 'var(--font-display)', color: 'var(--text-primary)', marginBottom: 4 }}>AI Career Path Suggestions</div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 5 }}><RiSparklingLine size={11} color="#3b82f6" /> Based on performance, tenure and skill trajectory</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
          {careerPaths.map(cp => (
            <div key={cp.name} style={{ padding: 16, background: 'var(--bg-tertiary)', borderRadius: 12, border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: 'white' }}>{getInitials(cp.name)}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--text-primary)' }}>{cp.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{cp.current}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, fontSize: 12 }}>
                <span style={{ color: 'var(--text-muted)' }}>{cp.current}</span>
                <RiArrowUpLine size={12} color="#10b981" />
                <span style={{ fontWeight: 700, color: '#10b981' }}>{cp.next}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 6 }}>
                <span style={{ color: 'var(--text-muted)' }}>Readiness</span>
                <span style={{ fontWeight: 700, color: cp.readiness >= 80 ? '#10b981' : '#f59e0b' }}>{cp.readiness}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${cp.readiness}%`, background: cp.readiness >= 80 ? '#10b981' : '#f59e0b' }} />
              </div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 6 }}>Est. timeline: {cp.timeline}</div>
            </div>
          ))}
        </div>
      </div>

      <AIInsightCard module="performance" />
    </div>
  );
}
