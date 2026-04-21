// Kev-UI Tabs — underline indicator with slide animation + pill variant

const tabsCSS = `
.kui-tabs {
  display: flex; position: relative;
  border-bottom: 1px solid var(--kui-border);
  font-family: var(--kui-font-sans);
  gap: 4px;
}
.kui-tab {
  padding: 10px 14px; font-size: 13px; font-weight: 500;
  color: var(--kui-fg-muted);
  background: transparent; border: none; cursor: pointer;
  font-family: inherit;
  transition: color 120ms;
  position: relative;
}
.kui-tab:hover { color: var(--kui-fg); }
.kui-tab[aria-selected="true"] { color: var(--kui-fg); }
.kui-tabs__indicator {
  position: absolute; bottom: -1px; height: 2px;
  background: var(--kui-accent); border-radius: 2px;
  transition: left 220ms cubic-bezier(.3,.7,.3,1), width 220ms cubic-bezier(.3,.7,.3,1);
}

/* Pill variant */
.kui-tabs--pills {
  border: none; background: var(--kui-surface-3);
  padding: 3px; border-radius: 8px; gap: 2px; display: inline-flex;
}
.kui-tabs--pills .kui-tab {
  padding: 6px 14px; border-radius: 6px; font-size: 13px;
  z-index: 1;
}
.kui-tabs--pills .kui-tabs__indicator {
  bottom: auto; top: 3px; height: calc(100% - 6px);
  background: var(--kui-surface-1); border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0,0,0,.08);
}
[data-theme="dark"] .kui-tabs--pills .kui-tabs__indicator { background: var(--kui-surface-4); }

.kui-tabpanel {
  padding: 18px 0; font-family: var(--kui-font-sans);
  color: var(--kui-fg); font-size: 13.5px; line-height: 1.55;
  animation: kui-tab-fade 220ms ease;
}
@keyframes kui-tab-fade {
  from { opacity: 0; transform: translateY(4px); }
  to   { opacity: 1; transform: translateY(0); }
}
`;

if (!document.getElementById('kui-tabs-styles')) {
  const s = document.createElement('style'); s.id = 'kui-tabs-styles'; s.textContent = tabsCSS;
  document.head.appendChild(s);
}

function KuiTabs({ tabs, value, onChange, variant = 'underline', children }) {
  const refs = React.useRef({});
  const [ind, setInd] = React.useState({ left: 0, width: 0 });

  React.useLayoutEffect(() => {
    const el = refs.current[value];
    if (el) setInd({ left: el.offsetLeft, width: el.offsetWidth });
  }, [value, tabs.length]);

  return (
    <div>
      <div className={'kui-tabs' + (variant === 'pills' ? ' kui-tabs--pills' : '')} role="tablist">
        {tabs.map(t => (
          <button key={t.id} ref={(el) => (refs.current[t.id] = el)}
            className="kui-tab" role="tab"
            aria-selected={value === t.id}
            onClick={() => onChange && onChange(t.id)}>{t.label}</button>
        ))}
        <span className="kui-tabs__indicator" style={{ left: ind.left, width: ind.width }} />
      </div>
      <div className="kui-tabpanel" role="tabpanel" key={value}>{children}</div>
    </div>
  );
}

Object.assign(window, { KuiTabs });
