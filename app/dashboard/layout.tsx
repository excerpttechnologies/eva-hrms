'use client';
import { Sidebar } from '@/components/layout/Sidebar';
import { Topbar } from '@/components/layout/Topbar';
import { AIAssistant } from '@/components/ai/AIAssistant';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: 'var(--bg-secondary)' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Topbar />
        <main style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
          {children}
        </main>
      </div>
      <AIAssistant />
    </div>
  );
}
