import sequelizedb from "../db/db.js";
import "../models/userModel.js";

const { db } = sequelizedb;

const cleanDatabase = async () => {
  await db.query("drop schema public cascade; create schema public");

  await db.sync({ force: true });
};

beforeAll(cleanDatabase);
test("Enviando um usuário válido", async () => {
  const response = await fetch("http://localhost:3000/account", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: "Elber",
      password: "123",
    }),
  });
  expect(response.status).toBe(200);
});

test("Enviando um usuário inválido", async () => {
  const request = await fetch("http://localhost:3000/account", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: "",
      password: "123",
    }),
  });

  expect(request.status).toBe(400);
});
