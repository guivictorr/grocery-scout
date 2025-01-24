import database from "@/infra/database";
import { ConflictError, NotFoundError } from "@/infra/errors";
import productQueries from "@/queries/product";

interface ProductDto {
  id: number;
  name: string;
  ean: string;
  createdAt: string;
}

async function findByEan(ean: string) {
  const productResult = await productQueries.findByEan(ean);

  if (productResult.rowCount <= 0) {
    throw new NotFoundError(
      "This product doesn't exists.",
      "Please verify if the EAN is correct.",
    );
  }

  return productResult;
}

async function create(name: string, ean: string) {
  const product = await productQueries.findByEan(ean);
  const isConflicting = product.rowCount > 0;
  if (isConflicting) {
    throw new ConflictError();
  }

  const newProductResult = await database.query<ProductDto>({
    text: "INSERT INTO products (name,ean) VALUES ($1, $2) RETURNING id::int",
    values: [name, ean],
  });
  const productId = newProductResult.rows[0].id;

  return productId;
}

const product = {
  create,
  findByEan,
};

export default product;
