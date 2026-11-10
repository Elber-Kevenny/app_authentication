import orchestrator from "../orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitforAllServices();
});

test("verificando o endpoint /status", async () => {
  const response = await fetch("http://localhost:3000/api/status");
  const body = await response.json();

  expect(response.status).toBe(200);
  expect(body.updated_at).toBeTruthy();
  expect(body.dependencies.database.opened_connections).toEqual(1);
  expect(body.dependencies.database.max_connections).toBeDefined();
});
