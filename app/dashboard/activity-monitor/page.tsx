'use client';
import { useState, useEffect, useRef } from 'react';
import { employees } from '@/lib/mock-data';
import { PageSkeleton } from '@/components/ui/Skeleton';
import { getInitials } from '@/lib/utils';
import { RiRadioButtonLine, RiWifiLine, RiTimeLine } from 'react-icons/ri';

const statusColors = { online: '#10b981', away: '#f59e0b', offline: '#94a3b8', busy: '#ef4444' };

const liveEvents = [
  { user: 'Sarah Chen', action: 'opened Payroll module', time: '2s ago', type: 'module' },
  { user: 'Marcus Johnson', action: 'updated CRM lead: Enterprise Solutions', time: '15s ago', type: 'crm' },
  { user: 'Priya Sharma', action: 'approved leave request (James Wilson)', time: '43s ago', type: 'leave' },
  { user: 'Mei Lin', action: 'pushed code to production repo', time: '1m ago', type: 'code' },
  { user: 'David Park', action: 'exported Q1 design report', time: '2m ago', type: 'export' },
  { user: 'Isaac Brown', action: 'called Enterprise Solutions', time: '3m ago', type: 'call' },
  { user: 'Emma Thompson', action: 'submitted expense: Flight to NYC', time: '5m ago', type: 'expense' },
  { user: 'Kevin O\'Brien', action: 'assigned task: Q2 planning doc', time: '8m ago', type: 'task' },
];

const typeEmoji: Record<string, string> = { module: '🖥️', crm: '💼', leave: '🏖️', code: '⚡', export: '📊', call: '📞', expense: '💸', task: '✅' };

export default function ActivityMonitorPage() {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState(liveEvents);
  const [tick, setTick] = useState(0);
  const tickRef = useRef(0);

  useEffect(() => { setTimeout(() => setLoading(false), 600); }, []);

  // Simulate live feed
  useEffect(() => {
    const interval = setInterval(() => {
      tickRef.current++;
      setTick(tickRef.current);
      if (tickRef.current % 4 === 0) {
        const newEvent = {
          user: employees[Math.floor(Math.random() * employees.length)].name,
          action: ['viewed employee profile', 'updated attendance record', 'opened dashboard', 'checked payslip', 'submitted a report'][Math.floor(Math.random() * 5)],
          time: 'just now',
          type: ['module', 'leave', 'crm'][Math.floor(Math.random() * 3)],
        };
        setEvents(prev => [newEvent, ...prev.slice(0, 11)]);
      }
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  const onlineEmployees = employees.map((e, i) => ({
    ...e,
    online: i < 8,
    status: (['online', 'online', 'online', 'away', 'online', 'busy', 'online', 'online', 'offline', 'offline', 'offline', 'offline'] as const)[i],
    lastSeen: ['Active now', 'Active now', '2m ago', 'Away 5m', 'Active now', 'In meeting', 'Active now', 'Active now', '1h ago', '2h ago', '3h ago', 'Yesterday'][i],
    hoursToday: [7.2, 6.8, 8.1, 5.5, 7.9, 4.2, 8.5, 6.1, 0, 0, 0, 0][i],
  }));

  if (loading) return <PageSkeleton />;

  return (
    <div className="fade-in-up">
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
        <div style={{ width: 46, height: 46, borderRadius: 14, background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <RiRadioButtonLine size={22} color="white" style={{ animation: 'pulse 2s infinite' }} />
          <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}`}</style>
        </div>
        <div>
          <h1 className="page-title">Real-Time Activity Monitor</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 2 }}>Live employee activity, presence & productivity tracking</p>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#10b981', fontWeight: 700 }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', display: 'inline-block', animation: 'pulse 2s infinite' }} />
          LIVE · {onlineEmployees.filter(e => e.status === 'online').length} online
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Online Now', value: onlineEmployees.filter(e => e.status === 'online').length, color: '#10b981' },
          { label: 'Away', value: onlineEmployees.filter(e => e.status === 'away').length, color: '#f59e0b' },
          { label: 'In Meeting', value: onlineEmployees.filter(e => e.status === 'busy').length, color: '#ef4444' },
          { label: 'Offline', value: onlineEmployees.filter(e => e.status === 'offline').length, color: '#94a3b8' },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding: 18, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: s.color, flexShrink: 0, boxShadow: `0 0 8px ${s.color}80` }} />
            <div>
              <div style={{ fontSize: 24, fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>{s.value}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20 }}>
        {/* Employee presence grid */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 14, fontFamily: 'var(--font-display)', color: 'var(--text-primary)', marginBottom: 16 }}>Employee Presence</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
            {onlineEmployees.map(e => (
              <div key={e.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: 'var(--bg-tertiary)', borderRadius: 10 }}>
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: 'white' }}>{getInitials(e.name)}</div>
                  <div style={{ position: 'absolute', bottom: 0, right: 0, width: 10, height: 10, borderRadius: '50%', background: statusColors[e.status], border: '2px solid var(--bg-tertiary)' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.name.split(' ')[0]}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{e.lastSeen}</div>
                </div>
                {e.hoursToday > 0 && (
                  <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{e.hoursToday}h</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Live feed */}
        <div className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <RiWifiLine size={14} color="#10b981" />
            <span style={{ fontWeight: 700, fontSize: 13, fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>Live Activity Feed</span>
            <span style={{ marginLeft: 'auto', fontSize: 10, color: '#10b981', fontWeight: 700, animation: 'pulse 2s infinite' }}>● LIVE</span>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', maxHeight: 420 }}>
            {events.map((ev, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, padding: '10px 16px', borderBottom: '1px solid var(--border-subtle)', background: i === 0 ? 'rgba(59,130,246,0.03)' : 'transparent', transition: 'background 0.5s' }}>
                <span style={{ fontSize: 16, lineHeight: 1, flexShrink: 0, marginTop: 1 }}>{typeEmoji[ev.type] || '📌'}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12 }}>
                    <strong style={{ color: 'var(--text-primary)' }}>{ev.user}</strong>
                    <span style={{ color: 'var(--text-secondary)' }}> {ev.action}</span>
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>{ev.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
