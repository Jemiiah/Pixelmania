import Database from "better-sqlite3";
import path from "node:path";
import { mkdirSync } from "node:fs";

const CANVAS_SIZE = 512;
const CANVAS_PIXEL_COUNT = CANVAS_SIZE * CANVAS_SIZE;

export function getDb(dbPath: string): Database.Database {
  const dir = path.dirname(dbPath);
  try {
    mkdirSync(dir, { recursive: true });
  } catch {
    // dir exists
  }
  const db = new Database(dbPath);
  db.pragma("journal_mode = WAL");

  db.exec(`
    CREATE TABLE IF NOT EXISTS sync_state (
      key TEXT PRIMARY KEY,
      value INTEGER NOT NULL
    );
    INSERT OR IGNORE INTO sync_state (key, value) VALUES ('last_block', 0);

    CREATE TABLE IF NOT EXISTS placements (
      position INTEGER NOT NULL,
      owner TEXT NOT NULL,
      color INTEGER NOT NULL,
      armored INTEGER NOT NULL,
      block_number INTEGER NOT NULL,
      tx_hash TEXT NOT NULL,
      created_at INTEGER NOT NULL,
      PRIMARY KEY (position)
    );
    CREATE INDEX IF NOT EXISTS idx_placements_owner ON placements(owner);
    CREATE INDEX IF NOT EXISTS idx_placements_block ON placements(block_number DESC);
  `);

  return db;
}

export type PlacementRow = {
  position: number;
  owner: string;
  color: number;
  armored: number;
  block_number: number;
  tx_hash: string;
  created_at: number;
};

export { CANVAS_SIZE, CANVAS_PIXEL_COUNT };
