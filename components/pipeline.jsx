// Kev-UI Pipeline & Engineering visuals

const pipeCSS = `
.kui-pipe { display: flex; align-items: stretch; gap: 0; font-family: var(--kui-font-sans); }
.kui-pipe__step {
  flex: 1; min-width: 0; padding: 12px 14px;
  background: var(--kui-surface-1); border: 1px solid var(--kui-border);
  position: relative; display: flex; flex-direction: column; gap: 4px;
}
.kui-pipe__step:first-child { border-radius: 8px 0 0 8px; }
.kui-pipe__step:last-child { border-radius: 0 8px 8px 0; }
.kui-pipe__step + .kui-pipe__step { border-left: none; }
.kui-pipe__step::after {
  content: ''; position: absolute; right: -10px; top: 50%; transform: translateY(-50%) rotate(45deg);
  width: 18px; height: 18px;
  background: var(--kui-surface-1);
  border-top: 1px solid var(--kui-border); border-right: 1px solid var(--kui-border);
  z-index: 1;
}
.kui-pipe__step:last-child::after { display: none; }
.kui-pipe__step[data-state="done"] { background: var(--kui-success-soft); border-color: var(--kui-success-soft); }
.kui-pipe__step[data-state="done"]::after { background: var(--kui-success-soft); border-color: var(--kui-success-soft); }
.kui-pipe__step[data-state="active"] { background: var(--kui-accent-soft); border-color: var(--kui-accent); box-shadow: 0 0 0 2px var(--kui-accent-soft); z-index: 2; }
.kui-pipe__step[data-state="active"]::after { background: var(--kui-accent-soft); border-color: var(--kui-accent); }
.kui-pipe__step[data-state="failed"] { background: var(--kui-danger-soft); border-color: var(--kui-danger-soft); }
.kui-pipe__step[data-state="failed"]::after { background: var(--kui-danger-soft); border-color: var(--kui-danger-soft); }
.kui-pipe__num {
  font-size: 10px; font-family: var(--kui-font-mono); font-weight: 600;
  color: var(--kui-fg-subtle); text-transform: uppercase; letter-spacing: 1px;
  display: flex; align-items: center; gap: 6px;
}
.kui-pipe__name { font-size: 13px; font-weight: 600; color: var(--kui-fg); }
.kui-pipe__meta { font-size: 11px; color: var(--kui-fg-muted); font-family: var(--kui-font-mono); }

/* Vertical node graph */
.kui-flow { font-family: var(--kui-font-mono); font-size: 12px; }
.kui-flow__node {
  background: var(--kui-surface-1); border: 1px solid var(--kui-border);
  border-radius: 7px; padding: 8px 12px;
  display: inline-flex; align-items: center; gap: 8px;
  box-shadow: var(--kui-shadow-1);
  color: var(--kui-fg);
}
.kui-flow__node[data-tone="accent"] { border-color: var(--kui-accent); background: var(--kui-accent-soft); color: var(--kui-accent); }
.kui-flow__node[data-tone="success"] { border-color: var(--kui-success); background: var(--kui-success-soft); color: var(--kui-success); }
.kui-flow__dot { width: 8px; height: 8px; border-radius: 50%; background: currentColor; flex-shrink: 0; }
`;
if (!document.getElementById('kui-pipe-styles')) {
  const s = document.createElement('style'); s.id = 'kui-pipe-styles'; s.textContent = pipeCSS;
  document.head.appendChild(s);
}

function KuiPipeline({ steps = [] }) {
  return (
    <div className="kui-pipe">
      {steps.map((s, i) => (
        <div key={i} className="kui-pipe__step" data-state={s.state || 'pending'}>
          <div className="kui-pipe__num">
            {s.state === 'done' && <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8.5l3 3 7-7"/></svg>}
            {s.state === 'failed' && <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4l8 8M12 4l-8 8"/></svg>}
            Stage {String(i + 1).padStart(2, '0')}
          </div>
          <div className="kui-pipe__name">{s.name}</div>
          {s.meta && <div className="kui-pipe__meta">{s.meta}</div>}
        </div>
      ))}
    </div>
  );
}

// Engineering visual: status grid (heatmap-like)
function KuiStatusGrid({ cells = [], cols = 24, rows = 7, size = 12, gap = 3, labels }) {
  const total = cols * rows;
  const arr = cells.slice(0, total);
  while (arr.length < total) arr.push(0);
  const color = (v) => v === 0 ? 'var(--kui-surface-3)'
    : v < 0.33 ? 'var(--kui-accent-soft)'
    : v < 0.66 ? 'var(--kui-accent)'
    : 'var(--kui-accent-active)';
  return (
    <div style={{ fontFamily: 'var(--kui-font-mono)', fontSize: 10 }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, ${size}px)`,
        gridAutoRows: `${size}px`, gap,
      }}>
        {arr.map((v, i) => (
          <div key={i} style={{ background: color(v), borderRadius: 2 }} />
        ))}
      </div>
      {labels && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, color: 'var(--kui-fg-subtle)' }}>
          {labels.map(l => <span key={l}>{l}</span>)}
        </div>
      )}
    </div>
  );
}

// Engineering visual: terminal log panel
function KuiLogPanel({ lines = [] }) {
  return (
    <div style={{
      background: 'var(--kui-surface-1)',
      border: '1px solid var(--kui-border)',
      borderRadius: 8, padding: 12,
      fontFamily: 'var(--kui-font-mono)', fontSize: 11.5,
      lineHeight: 1.6, color: 'var(--kui-fg-muted)',
      maxHeight: 180, overflow: 'auto',
    }}>
      {lines.map((l, i) => (
        <div key={i} style={{ display: 'flex', gap: 10 }}>
          <span style={{ color: 'var(--kui-fg-subtle)' }}>{String(i + 1).padStart(3, '0')}</span>
          <span style={{ color: l.tone ? `var(--kui-${l.tone})` : 'var(--kui-fg-subtle)', width: 52 }}>[{l.level || 'INFO'}]</span>
          <span style={{ flex: 1 }}>{l.msg}</span>
        </div>
      ))}
    </div>
  );
}

Object.assign(window, { KuiPipeline, KuiStatusGrid, KuiLogPanel });
