// Kev-UI Button — GNOME/Adwaita-inspired
// Variants: default, suggested (primary), destructive, flat, pill, circular
// Sizes: sm, md, lg
// States: rest, hover, active, focus, disabled

const btnBaseCSS = `
/* ─── Kev-UI Button ───────────────────────────────────────── */
.kui-btn {
  --_bg: var(--kui-btn-bg);
  --_fg: var(--kui-btn-fg);
  --_bd: var(--kui-btn-border);
  --_bg-hover: var(--kui-btn-bg-hover);
  --_bg-active: var(--kui-btn-bg-active);

  font-family: var(--kui-font-sans);
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  letter-spacing: -0.005em;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  height: 34px;
  padding: 0 14px;
  border-radius: var(--kui-radius-md);

  background: var(--_bg);
  color: var(--_fg);
  border: 1px solid var(--_bd);

  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  transition: background 80ms ease, border-color 80ms ease, box-shadow 80ms ease, color 80ms ease;

  /* Adwaita's subtle top highlight + bottom shadow */
  box-shadow:
    inset 0 1px 0 0 var(--kui-btn-highlight, rgba(255,255,255,0.06)),
    0 1px 0 0 rgba(0,0,0,0.04);
}
.kui-btn:hover { background: var(--_bg-hover); }
.kui-btn:active { background: var(--_bg-active); box-shadow: inset 0 1px 2px rgba(0,0,0,0.08); }
.kui-btn:focus-visible {
  outline: none;
  box-shadow:
    inset 0 1px 0 0 var(--kui-btn-highlight, rgba(255,255,255,0.06)),
    0 0 0 2px var(--kui-bg),
    0 0 0 4px var(--kui-accent);
}
.kui-btn:disabled, .kui-btn[aria-disabled="true"] {
  opacity: 0.5; cursor: not-allowed; box-shadow: none;
}

/* Sizes */
.kui-btn--sm { height: 26px; padding: 0 10px; font-size: 13px; border-radius: var(--kui-radius-sm); gap: 6px; }
.kui-btn--lg { height: 42px; padding: 0 18px; font-size: 15px; border-radius: var(--kui-radius-lg); gap: 10px; }

/* ── Default (standard): neutral surface ── */
.kui-btn--default {
  --kui-btn-bg:        var(--kui-surface-2);
  --kui-btn-bg-hover:  var(--kui-surface-3);
  --kui-btn-bg-active: var(--kui-surface-4);
  --kui-btn-fg:        var(--kui-fg);
  --kui-btn-border:    var(--kui-border);
}

/* ── Suggested (primary / Adwaita blue) ── */
.kui-btn--suggested {
  --kui-btn-bg:        var(--kui-accent);
  --kui-btn-bg-hover:  var(--kui-accent-hover);
  --kui-btn-bg-active: var(--kui-accent-active);
  --kui-btn-fg:        #ffffff;
  --kui-btn-border:    transparent;
  --kui-btn-highlight: rgba(255,255,255,0.18);
}

/* ── Destructive (red) ── */
.kui-btn--destructive {
  --kui-btn-bg:        var(--kui-danger);
  --kui-btn-bg-hover:  var(--kui-danger-hover);
  --kui-btn-bg-active: var(--kui-danger-active);
  --kui-btn-fg:        #ffffff;
  --kui-btn-border:    transparent;
  --kui-btn-highlight: rgba(255,255,255,0.18);
}

/* ── Flat (no chrome until hover) ── */
.kui-btn--flat {
  --kui-btn-bg:        transparent;
  --kui-btn-bg-hover:  var(--kui-surface-hover);
  --kui-btn-bg-active: var(--kui-surface-active);
  --kui-btn-fg:        var(--kui-fg);
  --kui-btn-border:    transparent;
  box-shadow: none;
}
.kui-btn--flat:active { box-shadow: none; }

/* ── Pill (fully rounded) ── */
.kui-btn--pill { border-radius: 999px; padding: 0 18px; }

/* ── Circular (icon-only, square) ── */
.kui-btn--circular { width: 34px; padding: 0; border-radius: 999px; }
.kui-btn--circular.kui-btn--sm { width: 26px; }
.kui-btn--circular.kui-btn--lg { width: 42px; }

/* Icon inside button */
.kui-btn svg { width: 16px; height: 16px; flex-shrink: 0; }
.kui-btn--sm svg { width: 14px; height: 14px; }
.kui-btn--lg svg { width: 18px; height: 18px; }
`;

if (typeof document !== 'undefined' && !document.getElementById('kui-btn-styles')) {
  const s = document.createElement('style');
  s.id = 'kui-btn-styles';
  s.textContent = btnBaseCSS;
  document.head.appendChild(s);
}

function KuiBtn({ variant = 'default', size, pill, circular, children, disabled, ...rest }) {
  const cls = [
    'kui-btn',
    `kui-btn--${variant}`,
    size && `kui-btn--${size}`,
    pill && 'kui-btn--pill',
    circular && 'kui-btn--circular',
  ].filter(Boolean).join(' ');
  return (
    <button className={cls} disabled={disabled} {...rest}>{children}</button>
  );
}

// Common small icons used in examples
const Icons = {
  plus: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M8 3v10M3 8h10"/></svg>,
  check: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8.5l3 3 7-7"/></svg>,
  trash: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 4h10M6 4V2.5A.5.5 0 016.5 2h3a.5.5 0 01.5.5V4M4.5 4l.6 8.5a1 1 0 001 .9h3.8a1 1 0 001-.9L11.5 4M7 7v4M9 7v4"/></svg>,
  download: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v8M4.5 7L8 10.5 11.5 7M3 13h10"/></svg>,
  search: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><circle cx="7" cy="7" r="4.2"/><path d="M10.2 10.2L13 13"/></svg>,
  arrowR: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>,
  more: <svg viewBox="0 0 16 16" fill="currentColor"><circle cx="3.5" cy="8" r="1.2"/><circle cx="8" cy="8" r="1.2"/><circle cx="12.5" cy="8" r="1.2"/></svg>,
  close: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M4 4l8 8M12 4l-8 8"/></svg>,
};

Object.assign(window, { KuiBtn, KuiIcons: Icons });
