// Kev-UI Progress — bar, indeterminate, circular spinner, dots

const progCSS = `
.kui-progress {
  width: 100%; height: 6px; background: var(--kui-surface-3);
  border-radius: 999px; overflow: hidden;
}
.kui-progress__bar {
  height: 100%; background: var(--kui-accent);
  border-radius: 999px;
  transition: width 200ms cubic-bezier(.3,.7,.3,1);
}
.kui-progress--indet .kui-progress__bar {
  width: 40%; animation: kui-prog-indet 1.4s ease-in-out infinite;
}
@keyframes kui-prog-indet {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(350%); }
}

.kui-progress--thin { height: 3px; }
.kui-progress--thick { height: 10px; }
.kui-progress--success .kui-progress__bar { background: var(--kui-success); }
.kui-progress--warning .kui-progress__bar { background: var(--kui-warning); }
.kui-progress--danger  .kui-progress__bar { background: var(--kui-danger); }

/* Circular spinner */
.kui-spinner {
  width: 20px; height: 20px; display: inline-block;
  border: 2px solid var(--kui-surface-3);
  border-top-color: var(--kui-accent);
  border-radius: 50%;
  animation: kui-spin 700ms linear infinite;
}
.kui-spinner--sm { width: 14px; height: 14px; border-width: 1.5px; }
.kui-spinner--lg { width: 32px; height: 32px; border-width: 3px; }
@keyframes kui-spin { to { transform: rotate(360deg); } }

/* Dots pulse */
.kui-dots { display: inline-flex; gap: 4px; align-items: center; }
.kui-dots__d {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--kui-accent);
  animation: kui-dot 1.2s ease-in-out infinite;
}
.kui-dots__d:nth-child(2) { animation-delay: 150ms; }
.kui-dots__d:nth-child(3) { animation-delay: 300ms; }
@keyframes kui-dot {
  0%, 80%, 100% { opacity: 0.3; transform: scale(0.7); }
  40% { opacity: 1; transform: scale(1); }
}

/* Skeleton */
.kui-skeleton {
  background: linear-gradient(90deg,
    var(--kui-surface-3) 0%,
    var(--kui-surface-hover) 50%,
    var(--kui-surface-3) 100%);
  background-size: 200% 100%;
  border-radius: 6px;
  animation: kui-skel 1.4s ease-in-out infinite;
}
@keyframes kui-skel { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
`;

if (!document.getElementById('kui-prog-styles')) {
  const s = document.createElement('style'); s.id = 'kui-prog-styles'; s.textContent = progCSS;
  document.head.appendChild(s);
}

function KuiProgress({ value, indeterminate, tone, size }) {
  const cls = [
    'kui-progress',
    indeterminate && 'kui-progress--indet',
    tone && `kui-progress--${tone}`,
    size && `kui-progress--${size}`,
  ].filter(Boolean).join(' ');
  return (
    <div className={cls} role="progressbar" aria-valuenow={value}>
      <div className="kui-progress__bar" style={{ width: indeterminate ? undefined : `${value}%` }} />
    </div>
  );
}
function KuiSpinner({ size }) { return <span className={'kui-spinner' + (size ? ` kui-spinner--${size}` : '')} />; }
function KuiDots() { return <span className="kui-dots"><span className="kui-dots__d"/><span className="kui-dots__d"/><span className="kui-dots__d"/></span>; }
function KuiSkeleton({ w = '100%', h = 14, r = 6, style = {} }) {
  return <div className="kui-skeleton" style={{ width: w, height: h, borderRadius: r, ...style }} />;
}

Object.assign(window, { KuiProgress, KuiSpinner, KuiDots, KuiSkeleton });
