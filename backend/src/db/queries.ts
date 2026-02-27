import type Database from "better-sqlite3";

export function getLastBlock(db: Database.Database): bigint {
  const row = db.prepare("SELECT value FROM sync_state WHERE key = ?").get("last_block") as { value: number } | undefined;
  return row ? BigInt(row.value) : 0n;
}

export function setLastBlock(db: Database.Database, block: bigint): void {
  db.prepare("INSERT OR REPLACE INTO sync_state (key, value) VALUES (?, ?)").run("last_block", Number(block));
}

export function upsertPlacements(
  db: Database.Database,
  rows: Array<{ position: number; owner: string; color: number; armored: number; block_number: number; tx_hash: string; created_at: number }>
): void {
  const stmt = db.prepare(`
    INSERT INTO placements (position, owner, color, armored, block_number, tx_hash, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(position) DO UPDATE SET
      owner = excluded.owner,
      color = excluded.color,
      armored = excluded.armored,
      block_number = excluded.block_number,
      tx_hash = excluded.tx_hash,
      created_at = excluded.created_at
  `);
  const runMany = db.transaction((r: typeof rows) => {
    for (const row of r) {
      stmt.run(row.position, row.owner, row.color, row.armored, row.block_number, row.tx_hash, row.created_at);
    }
  });
  runMany(rows);
}

/** Returns only placed pixels (sparse). Frontend treats missing position as empty. */
export function getCanvas(db: Database.Database): { position: number; owner: string; color: number }[] {
  return db.prepare("SELECT position, owner, color FROM placements ORDER BY position").all() as {
    position: number;
    owner: string;
    color: number;
  }[];
}

export function getLeaderboard(db: Database.Database, limit: number): { owner: string; pixels_placed: number }[] {
  return db
    .prepare(
      `SELECT owner, COUNT(*) as pixels_placed FROM placements GROUP BY owner ORDER BY pixels_placed DESC LIMIT ?`
    )
    .all(limit) as { owner: string; pixels_placed: number }[];
}

export function getRecentActivity(db: Database.Database, limit: number): {
  position: number;
  owner: string;
  color: number;
  armored: number;
  block_number: number;
  tx_hash: string;
  created_at: number;
}[] {
  return db
    .prepare(
      "SELECT position, owner, color, armored, block_number, tx_hash, created_at FROM placements ORDER BY block_number DESC, created_at DESC LIMIT ?"
    )
    .all(limit) as {
    position: number;
    owner: string;
    color: number;
    armored: number;
    block_number: number;
    tx_hash: string;
    created_at: number;
  }[];
}
