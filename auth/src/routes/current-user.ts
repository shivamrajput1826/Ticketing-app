import express from "express";
import { currentUser } from "@shiv1610tickets/common";
const router = express.Router();

router.get("/api/users/currentUser", currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
