'use client';
import { useStore } from '@/lib/store/useStore';
import { useRouter } from 'next/navigation';
import {
  RiSearchLine,
  RiBellLine,
  RiGridLine,
  RiSettings3Line,
  RiChat1Line,
  RiMailLine,
} from 'react-icons/ri';

export function Topbar() {
  const { user } = useStore();
  const router = useRouter();

  return (
    <header style={{
      height: 56,
      background: '#ffffff',
      borderBottom: '1px solid #e5e7eb',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
      padding: '0 24px',
      position: 'sticky',
      top: 0,
      zIndex: 40,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#ea580c', display: 'grid', placeItems: 'center', color: '#ffffff', fontWeight: 800, fontSize: 14 }}>S</div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#111827' }}>Rya HRMS</div>
        </div>
      </div>

      <div style={{ flex: 1, maxWidth: 620, display: 'flex', justifyContent: 'center' }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: 520 }}>
          <RiSearchLine size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            className="input"
            placeholder="Search clients, projects or team"
            style={{ paddingLeft: 40, paddingRight: 110, borderRadius: 999, border: '1px solid #e5e7eb', background: '#f8fafc', width: '100%', height: 42 }}
          />
          <div style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', display: 'inline-flex', alignItems: 'center', gap: 6, background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: 999, padding: '6px 10px', fontSize: 11, color: '#64748b', fontWeight: 700 }}>
            CTRL + /
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {[RiGridLine, RiSettings3Line, RiChat1Line, RiMailLine].map((Icon, index) => (
          <button key={index} style={{ width: 40, height: 40, borderRadius: 12, background: '#f8fafc', border: '1px solid #e5e7eb', display: 'grid', placeItems: 'center', color: '#475569', cursor: 'pointer' }}>
            <Icon size={18} />
          </button>
        ))}
        <button style={{ width: 40, height: 40, borderRadius: 12, background: '#ffffff', border: '1px solid #e5e7eb', position: 'relative', display: 'grid', placeItems: 'center', color: '#475569', cursor: 'pointer' }}>
          <RiBellLine size={18} />
          <span style={{ position: 'absolute', top: 8, right: 8, width: 8, height: 8, borderRadius: '50%', background: '#ef4444' }} />
        </button>
        <button onClick={() => router.push('/dashboard/profile')} style={{ width: 40, height: 40, borderRadius: '50%', background: '#f97316', border: 'none', color: '#ffffff', display: 'grid', placeItems: 'center', cursor: 'pointer' }}>
          {user?.name ? user.name.slice(0, 1) : 'A'}
        </button>
      </div>
    </header>
  );
}
