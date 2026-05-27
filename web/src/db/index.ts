/**
 * Database client — postgres-js driver + Drizzle ORM.
 *
 * Reads DATABASE_URL from env (Railway sets this automatically when
 * a Postgres service is linked to the web service).
 */

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "DATABASE_URL is not set. Add it to .env.local (dev) or Railway service vars (prod)."
  );
}

/**
 * Use a single connection for serverless / build steps; pool for runtime.
 * Railway gives us a managed Postgres so connection pooling is handled
 * by Railway's internal pgbouncer when configured.
 */
const client = postgres(connectionString, {
  max: process.env.NODE_ENV === "production" ? 10 : 1,
  prepare: false,
});

export const db = drizzle(client, { schema });
export { schema };
