# SafariVerse — Content Ingestion: Where the universe gets its content

**Companion to**: `docs/01-architecture.md` (§24 expanded), `docs/02-itinerary-containers.md`

> **One-line answer**: AI doesn't browse the internet for us. We point it at a curated, legally-clean set of sources, pull content through one of five pipelines (RSS / official APIs / partnerships / editorial uploads / operator portal), AI normalizes and enriches it, then a human editorial gate decides what reaches the site.

This document covers **where the content comes from**, **how it flows in**, **what AI does to it**, **who gates it**, **what's legal**, and **what to build first**.

---

## 1. The whole picture (one diagram)

```
┌─────────────────────────────────────────────────────────────────────┐
│  SOURCES                                                            │
│                                                                     │
│  News & magazines      Reels & videos      Itineraries & lodges    │
│  ─────────────────     ──────────────       ──────────────────     │
│  RSS · sitemap         YouTube API           Operator partners      │
│  Tourism boards        IG Graph (opt-in)     Editorial uploads      │
│  Travel publishers     TikTok (manual)       Magazine articles      │
│                                                                     │
│  Accreditations & reviews        Wildlife & environment            │
│  ───────────────────────         ─────────────────────             │
│  Google Places API               eBird (birds)                     │
│  TripAdvisor (partner-only)      iNaturalist                       │
│  World Travel Awards             Conservancy partner feeds         │
│  Conde Nast Readers Choice                                         │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
                               ▼  one of five intake channels
   ┌───────────────┬────────────────┬───────────────┬───────────────┬───────────────┐
   │ 1. RSS poller │ 2. API client  │ 3. Partner    │ 4. Editorial  │ 5. Operator   │
   │   (cron)      │   (cron)       │   webhook     │   manual      │   portal      │
   └───────┬───────┴────────┬───────┴───────┬───────┴───────┬───────┴───────┬───────┘
           │                │               │               │               │
           └────────────────┴───────┬───────┴───────────────┴───────────────┘
                                    ▼
           ┌──────────────────────────────────────────────┐
           │  NORMALIZATION                                │
           │  HTML → text · dedupe · language detect      │
           │  type classifier · provenance metadata        │
           └──────────────────────┬───────────────────────┘
                                  ▼
           ┌──────────────────────────────────────────────┐
           │  AI ENRICHMENT  (Claude Sonnet)               │
           │  · Entity extraction (destinations, lodges)   │
           │  · Quality + safety check                     │
           │  · Original 200-400w editorial summary        │
           │  · Vector embedding                           │
           │  · Tags, geocoding, season inference          │
           └──────────────────────┬───────────────────────┘
                                  ▼
           ┌──────────────────────────────────────────────┐
           │  EDITORIAL QUEUE  (internal dashboard)        │
           │  Featured / Curated / Published / Held /     │
           │  Rejected · human approves & tiers            │
           └──────────────────────┬───────────────────────┘
                                  ▼
           ┌──────────────────────────────────────────────┐
           │  STORAGE                                      │
           │  Postgres · Vector DB · Object store          │
           └──────────────────────┬───────────────────────┘
                                  ▼
           ┌──────────────────────────────────────────────┐
           │  CONSUMPTION  (the universe)                  │
           │  Discover feed · Editions · Search ·         │
           │  Dream Builder · Concierge memory · OG cards  │
           └──────────────────────────────────────────────┘
```

---

## 2. Sources — concrete, by category

### 2.1 News & magazines (RSS + sitemap)

The cleanest, fastest, most legal source. Most major publications publish RSS feeds free for non-commercial summarization with attribution.

| Source | URL pattern | What we get |
|---|---|---|
| **AFAR** | `afar.com/rss` | Travel features, longform |
| **Travel + Leisure** | RSS by section | Award lists, destination features |
| **Conde Nast Traveler** | RSS feeds per section | Premium travel editorial |
| **Africa Geographic** | `africageographic.com/feed/` | Africa-specific, wildlife, conservation |
| **Travel Africa Magazine** | `travelafricamag.com/feed/` | Operator-aligned features |
| **Outside** | `outsideonline.com/feed/` | Adventure travel |
| **Nat Geo Travel** | RSS via main site | Premium photography + storytelling |
| **Skift** | `skift.com/feed/` | Industry news (less consumer, more business) |
| **AFKTravel / Atlas Obscura Africa** | per-tag feeds | Editorial + curiosity |
| **Magical Kenya** (official board) | `magicalkenya.com/news/feed/` | Authoritative tourism content |
| **Tanzania Tourism Board** | press feed | Authoritative |
| **Botswana Tourism Organization** | press feed | Authoritative |
| **Rwanda Development Board (Tourism)** | press feed | Authoritative |
| **Africa's Eden** | `africaseden.com/feed/` | Regional tourism content |
| **SafariBookings news** | `safaribookings.com/blog/feed/` | Consumer-facing safari content |
| **Independent travel bloggers** | per-author RSS | Voice + depth (~30-50 hand-picked) |
| **Substack writers** | per-writer RSS | Long-form travel essays |

**Volume target**: 50-100 RSS sources at MVP. ~200-400 new items/week ingested. ~50-80 surfacing to the feed after editorial filter.

### 2.2 Reels & videos

| Platform | Access path | Notes |
|---|---|---|
| **YouTube** | YouTube Data API v3 (official, free tier 10k quota/day) | Pull by channel ID from ~20-40 selected creator channels. Full metadata + embed URL. Legal + reliable. |
| **Vimeo** | Vimeo API (official) | Smaller universe of safari content but very high quality |
| **Instagram Reels** | Instagram Graph API — **only with creator opt-in** | Partner with 20-50 creators who grant API access via their Business accounts. Cannot scrape IG legally at scale. |
| **TikTok** | TikTok Display API (very limited) | Practical path is manual editorial sourcing + creator partnerships, not bulk ingestion. |
| **Native uploads** | Creator portal (we build) | Creators submit reels directly with attribution baked in. Highest-quality path. |

**Key rule**: We never **rehost** video files. We embed via the platform's official player or link out. Always attribution + tap-through to creator profile.

### 2.3 Itineraries & lodges

Three sources of "real" itineraries:

1. **Operator partners** — tour operators publish itineraries on their site. We sign content partnerships (template MOU): we scrape their published catalog with permission, AI extracts day-by-day structure, our editorial team reviews and republishes as Editions with full operator attribution. *Operators want this — it drives qualified leads to them.*
2. **Magazine editorial itineraries** — many premium publications publish "ideal 12-day Kenya" articles. AI extracts the day-by-day, creates a draft Edition, editor refines.
3. **AI-synthesized from inspiration** — AI looks at clusters of high-engagement content (reels + blogs + photos) about a region and proposes a draft Edition. Editor curates.

Lodge data:

| Source | What we get |
|---|---|
| **Operator partners** | Authoritative lodge metadata + photography + booking-capable bookings (eventually) |
| **Google Places API** | Address, phone, photos, reviews, opening hours — for ~all hospitality businesses globally. Free tier + paid tier. |
| **Lodge own websites** | Via sitemap fetch with crawl-respect; pull About + amenities + their own photography (with permission) |
| **Conservancy partners** | Lewa, Mara Triangle, Olare Motorogi, etc. — official lodge lists |

### 2.4 Accreditations & reviews

| Source | Access | Use |
|---|---|---|
| **Google Places API** | Official, paid | Star rating + review count + sample reviews per lodge |
| **TripAdvisor Content API** | Partner-only (we apply) | Travellers' Choice badges, review counts. Their brand mark cannot be pixel-recreated. |
| **World Travel Awards** | Annual public lists | Scrape annually + cite |
| **Conde Nast Readers Choice Awards** | Annual public articles | Same |
| **Travel + Leisure World's Best** | Annual public articles | Same |
| **B Corp Directory** | Public listing | Ethical/sustainability badge |
| **EcoTourism Kenya** | Public lodge directory | Conservation badge |
| **Long Run / Pack For A Purpose** | Public partner lists | Niche but credible badges |

**Display style**: never a "trust badge wall." We render accreditations in editorial style — a small caption like *"Conde Nast Readers Choice · 2024 · 2025"* or a single editorial line beneath the lodge name.

### 2.5 Wildlife, environment, conservation data

| Source | Use |
|---|---|
| **eBird API** (Cornell Lab) | Bird sighting data for region + season layer |
| **iNaturalist** | Open biodiversity data, photos with CC licenses |
| **WWF Africa news** | Conservation context |
| **Conservancy partner feeds** (Mara, Lewa, etc.) | Real-time wildlife sightings, current movements |
| **Animal Migration Tracker / Movebank** | Migration timing data — feeds the "Migration is happening now" rail |

---

## 3. The ingestion pipeline (architecture)

Five intake channels, all feeding the same normalization → enrichment → editorial flow.

### 3.1 Channel 1 — RSS poller

A scheduled worker (Node + node-cron, or a serverless cron) that:
1. Holds a config file with ~50-100 RSS source URLs + per-source tags + per-source trust score
2. Polls each feed on a per-source cadence (2-6 hours typical)
3. Hashes each item's URL for dedupe against the database
4. For new items, fetches the full article HTML via the URL (respecting `robots.txt`)
5. Pushes a raw content record onto the queue

Tech: **Node worker** on a small VPS or Cloudflare Workers cron. Heavy fetches use Playwright if JS-rendered.

### 3.2 Channel 2 — API clients

Workers for official APIs:
- **YouTube ingestor**: pulls latest videos from configured channel IDs every 6 hours
- **Google Places refresher**: refreshes lodge metadata + reviews weekly per lodge
- **eBird/iNat puller**: regional + seasonal queries weekly
- **Instagram Graph API consumer**: for partnered creators, pulls latest Reels per opt-in account daily

Tech: same Node worker pool, separate functions per source.

### 3.3 Channel 3 — Partner webhooks

Operators + creators with partnerships push content to us. They hit our webhook endpoint with a payload describing the new content. We respond with the canonical SafariVerse URL once published.

Tech: Next.js API route (or a small Hono app); HMAC-signed webhook auth.

### 3.4 Channel 4 — Editorial manual upload

Internal dashboard (built into the admin app). An editor pastes a URL → AI does its enrichment immediately → editor reviews and approves on the spot. This is the highest-quality channel and the primary way premium magazine content enters the system (which we can't scrape legally).

Tech: admin route in Next.js + AI worker.

### 3.5 Channel 5 — Operator portal

Long-term: a SaaS-style portal where tour operators self-serve. They submit itineraries + lodges + photography. Built on top of SafariBoost CRM infrastructure. *Post-MVP.*

---

## 4. AI enrichment — what Claude actually does

Every raw content record runs through a single AI worker that performs structured extraction + transformation.

### 4.1 The enrichment prompt (shape, not final wording)

```
SYSTEM
You are SafariVerse's editorial intelligence. You read raw travel content
(article, video transcript, blog post) and transform it into structured
SafariVerse content with original editorial voice.

VOICE GUIDE (excerpt)
- Cinematic, sense-led, story-first
- Never bullet-list a destination
- Reference photography first, statistics last
- 200-400 words of original summary, NEVER copying source prose
- Inspired by Conde Nast Traveler + private safari journals, not OTAs

INPUTS
- raw_content (full text of article or video transcript)
- source_url
- source_platform
- detected_creator (if extractable)

OUTPUTS (JSON)
{
  "summary": "200-400w original editorial summary in SafariVerse voice",
  "destinations": ["Maasai Mara", "Lewa"],          // extracted entities
  "lodges": ["Cottar's 1920s Camp"],
  "species": ["Big Five", "wildebeest", "rhino"],
  "season_inference": "dry-season migration"|"green season"|"shoulder"|null,
  "country": "KE",
  "trip_style_tags": ["luxury", "photographic", "honeymoon"],
  "quality_score": 0.0-1.0,
  "safety_flags": [],                                // any concerns
  "suggested_tier": "featured"|"curated"|"published"|"hold",
  "rejection_reason": null|"low quality"|"off-topic"|"exploitative"|"duplicate"
}
```

### 4.2 What we use AI for vs. what we don't

| Task | AI? |
|---|---|
| Entity extraction (destinations, lodges) | ✅ |
| Original summary writing | ✅ |
| Tags + classification | ✅ |
| Vector embedding | ✅ (embedding model, not Claude) |
| Quality scoring | ✅ |
| **Decide what publishes** | ❌ Human editorial |
| **Decide who gets featured** | ❌ Human editorial |
| **Generate itinerary drafts** | ✅ but editor curates before publish |
| **Write the SafariVerse summary that becomes the public artifact** | ✅ but always behind human approval |
| **Fabricate facts** | NEVER |

### 4.3 Model choice + cost

- **Enrichment**: Claude Sonnet 4.6 (or 4.7 once available). Strong voice control, structured JSON output, reliable extraction.
- **Embeddings**: Voyage AI's `voyage-3` or OpenAI `text-embedding-3-large`.
- **Cost ceiling**: at MVP volume (300 raw items/week × ~2k input + 600 output tokens), enrichment is < $30/week. Embeddings are negligible.

### 4.4 Voice control — the most important AI engineering work

The single highest-leverage thing to get right is the **voice guide system prompt**. Every SafariVerse summary must read like SafariVerse, not like ChatGPT default. Investment here:

1. Compile a 1000-word voice guide with examples of GOOD vs. BAD SafariVerse summaries
2. Include 8-12 worked examples (`raw_content` + `expected_summary`) as few-shot in the prompt
3. Periodically audit AI outputs and add corrections to the voice guide
4. Treat the voice guide as a versioned artifact in the repo (`config/ai/voice-guide.md`)

---

## 5. The editorial gate — humans before publish

AI never publishes unattended. Every enriched content record lands in an **editorial queue** dashboard where:

- A curator sees the AI's draft summary + extracted entities + suggested tier
- They can approve, hold, reject, or **edit-and-approve**
- Approval requires choosing a tier (Featured / Curated / Published) and confirming tags
- Bulk approve is allowed for trusted sources (e.g., Tanzania Tourism Board feed)

**Editorial roles**:
- **Editor-in-chief** — sets weekly featured + theme
- **Regional curators** (East Africa / Southern Africa) — daily approval queue
- **Creator partnerships lead** — onboards new sources + creator MOUs
- **AI ops** — monitors enrichment quality + voice drift, updates the voice guide

**Volume math at MVP**:
- ~300 raw items/week ingested
- ~150 reach editorial queue (rest auto-rejected by AI quality score)
- ~80 published
- ~10 featured
- 1-2 hours of editorial review per day across the team

This is **less work than running a small magazine**. Doable for a 2-3 person editorial team.

---

## 6. Legal & ethical framework — the non-negotiables

| Rule | Why |
|---|---|
| **Never rehost video files**. Embed via official player or link out. | Copyright |
| **Never publish full source articles**. AI generates original 200-400w summaries with prominent backlinks. | Copyright + good faith |
| **Always cite creator + source platform + original title + date + URL** on every published item. | Ethics + brand integrity |
| **Respect `robots.txt`** when scraping any site we don't have explicit partnership with. | Legal + reputational |
| **Honor takedown requests within 24 hours**. | Legal + reputational |
| **No Instagram/TikTok bulk scraping**. Use Graph API with opt-in creators only. | Platform ToS |
| **No pixel-recreation of TripAdvisor / Google logos** in our UI. Use platform names + their official badges via API/widget. | Trademark |
| **Store source URL + platform + creator + original date as immutable metadata** on every content record. | Audit trail |
| **AI-generated content is clearly labeled** in metadata (we may or may not surface this label to users — TBD). | Disclosure ethics |
| **GDPR + CCPA** — if a user data subject requests deletion of content referencing them, we comply. | Privacy law |
| **POPIA (South Africa)** — same. | Privacy law |

These rules belong in a `LEGAL.md` at the repo root once we're closer to launch.

---

## 7. How ingested content reaches the user surfaces

Once a content record is **published**, it propagates to several places:

### 7.1 Discover feed
Real-time. The feed's recommendation engine surfaces it to travelers based on:
- Recency + quality tier (Featured > Curated > Published)
- Match to the traveler's affinity vector (saved destinations, watched creators)
- Editorial day-of-week + seasonal weighting

### 7.2 Edition synthesis (the magic moment)
Editions can be **manually authored**, **AI-drafted**, or **AI-synthesized from clusters**:

- **Manually authored**: editor writes a 12-day Kenya Edition; system attaches related ingested content as the "Inspired by" + "Sources & Attribution" panel on each day
- **AI-drafted from a magazine article**: an ingested magazine itinerary auto-creates an Edition draft → editor refines + adds lodge metadata + photography
- **AI-synthesized from clusters**: AI looks at 30+ high-engagement content items about Kenya migration → detects a coherent narrative shape → drafts a Migration Edition with content from 6 different creators threaded through the days → editor curates

### 7.3 Search
Every published item is indexed:
- Full-text search on title + summary + entity names
- Vector search on embedding (semantic queries like "quiet luxury photography trips")
- Faceted by destination, season, creator, tier

### 7.4 AI Dream Builder
When the Dream Builder LLM constructs a journey, it retrieves the top-N matching content items via vector search + entity filter, then weaves them into the conversation: *"Jane Doe captured Lewa at dawn just last month — your journey would start there."*

### 7.5 SafariReceptionist (concierge) memory
The concierge has access to the same content store. When a traveler asks "what's happening in the Mara right now?", the concierge can pull the most recent published items + render them in the conversation.

### 7.6 OG / share cards
Editions and content items publish their own share cards (Atlas-Poster variant for Editions; cinematic card for individual content). When a traveler shares to WhatsApp/IG/Twitter, the published metadata produces a rich preview.

---

## 8. Phase 1 MVP — what to wire up first

In build order, smallest scope that produces real content flowing to a real feed:

### Week 1-2 — RSS poller + Editorial dashboard
- Postgres schema for `content`, `source`, `creator`, `lodge` entities
- Node worker polling 20 hand-picked RSS sources every 4 hours
- Editorial dashboard route (internal): inbox of new items, approve/reject UI, tier selection
- Voice guide v1 written + checked into repo

**At end of Week 2**: editors approve content. ~30 published items in DB.

### Week 3-4 — AI enrichment + content schema
- AI worker (Claude Sonnet) with the enrichment prompt + voice guide
- Postgres tables for entities + relationships (destination, lodge, creator, content)
- Vector DB integration (Pinecone or Weaviate)
- Editorial dashboard now shows AI drafts (not raw text)

**At end of Week 4**: ~80 enriched + published items. The Discover feed can render real content.

### Week 5 — YouTube ingestor + creator partnerships
- YouTube Data API integration
- ~10 selected creator channels
- Manual reach-out to 20 creators for IG Graph opt-in (parallel track, takes weeks)

### Week 6 — Google Places API + lodge entities
- Lodge entity model
- Google Places lookup for ~40 priority lodges
- Lodge pages with editorial template

### Week 7-8 — Edition synthesis tooling
- Manual Edition authoring UI (editor builds a 12-day journey from approved content)
- "Inspired by" + "Sources & Attribution" auto-attach to days
- First three Editions hand-built by editorial team (live the demo we already designed)

**At end of Week 8**: the Editions in the landing page hero are *real Editions*, not stubs.

### Week 9-10 — Recommendation + search
- Vector search with affinity weighting
- Discover feed personalization
- Free-text search route

### Week 11-12 — Operator partner pipeline
- Operator MOU template
- Submission webhook + lightweight admin
- First three operator partnerships signed

---

## 9. What we're *not* building at MVP (and when)

| Capability | When | Why deferred |
|---|---|---|
| **TikTok ingestion** | Post-launch | API too limited; do manual editorial sourcing for now |
| **Instagram scraping** | Never | Platform ToS violation; partner-only path |
| **Magazine paywall content** | Editorial-uploaded only | Pay for subscriptions, manual sourcing |
| **Full operator self-service portal** | Post-MVP | Use email-based partnership pipeline initially |
| **AI-synthesized Editions auto-publish** | Post-MVP | Quality control first; editor-curates initially |
| **Multi-language ingestion** | Phase 2 | English-only sources at MVP |
| **Conservation real-time data** (Movebank/eBird) | Phase 2 | Nice-to-have; not load-bearing |
| **Operator booking integration** | Phase 3 | Quote-request → human concierge handoff is enough at MVP |

---

## 10. Roadmap for "where AI grabs from" over time

```
MVP (months 0-3)
├── RSS (50-100 sources)
├── YouTube (20-40 channels)
├── Google Places (~100 lodges)
├── Editorial manual upload
└── Magazine subscriptions (legit, manual)

Phase 2 (months 3-6)
├── IG Graph (20-50 partnered creators)
├── Operator partner webhooks (5-10 partners)
├── eBird + iNaturalist (wildlife layer)
├── TripAdvisor partnership (if approved)
└── Conservancy partner feeds

Phase 3 (months 6-12)
├── Operator self-service portal
├── Creator economy (revenue-share attribution chain)
├── Multi-language ingestion (Swahili, French, Portuguese)
├── Movebank / migration real-time
└── Booking integration

Phase 4 (year 2+)
├── Agentic AI travel planners (Claude / GPT-class agents) consuming our schema directly
├── Voice + AR surfaces consuming the same content store
├── White-label content licensing to operator websites
└── First-party magazine — SafariVerse publishes its own quarterly Edition magazine
```

---

## 11. Open decisions (need your call)

A few things I can decide on for now but the user should sign off on:

1. **AI vendor lock-in** — default is Claude (we're already on Anthropic). Worth committing? Or want a thin abstraction so we can swap?
2. **Self-host AI or use Anthropic API direct** — direct API is fine for MVP; reconsider at scale.
3. **Vector DB** — Pinecone (managed, fast, paid) or Weaviate (open, can self-host)? Default Pinecone for MVP simplicity.
4. **Editorial dashboard** — build inside Next.js admin route or use Retool/Tooljet? Default: simple Next.js route, full control.
5. **Voice guide ownership** — who maintains it? Default: editor-in-chief, versioned in repo.
6. **Featured editorial cadence** — weekly featured Edition? Monthly themed Edition? Default: weekly + monthly theme.

---

*End. Content flows from real sources, through one of five intake channels, through normalization + AI enrichment, past a human editorial gate, into Postgres + vector DB, and out to every traveler surface. Real safari stuff, legally and beautifully.*
