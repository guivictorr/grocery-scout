import database from "@/infra/database";

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

const productQueries = {
  findByEan,
};

export default productQueries;
