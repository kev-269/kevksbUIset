// Kev-UI Copy-to-clipboard + Zoom viewer + Export menu

const copyCSS = `
.kui-copy {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--kui-surface-1); border: 1px solid var(--kui-border);
  border-radius: 7px; padding: 4px 4px 4px 12px;
  font-family: var(--kui-font-mono); font-size: 12px;
  color: var(--kui-fg); max-width: 100%;
}
.kui-copy__text {
  flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  min-width: 0;
}
.kui-copy__btn {
  height: 26px; padding: 0 10px; border-radius: 5px;
  background: var(--kui-surface-2); border: 1px solid var(--kui-border);
  cursor: pointer; color: var(--kui-fg-muted); font-size: 11px; font-weight: 500;
  display: inline-flex; align-items: center; gap: 5px;
  font-family: var(--kui-font-sans);
  transition: all 120ms;
}
.kui-copy__btn:hover { color: var(--kui-fg); background: var(--kui-surface-3); }
.kui-copy__btn[data-done="true"] { color: var(--kui-success); border-color: var(--kui-success); }
`;
if (!document.getElementById('kui-copy-styles')) {
  const s = document.createElement('style'); s.id = 'kui-copy-styles'; s.textContent = copyCSS;
  document.head.appendChild(s);
}

function KuiCopy({ text }) {
  const [done, setDone] = React.useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(text).then(() => {
      setDone(true); setTimeout(() => setDone(false), 1400);
    });
  };
  return (
    <div className="kui-copy">
      <span className="kui-copy__text">{text}</span>
      <button className="kui-copy__btn" data-done={done} onClick={copy}>
        {done ? (
          <>
            <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8.5l3 3 7-7"/></svg>
            Copied
          </>
        ) : (
          <>
            <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="5" width="8" height="9" rx="1"/><path d="M3 11V3a1 1 0 011-1h7"/></svg>
            Copy
          </>
        )}
      </button>
    </div>
  );
}

/* Zoom viewer */
const zoomCSS = `
.kui-zoom { position: relative; border: 1px solid var(--kui-border); border-radius: 9px; overflow: hidden; background: var(--kui-surface-1); }
.kui-zoom__viewport { overflow: hidden; cursor: grab; background:
  repeating-linear-gradient(45deg, var(--kui-surface-3) 0 6px, transparent 6px 12px),
  var(--kui-surface-1);
  display: grid; place-items: center;
}
.kui-zoom__viewport:active { cursor: grabbing; }
.kui-zoom__content { transition: transform 140ms ease; font-family: var(--kui-font-mono); font-size: 11px; color: var(--kui-fg-subtle); padding: 40px; text-align: center; }
.kui-zoom__ctrl {
  position: absolute; bottom: 8px; right: 8px;
  display: flex; gap: 2px; padding: 2px;
  background: var(--kui-surface-1); border: 1px solid var(--kui-border);
  border-radius: 7px; box-shadow: var(--kui-shadow-2);
}
.kui-zoom__btn {
  width: 26px; height: 26px; border: none; background: transparent;
  display: grid; place-items: center; cursor: pointer;
  border-radius: 4px; color: var(--kui-fg-muted);
}
.kui-zoom__btn:hover { background: var(--kui-surface-hover); color: var(--kui-fg); }
.kui-zoom__value {
  padding: 0 8px; font-family: var(--kui-font-mono); font-size: 11px;
  color: var(--kui-fg-muted); display: flex; align-items: center;
  min-width: 44px; justify-content: center;
}
`;
if (!document.getElementById('kui-zoom-styles')) {
  const s = document.createElement('style'); s.id = 'kui-zoom-styles'; s.textContent = zoomCSS;
  document.head.appendChild(s);
}

function KuiZoom({ children, height = 220 }) {
  const [z, setZ] = React.useState(1);
  return (
    <div className="kui-zoom">
      <div className="kui-zoom__viewport" style={{ height }}>
        <div className="kui-zoom__content" style={{ transform: `scale(${z})` }}>{children}</div>
      </div>
      <div className="kui-zoom__ctrl">
        <button className="kui-zoom__btn" onClick={() => setZ(Math.max(0.25, z - 0.25))} aria-label="Zoom out">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 8h8"/></svg>
        </button>
        <div className="kui-zoom__value">{Math.round(z * 100)}%</div>
        <button className="kui-zoom__btn" onClick={() => setZ(Math.min(4, z + 0.25))} aria-label="Zoom in">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M8 4v8M4 8h8"/></svg>
        </button>
        <button className="kui-zoom__btn" onClick={() => setZ(1)} aria-label="Reset">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8a5 5 0 119 3L9 8"/><path d="M8 6h3V3"/></svg>
        </button>
      </div>
    </div>
  );
}

/* Export menu */
const expCSS = `
.kui-export { position: relative; display: inline-block; font-family: var(--kui-font-sans); }
.kui-export__menu {
  position: absolute; top: calc(100% + 4px); right: 0;
  background: var(--kui-surface-1); border: 1px solid var(--kui-border);
  border-radius: 8px; box-shadow: var(--kui-shadow-3);
  padding: 4px; min-width: 180px; z-index: 10;
  animation: kui-exp-in 140ms ease;
}
@keyframes kui-exp-in { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }
.kui-export__item {
  display: flex; align-items: center; gap: 10px; width: 100%;
  padding: 7px 10px; border: none; background: transparent; cursor: pointer;
  border-radius: 5px; color: var(--kui-fg); font-size: 13px;
  font-family: inherit; text-align: left;
}
.kui-export__item:hover { background: var(--kui-surface-hover); }
.kui-export__item svg { width: 14px; height: 14px; color: var(--kui-fg-subtle); flex-shrink: 0; }
.kui-export__item kbd { margin-left: auto; font-size: 10px; color: var(--kui-fg-subtle); font-family: var(--kui-font-mono); }
.kui-export__sep { height: 1px; background: var(--kui-divider); margin: 4px -2px; }
.kui-export__head { font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: var(--kui-fg-subtle); padding: 6px 10px 3px; font-family: var(--kui-font-mono); font-weight: 600; }
`;
if (!document.getElementById('kui-exp-styles')) {
  const s = document.createElement('style'); s.id = 'kui-exp-styles'; s.textContent = expCSS;
  document.head.appendChild(s);
}

function KuiExportMenu({ label = 'Export' }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);
  const Item = ({ icon, k, shortcut }) => (
    <button className="kui-export__item">
      {icon}<span>{k}</span>{shortcut && <kbd>{shortcut}</kbd>}
    </button>
  );
  return (
    <div className="kui-export" ref={ref}>
      <KuiBtn variant="default" onClick={() => setOpen(o => !o)}>
        {KuiIcons.download}{label}
        <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 6l4 4 4-4"/></svg>
      </KuiBtn>
      {open && (
        <div className="kui-export__menu">
          <div className="kui-export__head">Document</div>
          <Item icon={<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 2h5l3 3v9H4z"/><path d="M9 2v3h3"/></svg>} k="PDF" shortcut="⌘P" />
          <Item icon={<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="10" height="10" rx="1"/><path d="M6 6l4 4M10 6l-4 4"/></svg>} k="PNG image" />
          <Item icon={<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="10" height="10" rx="1"/><path d="M6 10V6l2 3 2-3v4"/></svg>} k="SVG vector" />
          <div className="kui-export__sep" />
          <div className="kui-export__head">Data</div>
          <Item icon={<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 2h5l3 3v9H4z"/><path d="M6 8h4M6 11h4"/></svg>} k="CSV" />
          <Item icon={<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" fontFamily="monospace"><path d="M4 2h5l3 3v9H4z"/><path d="M6 9l1 1M10 9l-1 1"/></svg>} k="JSON" />
          <div className="kui-export__sep" />
          <Item icon={<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M8 3v7M4.5 7L8 10.5 11.5 7M3 13h10"/></svg>} k="Share link…" />
        </div>
      )}
    </div>
  );
}

Object.assign(window, { KuiCopy, KuiZoom, KuiExportMenu });
