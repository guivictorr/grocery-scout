import orchestrator from "../orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearTables();
});

describe("POST /api/v1/prices", () => {
  test("Creating a new price registry", async () => {
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
