# Pixelmania
Pixelmania is a collaborative pixel art platform built on Celo, integrating GoodDollar's G$ token to create a gamified, community-driven art experience. Pixelmania introduces economic incentives through G$ payments, prize pools, and NFT minting.

## Project layout

- **`contracts/`** – All contract-related files: Solidity sources, `contracts/script/` (deploy, encode userData), `contracts/test/` (Foundry tests). Frontend uses `out/` for ABIs after `forge build`.

## Smart contracts (Foundry)

Production-ready, gas-optimized Solidity for a **512×512 collaborative pixel canvas** with:

- **G$ SuperToken (ERC777):** Place a pixel in one tx by sending 1 G$ to the contract with `userData` = `[uint16 X, uint16 Y, uint8 Color]` (5 bytes). No approve step.
- **Superfluid “Streaming Armor” (CFAv1):** A pixel can only be overwritten if it is *Unarmored*. It is Armored if the current owner has an active G$ stream to the contract ≥ 1 G$/day.
- **Fee split:** 1 G$ per placement → 80% prize pool (in contract), 10% treasury, 10% dev. Owner can call `distributeRewards(winners, amounts)` to pay out from the pool.
- **Security:** ReentrancyGuard, Ownable, Pausable; ERC1820 registration for `ERC777TokensRecipient`.

### Commands

- **Build:** `forge build`
- **Test:** `forge test`
- **Encode userData (for frontend):** `forge script contracts/script/EncodeUserData.s.sol:EncodeUserData --sig "run(uint16,uint16,uint8)" 100 200 42`
- **Deploy:** Set in `.env`: `PRIVATE_KEY`, `TREASURY`, `DEV_WALLET`, `CFA_ADDRESS`. Then:
  - Alfajores: `forge script contracts/script/Deploy.s.sol:Deploy --rpc-url $ALFAJORES_RPC_URL --broadcast --private-key $PRIVATE_KEY`
  - Celo: `forge script contracts/script/Deploy.s.sol:Deploy --rpc-url $CELO_RPC_URL --broadcast --private-key $PRIVATE_KEY`

First time: `forge install foundry-rs/forge-std` and (for OpenZeppelin) `forge install OpenZeppelin/openzeppelin-contracts`.
