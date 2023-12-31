import request from "supertest";
import { app } from "../../app";

it("return a 201 on successfull signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@gmail.com",
      password: "12345",
    })
    .expect(201);
});

it("return a 400 on invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test",
      password: "12345",
    })
    .expect(400);
});

it("return a 400 on invalid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@gmail.com",
      password: "1",
    })
    .expect(400);
});

it("return a 400 on missing email and password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@gmal.cpm",
      password: "",
    })
    .expect(400);
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "",
      password: "12345",
    })
    .expect(400);
});

it("disallows duplicate emails", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@gmail.com", password: "12345" })
    .expect(201);
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@gmail.com", password: "12345" })
    .expect(400);
});

it("sets a cookie after successful signup", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({ email: "test@gmail.com", password: "12345" })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
