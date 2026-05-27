# SafariVerse — Itinerary Container System & Editorial Design Vocabulary

**Purpose**: Define the three itinerary container variants (Flipbook, Scroll-Story, Atlas-Poster) and the shared editorial vocabulary that extends across the entire site — landing page, destinations, creator profiles, blog, search results — so every screen feels like one cinematic, editorial, photographic studio.

**Companion to**: `01-architecture.md`

---

## 1. The strategic mix

### 1.0 Strategic framing — adaptive media objects

SafariVerse is not a booking engine. It is a **cinematic travel universe**. Because of that, itineraries (called **Editions**) behave like **adaptive media objects** — browsable, readable, collectible, shareable.

The three container variants are **not competing layouts**. They are **three emotional states of the same journey**:

| Variant | Emotional role | Slogan |
|---|---|---|
| **Flipbook** | The aspirational dream artifact | *"Fall in love."* |
| **Scroll-Story** | The canonical journey to live inside | *"Live inside the journey."* |
| **Atlas-Poster** | The collectible shareable artifact | *"Save · share · display."* |

**Core principle:**

> **One Edition. Three experiences.**

The traveler fluidly switches between Read, Lookbook, and Poster using a minimal mode-switch interface. This is what makes SafariVerse "adaptive cinematic storytelling" instead of yet another rigid itinerary page.

### 1.1 Build sequence (engineering priority)

Build in this order:

1. **Scroll-Story first** — foundational product UX. Scales operationally. SEO + AI discoverability. Mobile-native. This becomes the platform default and unlocks every other surface.
2. **Atlas-Poster second** — virality and memorability layer. Drives sharing loops, OG/Twitter/IG/PDF artifacts, collection covers, downloadable posters. Compounds inbound traffic.
3. **Flipbook third** — premium emotional layer. Used for Studio proposals, hero editorial moments, high-intent presentation. Delivers the "wow" but depends on the other two being in place.

The order matches risk: Scroll-Story de-risks core UX and content pipeline, Atlas-Poster de-risks growth, Flipbook de-risks luxury positioning. Each phase is independently shippable.

### 1.2 The strategic mix (presentation routing)

Every Edition in SafariVerse is **one data record** rendered in **three presentations**. The user chooses how they want to consume it; the system chooses the default based on context.

```
ITINERARY (data)
   │
   ├──▶  FLIPBOOK        — premium, page-turn cinematic lookbook
   │                       Default for: Studio proposals, hero items,
   │                       share-link landings, "Featured Edition" rails
   │
   ├──▶  SCROLL-STORY    — vertical editorial long-read
   │                       Default for: itinerary detail pages,
   │                       search-result deep-links, SEO/AI-indexed reads
   │
   └──▶  ATLAS-POSTER    — single-spread editorial composition
                           Default for: itinerary cover cards in feeds,
                           OG/Twitter share images, PDF export,
                           downloadable posters
```

### Mode toggle

Every itinerary detail surface includes a small mode-switch pill at the top, giving the traveler agency:

```
┌─────────────────────────────────────────────┐
│   ◐ Read    ▣ Lookbook    ✦ Poster         │
└─────────────────────────────────────────────┘
```

- Pill style: `pill` radius, `caption` weight, ink-soft on canvas-night
- Active state: ember accent on ink-bright fill
- Default = Read (Scroll-Story)
- Mode persists per user (sticky preference)

### Default by context

| Surface | Default mode | Why |
|---|---|---|
| Itinerary detail (direct visit) | Scroll-Story | Mobile-native, fastest TTI, SEO-friendly |
| Itinerary opened from a Reel | Flipbook | Honors the cinematic context of the source |
| Studio proposal share-link | Flipbook | Premium presentation for a paying-intent moment |
| Itinerary card in Discover feed | Atlas-Poster preview → Scroll-Story on tap | Poster sells the dream; Read fulfills it |
| Search results | Scroll-Story | Information density appropriate |
| OG / share preview | Atlas-Poster | Single-image artifact for social platforms |
| PDF / print export | Atlas-Poster | Print-poster aesthetic |
| "Featured Edition" homepage rail | Flipbook | Editorial curated moments deserve the cinematic treatment |

---

## 2. Shared editorial vocabulary

Before specifying each variant, lock the language that all three share — so they feel like one studio.

### 2.1 Editorial type stack (extends `01-architecture.md` §28)

| Role | Family | Weight | Treatment |
|---|---|---|---|
| Edition title (chapter h1) | **Fraunces** | 300 | Wide-set, generous line-height (1.1), -0.015em tracking |
| Section eyebrow ("DAY ONE", "INSPIRED BY") | **Inter** | 600 | All-caps, +0.18em tracking, ink-muted color, 11px |
| Editorial pull-quote | Fraunces | 300, italic | 28–40px, ink-bright on dark / ink-deep on light |
| Body editorial | Inter | 400 | 17px on web detail pages, 15px on cards, 1.55 line-height |
| Caption (photo credit, lodge name) | Inter | 500 | 12px, ink-soft, +0.04em tracking |
| Numeric ordinals ("DAY 01 / 12") | Fraunces | 300 | Tabular figures, large display |
| Stamp / seal text | Inter | 600 | 10px, all-caps, +0.24em tracking |

### 2.2 Editorial color shifts

The architecture-level palette stays. These editorial-mode tokens layer on:

| Token | Hex | Use |
|---|---|---|
| `paper-cream` | `#F5F1EA` | Flipbook page background, Scroll-Story long-form sections, Atlas-Poster default ground |
| `paper-aged` | `#EDE5D3` | Vintage-poster Atlas variant, accent panels |
| `ink-handwritten` | `#3A3530` | Caption ink on paper |
| `ember-stamp` | `#B23E14` | Editorial seals, ordinal numbers, "EDITION" marks |
| `acacia-rule` | `#A8845B` | Hairline editorial dividers, page-number rules |
| `gold-foil` | `#C9A66B` | Sparing use — Studio proposal accents only |

**Discipline**: paper-cream and dark canvas-deep are the two ground modes. Switch grounds per page-type purpose:
- Discover feed, reel feed, search → **dark cinematic** (canvas-deep)
- Itinerary containers, destination pages, long-form editorial, proposals → **paper-cream**

### 2.3 Editorial photography rules

- **Cinematic crops only.** No mid-action smartphone shots. Each image must read as a still frame from a film.
- **Golden-hour bias.** Default to dawn / dusk / firelight photography.
- **Hand-positioned subject.** No centered-product mediocrity.
- **One face rule.** When a person appears, only one face dominates per image. Crowds are distant.
- **Negative space is sacred.** Never crop to fill — let air around the subject breathe.
- **Editorial captions, not file names.** Every published image gets a 4–10 word caption like a magazine.

### 2.4 Editorial motion vocabulary

| Motion | Use | Spec |
|---|---|---|
| Slow Ken-Burns | Hero photos in Flipbook + Scroll-Story | 12s loop, 1.04 scale max, 2% drift |
| Page-turn | Flipbook page transitions | 800ms, custom cubic-bezier (0.4, 0, 0.2, 1), 3D rotateY 0→180° |
| Parallax drift | Scroll-Story hero + section breaks | 0.4x scroll speed differential |
| Stamp impress | Editorial seals on first appearance | 250ms scale-in with 1.05 overshoot then 1.0 |
| Caption fade-in | Photo captions appear on dwell | 200ms delay, 400ms fade, +6px y-drift |
| Hairline draw | Section dividers animate in on enter | 600ms scale-x 0→1 from center |
| Atlas-Poster reveal | Atlas mode entry from another mode | 500ms crossfade with hairline frame draw-on |

### 2.5 Editorial composition primitives

All three variants share the same composition kit:

**a. The hairline rule**
- 0.5px on light surfaces, 1px on dark
- `acacia-rule` color on paper, `divider-hairline` on dark
- Used as section breaks, page-number underlines, ornamental terminators

**b. The editorial seal**
- 40–60px circular badge
- Used for "EDITION 01", "AS SEEN ON [creator]", "ORGANIZED BY"
- Inside: small icon or letterform, outside: text in a circle

**c. The ordinal numeral**
- Display serif, weight 300, very large (88–160px)
- Used as DAY counters, chapter markers, page numbers
- Always paired with a hairline rule beneath

**d. The eyebrow + headline pair**
- 11px all-caps eyebrow in `ember-stamp` or `ink-muted`
- 32–48px display serif headline beneath
- Hairline rule beneath the headline if it ends a section header

**e. The caption block**
- 12px Inter Medium
- Format: `[Subject] · [Location] · [Creator] · [Year]`
- Example: `Lewa Conservancy · Kenya · photo by Jane Doe · 2026`

**f. The byline tag**
- Avatar (32px circular) + name + role
- Used for concierge byline, creator credit, editor signature

**g. The map strip**
- Horizontal mini-map showing the journey path
- Custom illustration style — never default Google Maps tiles
- Dots for stops, hairline route, paper-cream background

**h. The film-strip embed**
- Container for source videos/reels
- 16:9 or 9:16, framed with 2px ember hairline + corner sprocket-hole detailing
- Caption beneath: `▶ Watch the reel that inspired Day 3`

---

# VARIANT A — The Flipbook

> **Feel**: A leather-bound safari edition, page by page. Conde Nast Traveler if it were a private journal.

## A.1 Anatomy

```
FLIPBOOK STRUCTURE (typical 12-day itinerary = 14 spreads)

  Cover spread (1)
       │
  Prelude spread (1)     — story intro, the "why"
       │
  Day spreads (12)       — one spread per day
       │
  Inspirations spread (1)— creator credits + source reels
       │
  Make-it-yours spread(1)— concierge byline + CTA
       │
  Back cover (1)
```

### A.2 Page-type specs

#### Cover spread

```
┌───────────────────────────────────────────────────────┐
│                                                       │
│  SAFARIVERSE  ·  EDITION 01                          │ ← micro-label, top
│                                                       │
│                                                       │
│              [FULL-BLEED HERO PHOTO]                  │
│                                                       │
│                                                       │
│           H O N E Y M O O N   I N                    │ ← display serif xxl
│                   K E N Y A                          │   wide letter-spacing
│                                                       │
│              twelve days · golden hour                │ ← caption
│                                                       │
│              ━━━━━━━━━━━━━━━━━                       │ ← hairline
│                                                       │
│        Edited by Asha · Photographs by Jane Doe       │ ← byline
│                                                       │
└───────────────────────────────────────────────────────┘
                  ◀  cover  ▶
```

- Background: full-bleed photography (no chrome on top)
- Text: ink-bright over photo, with subtle 30% paper-cream scrim behind text band only
- The only non-photographic element is the small SafariVerse `EDITION 01` micro-label top
- No CTA on cover — invite curiosity, not action

#### Prelude spread

```
┌───────────────────────────────────────────────────────┐
│  ━━━━━━━                                              │
│  THE STORY                                            │ ← eyebrow
│                                                       │
│  "Some journeys you take. Others                      │
│   take you."                                          │ ← editorial pull-quote
│                                                       │   in display serif italic
│                                                       │
│  Editorial intro in body type. Two short              │ ← body editorial
│  paragraphs that set emotional tone and               │   max 4 lines per
│  hint at the journey ahead. No logistics here,        │   paragraph
│  only feeling.                                        │
│                                                       │
│                                                       │
│                                  ✦                    │ ← ornamental terminator
│                                                       │
└───────────────────────────────────────────────────────┘
                  ◀  page 2 / 16  ▶
```

- Background: paper-cream
- No photo on this spread — let the words breathe
- The pull-quote sets emotional tone for the whole journey
- Ends with ornamental glyph (✦ or hairline rule + dot)

#### Day spread (the workhorse)

```
┌───────────────────────────────────────────────────────┐
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━     │
│                                                       │
│  0 1  ·  DAY ONE                                      │ ← ordinal + eyebrow
│  ────────────                                         │ ← hairline beneath
│                                                       │
│  N a i r o b i                                        │ ← display serif xl
│  ─ to the foot of the mountain                        │ ← editorial sub-line
│                                                       │
│  ┌───────────────────────────────────────────────┐   │
│  │                                               │   │
│  │           [HERO PHOTO OF THE DAY]             │   │ ← full-bleed within page
│  │                                               │   │
│  └───────────────────────────────────────────────┘   │
│  Hemingways Nairobi · photo by Jane Doe              │ ← caption
│                                                       │
│  Editorial narrative — what happens on Day            │ ← body editorial
│  One, told as story, not bullet list. Two             │   ~80-120 words
│  short paragraphs. Sense-led writing: the             │
│  smell of jacaranda, the light at five.               │
│                                                       │
│                                                       │
│  ━━━━━ THE LODGE                                      │ ← inset eyebrow
│  Hemingways  ·  Karen, Nairobi                        │ ← lodge moment line
│                                                       │
└───────────────────────────────────────────────────────┘
                  ◀  page 3 / 16  ▶
```

- Background: paper-cream
- Hero photo within the page (not full-bleed of the spread) — gives the photo a "framed" feel
- Lodge appears at the bottom as a single line — name + location, not a feature list
- No prices, no dates, no logistics anywhere on day spreads

#### Day spread (variant — when a reel inspired this day)

Replace the lodge block with a film-strip embed:

```
│  ━━━━━ AS SEEN ON                                     │
│  ┌─────────────────┐                                  │
│  │ [reel thumbnail]│  ▶  Watch the reel that          │
│  │                 │     inspired this day            │
│  └─────────────────┘  by @janedoe · Instagram         │
```

#### Inspirations spread

```
┌───────────────────────────────────────────────────────┐
│  ━━━━━━━                                              │
│  INSPIRED BY                                          │
│                                                       │
│  The storytellers whose work shaped this journey.     │ ← editorial intro line
│                                                       │
│   ◯           ◯           ◯           ◯              │ ← creator avatars
│  Jane       Mwende      Ahmed      SafariVerse       │
│  Doe        Otieno      Hassan      Editorial         │
│                                                       │
│  ▶ Watch the original films          ↗ Visit profiles│
│                                                       │
│  ━━━━━ ALSO REFERENCED                                │
│                                                       │
│  • "Lewa from the air" — YouTube · 2026               │
│  • "Mara dawn diaries" — Instagram reel · 2026        │
│  • "Quiet luxury in the wild" — Blog · 2025           │
│                                                       │
└───────────────────────────────────────────────────────┘
                  ◀  page 15 / 16  ▶
```

- Beautiful, prominent creator attribution — never small-print
- Tappable: each creator becomes a creator-profile page
- Source content listed by original platform with date

#### Make-it-yours spread (the soft CTA)

```
┌───────────────────────────────────────────────────────┐
│  ━━━━━━━                                              │
│  MAKE IT YOURS                                        │
│                                                       │
│  "This is a dream draft.                              │
│   Yours can begin here."                              │ ← italic pull-quote
│                                                       │
│   ◯                                                   │ ← concierge avatar
│   Asha                                                │   (large, ~80px)
│   Your concierge                                      │
│                                                       │
│   "I built this edition. I can shape it               │ ← byline quote
│   around your dates, your pace, your pair."           │
│                                                       │
│                                                       │
│   ┌─────────────────────────────────────────┐         │
│   │   ✦  MAKE THIS JOURNEY MINE  →           │         │ ← CTA: ember fill
│   └─────────────────────────────────────────┘         │
│                                                       │
│   or  ↗ talk to Asha first                            │ ← secondary link
│                                                       │
│   ━━━━━ ORGANIZED BY                                  │
│   SafariVerse Studio                                  │ ← seal beneath
│   in partnership with [Operator name]                 │
│                                                       │
└───────────────────────────────────────────────────────┘
                  ◀  page 16 / 16  ▶
```

- The only logistical action in the entire flipbook lives here
- Concierge is presented as a person, not a system
- Operator credit appears here as a seal — never above

## A.3 Page-turn interaction

**Mobile** (default 9:16 spreads):
- Horizontal swipe gesture turns the page
- 800ms 3D page-curl animation
- Tiny page indicator at bottom (current / total)
- Tap right edge = next, tap left edge = previous
- Pinch-out exits to Atlas-Poster view; pinch-in returns
- Long-press on a spread = bookmark this page (saves spread image to camera roll, with attribution)

**Desktop** (landscape, two-page spreads):
- Click right page edge or arrow key = next spread
- Click left page edge or arrow key = previous spread
- Same 3D curl animation, slower (1000ms) for cinematic feel
- Page numbers in lower outer corners

**Audio (optional, opt-in)**:
- Ambient soundscape per chapter (wind, distant elephants, fire crackling)
- Plays muted by default; user taps a small speaker icon on the cover to enable
- Stops on navigation away

## A.4 Share

- Long-press cover → generates a beautiful 9:16 share card (cover photo + edition title)
- "Share this edition" link in the bottom menu → public flipbook URL with a custom subdomain
- Sharing a single spread generates a 4:5 OG card with that spread's hero photo

---

# VARIANT B — The Scroll-Story

> **Feel**: Long-form editorial essay. The NYT Magazine cover story crossed with a private travel journal — but built for thumb scrolling.

## B.1 Anatomy

Vertical, infinite-scroll, parallax-led. Structured as a sequence of editorial sections divided by hairline rules and section eyebrows.

```
┌─────────────────────────────────────────┐
│ 1. HERO BAND                            │  full-bleed, sticky parallax
├─────────────────────────────────────────┤
│ 2. TITLE BLOCK                          │  edition title + byline + meta
├─────────────────────────────────────────┤
│ 3. PRELUDE                              │  pull-quote + 2-paragraph intro
├─────────────────────────────────────────┤
│ 4. JOURNEY SUMMARY                      │  hairline map + stops list
├─────────────────────────────────────────┤
│ 5. DAY-BY-DAY (12 sections)             │  each section: photo + narrative
├─────────────────────────────────────────┤
│ 6. INSPIRED BY                          │  creator credits + source films
├─────────────────────────────────────────┤
│ 7. PLACES YOU'LL STAY                   │  lodge moment cards
├─────────────────────────────────────────┤
│ 8. MAKE IT YOURS                        │  concierge byline + CTA
├─────────────────────────────────────────┤
│ 9. FOOTER                               │  operator credit, editorial seal│
└─────────────────────────────────────────┘
        [sticky bottom: Make this mine →]
```

## B.2 Section specs

### 1. Hero band

- 100vh on mobile, 80vh on desktop
- Full-bleed video (where licensed) or photograph
- Slow Ken-Burns or parallax scroll-coupled motion
- Bottom-fade gradient to paper-cream surface beneath
- Caption pinned bottom-left: creator credit
- Audio cue (subtle) optional, muted by default

### 2. Title block

```
                  EDITION 01

         Honeymoon in Kenya
          ─────────────────
       twelve days · golden hour

       Edited by Asha   ·   2026 Edition
       Photographs by Jane Doe et al.

  [ ◐ Read  ▣ Lookbook  ✦ Poster ]
```

- Paper-cream background
- Hairline rule beneath title
- Mode-switch pill below byline
- Generous vertical breathing room (96–128px above and below)

### 3. Prelude

A short pull-quote + a 2-paragraph editorial intro. Display serif italic for the quote. Body editorial sans for the intro.

### 4. Journey summary

```
━━━━━ THE JOURNEY

   ●━━━━●━━━━●━━━━●   ← horizontal hairline map
   1    2    3    4
   Nairobi Lewa Mara Diani

   12 days · 4 stops · 1 dream
```

- The map is illustrated, not a Google tile. Custom paper-cream aesthetic.
- Hover/tap on a stop = jumps to that day's section

### 5. Day-by-day sections

Each day:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DAY 01     ┌──────────────────────────┐
NAIROBI    │                          │
           │   [photo, full width]    │
to the     │                          │
foot of    └──────────────────────────┘
the        Hemingways Nairobi · Jane Doe
mountain
           Editorial narrative paragraph,
           sense-led, story-first. 80-120
           words.

           Second paragraph if needed,
           introducing the lodge or the
           people of the day.

           ━━━━━ LODGE
           Hemingways · Karen, Nairobi

           ▶ Inspired by  Jane Doe's reel
```

**Layout direction**:
- Desktop: 2-column (left = ordinal + eyebrow stack; right = photo + narrative). The ordinal stays sticky as the right column scrolls.
- Mobile: single column. Ordinal sits above the photo.
- Photo aspect ratios alternate (4:5, 16:9, 1:1) down the page for editorial rhythm.

### 6. Inspired by

Identical content to the Flipbook's inspirations spread, but rendered as a horizontal scroller of creator cards on mobile and a 4-up grid on desktop.

### 7. Places you'll stay

- 4–6 lodge moment cards
- Each card: photo + lodge name in display serif + 2-line editorial description + location
- No pricing, no amenity list, no booking link
- Stacks vertically on mobile, 2-column grid on desktop

### 8. Make it yours

Identical structure to Flipbook's make-it-yours spread, but inline in the scroll. Concierge avatar large, byline quote in italic, single CTA button.

### 9. Footer

- "Organized by SafariVerse Studio"
- Operator credit if applicable
- "EDITION 01 · 2026"
- Small share + save icons

## B.3 Sticky elements

| Element | Behavior |
|---|---|
| Mode-switch pill | Sticky top after scrolling past title block, hides on scroll-down, reveals on scroll-up |
| Make-this-mine CTA | Sticky bottom from Section 5 onward, ember pill button |
| Day ordinal | Sticky to its section on desktop (left column), inline on mobile |
| Section eyebrows | Optional sticky-on-scroll behavior for deep itineraries (>10 days) |

## B.4 SEO + AI discoverability hooks

The Scroll-Story is the SEO/AI-readable canonical:

- Pages: `/editions/honeymoon-kenya-12d`
- JSON-LD: `TouristTrip` with sub-entities for each day (`TouristAttraction`), lodges (`LodgingBusiness`), creators (`Person`)
- Body text is real prose (not embedded in image), indexable
- Each day's narrative is `<article>` semantic
- Source video embeds use `VideoObject` schema with proper attribution
- Cover photo is `og:image`, title is `og:title`, prelude first sentence is `og:description`

---

# VARIANT C — The Atlas-Poster

> **Feel**: A printable luxury travel poster you could frame. Pinterest pin meets vintage Pan-Am print ad meets editorial cover.

## C.1 Anatomy

A single editorial composition — typically 2:3 portrait aspect ratio — that holds the entire itinerary in one viewable artifact.

```
┌───────────────────────────────────────────────┐
│  ✦  THE HONEYMOON EDITION  ✦                  │ ← masthead micro-label
│  ═════════════════════════                    │ ← hairline border
│                                               │
│  K E N Y A                                    │ ← display serif xxl
│  ─────────                                    │
│  twelve days · golden hour                    │
│                                               │
│  ┌─────────────────────────────────────────┐  │
│  │                                         │  │
│  │     [HERO PHOTO — tall portrait]        │  │
│  │                                         │  │
│  └─────────────────────────────────────────┘  │
│  Lewa Conservancy · photo by Jane Doe         │ ← caption
│                                               │
│  ━━━━━ THE JOURNEY                            │
│                                               │
│  ①  Nairobi                                   │
│  ②  Lewa Conservancy                          │
│  ③  Maasai Mara                               │
│  ④  Diani Beach                               │
│                                               │
│  ━━━━━ ROUTE                                  │
│  ●────●────●────●                              │ ← illustrated mini-map
│                                               │
│  ━━━━━ INSPIRED BY                            │
│  ◯ Jane Doe  ◯ Mwende Otieno                 │ ← creator avatars
│  ▶ Watch the original films                   │
│                                               │
│  ━━━━━ STAY AT                                │
│  Hemingways · Lewa Wilderness · Mara Plains  │
│                                               │
│  ━━━━━ ORGANIZED BY                           │
│  ╭─────╮                                      │
│  │  ✦  │  SafariVerse Studio                  │ ← seal
│  ╰─────╯  in partnership with [Operator]      │
│                                               │
│  ──────────────────────────────────           │
│                                               │
│  ✦  MAKE THIS MINE  →                         │ ← CTA at footer
│                                               │
│  EDITION 01 · safariverse.com                 │ ← masthead echo at base
└───────────────────────────────────────────────┘
```

## C.2 Composition rules

- **Aspect ratio**: 2:3 portrait (default), 9:16 (story share), 1:1 (Instagram feed), 16:9 (Twitter / YouTube thumbnails). All four crops generate from the same source layout via art-direction rules.
- **Hero photo**: occupies ~40–50% of vertical real estate
- **Sections**: each labeled with an eyebrow + hairline rule; spacing is tight (16px gaps), poster-style not webpage-style
- **No interaction** in static export modes (PDF, PNG share). On-app, every section is tappable and links to its corresponding day/creator/lodge.
- **Hairline frame** around the entire composition — 1px `acacia-rule` color, 16px inset from edges

## C.3 Output variants

The Atlas-Poster compiles to multiple artifacts from one source:

| Output | Spec | Use |
|---|---|---|
| **Web** (in-app) | Responsive 2:3 / 4:5, interactive | Itinerary cover card on Discover; "Poster" mode toggle |
| **OG share** | 1.91:1 (1200×630px) PNG | Twitter / Facebook share preview |
| **Story share** | 9:16 (1080×1920px) PNG | Instagram Stories, TikTok shares |
| **Feed share** | 1:1 (1080×1080px) PNG | Instagram feed posts |
| **PDF export** | Print-ready 2:3 (e.g., 12"×18" poster) | Download for traveler keepsake or proposal accompaniment |
| **Wallpaper** | 9:19.5 (1170×2532px) PNG | "Make it your phone wallpaper" — viral asset |

## C.4 Vintage Poster variant (optional sub-style)

Inspired by the Amalfi reference: a warmer, more nostalgic Atlas-Poster variant.

- Background: `paper-aged` (#EDE5D3)
- Hero photo treated with subtle warm-LUT color grading and a 4–6% film grain overlay
- Hairline borders become double-rules (paired thin hairlines)
- Display serif gains slight letterspacing (+0.02em)
- Adds an optional illustrated botanical/wildlife corner motif (one small, restrained element — e.g., a thorn-tree branch silhouette, never gaudy)
- Used for: Honeymoon editions, slow-luxury editions, Heritage editions

This is **one of two** Atlas-Poster styles. The default (cream + cinematic) and the vintage (aged + nostalgic). Editorial chooses per edition.

---

## 3. The editorial vocabulary applied to the rest of the site

The container variants establish the language. The same language extends to every page:

### 3.1 Landing page (logged-out)

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│        [FULL-BLEED CINEMATIC HERO VIDEO]            │
│                                                     │
│                                                     │
│       Where the wild ones whisper.                  │ ← display serif xxl
│       ──────────────────────                        │ ← hairline
│       A cinematic universe of African              │
│       safari editions, built by you.                │
│                                                     │
│             [ ✦ Begin dreaming → ]                   │ ← single ember CTA
│                                                     │
├─────────────────────────────────────────────────────┤  ← paper-cream surface
│                                                     │
│  ━━━━━ THIS WEEK'S EDITIONS                         │ ← eyebrow + hairline
│                                                     │
│  [Atlas-Poster] [Atlas-Poster] [Atlas-Poster]       │ ← 3-up posters
│                                                     │
├─────────────────────────────────────────────────────┤
│  ━━━━━ THROUGH THEIR LENS                           │
│  [Creator card]  [Creator card]  [Creator card]     │
│                                                     │
├─────────────────────────────────────────────────────┤
│  ━━━━━ WHAT TRAVELERS SAY                           │
│  "Pull-quote from a traveler, italic display       │
│   serif, no avatars, no stars."                     │
│                          — Sarah, Nairobi 2026      │
├─────────────────────────────────────────────────────┤
│  ━━━━━ YOUR CONCIERGE                               │
│  [Concierge byline card — Asha]                     │
│                                                     │
├─────────────────────────────────────────────────────┤
│  Footer: minimal hairlines, no link-soup            │
└─────────────────────────────────────────────────────┘
```

- Hero stays dark cinematic; the rest of the page is paper-cream editorial
- The transition between the two grounds happens at section seams via subtle gradient
- No social proof clutter, no "as featured in" logos, no testimonial avatars

### 3.2 Destination pages

Use the Scroll-Story structure (minus the day-by-day) for destinations:

```
[Hero band]
[Title: "Serengeti"]
[Prelude: editorial introduction]
[━━━━━ WHAT IT FEELS LIKE]     ← three mood-sections, photo-led
[━━━━━ WHEN TO ARRIVE]
[━━━━━ THE LIGHT, THE AIR]
[━━━━━ WILDLIFE MOMENTS]        ← photo strip with editorial captions
[━━━━━ PLACES TO STAY]          ← 4-6 lodge moment cards
[━━━━━ THROUGH THEIR LENS]      ← creator cards
[━━━━━ EDITIONS THAT VISIT]     ← itinerary atlas-posters
[━━━━━ DREAM IT]                ← single CTA
```

Section labels are eyebrow + hairline, NEVER "Geography" / "Climate" / "When to visit" boxes.

### 3.3 Creator profiles

```
[Hero: creator's signature photograph, full-bleed]
[━━━━━ THE STORYTELLER]
   ◯ Jane Doe
   Wildlife photographer, Nairobi
   2026 Edition Contributor
   
   Two-paragraph editorial bio.
   No bullet list of credits.

[━━━━━ THE WORK]                ← masonry of their content
[━━━━━ EDITIONS THEY INSPIRED]  ← Atlas-Posters of itineraries built from their content
[━━━━━ FOLLOW & READ MORE]      ← outbound links to their platforms
```

### 3.4 Blog / editorial articles

When SafariVerse publishes original editorial, it uses the **Scroll-Story** layout — same structure as itineraries minus the day-by-day. Hero band, title block, prelude, body sections, creator credits, "Editions inspired by this" cross-link to itineraries.

### 3.5 Search results

Even search results are editorial. No table rows.

```
[━━━━━ EDITIONS]              ← Atlas-Poster grid (3-up)
[━━━━━ DESTINATIONS]          ← Photo cards with editorial captions
[━━━━━ STORIES]               ← Content cards (reels, blogs)
[━━━━━ STORYTELLERS]          ← Creator cards
[━━━━━ NOT WHAT YOU MEAN?]    ← Concierge prompt
```

### 3.6 Universal navigation patterns

| Where | Pattern |
|---|---|
| Top bar | Minimal — wordmark left, search center, avatar right. No menu items above the fold. |
| Page section breaks | Eyebrow + hairline rule, always. Never section background-color blocks. |
| In-page navigation | Numeric ordinals or named chapters with hairline separators |
| Footer | Three-column hairlines, minimal link copy, masthead-style |

---

## 4. Implementation note — same data, three renders

The data model:

```yaml
edition:
  id: honeymoon-kenya-12d
  edition_number: 01
  title: "Honeymoon in Kenya"
  subtitle: "twelve days · golden hour"
  hero_photo:
    src: ...
    caption: "Lewa Conservancy"
    credit: jane-doe
  prelude:
    pull_quote: "Some journeys you take. Others take you."
    body_paragraphs: [...]
  journey:
    stops:
      - name: "Nairobi"
        lat: ...
        lng: ...
        days: [1]
      - ...
  days:
    - day: 1
      title: "Nairobi"
      subtitle: "to the foot of the mountain"
      photo: { src, caption, credit }
      narrative: "..."
      lodge: { name: "Hemingways", location: "Karen, Nairobi" }
      inspired_by: [content-id-456]
    - ...
  inspired_by:
    - creator_id: jane-doe
      contribution: "lewa photographs and reel"
    - ...
  source_media:
    - id: content-id-456
      type: reel
      platform: instagram
      original_url: ...
      embed_url: ...
  organized_by:
    studio: safariverse
    operator: nyumbani-collection
    concierge: asha
  visibility: public
  slug: honeymoon-kenya-12d
```

**Renderers**:

| Mode | Renderer |
|---|---|
| Flipbook | `<EditionFlipbook edition={data} />` — paginates into spreads |
| Scroll-Story | `<EditionScrollStory edition={data} />` — vertical layout |
| Atlas-Poster | `<EditionAtlasPoster edition={data} variant="cream|vintage" />` — single composition |

Same source, three presentations. URL pattern:

- `/editions/honeymoon-kenya-12d` → Scroll-Story (default)
- `/editions/honeymoon-kenya-12d/lookbook` → Flipbook
- `/editions/honeymoon-kenya-12d/poster` → Atlas-Poster
- `/editions/honeymoon-kenya-12d/poster.pdf` → PDF export
- `/editions/honeymoon-kenya-12d/og.png` → 1.91:1 OG image
- `/editions/honeymoon-kenya-12d/story.png` → 9:16 story share

---

## 5. Addendum to the Claude Design hand-off prompt

Add the following to the Claude Design prompt block in `01-architecture.md` §VIII:

```
==================================================================
ADDENDUM — ITINERARY CONTAINER SYSTEM
==================================================================

Itineraries (called "Editions") render in THREE container modes,
all driven by the same data model:

  A. FLIPBOOK     — cinematic page-turn lookbook (premium contexts)
  B. SCROLL-STORY — vertical editorial long-read (default detail)
  C. ATLAS-POSTER — single-spread composition (covers, shares, PDF)

A small mode-switch pill ( ◐ Read · ▣ Lookbook · ✦ Poster ) sits
at the top of every Edition detail surface.

EDITORIAL VOCABULARY (shared across all three)

Type:
- Display serif (Fraunces) at light weights (300, 500)
- Body sans (Inter) at restrained weights (400, 500, 600)
- Eyebrows are 11px all-caps Inter 600 with +0.18em tracking
- Captions are 12px Inter 500 with +0.04em tracking
- Editorial pull-quotes are display serif italic, 28-40px

Surfaces:
- paper-cream (#F5F1EA) — Edition containers, destinations, blog,
  long-form editorial, proposals
- paper-aged (#EDE5D3) — Vintage Atlas-Poster variant
- canvas-deep (#0F0E0C) — Discover feed, reel feed, search,
  hero bands

Editorial primitives every page uses:
- Hairline rules (0.5px on paper, 1px on dark)
- Editorial seals (40-60px circular badges)
- Display ordinals (large weight-300 serif numerals)
- Eyebrow + headline pairs (all-caps mini-label + serif title)
- Caption blocks ([Subject] · [Location] · [Creator] · [Year])
- Byline tags (avatar + name + role)
- Map strips (custom illustrated, never default tiles)
- Film-strip embeds (framed video containers)

Motion:
- Slow Ken-Burns on hero photos (12s, 1.04 max scale)
- Page-turn 800ms with 3D rotateY for Flipbook
- Parallax 0.4x for Scroll-Story hero
- Stamp impress (250ms) for editorial seals
- Hairline draw (600ms) for section dividers

EXTEND THIS VOCABULARY TO EVERY PAGE:
- Landing page hero: dark cinematic → paper-cream below
- Destination pages: Scroll-Story structure (no day-by-day)
- Creator profiles: hero + editorial bio + work masonry + editions
- Blog: Scroll-Story without day-by-day
- Search results: editorial sections, not table rows
- Footer: hairline three-column, masthead-style

DELIVERABLE ADDITIONS
- Flipbook component with spread types (cover, prelude, day, 
  inspirations, make-it-yours, back cover)
- Scroll-Story component with section types (hero band, title 
  block, prelude, journey summary, day section, inspired-by, 
  places, make-it-yours, footer)
- Atlas-Poster component with output variants (web, OG, story, 
  feed, PDF, wallpaper) and style variants (cream, vintage)
- Mode-switch pill component (3-state segmented control)
- Editorial primitive library (hairline rule, seal, ordinal, 
  eyebrow-headline pair, caption block, byline tag, map strip, 
  film-strip embed)
- Landing page in editorial mode
- Destination page in editorial mode
- Creator profile in editorial mode
- Blog template in editorial mode
- Editorial search results

==================================================================
```

---

*End of itinerary container system. Same data, three presentations, one editorial language across the entire universe.*
