'use client';
export function SkeletonLine({ width = '100%', height = 14 }: { width?: string | number; height?: number }) {
  return <div className="skeleton" style={{ width, height, borderRadius: 6 }} />;
}

export function SkeletonCard() {
  return (
    <div className="card" style={{ padding: 20 }}>
      <SkeletonLine width="40%" height={12} />
      <div style={{ height: 8 }} />
      <SkeletonLine width="60%" height={28} />
      <div style={{ height: 8 }} />
      <SkeletonLine width="50%" height={12} />
    </div>
  );
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="card">
      <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
        <SkeletonLine height={32} />
      </div>
      <table className="data-table">
        <thead>
          <tr>{[1,2,3,4,5].map(i => <th key={i}><SkeletonLine height={10} width="80%" /></th>)}</tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, r) => (
            <tr key={r}>{[1,2,3,4,5].map(i => <td key={i}><SkeletonLine height={12} width={i === 1 ? '70%' : '50%'} /></td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 16, justifyContent: 'space-between', alignItems: 'center' }}>
        <SkeletonLine width={180} height={24} />
        <SkeletonLine width={120} height={36} />
      </div>
      <div className="stats-grid">
        {[1,2,3,4].map(i => <SkeletonCard key={i} />)}
      </div>
      <SkeletonTable />
    </div>
  );
}
