import { Client, QueryConfig, QueryResult } from "pg";

async function query<T>(queryConfig: QueryConfig): Promise<QueryResult<T>> {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === "production",
  });
  try {
    await client.connect();
    const result = await client.query(queryConfig);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await client.end();
  }
}

const database = {
  query,
} as const;

export default database;
