import { type SQLiteDatabase, openDatabaseAsync } from "expo-sqlite";

export async function migrateDb(database: SQLiteDatabase) {
  await database.execAsync(`
  CREATE TABLE IF NOT EXISTS markets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    name TEXT NOT NULL,
    lat REAL NOT NULL,
    lon REAL NOT NULL
  );
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    name TEXT NOT NULL,
    ean TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS prices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    price REAL NOT NULL,
    productId INTEGER NOT NULL,
    marketId INTEGER NOT NULL,
    FOREIGN KEY (productId) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (marketId) REFERENCES markets(id) ON DELETE CASCADE
  );
`);
}

export interface ProductData {
  createdAt: string;
  updatedAt: string;
  id: number;
  ean: string;
  name: string;
}
export interface MarketData {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  lat: number;
  lon: number;
}

export async function createProduct(data: Pick<ProductData, "name" | "ean">) {
  const db = await openDatabaseAsync("database.db");
  const statement = await db.prepareAsync(
    "INSERT INTO products (name,ean) VALUES ($name, $ean)",
  );
  try {
    const result = await statement.executeAsync({
      $name: data.name,
      $ean: data.ean,
    });

    const insertedRowId = result.lastInsertRowId.toLocaleString();
    return { insertedRowId };
  } catch (error) {
    throw error;
  } finally {
    await statement.finalizeAsync();
    await db.closeAsync();
  }
}

export async function listMarkets() {
  const db = await openDatabaseAsync("database.db");
  const rows = await db.getAllAsync<MarketData>("SELECT * FROM markets");
  await db.closeAsync();
  return rows;
}
