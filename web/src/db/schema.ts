/**
 * SafariVerse — Drizzle schema (MVP Week 1)
 *
 * Covers the ingestion-pipeline core: sources, content, creators, editorial state.
 * Editions, destinations, lodges, travelers, collections, etc. are defined in
 * `docs/04-database-schema.md` and will be added in subsequent weeks.
 *
 * Vector + PostGIS columns are commented out until pgvector + PostGIS extensions
 * are enabled in the Railway Postgres instance (Week 2).
 */

import {
  pgTable,
  uuid,
  text,
  integer,
  real,
  boolean,
  timestamp,
  jsonb,
  pgEnum,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

/* ─────────────────  ENUMS  ───────────────── */

export const sourceTypeEnum = pgEnum("source_type", [
  "rss",
  "youtube",
  "vimeo",
  "instagram",
  "tiktok",
  "manual",
  "partner_webhook",
  "google_places",
  "ebird",
  "inaturalist",
]);

export const contentTypeEnum = pgEnum("content_type", [
  "article",
  "blog",
  "reel",
  "video",
  "photo_essay",
  "ai_summary",
  "itinerary",
]);

export const editorialTierEnum = pgEnum("editorial_tier", [
  "ingested", // raw, untouched
  "enriched", // AI-enriched, awaiting human review
  "held", // editor wants to revisit
  "rejected", // editor rejected
  "published", // live in feed
  "curated", // mid-tier editorial weight
  "featured", // top-tier editorial weight
]);

export const partnershipStatusEnum = pgEnum("partnership_status", [
  "none",
  "opt_in",
  "mou_signed",
  "revenue_share",
]);

/* ─────────────────  SOURCES  ───────────────── */

export const sources = pgTable(
  "sources",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    type: sourceTypeEnum("type").notNull(),
    url: text("url"),
    identifier: text("identifier"), // channel ID, handle, etc.
    trustScore: real("trust_score").default(0.6).notNull(),
    active: boolean("active").default(true).notNull(),
    cadenceHours: integer("cadence_hours").default(6).notNull(),
    lastPolledAt: timestamp("last_polled_at", { withTimezone: true }),
    config: jsonb("config").default({}),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`now()`)
      .notNull(),
  },
  (t) => ({
    activeIdx: index("sources_active_idx").on(t.active),
    typeIdx: index("sources_type_idx").on(t.type),
  })
);

/* ─────────────────  CREATORS  ───────────────── */

export const creators = pgTable(
  "creators",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    displayName: text("display_name").notNull(),
    slug: text("slug").notNull(),
    bylinePhoto: text("byline_photo"),
    bio: text("bio"),
    specialties: text("specialties").array(),
    baseLocation: text("base_location"),
    platforms: jsonb("platforms").default([]), // [{platform, handle, url}]
    partnershipStatus: partnershipStatusEnum("partnership_status")
      .default("none")
      .notNull(),
    contentCount: integer("content_count").default(0).notNull(),
    inspiredEditionsCount: integer("inspired_editions_count")
      .default(0)
      .notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`now()`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .default(sql`now()`)
      .notNull(),
  },
  (t) => ({
    slugIdx: uniqueIndex("creators_slug_idx").on(t.slug),
  })
);

/* ─────────────────  CONTENT  ───────────────── */

export const content = pgTable(
  "content",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    // provenance
    sourceId: uuid("source_id").references(() => sources.id),
    sourceUrl: text("source_url").notNull(),
    sourcePlatform: text("source_platform"),
    sourcePublishedAt: timestamp("source_published_at", {
      withTimezone: true,
    }),

    type: contentTypeEnum("type").notNull(),

    // raw
    rawTitle: text("raw_title"),
    rawHtml: text("raw_html"),
    rawHash: text("raw_hash").notNull(),
    language: text("language").default("en").notNull(),

    // creator
    creatorId: uuid("creator_id").references(() => creators.id),

    // enriched (AI output, populated after enrichment worker runs)
    title: text("title"),
    summary: text("summary"),
    heroImage: text("hero_image"),
    previewVideo: text("preview_video"),
    durationSeconds: integer("duration_seconds"),
    // embedding: vector("embedding", { dimensions: 1024 }), // pgvector — Week 2

    // classification
    tags: text("tags").array(),
    tripStyleTags: text("trip_style_tags").array(),
    seasonInference: text("season_inference"),
    countryCode: text("country_code"),

    // attribution display (de-normalized from creator for fast renders)
    attributionRole: text("attribution_role"),
    attributionName: text("attribution_name"),
    attributionPlatform: text("attribution_platform"),

    // editorial
    aiQualityScore: real("ai_quality_score"),
    aiSafetyFlags: text("ai_safety_flags").array(),
    editorialTier: editorialTierEnum("editorial_tier")
      .default("ingested")
      .notNull(),
    editorNotes: text("editor_notes"),
    approvedBy: uuid("approved_by"), // → travelers(id) when travelers table lands
    approvedAt: timestamp("approved_at", { withTimezone: true }),
    publishedAt: timestamp("published_at", { withTimezone: true }),

    // metrics
    savedCount: integer("saved_count").default(0).notNull(),
    shareCount: integer("share_count").default(0).notNull(),
    dwellAvgMs: integer("dwell_avg_ms").default(0).notNull(),
    replayCount: integer("replay_count").default(0).notNull(),

    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`now()`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .default(sql`now()`)
      .notNull(),
  },
  (t) => ({
    rawHashIdx: uniqueIndex("content_raw_hash_idx").on(t.rawHash),
    sourceUrlIdx: index("content_source_url_idx").on(t.sourceUrl),
    tierIdx: index("content_tier_idx").on(t.editorialTier),
    publishedAtIdx: index("content_published_at_idx").on(t.publishedAt),
    creatorIdx: index("content_creator_idx").on(t.creatorId),
  })
);

/* ─────────────────  TYPES  ───────────────── */

export type Source = typeof sources.$inferSelect;
export type NewSource = typeof sources.$inferInsert;

export type Creator = typeof creators.$inferSelect;
export type NewCreator = typeof creators.$inferInsert;

export type Content = typeof content.$inferSelect;
export type NewContent = typeof content.$inferInsert;
