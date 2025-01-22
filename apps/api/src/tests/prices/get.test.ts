import orchestrator from "../orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearTables();
});

describe("GET /api/v1/prices", () => {
  test("Retrieving market price history", async () => {
    const marketResponse = await fetch("http://localhost:3000/api/v1/markets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "John Doe's Market",
        lat: -28.3392173,
        lon: -48.7040639,
      }),
    });
    const market = await marketResponse.json();

    const productResponse = await fetch(
      "http://localhost:3000/api/v1/products",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Coke",
          ean: "9519576280118",
        }),
      },
    );
    const product = await productResponse.json();

    await fetch("http://localhost:3000/api/v1/prices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        price_cents: 3999,
        marketId: market.id,
        productId: product.id,
      }),
    });
    await fetch("http://localhost:3000/api/v1/prices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        price_cents: 2999,
        marketId: market.id,
        productId: product.id,
      }),
    });
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
