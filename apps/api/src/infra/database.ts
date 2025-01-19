import { Client, QueryConfig, QueryResult } from "pg";

async function query<T>(queryConfig: QueryConfig): Promise<QueryResult<T>> {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  try {
    await client.connect();
    const result = await client.query(queryConfig);
    return result;
  } finally {
    await client.end();
  }
}

const database = {
  query,
};

export default database;
