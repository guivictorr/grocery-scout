import orchestrator from "../orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearTables();
});

describe("GET /api/v1/products/:ean", () => {
  test("Retrieving product by EAN", async () => {
    const requestBody = {
      name: "Coke",
      ean: "9519576280118",
    };
    await fetch("http://localhost:3000/api/v1/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    const productResponse = await fetch(
      "http://localhost:3000/api/v1/products/9519576280118",
    );

    const productResponseResult = await productResponse.json();

    expect(productResponse.status).toBe(200);
    expect(productResponseResult.name).toEqual("Coke");
    expect(productResponseResult.ean).toEqual("9519576280118");
  });
  test.todo("Retrieving non-existent product");
  //test("Retrieving non-existent product", async () => {
  //  const productResponse = await fetch(
  //    "http://localhost:3000/api/v1/products/9519576280118",
  //  );
  //  const productResponseResult = await productResponse.json();
  //
  //  const notFoundError = new NotFoundError();
  //  expect(productResponse.status).toBe(404);
  //  expect(productResponseResult).toEqual(notFoundError.toJSON());
  //});
});
