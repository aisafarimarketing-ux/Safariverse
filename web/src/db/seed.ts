/**
 * Seed runner — populates the sources table with our initial RSS / YouTube list.
 *
 * Run with:  npm run db:seed-sources
 *
 * Idempotent: re-running upserts by `url` (or `identifier` for non-RSS).
 */

import { db } from "./index";
import { sources } from "./schema";
import { seedSources } from "./seed-sources";
import { sql } from "drizzle-orm";

async function main() {
  console.log(`Seeding ${seedSources.length} sources...`);

  for (const src of seedSources) {
    const dedupeKey = src.url ?? src.identifier ?? src.name;
    await db
      .insert(sources)
      .values(src)
      .onConflictDoUpdate({
        target: sources.name,
        set: {
          type: src.type,
          url: src.url ?? null,
          identifier: src.identifier ?? null,
          trustScore: src.trustScore ?? 0.6,
          cadenceHours: src.cadenceHours ?? 6,
          active: src.active ?? true,
          config: src.config ?? {},
        },
      })
      .catch(async () => {
        // If no unique index on `name` yet, fall back to plain insert and ignore conflict
        await db.execute(
          sql`INSERT INTO sources (name, type, url, identifier, trust_score, cadence_hours, active, config)
              VALUES (${src.name}, ${src.type}, ${src.url ?? null}, ${src.identifier ?? null},
                      ${src.trustScore ?? 0.6}, ${src.cadenceHours ?? 6}, ${src.active ?? true},
                      ${JSON.stringify(src.config ?? {})})
              ON CONFLICT DO NOTHING`
        );
      });

    console.log(`  · ${src.name}  [${src.type}]  (${dedupeKey})`);
  }

  console.log("Done.");
  process.exit(0);
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
