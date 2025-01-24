import orchestrator from "../orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearTables();
});

describe("GET /api/v1/prices", () => {
  test("Retrieving market price history", async () => {
    const product = await orchestrator.createProduct("Coke", "9519576280118");
    const market = await orchestrator.createMarket(
      "John Doe's Market",
      -28.3392173,
      -48.7040639,
    );
    await orchestrator.createPrice(1999, market.id, product.id);
    await orchestrator.createPrice(2999, market.id, product.id);

    const pricesResponse = await fetch(
      `http://localhost:3000/api/v1/prices/${market.id}`,
    );
    const prices = await pricesResponse.json();

    expect(pricesResponse.status).toBe(200);
    expect(prices[0]).toHaveProperty("id");
    expect(prices).toHaveLength(1);
    expect(prices).toEqual([
      expect.objectContaining({
        product_name: "Coke",
        price_cents: 2999,
      }),
    ]);
  });
});
