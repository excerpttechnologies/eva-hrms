'use client';
import { useState, useEffect } from 'react';
import { PageSkeleton } from '@/components/ui/Skeleton';
import {
  RiLayoutGridLine,
  RiCheckboxMultipleLine,
  RiDownloadLine,
  RiAddLine,
  RiArrowDownSLine,
  RiMore2Line,
  RiChat3Line,
  RiPhoneLine,
} from 'react-icons/ri';

const stats = [
  { label: 'Total Clients', value: '1,280', amount: '+19.01%', icon: '👥', bg: '#fce7f3', fg: '#be185d' },
  { label: 'Active Accounts', value: '892', amount: '+19.01%', icon: '📁', bg: '#d1fae5', fg: '#047857' },
  { label: 'New Leads', value: '142', amount: '+19.01%', icon: '🗂️', bg: '#fee2e2', fg: '#b91c1c' },
  { label: 'Projects', value: '34', amount: '+19.01%', icon: '📊', bg: '#dbeafe', fg: '#1d4ed8' },
];

const clients = [
  {
    id: 1,
    name: 'Anna Roberts',
    initials: 'AR',
    role: 'CEO',
    roleBg: '#f5d0fe',
    roleText: '#7c3aed',
    progressColor: '#8b5cf6',
    project: 'Alpha Design Suite',
    company: 'Bespoke Systems',
    progress: 84,
    team: ['AL', 'MK', 'YT', 'GH'],
  },
  {
    id: 2,
    name: 'Jordan Miles',
    initials: 'JM',
    role: 'Manager',
    roleBg: '#d1fae5',
    roleText: '#047857',
    progressColor: '#14b8a6',
    project: 'Onboarding Portal',
    company: 'Nova Lines',
    progress: 72,
    team: ['RS', 'BM', 'LC'],
  },
  {
    id: 3,
    name: 'Sophie Turner',
    initials: 'ST',
    role: 'Director',
    roleBg: '#fee2e2',
    roleText: '#b91c1c',
    progressColor: '#ef4444',
    project: 'Growth Strategy',
    company: 'LumenCorp',
    progress: 67,
    team: ['NW', 'AP', 'GV'],
  },
  {
    id: 4,
    name: 'Mia Foster',
    initials: 'MF',
    role: 'Consultant',
    roleBg: '#fef9c3',
    roleText: '#a16207',
    progressColor: '#f59e0b',
    project: 'Client Success Plan',
    company: 'Pulse Labs',
    progress: 58,
    team: ['KB', 'EJ', 'SD'],
  },
  {
    id: 5,
    name: 'Leo Grant',
    initials: 'LG',
    role: 'Designer',
    roleBg: '#dbeafe',
    roleText: '#1e3a8a',
    progressColor: '#3b82f6',
    project: 'Brand Refresh',
    company: 'Orbit Media',
    progress: 91,
    team: ['EM', 'TW'],
  },
  {
    id: 6,
    name: 'Maya Kim',
    initials: 'MK',
    role: 'Manager',
    roleBg: '#d1fae5',
    roleText: '#047857',
    progressColor: '#14b8a6',
    project: 'Retention Campaign',
    company: 'Crest Works',
    progress: 76,
    team: ['AB', 'PC', 'LR'],
  },
];

export default function ProjectsPage() {
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timeout);
  }, []);

  if (loading) return <PageSkeleton />;

  return (
    <div className="fade-in-up" style={{ paddingBottom: 24 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: 18, marginBottom: 22 }}>
        <div style={{ minWidth: 260, flex: 1 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0, color: '#0f172a' }}>Clients</h1>
          <div style={{ marginTop: 8, fontSize: 12, color: '#6b7280', letterSpacing: '0.02em' }}>
            Home <span style={{ margin: '0 6px' }}>›</span> Projects <span style={{ margin: '0 6px' }}>›</span> Client Grid
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
          <div style={{ display: 'flex', border: '1px solid #e5e7eb', borderRadius: 999, overflow: 'hidden' }}>
            <button onClick={() => setView('grid')} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 14px', border: 'none', background: view === 'grid' ? '#fff7ed' : '#ffffff', color: view === 'grid' ? '#ea580c' : '#475569', cursor: 'pointer' }}>
              <RiLayoutGridLine size={16} /> Grid
            </button>
            <button onClick={() => setView('list')} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 14px', border: 'none', background: view === 'list' ? '#fff7ed' : '#ffffff', color: view === 'list' ? '#ea580c' : '#475569', cursor: 'pointer' }}>
              <RiCheckboxMultipleLine size={16} /> List
            </button>
          </div>
          <button style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderRadius: 10, border: '1px solid #e5e7eb', background: '#ffffff', color: '#0f172a', cursor: 'pointer' }}>
            <RiDownloadLine size={16} /> Export
          </button>
          <button style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 18px', borderRadius: 10, border: 'none', background: '#f97316', color: '#ffffff', cursor: 'pointer' }}>
            <RiAddLine size={16} /> Add Client
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 24 }}>
        {stats.map((item) => (
          <div key={item.label} style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: 16, padding: 18, minHeight: 120, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: item.bg, display: 'grid', placeItems: 'center', fontSize: 18 }}>
                {item.icon}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontSize: 12, color: '#6b7280' }}>{item.label}</span>
                <span style={{ fontSize: 22, fontWeight: 700, color: '#0f172a' }}>{item.value}</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12 }}>
              <span style={{ width: 36, height: 4, borderRadius: 999, background: '#dcfce7' }} />
              <span style={{ color: '#16a34a', fontWeight: 700, fontSize: 12 }}>{item.amount}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 18 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: '#0f172a' }}>Client Grid</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ position: 'relative' }}>
            <select style={{ minWidth: 140, padding: '10px 12px', borderRadius: 10, border: '1px solid #e5e7eb', background: '#ffffff', color: '#111827' }}>
              <option>Status</option>
              <option>All</option>
              <option>Active</option>
              <option>Pending</option>
            </select>
            <RiArrowDownSLine size={16} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          </div>
          <div style={{ position: 'relative' }}>
            <select style={{ minWidth: 140, padding: '10px 12px', borderRadius: 10, border: '1px solid #e5e7eb', background: '#ffffff', color: '#111827' }}>
              <option>Sort by</option>
              <option>Newest</option>
              <option>Progress</option>
              <option>Company</option>
            </select>
            <RiArrowDownSLine size={16} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          </div>
        </div>
      </div>

      <div style={{ display: view === 'grid' ? 'grid' : 'block', gridTemplateColumns: view === 'grid' ? 'repeat(auto-fit, minmax(260px, 1fr))' : '1fr', gap: 18 }}>
        {clients.map((client) => (
          <div key={client.id} style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: 10, padding: 20, display: 'flex', flexDirection: 'column', gap: 16, minHeight: 340 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <input type="checkbox" style={{ width: 16, height: 16, accentColor: '#ea580c', cursor: 'pointer' }} />
              <RiMore2Line size={18} color="#94a3b8" style={{ cursor: 'pointer' }} />
            </div>

            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#f3f4f6', display: 'grid', placeItems: 'center', fontWeight: 700, color: '#111827' }}>
                  {client.initials}
                </div>
                <span style={{ position: 'absolute', right: -2, bottom: -2, width: 12, height: 12, borderRadius: '50%', background: '#22c55e', border: '2px solid #ffffff' }} />
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>{client.name}</div>
                <span style={{ display: 'inline-flex', padding: '6px 10px', borderRadius: 999, background: client.roleBg, color: client.roleText, fontSize: 11, fontWeight: 700, marginTop: 6 }}>{client.role}</span>
              </div>
            </div>

            <div style={{ fontSize: 13, color: '#6b7280' }}>{client.project}</div>
            <div style={{ width: '100%', height: 8, borderRadius: 999, background: '#f3f4f6', overflow: 'hidden' }}>
              <div style={{ width: `${client.progress}%`, height: '100%', background: client.progressColor }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: -8 }}>
                {client.team.slice(0, 3).map((member, index) => (
                  <div key={index} style={{ width: 28, height: 28, borderRadius: '50%', border: '2px solid #ffffff', background: '#f8fafc', display: 'grid', placeItems: 'center', fontSize: 11, fontWeight: 700, color: '#0f172a', boxShadow: '0 1px 4px rgba(15, 23, 42, 0.08)' }}>
                    {member}
                  </div>
                ))}
                {client.team.length > 3 && (
                  <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: 40, padding: '6px 10px', background: '#f8fafc', borderRadius: 999, fontSize: 11, color: '#475569', fontWeight: 600, border: '1px solid #e5e7eb' }}>
                    +{client.team.length - 3}
                  </div>
                )}
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: client.progressColor }}>{client.progress}%</div>
            </div>

            <div style={{ marginTop: 'auto', padding: '14px 16px', borderRadius: 14, background: '#f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
              <div style={{ fontSize: 12, color: '#6b7280' }}>
                Company <span style={{ fontWeight: 700, color: '#111827' }}>{client.company}</span>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={{ width: 34, height: 34, borderRadius: 10, background: '#ffffff', border: '1px solid #e5e7eb', display: 'grid', placeItems: 'center', color: '#64748b', cursor: 'pointer' }}>
                  <RiChat3Line size={14} />
                </button>
                <button style={{ width: 34, height: 34, borderRadius: 10, background: '#ffffff', border: '1px solid #e5e7eb', display: 'grid', placeItems: 'center', color: '#64748b', cursor: 'pointer' }}>
                  <RiPhoneLine size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
