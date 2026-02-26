# Frontend ↔ Contract gap analysis

The frontend and contracts are **not wired together**. The UI is a mock; the chain is never read or written. Below is what each side has and what’s left to do.

---

## What already aligns

| Item | Contract | Frontend |
|------|----------|----------|
| Canvas size | `CANVAS_SIZE = 512` | `CANVAS_SIZE = 512` ✓ |
| G$ in copy | N/A | Labels like "G$ Spent", "G$ rewards" ✓ |
| Palette | `uint8 color` (0–255) | 24 colors (indices) – can map to uint8 ✓ |

---

## Frontend → contract (what the frontend must add)

1. **Real wallet**
   - Replace mock `walletStore` (fake address/balance) with real Celo wallet (e.g. Valora, MetaMask, WalletConnect).
   - Read G$ balance (G$ token at `0x62B8B11039FcfE5aB0C56E502b1C372A3d2a9c7A` on Celo/Alfajores).

2. **Place pixel on-chain**
   - On place: send **1 G$** (ERC777) to the **Pixelmania canvas contract** with **userData** = 5 bytes `[x_hi, x_lo, y_hi, y_lo, color]` (same encoding as `PixelmaniaUserData.encode` in Solidity).
   - Use contract address from config (deployed canvas). No “place pixel” function to call – placement is done by transferring G$ to the contract with that userData.
   - Handle loading, tx hash, and errors (e.g. insufficient balance, pixel armored, paused).

3. **Contract addresses / config**
   - Config (e.g. env) for: canvas address, G$ address, optional CFA address (for armor).
   - Chain (Alfajores / Celo mainnet) and RPC.

4. **Read canvas from chain**
   - Either:
     - **Indexer / subgraph**: subscribe to `PixelPlaced` and (optionally) read `pixelOwner(position)` to fill the canvas and show who placed what; or
     - **RPC only**: read `pixelOwner` for each position (expensive at 512×512) or only for visible region; or
     - **Hybrid**: events for recent placements + periodic or lazy `pixelOwner` for displayed area.
   - Today the frontend only uses local state and mock data; it never loads chain state.

5. **Optional: armor**
   - Contract exposes `isPixelArmored(x, y)`. You can call it (or derive from events) and show “armored” in the UI so users know a pixel can’t be overwritten.

6. **Cooldown vs fee**
   - Frontend has a 30s cooldown; the contract has **no cooldown**, only **1 G$ per pixel**. You can keep a client-side cooldown for UX or remove it; either way, the chain only enforces the fee.

7. **Palette**
   - Contract expects a single `uint8` color. Map your 24 palette indices to that byte (e.g. 0–23 or any 0–255 scheme) and use that in the 5-byte userData.

---

## Contract → frontend (what the contract has that the frontend doesn’t use)

1. **Pixelmania**
   - **PixelPlaced(user, position, color, armored)** – not subscribed or indexed; needed to build/update canvas and show “armored”.
   - **pixelOwner(position)** – not read; needed for “who placed this” and for rebuilding canvas.
   - **isPixelArmored(x, y)** – not called; can be used for hover or badge.
   - **Pausable** – frontend doesn’t check; you could read a “paused” state and disable placement in the UI.

2. **PrizePool**
   - **currentRound**, **distributeRewards** – frontend seasons/prize pool are mock; no read of `currentRound` or reward data from this contract.

3. **PixelmaniaVoting**
   - **currentRound**, **selectedRegionByRound**, **selectedPaletteByRound** – frontend voting/regions are mock; no read from this contract.

4. **RegionNFT**
   - **mint(to, roundId)** (owner only), **roundByTokenId** – frontend “my NFTs” / gallery are mock; no balance, tokenIds, or metadata from this contract.

So: **rounds, rewards, voting, and region NFTs are on-chain but the frontend doesn’t read them yet.**

---

## Summary

| Area | Contract | Frontend | Status |
|------|----------|----------|--------|
| Canvas size | 512 | 512 | ✓ Match |
| Place pixel | G$ transfer + 5-byte userData | Local state only | ✗ Frontend must send G$ + userData |
| Pixel state | pixelOwner, PixelPlaced | Local Uint8Array + mock | ✗ Frontend must read chain/events |
| Wallet / G$ | Needs signer + G$ | Mock only | ✗ Real connect + G$ balance |
| Cooldown | None (1 G$ per pixel) | 30s | Different; optional to keep 30s in UI |
| Palette | uint8 | 24 indices | ✓ Can map |
| Rounds / prize | PrizePool round, rewards | Mock seasons | ✗ Read from PrizePool |
| Voting | Voting round, region, palette | Mock voting | ✗ Read from PixelmaniaVoting |
| Region NFTs | RegionNFT mint, roundByTokenId | Mock gallery | ✗ Read from RegionNFT |
| Armor | isPixelArmored | Not shown | ✗ Optional: call and show in UI |
| Pause | Pausable | Not checked | ✗ Optional: disable place when paused |

**Bottom line:** The frontend does not match the contract yet. To match:

- **On the frontend:** Add real wallet, G$ send with encoded userData to place a pixel, and some way to read canvas (events + optional pixelOwner) and optionally rounds/voting/NFTs/armor/pause.
- **On the contract:** No change required for basic “place pixel and show canvas”; optional additions later (e.g. view helpers, events) can improve UX.
