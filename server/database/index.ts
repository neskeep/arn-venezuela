import Database from "better-sqlite3";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

let db: Database.Database | null = null;

export function useDatabase(): Database.Database {
  if (db) return db;

  const dbPath = join(process.cwd(), "server", "database", "arn.db");
  db = new Database(dbPath);

  // Enable WAL mode for better concurrent read performance
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");

  // Run migrations
  runMigrations(db);

  return db;
}

function runMigrations(database: Database.Database): void {
  // Create migrations tracking table
  database.exec(`
    CREATE TABLE IF NOT EXISTS _migrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      filename TEXT NOT NULL UNIQUE,
      applied_at TEXT DEFAULT (datetime('now'))
    )
  `);

  const migrationsDir = join(process.cwd(), "server", "database", "migrations");
  const files = readdirSync(migrationsDir)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  const applied = database
    .prepare("SELECT filename FROM _migrations")
    .all() as { filename: string }[];

  const appliedSet = new Set(applied.map((m) => m.filename));

  for (const file of files) {
    if (appliedSet.has(file)) continue;

    const sql = readFileSync(join(migrationsDir, file), "utf-8");
    database.exec(sql);
    database.prepare("INSERT INTO _migrations (filename) VALUES (?)").run(file);

    console.log(`[DB] Migration applied: ${file}`);
  }
}
