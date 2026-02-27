import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import type Database from "better-sqlite3";
import { getRecentActivity } from "../db/queries.js";

interface Querystring {
  limit?: string;
}

export function registerActivityRoutes(app: FastifyInstance, db: Database.Database): void {
  app.get<{ Querystring: Querystring }>("/activity/recent", (req: FastifyRequest<{ Querystring: Querystring }>, reply: FastifyReply) => {
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit ?? "20", 10) || 20));
    const activity = getRecentActivity(db, limit);
    return reply.send({ activity });
  });
}
