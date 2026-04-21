// Kev-UI Cards + Accordion

const cardCSS = `
.kui-card {
  background: var(--kui-surface-1);
  border: 1px solid var(--kui-border);
  border-radius: 9px;
  font-family: var(--kui-font-sans);
  color: var(--kui-fg);
  overflow: hidden;
}
.kui-card__head { padding: 14px 16px; border-bottom: 1px solid var(--kui-divider); display: flex; align-items: center; gap: 10px; }
.kui-card__title { font-size: 14px; font-weight: 600; flex: 1; }
.kui-card__subtitle { font-size: 12px; color: var(--kui-fg-muted); }
.kui-card__body { padding: 16px; font-size: 13px; line-height: 1.55; color: var(--kui-fg-muted); }
.kui-card__foot { padding: 12px 16px; border-top: 1px solid var(--kui-divider); display: flex; gap: 8px; justify-content: flex-end; background: var(--kui-surface-1); }
.kui-card--hover { transition: border-color 120ms, transform 120ms, box-shadow 120ms; cursor: pointer; }
.kui-card--hover:hover { border-color: var(--kui-border-strong); box-shadow: var(--kui-shadow-2); transform: translateY(-1px); }

/* Accordion */
.kui-acc { border: 1px solid var(--kui-border); border-radius: 9px; background: var(--kui-surface-1); font-family: var(--kui-font-sans); overflow: hidden; }
.kui-acc__item + .kui-acc__item { border-top: 1px solid var(--kui-divider); }
.kui-acc__trigger {
  width: 100%; padding: 12px 14px; background: transparent; border: none; cursor: pointer;
  display: flex; align-items: center; gap: 10px; color: var(--kui-fg);
  font-family: inherit; font-size: 13px; font-weight: 500; text-align: left;
  transition: background 80ms;
}
.kui-acc__trigger:hover { background: var(--kui-surface-hover); }
.kui-acc__chev { margin-left: auto; transition: transform 200ms; color: var(--kui-fg-subtle); }
.kui-acc__item[data-open="true"] .kui-acc__chev { transform: rotate(90deg); }
.kui-acc__panel {
  padding: 0 14px; overflow: hidden;
  font-size: 13px; color: var(--kui-fg-muted); line-height: 1.55;
  max-height: 0; transition: max-height 260ms ease, padding 260ms ease;
}
.kui-acc__item[data-open="true"] .kui-acc__panel { max-height: 400px; padding: 4px 14px 14px; }
`;

if (!document.getElementById('kui-card-styles')) {
  const s = document.createElement('style'); s.id = 'kui-card-styles'; s.textContent = cardCSS;
  document.head.appendChild(s);
}

function KuiCard({ title, subtitle, icon, actions, footer, hover, children, style }) {
  return (
    <div className={'kui-card' + (hover ? ' kui-card--hover' : '')} style={style}>
      {(title || actions) && (
        <div className="kui-card__head">
          {icon}
          <div style={{ flex: 1 }}>
            {title && <div className="kui-card__title">{title}</div>}
            {subtitle && <div className="kui-card__subtitle">{subtitle}</div>}
          </div>
          {actions}
        </div>
      )}
      <div className="kui-card__body">{children}</div>
      {footer && <div className="kui-card__foot">{footer}</div>}
    </div>
  );
}

function KuiAccordion({ items, defaultOpen = 0 }) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <div className="kui-acc">
      {items.map((it, i) => (
        <div key={i} className="kui-acc__item" data-open={open === i}>
          <button className="kui-acc__trigger" onClick={() => setOpen(open === i ? -1 : i)}>
            {it.title}
            <svg className="kui-acc__chev" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4l4 4-4 4"/></svg>
          </button>
          <div className="kui-acc__panel">{it.content}</div>
        </div>
      ))}
    </div>
  );
}

Object.assign(window, { KuiCard, KuiAccordion });
