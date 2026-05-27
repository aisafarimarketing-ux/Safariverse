/**
 * Seed sources — the initial 20 hand-picked feeds we ingest from at MVP launch.
 *
 * Run with:  npm run db:seed-sources
 *
 * Edit this file freely. Adding a source = adding a row. The poller picks up
 * `active: true` rows on its next tick.
 *
 * Trust score guide (0..1):
 *   0.9+ = tourism boards, official institutions
 *   0.8  = premium magazines (Conde Nast, T+L, AFAR)
 *   0.7  = established travel publications + named photographers
 *   0.6  = blogs, partner content (default)
 *   0.5  = experimental, new sources
 *   <0.5 = manual review every item
 */

import type { NewSource } from "./schema";

export const seedSources: NewSource[] = [
  /* ─────── Africa-focused editorial ─────── */
  {
    name: "Africa Geographic",
    type: "rss",
    url: "https://africageographic.com/feed/",
    trustScore: 0.85,
    cadenceHours: 4,
  },
  {
    name: "Travel Africa Magazine",
    type: "rss",
    url: "https://travelafricamag.com/feed/",
    trustScore: 0.8,
    cadenceHours: 6,
  },
  {
    name: "SafariBookings Blog",
    type: "rss",
    url: "https://www.safaribookings.com/blog/feed/",
    trustScore: 0.7,
    cadenceHours: 6,
  },

  /* ─────── Premium global travel ─────── */
  {
    name: "AFAR",
    type: "rss",
    url: "https://www.afar.com/rss",
    trustScore: 0.85,
    cadenceHours: 6,
  },
  {
    name: "Travel + Leisure",
    type: "rss",
    url: "https://www.travelandleisure.com/feed.rss",
    trustScore: 0.85,
    cadenceHours: 6,
  },
  {
    name: "Conde Nast Traveler",
    type: "rss",
    url: "https://www.cntraveler.com/feed/rss",
    trustScore: 0.9,
    cadenceHours: 6,
  },
  {
    name: "Outside",
    type: "rss",
    url: "https://www.outsideonline.com/rss.xml",
    trustScore: 0.75,
    cadenceHours: 8,
  },
  {
    name: "Atlas Obscura",
    type: "rss",
    url: "https://www.atlasobscura.com/feeds/latest",
    trustScore: 0.75,
    cadenceHours: 8,
  },

  /* ─────── Official tourism boards (highest trust, can auto-promote) ─────── */
  {
    name: "Magical Kenya (Kenya Tourism Board)",
    type: "rss",
    url: "https://magicalkenya.com/news/feed/",
    trustScore: 0.95,
    cadenceHours: 8,
    config: { autoPromote: true },
  },
  {
    name: "Tanzania Tourist Board",
    type: "rss",
    url: "https://www.tanzaniatourism.go.tz/feed",
    trustScore: 0.95,
    cadenceHours: 8,
    config: { autoPromote: true },
  },
  {
    name: "Botswana Tourism Organisation",
    type: "rss",
    url: "https://www.botswanatourism.co.bw/feed/",
    trustScore: 0.95,
    cadenceHours: 12,
    config: { autoPromote: true },
  },
  {
    name: "Rwanda Development Board — Tourism",
    type: "rss",
    url: "https://www.visitrwanda.com/feed/",
    trustScore: 0.95,
    cadenceHours: 12,
    config: { autoPromote: true },
  },

  /* ─────── Operator + conservation publications ─────── */
  {
    name: "andBeyond Journal",
    type: "rss",
    url: "https://www.andbeyond.com/feed/",
    trustScore: 0.85,
    cadenceHours: 12,
  },
  {
    name: "Wilderness Safaris Journal",
    type: "rss",
    url: "https://journal.wildernessdestinations.com/feed",
    trustScore: 0.85,
    cadenceHours: 12,
  },
  {
    name: "Asilia Africa Stories",
    type: "rss",
    url: "https://www.asiliaafrica.com/feed/",
    trustScore: 0.8,
    cadenceHours: 12,
  },
  {
    name: "WWF Africa News",
    type: "rss",
    url: "https://www.worldwildlife.org/feeds/news",
    trustScore: 0.85,
    cadenceHours: 24,
  },

  /* ─────── Independent writers + bloggers ─────── */
  {
    name: "Africa's Eden",
    type: "rss",
    url: "https://www.africaseden.com/feed/",
    trustScore: 0.7,
    cadenceHours: 12,
  },
  {
    name: "Mary's Pampered Pets — Safari Diaries",
    type: "rss",
    url: "https://example-placeholder/feed/",
    trustScore: 0.5,
    active: false,
    cadenceHours: 24,
  },

  /* ─────── YouTube creators (handled by the YouTube ingestor, not RSS) ─────── */
  {
    name: "YouTube — Kenya Tourism Board",
    type: "youtube",
    identifier: "UC-tourism-kenya-channel-id",
    trustScore: 0.9,
    active: false, // enable when channel ID confirmed
    cadenceHours: 12,
  },
  {
    name: "YouTube — Jane Doe Wildlife",
    type: "youtube",
    identifier: "UC-jane-doe-channel-id",
    trustScore: 0.85,
    active: false,
    cadenceHours: 12,
  },
];

/**
 * Categories tagged into each source via the `config` JSON — used by editorial
 * to filter and route. (Set in DB; not auto-derived.)
 *
 * Examples:
 *   { tags: ['safari', 'wildlife'], region: 'east_africa' }
 *   { tags: ['hospitality', 'luxury'], operator: 'andbeyond' }
 *   { autoPromote: true }  // trusted tourism boards
 */
