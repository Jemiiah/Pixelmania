# What the contracts should add

Recommendations so the frontend can integrate cleanly and the product stays maintainable.

---

## 1. Pixelmania: store color on-chain (high value)

**Current:** Only `pixelOwner[position]` is stored. Color is emitted in `PixelPlaced` but not stored.

**Problem:** To show the canvas with colors, the frontend must index all historical `PixelPlaced` events. No way to “read the canvas” from the contract.

**Add:**
- Store color per pixel, e.g. `mapping(uint256 => uint8) public pixelColor;` (or a single struct mapping).
- In `tokensReceived`, after `pixelOwner[position] = from;`, set `pixelColor[position] = color;`.
- Emit `PixelPlaced` as today (no breaking change).

**Benefit:** Frontend can rebuild canvas by reading `pixelOwner` + `pixelColor` in batches (see below) instead of relying only on events.

---

## 2. Pixelmania: batch view for canvas (high value)

**Current:** Frontend would need 262k calls to read full canvas (`pixelOwner` + optional color per position).

**Add a view:**

```solidity
function getPixels(uint256 startIndex, uint256 count) external view
    returns (uint256[] memory positions, address[] memory owners, uint8[] memory colors);
```

- Reverts if `startIndex + count > CANVAS_SIZE * CANVAS_SIZE`.
- Returns up to `count` pixels starting at `startIndex` (position = x + y * CANVAS_SIZE).
- Frontend can paginate (e.g. 500 or 1000 per call) to fill the canvas without an indexer.

**Alternative:** A view that returns a **region** (e.g. rectangle) to reduce calls when the user only views a portion of the canvas:

```solidity
function getPixelsInRegion(uint16 x0, uint16 y0, uint16 x1, uint16 y1) external view
    returns (uint256[] memory positions, address[] memory owners, uint8[] memory colors);
```

Pick one: flat `getPixels(start, count)` is simpler; region-based is nicer for viewport-based loading.

---

## 3. Pixelmania: one-call config view (nice to have)

**Add:**

```solidity
function getConfig() external view returns (
    uint256 canvasSize,
    uint256 placementFee,
    address gToken,
    address canvasAddress,
    bool isPaused
);
```

Returns `canvasSize = CANVAS_SIZE`, `placementFee = PLACEMENT_FEE`, `gToken = G_TOKEN`, `canvasAddress = address(this)`, `isPaused = paused()`.

**Benefit:** Frontend gets all config in one RPC call.

---

## 4. PrizePool: optional round metadata (optional)

**Current:** `currentRound` and `RewardsDistributed(winners, amounts)`. Frontend can derive “round N ended with these payouts” from events.

**Optional add:** If you want the contract to be the source of truth for “what happened in round N”, you could store per-round info (e.g. round start/end time, total collected, or winner list). Not strictly required if the frontend/indexer can reconstruct from events.

---

## 5. PixelmaniaVoting: no change needed

`currentRound`, `selectedRegionByRound`, `selectedPaletteByRound` are already readable. Frontend can call these.

---

## 6. RegionNFT: enumerable “my NFTs” (optional)

**Current:** No way to list token IDs for an owner without scanning Transfer events.

**Optional add:** Use OpenZeppelin’s `ERC721Enumerable` (or a small extension) so the frontend can call `tokenOfOwnerByIndex(owner, index)` and `balanceOf(owner)` to list “my region NFTs”. Increases gas a bit on mint/transfer; only add if you need on-chain listing without an indexer.

---

## 7. Do not add (keep as-is)

- **Placement:** Keep “place pixel = send G$ with userData”. No new `placePixel()` function; ERC777 flow is correct.
- **Cooldown:** No need for cooldown on-chain; 1 G$ per pixel is enough. Cooldown can stay frontend-only for UX.
- **Batch place:** Each pixel is a separate user payment; batching placements would complicate accounting and UX. Keep one pixel per transfer.

---

## Priority summary

| Priority | Contract   | Addition |
|----------|------------|----------|
| High     | Pixelmania | Store `pixelColor` and set it in `tokensReceived`. |
| High     | Pixelmania | Add `getPixels(startIndex, count)` (or `getPixelsInRegion`) returning positions, owners, colors. |
| Medium   | Pixelmania | Add `getConfig()` view. |
| Optional | PrizePool  | Per-round metadata if you want contract as single source of truth. |
| Optional | RegionNFT  | ERC721Enumerable (or similar) for listing owner’s token IDs. |

Implementing the two “high” items gives the frontend a clear path to load and display the canvas from the contract without depending on an indexer first.
