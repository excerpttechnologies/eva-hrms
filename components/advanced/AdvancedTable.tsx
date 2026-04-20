'use client';
import { useState, useMemo } from 'react';
import { Pagination } from '@/components/ui/Pagination';
import { paginate } from '@/lib/utils';
import { RiSparklingLine, RiDownload2Line, RiPrinterLine, RiFilterLine, RiEyeLine, RiDeleteBinLine, RiCheckLine } from 'react-icons/ri';

export interface Column<T = any> {
  key: string;
  label: string;
  render?: (row: T) => React.ReactNode;
  sortable?: boolean;
  width?: number;
  visible?: boolean;
}

interface AdvancedTableProps<T = any> {
  data: T[];
  columns: Column<T>[];
  rowKey: string;
  title?: string;
  onAIInsight?: () => void;
  bulkActions?: { label: string; icon?: React.ReactNode; action: (rows: T[]) => void; danger?: boolean }[];
  perPage?: number;
}

export function AdvancedTable<T extends Record<string, any>>({ data, columns: initCols, rowKey, title, onAIInsight, bulkActions, perPage = 8 }: AdvancedTableProps<T>) {
  const [cols, setCols] = useState(initCols.map(c => ({ ...c, visible: c.visible !== false })));
  const [sortKey, setSortKey] = useState('');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<string[]>([]);
  const [showColToggle, setShowColToggle] = useState(false);
  const [search, setSearch] = useState('');

  const visibleCols = cols.filter(c => c.visible);

  const filtered = useMemo(() => {
    let d = [...data];
    if (search) {
      d = d.filter(row => Object.values(row).some(v => String(v).toLowerCase().includes(search.toLowerCase())));
    }
    if (sortKey) {
      d.sort((a, b) => {
        const av = a[sortKey], bv = b[sortKey];
        const cmp = av < bv ? -1 : av > bv ? 1 : 0;
        return sortDir === 'asc' ? cmp : -cmp;
      });
    }
    return d;
  }, [data, search, sortKey, sortDir]);

  const { data: pageData, total, pages } = paginate(filtered, page, perPage);

  const toggleSort = (key: string) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
    setPage(1);
  };

  const toggleRow = (id: string) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  const toggleAll = () => setSelected(s => s.length === pageData.length ? [] : pageData.map(r => r[rowKey]));

  const selectedRows = data.filter(r => selected.includes(r[rowKey]));

  return (
    <div className="card">
      {/* Toolbar */}
      <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)', display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
        {title && <span style={{ fontWeight: 700, fontSize: 14, fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>{title}</span>}
        <input
          className="input"
          placeholder="Search..."
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
          style={{ flex: 1, minWidth: 140, fontSize: 12, padding: '7px 12px' }}
        />
        {selected.length > 0 && (
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', padding: '4px 10px', background: 'rgba(59,130,246,0.1)', borderRadius: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#3b82f6' }}>{selected.length} selected</span>
            {bulkActions?.map((a, i) => (
              <button key={i} onClick={() => a.action(selectedRows)} className={a.danger ? 'btn-danger' : 'btn-primary'} style={{ fontSize: 11, padding: '4px 10px' }}>
                {a.icon} {a.label}
              </button>
            ))}
          </div>
        )}
        <div style={{ display: 'flex', gap: 6, marginLeft: 'auto' }}>
          {onAIInsight && (
            <button onClick={onAIInsight} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 12px', background: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.15))', border: '1px solid rgba(139,92,246,0.3)', borderRadius: 8, color: '#8b5cf6', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>
              <RiSparklingLine size={12} /> AI Insights
            </button>
          )}
          <button className="btn-secondary" style={{ fontSize: 11, padding: '6px 10px' }} onClick={() => alert('Export PDF')}><RiDownload2Line size={12} /> PDF</button>
          <button className="btn-secondary" style={{ fontSize: 11, padding: '6px 10px' }} onClick={() => alert('Export Excel')}><RiDownload2Line size={12} /> Excel</button>
          <button className="btn-secondary" style={{ fontSize: 11, padding: '6px 10px' }} onClick={() => window.print()}><RiPrinterLine size={12} /></button>
          <div style={{ position: 'relative' }}>
            <button className="btn-secondary" style={{ fontSize: 11, padding: '6px 10px' }} onClick={() => setShowColToggle(!showColToggle)}>
              <RiEyeLine size={12} /> Columns
            </button>
            {showColToggle && (
              <div className="card" style={{ position: 'absolute', right: 0, top: '110%', zIndex: 50, padding: 10, minWidth: 160 }}>
                {cols.map((c, i) => (
                  <label key={c.key} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 4px', cursor: 'pointer', fontSize: 12 }}>
                    <input type="checkbox" checked={c.visible} onChange={() => setCols(prev => prev.map((col, j) => j === i ? { ...col, visible: !col.visible } : col))} />
                    {c.label}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: 40 }}>
                <input type="checkbox" checked={selected.length === pageData.length && pageData.length > 0} onChange={toggleAll} />
              </th>
              {visibleCols.map(c => (
                <th key={c.key} onClick={() => c.sortable !== false && toggleSort(c.key)} style={{ cursor: c.sortable !== false ? 'pointer' : 'default', userSelect: 'none', width: c.width }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    {c.label}
                    {sortKey === c.key && <span style={{ fontSize: 10 }}>{sortDir === 'asc' ? '↑' : '↓'}</span>}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageData.map(row => (
              <tr key={row[rowKey]} style={{ background: selected.includes(row[rowKey]) ? 'rgba(59,130,246,0.04)' : undefined }}>
                <td>
                  <input type="checkbox" checked={selected.includes(row[rowKey])} onChange={() => toggleRow(row[rowKey])} />
                </td>
                {visibleCols.map(c => (
                  <td key={c.key}>{c.render ? c.render(row) : row[c.key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {pageData.length === 0 && (
        <div style={{ padding: '48px 0', textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>No results found</div>
      )}
      <Pagination page={page} pages={pages} total={total} perPage={perPage} onChange={setPage} />
    </div>
  );
}
