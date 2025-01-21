import database from "@/infra/database";

async function create(price: number, productId: number, marketId: number) {
  await database.query({
    text: "INSERT INTO prices (price,productid,marketid) VALUES ($1, $2, $3)",
    values: [price, productId, marketId],
  });
}

const price = {
  create,
};

export default price;
