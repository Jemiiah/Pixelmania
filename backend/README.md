# Pixelmania Backend

Indexer + REST API for the Pixelmania canvas (Celo). Indexes `PixelPlaced` events into SQLite and serves canvas state, leaderboard, and recent activity.

## Setup

1. Copy env and set contract + RPC:
   ```bash
   cp .env.example .env
   ```
   Edit `.env`: set `PIXELMANIA_ADDRESS` to your deployed Pixelmania contract and `RPC_URL` (e.g. Celo Alfajores or mainnet).

2. Install and run:
   ```bash
   npm install
   npm run dev
   ```
   For production: `npm run build` then `npm start`.

## API

- **GET /canvas** – Sparse list of placed pixels `{ pixels: [{ position, owner, color }] }`.
- **GET /leaderboard?limit=50** – Top owners by pixel count `{ leaderboard: [{ owner, pixels_placed }] }`.
- **GET /activity/recent?limit=20** – Latest placements `{ activity: [{ position, owner, color, armored, block_number, tx_hash, created_at }] }`.

## Env

| Variable | Description |
|----------|-------------|
| `RPC_URL` | Celo RPC (e.g. Alfajores or mainnet). |
| `PIXELMANIA_ADDRESS` | Deployed Pixelmania contract address. |
| `PORT` | HTTP server port (default `3000`). |
| `DB_PATH` | SQLite file path (default `./data/pixelmania.db`). |
| `SYNC_INTERVAL_MS` | Indexer poll interval in ms (default `15000`). |
