// Additional section artboards: Table, Overlays, TopBar

function TableArtboard({ theme }) {
  const rows = [
    { id: 'job-8f3a', name: 'nightly-build', status: 'running', owner: 'alex', duration: 124, runs: 1284 },
    { id: 'job-21bd', name: 'deploy-api', status: 'success', owner: 'mira', duration: 42, runs: 2310 },
    { id: 'job-7c04', name: 'smoke-tests', status: 'success', owner: 'alex', duration: 88, runs: 1904 },
    { id: 'job-9f12', name: 'migrate-db', status: 'failed', owner: 'kenji', duration: 310, runs: 42 },
    { id: 'job-3a11', name: 'snapshot-s3', status: 'queued', owner: 'mira', duration: null, runs: 511 },
    { id: 'job-5e88', name: 'lint-repo', status: 'success', owner: 'alex', duration: 18, runs: 8932 },
  ];
  const statusTone = { running: 'accent', success: 'success', failed: 'danger', queued: 'default' };
  const columns = [
    { key: 'id', label: 'ID', mono: true },
    { key: 'name', label: 'Job', render: v => <span style={{ fontWeight: 500 }}>{v}</span> },
    { key: 'status', label: 'Status', render: v => <KuiBadge tone={statusTone[v]} dot>{v}</KuiBadge> },
    { key: 'owner', label: 'Owner' },
    { key: 'duration', label: 'Duration', mono: true, render: v => v == null ? <span style={{ color: 'var(--kui-fg-subtle)' }}>—</span> : `${v}s` },
    { key: 'runs', label: 'Runs', mono: true, render: v => v.toLocaleString() },
  ];
  return (
    <Surface theme={theme} pad={24} style={{ overflowY: 'auto' }}>
      <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 14 }}>Data table</div>
      <KuiTable title="Jobs" columns={columns} rows={rows} selectable zebra />
      <div style={{ marginTop: 24 }}>
        <div style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1.2, color: 'var(--kui-fg-subtle)', marginBottom: 10, fontFamily: 'var(--kui-font-mono)' }}>Compact, no toolbar</div>
        <KuiTable columns={columns} rows={rows.slice(0,4)} density="compact" />
      </div>
    </Surface>
  );
}

function OverlayArtboard({ theme }) {
  const [dlg, setDlg] = React.useState(false);
  const [drw, setDrw] = React.useState(false);
  const toast = useKuiToast();
  return (
    <Surface theme={theme} pad={24} style={{ overflowY: 'auto' }}>
      <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>Popping windows</div>
      <div style={{ fontSize: 12, color: 'var(--kui-fg-muted)', fontFamily: 'var(--kui-font-mono)', marginBottom: 16 }}>dialog · drawer · toast</div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 18 }}>
        <KuiBtn variant="default" onClick={() => setDlg(true)}>Open dialog</KuiBtn>
        <KuiBtn variant="default" onClick={() => setDrw(true)}>Open drawer</KuiBtn>
        <KuiBtn variant="suggested" onClick={() => toast && toast({ tone: 'success', title: 'Deploy successful', sub: 'api-gateway · v1.24.0' })}>Success toast</KuiBtn>
        <KuiBtn variant="destructive" onClick={() => toast && toast({ tone: 'danger', title: 'Build failed', sub: 'Test auth::token_expiry failed' })}>Error toast</KuiBtn>
      </div>

      <div style={{
        border: '1px dashed var(--kui-border)', borderRadius: 9, padding: 14,
        fontSize: 12, color: 'var(--kui-fg-subtle)', fontFamily: 'var(--kui-font-mono)', lineHeight: 1.6,
      }}>
        Static previews below:
      </div>

      <div style={{ marginTop: 16, border: '1px solid var(--kui-border)', borderRadius: 9, padding: 16, background: 'var(--kui-bg)' }}>
        <div className="kui-dialog" style={{ animation: 'none', margin: '0 auto' }}>
          <div className="kui-dialog__head">
            <div className="kui-dialog__title">Delete workspace?</div>
            <div className="kui-dialog__subtitle">This cannot be undone</div>
          </div>
          <div className="kui-dialog__body">
            Permanently remove <b style={{ color: 'var(--kui-fg)', fontFamily: 'var(--kui-font-mono)' }}>engineering-lab-02</b> and all its data.
          </div>
          <div className="kui-dialog__foot">
            <KuiBtn variant="flat">Cancel</KuiBtn>
            <KuiBtn variant="destructive">Delete</KuiBtn>
          </div>
        </div>
      </div>

      <KuiDialog open={dlg} onClose={() => setDlg(false)}
        title="Deploy to production?" subtitle="You are about to ship commit 8f3a21c"
        footer={<><KuiBtn variant="flat" onClick={() => setDlg(false)}>Cancel</KuiBtn><KuiBtn variant="suggested" onClick={() => { setDlg(false); toast && toast({ tone: 'success', title: 'Deploying…', sub: 'ETA 2 minutes' }); }}>Deploy</KuiBtn></>}>
        This will replace the current production version and restart all running instances.
      </KuiDialog>

      <KuiDrawer open={drw} onClose={() => setDrw(false)} title="Job details · job-8f3a"
        footer={<><KuiBtn variant="flat" onClick={() => setDrw(false)}>Close</KuiBtn><KuiBtn variant="suggested">Retry job</KuiBtn></>}>
        <div style={{ fontFamily: 'var(--kui-font-mono)', fontSize: 12, color: 'var(--kui-fg-muted)', display: 'grid', gap: 6 }}>
          <div><span style={{ color: 'var(--kui-fg-subtle)' }}>status</span>  running</div>
          <div><span style={{ color: 'var(--kui-fg-subtle)' }}>started</span>  2m ago</div>
          <div><span style={{ color: 'var(--kui-fg-subtle)' }}>commit</span>   8f3a21c</div>
          <div><span style={{ color: 'var(--kui-fg-subtle)' }}>runner</span>   linux-amd64-2</div>
        </div>
        <div style={{ marginTop: 14, fontSize: 13, color: 'var(--kui-fg)' }}>
          Side panel is ideal for detail views without leaving context. Good for inspecting rows, editing settings, or viewing logs.
        </div>
      </KuiDrawer>
    </Surface>
  );
}

// Search command palette — used inside the split top bar
const SEARCH_ITEMS = [
  { kind: 'Page', label: 'Dashboard', hint: 'go to', icon: '▣' },
  { kind: 'Page', label: 'Projects', hint: 'go to', icon: '▣' },
  { kind: 'Page', label: 'Reports', hint: 'go to', icon: '▣' },
  { kind: 'Page', label: 'Team · Members', hint: 'go to', icon: '▣' },
  { kind: 'Project', label: 'engineering-lab-02', hint: 'open', icon: '◆' },
  { kind: 'Project', label: 'aircraft-sim-core', hint: 'open', icon: '◆' },
  { kind: 'Project', label: 'flight-data-pipeline', hint: 'open', icon: '◆' },
  { kind: 'Job', label: 'nightly-build', hint: 'job-8f3a', icon: '●' },
  { kind: 'Job', label: 'deploy-api', hint: 'job-21bd', icon: '●' },
  { kind: 'Job', label: 'migrate-db', hint: 'job-9f12', icon: '●' },
  { kind: 'Action', label: 'Create new workspace', hint: '⌘ N', icon: '+' },
  { kind: 'Action', label: 'Invite teammate', hint: '⌘ I', icon: '+' },
  { kind: 'Action', label: 'Toggle dark mode', hint: '⌘ ⇧ D', icon: '+' },
  { kind: 'Doc', label: 'Getting started', hint: 'docs', icon: '¶' },
  { kind: 'Doc', label: 'API reference', hint: 'docs', icon: '¶' },
];

function SearchDropdown({ query, onPick, theme }) {
  const q = query.trim().toLowerCase();
  const results = q
    ? SEARCH_ITEMS.filter(it => it.label.toLowerCase().includes(q) || it.kind.toLowerCase().includes(q))
    : SEARCH_ITEMS.slice(0, 8);
  // Group by kind
  const byKind = {};
  results.forEach(r => { (byKind[r.kind] = byKind[r.kind] || []).push(r); });
  const order = ['Page', 'Project', 'Job', 'Action', 'Doc'];

  return (
    <div style={{
      position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0,
      background: 'var(--kui-surface-1)', border: '1px solid var(--kui-border)',
      borderRadius: 8, boxShadow: 'var(--kui-shadow-3)',
      overflow: 'hidden', zIndex: 10, maxHeight: 320, overflowY: 'auto',
      fontFamily: 'var(--kui-font-sans)',
    }}>
      {results.length === 0 ? (
        <div style={{ padding: 16, textAlign: 'center', fontSize: 12, color: 'var(--kui-fg-subtle)', fontFamily: 'var(--kui-font-mono)' }}>
          No matches for "{query}"
        </div>
      ) : (
        order.filter(k => byKind[k]).map(k => (
          <div key={k}>
            <div style={{
              padding: '8px 12px 4px', fontSize: 10, fontWeight: 600,
              textTransform: 'uppercase', letterSpacing: 1.2,
              color: 'var(--kui-fg-subtle)', fontFamily: 'var(--kui-font-mono)',
            }}>{k}</div>
            {byKind[k].map((it, i) => (
              <div key={k + i}
                onMouseDown={(e) => { e.preventDefault(); onPick(it); }}
                style={{
                  padding: '7px 12px', display: 'flex', alignItems: 'center', gap: 10,
                  fontSize: 13, color: 'var(--kui-fg)', cursor: 'pointer',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--kui-surface-hover)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                <span style={{
                  width: 20, height: 20, display: 'grid', placeItems: 'center',
                  fontFamily: 'var(--kui-font-mono)', fontSize: 11, color: 'var(--kui-accent)',
                  background: 'var(--kui-accent-soft)', borderRadius: 4, flexShrink: 0,
                }}>{it.icon}</span>
                <span style={{ flex: 1 }}>{it.label}</span>
                <span style={{ fontSize: 11, color: 'var(--kui-fg-subtle)', fontFamily: 'var(--kui-font-mono)' }}>{it.hint}</span>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

function TopBarArtboard({ theme }) {
  const [n, setN] = React.useState('Projects');
  const [q, setQ] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [picked, setPicked] = React.useState(null);
  const toast = (typeof useKuiToast === 'function') ? useKuiToast() : null;

  const onPick = (it) => {
    setPicked(it);
    setQ(it.label);
    setOpen(false);
    if (toast) toast({ tone: 'info', title: `Opened ${it.label}`, sub: it.kind });
  };

  return (
    <Surface theme={theme} pad={0} style={{ overflow: 'visible' }}>
      {/* A — compact app header */}
      <div style={{ padding: 18, borderBottom: '1px solid var(--kui-divider)' }}>
        <div style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1.2, color: 'var(--kui-fg-subtle)', marginBottom: 10, fontFamily: 'var(--kui-font-mono)' }}>A · Headerbar (compact)</div>
        <div style={{
          border: '1px solid var(--kui-border)', borderRadius: 9, overflow: 'hidden',
          background: 'var(--kui-surface-1)',
        }}>
          <nav style={{
            display: 'flex', alignItems: 'center', gap: 10,
            height: 52, padding: '0 14px',
            fontFamily: 'var(--kui-font-sans)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, fontWeight: 600, color: 'var(--kui-fg)' }}>
              <div style={{ width: 24, height: 24, borderRadius: 6, background: 'var(--kui-accent)', display: 'grid', placeItems: 'center', color: '#fff' }}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3l6 4 6-4"/><path d="M2 3v10l6 3 6-3V3"/><path d="M8 7v9"/></svg>
              </div>
              Kev
            </div>
            <div style={{ width: 1, height: 18, background: 'var(--kui-divider)', margin: '0 4px' }} />
            <div style={{ display: 'flex', gap: 2 }}>
              {['Dashboard', 'Projects', 'Reports', 'Team'].map(l => (
                <button key={l}
                  onClick={() => setN(l)}
                  aria-current={n === l ? 'page' : undefined}
                  style={{
                    padding: '6px 12px', fontSize: 13, fontWeight: 500,
                    color: n === l ? 'var(--kui-fg)' : 'var(--kui-fg-muted)',
                    background: n === l ? 'var(--kui-surface-3)' : 'transparent',
                    border: 'none', borderRadius: 6, cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}>{l}</button>
              ))}
            </div>
            <div style={{ flex: 1 }} />
            <KuiBtn variant="flat" circular size="sm" aria-label="Search">{KuiIcons.search}</KuiBtn>
            <KuiBtn variant="flat" circular size="sm" aria-label="Notifications">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 7a4 4 0 018 0v3l1.5 2h-11L4 10V7z"/><path d="M6.5 13a1.5 1.5 0 003 0"/></svg>
            </KuiBtn>
            <div style={{ width: 28, height: 28, borderRadius: 14, background: 'linear-gradient(135deg, var(--kui-accent), var(--kui-success))', marginLeft: 4, flexShrink: 0 }} />
          </nav>
        </div>
      </div>

      {/* B — split header with WORKING search + dropdown */}
      <div style={{ padding: 18, borderBottom: '1px solid var(--kui-divider)' }}>
        <div style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1.2, color: 'var(--kui-fg-subtle)', marginBottom: 10, fontFamily: 'var(--kui-font-mono)' }}>B · Split (logo · live search · actions) — try typing "deploy" or "team"</div>
        <div style={{
          border: '1px solid var(--kui-border)', borderRadius: 9,
          background: 'var(--kui-surface-1)', height: 56, padding: '0 14px',
          display: 'flex', alignItems: 'center', gap: 14, position: 'relative',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600, color: 'var(--kui-fg)', flexShrink: 0 }}>
            <div style={{ width: 26, height: 26, borderRadius: 6, background: 'var(--kui-accent)', display: 'grid', placeItems: 'center', color: '#fff' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15 8.5 22 9.3 17 14 18.2 21 12 17.8 5.8 21 7 14 2 9.3 9 8.5 12 2"/></svg>
            </div>
            Kev
            <span style={{ color: 'var(--kui-fg-subtle)', fontWeight: 400 }}>/</span>
            <span style={{ color: 'var(--kui-fg-muted)', fontWeight: 500, fontFamily: 'var(--kui-font-mono)', fontSize: 13 }}>engineering-lab-02</span>
          </div>

          <div style={{ flex: 1, maxWidth: 380, margin: '0 auto', position: 'relative' }}>
            <div style={{
              background: 'var(--kui-bg)',
              border: `1px solid ${open ? 'var(--kui-accent)' : 'var(--kui-border)'}`,
              boxShadow: open ? '0 0 0 3px var(--kui-accent-soft)' : 'none',
              borderRadius: 7, height: 34, padding: '0 10px',
              display: 'flex', alignItems: 'center', gap: 8,
              transition: 'border-color 100ms, box-shadow 100ms',
            }}>
              <span style={{ color: 'var(--kui-fg-subtle)', display: 'grid', placeItems: 'center' }}>{KuiIcons.search}</span>
              <input
                value={q}
                onChange={(e) => { setQ(e.target.value); setOpen(true); }}
                onFocus={() => setOpen(true)}
                onBlur={() => setTimeout(() => setOpen(false), 120)}
                placeholder="Search pages, projects, jobs, actions…"
                style={{
                  flex: 1, border: 'none', outline: 'none', background: 'transparent',
                  fontFamily: 'var(--kui-font-sans)', fontSize: 13, color: 'var(--kui-fg)',
                  minWidth: 0,
                }}
              />
              {q && (
                <button onMouseDown={(e) => { e.preventDefault(); setQ(''); setPicked(null); }}
                  aria-label="Clear"
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--kui-fg-subtle)', padding: 2, display: 'grid', placeItems: 'center' }}>
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 4l8 8M12 4l-8 8"/></svg>
                </button>
              )}
              <KuiKbd>⌘K</KuiKbd>
            </div>
            {open && <SearchDropdown query={q} onPick={onPick} theme={theme} />}
          </div>

          <KuiBtn variant="flat" size="sm">Docs</KuiBtn>
          <KuiBtn variant="suggested" size="sm">{KuiIcons.plus}New</KuiBtn>
        </div>
        {picked && (
          <div style={{ marginTop: 8, fontSize: 11, color: 'var(--kui-fg-subtle)', fontFamily: 'var(--kui-font-mono)' }}>
            → selected: <span style={{ color: 'var(--kui-accent)' }}>{picked.kind} · {picked.label}</span>
          </div>
        )}
      </div>

      {/* C — tall marketing top bar with logo + nav + CTA */}
      <div style={{ padding: 18 }}>
        <div style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1.2, color: 'var(--kui-fg-subtle)', marginBottom: 10, fontFamily: 'var(--kui-font-mono)' }}>C · Marketing (tall, wordmark + CTA)</div>
        <div style={{
          border: '1px solid var(--kui-border)', borderRadius: 9,
          background: 'var(--kui-surface-1)', height: 64, padding: '0 20px',
          display: 'flex', alignItems: 'center', gap: 18,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 700, fontSize: 18, letterSpacing: -0.4, color: 'var(--kui-fg)' }}>
            <svg width="22" height="22" viewBox="0 0 22 22">
              <rect x="1" y="1" width="20" height="20" rx="5" fill="var(--kui-accent)" />
              <path d="M7 6v10M7 11l7-5M7 11l7 5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
            Kev
          </div>
          <div style={{ display: 'flex', gap: 2, marginLeft: 12 }}>
            {['Product', 'Solutions', 'Pricing', 'Docs', 'Changelog'].map(l => (
              <button key={l} className="kui-nav__link">{l}</button>
            ))}
          </div>
          <div style={{ flex: 1 }} />
          <KuiBtn variant="flat" size="sm">Sign in</KuiBtn>
          <KuiBtn variant="suggested" size="sm">Get started</KuiBtn>
        </div>
      </div>
    </Surface>
  );
}

Object.assign(window, { TableArtboard, OverlayArtboard, TopBarArtboard });
