// Landing / showcase shell. Provides:
//   - A polished hero with theme toggle + install snippet
//   - A sidebar section nav
//   - Mounts every section artboard (reused from components/sectionsN.jsx)

const showcaseCSS = `
.kui-showcase { min-height: 100vh; background: var(--kui-bg); color: var(--kui-fg); font-family: var(--kui-font-sans); }

.kui-top {
  position: sticky; top: 0; z-index: 20;
  height: 56px; padding: 0 24px;
  display: flex; align-items: center; gap: 16px;
  border-bottom: 1px solid var(--kui-divider);
  background: color-mix(in oklab, var(--kui-bg) 92%, transparent);
  backdrop-filter: blur(10px);
}
.kui-top__logo { display: flex; align-items: center; gap: 10px; font-weight: 700; font-size: 16px; letter-spacing: -0.3px; }
.kui-top__mark { width: 28px; height: 28px; border-radius: 7px; background: var(--kui-accent); display: grid; place-items: center; color: #fff; font-weight: 700; font-size: 14px; }
.kui-top__tag { font-family: var(--kui-font-mono); font-size: 11px; color: var(--kui-fg-subtle); padding: 3px 7px; border: 1px solid var(--kui-border); border-radius: 5px; }
.kui-top__spacer { flex: 1; }
.kui-top__link { font-size: 13px; color: var(--kui-fg-muted); text-decoration: none; padding: 6px 10px; border-radius: 6px; }
.kui-top__link:hover { background: var(--kui-surface-hover); color: var(--kui-fg); }

.kui-hero {
  padding: 110px 24px 90px;
  text-align: center;
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid var(--kui-divider);
  isolation: isolate;
}
.kui-hero__bg {
  position: absolute; inset: 0; z-index: -2;
  background-image: url('https://t4.ftcdn.net/jpg/02/78/60/17/360_F_278601799_FpEDSBkfaVP61ro7mtjIXwGkTH5gbAph.jpg');
  background-size: cover; background-position: center;
  filter: saturate(0.7) contrast(1.05);
}
.kui-hero__bg::after {
  content: ''; position: absolute; inset: 0;
  background:
    radial-gradient(ellipse at top, transparent 0%, var(--kui-bg) 85%),
    linear-gradient(180deg, color-mix(in oklab, var(--kui-bg) 55%, transparent) 0%, var(--kui-bg) 100%);
}
[data-theme="dark"] .kui-hero__bg { filter: saturate(0.6) contrast(1.1) brightness(0.6); }
.kui-hero__grid {
  position: absolute; inset: 0; z-index: -1; pointer-events: none;
  background-image:
    linear-gradient(var(--kui-border) 1px, transparent 1px),
    linear-gradient(90deg, var(--kui-border) 1px, transparent 1px);
  background-size: 32px 32px;
  opacity: 0.25;
  mask-image: radial-gradient(ellipse at center, black 20%, transparent 75%);
}
.kui-hero__inner { max-width: 1100px; margin: 0 auto; position: relative; }
.kui-hero__kicker {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: var(--kui-font-mono); font-size: 11px;
  color: var(--kui-accent); letter-spacing: 2px; text-transform: uppercase;
  padding: 5px 10px; border: 1px solid var(--kui-border); border-radius: 999px;
  background: var(--kui-accent-soft);
}
.kui-hero__title {
  font-size: 64px; font-weight: 700; letter-spacing: -1.8px;
  line-height: 1.05; margin: 18px 0 14px;
}
.kui-hero__title span { color: var(--kui-accent); }
.kui-hero__sub {
  font-size: 17px; color: var(--kui-fg-muted); max-width: 640px; margin: 0 auto;
  line-height: 1.55;
}
.kui-hero__cta { margin-top: 26px; display: flex; gap: 10px; justify-content: center; }

.kui-hero__snippet {
  margin: 28px auto 0; max-width: 520px;
  background: var(--kui-surface-1); border: 1px solid var(--kui-border);
  border-radius: 9px; text-align: left;
  font-family: var(--kui-font-mono); font-size: 12px; color: var(--kui-fg-muted);
  display: flex; align-items: center; gap: 10px; padding: 10px 12px;
}
.kui-hero__snippet span { color: var(--kui-accent); }

.kui-stats-strip {
  max-width: 1100px; margin: 32px auto 0; padding: 0 24px;
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px;
  background: var(--kui-border);
  border: 1px solid var(--kui-border); border-radius: 9px; overflow: hidden;
}
.kui-stats-strip > div { background: var(--kui-surface-1); padding: 18px 20px; }
.kui-stats-strip__n { font-size: 26px; font-weight: 700; letter-spacing: -0.6px; }
.kui-stats-strip__n span { color: var(--kui-accent); }
.kui-stats-strip__l { font-size: 11px; font-family: var(--kui-font-mono); color: var(--kui-fg-subtle); text-transform: uppercase; letter-spacing: 1.2px; margin-top: 2px; }

.kui-main { max-width: 1200px; margin: 64px auto 0; padding: 0 24px 80px; display: grid; grid-template-columns: 200px 1fr; gap: 40px; }
@media (max-width: 900px) { .kui-main { grid-template-columns: 1fr; } .kui-nav { display: none; } }

.kui-nav {
  position: sticky; top: 80px; align-self: start;
  display: flex; flex-direction: column; gap: 2px;
  font-size: 13px;
}
.kui-nav__head {
  font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 1.4px;
  color: var(--kui-fg-subtle); margin: 14px 8px 6px; font-family: var(--kui-font-mono);
}
.kui-nav a {
  padding: 6px 10px; border-radius: 6px;
  color: var(--kui-fg-muted); text-decoration: none;
  border-left: 2px solid transparent;
  display: flex; align-items: center; justify-content: space-between;
}
.kui-nav a:hover { background: var(--kui-surface-hover); color: var(--kui-fg); }
.kui-nav a.active { color: var(--kui-accent); border-left-color: var(--kui-accent); background: var(--kui-accent-soft); }
.kui-nav__count { font-family: var(--kui-font-mono); font-size: 10px; color: var(--kui-fg-subtle); }

.kui-group { scroll-margin-top: 80px; margin-bottom: 64px; }
.kui-group__head { display: flex; align-items: baseline; gap: 12px; margin-bottom: 6px; }
.kui-group__num { font-family: var(--kui-font-mono); font-size: 11px; color: var(--kui-fg-subtle); letter-spacing: 1.5px; }
.kui-group__title { font-size: 28px; font-weight: 700; letter-spacing: -0.6px; }
.kui-group__sub { font-size: 14px; color: var(--kui-fg-muted); margin-bottom: 22px; }

.kui-split { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
@media (max-width: 760px) { .kui-split { grid-template-columns: 1fr; } }
.kui-frame {
  border: 1px solid var(--kui-border); border-radius: 10px;
  overflow: hidden; background: var(--kui-surface-1);
  position: relative;
}
.kui-frame__chip {
  position: absolute; top: 10px; right: 10px; z-index: 2;
  font-family: var(--kui-font-mono); font-size: 10px;
  color: var(--kui-fg-subtle); letter-spacing: 1px; text-transform: uppercase;
  padding: 3px 7px; border: 1px solid var(--kui-border); border-radius: 5px;
  background: color-mix(in oklab, var(--kui-surface-1) 80%, transparent);
  backdrop-filter: blur(6px);
}
.kui-frame__body { height: 100%; }

.kui-foot {
  max-width: 1200px; margin: 0 auto; padding: 32px 24px;
  border-top: 1px solid var(--kui-divider);
  display: flex; justify-content: space-between; align-items: center;
  font-size: 12px; color: var(--kui-fg-subtle); font-family: var(--kui-font-mono);
}

.kui-theme-toggle {
  display: inline-flex; padding: 2px; gap: 2px;
  background: var(--kui-surface-3); border: 1px solid var(--kui-border); border-radius: 7px;
}
.kui-theme-toggle button {
  border: none; background: transparent; cursor: pointer;
  padding: 4px 8px; border-radius: 5px; font-size: 12px;
  color: var(--kui-fg-muted); font-family: var(--kui-font-sans);
  display: inline-flex; align-items: center; gap: 4px;
}
.kui-theme-toggle button[data-on="true"] { background: var(--kui-surface-1); color: var(--kui-fg); box-shadow: 0 1px 2px rgba(0,0,0,0.08); }
[data-theme="dark"] .kui-theme-toggle button[data-on="true"] { background: var(--kui-surface-4); }
`;

if (!document.getElementById('kui-showcase-styles')) {
  const s = document.createElement('style'); s.id = 'kui-showcase-styles'; s.textContent = showcaseCSS;
  document.head.appendChild(s);
}

const SECTIONS = [
  { id: 'foundations', num: '01', title: 'Foundations', sub: 'Color tokens, type scale, radius, and spacing', L: (p) => <ColorsArtboard {...p}/>, R: (p) => <FoundationsArtboard {...p}/> },
  { id: 'button', num: '02', title: 'Buttons', sub: 'Suggested, default, destructive, flat, pill, circular', L: (p) => <ButtonGalleryArtboard {...p}/>, solo: true },
  { id: 'topbars', num: '03', title: 'Top bars', sub: 'Three variants for headers, app chrome, and marketing', L: (p) => <TopBarArtboard {...p}/>, solo: true },
  { id: 'nav', num: '04', title: 'Navigation', sub: 'Top navbar + sidebar with badges and groups', L: (p) => <NavArtboard {...p}/>, solo: true },
  { id: 'forms', num: '05', title: 'Forms', sub: 'Input, textarea, select, switch, radio, checkbox, dropzone', L: (p) => <FormsArtboard {...p}/>, solo: true },
  { id: 'table', num: '06', title: 'Data table', sub: 'Sortable, selectable, with contextual toolbar', L: (p) => <TableArtboard {...p}/>, solo: true },
  { id: 'overlays', num: '07', title: 'Overlays', sub: 'Dialog, drawer, and toast — try the buttons', L: (p) => <OverlayArtboard {...p}/>, solo: true },
  { id: 'stats', num: '08', title: 'Stats & gauges', sub: 'KPI cards with sparklines, circular gauges', L: (p) => <StatsArtboard {...p}/>, solo: true },
  { id: 'charts', num: '09', title: 'Charts', sub: 'Bar, multi-line + area, donut, and time series', L: (p) => <ChartsArtboard {...p}/>, solo: true },
  { id: 'tabs', num: '10', title: 'Tabs', sub: 'Underline indicator + pill variant', L: (p) => <TabsArtboard {...p}/>, solo: true },
  { id: 'progress', num: '11', title: 'Progress & loading', sub: 'Bar, indeterminate, spinner, dots, skeleton', L: (p) => <ProgArtboard {...p}/>, solo: true },
  { id: 'cards', num: '12', title: 'Cards & accordion', sub: 'Surface containers and disclosure panels', L: (p) => <CardsArtboard {...p}/>, solo: true },
  { id: 'badges', num: '13', title: 'Badges & tags', sub: 'Status indicators, removable tags, keyboard keys', L: (p) => <BadgesArtboard {...p}/>, solo: true },
  { id: 'carpag', num: '14', title: 'Carousel · slider · pagination', sub: 'Step through content, pick ranges, navigate pages', L: (p) => <CarPagArtboard {...p}/>, solo: true },
  { id: 'utils', num: '15', title: 'Utilities', sub: 'Copy-to-clipboard, zoom viewer, export menu', L: (p) => <UtilsArtboard {...p}/>, solo: true },
  { id: 'eng', num: '16', title: 'Engineering visuals', sub: 'Pipeline stages, activity heatmap, log panel', L: (p) => <EngArtboard {...p}/>, solo: true },
  { id: 'airplane', num: '17', title: 'Motion · airplane set', sub: 'Blueprint reveal, flight route, radar HUD, paper plane', L: (p) => <AirplaneArtboard {...p}/>, solo: true },
];

function ThemeToggle({ theme, setTheme }) {
  return (
    <div className="kui-theme-toggle">
      <button data-on={theme === 'light'} onClick={() => setTheme('light')}>
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="8" cy="8" r="3"/><path d="M8 1v2M8 13v2M1 8h2M13 8h2M3 3l1.5 1.5M11.5 11.5L13 13M3 13l1.5-1.5M11.5 4.5L13 3"/></svg>
        Light
      </button>
      <button data-on={theme === 'dark'} onClick={() => setTheme('dark')}>
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 9A5 5 0 117 3a4 4 0 006 6z"/></svg>
        Dark
      </button>
    </div>
  );
}

function SectionFrame({ theme, label, children }) {
  return (
    <div className="kui-frame">
      <div className="kui-frame__chip">{label}</div>
      <div className="kui-frame__body" data-theme={theme} style={{ background: theme === 'dark' ? '#1e1e1e' : '#fafafa' }}>
        {children}
      </div>
    </div>
  );
}

function KuiShowcase() {
  const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('kui-theme') : null;
  const [theme, setTheme] = React.useState(saved || 'light');
  const [active, setActive] = React.useState(SECTIONS[0].id);

  React.useEffect(() => { try { localStorage.setItem('kui-theme', theme); } catch(e) {} }, [theme]);

  React.useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: '-20% 0% -70% 0%' });
    SECTIONS.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="kui-scope kui-showcase" data-theme={theme}>
      {/* TOP */}
      <div className="kui-top">
        <div className="kui-top__logo" style={{ fontFamily: "'VT323', 'Share Tech Mono', monospace", fontSize: 24, letterSpacing: 2, color: 'var(--kui-accent)', textShadow: '0 0 8px color-mix(in oklab, var(--kui-accent) 40%, transparent)' }}>
          <span style={{ color: 'var(--kui-success)' }}>&gt;_</span> KEV269 UI SET
        </div>
        <div className="kui-top__spacer" />
        <a className="kui-top__link" href="Kev-UI-canvas.html">Canvas</a>
        <a className="kui-top__link" href="#foundations">Components</a>
        <a className="kui-top__link" href="https://github.com" target="_blank" rel="noreferrer">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{ verticalAlign: '-2px' }}><path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
          GitHub
        </a>
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </div>

      {/* HERO */}
      <div className="kui-hero">
        <div className="kui-hero__bg" />
        <div className="kui-hero__grid" />
        <div className="kui-hero__inner">
        <div className="kui-hero__kicker">
          <span style={{ display: 'inline-block', width: 6, height: 6, background: 'var(--kui-accent)', borderRadius: '50%' }} />
          Component library · {SECTIONS.length} sections · 40+ components
        </div>
        <h1 className="kui-hero__title">Engineering UI,<br/>built for <span>clarity</span>.</h1>
        <p className="kui-hero__sub">
          A GNOME-inspired component kit for dashboards, internal tools, and technical products.
          Adwaita blue · JetBrains Mono · pixel-restrained. Light and dark from day one.
        </p>
        <div className="kui-hero__cta">
          <a className="kui-btn kui-btn--suggested" href="#foundations">Browse components</a>
          <a className="kui-btn kui-btn--default" href="Kev-UI-canvas.html">Open design canvas</a>
        </div>
        <div className="kui-hero__snippet">
          <span>$</span> git clone https://github.com/your-org/kev-ui.git
          <span style={{ marginLeft: 'auto', color: 'var(--kui-fg-subtle)' }}>mit · zero deps</span>
        </div>
        </div>
      </div>

      {/* STATS STRIP */}
      <div className="kui-stats-strip">
        <div><div className="kui-stats-strip__n">40<span>+</span></div><div className="kui-stats-strip__l">Components</div></div>
        <div><div className="kui-stats-strip__n">2</div><div className="kui-stats-strip__l">Themes</div></div>
        <div><div className="kui-stats-strip__n">0</div><div className="kui-stats-strip__l">Build steps</div></div>
        <div><div className="kui-stats-strip__n">100<span>%</span></div><div className="kui-stats-strip__l">CSS variables</div></div>
      </div>

      {/* MAIN */}
      <div className="kui-main">
        <aside className="kui-nav">
          <div className="kui-nav__head">Sections</div>
          {SECTIONS.map(s => (
            <a key={s.id} href={'#' + s.id} className={active === s.id ? 'active' : ''}>
              <span>{s.title}</span>
              <span className="kui-nav__count">{s.num}</span>
            </a>
          ))}
        </aside>

        <main>
          {SECTIONS.map(s => (
            <section key={s.id} id={s.id} className="kui-group">
              <div className="kui-group__head">
                <span className="kui-group__num">{s.num}</span>
                <h2 className="kui-group__title">{s.title}</h2>
              </div>
              <div className="kui-group__sub">{s.sub}</div>
              {s.solo ? (
                <SectionFrame theme={theme} label={theme}>{s.L({ theme })}</SectionFrame>
              ) : (
                <div className="kui-split">
                  <SectionFrame theme={theme} label="Colors">{s.L({ theme })}</SectionFrame>
                  <SectionFrame theme={theme} label="Type · Radius · Spacing">{s.R({ theme })}</SectionFrame>
                </div>
              )}
            </section>
          ))}
        </main>
      </div>

      <div className="kui-foot">
        <span>Kev-UI · MIT · {new Date().getFullYear()}</span>
        <span>Built with plain HTML, CSS, and React.</span>
      </div>
    </div>
  );
}

Object.assign(window, { KuiShowcase });
