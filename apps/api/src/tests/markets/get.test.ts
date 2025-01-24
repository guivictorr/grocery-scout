import orchestrator from "../orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearTables();
});

describe("GET /api/v1/markets", () => {
  test("Retrieving markets", async () => {
    await orchestrator.createMarket(
      "John Doe's Market",
      -28.3392173,
      -48.7040639,
    );

    const response = await fetch("http://localhost:3000/api/v1/markets");
    const responseBody = await response.json();

    expect(response.status).toBe(200);
    expect(responseBody).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "John Doe's Market",
          lat: -28.3392173,
          lon: -48.7040639,
        }),
      ]),
    );
  });
});
