import database from "@/infra/database";

interface PriceDto {
  price_cents: number;
  product_name: string;
  id: number;
}

async function create(price: number, productId: number, marketId: number) {
  await database.query({
    text: "INSERT INTO prices (price,productid,marketid) VALUES ($1, $2, $3)",
    values: [price, productId, marketId],
  });
}
async function list(marketId: number) {
  const productsResult = await database.query<PriceDto>({
    text: "SELECT DISTINCT ON (products.id) prices.created_at, prices.id, prices.price AS price_cents, products.name AS product_name FROM prices INNER JOIN products ON prices.productid = products.id WHERE prices.marketid = $1 ORDER BY products.id, prices.created_at DESC",
    values: [marketId],
  });

  return productsResult.rows;
}

const price = {
  create,
  list,
};

export default price;
