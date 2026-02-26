# Backend plan for Pixelmania

A backend sits between the **frontend** and the **chain** (and optional indexer). It can own indexing, caching, and any off-chain logic.

---

## What a backend can do

| Area | Purpose |
|------|--------|
| **Canvas API** | Serve current canvas state (pixels, colors, owners) so the frontend doesn’t call the contract 262k times. Backend indexes `PixelPlaced` (and contract storage if you add `pixelColor` + `getPixels`) and exposes e.g. `GET /canvas`, `GET /canvas/region?x0=0&y0=0&x1=128&y1=128`. |
| **Events indexer** | Listen to PixelPlaced, RewardsDistributed, Minted, etc.; store in DB. Single source of truth for “what happened” and for leaderboards, activity feeds, “my pixels”. |
| **Leaderboard** | Compute from indexed data: pixels per user, G$ spent (from events), rank. Expose `GET /leaderboard`, `GET /users/:address/stats`. |
| **Seasons / rounds** | Sync PrizePool.currentRound, PixelmaniaVoting state, reward payouts. Expose `GET /seasons`, `GET /seasons/:id`. |
| **NFT metadata** | RegionNFT has tokenURI; backend can serve or cache metadata (e.g. dynamic metadata with canvas region image). Optional: pin to IPFS. |
| **User profiles** | Off-chain: username, avatar, preferences. Link by wallet address. |
| **Thumbnails / images** | Generate canvas or region images for OG tags, gallery, NFT artwork. |
| **Rate limiting / abuse** | Optional: rate limit API, basic bot protection. |

---

## Architecture options

### A. Backend as indexer + API (recommended first step)

- **Backend** runs a small process that:
  - Subscribes to chain events (e.g. via RPC `eth_subscribe` or polling) for Pixelmania, PrizePool, Voting, RegionNFT.
  - Writes to a DB (e.g. PostgreSQL): pixels (position, owner, color, block), placements, rounds, rewards, mints.
  - Exposes REST (or tRPC) API: canvas, leaderboard, seasons, user stats, recent activity.
- **Frontend** calls backend instead of chain for read-heavy data; still uses wallet + RPC for placing pixels (send G$ with userData).
- **Optional:** Use The Graph as the indexer and have the backend only cache/aggregate and serve API. Then backend is thinner (cache + auth/profiles).

### B. Backend only (no indexing)

- Backend does **not** index. It proxies RPC (e.g. `GET /config` → read contract), caches contract views (e.g. `getPixels` once you add it), and handles off-chain stuff (profiles, images).
- You still need **something** to index events for leaderboard/activity (subgraph, third-party indexer, or a separate indexer service). So either “backend + indexer” or “backend + The Graph”.

### C. Backend + The Graph

- **Subgraph** indexes chain events and exposes GraphQL (e.g. placements, users, rounds).
- **Backend** consumes subgraph (or direct DB if subgraph writes to your DB), adds REST/API, profiles, images, rate limiting.

---

## Suggested first slice

1. **Stack (example):** Node (TypeScript) or Go, lightweight framework (Express, Fastify, or Hono). DB: PostgreSQL (or SQLite for MVP). Run one process: event listener + HTTP API.
2. **Index:** PixelPlaced only to start. Table: `placements (position, owner, color, armored, block_number, tx_hash, created_at)`.
3. **API:**
   - `GET /canvas` – return full canvas (or chunked) from DB (or from contract + cache if you add `getPixels`).
   - `GET /leaderboard?limit=50` – aggregate placements by owner, order by count.
   - `GET /activity/recent?limit=20` – recent placements.
4. **Frontend:** Replace mock leaderboard/activity with calls to this API; keep canvas loading from backend (or from contract once you have `getPixels`).
5. **Later:** Add rounds/seasons from PrizePool + Voting, RegionNFT mints, user profiles, images.

---

## Repo layout

```
Pixelmania/
  contracts/   # as now
  frontend/    # as now
  backend/     # new
    package.json (or go.mod)
    src/
      indexer/   # event subscription + DB write
      api/       # REST or tRPC routes
      db/        # schema, migrations, queries
    .env         # RPC_URL, DB_URL, CONTRACT_ADDRESSES
```

Keep env (RPC, addresses) in backend `.env`; frontend can get API base URL from env at build time.

---

## Summary

- **Backend** = indexer (events → DB) + read API (canvas, leaderboard, activity, seasons) + optional profiles/images.
- **Frontend** uses backend for reads; still uses wallet + RPC for placing pixels.
- Start with: one indexer (PixelPlaced) + `GET /canvas`, `GET /leaderboard`, `GET /activity/recent`; then add rounds, NFTs, profiles as needed.

If you say your preferred stack (Node/TS vs Go, DB preference), the next step can be a minimal backend scaffold (event listener + 3 endpoints + DB schema) under `backend/`.
