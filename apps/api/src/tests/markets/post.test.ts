import orchestrator from "../orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearTables();
});

describe("POST /api/v1/markets", () => {
  test("Creating a new market", async () => {
    const requestBody = {
      name: "John Doe's Market",
      lat: -28.3392173,
      lon: -48.7040639,
    };
    const response = await fetch("http://localhost:3000/api/v1/markets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    const responseBody = await response.json();

    expect(response.status).toBe(201);
    expect(responseBody).toEqual({
      id: responseBody.id,
      created_at: responseBody.created_at,
      name: "John Doe's Market",
      lat: -28.3392173,
      lon: -48.7040639,
    });
  });
});
