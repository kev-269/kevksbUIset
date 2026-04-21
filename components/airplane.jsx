// Airplane animations — blueprint reveal, flight route loader, paper airplane success

const airplaneCSS = `
@keyframes kui-plane-drift {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-2px); }
}
@keyframes kui-dash {
  to { stroke-dashoffset: -20; }
}
@keyframes kui-fade-reveal {
  0% { opacity: 0; transform: translateY(4px); }
  100% { opacity: 1; transform: translateY(0); }
}
@keyframes kui-pulse-dot {
  0%, 100% { opacity: 0.3; r: 3; }
  50% { opacity: 1; r: 4; }
}
@keyframes kui-contrail {
  0% { stroke-dashoffset: 200; opacity: 0; }
  20% { opacity: 0.6; }
  100% { stroke-dashoffset: 0; opacity: 0; }
}

.kui-blueprint {
  background: var(--kui-surface-1);
  border: 1px solid var(--kui-border);
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  font-family: var(--kui-font-mono);
}
.kui-blueprint__grid {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(var(--kui-border) 1px, transparent 1px),
    linear-gradient(90deg, var(--kui-border) 1px, transparent 1px);
  background-size: 24px 24px;
  opacity: 0.4;
  mask-image: radial-gradient(ellipse at center, black 50%, transparent 85%);
}
.kui-blueprint__title {
  position: absolute; top: 12px; left: 14px;
  font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase;
  color: var(--kui-fg-subtle); z-index: 2;
}
.kui-blueprint__stamp {
  position: absolute; bottom: 12px; right: 14px;
  font-size: 9px; letter-spacing: 1px; color: var(--kui-fg-subtle); z-index: 2;
  display: flex; align-items: center; gap: 6px;
}
.kui-blueprint__stamp::before {
  content: ''; width: 6px; height: 6px; border-radius: 50%;
  background: var(--kui-success); animation: kui-pulse-dot 1.6s infinite;
}

.kui-plane-svg { position: relative; z-index: 1; }
.kui-plane-svg .plane-body { stroke: var(--kui-fg); }
.kui-plane-svg .plane-accent { stroke: var(--kui-accent); }
.kui-plane-svg .plane-dim { stroke: var(--kui-fg-subtle); stroke-dasharray: 3 3; }
.kui-plane-svg text { font-family: var(--kui-font-mono); fill: var(--kui-fg-subtle); font-size: 9px; letter-spacing: 0.5px; }

.kui-plane-svg .reveal-1 { animation: kui-fade-reveal 600ms 0ms both; }
.kui-plane-svg .reveal-2 { animation: kui-fade-reveal 600ms 200ms both; }
.kui-plane-svg .reveal-3 { animation: kui-fade-reveal 600ms 400ms both; }
.kui-plane-svg .reveal-4 { animation: kui-fade-reveal 600ms 600ms both; }
.kui-plane-svg .reveal-5 { animation: kui-fade-reveal 600ms 800ms both; }
.kui-plane-svg .drift { animation: kui-plane-drift 3.6s ease-in-out infinite; transform-origin: center; transform-box: fill-box; }

/* Flight route loader */
.kui-route {
  background: var(--kui-surface-1);
  border: 1px solid var(--kui-border);
  border-radius: 10px;
  padding: 18px 20px;
  font-family: var(--kui-font-sans);
  position: relative;
}
.kui-route__meta {
  display: flex; justify-content: space-between; align-items: baseline;
  margin-bottom: 14px;
}
.kui-route__city { font-size: 20px; font-weight: 600; color: var(--kui-fg); letter-spacing: -0.5px; }
.kui-route__code { font-family: var(--kui-font-mono); font-size: 10px; color: var(--kui-fg-subtle); letter-spacing: 1.5px; text-transform: uppercase; margin-top: 2px; }
.kui-route__svg { display: block; width: 100%; }
.kui-route__info {
  display: flex; justify-content: space-between;
  margin-top: 12px;
  font-family: var(--kui-font-mono); font-size: 11px; color: var(--kui-fg-muted);
}
.kui-route__info strong { color: var(--kui-fg); font-weight: 600; }
.kui-route .route-track { stroke: var(--kui-border-strong); stroke-dasharray: 4 4; fill: none; }
.kui-route .route-trail { stroke: var(--kui-accent); fill: none; stroke-linecap: round; }
.kui-route .route-node { fill: var(--kui-surface-1); stroke: var(--kui-fg); stroke-width: 2; }
.kui-route .route-node-done { fill: var(--kui-accent); stroke: var(--kui-accent); }
.kui-route .route-plane { fill: var(--kui-accent); stroke: var(--kui-bg); stroke-width: 1.5; }

/* Paper airplane success */
.kui-paper {
  background: var(--kui-surface-1);
  border: 1px solid var(--kui-border);
  border-radius: 10px;
  padding: 28px 20px;
  text-align: center;
  font-family: var(--kui-font-sans);
  position: relative;
  overflow: hidden;
}
.kui-paper__svg { margin-bottom: 14px; }
.kui-paper__contrail { stroke: var(--kui-accent); stroke-width: 1.5; stroke-dasharray: 4 6; fill: none; stroke-linecap: round; animation: kui-contrail 2.4s ease-out infinite; }
.kui-paper__plane { fill: var(--kui-accent); animation: kui-plane-drift 2.4s ease-in-out infinite; transform-origin: center; transform-box: fill-box; }
.kui-paper__title { font-size: 15px; font-weight: 600; color: var(--kui-fg); margin-bottom: 4px; }
.kui-paper__sub { font-size: 12px; color: var(--kui-fg-muted); font-family: var(--kui-font-mono); }
.kui-paper__burst {
  position: absolute; width: 4px; height: 4px; border-radius: 50%;
  background: var(--kui-accent); opacity: 0;
  animation: kui-fade-reveal 800ms infinite;
}

/* HUD / radar-sweep variant */
.kui-hud {
  background: var(--kui-surface-1);
  border: 1px solid var(--kui-border);
  border-radius: 10px;
  padding: 16px;
  font-family: var(--kui-font-mono);
  position: relative;
  overflow: hidden;
}
.kui-hud__header {
  display: flex; justify-content: space-between; align-items: center;
  font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase;
  color: var(--kui-fg-subtle); margin-bottom: 10px;
}
.kui-hud__header strong { color: var(--kui-accent); }
.kui-hud svg { display: block; margin: 0 auto; }
.kui-hud .hud-ring { fill: none; stroke: var(--kui-border-strong); }
.kui-hud .hud-ring-accent { fill: none; stroke: var(--kui-accent); stroke-width: 1.5; }
.kui-hud .hud-cross { stroke: var(--kui-border); stroke-dasharray: 2 3; }
.kui-hud .hud-plane { fill: var(--kui-accent); }
.kui-hud .hud-sweep { fill: url(#hud-sweep-grad); transform-origin: 90px 90px; animation: hud-sweep 3.2s linear infinite; }
@keyframes hud-sweep { to { transform: rotate(360deg); } }
.kui-hud__stats {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;
  margin-top: 12px; font-size: 10px;
}
.kui-hud__stat { text-align: center; }
.kui-hud__stat-label { color: var(--kui-fg-subtle); letter-spacing: 1px; text-transform: uppercase; font-size: 9px; }
.kui-hud__stat-val { color: var(--kui-fg); font-size: 14px; font-weight: 600; margin-top: 2px; }
.kui-hud__stat-val span { color: var(--kui-accent); }
`;

if (!document.getElementById('kui-airplane-styles')) {
  const s = document.createElement('style'); s.id = 'kui-airplane-styles'; s.textContent = airplaneCSS;
  document.head.appendChild(s);
}

// Blueprint reveal — schematic line-art plane with labeled dimensions
function KuiBlueprintPlane({ width = 460, height = 280 }) {
  const [key, setKey] = React.useState(0);
  // re-mount on click to replay animation
  return (
    <div className="kui-blueprint" style={{ width, height, cursor: 'pointer' }} onClick={() => setKey(k => k + 1)}>
      <div className="kui-blueprint__grid" />
      <div className="kui-blueprint__title">SCHEMATIC · K-07 AIRFRAME</div>
      <div className="kui-blueprint__stamp">LIVE · REV 04.21.26</div>
      <svg key={key} className="kui-plane-svg" width={width} height={height} viewBox="0 0 460 280">
        <defs>
          <marker id="bp-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="currentColor" />
          </marker>
        </defs>
        <g className="drift">
          {/* Fuselage (top view) */}
          <g className="reveal-1">
            <path className="plane-body" d="M 70 140 Q 90 132 140 130 L 320 130 Q 370 132 395 136 Q 405 138 405 140 Q 405 142 395 144 L 320 150 Q 140 150 140 150 Q 90 148 70 140 Z"
              fill="var(--kui-surface-3)" stroke="var(--kui-fg)" strokeWidth="1.5" strokeLinejoin="round"/>
          </g>
          {/* Wings */}
          <g className="reveal-2">
            <path className="plane-body" d="M 210 138 L 160 90 L 180 88 L 240 136 Z"
              fill="var(--kui-accent-soft)" stroke="var(--kui-accent)" strokeWidth="1.5" strokeLinejoin="round"/>
            <path className="plane-body" d="M 210 142 L 160 190 L 180 192 L 240 144 Z"
              fill="var(--kui-accent-soft)" stroke="var(--kui-accent)" strokeWidth="1.5" strokeLinejoin="round"/>
          </g>
          {/* Tail */}
          <g className="reveal-3">
            <path className="plane-body" d="M 355 138 L 335 110 L 345 108 L 370 136 Z"
              fill="var(--kui-surface-3)" stroke="var(--kui-fg)" strokeWidth="1.5" strokeLinejoin="round"/>
            <path className="plane-body" d="M 355 142 L 335 170 L 345 172 L 370 144 Z"
              fill="var(--kui-surface-3)" stroke="var(--kui-fg)" strokeWidth="1.5" strokeLinejoin="round"/>
          </g>
          {/* Windows */}
          <g className="reveal-4" fill="var(--kui-fg-subtle)">
            {Array.from({ length: 16 }).map((_, i) => (
              <circle key={i} cx={150 + i * 12} cy={140} r={1.2} />
            ))}
            <circle cx="95" cy="140" r="2.5" fill="var(--kui-accent)"/>
          </g>
        </g>
        {/* Dimension lines with labels */}
        <g className="reveal-5" style={{ color: 'var(--kui-fg-subtle)' }}>
          <line className="plane-dim" x1="70" y1="230" x2="405" y2="230" stroke="currentColor"/>
          <line x1="70" y1="226" x2="70" y2="234" stroke="currentColor"/>
          <line x1="405" y1="226" x2="405" y2="234" stroke="currentColor"/>
          <text x="237" y="225" textAnchor="middle">L · 38.4m</text>

          <line className="plane-dim" x1="430" y1="88" x2="430" y2="192" stroke="currentColor"/>
          <line x1="426" y1="88" x2="434" y2="88" stroke="currentColor"/>
          <line x1="426" y1="192" x2="434" y2="192" stroke="currentColor"/>
          <text x="430" y="145" textAnchor="middle" transform="rotate(90 430 145)">W · 34.1m</text>

          <line className="plane-dim" x1="160" y1="60" x2="240" y2="60" stroke="currentColor"/>
          <text x="200" y="54" textAnchor="middle">WING ROOT 6.2m</text>

          <circle cx="95" cy="140" r="12" fill="none" stroke="var(--kui-accent)" strokeWidth="1" strokeDasharray="2 2"/>
          <text x="40" y="143" fill="var(--kui-accent)">COCKPIT</text>
        </g>
      </svg>
    </div>
  );
}

// Flight-route loader — origin → destination with moving plane
function KuiFlightRoute({ progress: propProg, width = 460 }) {
  const [prog, setProg] = React.useState(0);
  React.useEffect(() => {
    if (propProg !== undefined) { setProg(propProg); return; }
    let raf, start;
    const tick = (t) => {
      if (!start) start = t;
      const p = ((t - start) / 4000) % 1;
      setProg(p);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [propProg]);

  // arc path from (40, 110) through apex (230, 30) to (420, 110)
  const pathRef = React.useRef();
  const [pt, setPt] = React.useState({ x: 40, y: 110, angle: 0 });
  React.useEffect(() => {
    if (!pathRef.current) return;
    const len = pathRef.current.getTotalLength();
    const p1 = pathRef.current.getPointAtLength(len * prog);
    const p2 = pathRef.current.getPointAtLength(Math.min(len, len * prog + 1));
    const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
    setPt({ x: p1.x, y: p1.y, angle });
  }, [prog]);

  const miles = 2408;
  const eta = Math.max(0, Math.round((1 - prog) * 312));
  const hours = Math.floor(eta / 60);
  const mins = eta % 60;

  return (
    <div className="kui-route" style={{ width }}>
      <div className="kui-route__meta">
        <div>
          <div className="kui-route__city">SFO</div>
          <div className="kui-route__code">San Francisco</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="kui-route__city">JFK</div>
          <div className="kui-route__code">New York</div>
        </div>
      </div>
      <svg className="kui-route__svg" viewBox="0 0 460 140" height="140">
        <path ref={pathRef} className="route-track" d="M 40 110 Q 230 10 420 110" strokeWidth="1.5"/>
        <path className="route-trail"
          d="M 40 110 Q 230 10 420 110"
          strokeWidth="2.5"
          strokeDasharray="600"
          strokeDashoffset={600 * (1 - prog)}/>
        <circle className="route-node-done" cx="40" cy="110" r="5"/>
        <circle className={prog >= 1 ? 'route-node-done' : 'route-node'} cx="420" cy="110" r="5"/>
        <g transform={`translate(${pt.x} ${pt.y}) rotate(${pt.angle})`}>
          <path className="route-plane" d="M -10 0 L 8 -5 L 10 -1 L 10 1 L 8 5 Z M 0 0 L -4 -6 L -6 -6 L -3 0 L -6 6 L -4 6 Z"/>
        </g>
      </svg>
      <div className="kui-route__info">
        <span><strong>{Math.round(prog * miles)}</strong> / {miles} mi</span>
        <span>ETA <strong>{hours}h {String(mins).padStart(2, '0')}m</strong></span>
        <span>ALT <strong>36,000 ft</strong></span>
      </div>
    </div>
  );
}

// Paper airplane success flourish
function KuiPaperAirplane({ width = 320 }) {
  const [key, setKey] = React.useState(0);
  return (
    <div className="kui-paper" style={{ width, cursor: 'pointer' }} onClick={() => setKey(k => k + 1)}>
      <svg key={key} className="kui-paper__svg" viewBox="0 0 220 90" width="220" height="90">
        <path className="kui-paper__contrail" d="M 10 70 Q 70 55 120 45 T 210 25"/>
        <g transform="translate(170 28)">
          <g className="kui-paper__plane">
            <path d="M 0 0 L 36 -10 L 26 0 L 36 10 Z" />
            <path d="M 12 0 L 26 -6 L 26 6 Z" fill="var(--kui-accent-strong)" opacity="0.6"/>
          </g>
        </g>
      </svg>
      <div className="kui-paper__title">Message sent</div>
      <div className="kui-paper__sub">Delivered to 3 recipients · just now</div>
    </div>
  );
}

// HUD / radar — rotating sweep with plane
function KuiPlaneHUD({ width = 240 }) {
  return (
    <div className="kui-hud" style={{ width }}>
      <div className="kui-hud__header">
        <span>RADAR · NAV</span>
        <strong>● LIVE</strong>
      </div>
      <svg viewBox="0 0 180 180" width="180" height="180">
        <defs>
          <radialGradient id="hud-sweep-grad">
            <stop offset="0%" stopColor="var(--kui-accent)" stopOpacity="0.35"/>
            <stop offset="100%" stopColor="var(--kui-accent)" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <circle className="hud-ring" cx="90" cy="90" r="80" strokeWidth="1"/>
        <circle className="hud-ring" cx="90" cy="90" r="55" strokeWidth="1"/>
        <circle className="hud-ring" cx="90" cy="90" r="30" strokeWidth="1"/>
        <line className="hud-cross" x1="90" y1="10" x2="90" y2="170" strokeWidth="1"/>
        <line className="hud-cross" x1="10" y1="90" x2="170" y2="90" strokeWidth="1"/>
        <path className="hud-sweep" d="M 90 90 L 90 10 A 80 80 0 0 1 160 50 Z"/>
        <g className="hud-plane" transform="translate(90 90) rotate(-30)">
          <path d="M 0 -10 L 14 6 L 3 3 L 3 10 L -3 10 L -3 3 L -14 6 Z"/>
        </g>
        <circle cx="55" cy="65" r="2" fill="var(--kui-fg-muted)"/>
        <circle cx="130" cy="110" r="2" fill="var(--kui-fg-muted)"/>
        <circle cx="115" cy="50" r="1.5" fill="var(--kui-fg-subtle)"/>
      </svg>
      <div className="kui-hud__stats">
        <div className="kui-hud__stat">
          <div className="kui-hud__stat-label">HDG</div>
          <div className="kui-hud__stat-val"><span>087</span>°</div>
        </div>
        <div className="kui-hud__stat">
          <div className="kui-hud__stat-label">ALT</div>
          <div className="kui-hud__stat-val">36k</div>
        </div>
        <div className="kui-hud__stat">
          <div className="kui-hud__stat-label">SPD</div>
          <div className="kui-hud__stat-val">478<span>kt</span></div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { KuiBlueprintPlane, KuiFlightRoute, KuiPaperAirplane, KuiPlaneHUD });
