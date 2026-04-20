'use client';
import { useState, useEffect } from 'react';
import { PageSkeleton } from '@/components/ui/Skeleton';
import { RiFileLine, RiAddLine, RiDownload2Line, RiFolderLine, RiFileTextLine, RiFilePdfLine, RiFileExcelLine, RiSearchLine } from 'react-icons/ri';
import { formatDate } from '@/lib/utils';

const folders = [
  { name: 'HR Policies', files: 12, updated: '2024-01-10' },
  { name: 'Employee Contracts', files: 45, updated: '2024-01-14' },
  { name: 'Payroll Records', files: 24, updated: '2024-01-15' },
  { name: 'Compliance Docs', files: 8, updated: '2024-01-08' },
];

const files = [
  { name: 'Employee Handbook 2024.pdf', type: 'pdf', size: '2.4 MB', modified: '2024-01-15', sharedBy: 'Alex Morrison' },
  { name: 'Leave Policy.docx', type: 'doc', size: '380 KB', modified: '2024-01-12', sharedBy: 'Priya Sharma' },
  { name: 'Q1 Payroll Report.xlsx', type: 'excel', size: '1.1 MB', modified: '2024-01-15', sharedBy: 'Emma Thompson' },
  { name: 'NDA Template.pdf', type: 'pdf', size: '180 KB', modified: '2024-01-08', sharedBy: 'Amara Osei' },
  { name: 'Benefits Guide 2024.pdf', type: 'pdf', size: '3.2 MB', modified: '2024-01-10', sharedBy: 'Priya Sharma' },
  { name: 'Org Chart.pdf', type: 'pdf', size: '560 KB', modified: '2024-01-11', sharedBy: 'Alex Morrison' },
];

const fileIcon = (type: string) => {
  if (type === 'pdf') return <RiFilePdfLine size={18} color="#ef4444" />;
  if (type === 'excel') return <RiFileExcelLine size={18} color="#10b981" />;
  return <RiFileTextLine size={18} color="#3b82f6" />;
};

export default function DocumentsPage() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  useEffect(() => { setTimeout(() => setLoading(false), 600); }, []);
  if (loading) return <PageSkeleton />;

  const filteredFiles = files.filter(f => !search || f.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="fade-in-up">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 className="page-title">Documents</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 2 }}>File manager and document repository</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {['grid', 'list'].map(v => <button key={v} className={view === v ? 'btn-primary' : 'btn-secondary'} onClick={() => setView(v as any)} style={{ textTransform: 'capitalize' }}>{v}</button>)}
          <button className="btn-primary"><RiAddLine size={16} /> Upload</button>
        </div>
      </div>

      {/* Folders */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 14, marginBottom: 24 }}>
        {folders.map(f => (
          <div key={f.name} className="card" style={{ padding: 16, cursor: 'pointer', transition: 'all 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = '#3b82f6')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <RiFolderLine size={22} color="#f59e0b" />
              <span style={{ fontWeight: 700, fontSize: 13, color: 'var(--text-primary)' }}>{f.name}</span>
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{f.files} files</div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>Updated {formatDate(f.updated)}</div>
          </div>
        ))}
      </div>

      {/* Files */}
      <div className="card">
        <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <RiSearchLine size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input className="input" placeholder="Search files..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 30, fontSize: 12 }} />
          </div>
          <button className="btn-secondary" style={{ fontSize: 11 }}><RiDownload2Line size={13} /> Download All</button>
        </div>
        {view === 'grid' ? (
          <div style={{ padding: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
            {filteredFiles.map(f => (
              <div key={f.name} style={{ background: 'var(--bg-tertiary)', borderRadius: 10, padding: 16, cursor: 'pointer', border: '1px solid transparent', transition: 'all 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#3b82f6'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'transparent'; }}>
                <div style={{ marginBottom: 10 }}>{fileIcon(f.type)}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name}</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{f.size} · {formatDate(f.modified)}</div>
              </div>
            ))}
          </div>
        ) : (
          <table className="data-table">
            <thead><tr><th>Name</th><th>Size</th><th>Shared By</th><th>Modified</th><th>Actions</th></tr></thead>
            <tbody>
              {filteredFiles.map(f => (
                <tr key={f.name}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      {fileIcon(f.type)}
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{f.name}</span>
                    </div>
                  </td>
                  <td>{f.size}</td>
                  <td>{f.sharedBy}</td>
                  <td>{formatDate(f.modified)}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn-ghost" style={{ fontSize: 11 }}>View</button>
                      <button className="btn-ghost" style={{ fontSize: 11 }}><RiDownload2Line size={12} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
