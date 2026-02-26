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

If you see solc version errors from OpenZeppelin, install 0.8.26 and set `solc = "0.8.26"` in `foundry.toml`:

```bash
svm install 0.8.26
```
