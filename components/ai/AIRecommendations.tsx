'use client';
import { useState, useEffect } from 'react';
import { getAIRecommendations } from '@/lib/ai/mockAI';
import { RiSparklingLine, RiArrowRightLine, RiAlertLine, RiStarLine, RiMoneyDollarCircleLine, RiUserAddLine, RiCalendarLine } from 'react-icons/ri';

const iconMap = {
  risk: RiAlertLine,
  promotion: RiStarLine,
  salary: RiMoneyDollarCircleLine,
  hiring: RiUserAddLine,
  leave: RiCalendarLine,
};
const colorMap = {
  risk: { bg: '#fee2e2', color: '#ef4444', darkBg: '#450a0a', darkColor: '#fca5a5' },
  promotion: { bg: '#fef3c7', color: '#d97706', darkBg: '#451a03', darkColor: '#fcd34d' },
  salary: { bg: '#dbeafe', color: '#2563eb', darkBg: '#1e3a8a', darkColor: '#93c5fd' },
  hiring: { bg: '#d1fae5', color: '#059669', darkBg: '#064e3b', darkColor: '#6ee7b7' },
  leave: { bg: '#ede9fe', color: '#7c3aed', darkBg: '#2e1065', darkColor: '#c4b5fd' },
};
const priorityLabel = { high: 'Urgent', medium: 'Review', low: 'FYI' };

export function AIRecommendations({ context = 'dashboard' }: { context?: string }) {
  const [recs, setRecs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dismissed, setDismissed] = useState<string[]>([]);

  useEffect(() => {
    getAIRecommendations(context).then(r => { setRecs(r); setLoading(false); });
  }, [context]);

  const visible = recs.filter((_, i) => !dismissed.includes(String(i)));

  if (loading) return (
    <div className="card" style={{ padding: 16 }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
        <div className="skeleton" style={{ width: 16, height: 16, borderRadius: 4 }} />
        <div className="skeleton" style={{ width: 140, height: 14 }} />
      </div>
      {[1, 2, 3].map(i => <div key={i} className="skeleton" style={{ height: 56, borderRadius: 10, marginBottom: 8 }} />)}
    </div>
  );

  if (visible.length === 0) return null;

  return (
    <div className="card" style={{ padding: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
        <div style={{ width: 24, height: 24, borderRadius: 8, background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <RiSparklingLine size={13} color="white" />
        </div>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, color: 'var(--text-primary)' }}>AI Recommendations</span>
        <span style={{ marginLeft: 'auto', fontSize: 10, color: 'var(--text-muted)', background: 'var(--bg-tertiary)', padding: '2px 8px', borderRadius: 20, fontWeight: 600 }}>{visible.length} insights</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {visible.map((rec, i) => {
          const colors = colorMap[rec.type as keyof typeof colorMap] || colorMap.risk;
          const Icon = iconMap[rec.type as keyof typeof iconMap] || RiAlertLine;
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 12px', background: colors.bg, borderRadius: 10, position: 'relative' }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: colors.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={14} color={colors.color} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: colors.color }}>{rec.title}</span>
                  <span style={{ fontSize: 9, fontWeight: 700, padding: '1px 6px', borderRadius: 20, background: rec.priority === 'high' ? '#ef4444' : rec.priority === 'medium' ? '#f59e0b' : '#10b981', color: 'white', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{priorityLabel[rec.priority as keyof typeof priorityLabel]}</span>
                </div>
                <div style={{ fontSize: 11, color: '#374151', lineHeight: 1.4 }}>{rec.description}</div>
              </div>
              <button style={{ fontSize: 10, fontWeight: 700, color: colors.color, background: 'rgba(255,255,255,0.6)', border: 'none', borderRadius: 6, padding: '3px 8px', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 }}>
                {rec.action} <RiArrowRightLine size={9} style={{ display: 'inline' }} />
              </button>
              <button onClick={() => setDismissed(d => [...d, String(i)])} style={{ position: 'absolute', top: 6, right: 6, background: 'none', border: 'none', color: colors.color, cursor: 'pointer', fontSize: 10, opacity: 0.5, padding: 2 }}>✕</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
