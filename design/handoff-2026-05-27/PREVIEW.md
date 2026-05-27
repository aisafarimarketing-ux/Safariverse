# How to preview this handoff locally

This folder contains the high-fidelity HTML/React prototype delivered by Claude Design on 2026-05-27 for the SafariVerse Landing page and the Edition container system (Scroll-Story / Flipbook / Atlas-Poster).

The files in `source/` use React 18 + Babel via CDN, with inline JSX compiled in the browser. They cannot be opened directly with `file://` because the `<script src="...">` references won't resolve. You need any static web server.

## Quick run

From the repo root:

```bash
npx -y serve design/handoff-2026-05-27/source --listen 5174
```

Then open:

- http://localhost:5174/Landing.html
- http://localhost:5174/Edition.html

The Edition page boots into Read mode by default. Click the mode-switch pill in the top bar (`◐ Read · ▣ Lookbook · ✦ Poster`) to switch presentations. In Poster mode the dev Tweaks panel exposes the cream/vintage variant toggle.

## What's in this folder

| File | Purpose |
|---|---|
| `README.md` | Full design handoff documentation (561 lines from Claude Design) |
| `PREVIEW.md` | This file |
| `source/Landing.html` | Standalone landing page |
| `source/Edition.html` | Edition shell — loads React, Babel, and the four JSX modules |
| `source/editorial.css` | Shared design tokens, type system, editorial primitives |
| `source/edition-data.js` | Sample Edition data (`window.EDITION`) — "Honeymoon in Kenya" |
| `source/edition-app.jsx` | App shell, mode switcher, sticky CTA, Tweaks panel mount |
| `source/edition-scroll.jsx` | Read mode (Scroll-Story) + ReelEmbed + BlogCard + ReviewChip |
| `source/edition-flipbook.jsx` | Lookbook mode (page-turn Flipbook) and all spread types |
| `source/edition-poster.jsx` | Poster mode (Atlas-Poster) — cream and vintage variants |
| `source/tweaks-panel.jsx` | Dev-only tweak UI (strip in production) |

## Status

This prototype is a **design reference**, not production code. The implementation target is **Next.js 15 (App Router) + Tailwind + Framer Motion** per the handoff. The Next.js port lives (or will live) in `web/` at the repo root.

Build order locked: **Scroll-Story → Atlas-Poster → Flipbook**.
