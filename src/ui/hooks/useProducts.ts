import { useSQLiteContext } from "expo-sqlite";

interface ProductData {
  createdAt: string;
  updatedAt: string;
  id: number;
  ean: string;
  name: string;
}

export function useProducts() {
  const db = useSQLiteContext();
  async function create(data: Pick<ProductData, "name" | "ean">) {
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
    }
  }
  async function list() {
    const rows = await db.getAllAsync<ProductData>("SELECT * FROM products");
    return rows;
  }

  return { create, list };
}
