'use client';
import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
  color?: string;
  subtitle?: string;
}

export function StatCard({ title, value, change, changeType = 'neutral', icon, color = '#3b82f6', subtitle }: StatCardProps) {
  return (
    <div className="card fade-in-up" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>{title}</div>
          <div style={{ fontSize: 26, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1, fontFamily: 'var(--font-display)' }}>{value}</div>
          {subtitle && <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>{subtitle}</div>}
        </div>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ color }}>{icon}</span>
        </div>
      </div>
      {change && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12 }}>
          <span style={{ color: changeType === 'up' ? '#10b981' : changeType === 'down' ? '#ef4444' : 'var(--text-muted)', fontWeight: 600 }}>
            {changeType === 'up' ? '↑' : changeType === 'down' ? '↓' : '→'} {change}
          </span>
          <span style={{ color: 'var(--text-muted)' }}>vs last month</span>
        </div>
      )}
    </div>
  );
}
