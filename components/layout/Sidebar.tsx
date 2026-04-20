'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useStore } from '@/lib/store/useStore';
import {
  RiDashboardLine, RiTeamLine, RiCalendarCheckLine, RiTimeLine,
  RiMoneyDollarCircleLine, RiUserSearchLine, RiBarChartLine,
  RiKanbanView, RiBriefcaseLine, RiCoinLine, RiTicketLine,
  RiComputerLine, RiFileLine, RiSettings3Line, RiShieldUserLine,
  RiArrowLeftLine, RiArrowRightLine, RiPieChartLine,
  RiRobot2Line, RiBrainLine, RiHeartPulseLine,
  RiRadioButtonLine, RiFlowChart, RiCalendar2Line, RiShieldCheckLine,
  RiVipCrown2Line, RiGlobalLine,
} from 'react-icons/ri';

type NavItem = {
  label: string;
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  path: string;
  ai?: boolean;
};

type NavGroup = {
  label: string;
  items: NavItem[];
};

const navGroups: NavGroup[] = [
  {
    label: 'Overview',
    items: [
      { label: 'Dashboard', icon: RiDashboardLine, path: '/dashboard/dashboard' },
      { label: 'Executive View', icon: RiVipCrown2Line, path: '/dashboard/executive' },
    ],
  },
  {
    label: '🤖 AI Intelligence',
    items: [
      { label: 'NexusAI Center', icon: RiRobot2Line, path: '/dashboard/ai-assistant', ai: true },
      { label: 'Workforce Intel', icon: RiBrainLine, path: '/dashboard/workforce', ai: true },
      { label: 'Org Health', icon: RiHeartPulseLine, path: '/dashboard/org-health', ai: true },
      { label: 'Activity Monitor', icon: RiRadioButtonLine, path: '/dashboard/activity-monitor' },
    ],
  },
  {
    label: 'People',
    items: [
      { label: 'Employees', icon: RiTeamLine, path: '/dashboard/employees' },
      { label: 'Attendance', icon: RiCalendarCheckLine, path: '/dashboard/attendance' },
      { label: 'Leave', icon: RiTimeLine, path: '/dashboard/leave' },
      { label: 'Payroll', icon: RiMoneyDollarCircleLine, path: '/dashboard/payroll' },
      { label: 'Recruitment', icon: RiUserSearchLine, path: '/dashboard/recruitment' },
      { label: 'Performance', icon: RiBarChartLine, path: '/dashboard/performance' },
    ],
  },
  {
    label: 'Work',
    items: [
      { label: 'Projects', icon: RiKanbanView, path: '/dashboard/projects' },
      { label: 'CRM', icon: RiBriefcaseLine, path: '/dashboard/crm' },
      { label: 'Finance', icon: RiCoinLine, path: '/dashboard/finance' },
      { label: 'Calendar', icon: RiCalendar2Line, path: '/dashboard/calendar' },
    ],
  },
  {
    label: 'Support',
    items: [
      { label: 'Helpdesk', icon: RiTicketLine, path: '/dashboard/helpdesk' },
      { label: 'Assets', icon: RiComputerLine, path: '/dashboard/assets' },
      { label: 'Documents', icon: RiFileLine, path: '/dashboard/documents' },
    ],
  },
  {
    label: 'Admin',
    items: [
      { label: 'Reports', icon: RiPieChartLine, path: '/dashboard/reports' },
      { label: 'Workflows', icon: RiFlowChart, path: '/dashboard/workflow' },
      { label: 'Compliance', icon: RiShieldCheckLine, path: '/dashboard/compliance' },
      { label: 'Multi-Company', icon: RiGlobalLine, path: '/dashboard/multi-company' },
      { label: 'Users & Roles', icon: RiShieldUserLine, path: '/dashboard/users' },
      { label: 'Settings', icon: RiSettings3Line, path: '/dashboard/settings' },
    ],
  },
];

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = useStore();
  const pathname = usePathname();
  const router = useRouter();
  const collapsed = sidebarCollapsed;

  return (
    <aside style={{
      width: collapsed ? 68 : 220,
      background: '#ffffff',
      borderRight: '1px solid #e5e7eb',
      transition: 'width 0.25s ease',
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      position: 'sticky',
      top: 0,
      overflow: 'hidden',
    }}>
      {/* Logo */}
      <div style={{ padding: '18px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, minHeight: 72, borderBottom: '1px solid #f3f4f6' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#ea580c', display: 'grid', placeItems: 'center', color: '#ffffff', fontWeight: 800, fontSize: 14 }}>S</div>
          {!collapsed && (
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#111827' }}>Rya HRMS</div>
              <div style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 700 }}>Admin Panel</div>
            </div>
          )}
        </div>
        <button onClick={toggleSidebar} style={{ width: 30, height: 30, borderRadius: 10, background: '#f8fafc', border: '1px solid #e5e7eb', display: 'grid', placeItems: 'center', color: '#475569', cursor: 'pointer' }}>
          {collapsed ? <RiArrowRightLine size={14} /> : <RiArrowLeftLine size={14} />}
        </button>
      </div>

      <nav style={{ flex: 1, overflowY: 'auto', padding: '16px 8px' }}>
        {navGroups.map((group) => (
          <div key={group.label} style={{ marginBottom: collapsed ? 6 : 14 }}>
            {!collapsed && (
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#94a3b8', padding: '0 16px', marginBottom: 8 }}>
                {group.label}
              </div>
            )}
            {group.items.map((item) => {
              const active = pathname === item.path || pathname.startsWith(item.path + '/');
              const isAI = item.ai;
              return (
                <div
                  key={item.path}
                  onClick={() => router.push(item.path)}
                  title={collapsed ? item.label : undefined}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '10px 14px',
                    borderRadius: 999,
                    cursor: 'pointer',
                    color: active ? '#ea580c' : '#475569',
                    background: active ? '#fff7ed' : 'transparent',
                    borderLeft: active ? '4px solid #ea580c' : '4px solid transparent',
                    marginBottom: 6,
                    transition: 'background 0.2s ease',
                  }}
                >
                  <item.icon size={16} style={{ flexShrink: 0, color: active ? '#ea580c' : '#94a3b8' }} />
                  {!collapsed && <span style={{ fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.label}</span>}
                  {!collapsed && isAI && !active && (
                    <span style={{ marginLeft: 'auto', fontSize: 9, fontWeight: 700, background: '#fee2e2', color: '#b91c1c', padding: '2px 6px', borderRadius: 999 }}>AI</span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </nav>

      {!collapsed && (
        <div style={{ padding: '16px', borderTop: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#fde68a', display: 'grid', placeItems: 'center', color: '#b45309', fontWeight: 700 }}>AM</div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#111827' }}>Alex Morrison</div>
            <div style={{ fontSize: 11, color: '#6b7280' }}>HR Manager · Admin</div>
          </div>
          <button onClick={() => router.push('/dashboard/profile')} style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', padding: 4 }}>
            <RiSettings3Line size={16} />
          </button>
        </div>
      )}
    </aside>
  );
}
