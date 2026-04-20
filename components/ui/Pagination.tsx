'use client';

interface PaginationProps {
  page: number;
  pages: number;
  total: number;
  perPage: number;
  onChange: (page: number) => void;
}

export function Pagination({ page, pages, total, perPage, onChange }: PaginationProps) {
  const start = (page - 1) * perPage + 1;
  const end = Math.min(page * perPage, total);

  const getPages = () => {
    const p = [];
    const delta = 2;
    for (let i = Math.max(1, page - delta); i <= Math.min(pages, page + delta); i++) p.push(i);
    return p;
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderTop: '1px solid var(--border)' }}>
      <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Showing {start}–{end} of {total} results</span>
      <div style={{ display: 'flex', gap: 4 }}>
        <button
          className="btn-ghost"
          style={{ padding: '4px 10px', fontSize: 12 }}
          disabled={page === 1}
          onClick={() => onChange(page - 1)}
        >← Prev</button>
        {page > 3 && <button className="btn-ghost" style={{ padding: '4px 8px', fontSize: 12 }} onClick={() => onChange(1)}>1</button>}
        {page > 4 && <span style={{ padding: '4px 4px', fontSize: 12, color: 'var(--text-muted)' }}>...</span>}
        {getPages().map(p => (
          <button
            key={p}
            className={p === page ? 'btn-primary' : 'btn-ghost'}
            style={{ padding: '4px 10px', fontSize: 12 }}
            onClick={() => onChange(p)}
          >{p}</button>
        ))}
        {page < pages - 3 && <span style={{ padding: '4px 4px', fontSize: 12, color: 'var(--text-muted)' }}>...</span>}
        {page < pages - 2 && <button className="btn-ghost" style={{ padding: '4px 8px', fontSize: 12 }} onClick={() => onChange(pages)}>{pages}</button>}
        <button
          className="btn-ghost"
          style={{ padding: '4px 10px', fontSize: 12 }}
          disabled={page === pages}
          onClick={() => onChange(page + 1)}
        >Next →</button>
      </div>
    </div>
  );
}
