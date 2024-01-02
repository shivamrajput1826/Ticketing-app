import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("returns a 404 if the provided id does not exist", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", global.ticketJwt())
    .send({ title: "asdf", price: 20 })
    .expect(404);
});

it("returns a 401 if the user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({ title: "asdf", price: 20 })
    .expect(401);
});

it("returns a 401 if the user does not own ticket", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.ticketJwt())
    .send({
      title: "asdfasf",
      price: 20,
    });
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", global.ticketJwt())
    .send({
      title: "11323",
      price: 20,
    })
    .expect(401);
});

it("returns a 404 if the provided invalid price or title", async () => {
  const cookie = global.ticketJwt();
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title: "asdfasf",
      price: 20,
    });
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "asdfasf",
      price: -10,
    })
    .expect(400);
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "2",
      price: 20,
    })
    .expect(400);
});

it("updates the tickets provided valid inputs", async () => {});
