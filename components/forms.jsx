// Kev-UI Forms — input, textarea, checkbox, radio, switch, select, field

const formCSS = `
.kui-field { font-family: var(--kui-font-sans); display: flex; flex-direction: column; gap: 4px; }
.kui-field__label {
  font-size: 12px; font-weight: 500; color: var(--kui-fg);
  display: flex; align-items: center; gap: 6px;
}
.kui-field__hint { font-size: 11px; color: var(--kui-fg-subtle); font-family: var(--kui-font-mono); }
.kui-field__error { font-size: 11px; color: var(--kui-danger); font-family: var(--kui-font-mono); display: flex; align-items: center; gap: 4px; }
.kui-field__req { color: var(--kui-danger); font-family: var(--kui-font-mono); }

.kui-input, .kui-textarea, .kui-select {
  font-family: var(--kui-font-sans); font-size: 13px;
  color: var(--kui-fg);
  background: var(--kui-surface-1);
  border: 1px solid var(--kui-border);
  border-radius: 7px;
  padding: 7px 10px; height: 34px;
  transition: border-color 80ms, box-shadow 80ms, background 80ms;
  outline: none; width: 100%;
}
.kui-textarea { height: auto; min-height: 72px; padding: 8px 10px; resize: vertical; font-family: inherit; line-height: 1.5; }
.kui-input:hover, .kui-textarea:hover, .kui-select:hover { border-color: var(--kui-border-strong); }
.kui-input:focus, .kui-textarea:focus, .kui-select:focus {
  border-color: var(--kui-accent);
  box-shadow: 0 0 0 3px var(--kui-accent-soft);
}
.kui-input::placeholder, .kui-textarea::placeholder { color: var(--kui-fg-subtle); }
.kui-input:disabled, .kui-textarea:disabled, .kui-select:disabled { opacity: 0.5; cursor: not-allowed; }
.kui-field[data-invalid="true"] .kui-input,
.kui-field[data-invalid="true"] .kui-textarea,
.kui-field[data-invalid="true"] .kui-select {
  border-color: var(--kui-danger);
}
.kui-field[data-invalid="true"] .kui-input:focus,
.kui-field[data-invalid="true"] .kui-textarea:focus {
  box-shadow: 0 0 0 3px var(--kui-danger-soft);
}

.kui-input-group {
  display: flex; align-items: center; gap: 8px;
  border: 1px solid var(--kui-border); border-radius: 7px;
  background: var(--kui-surface-1); padding: 0 10px; height: 34px;
  transition: border-color 80ms, box-shadow 80ms;
}
.kui-input-group:focus-within { border-color: var(--kui-accent); box-shadow: 0 0 0 3px var(--kui-accent-soft); }
.kui-input-group input {
  flex: 1; border: none; outline: none; background: transparent;
  font-family: var(--kui-font-sans); font-size: 13px; color: var(--kui-fg);
  min-width: 0;
}
.kui-input-group__icon { color: var(--kui-fg-subtle); flex-shrink: 0; display: grid; place-items: center; }

/* Switch */
.kui-switch {
  display: inline-flex; align-items: center; gap: 8px;
  cursor: pointer; user-select: none;
  font-family: var(--kui-font-sans); font-size: 13px; color: var(--kui-fg);
}
.kui-switch__track {
  width: 34px; height: 20px; border-radius: 999px;
  background: var(--kui-surface-4);
  transition: background 160ms; position: relative;
  flex-shrink: 0;
}
.kui-switch__thumb {
  position: absolute; top: 2px; left: 2px; width: 16px; height: 16px;
  background: #fff; border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  transition: transform 180ms cubic-bezier(.3,.7,.3,1);
}
.kui-switch[data-on="true"] .kui-switch__track { background: var(--kui-accent); }
.kui-switch[data-on="true"] .kui-switch__thumb { transform: translateX(14px); }

/* Radio */
.kui-radio {
  display: inline-flex; align-items: center; gap: 8px; cursor: pointer;
  font-family: var(--kui-font-sans); font-size: 13px; color: var(--kui-fg);
}
.kui-radio__dot {
  width: 14px; height: 14px; border-radius: 50%;
  border: 1px solid var(--kui-border-strong);
  background: var(--kui-surface-1);
  display: grid; place-items: center; transition: all 120ms;
  flex-shrink: 0;
}
.kui-radio__dot::after {
  content: ''; width: 6px; height: 6px; border-radius: 50%;
  background: #fff; transform: scale(0); transition: transform 140ms;
}
.kui-radio[data-on="true"] .kui-radio__dot { background: var(--kui-accent); border-color: var(--kui-accent); }
.kui-radio[data-on="true"] .kui-radio__dot::after { transform: scale(1); }

/* Checkbox label */
.kui-checkbox {
  display: inline-flex; align-items: center; gap: 8px; cursor: pointer;
  font-family: var(--kui-font-sans); font-size: 13px; color: var(--kui-fg);
}

/* Select chevron */
.kui-select-wrap { position: relative; }
.kui-select-wrap::after {
  content: ''; position: absolute; right: 12px; top: 50%;
  width: 0; height: 0; border-left: 4px solid transparent; border-right: 4px solid transparent;
  border-top: 4px solid var(--kui-fg-subtle); pointer-events: none;
  transform: translateY(-2px);
}
.kui-select { appearance: none; padding-right: 28px; }

/* File dropzone */
.kui-drop {
  border: 1.5px dashed var(--kui-border);
  border-radius: 9px; padding: 24px; text-align: center;
  background: var(--kui-surface-1); cursor: pointer;
  transition: all 120ms;
  font-family: var(--kui-font-sans);
}
.kui-drop:hover { border-color: var(--kui-accent); background: var(--kui-accent-soft); }
.kui-drop__icon { color: var(--kui-fg-subtle); margin-bottom: 8px; }
.kui-drop__title { font-size: 13px; font-weight: 500; color: var(--kui-fg); }
.kui-drop__sub { font-size: 11px; color: var(--kui-fg-subtle); font-family: var(--kui-font-mono); margin-top: 4px; }

/* Segmented control */
.kui-seg {
  display: inline-flex; padding: 3px;
  background: var(--kui-surface-3); border-radius: 8px; gap: 2px;
  font-family: var(--kui-font-sans);
}
.kui-seg__btn {
  padding: 5px 12px; border: none; background: transparent; cursor: pointer;
  font-size: 12px; font-weight: 500; color: var(--kui-fg-muted);
  border-radius: 6px; font-family: inherit;
  transition: all 120ms;
}
.kui-seg__btn[data-on="true"] {
  background: var(--kui-surface-1); color: var(--kui-fg);
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
}
[data-theme="dark"] .kui-seg__btn[data-on="true"] { background: var(--kui-surface-4); }
`;
if (!document.getElementById('kui-form-styles')) {
  const s = document.createElement('style'); s.id = 'kui-form-styles'; s.textContent = formCSS;
  document.head.appendChild(s);
}

function KuiField({ label, hint, error, required, children }) {
  return (
    <div className="kui-field" data-invalid={!!error}>
      {label && <label className="kui-field__label">{label}{required && <span className="kui-field__req">*</span>}</label>}
      {children}
      {error ? (
        <div className="kui-field__error">
          <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="8" cy="8" r="6"/><path d="M8 5v4M8 11v.01"/></svg>
          {error}
        </div>
      ) : hint ? <div className="kui-field__hint">{hint}</div> : null}
    </div>
  );
}
function KuiInput(props) { return <input className="kui-input" {...props} />; }
function KuiTextarea(props) { return <textarea className="kui-textarea" {...props} />; }
function KuiInputGroup({ icon, ...rest }) {
  return (
    <div className="kui-input-group">
      {icon && <span className="kui-input-group__icon">{icon}</span>}
      <input {...rest} />
    </div>
  );
}
function KuiSwitch({ on, onChange, label }) {
  return (
    <label className="kui-switch" data-on={!!on} onClick={() => onChange && onChange(!on)}>
      <span className="kui-switch__track"><span className="kui-switch__thumb" /></span>
      {label && <span>{label}</span>}
    </label>
  );
}
function KuiRadio({ on, onChange, label }) {
  return (
    <label className="kui-radio" data-on={!!on} onClick={() => onChange && onChange(true)}>
      <span className="kui-radio__dot" />
      {label && <span>{label}</span>}
    </label>
  );
}
function KuiCheckbox({ on, onChange, label }) {
  return (
    <label className="kui-checkbox" onClick={() => onChange && onChange(!on)}>
      <KuiCheck checked={on} />
      {label && <span>{label}</span>}
    </label>
  );
}
function KuiSelect({ children, ...rest }) {
  return (
    <div className="kui-select-wrap">
      <select className="kui-select" {...rest}>{children}</select>
    </div>
  );
}
function KuiDrop({ title = 'Drop files here or click to browse', sub = 'PNG, JPG, PDF · max 10MB' }) {
  return (
    <div className="kui-drop">
      <div className="kui-drop__icon">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 16V4M8 8l4-4 4 4M4 16v3a1 1 0 001 1h14a1 1 0 001-1v-3"/>
        </svg>
      </div>
      <div className="kui-drop__title">{title}</div>
      <div className="kui-drop__sub">{sub}</div>
    </div>
  );
}
function KuiSegmented({ items, value, onChange }) {
  return (
    <div className="kui-seg">
      {items.map(it => (
        <button key={it.value} className="kui-seg__btn"
          data-on={value === it.value}
          onClick={() => onChange && onChange(it.value)}>{it.label}</button>
      ))}
    </div>
  );
}

Object.assign(window, {
  KuiField, KuiInput, KuiTextarea, KuiInputGroup,
  KuiSwitch, KuiRadio, KuiCheckbox, KuiSelect,
  KuiDrop, KuiSegmented,
});
