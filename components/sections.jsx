// Section artboards for Kev-UI.html
// Keeps Kev-UI.html small; each section renders with <Surface theme=...>.

function Surface({ theme = 'light', children, pad = 24, style = {} }) {
  return (
    <div data-theme={theme} className="kui-scope"
      style={{ padding: pad, width: '100%', height: '100%', overflow: 'hidden', ...style }}>
      {children}
    </div>
  );
}

function Row({ label, children, gap = 10 }) {
  return (
    <div style={{ marginBottom: 20 }}>
      {label && <div style={{
        fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 0.8,
        color: 'var(--kui-fg-subtle)', marginBottom: 10, fontFamily: 'var(--kui-font-mono)'
      }}>{label}</div>}
      <div style={{ display: 'flex', gap, flexWrap: 'wrap', alignItems: 'center' }}>{children}</div>
    </div>
  );
}

function secSurface(theme, children) {
  return <Surface theme={theme} pad={28} style={{ overflowY: 'auto' }}>{children}</Surface>;
}

function SectionHead({ title, sub }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--kui-fg)' }}>{title}</div>
      {sub && <div style={{ fontSize: 12, color: 'var(--kui-fg-muted)', fontFamily: 'var(--kui-font-mono)', marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

function SecLabel({ children }) {
  return <div style={{
    fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1.2,
    color: 'var(--kui-fg-subtle)', marginBottom: 10, marginTop: 4,
    fontFamily: 'var(--kui-font-mono)',
  }}>{children}</div>;
}

// ─── Navigation ─────────────────────────────────────────────
function NavArtboard({ theme }) {
  const [nav, setNav] = React.useState('Dashboard');
  const [side, setSide] = React.useState('overview');
  const sideGroups = [
    { head: 'Workspace', items: [
      { id: 'overview', label: 'Overview', icon: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="5" height="5" rx="1"/><rect x="9" y="2" width="5" height="5" rx="1"/><rect x="2" y="9" width="5" height="5" rx="1"/><rect x="9" y="9" width="5" height="5" rx="1"/></svg>, badge: null },
      { id: 'jobs', label: 'Jobs', icon: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="12" height="9" rx="1"/><path d="M5 4V3a1 1 0 011-1h4a1 1 0 011 1v1"/></svg>, badge: 12 },
      { id: 'data', label: 'Datasets', icon: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><ellipse cx="8" cy="4" rx="5" ry="1.8"/><path d="M3 4v8c0 1 2.2 1.8 5 1.8s5-.8 5-1.8V4"/><path d="M3 8c0 1 2.2 1.8 5 1.8s5-.8 5-1.8"/></svg> },
    ]},
    { head: 'System', items: [
      { id: 'settings', label: 'Settings', icon: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="8" cy="8" r="2"/><path d="M8 1v2M8 13v2M1 8h2M13 8h2M3 3l1.5 1.5M11.5 11.5L13 13M3 13l1.5-1.5M11.5 4.5L13 3"/></svg> },
      { id: 'help', label: 'Docs', icon: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="8" cy="8" r="6"/><path d="M6.5 6a1.5 1.5 0 113 0c0 1-1.5 1-1.5 2.5M8 11v.01"/></svg> },
    ]},
  ];
  return secSurface(theme, (
    <>
      <SectionHead title="Navigation" sub="top navbar · sidebar" />
      <div style={{ border: '1px solid var(--kui-border)', borderRadius: 9, overflow: 'hidden', marginBottom: 24 }}>
        <KuiNavbar brand="Kev" links={['Dashboard', 'Projects', 'Reports', 'Team']} current={nav} onNavigate={setNav}
          actions={<>
            <KuiBtn variant="flat" circular size="sm" aria-label="Search">{KuiIcons.search}</KuiBtn>
            <KuiBtn variant="suggested" size="sm">{KuiIcons.plus}New</KuiBtn>
          </>}
        />
      </div>

      <SecLabel>Sidebar</SecLabel>
      <div style={{
        border: '1px solid var(--kui-border)', borderRadius: 9, overflow: 'hidden',
        height: 320, display: 'flex', background: 'var(--kui-bg)',
      }}>
        <KuiSidebar groups={sideGroups} current={side} onNavigate={setSide} />
        <div style={{ flex: 1, padding: 20, fontSize: 13, color: 'var(--kui-fg-muted)' }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--kui-fg)', marginBottom: 6 }}>
            {sideGroups.flatMap(g => g.items).find(i => i.id === side)?.label}
          </div>
          Content area for the selected section.
        </div>
      </div>
    </>
  ));
}

// ─── Tabs ───────────────────────────────────────────────────
function TabsArtboard({ theme }) {
  const [a, setA] = React.useState('over');
  const [b, setB] = React.useState('daily');
  return secSurface(theme, (
    <>
      <SectionHead title="Tabs" sub="underline · pills · animated indicator" />

      <SecLabel>Underline</SecLabel>
      <KuiTabs
        tabs={[
          { id: 'over', label: 'Overview' },
          { id: 'logs', label: 'Logs' },
          { id: 'met', label: 'Metrics' },
          { id: 'set', label: 'Settings' },
        ]}
        value={a} onChange={setA}>
        {a === 'over' && <div>Summary statistics, recent activity, and a feed of the most important signals.</div>}
        {a === 'logs' && <div>Chronological log of pipeline events with search and filter.</div>}
        {a === 'met' && <div>Time-series charts for CPU, memory, throughput and latency percentiles.</div>}
        {a === 'set' && <div>Workspace preferences and notification settings.</div>}
      </KuiTabs>

      <div style={{ height: 16 }} />
      <SecLabel>Pills</SecLabel>
      <KuiTabs variant="pills"
        tabs={[
          { id: 'daily', label: 'Daily' },
          { id: 'week', label: 'Weekly' },
          { id: 'mo', label: 'Monthly' },
        ]}
        value={b} onChange={setB}>
        <div>Showing <b>{b}</b> aggregation.</div>
      </KuiTabs>
    </>
  ));
}

// ─── Progress / Loading ─────────────────────────────────────
function ProgArtboard({ theme }) {
  const [v, setV] = React.useState(42);
  React.useEffect(() => {
    const t = setInterval(() => setV(x => (x + 3) > 100 ? 20 : x + 3), 200);
    return () => clearInterval(t);
  }, []);
  return secSurface(theme, (
    <>
      <SectionHead title="Progress & loading" sub="bar · indeterminate · spinner · dots · skeleton" />

      <SecLabel>Progress bar</SecLabel>
      <div style={{ display: 'grid', gap: 12, marginBottom: 18 }}>
        <div>
          <div style={{ fontSize: 12, color: 'var(--kui-fg-muted)', marginBottom: 6, display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--kui-font-mono)' }}><span>Building indices</span><span>{v}%</span></div>
          <KuiProgress value={v} />
        </div>
        <KuiProgress value={80} tone="success" size="thin" />
        <KuiProgress value={60} tone="warning" />
        <KuiProgress value={30} tone="danger" size="thick" />
        <div>
          <div style={{ fontSize: 12, color: 'var(--kui-fg-muted)', marginBottom: 6, fontFamily: 'var(--kui-font-mono)' }}>Indeterminate</div>
          <KuiProgress indeterminate />
        </div>
      </div>

      <SecLabel>Spinner & dots</SecLabel>
      <div style={{ display: 'flex', gap: 20, alignItems: 'center', marginBottom: 18 }}>
        <KuiSpinner size="sm" /><KuiSpinner /><KuiSpinner size="lg" />
        <div style={{ width: 1, height: 24, background: 'var(--kui-divider)' }} />
        <KuiDots />
        <div style={{ fontSize: 12, color: 'var(--kui-fg-muted)', fontFamily: 'var(--kui-font-mono)' }}>Working…</div>
      </div>

      <SecLabel>Skeleton</SecLabel>
      <div style={{
        border: '1px solid var(--kui-border)', background: 'var(--kui-surface-1)',
        borderRadius: 9, padding: 14, display: 'flex', gap: 12, alignItems: 'center',
      }}>
        <KuiSkeleton w={40} h={40} r={20} />
        <div style={{ flex: 1, display: 'grid', gap: 8 }}>
          <KuiSkeleton w="60%" h={12} />
          <KuiSkeleton w="40%" h={10} />
        </div>
      </div>
    </>
  ));
}

// ─── Stats + Sparklines + Gauges ─────────────────────────────
function StatsArtboard({ theme }) {
  const sp1 = [4,6,5,8,7,9,11,10,12,14,13,15,16,14,18];
  const sp2 = [18,16,17,14,15,13,11,12,10,9,8,10,8,7,6];
  const sp3 = [8,9,9,10,11,10,12,13,13,14,12,14,15,15,16];
  return secSurface(theme, (
    <>
      <SectionHead title="Stats · sparklines · gauges" sub="KPIs at a glance" />

      <SecLabel>Stat cards</SecLabel>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 18 }}>
        <KuiStat label="Throughput" value="4,281" unit="req/s" delta="+12.4%" deltaDir="up" spark={<KuiSparkline data={sp1} tone="accent" />} mono />
        <KuiStat label="Error rate" value="0.18" unit="%" delta="-3.1%" deltaDir="down" spark={<KuiSparkline data={sp2} tone="danger" />} mono />
        <KuiStat label="Avg latency" value="142" unit="ms" delta="+2ms" deltaDir="up" spark={<KuiSparkline data={sp3} tone="warning" />} mono />
        <KuiStat label="Active nodes" value="24" unit="/ 32" delta="+2" deltaDir="up" mono />
      </div>

      <SecLabel>Gauges</SecLabel>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 8,
        border: '1px solid var(--kui-border)', background: 'var(--kui-surface-1)',
        borderRadius: 9, padding: 16,
      }}>
        <KuiGauge value={72} label="CPU" unit="%" />
        <KuiGauge value={48} label="Memory" unit="%" tone="success" />
        <KuiGauge value={91} label="Disk" unit="%" tone="warning" />
      </div>
    </>
  ));
}

// ─── Charts ─────────────────────────────────────────────────
function ChartsArtboard({ theme }) {
  const bars = [
    { label: 'Jan', value: 42 }, { label: 'Feb', value: 58 }, { label: 'Mar', value: 51 },
    { label: 'Apr', value: 72, highlight: true }, { label: 'May', value: 64 }, { label: 'Jun', value: 79 },
    { label: 'Jul', value: 88 },
  ];
  const line = [
    { name: 'a', data: [12, 18, 14, 22, 26, 30, 28, 34, 32, 38, 42, 40] },
    { name: 'b', data: [8, 10, 14, 13, 17, 16, 20, 22, 19, 23, 26, 28] },
    { name: 'c', data: [20, 22, 18, 21, 19, 17, 16, 18, 20, 17, 15, 14] },
  ];
  const ts = Array.from({ length: 48 }, (_, i) => ({
    label: `${String(i % 24).padStart(2,'0')}:00`,
    value: 40 + Math.sin(i / 3) * 14 + Math.cos(i / 7) * 8 + (i % 11),
  }));
  return secSurface(theme, (
    <>
      <SectionHead title="Charts" sub="bar · line+area · donut · time series" />

      <SecLabel>Bar chart</SecLabel>
      <div style={{ border: '1px solid var(--kui-border)', background: 'var(--kui-surface-1)', borderRadius: 9, padding: 12, marginBottom: 16 }}>
        <KuiBarChart data={bars} width={480} height={170} />
      </div>

      <SecLabel>Line + area (multi-series)</SecLabel>
      <div style={{ border: '1px solid var(--kui-border)', background: 'var(--kui-surface-1)', borderRadius: 9, padding: 12, marginBottom: 16 }}>
        <KuiLineChart series={line} width={480} height={180} />
      </div>

      <SecLabel>Donut</SecLabel>
      <div style={{ border: '1px solid var(--kui-border)', background: 'var(--kui-surface-1)', borderRadius: 9, padding: 16, marginBottom: 16 }}>
        <KuiDonut label="Build targets" data={[
          { label: 'Linux', value: 52 },
          { label: 'macOS', value: 31 },
          { label: 'Windows', value: 14 },
          { label: 'Other', value: 3 },
        ]} />
      </div>

      <SecLabel>Time series</SecLabel>
      <div style={{ border: '1px solid var(--kui-border)', background: 'var(--kui-surface-1)', borderRadius: 9, padding: 12 }}>
        <KuiTimeSeries data={ts} width={480} height={180} />
      </div>
    </>
  ));
}

// ─── Cards + Accordion ──────────────────────────────────────
function CardsArtboard({ theme }) {
  return secSurface(theme, (
    <>
      <SectionHead title="Cards & accordion" />

      <SecLabel>Card</SecLabel>
      <div style={{ display: 'grid', gap: 10, marginBottom: 18 }}>
        <KuiCard
          title="Production · us-east-1"
          subtitle="Healthy · 24 nodes"
          actions={<KuiBtn variant="flat" circular size="sm">{KuiIcons.more}</KuiBtn>}
          footer={<><KuiBtn variant="flat" size="sm">Dismiss</KuiBtn><KuiBtn variant="suggested" size="sm">View</KuiBtn></>}>
          All services reporting within SLO. Last deploy 2 hours ago.
        </KuiCard>
        <KuiCard hover title="Interactive card" subtitle="Hover me">
          Hover reveals a subtle shadow + lift. Good for selectable grids.
        </KuiCard>
      </div>

      <SecLabel>Accordion</SecLabel>
      <KuiAccordion items={[
        { title: 'What is a workspace?', content: 'A workspace is an isolated environment with its own datasets, jobs, and access controls.' },
        { title: 'How does billing work?', content: 'You are billed per compute-hour and per GB of storage, measured each minute.' },
        { title: 'Can I invite teammates?', content: 'Yes — owners can invite members from the Team tab and assign roles.' },
      ]} />
    </>
  ));
}

// ─── Badges / Tags ──────────────────────────────────────────
function BadgesArtboard({ theme }) {
  return secSurface(theme, (
    <>
      <SectionHead title="Badges, tags, kbd" />

      <SecLabel>Status badges</SecLabel>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
        <KuiBadge>default</KuiBadge>
        <KuiBadge tone="accent" dot>active</KuiBadge>
        <KuiBadge tone="success" dot>healthy</KuiBadge>
        <KuiBadge tone="warning" dot>degraded</KuiBadge>
        <KuiBadge tone="danger" dot>failing</KuiBadge>
        <KuiBadge tone="solid">new</KuiBadge>
        <KuiBadge tone="outline">v2.1.4</KuiBadge>
      </div>

      <SecLabel>Tags (removable)</SecLabel>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
        <KuiTag onClose={() => {}}>typescript</KuiTag>
        <KuiTag onClose={() => {}}>rust</KuiTag>
        <KuiTag onClose={() => {}}>docker</KuiTag>
        <KuiTag>read-only</KuiTag>
      </div>

      <SecLabel>Keyboard</SecLabel>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 13, color: 'var(--kui-fg-muted)' }}>
        Press <KuiKbd>⌘</KuiKbd> <KuiKbd>K</KuiKbd> to open command palette
      </div>
    </>
  ));
}

// ─── Carousel / Slider / Pagination ─────────────────────────
function CarPagArtboard({ theme }) {
  const [page, setPage] = React.useState(3);
  const [sl, setSl] = React.useState(40);
  return secSurface(theme, (
    <>
      <SectionHead title="Carousel · slider · pagination" />

      <SecLabel>Carousel</SecLabel>
      <div style={{ marginBottom: 20 }}>
        <KuiCarousel slides={[
          <div key="a" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 10, color: 'var(--kui-fg-subtle)', fontFamily: 'var(--kui-font-mono)', textTransform: 'uppercase', letterSpacing: 1.2 }}>Step 01</div>
            <div style={{ fontSize: 16, fontWeight: 600, marginTop: 6 }}>Connect your source</div>
            <div style={{ fontSize: 12, color: 'var(--kui-fg-muted)', marginTop: 6 }}>Link GitHub, a database, or drop a CSV.</div>
          </div>,
          <div key="b" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 10, color: 'var(--kui-fg-subtle)', fontFamily: 'var(--kui-font-mono)', textTransform: 'uppercase', letterSpacing: 1.2 }}>Step 02</div>
            <div style={{ fontSize: 16, fontWeight: 600, marginTop: 6 }}>Configure the pipeline</div>
            <div style={{ fontSize: 12, color: 'var(--kui-fg-muted)', marginTop: 6 }}>Chain transforms with a visual editor.</div>
          </div>,
          <div key="c" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 10, color: 'var(--kui-fg-subtle)', fontFamily: 'var(--kui-font-mono)', textTransform: 'uppercase', letterSpacing: 1.2 }}>Step 03</div>
            <div style={{ fontSize: 16, fontWeight: 600, marginTop: 6 }}>Ship to production</div>
            <div style={{ fontSize: 12, color: 'var(--kui-fg-muted)', marginTop: 6 }}>One click deploy with automatic rollback.</div>
          </div>,
        ]} />
      </div>

      <SecLabel>Slider — {sl}</SecLabel>
      <div style={{ marginBottom: 20 }}>
        <KuiSlider value={sl} onChange={setSl} />
      </div>

      <SecLabel>Pagination</SecLabel>
      <KuiPagination page={page} total={24} onChange={setPage} />
    </>
  ));
}

// ─── Copy / Zoom / Export ───────────────────────────────────
function UtilsArtboard({ theme }) {
  return secSurface(theme, (
    <>
      <SectionHead title="Copy · zoom · export" />

      <SecLabel>Copy to clipboard</SecLabel>
      <div style={{ display: 'grid', gap: 8, marginBottom: 18 }}>
        <KuiCopy text="pk_live_9b31c2f7a4e5d8129ae3c1f4" />
        <KuiCopy text="ssh://git@kev.app/team/engineering-lab-02.git" />
      </div>

      <SecLabel>Zoom viewer</SecLabel>
      <div style={{ marginBottom: 18 }}>
        <KuiZoom>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 32, fontWeight: 600, color: 'var(--kui-fg)', fontFamily: 'var(--kui-font-mono)' }}>KEV-UI</div>
            <div style={{ marginTop: 6, color: 'var(--kui-fg-subtle)' }}>pan · pinch · scroll · keyboard</div>
          </div>
        </KuiZoom>
      </div>

      <SecLabel>Export menu</SecLabel>
      <KuiExportMenu label="Export" />
    </>
  ));
}

// ─── Pipeline / Engineering ─────────────────────────────────
function EngArtboard({ theme }) {
  const grid = Array.from({ length: 24 * 7 }, (_, i) => Math.random() > 0.7 ? Math.random() : Math.random() > 0.5 ? Math.random() * 0.5 : 0);
  return secSurface(theme, (
    <>
      <SectionHead title="Pipeline & engineering visuals" sub="stages · activity grid · log stream" />

      <SecLabel>Pipeline stages</SecLabel>
      <div style={{ marginBottom: 18 }}>
        <KuiPipeline steps={[
          { name: 'Fetch', state: 'done', meta: '1.2s' },
          { name: 'Build', state: 'done', meta: '34s' },
          { name: 'Test', state: 'active', meta: 'running' },
          { name: 'Deploy', meta: 'queued' },
          { name: 'Verify', meta: 'queued' },
        ]} />
      </div>

      <SecLabel>Activity grid · last 7 days</SecLabel>
      <div style={{ border: '1px solid var(--kui-border)', background: 'var(--kui-surface-1)', borderRadius: 9, padding: 14, marginBottom: 18 }}>
        <KuiStatusGrid cells={grid} cols={24} rows={7} labels={['00:00', '06:00', '12:00', '18:00', '23:59']} />
      </div>

      <SecLabel>Log stream</SecLabel>
      <KuiLogPanel lines={[
        { level: 'INFO', msg: 'Pipeline started · commit 8f3a21c' },
        { level: 'INFO', msg: 'Pulling dependencies from registry' },
        { level: 'WARN', msg: 'Package \'lodash@4.17.20\' is outdated', tone: 'warning' },
        { level: 'INFO', msg: 'Compiling 284 files with rustc 1.78.0' },
        { level: 'INFO', msg: 'Build succeeded in 34.2s' },
        { level: 'ERROR', msg: 'Test \'auth::token_expiry\' failed · see report', tone: 'danger' },
        { level: 'INFO', msg: 'Retrying in 10s…' },
      ]} />
    </>
  ));
}

Object.assign(window, {
  NavArtboard, TabsArtboard, ProgArtboard, StatsArtboard, ChartsArtboard,
  CardsArtboard, BadgesArtboard, CarPagArtboard, UtilsArtboard, EngArtboard,
  // helpers
  Surface, Row, SectionHead, SecLabel,
});
