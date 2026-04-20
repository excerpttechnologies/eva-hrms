'use client';
import { useState, useEffect } from 'react';
import { employees } from '@/lib/mock-data';
import { StatCard } from '@/components/ui/StatCard';
import { SearchFilter } from '@/components/ui/SearchFilter';
import { Pagination } from '@/components/ui/Pagination';
import { Modal } from '@/components/ui/Modal';
import { PageSkeleton } from '@/components/ui/Skeleton';
import { paginate, getInitials } from '@/lib/utils';
import { RiShieldUserLine, RiAddLine, RiEditLine } from 'react-icons/ri';

const roles = ['super_admin', 'admin', 'employee', 'hr_manager', 'finance_manager'];
const permissions = [
  { module: 'Employees', actions: ['view', 'create', 'edit', 'delete'] },
  { module: 'Payroll', actions: ['view', 'process', 'export'] },
  { module: 'Leave', actions: ['view', 'approve', 'reject'] },
  { module: 'Reports', actions: ['view', 'export'] },
  { module: 'Settings', actions: ['view', 'edit'] },
];

const mockUsers = employees.slice(0, 8).map((e, i) => ({
  ...e,
  role: i === 0 ? 'admin' : i < 3 ? 'hr_manager' : 'employee',
  lastLogin: i === 0 ? '2 min ago' : i < 4 ? '1 hr ago' : '1 day ago',
}));

export default function UsersPage() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [showRoles, setShowRoles] = useState(false);
  const [selectedRole, setSelectedRole] = useState('employee');
  const [selectedPerms, setSelectedPerms] = useState<Record<string, string[]>>({});
  useEffect(() => { setTimeout(() => setLoading(false), 600); }, []);
  if (loading) return <PageSkeleton />;

  const filtered = mockUsers.filter(u => !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));
  const { data, total, pages } = paginate(filtered, page, 6);

  const roleBadge = (r: string) => {
    const map: Record<string, string> = { super_admin: 'badge-danger', admin: 'badge-purple', hr_manager: 'badge-blue', finance_manager: 'badge-info', employee: 'badge-default' };
    return <span className={`badge ${map[r] || 'badge-default'}`}>{r.replace('_', ' ')}</span>;
  };

  const togglePerm = (module: string, action: string) => {
    setSelectedPerms(prev => {
      const curr = prev[module] || [];
      return { ...prev, [module]: curr.includes(action) ? curr.filter(a => a !== action) : [...curr, action] };
    });
  };

  return (
    <div className="fade-in-up">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 className="page-title">Users & Roles</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 2 }}>Manage access control and permissions</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn-secondary" onClick={() => setShowRoles(true)}>Manage Roles</button>
          <button className="btn-primary"><RiAddLine size={16} /> Invite User</button>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard title="Total Users" value={employees.length} icon={<RiShieldUserLine size={18} />} color="#3b82f6" />
        <StatCard title="Admins" value={3} icon={<RiShieldUserLine size={18} />} color="#8b5cf6" />
        <StatCard title="Active Sessions" value={8} icon={<RiShieldUserLine size={18} />} color="#10b981" />
        <StatCard title="Pending Invites" value={2} icon={<RiShieldUserLine size={18} />} color="#f59e0b" />
      </div>

      <div className="card">
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
          <SearchFilter search={search} onSearch={v => { setSearch(v); setPage(1); }} onExport={t => alert(`Export ${t}`)} placeholder="Search users..." />
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead><tr><th>User</th><th>Role</th><th>Department</th><th>Status</th><th>Last Login</th><th>Actions</th></tr></thead>
            <tbody>
              {data.map(u => (
                <tr key={u.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: 'white', flexShrink: 0 }}>{getInitials(u.name)}</div>
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: 13 }}>{u.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{roleBadge(u.role)}</td>
                  <td><span className="badge badge-blue">{u.department}</span></td>
                  <td><span className={`badge ${u.status === 'active' ? 'badge-success' : 'badge-danger'}`}>{u.status}</span></td>
                  <td style={{ fontSize: 12 }}>{u.lastLogin}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn-ghost" style={{ fontSize: 12 }}><RiEditLine size={12} /> Edit Role</button>
                      <button className="btn-ghost" style={{ fontSize: 12, color: '#ef4444' }}>Revoke</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination page={page} pages={pages} total={total} perPage={6} onChange={setPage} />
      </div>

      {/* Roles & Permissions Modal */}
      <Modal open={showRoles} onClose={() => setShowRoles(false)} title="Manage Roles & Permissions" size="lg"
        footer={<><button className="btn-secondary" onClick={() => setShowRoles(false)}>Cancel</button><button className="btn-primary" onClick={() => { alert('Permissions saved!'); setShowRoles(false); }}>Save Permissions</button></>}>
        <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 20 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Roles</div>
            {roles.map(r => (
              <button key={r} onClick={() => setSelectedRole(r)} style={{ width: '100%', textAlign: 'left', padding: '8px 12px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600, marginBottom: 4, background: selectedRole === r ? 'rgba(59,130,246,0.12)' : 'transparent', color: selectedRole === r ? '#3b82f6' : 'var(--text-secondary)', textTransform: 'capitalize' }}>
                {r.replace('_', ' ')}
              </button>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Permissions for: <span style={{ color: '#3b82f6', textTransform: 'capitalize' }}>{selectedRole.replace('_', ' ')}</span></div>
            {permissions.map(p => (
              <div key={p.module} style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>{p.module}</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {p.actions.map(action => {
                    const active = (selectedPerms[p.module] || []).includes(action);
                    return (
                      <button key={action} onClick={() => togglePerm(p.module, action)} style={{ padding: '4px 12px', borderRadius: 20, border: `1px solid ${active ? '#3b82f6' : 'var(--border)'}`, background: active ? 'rgba(59,130,246,0.12)' : 'transparent', color: active ? '#3b82f6' : 'var(--text-muted)', fontSize: 11, fontWeight: 600, cursor: 'pointer', textTransform: 'capitalize' }}>
                        {action}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}
