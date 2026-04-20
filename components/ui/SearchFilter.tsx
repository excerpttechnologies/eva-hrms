'use client';
import { RiSearchLine, RiFilterLine, RiDownload2Line, RiPrinterLine } from 'react-icons/ri';

interface SearchFilterProps {
  search: string;
  onSearch: (v: string) => void;
  filters?: { label: string; value: string; options: { label: string; value: string }[] }[];
  filterValues?: Record<string, string>;
  onFilter?: (key: string, value: string) => void;
  onExport?: (type: 'pdf' | 'excel' | 'print') => void;
  placeholder?: string;
  extraActions?: React.ReactNode;
}

export function SearchFilter({ search, onSearch, filters, filterValues, onFilter, onExport, placeholder = 'Search...', extraActions }: SearchFilterProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
      <div style={{ position: 'relative', flex: '1 1 200px', minWidth: 160 }}>
        <RiSearchLine size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        <input
          className="input"
          value={search}
          onChange={e => onSearch(e.target.value)}
          placeholder={placeholder}
          style={{ paddingLeft: 32, fontSize: 12 }}
        />
      </div>
      {filters?.map(f => (
        <select
          key={f.value}
          className="input"
          style={{ width: 'auto', fontSize: 12, paddingRight: 28 }}
          value={filterValues?.[f.value] || ''}
          onChange={e => onFilter?.(f.value, e.target.value)}
        >
          <option value="">{f.label}: All</option>
          {f.options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      ))}
      {extraActions}
      {onExport && (
        <div style={{ display: 'flex', gap: 6, marginLeft: 'auto' }}>
          <button className="btn-secondary" style={{ fontSize: 11, padding: '6px 10px' }} onClick={() => onExport('pdf')}>
            <RiDownload2Line size={13} /> PDF
          </button>
          <button className="btn-secondary" style={{ fontSize: 11, padding: '6px 10px' }} onClick={() => onExport('excel')}>
            <RiDownload2Line size={13} /> Excel
          </button>
          <button className="btn-secondary" style={{ fontSize: 11, padding: '6px 10px' }} onClick={() => onExport('print')}>
            <RiPrinterLine size={13} /> Print
          </button>
        </div>
      )}
    </div>
  );
}
