import orchestrator from "../orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearTables();
});

describe("POST /api/v1/products", () => {
  test("Creating a new product", async () => {
    const requestBody = {
      name: "Coke",
      ean: "9519576280118",
    };
    const response = await fetch("http://localhost:3000/api/v1/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    const responseBody = await response.json();

    expect(response.status).toBe(201);
    expect(responseBody).toHaveProperty("id");
  });
  test("Creating duplicated product", async () => {
    const requestBody = {
      name: "Coke",
      ean: "9519576280118",
    };
    const response = await fetch("http://localhost:3000/api/v1/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    const responseBody = await response.json();

    expect(response.status).toBe(409);
    expect(responseBody).toEqual({
      status_code: 409,
      name: "ConflictError",
      message:
        "The entity you are trying to create already exists in the database.",
      action:
        "Please verify the entity's unique identifier (e.g., EAN) and try again. If you intended to update the existing entity, consider using a PUT request instead.",
    });
  });
  test("Creating a product with invalid ean", async () => {
    const requestBody = {
      name: "Valid Product",
      ean: "invalid-ean",
    };
    const response = await fetch("http://localhost:3000/api/v1/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });
    const responseBody = await response.json();

    expect(response.status).toBe(400);
    expect(responseBody).toEqual({
      status_code: 400,
      name: "ValidationError",
      message: "The property ean is invalid.",
      action: "The input must be a string of numbers (digits only).",
    });
  });
  test("Creating a product with invalid name", async () => {
    const requestBody = {
      name: "",
      ean: "12345678",
    };
    const response = await fetch("http://localhost:3000/api/v1/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });
    const responseBody = await response.json();

    expect(response.status).toBe(400);
    expect(responseBody).toEqual({
      status_code: 400,
      name: "ValidationError",
      message: "The property name is invalid.",
      action: "String must contain at least 3 character(s)",
    });
  });
});
