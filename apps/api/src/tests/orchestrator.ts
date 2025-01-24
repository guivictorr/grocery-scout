import retry from "async-retry";
import database from "../infra/database";
import price from "../models/price";
import market from "../models/market";
import product from "../models/product";

async function waitForAllServices() {
  await waitForWebServer();

  async function waitForWebServer() {
    return retry(fetchStatusPage, {
      retries: 100,
      maxTimeout: 1000,
    });

    async function fetchStatusPage() {
      const response = await fetch("http://localhost:3000/api/v1/status");
      if (response.status !== 200) {
        throw Error();
      }
    }
  }
}

async function clearTables() {
  await database.query({
    text: "DELETE FROM prices;DELETE FROM products;DELETE FROM markets",
  });
}

async function createPrice(
  price_cents: number,
  marketId: number,
  productId: number,
) {
  await price.create(price_cents, productId, marketId);
}
async function createMarket(name: string, lat: number, lon: number) {
  const result = await market.create(name, lat, lon);
  return result;
}
async function createProduct(name: string, ean: string) {
  const result = await product.create(name, ean);
  return { id: result };
}

const orchestrator = {
  waitForAllServices,
  clearTables,
  createProduct,
  createMarket,
  createPrice,
};

export default orchestrator;
