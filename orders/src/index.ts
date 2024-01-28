import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";
import { TicketCreatedEvent } from "@shiv1610tickets/common";
import { TicketUpdatedEvent } from "@shiv1610tickets/common";
import { TicketCreatedListener } from "./events/listeners/ticket-created-listener";
import { TicketUpdatesListener } from "./events/listeners/ticket-updated-listeners";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT key is not defined");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("mongo url must be defined");
  }
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("NATS_CLIENT_ID must be defined");
  }
  if (!process.env.NATS_URL) {
    throw new Error("NATS_URL must be defined");
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("NATS_CLUSTER_ID must be defined");
  }
  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed!");
      process.exit();
    });
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());
    new TicketCreatedListener(natsWrapper.client).listen();
    new TicketUpdatesListener(natsWrapper.client).listen();
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to auth mongo");
  } catch (err) {
    console.log("err while connecting auth-db", err);
  }
  app.listen(3000, () => {
    console.log("Listening on Port 3000!!!");
  });
};

start();
