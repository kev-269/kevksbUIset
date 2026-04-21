// Kev-UI Badges / Tags / Pills

const badgeCSS = `
.kui-badge {
  display: inline-flex; align-items: center; gap: 5px;
  font-family: var(--kui-font-sans); font-size: 11px; font-weight: 500;
  padding: 2px 8px; border-radius: 999px;
  background: var(--kui-surface-3); color: var(--kui-fg-muted);
  border: 1px solid transparent;
  line-height: 1.4;
}
.kui-badge--dot::before {
  content: ''; width: 6px; height: 6px; border-radius: 50%;
  background: currentColor; display: inline-block;
}
.kui-badge--solid { background: var(--kui-accent); color: #fff; }
.kui-badge--accent { background: var(--kui-accent-soft); color: var(--kui-accent); }
.kui-badge--success { background: var(--kui-success-soft); color: var(--kui-success); }
.kui-badge--warning { background: var(--kui-warning-soft); color: var(--kui-warning); }
.kui-badge--danger { background: var(--kui-danger-soft); color: var(--kui-danger); }
.kui-badge--outline { background: transparent; border-color: var(--kui-border); color: var(--kui-fg-muted); }

/* Tag (rectangle, closable) */
.kui-tag {
  display: inline-flex; align-items: center; gap: 6px;
  font-family: var(--kui-font-sans); font-size: 12px; font-weight: 500;
  padding: 3px 8px; border-radius: 5px;
  background: var(--kui-surface-3); color: var(--kui-fg);
  border: 1px solid var(--kui-border);
}
.kui-tag__close {
  background: transparent; border: none; padding: 0; cursor: pointer;
  width: 14px; height: 14px; border-radius: 3px;
  display: grid; place-items: center; color: var(--kui-fg-subtle);
}
.kui-tag__close:hover { background: var(--kui-surface-hover); color: var(--kui-fg); }

/* KBD */
.kui-kbd {
  display: inline-block; padding: 2px 6px;
  background: var(--kui-surface-3); border: 1px solid var(--kui-border);
  border-bottom-width: 2px; border-radius: 4px;
  font-family: var(--kui-font-mono); font-size: 11px; font-weight: 500;
  color: var(--kui-fg-muted); line-height: 1;
}
`;

if (!document.getElementById('kui-badge-styles')) {
  const s = document.createElement('style'); s.id = 'kui-badge-styles'; s.textContent = badgeCSS;
  document.head.appendChild(s);
}

function KuiBadge({ tone = 'default', dot, children }) {
  const cls = ['kui-badge', tone !== 'default' && `kui-badge--${tone}`, dot && 'kui-badge--dot'].filter(Boolean).join(' ');
  return <span className={cls}>{children}</span>;
}
function KuiTag({ children, onClose }) {
  return (
    <span className="kui-tag">
      {children}
      {onClose && (
        <button className="kui-tag__close" onClick={onClose} aria-label="Remove">
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"><path d="M1 1l6 6M7 1l-6 6"/></svg>
        </button>
      )}
    </span>
  );
}
function KuiKbd({ children }) { return <span className="kui-kbd">{children}</span>; }

Object.assign(window, { KuiBadge, KuiTag, KuiKbd });
