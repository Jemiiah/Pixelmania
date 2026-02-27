import { createPublicClient, http, type Address } from "viem";
import type Database from "better-sqlite3";
import { getLastBlock, setLastBlock, upsertPlacements } from "../db/queries.js";

const PIXEL_PLACED_ABI = [
  {
    type: "event",
    name: "PixelPlaced",
    inputs: [
      { name: "user", type: "address", indexed: true },
      { name: "position", type: "uint256", indexed: true },
      { name: "color", type: "uint8", indexed: false },
      { name: "armored", type: "bool", indexed: false },
    ],
  },
] as const;

interface PixelPlacedLog {
  args: { position?: bigint; user?: Address; color?: number; armored?: boolean };
  blockNumber: bigint;
  transactionHash?: string;
}

const CHUNK_SIZE = 2_000n;

export function createIndexer(
  db: Database.Database,
  rpcUrl: string,
  contractAddress: Address
) {
  const client = createPublicClient({
    transport: http(rpcUrl),
  });

  return async function sync(): Promise<void> {
    const fromBlock = getLastBlock(db);
    const toBlock = await client.getBlockNumber();
    if (fromBlock >= toBlock) return;

    const end = toBlock - fromBlock > CHUNK_SIZE ? fromBlock + CHUNK_SIZE : toBlock;

    const logs = await client.getContractEvents({
      address: contractAddress,
      abi: PIXEL_PLACED_ABI,
      eventName: "PixelPlaced",
      fromBlock,
      toBlock: end,
    });

    if (logs.length === 0) {
      setLastBlock(db, end + 1n);
      return;
    }

    const rows = logs.map((log: PixelPlacedLog) => ({
      position: Number(log.args.position),
      owner: log.args.user ?? "",
      color: Number(log.args.color ?? 0),
      armored: log.args.armored === true ? 1 : 0,
      block_number: Number(log.blockNumber),
      tx_hash: log.transactionHash ?? "",
      created_at: Number(log.blockNumber),
    }));

    upsertPlacements(db, rows);
    setLastBlock(db, end + 1n);
  };
}
