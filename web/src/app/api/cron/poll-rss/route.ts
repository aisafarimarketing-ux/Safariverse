/**
 * Cron endpoint — Railway hits this on a schedule to trigger the RSS poller.
 *
 * Secure with a CRON_SECRET env var. Configure Railway cron service to:
 *   curl -H "Authorization: Bearer $CRON_SECRET" \
 *        https://<your-app>.up.railway.app/api/cron/poll-rss
 *
 * Cadence per source is enforced inside `pollAllDueRssSources()` — calling this
 * endpoint more often than the shortest source cadence is fine (cheap no-op).
 */

import { NextResponse } from "next/server";
import { pollAllDueRssSources } from "@/lib/ingestion/rss-poller";

export const dynamic = "force-dynamic";
export const maxDuration = 300; // 5 min ceiling

export async function GET(request: Request) {
  const auth = request.headers.get("authorization");
  const expected = process.env.CRON_SECRET;

  if (!expected) {
    return NextResponse.json(
      { ok: false, error: "CRON_SECRET not configured" },
      { status: 500 }
    );
  }

  if (auth !== `Bearer ${expected}`) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const results = await pollAllDueRssSources();
    const summary = results.reduce(
      (acc, r) => {
        acc.fetched += r.itemsFetched;
        acc.inserted += r.itemsInserted;
        acc.skipped += r.itemsSkipped;
        acc.errors += r.errors.length;
        return acc;
      },
      { fetched: 0, inserted: 0, skipped: 0, errors: 0 }
    );

    return NextResponse.json({
      ok: true,
      sourcesPolled: results.length,
      summary,
      details: results,
    });
  } catch (err: unknown) {
    return NextResponse.json(
      {
        ok: false,
        error: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}
