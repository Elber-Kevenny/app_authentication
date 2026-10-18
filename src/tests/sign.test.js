// afterEach(async () => {

//   await Account.destroy({
//     where: { username: "Elber" }
//   });
// });

test("Enviando um usuário válido", async () => {
  const request = await fetch("http://localhost:3000/account", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: "Elber",
      password: "amolary",
    }),
  });

  expect(request.status).toBe(201);
});

test("Enviando um usuário inválido", async () => {
  const request = await fetch("http://localhost:3000/account", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: "",
      password: "amolary",
    }),
  });

  expect(request.status).toBe(400);
});
