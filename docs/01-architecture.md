# SafariVerse — Strategic Architecture & Product Foundation

**Prepared for**: Claude Design (visual execution), Safari Tech Lab engineering
**Author role**: Product Architect · UX Systems Strategist · AI Ecosystem Strategist
**Status**: Pre-code strategy. No implementation until this is approved.

> **One-line definition.** SafariVerse is a mobile-first, AI-native consumer dream universe for African travel — where viral safari content becomes immersive itineraries, dream collections, conversational concierge experiences, and personalized proposals.

> **Feel mantra.** *Netflix meets ReciMe for African travel — wrapped in Airbnb's warmth.* A cinematic African safari universe powered by AI-driven discovery and emotional storytelling.

---

## 0. Reading order & hand-off notes

Sections 1–3 establish *why*. Sections 4–11 establish *what*. Sections 12–22 establish *how the product behaves*. Sections 23–40 establish *how the system thinks, learns, and scales*. The final section is a self-contained prompt for Claude Design to execute the visual system.

Design-system inputs used as references (NOT copied):
- **Airbnb** — premium hospitality warmth, trust-building card mechanics, single-accent restraint
- **Pinterest** — masonry inspiration grid, save/collection psychology, image-is-the-product layout
- **Spotify** — dark cinematic immersion, content-first chrome, pill-and-circle geometry, single brand-color discipline

ReciMe behavior reference (public-only observation, no asset reuse):
- External viral content is paste-in / share-target → AI parses → produces structured experience → saves into user's library
- Library is the emotional home — content is "yours" once saved
- "Cook from inspiration" is the action verb. SafariVerse mirrors this as **"Dream from inspiration"** then **"Build from dream"**

Netflix behavior reference (public-only observation, no asset reuse):
- Horizontal genre rails over editorial hero
- Auto-preview on dwell, never on tap
- "Continue watching" as identity anchor
- Profile-level personalization, household-aware
- Volume of content masked by editorial curation surfaces

---

# PART I — STRATEGIC FOUNDATION

## 1. Product philosophy

SafariVerse rests on five non-negotiable principles. Every product decision should be auditable against these.

1. **Inspiration-first, relationship-second, conversion-third.** The platform never asks for booking intent before earning emotional investment. Logistics surface only when the traveler signals readiness.
2. **The platform is a living universe, not a database.** Travelers explore Africa the way they binge a series — emotionally, recursively, without a goal-directed funnel.
3. **AI accelerates discovery; humans curate aspiration.** Automation handles ingestion, enrichment, recommendation. Editorial taste handles what gets featured. The system feels handpicked despite scale.
4. **SafariVerse owns the traveler relationship.** Operators are partners, not landlords. Every lead enters SafariVerse's GHL subaccount first. The brand promise to the traveler is *"we know you"* — that requires custody of the relationship.
5. **Every interaction makes the universe smarter.** Saves, dwell time, replays, conversations, and proposal acceptances all feed the traveler graph. The product compounds in value with use.

**Inversions** — what SafariVerse is explicitly *not*:
- Not an OTA. No inventory-first thinking.
- Not a Wikipedia. No information-density mindset.
- Not a TripAdvisor. No review-aggregator UX.
- Not a generic AI SaaS. No "dashboard" energy.
- Not a booking engine. Reservations are *outcomes*, not entry points.

## 2. User psychology framework

Travelers move through three psychological states. The product must serve each distinctly and never collapse one into another prematurely.

| State | Mood | Behavior | Product job |
|---|---|---|---|
| **Dreaming** | Open, aspirational, distractible, identity-curious | Scrolls, saves, shares, replays | Feed emotion. Show, don't ask. |
| **Building** | Focused, possessive, curatorial | Organizes saves, names collections, returns repeatedly | Reflect their taste. Surface adjacency. |
| **Committing** | Decisive, anxious, trust-seeking | Talks to concierge, requests proposal, compares dates | Reduce friction. Add human warmth. |

**Operating rules**:

- **The Dream-State Rule.** Until the traveler signals readiness (asks the concierge a logistical question, taps "Make this mine," or names a date window), the UI must not show prices, dates, fees, availability, or contact forms. Premature logistics break the spell.
- **Save behavior is identity behavior.** Saving a reel is not a bookmark — it is the traveler telling the system *who they are becoming*. Treat collections as identity artifacts (named, shared, beautiful), not as a feature dropdown.
- **Dwell beats clicks.** A 28-second dwell on a Serengeti reel is a stronger preference signal than a tap that bounces. Optimize emotional dwell, not engagement counts.
- **Replays are confession.** A second visit to the same dream collection is the highest-intent signal short of a proposal request. Reward it with personalization.
- **The Concierge Bridge.** When a traveler crosses from Building → Committing, the concierge (SafariReceptionist) appears as a person, not a chatbot. The handoff from solo-browsing to assisted-planning is the most important UX moment in the platform.

## 3. Emotional design principles

1. **Cinematic over informational.** Frame every screen as a film still, not a spec sheet.
2. **Story before stats.** "Day 4 — golden hour with elephants at Amboseli" before "12 days · $X · 4 stars."
3. **Silence is luxury.** Whitespace, slow motion, restraint. Crowded = cheap.
4. **Motion as emotion.** Animations are slow (300–600ms), eased, considered. No bouncy springs. No skeuomorphic flourish.
5. **One brand color, used scarcely.** Like Airbnb's Rausch or Spotify's Green — when SafariVerse's accent appears, it *means* something.
6. **Photography is the product.** Chrome recedes. The image is never decorative; it is the message.
7. **Type that whispers, not shouts.** Confident weight discipline. Display weights at 500–600, not 800. Trust the photography to carry hierarchy.
8. **Editorial credit is sacred.** Creators are named beautifully, not in legal small-print. Attribution is part of the design, not a footnote.

---

# PART II — ECOSYSTEM ARCHITECTURE

## 5. Ecosystem architecture (4-product system)

```
┌─────────────────────────────────────────────────────────────────────┐
│                       SAFARI TECH LAB                                │
│                                                                      │
│   ┌──────────────┐    ┌────────────────────┐    ┌───────────────┐  │
│   │ SafariVerse  │───▶│ SafariReceptionist │───▶│  Studio       │  │
│   │ (consumer    │    │ (AI concierge      │    │ (proposal     │  │
│   │  discovery)  │    │  + memory)         │    │  builder)     │  │
│   └──────┬───────┘    └─────────┬──────────┘    └───────┬───────┘  │
│          │                      │                       │           │
│          └──────────────────────┼───────────────────────┘           │
│                                 ▼                                    │
│                        ┌─────────────────┐                          │
│                        │   SafariBoost   │                          │
│                        │ (GHL infra,     │                          │
│                        │  CRM, lifecycle)│                          │
│                        └─────────────────┘                          │
└─────────────────────────────────────────────────────────────────────┘
```

| Product | Role | Surface | Owner of |
|---|---|---|---|
| **SafariVerse** | Consumer discovery layer | Mobile app + web | Traveler attention, dream collections, attribution graph |
| **SafariReceptionist** | AI concierge + conversational memory | WhatsApp, in-app, email, web chat | Traveler intent, preferences, multi-channel context |
| **SafariBoost** | CRM + automation infrastructure | Backend / GHL subaccount | Lead lifecycle, scoring, retargeting, behavioral intelligence |
| **Studio** | Proposal generation + cinematic itinerary storytelling | Web (responsive) | Proposal templates, itinerary graph, share/approval flow |

**Data flow**: Discovery → Conversation → Profiling → Proposal → Automation → Relationship nurturing. Every touchpoint writes to the same traveler graph.

## 6. AI systems architecture

```
INGESTION ──▶ ENRICHMENT ──▶ CURATION ──▶ RECOMMENDATION ──▶ CONVERSATION ──▶ GENERATION
   │              │              │                │                │                  │
RSS, sitemaps    Embeddings    Human review    Vector search   LLM + memory       Itineraries
Creator feeds    Entity NER    Editorial       Collab filter   Cross-channel      Proposals
TikTok/IG/YT     Geo-tagging   promotion       Intent model    state              Summaries
API feeds        Summaries     Quality control                                    
```

| Layer | Function | Tech direction |
|---|---|---|
| **Ingestion** | Pull viral content, blogs, RSS, creator feeds | Scheduled crawlers, official APIs where possible, partner pipeline for high-trust sources |
| **Enrichment** | Extract destinations, lodges, species, seasons, sentiments | LLM-based entity extraction, vector embeddings, geocoding |
| **Curation** | Auto-tier + human approval gate | Editorial dashboard (internal, not exposed) |
| **Recommendation** | Match content to traveler graph | Hybrid: collaborative filtering + content vectors + intent weights |
| **Conversation** | Concierge dialog with memory | LLM with retrieval-augmented memory keyed to traveler profile |
| **Generation** | Itinerary synthesis, proposal narrative, summaries | Template-guided LLM generation with editorial guardrails |

**Critical AI rule**: AI never publishes content unattended. Every AI-surfaced summary, itinerary, or proposal passes a human editorial check OR is clearly badged "AI-generated draft" and ranked below curated content in the feed.

## 19. GHL integration touchpoints

Every traveler interaction is a write to GHL.

| Event | GHL action |
|---|---|
| Account creation | Create contact, tag `safariverse:traveler`, set source field |
| Save to dream collection | Append to custom field `dream_destinations[]`, fire `behavior.saved` webhook |
| Concierge conversation | Append summary to contact note, store transcript URL, update `last_engagement` |
| Quote request | Create opportunity in `Dream-Stage` pipeline, attach dream collection snapshot, fire `intent.quote_requested` |
| Proposal viewed | Move opportunity to `Proposal-Viewed`, set `viewed_at`, append heatmap summary |
| Proposal accepted | Move to `Won-Awaiting-Operator-Match`, trigger SLA timer |
| Inactive 30 days | Move to `Nurture`, trigger retargeting sequence |

**Architectural choice**: SafariVerse → GHL via a thin **event bus** (not direct API per action). All events emit to a queue; a worker batches into GHL. This protects GHL from rate limits and lets the product replay events for audit.

## 20. SafariReceptionist integration architecture

The concierge must feel like *one person across every channel*.

**Channels** (priority order):
1. In-app chat (SafariVerse mobile + web)
2. WhatsApp Business API (where regulatorily permitted)
3. Email (transactional + conversational)
4. Future: voice, SMS, agentic AI surfaces

**Memory model**:
- **Session memory** — last 50 turns, in-memory
- **Profile memory** — long-term preference graph, persisted (Postgres + vector store)
- **Cross-channel memory** — same `traveler_id` resolves across WhatsApp number, email, app login

**Handoff rules**:
- AI handles 100% of Dreaming-state conversations
- AI handles ~80% of Building-state conversations
- Human ops takes over Committing-state when: budget mentioned, dates fixed, multi-traveler complexity, or AI confidence < 0.7
- Handoff is invisible to traveler — same conversation thread, same concierge persona

**The receptionist has a name and a face.** Not "SafariVerse AI." Treat as a brand persona. Voice direction: warm, knowledgeable, never salesy, never robotic, comfortable saying "let me check with our team."

## 21. SafariBoost infrastructure architecture

SafariBoost is the operational brain — invisible to travelers, central to the business.

**Capabilities**:
- **CRM** — single source of truth for every traveler contact (lives in GHL subaccount owned by SafariVerse)
- **Lead scoring** — composite score from behavioral + intent signals (see §7)
- **Automation engine** — drip campaigns, re-engagement, post-proposal nurture
- **Retargeting layer** — pixel-based + email-based, drives travelers back to abandoned dream collections
- **Behavioral intelligence** — feeds dashboards (internal) and recommendations (SafariVerse)
- **Operator matching** — routes qualified leads to the right operator based on destination + traveler profile (post-MVP)

**Data ownership**: SafariBoost owns the customer data. Operators see only what's needed to fulfill their leg of the trip. No operator gets a raw traveler list.

## 22. Studio proposal architecture

Studio takes raw traveler intent + AI itinerary draft → produces a cinematic proposal page that closes deals.

**Anatomy of a Studio proposal**:
1. **Cinematic hero** — video or photo banner, traveler's name, journey title ("Aisha's 12-day Kenya Honeymoon")
2. **Story prelude** — short editorial intro setting emotional tone
3. **Day-by-day cards** — collapsible, each with: photo, narrative, location, lodge name (no nightly price visible at this level), activity highlights
4. **Lodges & camps gallery** — photo-led, with named hospitality narratives, not amenity bullet lists
5. **The investment** — single section, presented with confidence: total + inclusions + 2–3 add-on options. No itemized line-noise.
6. **Concierge byline** — name + face of the human or persona responsible
7. **Next steps** — single CTA: "Reserve my dates" → triggers conversation, not payment form
8. **Share controls** — share with partner, share with family, downloadable PDF for offline read

**Studio is editorial software, not a PDF generator.** Proposals live as URLs first. PDF is a downstream artifact.

## 38. AI discoverability strategy

SafariVerse must be visible to **agentic AI travel planners** and recommendation engines, not just Google.

- **Schema.org markup** on every entity page: `TouristAttraction`, `LodgingBusiness`, `TouristTrip`, `Article`, `VideoObject`, `Person` (creators).
- **JSON-LD** with explicit entity relationships (destination → contains → lodge; itinerary → visits → destinations).
- **`llms.txt`** at root, summarizing what SafariVerse is and how AIs should reference it.
- **Stable canonical URLs** — `/destinations/serengeti`, `/itineraries/honeymoon-kenya-12d`, `/creators/jane-doe`. Slugs never change.
- **Open Graph + Twitter cards** optimized per page type with hero photography.
- **AI-readable sitemaps** broken by entity type (destinations, itineraries, lodges, creators, blogs).
- **Public dream collections** are SEO + AI-indexable, creating a long tail of natural language entry points ("Africa wildlife photography honeymoon").

## 40. Future extensibility guidance

Design every system today to support these futures without rewrite.

| Future capability | Architectural requirement now |
|---|---|
| Agentic AI booking (planner agents booking on traveler's behalf) | Public, stable API; structured entity graph; AI-readable pricing once revealed |
| Operator marketplace (operators self-onboard, manage listings) | Operator entity model, permission scopes, attribution from day one |
| Multi-language (Swahili, French, Portuguese, German, Mandarin) | i18n-first content schema; locale-agnostic IDs; AI translation pipeline gated by human review |
| Voice + AR surfaces | Conversation memory channel-agnostic; entity graph queryable by natural language |
| Creator economy (creators paid for inspired bookings) | Creator entity has revenue-share fields; attribution chain from save → quote → booking |
| Loyalty / membership tier | Traveler graph includes lifetime engagement, returnable benefits hookable to GHL |
| White-label for tour operators | Theme tokens designed for swap; brand fields parameterized |

---

# PART III — TRAVELER INTELLIGENCE & DATA

## 7. Traveler intelligence framework

The traveler graph is the company's most valuable asset.

```
TRAVELER PROFILE
├── identity
│   ├── traveler_id (stable)
│   ├── channel_handles (email, WhatsApp, social, app login)
│   └── name, locale, market
├── inferred preferences (built from behavior, not forms)
│   ├── safari_style: [classic | photographic | adventure | family | luxury | honeymoon]
│   ├── budget_signal: [explorer | comfort | premium | ultra]
│   ├── pace: [slow | balanced | active]
│   ├── country_affinity: weighted vector (Kenya 0.8, Tanzania 0.7, Botswana 0.3...)
│   ├── wildlife_interest: weighted vector (big-cats, primates, marine, birds...)
│   ├── season_sensitivity: [migration-driven | weather-driven | flexible]
│   └── companion_context: [solo | couple | family | group]
├── behavioral signals
│   ├── saves[] (content + timestamp + collection)
│   ├── dwell_durations[] (content + seconds)
│   ├── replays[] (content + visit count)
│   ├── shares[] (content + channel + audience)
│   ├── searches[] (query + timestamp)
│   └── concierge_turns[] (intent classification per turn)
├── intent signals
│   ├── quote_requests[]
│   ├── proposal_views[]
│   ├── proposal_dwell_per_section[]
│   └── stated_dates_window
└── lifecycle
    ├── stage: [dreaming | building | committing | traveling | post-trip]
    ├── score: 0–100 composite
    └── last_engagement_at
```

**Inference rules**:
- Form-filled preferences are weighted 1.0 once
- Behavioral preferences accumulate (each save = +0.1 to that destination affinity, capped)
- Recency-weighted: a save 2 weeks old > a save 6 months old
- Concierge-declared preferences (explicit "I want X") weighted 1.5x and persisted

## 16. Recommendation engine behavior

**Cold start** (new traveler): editorial-curated homepage. No personalization. Diversity-maxed.

**Warm** (5–20 saves, < 3 concierge turns): hybrid score:
- 50% content embedding similarity to saved items
- 30% collaborative filter (travelers with overlapping saves)
- 20% editorial weight (featured / trending / season-relevant)

**Hot** (20+ saves OR concierge conversation OR quote request): personalized vector + intent boost:
- 40% personal embedding similarity
- 25% collaborative
- 20% intent-aligned (matches stated/inferred budget, dates, companion context)
- 15% serendipity (deliberately diverse, prevents echo chamber)

**Diversity rule**: no rail may be > 70% one country, no rail may be > 50% one creator. Editorial curation enforces minimum geographic and stylistic diversity.

**Decay**: 7 days of inactivity drops a destination affinity by 10%. A replay restores it fully. Affinities never decay to zero.

## 23. Creator attribution system

Creators are first-class entities.

```
CREATOR
├── creator_id
├── display_name
├── platforms[] (Instagram handle, YouTube channel, TikTok, blog URL)
├── byline_photo
├── short_bio
├── safari_specialties[] (photography | guiding | luxury | family | etc)
├── content_count
├── inspired_quotes_count (attribution chain)
└── revenue_share_status (future)
```

**Display rules**:
- Every reel, video, blog excerpt, and quoted photo includes a visible creator credit + tap-through to creator profile
- Creator credit appears at the bottom-left of cinematic cards, in `caption` weight, with a circular avatar
- Itinerary pages list "Inspired by" creators in a dedicated band
- Proposals built from creator content carry attribution into the PDF

**Ethical guardrails**:
- Never rehost full video files. Embed via official platform players where allowed; otherwise link out with cinematic preview frame.
- Never publish full blog text. AI generates an *original summary* (200–400 words) clearly badged and linked to the source.
- Honor takedown requests within 24 hours.
- Store source URL, original title, publication date, byline as immutable metadata.

## 24. Content ingestion architecture

```
SOURCES                 PIPELINE                       OUTPUT
────────────────────    ─────────────────────────      ─────────────────
RSS feeds          ┐    ┌─ Fetch + dedupe              Content entity
Creator partner    ├──▶ ├─ Entity extraction (LLM) ──▶ in vector DB +
APIs (TikTok/IG/YT)│    ├─ Geocoding                   Postgres with
Sitemap watchers   │    ├─ Sentiment + style tagging   approval status
Editor manual      ┘    ├─ Generate original summary
                        ├─ Human editorial review
                        └─ Promote / hold / reject
```

**Approval states**: `ingested` → `enriched` → `awaiting-review` → `published` (or `held`). Only `published` content appears in user-facing feeds.

**Quality control**:
- Visual quality threshold (resolution, composition heuristics)
- Source trust score (creator history, platform)
- Editorial reviewer signs off

**Velocity**:
- AI pipeline: continuous
- Editorial review: daily editorial standup
- Publish cadence: ~50–100 new items/week at MVP, scaling to 500+/week

## 25. Semantic destination graph structure

The graph is the substrate for AI recommendations and agentic discovery.

**Entity types**:
- `Destination` (Serengeti, Maasai Mara, Okavango)
- `Country`
- `Region` (East Africa, Southern Africa)
- `Lodge` / `Camp`
- `Experience` (game drive, walking safari, balloon, fly-camp)
- `Wildlife` (species + behaviors: Big Five, Great Migration, gorilla trek)
- `Season` (dry season, green season, calving, migration crossings)
- `Itinerary`
- `Creator`
- `Operator` (partner companies)
- `Content` (reels, videos, blogs)
- `Traveler`

**Relationship types**:
- `contains` (Country → Destination)
- `hosts` (Destination → Lodge)
- `offers` (Lodge → Experience)
- `peaks_in` (Wildlife → Season)
- `visits` (Itinerary → Destination)
- `inspired_by` (Itinerary → Content)
- `created_by` (Content → Creator)
- `saved_by` (Content → Traveler)
- `recommends` (Lodge → Operator)
- `similar_to` (Destination → Destination; vector similarity)

**Why this matters**: the graph lets the concierge answer "Where can I see the migration in September with kids under 10 on a comfort budget?" by traversing relationships, not keyword matching.

## 37. Conversational memory systems

Three tiers, each with distinct retention and retrieval logic.

| Tier | Lifespan | Storage | Used for |
|---|---|---|---|
| **Session** | 1 conversation | In-memory (Redis) | Within-conversation coherence |
| **Profile** | Permanent | Postgres + vector store | Personalization, cross-channel continuity |
| **Behavioral** | Permanent | Event log + aggregated features | Recommendations, lead scoring |

**Memory retrieval** at conversation turn:
1. Pull last 50 turns from session
2. Pull top 5 most-relevant profile facts via vector search ("traveler prefers slow pace, declined Tanzania last time")
3. Pull recent behavioral summary ("saved 4 Kenya items in last 7 days")
4. Inject as system prompt context for the LLM

**Memory writes**:
- After every conversation, an LLM summarizer extracts new profile facts and merges with existing (with timestamp + source)
- Conflicts resolved by recency + explicit-statement > inference

## 39. Network effects strategy

The flywheel:

```
   Content
      │
      ▼
  Inspiration ──▶ Saves ──▶ Conversations ──▶ Traveler Profiles
      ▲                                              │
      │                                              ▼
  More travelers ◀── Better matches ◀── Smarter recommendations
      │                                              │
      ▼                                              ▼
  More creators ──▶ More content                 More itineraries
                                                     │
                                                     ▼
                                            More quote requests
                                                     │
                                                     ▼
                                            More operator conversions
                                                     │
                                                     ▼
                                            Better AI discoverability
```

**Defensibility sources**:
1. **Traveler intent data** — proprietary, depth-of-signal nobody else has
2. **Conversational memory at scale** — multi-channel context graph
3. **Emotional engagement mapping** — what *creates dreams*, not just clicks
4. **African tourism relationship graph** — proprietary entity model
5. **Creator partnerships + attribution chains** — incentives align over time
6. **Operator network density** — better matching the more operators participate

---

# PART IV — FRONTEND ARCHITECTURE

## 4. Frontend architecture (technology direction)

**Mobile-first, multi-surface, mostly shared**:

| Surface | Stack | Why |
|---|---|---|
| Mobile app (iOS + Android) | Expo (React Native) | Single codebase, OTA updates, native performance for video |
| Web (responsive) | Next.js 15 (App Router) | SSR for SEO + AI discoverability; React paradigm shared with mobile |
| Studio (proposals) | Next.js (same monorepo) | Editorial-grade rendering, share-link first |
| Concierge backend | Node service + Python ML workers | LLM orchestration in Python, transactional logic in Node |
| Design tokens | Style Dictionary | Single source of truth across mobile + web |

**State + data**:
- API gateway: tRPC (typed end-to-end) or GraphQL (if operator-facing API matures)
- Auth: Clerk or Supabase Auth (passwordless preferred — email magic link + Apple/Google + WhatsApp OTP)
- Primary DB: Postgres (managed; Supabase or Neon)
- Vector DB: Pinecone or Weaviate
- Cache: Redis (sessions, rate limit, hot feed)
- Image/video CDN: Cloudflare Stream + Images, or Mux for video
- Event bus: Kafka or Redpanda (or, for MVP, BullMQ + Postgres)

**Performance budget** (mobile app, primary screens):
- Time-to-interactive: < 1.5s on 4G
- First contentful paint: < 800ms
- Video preview start: < 600ms on dwell
- Scroll jank: zero dropped frames on M-class phones from 2022+

## 8. Mobile navigation hierarchy

```
┌───────────────────────────────────────────┐
│  [Logo]              [Search]    [Avatar] │   ← Top bar (minimal, sticky)
├───────────────────────────────────────────┤
│                                           │
│              (Screen content)             │
│                                           │
├───────────────────────────────────────────┤
│  [Discover] [Search] [Dreams] [Chat] [Me] │   ← Bottom tab bar
└───────────────────────────────────────────┘
```

**Tab definitions**:
| Tab | Icon | Purpose | Default state |
|---|---|---|---|
| Discover | Cinematic eye / play | Personalized feed | Editorial homepage for cold-start |
| Search | Magnifier | Explore by destination, theme, creator | Recent + trending |
| Dreams | Heart-bookmark hybrid | Saved collections | Onboarding nudge for cold-start |
| Chat | Concierge person icon | SafariReceptionist | Welcome message for cold-start |
| Me | Avatar | Profile, settings, my proposals | Profile summary |

**Modals over navigation**:
- Quote request flow opens as bottom sheet
- Reel detail / video player opens as full-screen modal with swipe-to-dismiss
- Proposal preview opens as full-screen modal (Studio link rendered in-app)
- Share sheet uses platform-native + branded card

**No hamburger menu.** The tab bar is the navigation.

## 9. Core screen list

**Public / unauthenticated**:
1. Splash + onboarding (3-screen emotional intro, optional skip)
2. Sign-in / sign-up (passwordless)
3. Discover (homepage, can browse without account, prompted to save)
4. Search (browse-only without account)
5. Reel/Video detail (deep-linked)
6. Itinerary detail (deep-linked, shareable)
7. Destination detail
8. Creator profile
9. Public dream collection (shared)
10. Studio proposal (shared link, may be public or password-gated)

**Authenticated**:
11. Personalized Discover
12. My Dreams (collection grid)
13. Dream collection detail (single collection)
14. Concierge chat
15. AI Dream Builder (special concierge flow)
16. Quote request flow (sheet)
17. My quote requests + proposals (status)
18. My profile
19. Settings (notifications, channels, data export)
20. Account / billing (post-monetization)

**Onboarding micro-screens** (optional, skippable):
- Pick your safari style (3–5 image tiles)
- Pick countries of interest (map-led)
- "Welcome to your dream universe" → land on Discover

## 10. Discovery feed structure

The Discover tab is the heart of the product. Composition:

```
[Cinematic Hero] — auto-rotating, full-bleed, 4 stories deep
        │
[Editor's Picks This Week] — curated horizontal rail
        │
[Continue Dreaming] — items the traveler started/saved (Netflix Continue Watching equivalent)
        │
[Because you saved {Serengeti reel}] — recommendation rail
        │
[Trending in Kenya] — destination-themed rail
        │
[Migration is happening now] — season-triggered rail
        │
[Meet the storytellers] — creator-themed horizontal rail
        │
[Build your dream → AI Dream Builder] — concierge entry card
        │
[Editorial: Honeymoon Journeys] — featured collection
        │
[Reels for you] — vertical full-screen feed entry (Pinterest masonry → Spotify-style)
        │
[More from creators you follow] — if applicable
        │
[Quiet places, slow days] — mood-themed rail (counter to migration drama)
```

**Rail composition rules**:
- Each rail has a clear emotional title (no "Recommended for you")
- Editorial bands (every 3–4 rails) break recommendation rails with curated featured content
- The "AI Dream Builder" card appears once per session, never twice
- Feed depth: infinite scroll, but every ~15 rails surfaces a "You've explored a lot — want to talk to a concierge?" gentle prompt

## 11. Homepage content architecture

The first screen a traveler sees must feel like *"I opened a luxury African dream universe."*

```
┌─────────────────────────────────────────────────┐
│                                                 │
│         [Full-bleed cinematic hero]             │  ← Slow Ken-Burns motion
│                                                 │     editorial caption
│         "Where the wild ones whisper"           │     creator credit bottom-left
│            — Mara Triangle, Kenya               │
│                              [▷ Watch]          │
│                                                 │
├─────────────────────────────────────────────────┤
│  EDITOR'S PICKS THIS WEEK                       │
│  ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐   →                  │
│  └──┘ └──┘ └──┘ └──┘ └──┘                       │
├─────────────────────────────────────────────────┤
│  CONTINUE DREAMING                              │
│  ┌──┐ ┌──┐ ┌──┐                                 │
│  └──┘ └──┘ └──┘                                 │
├─────────────────────────────────────────────────┤
│  BECAUSE YOU LOVED THE GREAT MIGRATION          │
│  [rail of 8 items]                              │
├─────────────────────────────────────────────────┤
│         [AI DREAM BUILDER CARD]                 │
│  "Tell me your dream — I'll build your safari"  │
│              [Start building →]                 │
├─────────────────────────────────────────────────┤
│  [more rails, infinite]                         │
└─────────────────────────────────────────────────┘
```

**Above-the-fold rule**: First viewport must contain only the cinematic hero. No rails. The user must *feel* before they *scroll*.

**Below the fold**: rails alternate with editorial bands. The feed never reads as "list of items." It reads as a magazine in motion.

## 26. Reusable frontend component structure

```
/components
├── primitives/             ← unstyled atoms
│   ├── Button
│   ├── Sheet
│   ├── Modal
│   ├── Avatar
│   ├── IconButton
│   └── Pill
├── media/                  ← image + video heroes of the system
│   ├── CinematicImage      ← fade-in, blur-up, art-direction crops
│   ├── HeroBanner          ← full-bleed with caption + Ken-Burns
│   ├── ReelPlayer          ← vertical autoplay
│   ├── VideoPlayer         ← horizontal landscape (creator videos)
│   └── AmbientLoop         ← muted decorative video
├── cards/                  ← the core content surface
│   ├── DreamCard           ← portrait 4:5, saves + share, creator credit
│   ├── ReelCard            ← vertical 9:16, autoplay on dwell
│   ├── ItineraryCard       ← editorial, cinematic banner + day count
│   ├── DestinationCard     ← square or 3:4, name overlay
│   ├── CreatorCard         ← avatar + bio, follow CTA
│   └── CollectionCard      ← stacked photo tile (4 thumbnails behind)
├── rails/                  ← horizontal scrollers
│   ├── ContentRail         ← generic horizontal scroller
│   ├── HeroCarousel        ← top-of-feed rotating hero
│   ├── EditorialBand       ← curated section with title + subtitle + CTA
│   └── ReelStripVertical   ← vertical full-screen reel feed entry
├── concierge/              ← SafariReceptionist surfaces
│   ├── ChatBubble
│   ├── ConciergeAvatar
│   ├── ConciergeSuggestion ← inline suggestion card (destinations, dates)
│   └── HandoffNotice       ← "A human will join in a moment"
├── collections/            ← Dream library
│   ├── CollectionGrid
│   ├── CollectionStack     ← stacked overlapping cover photos
│   ├── SaveButton          ← heart with collection picker
│   ├── CollectionEditor
│   └── ShareSheet
├── itinerary/              ← shared between SafariVerse and Studio
│   ├── DayCard
│   ├── MapStrip            ← horizontal mini-map of journey
│   ├── LodgeMoment         ← editorial lodge card inside a day
│   └── InvestmentBlock     ← single-section pricing reveal
├── attribution/
│   ├── CreatorCredit       ← appears on every content card
│   ├── SourceLink
│   └── AttributionBadge
├── forms/                  ← used sparingly
│   ├── QuoteRequestSheet
│   ├── DateRangePicker
│   ├── TravelerCountStepper
│   └── BudgetSelector
└── system/
    ├── EmptyState
    ├── ErrorState
    ├── LoadingShimmer       ← cinematic shimmer, not generic skeleton
    └── Toast
```

---

# PART V — UX MECHANICS

## 12. Netflix-style browsing mechanics

| Mechanic | SafariVerse application |
|---|---|
| **Hero auto-rotation** | Top-of-feed cinematic hero rotates every 8s with Ken-Burns + slow crossfade |
| **Horizontal rails** | Themed, with editorial titles ("Where the wild ones whisper"), never "Top picks" |
| **Auto-preview on dwell** | After 600ms of card hover/touch, video preview begins muted; tap to enter |
| **Continue Dreaming** | Mirrors "Continue Watching" — items saved, partially explored, or dream collections recently viewed |
| **Genre-style exploration** | Categories framed emotionally: "Migration drama," "Slow safaris," "Honeymoon journeys," "Through a photographer's eye" |
| **Infinite scroll** | Yes, but with editorial bands every 3–4 rails to break monotony |
| **Profile-level personalization** | Per-account, not per-device. Travelers can switch contexts (solo / planning with partner) |
| **Hidden volume** | The platform contains thousands of items; the user feels only ~12 rails. Curation hides volume. |

**What we deliberately don't copy from Netflix**:
- No "trending now in your country" — replaced with creator + emotional themes
- No "Top 10" lists — feels too gamified, breaks luxury feel
- No "leaving soon" urgency — anti-luxury

## 13. Save/share collection mechanics

**Save flow**:
1. Tap heart icon on any content card → instant save to default "My Dreams" collection
2. Heart animates with a slow, satisfying fill (no bounce)
3. Long-press heart → bottom sheet with collection picker + "Create new collection"
4. Cross-content saves are encouraged: a reel, a blog, a destination, a lodge can all live in the same collection

**Collection model**:
- Every traveler has a default "My Dreams" collection
- Travelers create named collections ("Kenya 2027," "Honeymoon," "Photography trips")
- Collections are private by default, can be made shareable (link) or public (indexable)
- Public collections become long-tail SEO / AI-discoverability assets

**Sharing**:
- Share button on every content card + every collection
- Generates a beautiful OG/Twitter card with the cover image
- Suggested share text is editorial: *"I'm dreaming about Kenya 🌍"* — not "Check out this app"
- Watermark is small + bottom-right, never aggressive; creator credit preserved

**Collaborative collections (post-MVP)**:
- Invite a partner / family member to co-curate
- Each contributor's saves are tagged
- Triggers a "your shared dream is taking shape" notification

## 14. Viral itinerary page structure

```
┌─────────────────────────────────────────────────┐
│      [Full-bleed cinematic hero video/photo]    │
│                                                 │
│       "Honeymoon in Kenya — 12 days"            │
│         By SafariVerse Studio · 2 saves         │
│                                  [♡] [↗ Share]  │
├─────────────────────────────────────────────────┤
│  Story prelude (3 short paragraphs)             │
│  — what makes this journey                      │
├─────────────────────────────────────────────────┤
│  THE JOURNEY                                    │
│  ┌────────────────────────────────────────┐    │
│  │ Day 1 — Arrival in Nairobi             │    │
│  │ [photo]    Narrative text...           │    │
│  │            [Lodge name & moment]       │    │
│  └────────────────────────────────────────┘    │
│  ┌────────────────────────────────────────┐    │
│  │ Day 2 — Lewa Conservancy               │    │
│  │ ...                                    │    │
│  └────────────────────────────────────────┘    │
│  [...]                                          │
├─────────────────────────────────────────────────┤
│  INSPIRED BY                                    │
│  [creator cards — 2-3 contributors]             │
├─────────────────────────────────────────────────┤
│  PLACES YOU'LL STAY                             │
│  [lodge moment cards — 4-6]                     │
├─────────────────────────────────────────────────┤
│  WHAT IT INCLUDES (collapsed by default)        │
│  [Tap to expand]                                │
├─────────────────────────────────────────────────┤
│  [floating CTA bar — sticky bottom]             │
│  "Make this mine →" → opens concierge or quote  │
└─────────────────────────────────────────────────┘
```

**Sharing optimization**:
- OG title: *"Honeymoon in Kenya — 12 days"*
- OG description: editorial pull from the story prelude
- OG image: cinematic hero (16:9 art-directed crop)
- Itinerary URL is permanent and human-readable

## 15. Blog / reel / video relationship system

All content is **polymorphic** under a single `Content` entity, with a `type` discriminator. Cross-linking via tags + embeddings.

```
CONTENT
├── id
├── type: reel | video | blog | photo_essay | ai_summary
├── source_platform: tiktok | instagram | youtube | blog | safariverse_native
├── source_url
├── creator_id
├── original_title
├── original_published_at
├── safariverse_summary (200–400 words, AI-generated, editor-approved)
├── hero_image
├── preview_video_url (if applicable)
├── duration_seconds
├── tags[] (destinations, species, themes, seasons)
├── entities_extracted (destinations, lodges, species, creators)
├── embedding (vector)
├── editorial_status
└── saved_count, share_count, dwell_avg, replay_count
```

**Cross-discovery**:
- "From this video → See itineraries that visit Amboseli" (entity-based)
- "Similar moods" (embedding-based)
- "More from this creator" (creator-based)

**Reel ↔ Itinerary bridge**: every itinerary page lists the content that inspired it; every content page lists the itineraries it appears in. This is the heart of the inspiration-to-action loop.

## 17. AI Dream-Builder flow

The Dream Builder is the most magical interaction in the product. It transforms vague aspiration into a concrete dream itinerary.

**Entry points**:
- Discover feed card ("Tell me your dream")
- Concierge chat prompt
- Empty-state in Dreams tab
- After 3+ saves: "Want me to build a journey from your dreams?"

**Flow**:
```
1. Concierge opens with a single emotional question:
   "What's pulling at you about Africa right now?"

2. Traveler types or speaks free-form.
   AI parses intent: destinations? wildlife? mood? companion? season?

3. AI asks at most 3 follow-ups, each light:
   - "When are you imagining? (rough is fine)"
   - "Who are you traveling with?"
   - "What's the pace — slow, balanced, full-on?"

4. AI shows a thinking moment: "Building your journey..."
   (slow, intentional — 4–6s — not instant, not a chatbot blink)

5. AI delivers a cinematic draft itinerary inline:
   - 6–10 days
   - 3–4 stops
   - Sourced from existing curated itineraries + augmented with the traveler's saves
   - Pulls relevant content cards as visual anchors

6. CTAs:
   - "Save to My Dreams" (default action)
   - "Talk to a concierge about this" (handoff)
   - "Adjust this dream" (loop back to refinement)
```

**Key design choice**: the AI draft is *not* a quote. It has no prices. It is a *vision*. Prices come later, through the concierge or proposal flow.

## 18. Quote request flow

The friction-minimum path from inspiration to lead capture.

**Entry points**:
- "Make this mine" on any itinerary or dream collection
- Concierge conversation reaches commit-state intent
- AI Dream Builder → "Talk to a concierge"

**Flow** (single bottom sheet, 3 light steps):

```
Step 1 — Confirm the dream
   [Visual summary: hero image, journey title, 3 highlight bullets]
   "Is this the journey you're imagining?"
   [Yes, build me a quote] [Refine first]

Step 2 — Light context
   Single sheet with progressive disclosure:
   - When? [Date range picker, "I'm flexible" toggle]
   - Travelers? [Stepper: adults / kids / kid ages optional]
   - Budget signal? [3 emotional tiers, NOT $ amounts:
     "Comfort & character" / "Premium escape" / "Once-in-a-lifetime"]
   - Anything special? [optional free-text field]

Step 3 — Your concierge will be in touch
   [Concierge avatar + name + face]
   "Asha will reach out within 12 hours."
   [Continue dreaming] [Watch your dreams build]
```

**Behind the scenes**:
- Creates GHL contact + opportunity in `Dream-Stage` pipeline
- Snapshot of dream collection attached
- Triggers internal Slack/notification to ops team
- AI generates first-draft proposal in Studio for concierge to review
- Auto-acknowledgment email within 60s with concierge byline

**Anti-patterns avoided**:
- No "select your room category" — that's OTA energy
- No "compare 3 packages" — that's marketplace energy
- No instant pricing — the goal is human relationship, not vending machine

## 33. Emotional scrolling systems

| System | Behavior |
|---|---|
| **Vertical infinite scroll** | Discover feed; gentle parallax on hero images; rails snap horizontally with subtle inertia |
| **Reel feed** | Full-screen 9:16 vertical reels; swipe up = next; muted by default with prominent unmute tap; pause when scrolled past |
| **Itinerary scroll** | Long-form editorial; sections fade in as they enter viewport; sticky day labels in left margin (desktop only) |
| **Map exploration** | Pan-to-discover; tap a region surfaces 4-6 dream cards from that region |
| **Hero auto-rotation** | 8s per slide, slow Ken-Burns motion (subtle), crossfade not slide |
| **Pull-to-refresh** | Triggers a "Concierge thinking..." animation, then fresh editorial picks |

**Anti-jank rules**:
- Video preview only starts after 600ms dwell on a card (not instant)
- Only one video plays at a time across the entire screen
- On low-power mode or low-bandwidth, video previews are replaced with cinematic still frames

## 34. Social sharing psychology

Sharing is the highest-leverage growth vector. Design for it.

| Behavior | Design |
|---|---|
| **Default share text** | Editorial, emotional: *"I'm dreaming about Kenya 🌍"* not "Check out this app" |
| **OG card** | Always the cinematic hero, not a UI screenshot |
| **Watermark** | Small SafariVerse mark, bottom-right, ~12% opacity |
| **Creator credit** | Preserved in shared content |
| **Collection share** | Generates a beautiful public URL; collection becomes long-tail SEO |
| **Itinerary share** | Public link with custom subdomain or path (`/dreams/honeymoon-kenya-12d`) |
| **WhatsApp share** | Optimized preview card (image + title + 1-line description) |
| **Story share** | 9:16 vertical share card auto-generated for IG/TikTok stories |

**The viral loop**: a friend opens a shared dream → sees curated cinematic content + a soft CTA "Build your own dream universe" → becomes a user → shares their own dreams.

## 36. Dream collection system

Collections are the emotional center of the product — closer to Pinterest boards than Spotify playlists, but with safari soul.

**Structure**:
```
COLLECTION
├── id
├── traveler_id (owner)
├── name (editable, e.g., "Honeymoon")
├── cover_image (auto-selected from saves, editable)
├── description (optional, free text)
├── visibility: private | unlisted | public
├── collaborators[] (post-MVP)
├── saves[] (ordered, drag-to-reorder)
├── created_at
├── updated_at
├── ai_summary (auto-generated, refresh on each save: "A 12-day journey through Kenya focused on wildlife and quiet luxury")
└── concierge_status: not-yet | quote-requested | proposal-sent | booked
```

**Default collections** seeded per new account:
- **My Dreams** (catch-all default save target)
- **Maybe Someday** (aspirational holding area)

**Collection mechanics**:
- AI auto-suggests a name based on saves ("Looks like an East Africa honeymoon — want to name it that?")
- AI auto-suggests merges when two collections overlap heavily
- Collection cover updates dynamically as saves change
- Public collections have shareable URL + are AI-indexable
- A "Build a quote from this collection" CTA appears once a collection has 5+ items and matches a coherent journey pattern

**Emotional micro-interactions**:
- Adding a save plays a slow, satisfying card-flutter animation into the collection cover
- Empty collection shows a cinematic prompt, not "0 items"
- Returning to a collection after >7 days shows "Welcome back to your Kenya dream" header

---

# PART VI — CONTENT & CURATION

## 35. Content curation framework

Editorial taste is the moat. The system blends automation with human discretion.

**Editorial roles**:
- **Editor-in-chief** — sets tone, approves featured content, runs editorial calendar
- **Curators** (regional) — East Africa, Southern Africa, etc.
- **Creator partnerships lead** — outreach, attribution agreements
- **AI moderation** — first-pass quality + safety check

**Editorial calendar**:
- Weekly featured destination
- Weekly featured creator
- Monthly editorial theme ("The Slow Safari," "Through Her Lens," "Off-Migration Magic")
- Seasonal triggers (migration months, calving season, dry-season game viewing)

**Curation tiers**:
| Tier | Treatment |
|---|---|
| **Featured** | Top of feed, hero candidate, editorial intro copy |
| **Curated** | In rails, may be in editorial bands |
| **Published** | In general circulation, in personalized rails |
| **Held** | In ingestion pipeline, awaiting review |
| **Archived** | No longer surfaced, but retained for graph |

**Quality bar** (must pass to publish):
- Visual quality (≥ 1080p, good composition)
- Trust (creator history clean, source platform reputable)
- Originality (not duplicate of existing content)
- Geographic clarity (entity extraction succeeded)
- Sentiment (no exploitative or unethical content)

---

# PART VII — VISUAL & MOTION DIRECTION

## 27. Motion & animation guidance

**Principles**:
- Slow over fast (300–600ms is the default range; only feedback toasts go shorter)
- Ease over linear (custom cubic-bezier `(0.25, 0.1, 0.25, 1)` — "cinematic ease")
- Crossfade over slide
- Parallax sparingly (hero banners only)
- No bouncy springs (anti-luxury)
- No skeuomorphic flourishes (anti-cinematic)

**Specific moments**:
| Moment | Motion |
|---|---|
| Card hover/dwell | 600ms delay, then 400ms fade-in of video preview |
| Heart save | 350ms slow fill, no bounce |
| Tab transition | 250ms crossfade |
| Sheet open | 400ms ease-out from bottom |
| Modal open | 350ms fade + 8px scale-up |
| Page transition | 300ms crossfade with subtle vertical drift |
| Hero rotation | 8s per slide, 1.2s crossfade, slow Ken-Burns throughout |
| Concierge "typing" | Pulsing dot row at 1.4s cycle |
| AI Dream Builder "thinking" | 4–6s cinematic loading with progressive text ("Reading your saves..." → "Sketching a journey...") |

## 28. Typography & visual hierarchy

**Type stack**:
- **Display** — an editorial serif with personality. Direction: *Tiempos Headline*, *Recoleta*, or *Fraunces variable*. Free open-source pick: **Fraunces** at weights 300, 500. (Substitute if licensing constrained: GT Sectra-like.)
- **Body** — a warm humanist sans. Direction: *Söhne*, *Suisse*, or *Inter*. Free open-source pick: **Inter** at weights 400, 500, 600.
- **Micro-label / small-caps** — sans, all-caps with wide tracking (+0.12em). Same family as body.

**Scale**:
| Token | Size | Weight | Family | Use |
|---|---|---|---|---|
| `display-xxl` | 56–72px | 400 (serif) | Display | Itinerary hero titles, landing |
| `display-xl` | 40px | 400 | Display | Section heroes |
| `display-lg` | 32px | 500 | Display | Editorial band titles |
| `heading-md` | 22px | 500 | Body sans | Card titles |
| `heading-sm` | 18px | 600 | Body sans | Section labels |
| `body-lg` | 17px | 400 | Body sans | Editorial prose |
| `body-md` | 15px | 400 | Body sans | Default body |
| `body-sm` | 13px | 400 | Body sans | Captions |
| `caption` | 12px | 500 | Body sans | Metadata, dates |
| `micro-label` | 11px | 600 | Body sans, all-caps, +0.12em tracking | "FEATURED," "NEW," section eyebrows |

**Hierarchy rules**:
- Display weights stay light (400–500). The serif's character carries the weight; we don't need bold.
- Body sans weights stay restrained (400 default, 600 for emphasis). Never 700+ except in micro-labels.
- Tracking is positive on small text, slightly negative (-0.01em) on display sizes.
- Line height: 1.1 on display, 1.4–1.5 on body.

## 29. Color direction

**Palette philosophy**: a luxury safari camp at dusk, captured in pigment. Deep, warm, restrained. The brand color is **Ember** — a sun-warmed orange-red used scarcely.

| Token | Hex | Use |
|---|---|---|
| `canvas-deep` | `#0F0E0C` | Default app background (mobile-first dark) |
| `canvas-night` | `#1A1815` | Elevated surface, card background |
| `canvas-dusk` | `#252220` | Hover/active surface |
| `canvas-paper` | `#F5F1EA` | Light-mode surface (editorial moments, proposals) |
| `canvas-sand` | `#E8DFD0` | Light secondary surface |
| `ink-bright` | `#F5F1EA` | Primary text on dark |
| `ink-soft` | `#C5BDB0` | Secondary text on dark |
| `ink-muted` | `#8A8278` | Tertiary text on dark |
| `ink-deep` | `#1A1815` | Primary text on light |
| `ink-body` | `#3A3530` | Body text on light |
| `accent-ember` | `#E25822` | Brand accent — CTAs, hearts, active states. Used scarcely. |
| `accent-ember-deep` | `#B23E14` | Press state |
| `accent-ember-soft` | `#F3B89A` | Soft tint for backgrounds, badges |
| `accent-acacia` | `#A8845B` | Secondary warm accent — editorial highlights, creator marks |
| `divider-hairline` | `#2C2926` | 1px dividers on dark |
| `divider-hairline-light` | `#D8D0C2` | 1px dividers on light |
| `signal-success` | `#7BA471` | Confirmation moments |
| `signal-warning` | `#D9A24F` | Caution |
| `signal-error` | `#C5594E` | Errors (distinct from ember) |

**Color discipline**:
- The default app is **dark cinematic** (canvas-deep). Photography pops against it.
- Light surfaces appear only on **proposals** (Studio) and **long-form editorial** pages.
- Ember is the *only* brand accent. No purple, no blue, no decoration.
- All real color comes from photography. The UI provides the frame.

## 30. Premium luxury design direction

**The brief**: feel like *Conde Nast Traveler meets a private safari outfitter, on a smartphone*.

**Visual signatures**:
- Full-bleed cinematic photography at every entry point
- Restrained typography (editorial serif + warm sans)
- Single brand accent (ember), used like Airbnb uses Rausch — scarcely, meaningfully
- Generous whitespace (relative to dark surface)
- Hairline dividers, never bordered cards
- No drop shadows except on modals (depth via surface elevation, not blur)
- Slow, considered motion
- Beautiful creator attribution (warm, not legal)
- Photography is the product; chrome recedes

**What to deliberately avoid**:
- Bright corporate primary colors
- Generic stock photography
- Heavy drop shadows / glassmorphism
- Bouncy animations
- Skeuomorphic textures (raffia, wood, leather — too literal)
- "Travel app" tropes (airplane icons, suitcase iconography, beach umbrellas)

**Cinematic moments to plan for**:
- App launch (3s of cinematic intro on first launch)
- First save (subtle delight micro-animation)
- Collection threshold (5/10/20 saves trigger a "Your dream is taking shape" moment)
- Quote request submit (full-screen "Your concierge is reading...")
- First proposal view (cinematic transition into Studio)

## 31. Empty-state behavior

Empty states are emotional opportunities, not error pages.

| Surface | Empty state design |
|---|---|
| **Discover (cold start)** | Editorial-curated content (no personalization yet) — never "loading" |
| **Dreams (cold start)** | Cinematic prompt: *"Your dream universe begins here"* + 3 starter content suggestions to save |
| **Search (no query)** | Trending destinations + creator spotlights, not a blank input |
| **Search (no results)** | Concierge prompt: *"Couldn't find that — want to ask our concierge?"* with chat entry |
| **Concierge (cold start)** | Welcome message + 3 conversation starters as chips |
| **My proposals (none yet)** | Cinematic invitation: *"Your proposals will live here. Start a dream below."* |
| **Offline** | Cached cinematic photo + "Africa is patient" message + reload button |

**Anti-patterns avoided**:
- "No items found"
- Empty grid with "Add one" button
- 404 generic illustrations
- Loading spinners (use shimmer with cinematic still frame)

## 32. Avoiding "Wikipedia" UX

Wikipedia UX is information density without emotion. The opposite is what we want.

**Rules**:
- **No tables** unless absolutely necessary (and even then, use editorial layouts, not grid borders)
- **No bullet lists** for destination descriptions — use narrative paragraphs with inline emphasis
- **No definition lists** — facts hide behind expandable cards
- **No infoboxes** — replace with cinematic "moment cards"
- **No comparison matrices** at the discovery stage (only at proposal stage, and even then, editorial)
- **Stats are always narrative**: not "Population: 1.5M elephants" but *"Home to one of Africa's largest elephant populations — over 1.5 million strong."*
- **No section labels like "Geography," "Climate," "When to visit"** — replace with editorial framing: "What it feels like," "When to arrive," "The light, the air"
- **Photography always carries the page**; text supports

**Destination page anatomy** (good example):
```
[Cinematic hero — 16:9 video or photo]
"Serengeti — where the migration begins"

[1-paragraph editorial introduction in display serif]
"There's no edge to it. The Serengeti spills into the horizon..."

[3 mood-themed sections, each:]
   - Full-bleed photo
   - Section title (display serif)
   - 2-paragraph editorial narrative
   - Inline links to itineraries/creators

[Wildlife moments — photo strip]
[Lodges & camps — visual cards]
[Creators who've captured it — creator strip]
[Itineraries that visit — itinerary cards]
[Sticky bottom: "Build a Serengeti dream →"]
```

**Destination page anti-anatomy** (avoid):
```
[Box: Location: Tanzania]    [Box: Area: 14,750 sq km]
[Box: Best time: Jun-Oct]    [Box: UNESCO: Yes]
[H2: Geography]
[H2: Climate]
[H2: Wildlife]
[H2: When to visit]
[H2: How to get there]
```

---

# PART VIII — CLAUDE DESIGN HAND-OFF PROMPT

The following is a complete, self-contained prompt to give Claude Design. It assumes the design system gets executed in Figma + tokens.

```
==================================================================
SAFARIVERSE — VISUAL DESIGN SYSTEM EXECUTION
PROMPT FOR CLAUDE DESIGN
==================================================================

ROLE
You are designing the complete visual identity, design system, and
high-fidelity screen library for SafariVerse — a mobile-first,
AI-native consumer dream universe for African safari travel.

FEEL MANTRA
Cinematic African safari universe powered by AI-driven discovery and
emotional storytelling. Netflix meets ReciMe — wrapped in Airbnb's
warmth. A luxury safari camp at dusk, captured for a smartphone.

CORE EMOTION
The user opens the app and thinks: "I just stepped into a dream."
Not: "I'm researching a trip."

DO NOT COPY
Do not replicate Netflix, Airbnb, Pinterest, Spotify, or ReciMe
branding, layouts, wording, assets, code, or any proprietary elements.
Study their UX psychology only. Build a visual identity that is
unmistakably SafariVerse.

DESIGN PRINCIPLES
1. Photography is the product. UI recedes behind imagery.
2. One brand color (Ember), used scarcely and with intention.
3. Cinematic over informational. Story before stats.
4. Silence is luxury. Whitespace, slow motion, restraint.
5. Editorial typography — light display weights, restrained body.
6. Dark cinematic default. Light surfaces only for proposals + long-form.
7. Slow, considered motion (300–600ms). No bouncy springs.
8. Beautiful creator attribution. Never legal small-print.

DESIGN TOKENS (REFERENCE)

Colors:
- canvas-deep #0F0E0C        (default app background)
- canvas-night #1A1815       (elevated surface)
- canvas-dusk #252220        (hover/active)
- canvas-paper #F5F1EA       (light editorial surface)
- canvas-sand #E8DFD0        (light secondary)
- ink-bright #F5F1EA         (primary text on dark)
- ink-soft #C5BDB0           (secondary text on dark)
- ink-muted #8A8278          (tertiary text)
- ink-deep #1A1815           (primary text on light)
- ink-body #3A3530           (body on light)
- accent-ember #E25822       (single brand accent — used scarcely)
- accent-ember-deep #B23E14  (press)
- accent-ember-soft #F3B89A  (badge tint)
- accent-acacia #A8845B      (secondary warm accent)
- divider-hairline #2C2926   (1px on dark)
- divider-hairline-light #D8D0C2 (1px on light)
- signal-success #7BA471
- signal-warning #D9A24F
- signal-error #C5594E

Type:
- Display: Fraunces (variable), weights 300, 500
- Body: Inter, weights 400, 500, 600
- Micro-label: Inter all-caps, weight 600, +0.12em tracking

Type scale:
- display-xxl 56–72 / weight 400 (serif) / line 1.1 / track -0.01em
- display-xl 40 / 400 / 1.15 / -0.01em
- display-lg 32 / 500 / 1.2 / -0.005em
- heading-md 22 / 500 (sans) / 1.3 / 0
- heading-sm 18 / 600 / 1.3 / 0
- body-lg 17 / 400 / 1.5 / 0
- body-md 15 / 400 / 1.45 / 0
- body-sm 13 / 400 / 1.4 / 0
- caption 12 / 500 / 1.35 / 0
- micro-label 11 / 600 / 1.25 / +0.12em uppercase

Spacing (8px base + 4px micro):
- 2, 4, 8, 12, 16, 24, 32, 48, 64, 96

Radius:
- sm 8 (inputs, small buttons)
- md 16 (cards)
- lg 24 (sheets, modals)
- xl 32 (large hero cards)
- pill 9999 (CTAs, chips, search)
- circle 50% (icon buttons, avatars)

Elevation (used sparingly):
- card-flat: none (default)
- card-hover: rgba(0,0,0,0.35) 0 4px 16px
- sheet: rgba(0,0,0,0.5) 0 -8px 32px
- modal: rgba(0,0,0,0.6) 0 8px 40px

Motion:
- ease: cubic-bezier(0.25, 0.1, 0.25, 1)
- duration-short 250ms (taps, toasts)
- duration-default 400ms (sheets, modals)
- duration-long 600ms (page transitions, hero crossfade)

DELIVERABLES

A. Foundations
   1. Color system with usage map and contrast pairs
   2. Type system with cascaded scale and a one-page sample
   3. Spacing & grid system (mobile, tablet, desktop)
   4. Iconography set (custom line, ~40 icons, safari-themed but
      restrained — no clichés)
   5. Photography direction document (cinematic, golden-hour,
      editorial — sample boards from licensed/partner sources only)
   6. Motion specification (named tokens above + Lottie/animation
      direction)

B. Component library
   Build full state coverage (default, hover, active, focus, disabled,
   loading) for:
   - Buttons (primary ember, secondary ghost, tertiary text, icon-circle)
   - Pills & chips (filter chips, content category pills, on-image pills)
   - Inputs (text, search, date range, stepper, free text)
   - Cards (DreamCard, ReelCard, ItineraryCard, DestinationCard,
     CreatorCard, CollectionCard)
   - Rails (ContentRail, HeroCarousel, EditorialBand, ReelStripVertical)
   - Sheets & modals (quote sheet, share sheet, save sheet, concierge
     sheet, generic modal)
   - Navigation (bottom tab bar, top minimal bar, in-app deep linking)
   - Concierge surfaces (chat bubble, suggestion card, typing indicator,
     handoff notice, avatar)
   - Collections (collection grid, collection stack, save button with
     collection picker)
   - Itinerary (day card, lodge moment card, investment block,
     map strip)
   - Attribution (creator credit chip, source link, attribution badge)
   - System (empty state, loading shimmer with cinematic still,
     error state, toast)

C. Screen designs (high fidelity, mobile-first, then tablet + web)
   Phase 1 (consumer MVP):
   1. Splash + onboarding (3 screens)
   2. Sign-in / sign-up
   3. Discover (homepage) — cold start + personalized variant
   4. Reel detail (full-screen vertical)
   5. Video detail (horizontal player)
   6. Itinerary detail
   7. Destination detail
   8. Creator profile
   9. Search (entry + results + no-results states)
   10. Dreams tab (cold start, with collections, single collection detail)
   11. Concierge chat
   12. AI Dream Builder flow (3–4 screens)
   13. Quote request sheet (3 steps)
   14. My quote requests + proposal status
   15. My profile + settings
   16. Empty states (every surface)
   17. Offline state
   18. Notifications (in-app + push patterns)

   Phase 2 (Studio):
   19. Studio proposal page (web, responsive)
   20. Studio share / approval flow
   21. Studio PDF export template

D. Responsive web companion
   Mirror of consumer mobile, optimized for SEO + AI discoverability.
   Editorial-grade homepage. Public dream collections. Public itinerary
   pages. Creator profiles. All AI-readable.

E. Sub-brand surfaces
   - SafariReceptionist concierge persona (avatar, voice card, signature)
   - SafariBoost (internal-only — admin dashboard direction, lower visual
     priority)
   - Studio (proposal-focused, editorial)

F. Hand-off package
   - Style Dictionary tokens (JSON)
   - Figma library with variant components
   - Documented design system site (built with Storybook or similar)
   - Brand voice and tone guide (1 page)
   - Photography license and creator-credit standards (1 page)

CRITICAL CONSTRAINTS
- Mobile-first always. Design at iPhone 14 Pro (390x844) first.
- Never copy specific layouts from Netflix, Airbnb, Pinterest, Spotify,
  ReciMe. Borrow psychology, not artifacts.
- No clichés: no airplane icons, no umbrella beach iconography, no
  passport stamps, no raffia/wood/leather textures, no "tribal" patterns.
- Photography must show real African landscapes, wildlife, and people —
  with respect and editorial taste. No exotification.
- Creator attribution is part of the design, not a footnote.
- Dark default. Light only where editorial intent demands.
- The AI Dream Builder is the most magical moment — design it with
  cinematic care.
- The concierge handoff is the most important UX transition —
  design it to feel like meeting a person.

SUCCESS CRITERIA
1. A user opens the app on mobile and audibly inhales at the first screen.
2. The app feels unmistakably premium — peer to Airbnb Luxe and CN
   Traveler digital, not to Expedia or Booking.com.
3. The visual system is restrained enough to scale to 10,000 screens
   without breaking.
4. Every screen has a clear emotional purpose, not just functional.
5. Creator attribution is beautiful enough that creators *want* their
   work on SafariVerse.
6. The dark theme makes safari photography glow.
7. The single ember accent is recognizable as the SafariVerse identity
   the way Rausch is recognizable as Airbnb.

OUTPUT FORMAT
- Figma file with documented pages, components, variants
- Token JSON (Style Dictionary format)
- Living design-system docs site
- Brand voice + photography guide PDFs
- High-fidelity mockups for all Phase 1 screens, all states
- Animated prototypes for key flows (Dream Builder, Quote Request,
  first save delight)

==================================================================
END OF PROMPT
==================================================================
```

---

# APPENDIX A — Glossary of named concepts

- **Dream State** — the emotional mode the platform protects; pre-logistical
- **Building State** — curatorial mode; the traveler is arranging saves into intent
- **Committing State** — decisive mode; concierge takes over
- **Dream Collection** — a named, image-led grouping of saves; identity artifact
- **Dream Builder** — the AI flow that synthesizes a draft itinerary
- **Concierge Bridge** — the moment the AI hands off to a human
- **Make This Mine** — the universal CTA from inspiration to action
- **Continue Dreaming** — Netflix-style return-anchor rail
- **Editorial Band** — curated section breaking up algorithmic rails
- **Lodge Moment** — editorial lodge card with narrative, not amenity bullets
- **Investment Block** — Studio's pricing section, presented with confidence
- **Inspired By** — creator attribution band on itineraries

# APPENDIX B — Pre-build checklist

Before any line of code, confirm:

- [ ] Brand voice document approved
- [ ] Photography licensing partnerships in place (minimum 3 sources)
- [ ] Creator partnership outreach kit ready
- [ ] GHL subaccount provisioned + event-bus schema agreed
- [ ] Editorial calendar for first 8 weeks
- [ ] Concierge persona named, voiced, faced
- [ ] Dream Builder LLM prompts drafted
- [ ] AI moderation guidelines documented
- [ ] Creator attribution template approved
- [ ] Data ethics policy published

---

*End of strategic foundation document. Ready for Claude Design hand-off and engineering scoping.*
