import orchestrator from "../orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearTables();
});

describe("POST /api/v1/prices", () => {
  test("Creating a new price registry", async () => {
    const product = await orchestrator.createProduct("Coke", "9519576280118");
    const market = await orchestrator.createMarket(
      "John Doe's Market",
      -28.3392173,
      -48.7040639,
    );

    const response = await fetch("http://localhost:3000/api/v1/prices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        price_cents: 2999,
        marketId: market.id,
        productId: product.id,
      }),
    });

    expect(response.status).toBe(201);
  });
});
