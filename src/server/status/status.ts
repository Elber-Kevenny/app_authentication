import { FastifyRequest, FastifyReply } from "fastify";
import database from "../db/db.js";

export const getStatus = async (
  _request: FastifyRequest,
  reply: FastifyReply,
) => {
  const updatedAt = new Date().toISOString();
  const databaseName = process.env.POSTGRES_DB;

  try {
    const [settingsResult] = await database.db.query(
      "SELECT name, setting FROM pg_settings WHERE name IN ('max_connections', 'server_version');",
    );

    const [connectionsResult] = await database.db.query(
      "SELECT count(*)::int FROM pg_stat_activity WHERE datname = :dbName;",
      {
        replacements: { dbName: databaseName },
      },
    );

    const rowsSettings = settingsResult as Array<{
      name: string;
      setting: string;
    }>;
    const rowsConnections = connectionsResult as Array<{ count: number }>;

    const version =
      rowsSettings.find((s) => s.name === "server_version")?.setting ||
      "unknown";
    const maxConnections =
      rowsSettings.find((s) => s.name === "max_connections")?.setting || "0";
    const databaseOpenedConnectionsValue = rowsConnections[0]?.count || 0;

    return reply.status(200).send({
      updated_at: updatedAt,
      dependencies: {
        database: {
          version,
          max_connections: parseInt(maxConnections),
          opened_connections: databaseOpenedConnectionsValue,
        },
      },
    });
  } catch (e: any) {
    console.error("Database status error:", e);
    return reply
      .status(500)
      .send({ message: "Internal Server Error", error: e.message });
  }
};
