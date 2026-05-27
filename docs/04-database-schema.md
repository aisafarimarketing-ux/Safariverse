# SafariVerse — Database Schema (MVP)

**Companion to**: `docs/03-content-ingestion.md`
**ORM**: Drizzle (TypeScript)
**DB**: Railway Postgres (with `pgvector` + `PostGIS` extensions enabled in Week 2)

This is the Phase 1 schema. It supports content ingestion, editorial workflow, Editions, creators, lodges, and the traveler graph. Schema is in `web/src/db/schema.ts` once the scaffold lands.

---

## Tables (overview)

```
sources       ← where we pull content from (RSS feeds, YouTube channels, etc.)
content       ← raw + enriched content items
creators      ← attributed photographers/writers/videographers
destinations  ← Africa entity graph (countries, parks, regions)
lodges        ← hospitality properties
species       ← wildlife taxa
editions      ← itineraries (3-mode rendering)
edition_days  ← day-by-day records inside an Edition
edition_content    ← join: content surfaced in an edition (per day or top-level)
edition_lodges     ← join: lodges featured in an Edition
edition_creators   ← join: creators inspiring an Edition
travelers     ← user accounts
collections   ← Dream collections
saves         ← join: traveler ↔ content/edition
events        ← behavior event log
```

---

## Schema

### sources
The catalog of where we ingest from.

```ts
sources {
  id            uuid primary key
  name          text not null              // "Africa Geographic"
  type          enum (rss, youtube, vimeo, instagram, tiktok, manual,
                     partner_webhook, google_places, ebird, inaturalist)
  url           text                       // RSS URL or channel handle
  identifier    text                       // channel ID / handle / API key ref
  trust_score   float default 0.6          // 0..1; editorial weight
  active        boolean default true
  cadence_hours int default 6              // poll frequency for RSS/API
  last_polled_at timestamptz
  config        jsonb                      // per-source overrides
  created_at    timestamptz default now()
}
```

### content
Every ingested item — article, reel, video, blog, photo essay.

```ts
content {
  id            uuid primary key
  source_id     uuid → sources(id)
  source_url    text not null              // original URL (immutable)
  source_platform text                     // "instagram", "youtube", "rss"
  source_published_at timestamptz          // creator's original publish date

  type          enum (article, blog, reel, video, photo_essay, ai_summary, itinerary)

  // raw
  raw_title     text
  raw_html      text                       // cleaned source HTML/transcript
  raw_hash      text unique                // dedupe key
  language      text default 'en'

  // creator
  creator_id    uuid → creators(id)

  // enriched (AI output)
  title         text                       // SafariVerse-styled title
  summary       text                       // 200-400w original editorial summary
  hero_image    text                       // CDN URL
  preview_video text                       // embed URL if applicable
  duration_seconds int
  embedding     vector(1024)               // for vector search

  // classification
  tags          text[]                     // free-form tags
  trip_style_tags text[]                   // ['luxury', 'photographic', 'honeymoon']
  season_inference text                    // 'dry-season-migration', 'green-season', 'shoulder', null
  country_code  text                       // 'KE', 'TZ', 'BW'

  // attribution display
  attribution_role text                    // 'Photography', 'Field Journal'
  attribution_name text
  attribution_platform text

  // editorial
  ai_quality_score float                   // 0..1
  ai_safety_flags  text[]
  editorial_tier  enum (featured, curated, published, held, rejected, ingested, enriched)
                  default 'ingested'
  editor_notes    text
  approved_by     uuid → travelers(id)
  approved_at     timestamptz
  published_at    timestamptz

  // metrics
  saved_count     int default 0
  share_count     int default 0
  dwell_avg_ms    int default 0
  replay_count    int default 0

  created_at    timestamptz default now()
  updated_at    timestamptz default now()
}
```

### creators
First-class entities — never small-print attribution.

```ts
creators {
  id            uuid primary key
  display_name  text not null
  slug          text unique
  byline_photo  text
  bio           text
  specialties   text[]                     // ['wildlife photography', 'storytelling']
  base_location text                       // 'Nairobi'

  // platforms (one creator can be on many)
  platforms     jsonb                      // [{platform: 'instagram', handle, url}, ...]

  // partnership status
  partnership_status enum (none, opt_in, mou_signed, revenue_share) default 'none'

  // metrics
  content_count int default 0
  inspired_editions_count int default 0

  created_at    timestamptz default now()
  updated_at    timestamptz default now()
}
```

### destinations
The semantic graph of Africa as a travel surface.

```ts
destinations {
  id            uuid primary key
  name          text not null              // "Maasai Mara"
  slug          text unique
  type          enum (country, region, park, conservancy, beach, town, hill)
  parent_id     uuid → destinations(id)    // self-ref hierarchy

  country_code  text                       // 'KE'
  centroid      geography(point)           // PostGIS for queries
  bbox          geography(polygon)

  hero_image    text
  intro         text                       // editorial introduction
  description   text                       // longer editorial body

  // searchable
  embedding     vector(1024)
  tags          text[]                     // ['wildlife', 'photographic', 'family-friendly']

  // metrics
  trending_score float default 0           // computed; surfaces in feed weight

  created_at    timestamptz default now()
}
```

### lodges
Hospitality properties.

```ts
lodges {
  id            uuid primary key
  name          text not null              // "Cottar's 1920s Camp"
  slug          text unique
  destination_id uuid → destinations(id)
  operator_id   uuid → operators(id) (nullable)

  address       text
  centroid      geography(point)
  contact       jsonb                      // {phone, email, website}

  hero_image    text
  gallery       text[]
  intro         text                       // editorial intro
  description   text

  // Google Places sync
  google_place_id text
  google_rating  float
  google_review_count int
  google_synced_at timestamptz

  // accreditations
  accreditations jsonb                     // [{type: 'CN_Readers_Choice', year: 2024, link}, ...]

  // editorial
  tier          enum (featured, curated, published, hidden) default 'published'

  embedding     vector(1024)

  created_at    timestamptz default now()
  updated_at    timestamptz default now()
}
```

### species
For wildlife-themed discovery.

```ts
species {
  id            uuid primary key
  common_name   text                       // "African elephant"
  scientific_name text
  slug          text unique
  hero_image    text
  description   text                       // short editorial
  iucn_status   text                       // 'EN', 'VU', etc.

  // seasonality
  peak_seasons  jsonb                      // [{region: 'Mara', months: [7,8,9,10]}]

  embedding     vector(1024)
  created_at    timestamptz default now()
}
```

### editions
Itineraries — the adaptive media objects from doc 02.

```ts
editions {
  id            uuid primary key
  slug          text unique                // 'honeymoon-kenya-12d'
  number        text                       // 'Edition 01'
  label         text                       // 'The Honeymoon Edition'
  title         text                       // 'Honeymoon in Kenya'
  meta          text                       // 'twelve days · golden hour'
  year          int
  country_code  text

  hero_image    text
  hero_caption  text
  hero_credit   text

  prelude_quote text
  prelude_body  text[]                     // paragraphs

  // ownership
  edited_by_id  uuid → travelers(id)       // editor
  organized_by  text                       // 'SafariVerse Studio'
  operator_id   uuid → operators(id)       // partner operator if any

  // editorial state
  status        enum (draft, in_review, published, archived) default 'draft'
  tier          enum (featured, curated, published) default 'published'

  // discoverability
  tags          text[]
  trip_style    text[]                     // ['honeymoon', 'photographic']
  duration_days int
  embedding     vector(1024)

  // metrics
  saved_count   int default 0
  share_count   int default 0
  quote_request_count int default 0

  created_at    timestamptz default now()
  updated_at    timestamptz default now()
  published_at  timestamptz
}
```

### edition_days
Day-by-day records inside an Edition.

```ts
edition_days {
  id            uuid primary key
  edition_id    uuid → editions(id) on delete cascade
  day_number    int not null               // 1, 2, ... (use integer; UI formats "01")
  title         text                       // "Nairobi"
  subtitle      text                       // "to the foot of the mountain"

  photo         text
  photo_caption text
  photo_credit  text
  creator_id    uuid → creators(id)        // primary credit

  narrative     text[]                     // paragraph array

  lodge_id      uuid → lodges(id)
  destination_id uuid → destinations(id)

  // attribution
  attribution_role text                    // 'Photography'
  attribution_platform text                // 'Instagram'

  // inspired content (single key reel/blog per day, plus the join table below)
  inspired_reel_content_id uuid → content(id)
  inspired_blog_content_id uuid → content(id)

  // reviews to show in Sources & Attribution panel
  reviews_cache jsonb                      // {platform, score, count} array — cached from Google/TripAdvisor

  created_at    timestamptz default now()
}
```

### edition_content (join)
Any content item can be surfaced inside an Edition (day-scoped or edition-wide).

```ts
edition_content {
  edition_id     uuid → editions(id) on delete cascade
  content_id     uuid → content(id) on delete cascade
  edition_day_id uuid → edition_days(id) (nullable — null = edition-level)
  role           enum (hero, inspired_by, also_referenced, reel, blog, photo)
  order_index    int default 0

  primary key (edition_id, content_id, role)
}
```

### edition_lodges (join)
```ts
edition_lodges {
  edition_id  uuid → editions(id)
  lodge_id    uuid → lodges(id)
  order_index int default 0
  primary key (edition_id, lodge_id)
}
```

### edition_creators (join)
```ts
edition_creators {
  edition_id  uuid → editions(id)
  creator_id  uuid → creators(id)
  contribution text                        // 'lewa photographs and reel'
  order_index int default 0
  primary key (edition_id, creator_id)
}
```

### operators
Tour operator partners.

```ts
operators {
  id              uuid primary key
  name            text not null
  slug            text unique
  logo_url        text
  intro           text
  partnership_tier enum (preferred, partner, listed) default 'listed'
  contact         jsonb
  ghl_subaccount_id text                   // for SafariBoost routing
  created_at      timestamptz default now()
}
```

### travelers
User accounts (and the traveler graph).

```ts
travelers {
  id              uuid primary key
  email           text unique
  display_name    text
  avatar_url      text
  locale          text default 'en'
  market          text                     // 'US', 'GB', 'KE', etc.

  // role
  role            enum (traveler, editor, curator, admin) default 'traveler'

  // preference graph (inferred, weighted)
  preferences     jsonb default '{}'
  /*
   {
     safari_style: { honeymoon: 0.8, photographic: 0.6, ... },
     country_affinity: { KE: 0.9, TZ: 0.7, BW: 0.3 },
     wildlife_interest: { big_cats: 0.8, primates: 0.4 },
     budget_signal: 'premium',
     pace: 'slow',
     companion_context: 'couple',
     season_sensitivity: 'flexible'
   }
  */

  // lifecycle
  stage           enum (dreaming, building, committing, traveling, post_trip) default 'dreaming'
  score           int default 0
  last_engagement_at timestamptz

  // SafariBoost / GHL
  ghl_contact_id  text

  created_at      timestamptz default now()
  updated_at      timestamptz default now()
}
```

### collections
Dream collections.

```ts
collections {
  id            uuid primary key
  traveler_id   uuid → travelers(id)
  name          text not null
  slug          text                       // unique within traveler
  description   text
  cover_image   text                       // auto-selected from saves; overridable
  visibility    enum (private, unlisted, public) default 'private'

  // auto-generated
  ai_summary    text                       // refreshed on save change

  // metrics
  save_count    int default 0
  share_count   int default 0

  created_at    timestamptz default now()
  updated_at    timestamptz default now()
}
```

### saves (join)
A traveler saving content or an edition.

```ts
saves {
  id            uuid primary key
  traveler_id   uuid → travelers(id) on delete cascade
  collection_id uuid → collections(id) on delete cascade
  content_id    uuid → content(id)         // nullable; either content or edition
  edition_id    uuid → editions(id)        // nullable
  saved_at      timestamptz default now()

  check (content_id is not null or edition_id is not null)
  unique (traveler_id, collection_id, content_id, edition_id)
}
```

### events
Behavior event log — feeds recommendations + GHL.

```ts
events {
  id            uuid primary key
  traveler_id   uuid → travelers(id) on delete cascade
  type          text not null              // 'content.viewed', 'content.saved', 'edition.opened', 'quote.requested', ...
  target_type   text                       // 'content', 'edition', 'collection', 'lodge'
  target_id     uuid
  metadata      jsonb default '{}'         // dwell_ms, source, query, etc.
  occurred_at   timestamptz default now()
}

-- index: (traveler_id, occurred_at desc)
-- index: (type, occurred_at desc)
-- index brin: (occurred_at)
```

### quote_requests
Routed into GHL pipeline.

```ts
quote_requests {
  id              uuid primary key
  traveler_id     uuid → travelers(id)
  edition_id      uuid → editions(id) (nullable)
  collection_id   uuid → collections(id) (nullable)

  date_window     daterange
  travelers_adults int
  travelers_kids   int
  kids_ages       int[]
  budget_signal   enum (comfort, premium, ultra)
  special_notes   text

  // GHL routing
  ghl_opportunity_id text
  ghl_pipeline_stage text default 'Dream-Stage'

  status          enum (open, assigned, proposal_sent, won, lost) default 'open'

  created_at      timestamptz default now()
  updated_at      timestamptz default now()
}
```

---

## Vector search indexes

Postgres `pgvector` extension. HNSW indexes on:

```
content.embedding (1024d)
destinations.embedding
lodges.embedding
species.embedding
editions.embedding
```

Similarity queries used for: recommendations, Dream Builder context retrieval, semantic search, concierge memory recall.

---

## Geospatial

`PostGIS` extension for:
- `destinations.centroid` + `destinations.bbox`
- `lodges.centroid`

Queries: "lodges within 80km of the Mara River" for route construction.

---

## Migrations

Each table migrates separately. Drizzle generates SQL; we hand-tune for indexes. Sequence:

1. Extensions: `vector`, `postgis`
2. Enums + tables in dependency order (sources → creators → destinations → lodges → species → editions → edition_days → joins → travelers → collections → saves → events → quote_requests → operators)
3. Indexes
4. Seed data: 5 sources, 3 destinations, 2 lodges, 1 sample edition (for dev)

---

## What's *not* in MVP schema (deferred)

| Future | When |
|---|---|
| Multi-language content (translations table) | Phase 2 |
| Operator self-service portal entities | Phase 2 |
| Booking line items + payments | Phase 3 |
| Loyalty / membership tier | Phase 3 |
| Creator revenue-share ledger | Phase 3 |
| Wildlife sighting real-time data | Phase 2 |
| Audit log table (we'll use events for now) | Post-MVP if needed |

---

*End. Foundation for ingestion + Editions + traveler graph. Drizzle implementation lands in `web/src/db/schema.ts`.*
