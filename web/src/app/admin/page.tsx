/**
 * Editorial dashboard root — placeholder until auth + inbox UI ship in Week 2.
 *
 * When Clerk is wired, this route will be gated to roles `editor | curator | admin`.
 */

import { db } from "@/db";
import { content, sources } from "@/db/schema";
import { count, sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

async function loadStats() {
  try {
    const [{ total }] = await db
      .select({ total: count() })
      .from(content);
    const [{ ingested }] = await db
      .select({ ingested: count() })
      .from(content)
      .where(sql`editorial_tier = 'ingested'`);
    const [{ published }] = await db
      .select({ published: count() })
      .from(content)
      .where(sql`editorial_tier IN ('published', 'curated', 'featured')`);
    const [{ srcCount }] = await db
      .select({ srcCount: count() })
      .from(sources);
    return { total, ingested, published, srcCount, error: null as string | null };
  } catch (err: unknown) {
    return {
      total: 0,
      ingested: 0,
      published: 0,
      srcCount: 0,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

export default async function AdminHome() {
  const stats = await loadStats();

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#F5F1EA",
        color: "#1A1815",
        padding: "64px 48px",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <header style={{ marginBottom: 48 }}>
        <div
          style={{
            fontSize: 10,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "#B23E14",
            marginBottom: 12,
          }}
        >
          — Editorial dashboard
        </div>
        <h1
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 300,
            fontSize: 48,
            lineHeight: 1.05,
            letterSpacing: "-0.015em",
            margin: 0,
          }}
        >
          SafariVerse · Inbox
        </h1>
        <p
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 300,
            fontStyle: "italic",
            fontSize: 17,
            color: "#3A3530",
            marginTop: 12,
          }}
        >
          Sources, ingested content, and editorial state.
        </p>
      </header>

      {stats.error && (
        <div
          style={{
            background: "#fee",
            border: "1px solid #C5594E",
            padding: 16,
            marginBottom: 32,
            fontFamily: "monospace",
            fontSize: 13,
          }}
        >
          <strong>Database not connected yet:</strong>
          <br />
          {stats.error}
          <br />
          <br />
          Add <code>DATABASE_URL</code> to <code>.env.local</code>, then run{" "}
          <code>npm run db:push</code> to sync the schema.
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
          marginBottom: 48,
        }}
      >
        <StatTile label="Sources" value={stats.srcCount} />
        <StatTile label="Total content" value={stats.total} />
        <StatTile label="Awaiting review" value={stats.ingested} />
        <StatTile label="Published" value={stats.published} />
      </div>

      <section>
        <h2
          style={{
            fontSize: 10,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "#8A8278",
            fontWeight: 600,
            margin: "0 0 16px",
          }}
        >
          ── Build status
        </h2>
        <ul style={{ fontSize: 14, lineHeight: 1.8, listStyle: "none", padding: 0 }}>
          <li>✓ Next.js 16 scaffold</li>
          <li>✓ Drizzle schema (sources, content, creators)</li>
          <li>✓ RSS poller skeleton (<code>src/lib/ingestion/rss-poller.ts</code>)</li>
          <li>✓ Cron endpoint (<code>/api/cron/poll-rss</code>)</li>
          <li>✓ Seed sources file (<code>src/db/seed-sources.ts</code>)</li>
          <li>○ Auth gating (Clerk) — Week 2</li>
          <li>○ Inbox UI with approve/reject — Week 2</li>
          <li>○ AI enrichment worker — Week 3</li>
        </ul>
      </section>
    </main>
  );
}

function StatTile({ label, value }: { label: string; value: number }) {
  return (
    <div style={{ border: "1px solid #D8D0C2", padding: 20 }}>
      <div
        style={{
          fontSize: 10,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "#8A8278",
          fontWeight: 600,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: "'Fraunces', serif",
          fontWeight: 300,
          fontSize: 40,
          color: "#1A1815",
          marginTop: 4,
        }}
      >
        {value}
      </div>
    </div>
  );
}
