'use client';
import { useState, useEffect } from 'react';
import { generateInsight } from '@/lib/ai/mockAI';
import { RiSparklingLine, RiArrowUpLine, RiArrowDownLine, RiSubtractLine } from 'react-icons/ri';

interface Props { module: string; }

export function AIInsightCard({ module }: Props) {
  const [insights, setInsights] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generateInsight(module).then(r => { setInsights(r); setLoading(false); });
  }, [module]);

  const severityStyle = { info: { bg: '#dbeafe', color: '#1d4ed8' }, warning: { bg: '#fef3c7', color: '#92400e' }, critical: { bg: '#fee2e2', color: '#991b1b' } };
  const TrendIcon = { up: RiArrowUpLine, down: RiArrowDownLine, stable: RiSubtractLine };

  if (loading) return <div className="skeleton" style={{ height: 100, borderRadius: 12 }} />;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {insights.map((ins, i) => {
        const s = severityStyle[ins.severity as keyof typeof severityStyle];
        const TIcon = TrendIcon[ins.trend as keyof typeof TrendIcon];
        return (
          <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '10px 14px', background: s.bg, borderRadius: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: s.color + '25', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <RiSparklingLine size={14} color={s.color} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: s.color, marginBottom: 2 }}>{ins.headline}</div>
              <div style={{ fontSize: 11, color: '#374151', lineHeight: 1.4 }}>{ins.body}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 13, fontWeight: 800, color: s.color }}>
              <TIcon size={12} />
              {ins.metric}
            </div>
          </div>
        );
      })}
    </div>
  );
}
