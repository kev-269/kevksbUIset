// Kev-UI Tokens — GNOME/Adwaita-inspired, professional engineering palette
// Exposed as CSS variables under [data-theme="light"] and [data-theme="dark"].
// Use inside any scope to theme: <div data-theme="dark">…</div>

const tokensCSS = `
:root {
  --kui-font-sans: "Inter", "Cantarell", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
  --kui-font-mono: "JetBrains Mono", ui-monospace, "SF Mono", Menlo, Consolas, monospace;

  /* Radii — Adwaita leans 6–9px */
  --kui-radius-sm: 5px;
  --kui-radius-md: 7px;
  --kui-radius-lg: 9px;
  --kui-radius-xl: 12px;

  /* Spacing scale (4px base) */
  --kui-space-1: 4px;
  --kui-space-2: 8px;
  --kui-space-3: 12px;
  --kui-space-4: 16px;
  --kui-space-5: 24px;
  --kui-space-6: 32px;
}

/* ── Light theme ─────────────────────────────────────────── */
[data-theme="light"] {
  /* Surfaces — cool neutral grays, very subtle chroma */
  --kui-bg:          #fafafa;
  --kui-surface-1:   #ffffff;
  --kui-surface-2:   #ffffff;       /* default button face */
  --kui-surface-3:   #f3f3f2;       /* hover */
  --kui-surface-4:   #e8e8e6;       /* active */
  --kui-surface-hover:  rgba(0,0,0,0.05);
  --kui-surface-active: rgba(0,0,0,0.09);

  --kui-border:      #d4d4d2;
  --kui-border-strong: #b8b8b5;
  --kui-divider:     #e8e8e6;

  --kui-fg:          #1e1e1c;
  --kui-fg-muted:    #5b5b58;
  --kui-fg-subtle:   #8a8a86;
  --kui-fg-on-accent:#ffffff;

  /* Accent — Adwaita blue */
  --kui-accent:        #3584e4;
  --kui-accent-hover:  #2f76cf;
  --kui-accent-active: #2968bb;
  --kui-accent-soft:   #e3eefd;

  /* States */
  --kui-success:        #26a269;
  --kui-success-hover:  #218f5c;
  --kui-success-active: #1c7c50;
  --kui-success-soft:   #dff3e7;

  --kui-warning:        #c88900;
  --kui-warning-hover:  #b37b00;
  --kui-warning-active: #9e6d00;
  --kui-warning-soft:   #faedcc;

  --kui-danger:         #c01c28;
  --kui-danger-hover:   #a81822;
  --kui-danger-active:  #90141d;
  --kui-danger-soft:    #f7d6d9;

  /* Elevations — very subtle */
  --kui-shadow-1: 0 1px 2px rgba(0,0,0,0.06), 0 1px 1px rgba(0,0,0,0.04);
  --kui-shadow-2: 0 2px 6px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.05);
  --kui-shadow-3: 0 8px 24px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.06);
}

/* ── Dark theme (Adwaita dark) ───────────────────────────── */
[data-theme="dark"] {
  --kui-bg:          #1e1e1e;
  --kui-surface-1:   #242424;
  --kui-surface-2:   #363636;
  --kui-surface-3:   #3f3f3f;
  --kui-surface-4:   #4a4a4a;
  --kui-surface-hover:  rgba(255,255,255,0.07);
  --kui-surface-active: rgba(255,255,255,0.12);

  --kui-border:      #3a3a3a;
  --kui-border-strong: #555555;
  --kui-divider:     #2e2e2e;

  --kui-fg:          #ededeb;
  --kui-fg-muted:    #a8a8a4;
  --kui-fg-subtle:   #777774;
  --kui-fg-on-accent:#ffffff;

  --kui-accent:        #3584e4;
  --kui-accent-hover:  #478fe8;
  --kui-accent-active: #2f76cf;
  --kui-accent-soft:   #1b3047;

  --kui-success:        #33d17a;
  --kui-success-hover:  #47d789;
  --kui-success-active: #2bb86a;
  --kui-success-soft:   #173424;

  --kui-warning:        #e5a50a;
  --kui-warning-hover:  #efb023;
  --kui-warning-active: #cc9308;
  --kui-warning-soft:   #3b2d09;

  --kui-danger:         #e01b24;
  --kui-danger-hover:   #e8343d;
  --kui-danger-active:  #c4161f;
  --kui-danger-soft:    #3e1316;

  --kui-shadow-1: 0 1px 2px rgba(0,0,0,0.4), 0 1px 1px rgba(0,0,0,0.3);
  --kui-shadow-2: 0 2px 6px rgba(0,0,0,0.45), 0 1px 2px rgba(0,0,0,0.35);
  --kui-shadow-3: 0 8px 24px rgba(0,0,0,0.55), 0 2px 6px rgba(0,0,0,0.4);
}

/* Apply base bg/fg when you use the theme scope as a surface */
.kui-scope {
  background: var(--kui-bg);
  color: var(--kui-fg);
  font-family: var(--kui-font-sans);
}
`;

if (typeof document !== 'undefined' && !document.getElementById('kui-tokens')) {
  const s = document.createElement('style');
  s.id = 'kui-tokens';
  s.textContent = tokensCSS;
  document.head.appendChild(s);
}
