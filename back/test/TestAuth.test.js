const assert = require("assert");
const request = require("supertest");

const server = require("../index.js");
const { createDB } = require("../config/createDB.js");

const goodUser = [{
  name: "John Doe5",
  email: "john6.doe@example.com",
  password: "password",
}];

const badUser = [{
  name: "John Doe5",
  email: "", // email missing
  password: "password",
}, {
  name: "John Doe5",
  email: "john6.doe@example.com", // already exist
  password: "password",
}, {
  name: "John Doe5",
  email: "notFound@example.com", // already exist
  password: "password",
}, {
  name: "John Doe5",
  email: "john6.doe@example.com", // already exist
  password: "badPassword",
}];

before(async () => {
  await createDB();
});

describe("Auth", () => {

  describe("POST /auth/signup", () => {

    it("should create a new user and return a token", async () => {
      const res = await request(server) // Utiliser l'objet server ici
        .post("/auth/signup")
        .send({
          name: goodUser[0].name,
          email: goodUser[0].email,
          password: goodUser[0].password,
        })
        .expect(200);

      assert.notEqual(res.body.token, null);
    });

    it('should return an error 400 : email or password missing', async function () {
      await request(server)
        .post("/auth/signup")
        .send({
          name: badUser[0].name,
          email: badUser[0].email,
          password: badUser[0].password,
        })
        .expect(400);
    });

    it('should return an error 401 : already exist', async function () {
      await request(server)
        .post("/auth/signup")
        .send({
          name: badUser[1].name,
          email: badUser[1].email,
          password: badUser[1].password,
        })
        .expect(409);
    });
  });

  describe("POST /auth/login", () => {

    it("should return a token for an existing user", async () => {
      const res = await request(server) // Utiliser l'objet server ici
        .post("/auth/login")
        .send({ email: goodUser[0].email, password: goodUser[0].password })
        .expect(200);

        assert.notEqual(res.body.token, null);
        assert.notEqual(res.body.user, null);
        assert.equal(res.body.user.name, goodUser[0].name);
        assert.equal(res.body.user.email, goodUser[0].email);
    });

    it('should return error 400 : email or password missing', async () => {
      await request(server)
        .post("/auth/login")
        .send({
          name: badUser[0].name,
          email: badUser[0].email,
          password: badUser[0].password,
        })
        .expect(400);
    });

    it("should return an error for an invalid email or password", async () => {

      await request(server) // Utiliser l'objet server ici
        .post("/auth/login")
        .send({ email: badUser[2].email, password: badUser[2].password })
        .expect(401);

      await request(server) // Utiliser l'objet server ici
        .post("/auth/login")
        .send({ email: badUser[3].email, password: badUser[3].password })
        .expect(401);
    });
  });
});

after(async () => {
  await createDB();
});