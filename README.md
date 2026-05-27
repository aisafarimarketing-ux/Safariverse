# SafariVerse

> A cinematic African safari universe powered by AI-driven discovery and emotional storytelling.

SafariVerse is the consumer-facing layer of the **Safari Tech Lab** ecosystem — a mobile-first, AI-native dream universe where viral African travel content becomes immersive itineraries (called **Editions**), dream collections, conversational concierge experiences, and personalized proposals.

> *"Netflix meets ReciMe for African travel — wrapped in Airbnb's warmth."*

---

## The ecosystem

```
┌────────────────────────────────────────────────────────────────────┐
│                       SAFARI TECH LAB                              │
│                                                                    │
│   SafariVerse  ──▶  SafariReceptionist  ──▶  Studio                │
│   (discovery)       (AI concierge)           (proposal builder)    │
│                              │                                     │
│                              ▼                                     │
│                       SafariBoost                                  │
│                       (CRM + automation, GHL subaccount)           │
└────────────────────────────────────────────────────────────────────┘
```

- **SafariVerse** — consumer discovery layer (this repo)
- **SafariReceptionist** — AI concierge spanning WhatsApp + in-app + email, with cross-channel memory
- **SafariBoost** — operational CRM (white-labeled GoHighLevel), lead lifecycle, retargeting
- **Studio** — cinematic proposal generator that turns dream collections into editorial trip pages

---

## Editions — adaptive media objects

Every itinerary in SafariVerse is **one data record** rendered in **three presentations**, with a mode-switch pill (`◐ Read · ▣ Lookbook · ✦ Poster`) letting travellers toggle between them.

| Mode | Slogan | Best for |
|---|---|---|
| **Scroll-Story** ( ◐ Read ) | *"Live inside the journey."* | Default detail page · mobile-native · SEO/AI-readable |
| **Atlas-Poster** ( ✦ Poster ) | *"Save · share · display."* | Covers · OG shares · PDF · downloadable posters |
| **Flipbook** ( ▣ Lookbook ) | *"Fall in love."* | Studio proposals · hero editorial moments |

**Build order**: Scroll-Story → Atlas-Poster → Flipbook.

---

## Repository

```
.
├── docs/                                  ← strategy + architecture
│   ├── 01-architecture.md                 ← 40-section product foundation
│   └── 02-itinerary-containers.md         ← Edition system + editorial vocabulary
├── design/
│   └── handoff-2026-05-27/                ← Claude Design high-fidelity prototype
│       ├── README.md                      ← full design handoff documentation
│       ├── PREVIEW.md                     ← how to run the prototype locally
│       └── source/                        ← HTML + JSX + editorial.css
├── web/                                   ← Next.js 15 app (in progress)
├── README.md
└── package.json
```

---

## Preview the design handoff locally

```bash
npx -y serve design/handoff-2026-05-27/source --listen 5174
```

Open:
- http://localhost:5174/Landing.html
- http://localhost:5174/Edition.html

In Edition view, use the top-bar mode-switch pill to flip between Read, Lookbook, and Poster.

---

## Implementation target

The design handoff is being ported to **Next.js 15 (App Router) + Tailwind + Framer Motion**, deployed to **Railway** (app + Postgres + cron in one platform). Implementation lives in `web/` and follows the build order locked above — Scroll-Story first as the foundational mobile-native default with full JSON-LD `TouristTrip` schema for AI discoverability.

### Stack

| Layer | Choice |
|---|---|
| App | Next.js 15 (App Router) + TypeScript + Tailwind |
| ORM | Drizzle |
| DB | Railway Postgres (with pgvector + PostGIS) |
| AI | Anthropic SDK (Claude Sonnet 4.6) |
| Embeddings | Voyage AI |
| Auth | Clerk |
| Storage | Cloudflare R2 |
| Hosting | Railway (web service + Postgres service + cron worker) |
| Cron / queues | Inngest or QStash (calling Next.js API routes) |

### Deploy to Railway

1. Push to GitHub (this repo)
2. In Railway, create a new project → Deploy from GitHub → select this repo
3. Railway reads `railway.json` and builds the app from `/web`
4. Add a Postgres service to the same project — Railway sets `DATABASE_URL` automatically
5. Add the environment variables from `.env.example` to the Railway service
6. Push again — Railway auto-deploys

URL pattern:

```
/editions/{slug}                    → Read (Scroll-Story, default)
/editions/{slug}/lookbook           → Flipbook
/editions/{slug}/poster             → Atlas-Poster (cream)
/editions/{slug}/poster?v=vintage   → Atlas-Poster vintage
/editions/{slug}/poster.pdf         → PDF export
/editions/{slug}/og.png             → 1.91:1 OG share image
/editions/{slug}/story.png          → 9:16 story share image
```

---

## Status

| Phase | Status |
|---|---|
| Strategic architecture (`docs/`) | ✅ Complete |
| Design handoff (Landing + Edition × 3 modes) | ✅ Delivered 2026-05-27 |
| Local preview wiring | ✅ Running on `:5174` |
| Next.js scaffold | ⏳ Next |
| Scroll-Story port | ⏳ Phase 1 |
| Atlas-Poster port | ⏳ Phase 2 |
| Flipbook port | ⏳ Phase 3 |
| Deployment (Vercel) | ⏳ After Phase 1 |
