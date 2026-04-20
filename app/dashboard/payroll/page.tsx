'use client';
import { useState, useEffect } from 'react';
import { payrollData } from '@/lib/mock-data';
import { StatCard } from '@/components/ui/StatCard';
import { SearchFilter } from '@/components/ui/SearchFilter';
import { Pagination } from '@/components/ui/Pagination';
import { Modal } from '@/components/ui/Modal';
import { PageSkeleton } from '@/components/ui/Skeleton';
import { paginate, formatCurrency } from '@/lib/utils';
import { RiMoneyDollarCircleLine, RiFileTextLine, RiDownload2Line } from 'react-icons/ri';

const statusBadge = (s: string) => {
  const map: Record<string, string> = { paid: 'badge-success', processing: 'badge-info', pending: 'badge-warning' };
  return <span className={`badge ${map[s] || 'badge-default'}`}>{s}</span>;
};

export default function PayrollPage() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [showPayslip, setShowPayslip] = useState<any>(null);
  useEffect(() => { setTimeout(() => setLoading(false), 600); }, []);
  if (loading) return <PageSkeleton />;

  const filtered = payrollData.filter(p => !search || p.employee.toLowerCase().includes(search.toLowerCase()) || p.department.toLowerCase().includes(search.toLowerCase()));
  const { data, total, pages } = paginate(filtered, page, 6);
  const totalPayroll = payrollData.reduce((s, p) => s + p.net, 0);

  return (
    <div className="fade-in-up">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 className="page-title">Payroll</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 2 }}>Manage salaries and payslips</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn-secondary">Run Payroll</button>
          <button className="btn-primary"><RiDownload2Line size={15} /> Export</button>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard title="Total Payroll" value={formatCurrency(totalPayroll)} icon={<RiMoneyDollarCircleLine size={18} />} color="#3b82f6" change="+3.2%" changeType="up" subtitle="January 2024" />
        <StatCard title="Paid" value={payrollData.filter(p => p.status === 'paid').length} icon={<RiMoneyDollarCircleLine size={18} />} color="#10b981" subtitle="Employees paid" />
        <StatCard title="Processing" value={payrollData.filter(p => p.status === 'processing').length} icon={<RiMoneyDollarCircleLine size={18} />} color="#06b6d4" />
        <StatCard title="Pending" value={payrollData.filter(p => p.status === 'pending').length} icon={<RiMoneyDollarCircleLine size={18} />} color="#f59e0b" />
      </div>

      <div className="card">
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
          <SearchFilter search={search} onSearch={v => { setSearch(v); setPage(1); }} onExport={t => alert(`Export ${t}`)} placeholder="Search employee or department..." />
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr><th>Employee</th><th>Department</th><th>Basic</th><th>HRA</th><th>Allowances</th><th>Deductions</th><th>Net Pay</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {data.map(p => (
                <tr key={p.id}>
                  <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{p.employee}</td>
                  <td><span className="badge badge-blue">{p.department}</span></td>
                  <td>{formatCurrency(p.basic)}</td>
                  <td>{formatCurrency(p.hra)}</td>
                  <td>{formatCurrency(p.allowances)}</td>
                  <td style={{ color: '#ef4444' }}>-{formatCurrency(p.deductions)}</td>
                  <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{formatCurrency(p.net)}</td>
                  <td>{statusBadge(p.status)}</td>
                  <td>
                    <button className="btn-ghost" style={{ fontSize: 11, padding: '4px 8px' }} onClick={() => setShowPayslip(p)}>
                      <RiFileTextLine size={13} /> Payslip
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination page={page} pages={pages} total={total} perPage={6} onChange={setPage} />
      </div>

      {/* Payslip Modal */}
      {showPayslip && (
        <Modal open={!!showPayslip} onClose={() => setShowPayslip(null)} title="Payslip Preview" size="md"
          footer={<><button className="btn-secondary" onClick={() => setShowPayslip(null)}>Close</button><button className="btn-primary" onClick={() => alert('Downloading payslip...')}><RiDownload2Line size={14} /> Download PDF</button></>}>
          <div style={{ fontFamily: 'var(--font-body)' }}>
            <div style={{ textAlign: 'center', marginBottom: 24, paddingBottom: 16, borderBottom: '2px solid var(--border)' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20, color: 'var(--text-primary)' }}>NexusHR</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>Payslip for {showPayslip.month}</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
              <div><div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Employee</div><div style={{ fontWeight: 700 }}>{showPayslip.employee}</div></div>
              <div><div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Department</div><div style={{ fontWeight: 700 }}>{showPayslip.department}</div></div>
            </div>
            <div style={{ background: 'var(--bg-tertiary)', borderRadius: 10, padding: 16, marginBottom: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 12, color: 'var(--text-primary)' }}>Earnings</div>
              {[['Basic Salary', showPayslip.basic], ['HRA', showPayslip.hra], ['Allowances', showPayslip.allowances]].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 8, color: 'var(--text-secondary)' }}>
                  <span>{k}</span><span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{formatCurrency(v as number)}</span>
                </div>
              ))}
            </div>
            <div style={{ background: '#fee2e210', borderRadius: 10, padding: 16, marginBottom: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 12, color: '#ef4444' }}>Deductions</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--text-secondary)' }}>
                <span>Total Deductions</span><span style={{ fontWeight: 600, color: '#ef4444' }}>-{formatCurrency(showPayslip.deductions)}</span>
              </div>
            </div>
            <div style={{ background: '#d1fae5', borderRadius: 10, padding: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, fontWeight: 800, color: '#065f46', fontFamily: 'var(--font-display)' }}>
                <span>Net Pay</span><span>{formatCurrency(showPayslip.net)}</span>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
