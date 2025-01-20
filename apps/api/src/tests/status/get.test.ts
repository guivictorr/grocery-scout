import orchestrator from "../orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("GET /api/v1/status", () => {
  test("Retrieving system status", async () => {
    const response = await fetch("http://localhost:3000/api/v1/status");
    const responseBody = await response.json();

    expect(response.status).toBe(200);
    const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
    expect(responseBody.updated_at).toEqual(parsedUpdatedAt);
    expect(responseBody.dependencies.database.version).toEqual("16.0");
    expect(responseBody.dependencies.database.max_connections).toEqual(100);
    expect(responseBody.dependencies.database.openned_connections).toEqual(0);
  });
});
