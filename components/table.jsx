// Kev-UI Table — data table with sort, selection, zebra, density

const tblCSS = `
.kui-table-wrap {
  border: 1px solid var(--kui-border); border-radius: 9px;
  background: var(--kui-surface-1); overflow: hidden;
  font-family: var(--kui-font-sans);
}
.kui-table-toolbar {
  display: flex; align-items: center; gap: 8px; padding: 10px 12px;
  border-bottom: 1px solid var(--kui-divider);
}
.kui-table-toolbar__title { font-size: 13px; font-weight: 600; color: var(--kui-fg); }
.kui-table-toolbar__count { font-size: 11px; color: var(--kui-fg-subtle); font-family: var(--kui-font-mono); }
.kui-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.kui-table th {
  text-align: left; font-size: 11px; font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.8px;
  color: var(--kui-fg-subtle); padding: 9px 12px;
  border-bottom: 1px solid var(--kui-divider);
  background: var(--kui-surface-1);
  position: sticky; top: 0;
  font-family: var(--kui-font-mono);
  white-space: nowrap; user-select: none; cursor: pointer;
}
.kui-table th:hover { color: var(--kui-fg); }
.kui-table th[data-sort] { position: relative; padding-right: 22px; }
.kui-table th[data-sort]::after {
  content: ''; position: absolute; right: 8px; top: 50%;
  width: 0; height: 0; border-left: 3px solid transparent; border-right: 3px solid transparent;
  border-top: 4px solid currentColor; transform: translateY(-2px); opacity: 0.4;
}
.kui-table th[data-sort="asc"]::after { transform: translateY(-2px) rotate(180deg); opacity: 1; color: var(--kui-accent); }
.kui-table th[data-sort="desc"]::after { opacity: 1; color: var(--kui-accent); }
.kui-table td {
  padding: 10px 12px; color: var(--kui-fg);
  border-bottom: 1px solid var(--kui-divider);
  font-variant-numeric: tabular-nums;
}
.kui-table tr:last-child td { border-bottom: none; }
.kui-table tbody tr:hover { background: var(--kui-surface-hover); }
.kui-table tbody tr[data-selected="true"] { background: var(--kui-accent-soft); }
.kui-table--zebra tbody tr:nth-child(even):not([data-selected="true"]) { background: var(--kui-surface-1); }
.kui-table--zebra tbody tr:nth-child(odd):not([data-selected="true"]) { background: var(--kui-bg); }
.kui-table--compact td { padding: 6px 12px; font-size: 12px; }
.kui-table__check { width: 30px; }
.kui-table__mono { font-family: var(--kui-font-mono); color: var(--kui-fg-muted); font-size: 12px; }

.kui-check {
  width: 14px; height: 14px; border: 1px solid var(--kui-border-strong);
  border-radius: 3.5px; background: var(--kui-surface-1);
  display: inline-grid; place-items: center; cursor: pointer;
}
.kui-check[data-checked="true"] { background: var(--kui-accent); border-color: var(--kui-accent); }
.kui-check[data-checked="true"] svg { stroke: #fff; }
.kui-check svg { width: 10px; height: 10px; opacity: 0; stroke: transparent; stroke-width: 2.4; fill: none; stroke-linecap: round; stroke-linejoin: round; }
.kui-check[data-checked="true"] svg { opacity: 1; }
`;
if (!document.getElementById('kui-tbl-styles')) {
  const s = document.createElement('style'); s.id = 'kui-tbl-styles'; s.textContent = tblCSS;
  document.head.appendChild(s);
}

function KuiCheck({ checked, onChange }) {
  return (
    <span className="kui-check" data-checked={!!checked} onClick={() => onChange && onChange(!checked)}>
      <svg viewBox="0 0 16 16"><path d="M3 8.5l3 3 7-7"/></svg>
    </span>
  );
}

function KuiTable({ columns = [], rows = [], density, zebra, selectable, title }) {
  const [sort, setSort] = React.useState({ key: null, dir: null });
  const [sel, setSel] = React.useState(new Set());

  const sorted = React.useMemo(() => {
    if (!sort.key) return rows;
    const r = [...rows].sort((a, b) => {
      const av = a[sort.key], bv = b[sort.key];
      if (av == null) return 1; if (bv == null) return -1;
      if (typeof av === 'number') return av - bv;
      return String(av).localeCompare(String(bv));
    });
    return sort.dir === 'desc' ? r.reverse() : r;
  }, [rows, sort]);

  const toggleSort = (k) => setSort(s =>
    s.key !== k ? { key: k, dir: 'asc' }
    : s.dir === 'asc' ? { key: k, dir: 'desc' }
    : { key: null, dir: null });

  const toggleAll = () => {
    if (sel.size === rows.length) setSel(new Set());
    else setSel(new Set(rows.map((_, i) => i)));
  };
  const toggleRow = (i) => {
    const n = new Set(sel);
    n.has(i) ? n.delete(i) : n.add(i);
    setSel(n);
  };

  const cls = ['kui-table', density === 'compact' && 'kui-table--compact', zebra && 'kui-table--zebra'].filter(Boolean).join(' ');

  return (
    <div className="kui-table-wrap">
      {(title || selectable) && (
        <div className="kui-table-toolbar">
          <div className="kui-table-toolbar__title">{title}</div>
          <div className="kui-table-toolbar__count">
            {sel.size > 0 ? `${sel.size} selected` : `${rows.length} rows`}
          </div>
          <div style={{ flex: 1 }} />
          {sel.size > 0 ? (
            <>
              <KuiBtn variant="flat" size="sm">{KuiIcons.download}Export</KuiBtn>
              <KuiBtn variant="destructive" size="sm">{KuiIcons.trash}Delete</KuiBtn>
            </>
          ) : (
            <>
              <KuiBtn variant="flat" size="sm">{KuiIcons.search}Filter</KuiBtn>
              <KuiBtn variant="default" size="sm">{KuiIcons.plus}Add row</KuiBtn>
            </>
          )}
        </div>
      )}
      <div style={{ overflow: 'auto' }}>
        <table className={cls}>
          <thead>
            <tr>
              {selectable && (
                <th className="kui-table__check">
                  <KuiCheck checked={sel.size === rows.length && rows.length > 0} onChange={toggleAll} />
                </th>
              )}
              {columns.map(c => (
                <th key={c.key}
                  data-sort={sort.key === c.key ? sort.dir : undefined}
                  onClick={() => toggleSort(c.key)}>{c.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((row, i) => (
              <tr key={i} data-selected={sel.has(i)}>
                {selectable && (
                  <td className="kui-table__check" onClick={(e) => e.stopPropagation()}>
                    <KuiCheck checked={sel.has(i)} onChange={() => toggleRow(i)} />
                  </td>
                )}
                {columns.map(c => (
                  <td key={c.key} className={c.mono ? 'kui-table__mono' : ''}>
                    {c.render ? c.render(row[c.key], row) : row[c.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

Object.assign(window, { KuiTable, KuiCheck });
