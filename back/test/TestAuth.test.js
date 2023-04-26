const assert = require("assert");
const request = require("supertest");
const server = require("../index.js"); // Importer votre fichier index ici
const User = require("../models/user.model.js");

before(async () => {
  // supprime que l'utilsateur  john6.doe@example.com de la bdd
  await User.destroy({ where: { email: "john6.doe@example.com" } });
  // ajoute un utilisateur à la base de données
  await request(server).post("/auth/signup").send({
    name: "John Doe",
    email: "john.doe@example.com",
    password: "password",
  });
});

describe("Auth", () => {
  describe("POST /auth/signup", () => {
    it("should create a new user and return a token", async () => {
      const res = await request(server) // Utiliser l'objet server ici
        .post("/auth/signup")
        .send({
          name: "John Doe6",
          email: "john6.doe@example.com",
          password: "password",
        })
        .expect(200);

      assert.notEqual(res.body.token, null);
    });

    it("should return an error if user already exists", async () => {
      const res = await request(server) // Utiliser l'objet server ici
        .post("/auth/signup")
        .send({
          name: "John Doe",
          email: "john.doe@example.com",
          password: "password",
        })
        .expect(409);

      assert(res.body.error != null);
    });
  });

  describe("POST /auth/login", () => {
    it("should return a token for an existing user", async () => {
      const res = await request(server) // Utiliser l'objet server ici
        .post("/auth/login")
        .send({ email: "john.doe@example.com", password: "password" })
        .expect(200);

      assert.notEqual(res.body.token, null);
    });

    it("should return an error for an invalid email or password", async () => {
      const res = await request(server) // Utiliser l'objet server ici
        .post("/auth/login")
        .send({ email: "invalid@example.com", password: "password" })
        .expect(401);

      assert(res.body.error != null);

      const res2 = await request(server) // Utiliser l'objet server ici
        .post("/auth/login")
        .send({ email: "john.doe@example.com", password: "invalid" })
        .expect(401);

      assert.notEqual(res2.body.error, null);
    });
  });
});

it("should return the user information and a token for an existing user", async () => {
  const res = await request(server)
    .post("/auth/login")
    .send({ email: "john.doe@example.com", password: "password" })
    .expect(200);

  assert.notEqual(res.body.token, null);
  assert.notEqual(res.body.user, null);
  assert.equal(res.body.user.name, "John Doe");
  assert.equal(res.body.user.email, "john.doe@example.com");
});
