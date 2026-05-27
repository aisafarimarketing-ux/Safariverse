# Handoff — SafariVerse · Editions System (Landing + Three-Mode Edition Container)

## Overview

This package contains the high-fidelity HTML design for two interlinked SafariVerse surfaces:

1. **Landing page** (`Landing.html`) — Logged-out marketing home. Dark cinematic hero band → paper-cream editorial sections (This Week's Editions, Through Their Lens, traveller pull-quote, Asha-the-concierge byline, masthead footer).
2. **Edition detail page** (`Edition.html`) — One Edition (sample: "Honeymoon in Kenya — twelve days · golden hour") rendered in **three presentation modes** driven by a single data record. A mode-switch pill in the top bar lets the traveller toggle between them:
   - **◐ Read** — Scroll-Story (default): vertical editorial long-read with parallax hero, prelude pull-quote, illustrated journey map, day-by-day sections with sticky ordinals, compact Sources & Attribution panel under each day, Inspired By creator grid, Places You'll Stay, Make-It-Yours concierge CTA, masthead footer.
   - **▣ Lookbook** — Flipbook: cinematic 3D page-turn lookbook (cover spread, prelude spread, six day spreads, inspirations spread, make-it-yours spread, back cover). Keyboard ← → and click-edge turn pages.
   - **✦ Poster** — Atlas-Poster: single editorial composition (cover masthead → display title → hero photo → journey list → route mini-map → inspired by → stay at → organized by seal → CTA → masthead echo). Available in **cream** (default) and **vintage aged** sub-variants (warm-LUT photography, double rules, paper-aged ground, corner botanical motif).

The brand position is **adaptive cinematic storytelling**: every Edition is one data record rendered three ways. Same source, three presentations, one editorial language.

---

## About the Design Files

**These files in `source/` are design references** — HTML prototypes built with React 18 (via in-browser Babel) and inline CSS, showing intended look, layout and behaviour. They are **not production code to ship directly.**

The implementation task is to **recreate these designs in the target codebase's existing environment**: React/Next, Vue, SwiftUI, native, etc., using its established component patterns, design tokens, routing, data layer and image handling.

If no environment exists yet, **React + Next.js (App Router) + Tailwind + Framer Motion** is the recommended choice — the design relies on:
- Aspect-ratio CSS, `grid` with `gap`, `:has()`, CSS custom properties (well supported)
- `IntersectionObserver` for auto-playing the reel embeds on scroll
- CSS 3D transforms with `transform-style: preserve-3d` and `rotateY` for the page-turn
- Real Google Fonts loading (Fraunces variable + Inter)
- Image-heavy editorial layout — needs `next/image` (or equivalent) with proper sizing, art-direction crops, and licensed photography

---

## Fidelity

**High-fidelity.** Final colours, typography, spacing, motion timings and interaction behaviour are all locked. The developer should recreate the UI pixel-faithfully using the codebase's existing libraries.

What is **not** locked and should be done as part of implementation:
- **Photography** — the prototype uses Unsplash placeholder URLs (cinematic safari/golden-hour stand-ins). Replace with real licensed creator photography. The brief explicitly says creator attribution is part of the design, not a footnote.
- **Review numbers** — TripAdvisor / Google star counts in the Sources & Attribution panel are plausible editorial placeholders. Pull from real APIs on the live build. (Note: the prototype intentionally does NOT recreate TripAdvisor/Google brand logos — only uses the platform names plus stars/counts, since pixel-recreating those marks is a trademark concern. Keep that policy in the live build, or only use the official platforms' supplied review widgets.)
- **Map illustrations** — the journey map and route strip are illustrated stand-ins. The brief says: never default Google Maps tiles. Commission a custom paper-cream cartographic style.

---

## Screens / Views

### 1. Landing (`Landing.html`)

#### 1.1 Top bar
Fixed full-width header. Wordmark left (Fraunces 300, 22px, ember `✦` superscript), inline nav links centre (Editions / Storytellers / Destinations / Studio — Inter 500, 12px, +0.14em tracking, uppercase, `--ink-soft` colour, `--ink-bright` on hover), search icon circle + 36px avatar right.

On scroll past 40px, adds `is-scrolled` class — background `rgba(15,14,12,0.78)` + `backdrop-filter: blur(14px)` + 1px bottom hairline.

#### 1.2 Hero band
Full-viewport-height (min 720px). Single full-bleed photograph (`photo-1547471080-7cc2caa01a7e`, Lewa at dawn) with slow Ken Burns animation (24s, alternate). Two-layer scrim:
- `linear-gradient(180deg, rgba(15,14,12,0.55) 0%, rgba(15,14,12,0) 22%, rgba(15,14,12,0) 55%, rgba(15,14,12,0.85) 100%)`
- `linear-gradient(90deg, rgba(15,14,12,0.45) 0%, rgba(15,14,12,0) 50%)`

Content grid: 3 rows (top edition mark / centre title / bottom caption + scroll hint).

- **Edition mark** (top): 10px Inter 600 +0.32em tracking, ember 36×1px hairline prefix.
- **Title** (centre): `display--xxl` (Fraunces 300, clamp(56px, 9vw, 112px), -0.015em, line 1.05). Copy: "Where the wild / ones whisper." 
- 96×1px hairline rule beneath title (60% opacity ink-bright).
- **Sub** (Fraunces 300 italic, clamp(20px, 2.2vw, 28px)): "A universe of African safari editions — dreamed by photographers, shaped by storytellers, and tailored, one journey at a time, by the people who live there."
- **CTA pill**: ember `#E25822` fill, paper-cream text, 18px 28px padding, 9999px radius, Inter 600 13px +0.16em uppercase. Glyph `✦` + "Begin Dreaming" + `→`. Hover: `--ember-deep` background, -1px translateY.
- **Bottom row**: photo caption left (creator credit), "Scroll to enter" + 48px vertical hairline on right.

#### 1.3 This Week's Editions
Paper-cream section, 120px vertical padding. Section header is a 2-column grid: left has eyebrow + `display--lg` title; right has caption + ghost "All Editions →" CTA.

Then a 3-column grid (gap 40px) of **Atlas-Poster preview cards** — each is `aspect-ratio: 2/3`, full-bleed background photo, paper-aged background, with:
- 14px inset hairline frame (1px `rgba(245,241,234,0.6)`)
- Bottom-to-top dark scrim
- Top row inside the inset: `✦ Edition NN` left, category label right (9px Inter +0.32em uppercase)
- Bottom: Fraunces 300, 38px title; 48×1px paper-cream hairline; Fraunces italic 14px meta (`twelve days · golden hour`)
- Hover: -4px translate, photo `scale(1.04)` 1200ms ease

#### 1.4 Through Their Lens (dark band)
Canvas-deep background, 120px vertical padding. Same section header pattern but white text + ember eyebrow.

4-column grid of **creator cards**:
- `aspect-ratio: 3/4`, canvas-night background
- Full-bleed cropped portrait photo (full-bleed, hover scale 1.05 over 1500ms)
- Bottom-to-top dark scrim
- Top-right: large Fraunces 300 30px ember-soft number (their content count: 14, 08, 11, 22)
- Bottom-left: Fraunces 300 26px name, then 11px Inter +0.16em uppercase role · base location

#### 1.5 Traveller pull-quote
Paper-cream section. Centred 1080px max width. 96px Fraunces italic ember `"` mark; then `clamp(32px, 4vw, 52px)` Fraunces italic 300 pull-quote in `--ink-deep`; then 11px +0.24em uppercase `--ink-muted` citation `Sarah Adeyemi · Honeymoon in Kenya · 2026` prefixed with em-dash.

#### 1.6 Concierge band
2-col grid (1fr 1.2fr), 80px gap. Left: 4:5 aspect concierge portrait with inset hairline frame. Right: eyebrow "Your Concierge" → italic pull-quote → byline (56px circle avatar + name 600/15px + role 12px muted) → hairline → 15px body → CTA row (ember pill + ghost link).

#### 1.7 Footer
Canvas-deep, 96px top padding. 4-col grid (`2fr 1fr 1fr 1fr`): masthead column (40px Fraunces wordmark + italic tagline), then three link columns under 10px +0.24em uppercase headings. Below: 1px dark hairline, then base row (Edition number / year on left, legal links on right).

---

### 2. Edition (`Edition.html`) — shell

#### 2.1 Top chrome
3-column grid (`1fr auto 1fr`): left (back arrow + wordmark + `/` + `Edition NN` crumb), centre (mode-switch pill), right (save + share icon buttons).

`is-shrunk` class on scroll past 80px: background `rgba(245,241,234,0.94)` + blur(14px) + 1px bottom hairline + reduced padding (18→12px).

`is-dark` modifier when mode ≠ read: white text on rgba(15,14,12,0.85) shrunk bg / linear-gradient scrim when not shrunk.

#### 2.2 Mode-switch pill
Inline-flex, 4px padding, 1px hairline border, 9999px radius, `rgba(245,241,234,0.85)` + blur(8px) background (paper). Dark variant uses `rgba(26,24,21,0.65)`.

Three buttons, each: 10px 18px padding, Inter 500 11px +0.16em uppercase. Glyph (◐ / ▣ / ✦) at 12px + label. Inactive: `--ink-muted`, hover `--ink-deep`. Active: ember fill + paper-cream text.

State resets scroll to 0 on mode change. `useTweaks` hook persists `posterVariant` (cream | vintage) to disk via `__edit_mode_set_keys`.

#### 2.3 Sticky bottom CTA (read mode only)
Appears when `scrollY > 80`. Centred pill `bottom: 24px` with `rgba(15,14,12,0.92)` fill + blur(14px) + dark hairline border + fadeUp animation. Contains: caption "Edition NN · {title}" + ember CTA pill "Make This Mine →".

---

### 3. Read mode — Scroll-Story

#### 3.1 Hero band
100vh / min 720px. Full-bleed photo with `transform: translateY(scrollY * 0.35) scale(1 + scrollY * 0.0003)` — JS-driven parallax. Bottom gradient fades into paper-cream surface. Pinned bottom-left caption: subject (caps 11px) + credit (caps 11px 70% opacity).

#### 3.2 Title block
Paper-cream, centred. 128px top / 96px bottom padding.
- Eyebrow "Edition 01"
- `display--xxl` title
- 120×1px acacia-rule hairline (32px above/below)
- Fraunces italic sub (clamp 20-28px, `--ink-body`)
- Byline row: 11px caps "Edited by *Asha Mwangi* · Photographs by Jane Doe et al." with acacia dot separators

#### 3.3 Prelude
720px max-width, centred. Eyebrow "The Story" → pull-quote `clamp(28px, 3.6vw, 44px)` Fraunces italic 300 — "Some journeys you take. / Others take you." → 2 body-editorial paragraphs (17px Inter 400, 1.6 line-height, max 600px, left-aligned) → ✦ ornamental terminator.

#### 3.4 Journey summary
1000px max-width centred. Eyebrow "The Journey" → canvas-sand panel (56px 32px padding) containing dashed acacia path SVG + 4-stop grid (10px ember dot, 30px Fraunces stop number in ember, Fraunces 22px name, Fraunces italic 13px note, 10px caps days). Below the panel: italic 16px "12 days · 4 stops · 1 dream".

#### 3.5 Day section (sticky ordinal pattern)
2-col grid (`200px 1fr`, 72px gap), 72px vertical padding, 0.5px top hairline. First day has no top border.

**Sticky left side** (`position: sticky; top: 88px`):
- `ordinal` 96px Fraunces 300 ember number
- 60×1px acacia hairline beneath
- 10px caps Day stamp
- Fraunces italic 16px sub

**Right side** (max 720px):
- Full-width photo with alternating aspect ratio per day (cycling 4:5, 16:9, 1:1)
- 12px caption (subject · photo by creator)
- body-editorial paragraphs (1-2)
- The Lodge block: 36px top margin, 20px top hairline, eyebrow + Fraunces 18px lodge name · location

##### 3.5.1 Sources & Attribution panel (the compact 4-column strip)
Sits inside each day's right column, beneath the lodge block. Sand background `#E8DFD0`, 18px 24px 22px padding, 2px ember left-rule border.

- Head row: `✦` ember mark + "Sources & Attribution" eyebrow + flex-1 acacia hairline
- 4-col grid: `180px 200px 1fr 1.1fr`, 20px gap, align-items start

**Column 1 — Watch**: sub-eyebrow `WATCH` + a tiny `<ReelEmbed>` rendered with `.ss__attr-col--reel` modifier overrides:
- 16:9 screen, sprocket-hole rows top/bottom (3px squares 6px from edges)
- Canvas-deep frame with ember border
- Overlay: live indicator dot (pulses ember when playing) + 12px Fraunces title (clamp 2 lines), creator handle · platform
- Right side overlay: 24×24px play button (paper-cream circle, ink-deep `▶`), 9px tabular timecode
- 2px ember progress bar
- `IntersectionObserver` triggers `is-playing` at 0.3+ ratio — adds 14s ken-burns on thumbnail and ticks a `setInterval(1000)` to advance elapsed time

**Column 2 — Read**: sub-eyebrow `READ` + a small clickable blog card:
- `aspect-ratio: 16/10` cover with field-journal tag chip (top-left, dark backdrop-blur)
- Body: 14px Fraunces title (2-line clamp), 10px meta `by {author} · {read_time}`

**Column 3 — Accreditations**: sub-eyebrow + vertical-stacked credit list (each row: 8px caps role label above 12px Inter 500 name, with italic 11px platform suffix if present)

**Column 4 — Travellers Say**: sub-eyebrow + 2 stacked `ReviewChip` cards (22×22px platform mark + platform name + ember Fraunces 13px score + 9px stars row + 9px count) + 9px italic foot "**{lodge name}** verified reviews"

#### 3.6 Inspired By
Canvas-sand background, 96px vertical padding. Section header (eyebrow + `display--lg`) → 4-col creator grid (88px circle avatar + Fraunces 22px name + 11px caps role + Fraunces italic 13px contribution) → 0.5px hairline → also-referenced list (each row: ember `▶` + Fraunces italic 17px title in quotes + 11px caps platform · year).

#### 3.7 Places You'll Stay
Paper-cream, 96px vertical padding. Eyebrow + `display--lg` heading "Four houses, kept by people who learned the land before they learned hospitality." → 2-col grid of lodges (4:3 cover, then `display--md` lodge name, location caption, 15px body editorial note).

#### 3.8 Make It Yours
Canvas-deep dark band, centred. Eyebrow (ember coloured), pull-quote, 96px concierge avatar, name (Fraunces 22px) + role caps, Fraunces italic 26px concierge quote, CTA row (ember pill + ghost "Talk to Asha First →").

#### 3.9 Footer
Hairline-bracketed 3-row layout: organized-by row (eyebrow + ember-filled seal + studio name + caption) → hairline → base row (edition number · year on left, URL slug on right).

---

### 4. Lookbook mode — Flipbook

#### 4.1 Stage
100vh, 76px top / 90px bottom padding. **Textured warm dark background**:
```
background:
  radial-gradient(ellipse 70% 55% at 50% 22%, rgba(168,132,91,0.10) 0%, transparent 70%),
  radial-gradient(ellipse 55% 40% at 50% 100%, rgba(178,62,20,0.07) 0%, transparent 70%),
  radial-gradient(ellipse 100% 100% at 50% 50%, #1A1510 0%, #0E0B08 100%);
```
- `::before` — SVG fractalNoise grain, opacity 0.22, mix-blend-mode overlay
- `::after` — radial vignette (transparent 55% → rgba(0,0,0,0.55) 100%)

Book sits in centred pool of warm light with rich layered shadows: `0 40px 100px rgba(0,0,0,0.7), 0 16px 40px rgba(0,0,0,0.45), 0 0 80px rgba(168,132,91,0.08)`.

#### 4.2 Page-turn mechanic
`min(1180px, 96vw)` book width, 100% height. Each spread is absolutely positioned, `transform-origin: left center`, `transform-style: preserve-3d`. On state change:
- Past spreads: `rotateY(-180deg) translateZ(2px)`, no pointer events
- Current spread: z-index 20
- Future spreads: identity transform
- Transition: `transform 900ms cubic-bezier(0.4, 0, 0.2, 1)`

Click 80px-wide edge zones (left = back, right = forward), or arrow keys. Dot pager in bottom controls; ember-filled active dot scales 1.5×.

#### 4.3 Spread types
- **Cover** — full-bleed photo, Ken Burns, top masthead `SafariVerse · Edition NN`, centred title (clamp 56-96px Fraunces 300 ink-bright, 0.04em tracking), italic sub, paper-cream hairline 96×1px, byline caps row, photo caption bottom.
- **Prelude** — paper-cream, centred. "The Story" eyebrow + clamp 32-52px Fraunces italic pull-quote + 540px max body editorial + ✦ terminator.
- **Day** — paper-cream. 2-col header: large ember ordinal `display--xl` + Day NN eyebrow + acacia hairline. Below: `display--xl` title + Fraunces italic 22px sub. 16:9 photo + caption. Then 2-col body (1.6fr text + 1fr lodge aside with left hairline border, eyebrow + Fraunces 22px lodge name, then "As Seen On" + reel reference).
- **Inspirations** — paper-cream. Eyebrow + `display--xl` heading + intro. 4-col creator grid (80px avatar circle + Fraunces 22px name + caps role · base + italic contribution). Acacia hairline. Then "Also Referenced" 4-row list with hairline separators (ember play + Fraunces italic title + caps platform · year).
- **Make It Yours** — paper-cream centred. Eyebrow → italic pull-quote → 80px concierge avatar + name + caps role → italic 480px quote → ember CTA pill → secondary link → acacia hairline 240px → org row (SV studio seal + studio name + operator caption).
- **Back** — canvas-deep. Edition seal (100×100 circle, ember stroke, ember caps "EDITION NN") + Fraunces 24px "SafariVerse" + URL caption + 200px hairline + copyright.

---

### 5. Poster mode — Atlas-Poster

#### 5.1 Stage
Canvas-night background, 2-col grid (`320px 1fr`, 48px gap), 116px top / 64px bottom / 48px horizontal padding.

#### 5.2 Sidebar (sticky)
28px padding, 1px dark hairline border, `rgba(245,241,234,0.04)` background. Contains:
- Eyebrow + `display--md` "One spread. One artifact."
- 240px max caption
- Hairline
- "Outputs" eyebrow + list of 5 ratio rows (`56px` ember Fraunces ratio + ink-soft name): 2:3 / 1.91:1 / 9:16 / 1:1 / 9:19.5
- Hairline
- Variant description (cream vs vintage explanation)
- Hairline
- Download PDF CTA

#### 5.3 Poster card
720px max-width, `aspect-ratio: 2/3`. Paper-cream background (paper-aged when vintage). Box-shadow `0 32px 80px rgba(0,0,0,0.65), 0 8px 16px rgba(0,0,0,0.3)`.

Inner frame: 16px inset margin, 16px additional inset, 1px acacia hairline border (vintage uses double-rule via inset box-shadow + paper-aged inner layer). 24px 28px padding.

##### 5.3.1 Masthead row
3-col grid (1fr auto 1fr): `✦ Edition NN` left ember caps, italic centre "The Honeymoon Edition", `2026 ✦` right. Followed by ember-stamp hairline (vintage adds a second hairline at 50% opacity).

##### 5.3.2 Title row
Flex row align-items end. Left: Fraunces 300 clamp(38px, 6vw, 64px) destination name (uppercase, 0.08em tracking — vintage uses 0.1em). Right: 14px Fraunces italic sub "twelve days · golden hour" with prefix caption "Honeymoon in".

##### 5.3.3 Hero photo
`aspect-ratio: 16/11`. Vintage: filter `sepia(0.18) saturate(0.85) contrast(0.95)` + multiply gradient LUT + 18% opacity SVG grain. 6px inset paper-cream hairline frame. Below: 10px caption row (subject left, photograph credit right).

##### 5.3.4 Section list (each: hairline + eyebrow head)
- **The Journey** — 4 numbered Fraunces stops with ember ordinal + ink-deep name + italic note + caps days
- **Route** — 36px route SVG with dashed ember path + 4 ember-dot stops with 9px caps labels
- **Inspired By** — row of 4 creator chips (24px avatar circle with acacia border + 10px Inter 500 name); italic ember "Watch the original films" link
- **Stay At** — 4 lodge rows (Fraunces 12px lodge name + italic 11px location)
- **Organized By** — 64×64 ember-filled SV studio seal + studio name + caption

##### 5.3.5 Footer CTA
Ember-stamp hairline → centred ember CTA pill "✦ Make This Mine →" (10px 24px padding, 11px Inter 600 +0.2em uppercase).

##### 5.3.6 Masthead echo
8px Inter caps "Edition NN · safariverse.com · 2026" centred at base.

##### 5.3.7 Vintage corner motifs
SVG botanical (thorn-tree branch silhouette) top-left and bottom-right corners at 45% opacity. Stroke `var(--ember-stamp)` 0.6px.

---

## Interactions & Behaviour

### Mode switching
- Click any mode button → switches `mode` state, resets `window.scrollY` to 0
- Mode persists across reloads via the `useTweaks` hook only for `posterVariant`
- Top bar `is-dark` modifier toggles when mode ≠ read

### Scroll behaviours (Read mode)
- Top bar shrinks at scrollY > 80
- Sticky bottom CTA appears at scrollY > 80
- Hero photo parallax: `transform: translateY(scrollY * 0.35) scale(1 + scrollY * 0.0003)` — re-bound to scroll event
- Day-section ordinal sticks at top: 88px from viewport top while its parent is in view

### Reel auto-play (Sources & Attribution panel)
- `IntersectionObserver` with `threshold: [0, 0.3, 0.6, 1]`
- When `intersectionRatio > 0.3`, set `playing = true`
- While playing: `setInterval(1000)` ticks elapsed time, modulo `(totalSec + 1)`
- `is-playing` class on `.ss__reel` toggles ken-burns + brightness restoration
- Live indicator dot: pulses ember (10px box-shadow expanding to transparent) on a 1.6s loop

### Flipbook page-turn
- `direction` state ('next' | 'prev') drives transform of the leaving spread
- Spreads with `is-past` class: `rotateY(-180deg) translateZ(2px)`
- 900ms transition with `cubic-bezier(0.4, 0, 0.2, 1)`
- ArrowRight / ArrowLeft keyboard handlers bound to `idx` state
- 80px-wide edge click zones (left/right)
- Dot pager for direct jump
- Cover spread has its own Ken Burns animation (20s loop, alternate)

### Poster variant toggle
- `Tweaks` panel exposes `posterVariant` radio (cream / vintage)
- Vintage adds: `is-vintage` class which:
  - Switches background to paper-aged `#EDE5D3`
  - Applies sepia/saturation filter to hero photo
  - Adds LUT gradient + grain SVG overlay on hero
  - Switches single hairlines to doubled ember-stamp rules
  - Adjusts title tracking from 0.08em → 0.10em
  - Shows corner botanical motif SVGs

### Hover states
- Edition poster cards: `translateY(-4px)` + photo `scale(1.04)` over 1200ms
- Creator cards: photo `scale(1.05)` over 1500ms
- Blog cards: `translateY(-2px)` over 400ms
- Top bar icons: opacity 0.7 → 1, +8% black background
- CTA pill: `--ember-deep` background + `-1px translateY`
- CTA ghost: border colour transitions to ink-deep / ink-bright

---

## State Management

```
EditionApp state:
  mode: 'read' | 'lookbook' | 'poster'     // local React state
  shrunk: boolean                          // scroll > 80
  tweaks.posterVariant: 'cream' | 'vintage' // persisted to disk

Flipbook state:
  idx: number                              // current spread index
  direction: 'next' | 'prev'               // for animation direction

ReelEmbed state:
  playing: boolean                         // driven by IntersectionObserver
  elapsed: number                          // seconds, ticks while playing

Scroll-Story state:
  scrollY: number                          // for hero parallax
```

Data is statically imported from `edition-data.js` (window.EDITION) in the prototype. In the real codebase, fetch the Edition by slug and pass through props.

---

## Design Tokens

### Colours
```
/* Canvases */
--canvas-deep:    #0F0E0C   /* Primary app background (dark cinematic) */
--canvas-night:   #1A1815   /* Elevated dark surface */
--canvas-dusk:    #252220   /* Dark hover/active */
--canvas-paper:   #F5F1EA   /* Primary light surface */
--canvas-sand:    #E8DFD0   /* Secondary light surface (panels, journey box) */
--paper-cream:    #F5F1EA   /* Editorial body ground */
--paper-aged:     #EDE5D3   /* Vintage poster variant */

/* Inks */
--ink-bright:     #F5F1EA   /* Primary text on dark */
--ink-soft:       #C5BDB0   /* Secondary text on dark */
--ink-muted:      #8A8278   /* Tertiary text */
--ink-deep:       #1A1815   /* Primary text on light */
--ink-body:       #3A3530   /* Body text on light */

/* Accent — used scarcely */
--ember:          #E25822   /* Single brand accent (CTAs, ordinals, stamps) */
--ember-deep:     #B23E14   /* Press / stamp colour */
--ember-soft:     #F3B89A   /* Badge tint */
--acacia:         #A8845B   /* Secondary warm accent / hairlines */
--acacia-rule:    #A8845B   /* Editorial divider colour */
--gold-foil:      #C9A66B   /* Studio proposal accents only — sparing */

/* Dividers */
--divider-dark:   #2C2926
--divider-light:  #D8D0C2

/* Signals (not used in current screens) */
signal-success:   #7BA471
signal-warning:   #D9A24F   /* also used for review stars */
signal-error:     #C5594E
```

### Typography
- **Display**: Fraunces (variable). Weights **300** (most uses), **400**, **500**. `font-variation-settings: "opsz" 144` for display sizes. Italic variant `400 italic` is the editorial pull-quote weight.
- **Body**: Inter. Weights **400** (body), **500** (captions, links), **600** (eyebrows, micro-labels).

Scale (`editorial.css` `.display--*`, `.eyebrow`, `.caption`, etc.):
```
display-xxl    clamp(56px, 9vw, 112px) / 1.05 / -0.015em / Fraunces 300
display-xl     clamp(40px, 6vw, 72px)  / 1.05 / -0.015em / Fraunces 300
display-lg     clamp(32px, 4vw, 48px)  / 1.05 / -0.015em / Fraunces 300
display-md     clamp(24px, 3vw, 34px)  / 1.05 / -0.015em / Fraunces 300

body-editorial 17px / 1.6 / Inter 400 (on paper)
caption        12px / 1.4 / Inter 500 / +0.04em
eyebrow        11px / 1.25 / Inter 600 / +0.18em / uppercase / ember-stamp colour
stamp-text     10px / 1.25 / Inter 600 / +0.24em / uppercase
sub-eyebrow     9px / Inter 600 / +0.22em / uppercase

ordinal        Fraunces 300 / tabular-nums / -0.02em / line 0.9 / ember-stamp colour
```

### Spacing
8px base + 4px micro: `2, 4, 8, 12, 16, 24, 32, 48, 64, 96, 128`. Section vertical padding ranges 64-128px depending on density.

### Radius
- **sm**: 8 (inputs, small buttons) — not used in current screens
- **md**: 16 (cards) — not used
- **pill**: 9999 (CTAs, chips, mode-switch, sticky CTA)
- **circle**: 50% (icon buttons, avatars, seals, platform marks)

The editorial vocabulary intentionally uses **0 corner radius on most cards** (panels, posters, photos, blog covers) — sharp magazine-style edges. Only buttons and avatars round.

### Shadows / elevation
```
card-flat:   none                                              /* default */
card-hover:  rgba(0,0,0,0.35) 0 4px 16px
sheet:       rgba(0,0,0,0.5)  0 -8px 32px
modal:       rgba(0,0,0,0.6)  0 8px 40px

/* The flipbook spread shadow stack */
0 40px 100px rgba(0,0,0,0.7),
0 16px 40px  rgba(0,0,0,0.45),
0 0 0 1px    rgba(0,0,0,0.4),
0 0 80px     rgba(168,132,91,0.08)    /* warm light pool */
```

### Motion tokens
```
--ease-out:    cubic-bezier(0.25, 0.1, 0.25, 1)   /* default */
--ease-curl:   cubic-bezier(0.4, 0, 0.2, 1)       /* page-turn */

duration-short    250ms   /* taps, toasts */
duration-default  400ms   /* sheets, modals, blog hover */
duration-long     600ms   /* page transitions, hero crossfade */
duration-curl     900ms   /* flipbook page-turn */

Slow Ken-Burns:   20-24s ease-in-out infinite alternate, scale 1 → 1.06
Reel Ken-Burns:   14s ease-in-out infinite alternate, scale 1.04 → 1.12
Hairline draw:    600ms ease-out, transform-origin left, scaleX 0 → 1
Stamp impress:    250ms ease, scale 1.05 overshoot → 1.0
Live-dot pulse:   1.6s ease-out infinite, box-shadow 0 → 10px ember → transparent
```

---

## Editorial primitives (reusable building blocks)

The brief identifies 8 shared primitives that appear across all three modes — implement these as proper components in the target codebase:

1. **Hairline rule** — 0.5px on paper, 1px on dark. `acacia-rule` on paper, `divider-dark` on dark.
2. **Editorial seal** — 40-60px circular badge with 1px ember stroke. Filled variant inverts (ember bg, paper-cream text).
3. **Display ordinal** — Large weight-300 Fraunces tabular numeral. 88-160px.
4. **Eyebrow + headline pair** — 11px caps +0.18em uppercase (with optional 28×1px prefix hairline) above 32-48px Fraunces.
5. **Caption block** — 12px Inter 500 with format `[Subject] · [Location] · [Creator] · [Year]`.
6. **Byline tag** — 32px circular avatar + name + role (smaller-line). 80px variant for hero contexts.
7. **Map strip** — Custom dashed-acacia path SVG + ember dots, never Google Maps tiles.
8. **Film-strip embed** — Sprocket-hole rows around an aspect-bound video screen. 9:16 (vertical reels), 16:9 (clips), or compact 16:9 tile (in Sources & Attribution panel).

Plus three patterns used across this design that you should componentise:

- **Mode-switch pill** — 3-state segmented control (◐ Read / ▣ Lookbook / ✦ Poster) with ember active fill
- **Review chip** — circular platform mark + platform name + ember Fraunces score + star row + count
- **Edition poster card** — 2:3 aspect Atlas-Poster preview with masthead label + title + meta + hairline frame inset

---

## Assets

### Photography (placeholders)
All current photos are Unsplash URLs (`https://images.unsplash.com/photo-...`). Replace with licensed creator photography. Sizes used:
- Hero/landing: w=2400, q=85
- Edition heroes: w=1600, q=85
- Lodge tiles: w=1200, q=85
- Creator avatars: w=300, q=80
- Blog covers: w=1200, q=85
- Reel thumbnails: w=900, q=85

### Fonts
- **Fraunces** (Google Fonts variable) — opsz 9..144, weights 300/400/500, normal + italic
- **Inter** (Google Fonts variable) — weights 400/500/600/700

Imported at top of `editorial.css` via:
```css
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;1,9..144,300;1,9..144,400&family=Inter:wght@400;500;600;700&display=swap');
```

### Icons
Inline SVG (1.5-1.6 stroke-width line icons) for search, back-arrow, save (bookmark), share. No icon library — keep using a tree-shaken set like `lucide-react` in the implementation.

No clichés permitted: no airplane icons, no umbrella/beach iconography, no passport stamps, no raffia/wood/leather textures (the brief is explicit about this).

---

## Files

In `source/`:

| File | What it contains |
|---|---|
| `Landing.html` | Standalone landing page — all styles inline + `editorial.css`. |
| `Edition.html` | Edition shell. Loads React + Babel CDN + all JSX files. All mode-specific CSS lives inline in `<style>`. |
| `editorial.css` | Shared design tokens (CSS custom properties), typography utility classes, editorial primitives (`.eyebrow`, `.display`, `.caption`, `.hairline`, `.seal`, `.byline`, `.cta-pill`, `.cta-ghost`, `.mode-pill`, `.ken-burns`, `.grain`). |
| `edition-data.js` | Sample data for the Honeymoon-in-Kenya Edition (window.EDITION). Includes 6 day records each with: `n` (day number), `title`, `sub`, `photo`, `photo_caption`, `photo_credit`, `narrative` (and optional `narrative_2`), `lodge` (name, location), `inspired_by`, `reel` (thumbnail/platform/handle/duration/title), `blog` (cover/eyebrow/title/author/date/read_time), `credits` (role/name/platform array), `reviews` (platform/score/count/label array). Plus top-level `hero`, `prelude`, `journey.stops`, `creators`, `source_media`, `lodges`, `concierge`, `organized_by`. |
| `edition-app.jsx` | `EditionApp` shell — top bar with mode-switch pill, sticky bottom CTA on read mode, Tweaks panel (cream/vintage toggle). |
| `edition-scroll.jsx` | `ScrollStory`, `DaySection`, `ReelEmbed`, `BlogCard`, `ReviewChip` components for Read mode. |
| `edition-flipbook.jsx` | `Flipbook`, `SpreadRenderer`, `CoverSpread`, `PreludeSpread`, `DaySpread`, `InspirationsSpread`, `MakeItYoursSpread`, `BackSpread`, `PageNumber` for Lookbook mode. |
| `edition-poster.jsx` | `AtlasPoster`, `SectionHead` for Poster mode. |
| `tweaks-panel.jsx` | Tweaks panel scaffold (used in dev to demo the cream/vintage variant). Strip in production. |

---

## Implementation suggestions

### Routing
The brief specifies URL patterns:
```
/editions/{slug}                  → Read (default Scroll-Story)
/editions/{slug}/lookbook         → Flipbook
/editions/{slug}/poster           → Atlas-Poster (cream)
/editions/{slug}/poster?v=vintage → Atlas-Poster vintage
/editions/{slug}/poster.pdf       → PDF export
/editions/{slug}/og.png           → 1.91:1 OG image
/editions/{slug}/story.png        → 9:16 story share
```
Implement the four ratio crops via a single React layout + a server-rendered headless-browser PNG endpoint, OR via art-direction `srcset` on a single canvas component.

### JSON-LD / SEO
The Scroll-Story is the SEO/AI-readable canonical:
- `TouristTrip` schema with nested `TouristAttraction` per day, `LodgingBusiness` per stay, `Person` per creator
- Each day's narrative wrapped in `<article>`
- Source video embeds use `VideoObject` schema with proper `creator` + `contentUrl` + `embedUrl`
- `og:image` = the Atlas-Poster export at 1.91:1
- `og:title` = Edition title
- `og:description` = first sentence of the prelude pull-quote

### Accessibility
- Mode-switch pill is `role="tablist"` with `aria-selected` on the active button
- Day sections are `<article>` with the Day N as `<h2>`
- Reel embeds: add `aria-label="Watch {title} by {creator}"` to the play overlay
- Lookbook page-turn: announce page change with `aria-live="polite"` region
- All keyboard handlers cleanup in useEffect return

### Performance
- Lazy-load all Edition images except the hero band — `loading="lazy"` + `decoding="async"`
- Use `next/image` (or equivalent) for srcset + AVIF/WebP
- The Flipbook should virtualise spreads beyond ±2 from current index in long Editions (12+ days)
- Reel `setInterval` should pause when not playing — current implementation already does this

---

## Known caveats / TODOs

- Six day spreads are rendered in the prototype, not the full twelve described by the brief. Extend `edition-data.js` with the missing days (2, 4, 6, 8, 10, 11) to match the spec.
- No mobile-app shell (iOS/Android frames) was built in this pass — the brief includes a full Phase 1 consumer MVP screen list (Discover, Reel detail, Concierge chat, AI Dream Builder etc.). This handoff covers Landing + Edition only.
- No destination pages, creator profile pages, blog templates, or search results — though they share the same vocabulary and would build cheaply on the primitives shipped here.
- The cover spread photography URL `photo-1547471080-7cc2caa01a7e` is the same as the Read-mode hero — pick a distinct, more "cover-y" shot for the Lookbook cover in production.
- The `__bundler_thumbnail` template is not embedded in these files; if you bundle them via `super_inline_html` for offline use, add one.

---

*End of handoff. Same source, three presentations, one editorial language across the entire universe.*
