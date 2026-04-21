// Kev-UI Charts — pure SVG, no deps. Bar, line, area, donut, sparkline, gauge.

function KuiSparkline({ data = [], width = 120, height = 32, tone = 'accent' }) {
  if (!data.length) return null;
  const max = Math.max(...data), min = Math.min(...data);
  const range = max - min || 1;
  const step = width / (data.length - 1);
  const pts = data.map((v, i) => [i * step, height - ((v - min) / range) * (height - 4) - 2]);
  const d = pts.map((p, i) => (i === 0 ? 'M' : 'L') + p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
  const a = `${d} L${width},${height} L0,${height} Z`;
  const color = `var(--kui-${tone})`;
  const id = React.useId();
  return (
    <svg width={width} height={height} style={{ display: 'block' }}>
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity="0.25" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={a} fill={`url(#${id})`} />
      <path d={d} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function KuiBarChart({ data = [], width = 320, height = 160, tone = 'accent' }) {
  const max = Math.max(...data.map(d => d.value));
  const pad = { l: 28, r: 8, t: 8, b: 22 };
  const iw = width - pad.l - pad.r, ih = height - pad.t - pad.b;
  const bw = iw / data.length * 0.6;
  const gap = iw / data.length * 0.4;
  const color = `var(--kui-${tone})`;
  return (
    <svg width={width} height={height} style={{ display: 'block', fontFamily: 'var(--kui-font-mono)' }}>
      {[0, 0.5, 1].map(t => (
        <g key={t}>
          <line x1={pad.l} x2={width - pad.r} y1={pad.t + ih * t} y2={pad.t + ih * t}
            stroke="var(--kui-divider)" strokeDasharray={t === 1 ? '' : '2 3'} />
          <text x={pad.l - 6} y={pad.t + ih * t + 3} fontSize="9" textAnchor="end" fill="var(--kui-fg-subtle)">
            {Math.round(max * (1 - t))}
          </text>
        </g>
      ))}
      {data.map((d, i) => {
        const h = (d.value / max) * ih;
        const x = pad.l + i * (bw + gap) + gap / 2;
        const y = pad.t + ih - h;
        return (
          <g key={i}>
            <rect x={x} y={y} width={bw} height={h} rx="2" fill={color} opacity={d.highlight ? 1 : 0.75} />
            <text x={x + bw / 2} y={height - 7} fontSize="10" textAnchor="middle" fill="var(--kui-fg-subtle)">{d.label}</text>
          </g>
        );
      })}
    </svg>
  );
}

function KuiLineChart({ series = [], width = 380, height = 180, showArea = true }) {
  const all = series.flatMap(s => s.data);
  const max = Math.max(...all), min = Math.min(...all);
  const pad = { l: 32, r: 10, t: 10, b: 24 };
  const iw = width - pad.l - pad.r, ih = height - pad.t - pad.b;
  const n = series[0]?.data.length || 0;
  const step = iw / (n - 1 || 1);
  const toPt = (v, i) => [pad.l + i * step, pad.t + ih - ((v - min) / (max - min || 1)) * ih];
  const tones = ['accent', 'success', 'warning'];
  const id = React.useId();
  return (
    <svg width={width} height={height} style={{ display: 'block', fontFamily: 'var(--kui-font-mono)' }}>
      {[0, 0.25, 0.5, 0.75, 1].map(t => (
        <line key={t} x1={pad.l} x2={width - pad.r} y1={pad.t + ih * t} y2={pad.t + ih * t}
          stroke="var(--kui-divider)" strokeDasharray={t === 1 ? '' : '2 3'} />
      ))}
      {[0, 0.5, 1].map(t => (
        <text key={t} x={pad.l - 6} y={pad.t + ih * t + 3} fontSize="9" textAnchor="end" fill="var(--kui-fg-subtle)">
          {(max - (max - min) * t).toFixed(0)}
        </text>
      ))}
      <defs>
        {series.map((s, si) => (
          <linearGradient key={si} id={id + si} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor={`var(--kui-${tones[si]})`} stopOpacity="0.22" />
            <stop offset="1" stopColor={`var(--kui-${tones[si]})`} stopOpacity="0" />
          </linearGradient>
        ))}
      </defs>
      {series.map((s, si) => {
        const pts = s.data.map(toPt);
        const d = pts.map((p, i) => (i === 0 ? 'M' : 'L') + p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
        const area = `${d} L${pad.l + (n-1) * step},${pad.t + ih} L${pad.l},${pad.t + ih} Z`;
        const color = `var(--kui-${tones[si]})`;
        return (
          <g key={si}>
            {showArea && <path d={area} fill={`url(#${id + si})`} />}
            <path d={d} fill="none" stroke={color} strokeWidth="1.75" strokeLinejoin="round" strokeLinecap="round" />
          </g>
        );
      })}
    </svg>
  );
}

function KuiDonut({ data = [], size = 140, thickness = 18, label }) {
  const total = data.reduce((a, d) => a + d.value, 0);
  const r = size / 2 - thickness / 2;
  const c = size / 2;
  const circ = 2 * Math.PI * r;
  let off = 0;
  const tones = ['accent', 'success', 'warning', 'danger'];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontFamily: 'var(--kui-font-sans)' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={c} cy={c} r={r} fill="none" stroke="var(--kui-surface-3)" strokeWidth={thickness} />
        {data.map((d, i) => {
          const frac = d.value / total;
          const seg = <circle key={i} cx={c} cy={c} r={r} fill="none"
            stroke={`var(--kui-${d.tone || tones[i]})`} strokeWidth={thickness}
            strokeDasharray={`${frac * circ} ${circ}`}
            strokeDashoffset={-off * circ} />;
          off += frac;
          return seg;
        })}
      </svg>
      <div style={{ fontSize: 12, color: 'var(--kui-fg-muted)' }}>
        {label && <div style={{ fontSize: 11, color: 'var(--kui-fg-subtle)', marginBottom: 4, fontFamily: 'var(--kui-font-mono)', textTransform: 'uppercase', letterSpacing: 0.8 }}>{label}</div>}
        {data.map((d, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '3px 0' }}>
            <span style={{ width: 8, height: 8, borderRadius: 2, background: `var(--kui-${d.tone || tones[i]})` }} />
            <span style={{ flex: 1, color: 'var(--kui-fg)' }}>{d.label}</span>
            <span style={{ fontFamily: 'var(--kui-font-mono)', color: 'var(--kui-fg-muted)' }}>{((d.value/total)*100).toFixed(0)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function KuiGauge({ value = 0, max = 100, size = 140, label, unit, tone = 'accent' }) {
  const r = size / 2 - 14;
  const c = size / 2;
  const frac = Math.min(1, value / max);
  const circ = Math.PI * r; // semicircle
  return (
    <div style={{ textAlign: 'center', fontFamily: 'var(--kui-font-sans)' }}>
      <svg width={size} height={size / 2 + 10}>
        <path d={`M ${c - r},${c} A ${r},${r} 0 0 1 ${c + r},${c}`} fill="none" stroke="var(--kui-surface-3)" strokeWidth="10" strokeLinecap="round" />
        <path d={`M ${c - r},${c} A ${r},${r} 0 0 1 ${c + r},${c}`} fill="none"
          stroke={`var(--kui-${tone})`} strokeWidth="10" strokeLinecap="round"
          strokeDasharray={`${frac * circ} ${circ}`} />
      </svg>
      <div style={{ fontSize: 22, fontWeight: 600, color: 'var(--kui-fg)', fontFamily: 'var(--kui-font-mono)', marginTop: -14 }}>
        {value}<span style={{ fontSize: 13, color: 'var(--kui-fg-muted)', marginLeft: 2 }}>{unit}</span>
      </div>
      {label && <div style={{ fontSize: 11, color: 'var(--kui-fg-subtle)', fontFamily: 'var(--kui-font-mono)', textTransform: 'uppercase', letterSpacing: 0.8 }}>{label}</div>}
    </div>
  );
}

function KuiTimeSeries({ data = [], width = 460, height = 200, tone = 'accent' }) {
  const max = Math.max(...data.map(d => d.value));
  const min = Math.min(...data.map(d => d.value));
  const pad = { l: 36, r: 10, t: 14, b: 24 };
  const iw = width - pad.l - pad.r, ih = height - pad.t - pad.b;
  const step = iw / (data.length - 1 || 1);
  const pts = data.map((d, i) => [pad.l + i * step, pad.t + ih - ((d.value - min) / (max - min || 1)) * ih]);
  const path = pts.map((p, i) => (i === 0 ? 'M' : 'L') + p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
  const area = `${path} L${pts[pts.length-1][0]},${pad.t + ih} L${pts[0][0]},${pad.t + ih} Z`;
  const color = `var(--kui-${tone})`;
  const id = React.useId();
  const xticks = data.filter((_, i) => i % Math.ceil(data.length / 6) === 0);
  return (
    <svg width={width} height={height} style={{ display: 'block', fontFamily: 'var(--kui-font-mono)' }}>
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity="0.25" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 0.25, 0.5, 0.75, 1].map(t => (
        <g key={t}>
          <line x1={pad.l} x2={width - pad.r} y1={pad.t + ih * t} y2={pad.t + ih * t}
            stroke="var(--kui-divider)" strokeDasharray={t === 1 ? '' : '2 3'} />
          <text x={pad.l - 6} y={pad.t + ih * t + 3} fontSize="9" textAnchor="end" fill="var(--kui-fg-subtle)">
            {(max - (max - min) * t).toFixed(0)}
          </text>
        </g>
      ))}
      <path d={area} fill={`url(#${id})`} />
      <path d={path} fill="none" stroke={color} strokeWidth="1.75" strokeLinejoin="round" />
      {xticks.map((d, i) => {
        const idx = data.indexOf(d);
        return <text key={i} x={pad.l + idx * step} y={height - 8} fontSize="9" textAnchor="middle" fill="var(--kui-fg-subtle)">{d.label}</text>;
      })}
    </svg>
  );
}

Object.assign(window, { KuiSparkline, KuiBarChart, KuiLineChart, KuiDonut, KuiGauge, KuiTimeSeries });
