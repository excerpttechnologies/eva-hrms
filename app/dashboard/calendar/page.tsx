'use client';
import { useState, useEffect } from 'react';
import { PageSkeleton } from '@/components/ui/Skeleton';
import { RiCalendar2Line, RiAddLine } from 'react-icons/ri';

const eventTypes = {
  leave: { color: '#10b981', bg: '#d1fae5', label: 'Leave' },
  meeting: { color: '#3b82f6', bg: '#dbeafe', label: 'Meeting' },
  task: { color: '#8b5cf6', bg: '#ede9fe', label: 'Task' },
  holiday: { color: '#ef4444', bg: '#fee2e2', label: 'Holiday' },
  review: { color: '#f59e0b', bg: '#fef3c7', label: 'Review' },
};

const events: Record<number, { title: string; type: keyof typeof eventTypes; time?: string }[]> = {
  1: [{ title: 'New Year holiday', type: 'holiday' }],
  5: [{ title: 'Sarah Chen - Annual Leave', type: 'leave' }, { title: 'Team Standup', type: 'meeting', time: '10:00' }],
  8: [{ title: 'Q1 Planning', type: 'meeting', time: '2:00 PM' }],
  10: [{ title: 'James Wilson - Sick Leave', type: 'leave' }],
  12: [{ title: 'Performance Reviews Due', type: 'review' }],
  15: [{ title: 'Today', type: 'meeting' }, { title: 'All Hands Meeting', type: 'meeting', time: '3:00 PM' }, { title: 'HRMS Sprint Review', type: 'task', time: '4:30 PM' }],
  18: [{ title: 'Payroll Processing', type: 'task', time: '9:00 AM' }],
  20: [{ title: 'David Park - Leave', type: 'leave' }],
  22: [{ title: 'Board Meeting', type: 'meeting', time: '11:00 AM' }],
  25: [{ title: 'Mei Lin - Maternity Leave', type: 'leave' }],
  28: [{ title: 'Month End Reports', type: 'task' }],
  31: [{ title: 'Q1 Close', type: 'task' }],
};

export default function CalendarPage() {
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState(15);
  const [view, setView] = useState<'month' | 'week'>('month');
  useEffect(() => { setTimeout(() => setLoading(false), 500); }, []);
  if (loading) return <PageSkeleton />;

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const startOffset = 1; // Jan 2024 starts Monday

  const allEvents = Object.values(events).flat();
  const todayEvents = events[selectedDay] || [];

  return (
    <div className="fade-in-up">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 46, height: 46, borderRadius: 14, background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <RiCalendar2Line size={22} color="white" />
          </div>
          <div>
            <h1 className="page-title">Smart Calendar</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 2 }}>Unified: leaves, meetings, tasks & events</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {['month', 'week'].map(v => <button key={v} className={view === v ? 'btn-primary' : 'btn-secondary'} onClick={() => setView(v as any)} style={{ textTransform: 'capitalize' }}>{v}</button>)}
          <button className="btn-primary"><RiAddLine size={15} /> Add Event</button>
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: 14, marginBottom: 16, flexWrap: 'wrap' }}>
        {Object.entries(eventTypes).map(([k, v]) => (
          <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--text-secondary)' }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: v.color }} />
            {v.label}
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 20 }}>
        {/* Calendar grid */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 16, fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>January 2024</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn-ghost" style={{ padding: '4px 10px' }}>← Prev</button>
              <button className="btn-secondary" style={{ padding: '4px 12px', fontSize: 12 }}>Today</button>
              <button className="btn-ghost" style={{ padding: '4px 10px' }}>Next →</button>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
            {weekDays.map(d => (
              <div key={d} style={{ textAlign: 'center', fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', padding: '6px 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{d}</div>
            ))}
            {Array.from({ length: startOffset }).map((_, i) => <div key={`pad-${i}`} />)}
            {days.map(d => {
              const dayEvents = events[d] || [];
              const isToday = d === 15;
              const isSelected = d === selectedDay;
              return (
                <div key={d} onClick={() => setSelectedDay(d)}
                  style={{ padding: '6px 4px', minHeight: 70, borderRadius: 8, cursor: 'pointer', background: isSelected ? 'rgba(59,130,246,0.1)' : 'transparent', border: `1px solid ${isToday ? '#3b82f6' : 'transparent'}`, transition: 'all 0.15s' }}>
                  <div style={{ textAlign: 'center', fontSize: 12, fontWeight: isToday ? 800 : 500, color: isToday ? '#3b82f6' : 'var(--text-primary)', marginBottom: 4 }}>{d}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {dayEvents.slice(0, 2).map((ev, i) => {
                      const et = eventTypes[ev.type];
                      return (
                        <div key={i} style={{ fontSize: 9, fontWeight: 600, color: et.color, background: et.bg, borderRadius: 3, padding: '1px 4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {ev.title}
                        </div>
                      );
                    })}
                    {dayEvents.length > 2 && <div style={{ fontSize: 9, color: 'var(--text-muted)', paddingLeft: 4 }}>+{dayEvents.length - 2} more</div>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Day detail */}
        <div className="card" style={{ padding: 18 }}>
          <div style={{ fontWeight: 700, fontSize: 14, fontFamily: 'var(--font-display)', color: 'var(--text-primary)', marginBottom: 4 }}>
            {selectedDay === 15 ? 'Today' : `Jan ${selectedDay}`}, 2024
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 16 }}>{todayEvents.length} events scheduled</div>
          {todayEvents.length === 0 ? (
            <div style={{ padding: '32px 0', textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>
              No events this day
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {todayEvents.map((ev, i) => {
                const et = eventTypes[ev.type];
                return (
                  <div key={i} style={{ padding: '10px 14px', borderRadius: 10, background: et.bg, borderLeft: `3px solid ${et.color}` }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: et.color, marginBottom: 2 }}>{ev.title}</div>
                    {ev.time && <div style={{ fontSize: 10, color: '#374151' }}>⏰ {ev.time}</div>}
                    <span style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: et.color }}>{et.label}</span>
                  </div>
                );
              })}
            </div>
          )}
          <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 16 }} onClick={() => alert('Add event modal')}>
            <RiAddLine size={14} /> Add Event
          </button>

          {/* Upcoming */}
          <div style={{ marginTop: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Upcoming</div>
            {[
              { day: 18, title: 'Payroll Processing', type: 'task' as const },
              { day: 22, title: 'Board Meeting', type: 'meeting' as const },
              { day: 28, title: 'Month End Reports', type: 'task' as const },
            ].map(u => {
              const et = eventTypes[u.type];
              return (
                <div key={u.day} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: '1px solid var(--border-subtle)', alignItems: 'center' }}>
                  <div style={{ width: 30, textAlign: 'center', flexShrink: 0 }}>
                    <div style={{ fontSize: 16, fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--text-primary)', lineHeight: 1 }}>{u.day}</div>
                    <div style={{ fontSize: 9, color: 'var(--text-muted)' }}>JAN</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>{u.title}</div>
                    <span style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', color: et.color }}>{et.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
