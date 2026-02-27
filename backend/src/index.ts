import Fastify from "fastify";
import { getDb } from "./db/schema.js";
import { createIndexer } from "./indexer/sync.js";
import { registerCanvasRoutes } from "./routes/canvas.js";
import { registerLeaderboardRoutes } from "./routes/leaderboard.js";
import { registerActivityRoutes } from "./routes/activity.js";

const RPC_URL = process.env.RPC_URL ?? "https://celo-mainnet.infura.io/v3/YOUR_KEY";
const PIXELMANIA_ADDRESS = (process.env.PIXELMANIA_ADDRESS ?? "0x0000000000000000000000000000000000000000") as `0x${string}`;
const PORT = parseInt(process.env.PORT ?? "3000", 10);
const DB_PATH = process.env.DB_PATH ?? "./data/pixelmania.db";
const SYNC_INTERVAL_MS = parseInt(process.env.SYNC_INTERVAL_MS ?? "15000", 10);

const db = getDb(DB_PATH);
const sync = createIndexer(db, RPC_URL, PIXELMANIA_ADDRESS);

async function runSync(): Promise<void> {
  try {
    await sync();
  } catch (err) {
    console.error("Indexer sync error:", err);
  }
}

async function main(): Promise<void> {
  await runSync();
  setInterval(runSync, SYNC_INTERVAL_MS);

  const app = Fastify({ logger: true });
  registerCanvasRoutes(app, db);
  registerLeaderboardRoutes(app, db);
  registerActivityRoutes(app, db);

  await app.listen({ port: PORT, host: "0.0.0.0" });
  console.log(`Backend listening on http://0.0.0.0:${PORT}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
