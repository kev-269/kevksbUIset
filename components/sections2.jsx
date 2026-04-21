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

function TopBarArtboard({ theme }) {
  const [n, setN] = React.useState('Projects');
  return (
    <Surface theme={theme} pad={0}>
      {/* A — compact app header */}
      <div style={{ padding: 16, borderBottom: '1px solid var(--kui-divider)' }}>
        <div style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1.2, color: 'var(--kui-fg-subtle)', marginBottom: 8, fontFamily: 'var(--kui-font-mono)' }}>A · Headerbar (compact)</div>
        <div style={{ border: '1px solid var(--kui-border)', borderRadius: 9, overflow: 'hidden' }}>
          <KuiNavbar brand="Kev" links={['Dashboard', 'Projects', 'Reports', 'Team']} current={n} onNavigate={setN}
            actions={<>
              <KuiBtn variant="flat" circular size="sm" aria-label="Search">{KuiIcons.search}</KuiBtn>
              <KuiBtn variant="flat" circular size="sm" aria-label="Notifications">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 7a4 4 0 018 0v3l1.5 2h-11L4 10V7z"/><path d="M6.5 13a1.5 1.5 0 003 0"/></svg>
              </KuiBtn>
              <div style={{ width: 26, height: 26, borderRadius: 13, background: 'linear-gradient(135deg, var(--kui-accent), var(--kui-success))', marginLeft: 4 }} />
            </>}
          />
        </div>
      </div>

      {/* B — split header with search bar centered */}
      <div style={{ padding: 16, borderBottom: '1px solid var(--kui-divider)' }}>
        <div style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1.2, color: 'var(--kui-fg-subtle)', marginBottom: 8, fontFamily: 'var(--kui-font-mono)' }}>B · Split (logo · search · actions)</div>
        <div style={{
          border: '1px solid var(--kui-border)', borderRadius: 9,
          background: 'var(--kui-surface-1)', height: 52, padding: '0 12px',
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600, color: 'var(--kui-fg)' }}>
            <div style={{ width: 26, height: 26, borderRadius: 6, background: 'var(--kui-accent)', display: 'grid', placeItems: 'center', color: '#fff', fontWeight: 700, fontSize: 13 }}>K</div>
            Kev
            <span style={{ color: 'var(--kui-fg-subtle)', fontWeight: 400 }}>/</span>
            <span style={{ color: 'var(--kui-fg-muted)', fontWeight: 500, fontFamily: 'var(--kui-font-mono)', fontSize: 13 }}>engineering-lab-02</span>
          </div>
          <div style={{
            flex: 1, maxWidth: 360, margin: '0 auto',
            background: 'var(--kui-bg)', border: '1px solid var(--kui-border)',
            borderRadius: 7, height: 30, padding: '0 10px',
            display: 'flex', alignItems: 'center', gap: 8,
            color: 'var(--kui-fg-subtle)', fontSize: 12, fontFamily: 'var(--kui-font-mono)',
          }}>
            {KuiIcons.search}
            <span style={{ flex: 1 }}>Jump to…</span>
            <KuiKbd>⌘K</KuiKbd>
          </div>
          <KuiBtn variant="flat" size="sm">Docs</KuiBtn>
          <KuiBtn variant="suggested" size="sm">{KuiIcons.plus}New</KuiBtn>
        </div>
      </div>

      {/* C — tall marketing top bar with logo + nav + CTA */}
      <div style={{ padding: 16 }}>
        <div style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1.2, color: 'var(--kui-fg-subtle)', marginBottom: 8, fontFamily: 'var(--kui-font-mono)' }}>C · Marketing (tall, wordmark + CTA)</div>
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
