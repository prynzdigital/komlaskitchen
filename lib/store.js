import "server-only";
import { randomUUID } from "node:crypto";

// Tiny document store behind the CMS and CRM.
//   • Production: Neon Postgres (DATABASE_URL / POSTGRES_URL, added from Vercel → Storage → Neon).
//   • Local development without a database: a JSON file in .cms-data/ (git-ignored).
//   • Production without a database: reads return nothing (the site falls back to its
//     built-in content) and writes fail with a clear "connect a database" error.
// Every record lives in one table keyed by (collection, id) with a JSON body.

// Vercel names these DATABASE_URL / POSTGRES_URL, or <PREFIX>_DATABASE_URL when a custom
// prefix was chosen while connecting the store — accept any of them.
const findEnv = (...suffixes) => {
  for (const s of suffixes) if (process.env[s]) return process.env[s];
  const key = Object.keys(process.env).find((k) => suffixes.some((s) => k.endsWith(`_${s}`)) && process.env[k]);
  return key ? process.env[key] : "";
};
const DB_URL = findEnv("DATABASE_URL", "POSTGRES_URL");
export const dbUrl = () => DB_URL;
export const blobToken = () => findEnv("BLOB_READ_WRITE_TOKEN", "READ_WRITE_TOKEN");
const IS_DEV = process.env.NODE_ENV !== "production";

export const storeMode = DB_URL ? "postgres" : IS_DEV ? "file" : "none";
export const storeReady = storeMode !== "none";

export class StoreNotConfiguredError extends Error {
  constructor() {
    super("No database is connected yet. In Vercel, open Storage → Create → Neon Postgres and redeploy.");
  }
}

/* ── Postgres ───────────────────────────────────────────── */
let sqlPromise;
function getSql() {
  if (!sqlPromise) {
    sqlPromise = (async () => {
      const { neon } = await import("@neondatabase/serverless");
      const sql = neon(DB_URL);
      await sql.query(`
        create table if not exists cms_docs (
          collection text not null,
          id text not null,
          data jsonb not null,
          created_at timestamptz not null default now(),
          updated_at timestamptz not null default now(),
          primary key (collection, id)
        )`);
      return sql;
    })().catch((err) => {
      sqlPromise = undefined;
      throw err;
    });
  }
  return sqlPromise;
}

const rowToDoc = (r) => ({
  ...r.data,
  id: r.id,
  createdAt: new Date(r.created_at).toISOString(),
  updatedAt: new Date(r.updated_at).toISOString(),
});

/* ── Local JSON file (development only) ─────────────────── */
let fileQueue = Promise.resolve();
async function fileState() {
  const fs = await import("node:fs/promises");
  const path = await import("node:path");
  const dir = path.join(process.cwd(), ".cms-data");
  const file = path.join(dir, "store.json");
  let state = {};
  try {
    state = JSON.parse(await fs.readFile(file, "utf8"));
  } catch {}
  const save = async () => {
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(file, JSON.stringify(state, null, 1));
  };
  return { state, save };
}
// Serialise file writes so concurrent requests can't clobber each other.
const withFile = (fn) => {
  const run = fileQueue.then(async () => fn(await fileState()));
  fileQueue = run.catch(() => {});
  return run;
};

/* ── Public API ─────────────────────────────────────────── */
export async function getDoc(collection, id) {
  if (storeMode === "postgres") {
    const sql = await getSql();
    const rows = await sql.query("select * from cms_docs where collection = $1 and id = $2", [collection, String(id)]);
    return rows[0] ? rowToDoc(rows[0]) : null;
  }
  if (storeMode === "file") {
    return withFile(({ state }) => {
      const rec = state[collection]?.[id];
      return rec ? { ...rec.data, id: String(id), createdAt: rec.createdAt, updatedAt: rec.updatedAt } : null;
    });
  }
  return null;
}

export async function listDocs(collection) {
  if (storeMode === "postgres") {
    const sql = await getSql();
    const rows = await sql.query("select * from cms_docs where collection = $1 order by created_at desc", [collection]);
    return rows.map(rowToDoc);
  }
  if (storeMode === "file") {
    return withFile(({ state }) =>
      Object.entries(state[collection] || {})
        .map(([id, rec]) => ({ ...rec.data, id, createdAt: rec.createdAt, updatedAt: rec.updatedAt }))
        .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    );
  }
  return [];
}

// Insert or replace. Returns the saved document.
export async function putDoc(collection, id, data) {
  const docId = String(id || randomUUID());
  const { id: _i, createdAt: _c, updatedAt: _u, ...body } = data || {};
  if (storeMode === "postgres") {
    const sql = await getSql();
    const rows = await sql.query(
      `insert into cms_docs (collection, id, data) values ($1, $2, $3::jsonb)
       on conflict (collection, id) do update set data = excluded.data, updated_at = now()
       returning *`,
      [collection, docId, JSON.stringify(body)]
    );
    return rowToDoc(rows[0]);
  }
  if (storeMode === "file") {
    return withFile(async ({ state, save }) => {
      const now = new Date().toISOString();
      state[collection] ||= {};
      const prev = state[collection][docId];
      state[collection][docId] = { data: body, createdAt: prev?.createdAt || now, updatedAt: now };
      await save();
      return { ...body, id: docId, createdAt: prev?.createdAt || now, updatedAt: now };
    });
  }
  throw new StoreNotConfiguredError();
}

export async function deleteDoc(collection, id) {
  if (storeMode === "postgres") {
    const sql = await getSql();
    await sql.query("delete from cms_docs where collection = $1 and id = $2", [collection, String(id)]);
    return;
  }
  if (storeMode === "file") {
    return withFile(async ({ state, save }) => {
      if (state[collection]) delete state[collection][id];
      await save();
    });
  }
  throw new StoreNotConfiguredError();
}

// Reads that must never take the public site down: any failure → fallback.
export async function safeGetDoc(collection, id) {
  try {
    return await getDoc(collection, id);
  } catch (err) {
    console.error(`store: could not read ${collection}/${id}:`, err.message);
    return null;
  }
}
