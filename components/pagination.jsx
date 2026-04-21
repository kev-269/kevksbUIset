// Kev-UI Pagination

const pagCSS = `
.kui-pag { display: inline-flex; gap: 2px; font-family: var(--kui-font-sans); align-items: center; }
.kui-pag__btn {
  min-width: 30px; height: 30px; padding: 0 8px; border-radius: 6px;
  background: transparent; border: 1px solid transparent;
  color: var(--kui-fg-muted); font-size: 13px; font-weight: 500;
  cursor: pointer; font-family: var(--kui-font-mono);
  display: inline-grid; place-items: center;
  transition: background 80ms, color 80ms;
}
.kui-pag__btn:hover { background: var(--kui-surface-hover); color: var(--kui-fg); }
.kui-pag__btn[aria-current="page"] {
  background: var(--kui-accent); color: #fff; border-color: var(--kui-accent);
}
.kui-pag__btn:disabled { opacity: 0.4; cursor: not-allowed; }
.kui-pag__ellipsis { color: var(--kui-fg-subtle); padding: 0 4px; font-family: var(--kui-font-mono); }
`;
if (!document.getElementById('kui-pag-styles')) {
  const s = document.createElement('style'); s.id = 'kui-pag-styles'; s.textContent = pagCSS;
  document.head.appendChild(s);
}

function KuiPagination({ page = 1, total = 10, onChange }) {
  const pages = [];
  const push = (p) => pages.push(p);
  push(1);
  if (page > 3) push('…1');
  for (let p = Math.max(2, page - 1); p <= Math.min(total - 1, page + 1); p++) push(p);
  if (page < total - 2) push('…2');
  if (total > 1) push(total);

  const go = (p) => onChange && onChange(Math.max(1, Math.min(total, p)));
  return (
    <div className="kui-pag">
      <button className="kui-pag__btn" disabled={page === 1} onClick={() => go(page - 1)}>
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10 3L5 8l5 5"/></svg>
      </button>
      {pages.map((p, i) => typeof p === 'string'
        ? <span key={i} className="kui-pag__ellipsis">…</span>
        : <button key={i} className="kui-pag__btn" aria-current={p === page ? 'page' : undefined} onClick={() => go(p)}>{p}</button>
      )}
      <button className="kui-pag__btn" disabled={page === total} onClick={() => go(page + 1)}>
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3l5 5-5 5"/></svg>
      </button>
    </div>
  );
}

Object.assign(window, { KuiPagination });
