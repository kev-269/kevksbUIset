// Kev-UI Dialog (modal), Drawer (side panel), Popover, Toast, Context menu

const modCSS = `
.kui-overlay {
  position: fixed; inset: 0; background: rgba(20,20,20,0.45);
  backdrop-filter: blur(4px);
  display: grid; place-items: center; z-index: 50;
  animation: kui-fade 160ms ease;
}
.kui-overlay--drawer { place-items: stretch; justify-content: flex-end; }
@keyframes kui-fade { from { opacity: 0; } to { opacity: 1; } }

.kui-dialog {
  background: var(--kui-surface-1); color: var(--kui-fg);
  border: 1px solid var(--kui-border); border-radius: 12px;
  box-shadow: var(--kui-shadow-3); font-family: var(--kui-font-sans);
  width: min(440px, calc(100vw - 40px));
  animation: kui-pop 180ms cubic-bezier(.3,.7,.3,1);
}
@keyframes kui-pop { from { opacity: 0; transform: scale(0.96) translateY(8px); } to { opacity: 1; transform: scale(1) translateY(0); } }
.kui-dialog__head { padding: 16px 18px 6px; }
.kui-dialog__title { font-size: 16px; font-weight: 600; }
.kui-dialog__subtitle { font-size: 13px; color: var(--kui-fg-muted); margin-top: 3px; }
.kui-dialog__body { padding: 10px 18px 18px; font-size: 13.5px; color: var(--kui-fg-muted); line-height: 1.5; }
.kui-dialog__foot { padding: 12px 14px; border-top: 1px solid var(--kui-divider); display: flex; gap: 8px; justify-content: flex-end; background: var(--kui-bg); border-radius: 0 0 12px 12px; }

.kui-drawer {
  background: var(--kui-surface-1); color: var(--kui-fg);
  border-left: 1px solid var(--kui-border);
  box-shadow: var(--kui-shadow-3); font-family: var(--kui-font-sans);
  width: min(400px, calc(100vw - 40px)); height: 100%;
  display: flex; flex-direction: column;
  animation: kui-slide-in 220ms cubic-bezier(.3,.7,.3,1);
}
@keyframes kui-slide-in { from { transform: translateX(100%); } to { transform: translateX(0); } }
.kui-drawer__head { padding: 14px 16px; border-bottom: 1px solid var(--kui-divider); display: flex; align-items: center; gap: 10px; }
.kui-drawer__title { font-size: 14px; font-weight: 600; flex: 1; }
.kui-drawer__body { padding: 16px; overflow: auto; flex: 1; font-size: 13px; color: var(--kui-fg-muted); line-height: 1.55; }
.kui-drawer__foot { padding: 12px 14px; border-top: 1px solid var(--kui-divider); display: flex; gap: 8px; justify-content: flex-end; }

.kui-popover {
  position: absolute; background: var(--kui-surface-1);
  border: 1px solid var(--kui-border); border-radius: 9px;
  box-shadow: var(--kui-shadow-3); padding: 10px 12px;
  font-family: var(--kui-font-sans); font-size: 13px; color: var(--kui-fg);
  min-width: 200px; z-index: 40;
  animation: kui-pop 140ms cubic-bezier(.3,.7,.3,1);
}

.kui-toast-stack {
  position: fixed; bottom: 16px; right: 16px;
  display: flex; flex-direction: column; gap: 8px; z-index: 60;
}
.kui-toast {
  background: var(--kui-surface-1); border: 1px solid var(--kui-border);
  border-radius: 8px; box-shadow: var(--kui-shadow-2);
  padding: 10px 12px; display: flex; align-items: center; gap: 10px;
  font-family: var(--kui-font-sans); font-size: 13px; color: var(--kui-fg);
  min-width: 260px; max-width: 380px;
  animation: kui-toast-in 220ms cubic-bezier(.3,.7,.3,1);
}
@keyframes kui-toast-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
.kui-toast__icon { width: 22px; height: 22px; border-radius: 50%; display: grid; place-items: center; flex-shrink: 0; color: #fff; }
.kui-toast__icon--success { background: var(--kui-success); }
.kui-toast__icon--danger { background: var(--kui-danger); }
.kui-toast__icon--info { background: var(--kui-accent); }
.kui-toast__title { font-weight: 600; font-size: 13px; }
.kui-toast__sub { font-size: 12px; color: var(--kui-fg-muted); margin-top: 2px; }
`;
if (!document.getElementById('kui-mod-styles')) {
  const s = document.createElement('style'); s.id = 'kui-mod-styles'; s.textContent = modCSS;
  document.head.appendChild(s);
}

function KuiDialog({ open, title, subtitle, children, footer, onClose }) {
  if (!open) return null;
  return (
    <div className="kui-overlay" onClick={onClose}>
      <div className="kui-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="kui-dialog__head">
          <div className="kui-dialog__title">{title}</div>
          {subtitle && <div className="kui-dialog__subtitle">{subtitle}</div>}
        </div>
        <div className="kui-dialog__body">{children}</div>
        {footer && <div className="kui-dialog__foot">{footer}</div>}
      </div>
    </div>
  );
}

function KuiDrawer({ open, title, actions, children, footer, onClose }) {
  if (!open) return null;
  return (
    <div className="kui-overlay kui-overlay--drawer" onClick={onClose}>
      <div className="kui-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="kui-drawer__head">
          <div className="kui-drawer__title">{title}</div>
          {actions}
          <button className="kui-btn kui-btn--flat kui-btn--circular kui-btn--sm" onClick={onClose} aria-label="Close">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M4 4l8 8M12 4l-8 8"/></svg>
          </button>
        </div>
        <div className="kui-drawer__body">{children}</div>
        {footer && <div className="kui-drawer__foot">{footer}</div>}
      </div>
    </div>
  );
}

// Toast container + imperative API
const toastCtx = React.createContext(null);
function KuiToastProvider({ children }) {
  const [items, setItems] = React.useState([]);
  const push = React.useCallback((t) => {
    const id = Math.random().toString(36).slice(2);
    setItems(xs => [...xs, { id, ...t }]);
    setTimeout(() => setItems(xs => xs.filter(x => x.id !== id)), t.duration || 3200);
  }, []);
  return (
    <toastCtx.Provider value={push}>
      {children}
      <div className="kui-toast-stack">
        {items.map(t => (
          <div key={t.id} className="kui-toast">
            <div className={'kui-toast__icon kui-toast__icon--' + (t.tone || 'info')}>
              {t.tone === 'success' && <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8.5l3 3 7-7"/></svg>}
              {t.tone === 'danger' && <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4l8 8M12 4l-8 8"/></svg>}
              {(t.tone === 'info' || !t.tone) && <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M8 4v5M8 11.5v.01"/></svg>}
            </div>
            <div style={{ flex: 1 }}>
              <div className="kui-toast__title">{t.title}</div>
              {t.sub && <div className="kui-toast__sub">{t.sub}</div>}
            </div>
          </div>
        ))}
      </div>
    </toastCtx.Provider>
  );
}
function useKuiToast() { return React.useContext(toastCtx); }

function KuiPopover({ anchor, open, children }) {
  if (!open || !anchor) return null;
  const r = anchor.getBoundingClientRect();
  return ReactDOM.createPortal(
    <div className="kui-popover" style={{ top: r.bottom + 6, left: r.left }}>{children}</div>,
    document.body
  );
}

Object.assign(window, { KuiDialog, KuiDrawer, KuiToastProvider, useKuiToast, KuiPopover });
