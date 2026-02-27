import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import type Database from "better-sqlite3";
import { getLeaderboard } from "../db/queries.js";

interface Querystring {
  limit?: string;
}

export function registerLeaderboardRoutes(app: FastifyInstance, db: Database.Database): void {
  app.get<{ Querystring: Querystring }>("/leaderboard", (req: FastifyRequest<{ Querystring: Querystring }>, reply: FastifyReply) => {
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit ?? "50", 10) || 50));
    const rows = getLeaderboard(db, limit);
    return reply.send({ leaderboard: rows });
  });
}
