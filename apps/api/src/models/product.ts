import database from "@/infra/database";
import { ConflictError } from "@/infra/errors";

interface ProductDto {
  id: number;
  name: string;
  ean: string;
  createdAt: string;
}

async function findByEan(ean: string) {
  const productResult = await database.query<ProductDto>({
    text: "SELECT * FROM products WHERE ean = $1",
    values: [ean],
  });

  return productResult;
}

async function create(name: string, ean: string) {
  const product = await findByEan(ean);
  const isConflicting = product.rowCount > 0;
  if (isConflicting) {
    throw new ConflictError();
  }

  const newProductResult = await database.query<ProductDto>({
    text: "INSERT INTO products (name,ean) VALUES ($1, $2) RETURNING id",
    values: [name, ean],
  });
  const productId = newProductResult.rows[0].id;

  return productId;
}

const product = {
  create,
};

export default product;
