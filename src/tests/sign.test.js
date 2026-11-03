import sequelizedb from "../server/db/db.js";
import "../server/models/userModel.js";

const { db } = sequelizedb;

const cleanDatabase = async () => {
  await db.query("drop schema public cascade; create schema public");

  await db.sync({ force: true });
};

beforeAll(cleanDatabase);

const getResponse = async (body) => {
  const response = await fetch("http://localhost:3000/account", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
  return response.status;
};

test("Enviando um usuário válido", async () => {
  const response = await getResponse(
    JSON.stringify({
      username: "Elber",
      password: "123",
    }),
  );
  expect(response).toBe(200);
});

test("Enviando um usuário inválido", async () => {
  const response = await getResponse(
    JSON.stringify({
      username: "",
      password: "123",
    }),
  );

  expect(response).toBe(400);
});
