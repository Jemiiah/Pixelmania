import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import type Database from "better-sqlite3";
import { getCanvas } from "../db/queries.js";

export function registerCanvasRoutes(app: FastifyInstance, db: Database.Database): void {
  app.get("/canvas", (_req: FastifyRequest, reply: FastifyReply) => {
    const pixels = getCanvas(db);
    return reply.send({ pixels });
  });
}
