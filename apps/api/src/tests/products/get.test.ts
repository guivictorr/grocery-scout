import orchestrator from "../orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearTables();
});

describe("GET /api/v1/products/:ean", () => {
  test("Retrieving product by EAN", async () => {
    const ean = "9519576280118";
    await orchestrator.createProduct("Coke", ean);

    const response = await fetch(
      `http://localhost:3000/api/v1/products/${ean}`,
    );

    const responseBody = await response.json();

    expect(response.status).toBe(200);
    expect(responseBody.name).toEqual("Coke");
    expect(responseBody.ean).toEqual(ean);
  });
  test("Retrieving non-existent product", async () => {
    const productResponse = await fetch(
      "http://localhost:3000/api/v1/products/12345678",
    );
    const productResponseResult = await productResponse.json();

    expect(productResponse.status).toBe(404);
    expect(productResponseResult).toEqual({
      status_code: 404,
      name: "NotFoundError",
      message: "This product doesn't exists.",
      action: "Please verify if the EAN is correct.",
    });
  });
});
