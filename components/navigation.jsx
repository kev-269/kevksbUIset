// Kev-UI Navigation — top navbar + sidebar (GNOME headerbar DNA)

const navCSS = `
/* Top navbar (headerbar style) */
.kui-nav {
  display: flex; align-items: center; gap: 8px;
  height: 48px; padding: 0 10px;
  background: var(--kui-surface-1);
  border-bottom: 1px solid var(--kui-border);
  font-family: var(--kui-font-sans);
}
.kui-nav__brand {
  display: flex; align-items: center; gap: 8px;
  font-size: 14px; font-weight: 600; color: var(--kui-fg);
  padding: 0 8px;
}
.kui-nav__brand-mark {
  width: 22px; height: 22px; border-radius: 5px;
  background: var(--kui-accent);
  display: grid; place-items: center;
  color: #fff; font-weight: 700; font-size: 12px;
}
.kui-nav__links { display: flex; gap: 2px; margin-left: 12px; }
.kui-nav__link {
  padding: 6px 12px; font-size: 13px; font-weight: 500;
  color: var(--kui-fg-muted); border-radius: 6px;
  cursor: pointer; transition: background 80ms, color 80ms;
  border: none; background: transparent; font-family: inherit;
}
.kui-nav__link:hover { background: var(--kui-surface-hover); color: var(--kui-fg); }
.kui-nav__link[aria-current="page"] { color: var(--kui-fg); background: var(--kui-surface-3); }
.kui-nav__spacer { flex: 1; }
.kui-nav__actions { display: flex; gap: 4px; align-items: center; }

/* Sidebar */
.kui-sidebar {
  width: 240px; height: 100%;
  background: var(--kui-surface-1);
  border-right: 1px solid var(--kui-border);
  padding: 12px 8px;
  font-family: var(--kui-font-sans);
  display: flex; flex-direction: column; gap: 2px;
}
.kui-sidebar__head {
  font-size: 10px; font-weight: 600; text-transform: uppercase;
  letter-spacing: 1.2px; color: var(--kui-fg-subtle);
  padding: 10px 12px 6px; font-family: var(--kui-font-mono);
}
.kui-sidebar__item {
  display: flex; align-items: center; gap: 10px;
  padding: 7px 10px; border-radius: 6px;
  font-size: 13px; font-weight: 500; color: var(--kui-fg-muted);
  cursor: pointer; transition: background 80ms, color 80ms;
  border: none; background: transparent; width: 100%; text-align: left;
  font-family: inherit;
}
.kui-sidebar__item:hover { background: var(--kui-surface-hover); color: var(--kui-fg); }
.kui-sidebar__item[aria-current="page"] {
  background: var(--kui-accent-soft); color: var(--kui-accent);
}
[data-theme="dark"] .kui-sidebar__item[aria-current="page"] { color: #8fb9ef; }
.kui-sidebar__item svg { width: 16px; height: 16px; flex-shrink: 0; }
.kui-sidebar__badge {
  margin-left: auto; font-size: 11px; padding: 1px 7px;
  border-radius: 999px; background: var(--kui-surface-3);
  color: var(--kui-fg-muted); font-family: var(--kui-font-mono);
}
`;

if (!document.getElementById('kui-nav-styles')) {
  const s = document.createElement('style'); s.id = 'kui-nav-styles'; s.textContent = navCSS;
  document.head.appendChild(s);
}

function KuiNavbar({ brand = 'Kev', links = [], current, onNavigate, actions }) {
  return (
    <nav className="kui-nav">
      <div className="kui-nav__brand">
        <div className="kui-nav__brand-mark">{brand[0]}</div>
        {brand}
      </div>
      <div className="kui-nav__links">
        {links.map(l => (
          <button key={l} className="kui-nav__link"
            aria-current={current === l ? 'page' : undefined}
            onClick={() => onNavigate && onNavigate(l)}>{l}</button>
        ))}
      </div>
      <div className="kui-nav__spacer" />
      <div className="kui-nav__actions">{actions}</div>
    </nav>
  );
}

function KuiSidebar({ groups = [], current, onNavigate }) {
  return (
    <aside className="kui-sidebar">
      {groups.map((g, gi) => (
        <React.Fragment key={gi}>
          {g.head && <div className="kui-sidebar__head">{g.head}</div>}
          {g.items.map(it => (
            <button key={it.id} className="kui-sidebar__item"
              aria-current={current === it.id ? 'page' : undefined}
              onClick={() => onNavigate && onNavigate(it.id)}>
              {it.icon}
              <span>{it.label}</span>
              {it.badge != null && <span className="kui-sidebar__badge">{it.badge}</span>}
            </button>
          ))}
        </React.Fragment>
      ))}
    </aside>
  );
}

Object.assign(window, { KuiNavbar, KuiSidebar });
