'use client';
import { useState, useEffect } from 'react';
import { employees, departments } from '@/lib/mock-data';
import { StatCard } from '@/components/ui/StatCard';
import { SearchFilter } from '@/components/ui/SearchFilter';
import { Pagination } from '@/components/ui/Pagination';
import { Modal } from '@/components/ui/Modal';
import { PageSkeleton } from '@/components/ui/Skeleton';
import { paginate, formatCurrency, formatDate, getInitials } from '@/lib/utils';
import { RiTeamLine, RiCheckboxCircleLine, RiUserLine, RiAddLine, RiEyeLine, RiEditLine, RiDeleteBinLine, RiMailLine, RiPhoneLine } from 'react-icons/ri';

export default function EmployeesPage() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [page, setPage] = useState(1);
  const [showAdd, setShowAdd] = useState(false);
  const [viewEmp, setViewEmp] = useState<any>(null);
  const [form, setForm] = useState({ name: '', email: '', department: '', position: '', phone: '', salary: '' });
  const PER_PAGE = 8;

  useEffect(() => { setTimeout(() => setLoading(false), 700); }, []);

  const filtered = employees.filter(e => {
    const q = search.toLowerCase();
    const matchSearch = !q || e.name.toLowerCase().includes(q) || e.email.toLowerCase().includes(q) || e.department.toLowerCase().includes(q);
    const matchDept = !filters.department || e.department === filters.department;
    const matchStatus = !filters.status || e.status === filters.status;
    return matchSearch && matchDept && matchStatus;
  });

  const { data, total, pages } = paginate(filtered, page, PER_PAGE);

  const statusBadge = (s: string) => {
    const map: Record<string, string> = { active: 'badge-success', inactive: 'badge-danger', 'on-leave': 'badge-warning' };
    return <span className={`badge ${map[s] || 'badge-default'}`}>{s.replace('-', ' ')}</span>;
  };

  const handleExport = (type: string) => alert(`Exporting as ${type.toUpperCase()} — feature ready for backend integration`);

  if (loading) return <PageSkeleton />;

  return (
    <div className="fade-in-up">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 className="page-title">Employees</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 2 }}>Manage your workforce</p>
        </div>
        <button className="btn-primary" onClick={() => setShowAdd(true)}>
          <RiAddLine size={16} /> Add Employee
        </button>
      </div>

      <div className="stats-grid">
        <StatCard title="Total Employees" value={employees.length} icon={<RiTeamLine size={18} />} color="#3b82f6" change="+3 this month" changeType="up" />
        <StatCard title="Active" value={employees.filter(e => e.status === 'active').length} icon={<RiCheckboxCircleLine size={18} />} color="#10b981" />
        <StatCard title="On Leave" value={employees.filter(e => e.status === 'on-leave').length} icon={<RiUserLine size={18} />} color="#f59e0b" />
        <StatCard title="Departments" value={departments.length} icon={<RiTeamLine size={18} />} color="#8b5cf6" subtitle="Active departments" />
      </div>

      <div className="card">
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
          <SearchFilter
            search={search}
            onSearch={v => { setSearch(v); setPage(1); }}
            filters={[
              { label: 'Department', value: 'department', options: departments.map(d => ({ label: d, value: d })) },
              { label: 'Status', value: 'status', options: [{ label: 'Active', value: 'active' }, { label: 'Inactive', value: 'inactive' }, { label: 'On Leave', value: 'on-leave' }] },
            ]}
            filterValues={filters}
            onFilter={(k, v) => { setFilters(f => ({ ...f, [k]: v })); setPage(1); }}
            onExport={handleExport}
            placeholder="Search employees..."
          />
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>Position</th>
                <th>Status</th>
                <th>Join Date</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map(emp => (
                <tr key={emp.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: 'white', flexShrink: 0 }}>
                        {getInitials(emp.name)}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: 13 }}>{emp.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{emp.id} · {emp.email}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className="badge badge-blue">{emp.department}</span></td>
                  <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{emp.position}</td>
                  <td>{statusBadge(emp.status)}</td>
                  <td>{formatDate(emp.joinDate)}</td>
                  <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{formatCurrency(emp.salary)}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 4 }}>
                      <button className="btn-ghost" style={{ padding: '5px 8px' }} onClick={() => setViewEmp(emp)} title="View"><RiEyeLine size={14} /></button>
                      <button className="btn-ghost" style={{ padding: '5px 8px' }} title="Edit"><RiEditLine size={14} /></button>
                      <button className="btn-ghost" style={{ padding: '5px 8px', color: '#ef4444' }} title="Delete"><RiDeleteBinLine size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {data.length === 0 && (
          <div style={{ padding: 60, textAlign: 'center', color: 'var(--text-muted)' }}>
            <RiUserLine size={40} style={{ margin: '0 auto 12px', opacity: 0.3 }} />
            <div style={{ fontWeight: 600, marginBottom: 4 }}>No employees found</div>
            <div style={{ fontSize: 13 }}>Try adjusting your search or filters</div>
          </div>
        )}
        <Pagination page={page} pages={pages} total={total} perPage={PER_PAGE} onChange={setPage} />
      </div>

      {/* Add Employee Modal */}
      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="Add New Employee" size="lg"
        footer={<><button className="btn-secondary" onClick={() => setShowAdd(false)}>Cancel</button><button className="btn-primary" onClick={() => { alert('Employee added! (mock)'); setShowAdd(false); }}>Save Employee</button></>}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {[['Full Name', 'name', 'text'], ['Email', 'email', 'email'], ['Phone', 'phone', 'tel'], ['Position', 'position', 'text'], ['Salary', 'salary', 'number']].map(([label, key, type]) => (
            <div key={key}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>{label}</label>
              <input className="input" type={type} value={(form as any)[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} placeholder={label} />
            </div>
          ))}
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>Department</label>
            <select className="input" value={form.department} onChange={e => setForm(f => ({ ...f, department: e.target.value }))}>
              <option value="">Select department</option>
              {departments.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </div>
      </Modal>

      {/* View Employee Modal */}
      {viewEmp && (
        <Modal open={!!viewEmp} onClose={() => setViewEmp(null)} title="Employee Profile" size="md"
          footer={<><button className="btn-secondary" onClick={() => setViewEmp(null)}>Close</button><button className="btn-primary" onClick={() => setViewEmp(null)}>Edit Profile</button></>}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 700, color: 'white' }}>
                {getInitials(viewEmp.name)}
              </div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>{viewEmp.name}</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>{viewEmp.position} · {viewEmp.department}</div>
                <div style={{ marginTop: 6 }}>{statusBadge(viewEmp.status)}</div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[['Employee ID', viewEmp.id], ['Join Date', formatDate(viewEmp.joinDate)], ['Salary', formatCurrency(viewEmp.salary)], ['Location', viewEmp.location], ['Manager', viewEmp.manager]].map(([k, v]) => (
                <div key={k} style={{ background: 'var(--bg-tertiary)', borderRadius: 8, padding: '10px 14px' }}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>{k}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-secondary)' }}>
                <RiMailLine size={14} /> {viewEmp.email}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-secondary)' }}>
                <RiPhoneLine size={14} /> {viewEmp.phone}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
