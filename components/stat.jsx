// Kev-UI Stat Card

const statCSS = `
.kui-stat {
  background: var(--kui-surface-1);
  border: 1px solid var(--kui-border);
  border-radius: 9px; padding: 14px 16px;
  font-family: var(--kui-font-sans);
  display: flex; flex-direction: column; gap: 6px;
  min-width: 160px;
}
.kui-stat__label {
  font-size: 11px; text-transform: uppercase; letter-spacing: 1px;
  color: var(--kui-fg-subtle); font-family: var(--kui-font-mono); font-weight: 600;
  display: flex; align-items: center; gap: 6px;
}
.kui-stat__value {
  font-size: 26px; font-weight: 600; color: var(--kui-fg);
  font-variant-numeric: tabular-nums; letter-spacing: -0.5px;
  line-height: 1.1;
}
.kui-stat__value--mono { font-family: var(--kui-font-mono); font-size: 22px; }
.kui-stat__delta {
  display: inline-flex; align-items: center; gap: 4px;
  font-size: 12px; font-weight: 500;
  font-family: var(--kui-font-mono);
}
.kui-stat__delta--up { color: var(--kui-success); }
.kui-stat__delta--down { color: var(--kui-danger); }
.kui-stat__row { display: flex; justify-content: space-between; align-items: flex-end; gap: 12px; }
`;

if (!document.getElementById('kui-stat-styles')) {
  const s = document.createElement('style'); s.id = 'kui-stat-styles'; s.textContent = statCSS;
  document.head.appendChild(s);
}

function KuiStat({ label, value, unit, delta, deltaDir, spark, mono, icon }) {
  return (
    <div className="kui-stat">
      <div className="kui-stat__label">{icon}{label}</div>
      <div className="kui-stat__row">
        <div className={'kui-stat__value' + (mono ? ' kui-stat__value--mono' : '')}>
          {value}
          {unit && <span style={{ fontSize: 14, color: 'var(--kui-fg-muted)', marginLeft: 3, fontWeight: 500 }}>{unit}</span>}
        </div>
        {spark}
      </div>
      {delta && (
        <span className={'kui-stat__delta kui-stat__delta--' + (deltaDir || 'up')}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
            <path d={deltaDir === 'down' ? 'M2 4l3 3 3-3H2z' : 'M2 6l3-3 3 3H2z'} />
          </svg>
          {delta}
        </span>
      )}
    </div>
  );
}

Object.assign(window, { KuiStat });
