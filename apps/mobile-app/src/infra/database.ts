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

export interface PriceData {
  price: number;
  marketId: number;
  productId: number;
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
  } finally {
    await statement.finalizeAsync();
    await db.closeAsync();
  }
}
export async function createPrice(data: PriceData) {
  const db = await openDatabaseAsync("database.db");
  const statement = await db.prepareAsync(
    "INSERT INTO prices (price, productId, marketId) VALUES ($price, $productId, $marketId)",
  );
  try {
    const result = await statement.executeAsync({
      $price: data.price,
      $productId: data.productId,
      $marketId: data.marketId,
    });

    const insertedRowId = result.lastInsertRowId.toLocaleString();
    return { insertedRowId };
  } finally {
    await statement.finalizeAsync();
    await db.closeAsync();
  }
}
export async function createMarket(
  data: Pick<MarketData, "name" | "lat" | "lon">,
) {
  const db = await openDatabaseAsync("database.db");
  const statement = await db.prepareAsync(
    "INSERT INTO markets (name, lat, lon) VALUES ($name, $lat, $lon)",
  );
  try {
    const result = await statement.executeAsync({
      $name: data.name,
      $lat: data.lat,
      $lon: data.lon,
    });

    const insertedRowId = result.lastInsertRowId.toLocaleString();
    return { insertedRowId };
  } finally {
    await statement.finalizeAsync();
    await db.closeAsync();
  }
}

export async function getProductByEan(ean: string) {
  const db = await openDatabaseAsync("database.db");
  const rows = await db.getFirstAsync<ProductData>(
    "SELECT * FROM products WHERE ean = $ean",
    { $ean: ean },
  );
  await db.closeAsync();
  return rows;
}
export async function listMarkets() {
  const db = await openDatabaseAsync("database.db");
  const rows = await db.getAllAsync<MarketData & { productCount: number }>(`
    SELECT 
      markets.*,
      COUNT(DISTINCT prices.productId) as productCount 
    FROM markets 
    LEFT JOIN prices ON prices.marketId = markets.id 
    GROUP BY markets.id
  `);
  console.log(rows);
  await db.closeAsync();
  return rows;
}

type LatestPriceData = {
  id: number;
  price: number;
  name: string;
  createdAt: string;
};
export async function getLatestPricesInMarket(marketId: number) {
  const db = await openDatabaseAsync("database.db");
  try {
    const rows = await db.getAllAsync<LatestPriceData>(
      "SELECT prices.id, prices.price, products.name, MAX(prices.createdAt) AS createdAt FROM prices INNER JOIN products ON prices.productId = products.id WHERE prices.marketId = $marketId GROUP BY products.id",
      { $marketId: marketId },
    );
    return rows;
  } finally {
    await db.closeAsync();
  }
}
export async function cleanProducts() {
  const db = await openDatabaseAsync("database.db");
  try {
    await db.runAsync("DELETE FROM prices");
  } finally {
    await db.closeAsync();
  }
}
