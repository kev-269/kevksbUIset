# Kev-UI

A GNOME/Adwaita-inspired UI component library in plain HTML + CSS + React (via Babel standalone). Engineering-focused, professional palette, light & dark mode, zero build step.

![Kev-UI](https://img.shields.io/badge/style-adwaita-3584e4) ![Themes](https://img.shields.io/badge/themes-light%20%2B%20dark-1e1e1e) ![No-Build](https://img.shields.io/badge/build-none-26a269)

## Demo

Open **`index.html`** for the landing + showcase, or **`Kev-UI-canvas.html`** for the raw design canvas with every component side-by-side in light + dark.

## What's inside

| Category | Components |
|---|---|
| **Foundations** | Color tokens · Type scale · Radius · Spacing |
| **Controls** | Button (suggested, default, destructive, flat, pill, circular) |
| **Forms** | Input · Textarea · Select · Checkbox · Radio · Switch · Segmented · Dropzone · Field w/ error states |
| **Layout** | Card · Accordion · Tabs (underline + pill) · Pagination |
| **Navigation** | Top navbar · Sidebar · 3 top-bar variants (compact, split, marketing) |
| **Data** | Sortable table · Stat cards · Sparklines · Gauges · Bar · Line + area · Donut · Time series |
| **Feedback** | Progress bar · Spinner · Dots · Skeleton · Toast · Dialog · Drawer · Popover |
| **Engineering** | Pipeline stages · Activity grid · Log panel · Copy-to-clipboard · Zoom viewer · Export menu |
| **Badges** | Status badges · Removable tags · Keyboard keys |
| **Motion** | Blueprint reveal · Flight route loader · Radar HUD · Paper airplane |
| **Misc** | Carousel · Slider |

## Running locally

Because files load via `<script src="components/...">`, you need a local server (not `file://`):

```bash
# Python (mac/linux, or Windows with Python installed)
python3 -m http.server 8000

# or Node
npx serve .
```

Then open [http://localhost:8000](http://localhost:8000).

**VS Code users:** install the *Live Server* extension, right-click `index.html` → *Open with Live Server*.

## Using components in your own project

Every component lives in its own `.jsx` file under `components/`. Copy what you need. All components read from CSS variables defined in `components/tokens.jsx` — drop that file in first and the rest will inherit the theme.

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<script src="https://unpkg.com/react@18.3.1/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js"></script>

<script type="text/babel" src="components/tokens.jsx"></script>
<script type="text/babel" src="components/button.jsx"></script>

<div data-theme="light" class="kui-scope">
  <!-- your app, rendered via React -->
</div>
```

Switch themes by setting `data-theme="dark"` on any parent element.

## Design tokens

Primary accent is Adwaita blue (`#3584e4`). All colors, radii, spacing, and type scale are defined as CSS custom properties in `components/tokens.jsx` — override any of them to re-theme.

## License

MIT
