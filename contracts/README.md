# Pixelmania contracts

All contract-related files live here. **Run everything from this folder:**

```bash
cd contracts
forge build
forge test
forge script script/Deploy.s.sol:Deploy --rpc-url $ALFAJORES_RPC_URL --broadcast --private-key $PRIVATE_KEY
```

- **Source:** `*.sol` in this folder (Pixelmania, PrizePool, Errors, PixelmaniaUserData, PixelmaniaVoting, RegionNFT).
- **Scripts:** `script/` – Deploy.s.sol, EncodeUserData.s.sol.
- **Tests:** `test/` – Pixelmania.t.sol, PrizePool.t.sol, MockCfa.sol.

ABIs and bytecode go to `out/` (inside this folder). From repo root, point the frontend at `contracts/out/`.

If you see solc version errors from OpenZeppelin, use solc 0.8.26 (set in `foundry.toml`) or clone OZ v5.4.0 into `lib/openzeppelin-contracts`.

---

## Pixelmania: implemented

- **Store color on-chain:** `pixelColor[position]` is set in `tokensReceived`; frontend can read owner + color.
- **Batch canvas view:** `getPixels(uint256 startIndex, uint256 count)` returns `(positions[], owners[], colors[])`; reverts with `InvalidBatchRange` if out of bounds. Alternative for viewport loading: a `getPixelsInRegion(x0, y0, x1, y1)` could be added later.
- **Config view:** `getConfig()` returns `(canvasSize, placementFee, gToken, canvasAddress, isPaused)` in one call.

---

## Other contracts

- **PixelmaniaVoting:** `currentRound`, `selectedRegionByRound`, `selectedPaletteByRound` are readable; no change needed.
- **PrizePool:** `currentRound`, `distributeRewards`; optional: per-round metadata if contract should be single source of truth.
- **RegionNFT:** Optional: ERC721Enumerable for `tokenOfOwnerByIndex` / listing owner’s token IDs without an indexer.

---

## Do not add (keep as-is)

- Placement = send G$ with userData (no separate `placePixel()`).
- No on-chain cooldown; 1 G$ per pixel is enough.
- No batch place; one pixel per transfer.
