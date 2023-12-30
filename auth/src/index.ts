import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT key is not defined");
  }
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("connected to auth mongo");
  } catch (err) {
    console.log("err while connecting auth-db", err);
  }
  app.listen(3000, () => {
    console.log("Listening on Port 3000!!!");
  });
};

start();
