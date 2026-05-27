/**
 * RSS poller — pulls new items from active RSS sources, dedupes by URL hash,
 * and inserts raw content records in `editorialTier: 'ingested'` state.
 *
 * Enrichment (the AI step) is a separate worker triggered after rows land here.
 *
 * Invoked by:
 *   - Cron via /api/cron/poll-rss (Railway cron)
 *   - Manually via `npm run db:seed-sources && tsx src/lib/ingestion/rss-poller.ts`
 */

import Parser from "rss-parser";
import { createHash } from "node:crypto";
import { db } from "@/db";
import { sources, content } from "@/db/schema";
import { eq, and, lte } from "drizzle-orm";

const parser: Parser = new Parser({
  timeout: 15_000,
  headers: { "User-Agent": "SafariVerse-Bot/0.1 (+https://safariverse.com)" },
});

export interface PollResult {
  sourceId: string;
  sourceName: string;
  itemsFetched: number;
  itemsInserted: number;
  itemsSkipped: number;
  errors: string[];
}

export async function pollAllDueRssSources(): Promise<PollResult[]> {
  const now = new Date();
  const dueSources = await db
    .select()
    .from(sources)
    .where(and(eq(sources.active, true), eq(sources.type, "rss")));

  const dueForPolling = dueSources.filter((s) => {
    if (!s.lastPolledAt) return true;
    const elapsedHours =
      (now.getTime() - new Date(s.lastPolledAt).getTime()) / 1000 / 3600;
    return elapsedHours >= s.cadenceHours;
  });

  const results: PollResult[] = [];
  for (const src of dueForPolling) {
    results.push(await pollSource(src));
  }
  return results;
}

async function pollSource(src: typeof sources.$inferSelect): Promise<PollResult> {
  const result: PollResult = {
    sourceId: src.id,
    sourceName: src.name,
    itemsFetched: 0,
    itemsInserted: 0,
    itemsSkipped: 0,
    errors: [],
  };

  if (!src.url) {
    result.errors.push("Source has no URL");
    return result;
  }

  try {
    const feed = await parser.parseURL(src.url);
    result.itemsFetched = feed.items.length;

    for (const item of feed.items) {
      const link = item.link?.trim();
      if (!link) {
        result.itemsSkipped += 1;
        continue;
      }

      const rawHash = createHash("sha256").update(link).digest("hex");

      try {
        await db.insert(content).values({
          sourceId: src.id,
          sourceUrl: link,
          sourcePlatform: "rss",
          sourcePublishedAt: item.pubDate ? new Date(item.pubDate) : null,
          type: "article",
          rawTitle: item.title?.trim() ?? null,
          rawHtml:
            (item as { "content:encoded"?: string })["content:encoded"] ??
            item.content ??
            item.contentSnippet ??
            null,
          rawHash,
          language: "en",
          editorialTier: "ingested",
        });
        result.itemsInserted += 1;
      } catch (e: unknown) {
        // unique violation on rawHash = dedupe hit, expected
        const msg = e instanceof Error ? e.message : String(e);
        if (msg.includes("duplicate key")) {
          result.itemsSkipped += 1;
        } else {
          result.errors.push(msg);
        }
      }
    }

    // mark source polled
    await db
      .update(sources)
      .set({ lastPolledAt: new Date() })
      .where(eq(sources.id, src.id));
  } catch (e: unknown) {
    result.errors.push(e instanceof Error ? e.message : String(e));
  }

  return result;
}

// Allow direct invocation for local testing: `tsx src/lib/ingestion/rss-poller.ts`
if (require.main === module) {
  pollAllDueRssSources()
    .then((results) => {
      console.table(
        results.map((r) => ({
          source: r.sourceName,
          fetched: r.itemsFetched,
          inserted: r.itemsInserted,
          skipped: r.itemsSkipped,
          errors: r.errors.length,
        }))
      );
      process.exit(0);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
