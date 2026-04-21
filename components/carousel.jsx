// Kev-UI Carousel / Slider

const carCSS = `
.kui-car { position: relative; font-family: var(--kui-font-sans); }
.kui-car__track {
  display: flex; overflow: hidden; border-radius: 9px;
  background: var(--kui-surface-1); border: 1px solid var(--kui-border);
}
.kui-car__slide {
  flex: 0 0 100%; padding: 24px;
  transition: transform 360ms cubic-bezier(.3,.7,.3,1);
}
.kui-car__nav {
  position: absolute; top: 50%; transform: translateY(-50%);
  width: 32px; height: 32px; border-radius: 50%;
  background: var(--kui-surface-1); border: 1px solid var(--kui-border);
  display: grid; place-items: center; cursor: pointer; color: var(--kui-fg);
  box-shadow: var(--kui-shadow-2);
}
.kui-car__nav:hover { background: var(--kui-surface-3); }
.kui-car__nav--prev { left: -8px; }
.kui-car__nav--next { right: -8px; }
.kui-car__dots { display: flex; justify-content: center; gap: 6px; margin-top: 10px; }
.kui-car__dot { width: 6px; height: 6px; border-radius: 50%; background: var(--kui-surface-4); border: none; padding: 0; cursor: pointer; transition: all 160ms; }
.kui-car__dot[data-active="true"] { background: var(--kui-accent); width: 18px; border-radius: 3px; }
`;
if (!document.getElementById('kui-car-styles')) {
  const s = document.createElement('style'); s.id = 'kui-car-styles'; s.textContent = carCSS;
  document.head.appendChild(s);
}

function KuiCarousel({ slides = [] }) {
  const [i, setI] = React.useState(0);
  const go = (d) => setI((i + d + slides.length) % slides.length);
  return (
    <div className="kui-car">
      <div className="kui-car__track">
        <div style={{ display: 'flex', width: '100%', transform: `translateX(-${i * 100}%)`, transition: 'transform 360ms cubic-bezier(.3,.7,.3,1)' }}>
          {slides.map((s, idx) => <div key={idx} className="kui-car__slide">{s}</div>)}
        </div>
      </div>
      <button className="kui-car__nav kui-car__nav--prev" onClick={() => go(-1)}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10 3L5 8l5 5"/></svg>
      </button>
      <button className="kui-car__nav kui-car__nav--next" onClick={() => go(1)}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3l5 5-5 5"/></svg>
      </button>
      <div className="kui-car__dots">{slides.map((_, idx) => <button key={idx} className="kui-car__dot" data-active={idx === i} onClick={() => setI(idx)} />)}</div>
    </div>
  );
}

/* Range slider */
const sliderCSS = `
.kui-slider { -webkit-appearance: none; appearance: none; width: 100%; height: 4px; background: var(--kui-surface-3); border-radius: 999px; outline: none; }
.kui-slider::-webkit-slider-thumb {
  -webkit-appearance: none; width: 16px; height: 16px; border-radius: 50%;
  background: var(--kui-surface-1); border: 1px solid var(--kui-border-strong);
  box-shadow: 0 1px 3px rgba(0,0,0,.15); cursor: pointer;
}
.kui-slider::-moz-range-thumb {
  width: 16px; height: 16px; border-radius: 50%;
  background: var(--kui-surface-1); border: 1px solid var(--kui-border-strong);
  box-shadow: 0 1px 3px rgba(0,0,0,.15); cursor: pointer;
}
`;
if (!document.getElementById('kui-slider-styles')) {
  const s = document.createElement('style'); s.id = 'kui-slider-styles'; s.textContent = sliderCSS;
  document.head.appendChild(s);
}
function KuiSlider({ value, onChange, min = 0, max = 100 }) {
  return <input type="range" className="kui-slider" min={min} max={max} value={value} onChange={(e) => onChange && onChange(+e.target.value)} />;
}

Object.assign(window, { KuiCarousel, KuiSlider });
