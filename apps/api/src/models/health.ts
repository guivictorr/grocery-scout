import database from "@/infra/database";

async function status() {
  const databaseVersionResult = await database.query<{
    server_version: string;
  }>({
    text: "SHOW server_version",
  });
  const databaseVersion = databaseVersionResult.rows[0].server_version;

  const databaseMaxConnectionsResult = await database.query<{
    max_connections: string;
  }>({ text: "SHOW max_connections" });
  const databaseMaxConnections =
    databaseMaxConnectionsResult.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DATABASE;
  const databaseOpennedConnectionsResult = await database.query<{
    count: number;
  }>({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1",
    values: [databaseName],
  });
  const databaseOpennedConnections =
    databaseOpennedConnectionsResult.rows[0].count;

  return {
    updated_at: new Date().toISOString(),
    dependencies: {
      database: {
        version: databaseVersion,
        max_connections: Number(databaseMaxConnections),
        openned_connections: databaseOpennedConnections,
      },
    },
  };
}

const health = {
  status,
};

export default health;
