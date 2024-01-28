import express, { Request, Response } from "express";
const router = express.Router();
import { Order } from "../models/orders";
import {
  requireAuth,
  NotAuthorizedError,
  NotFoundError,
} from "@shiv1610tickets/common";

router.get(
  "/api/orders/:orderId",
  requireAuth,
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.orderId).populate("ticket");

    if (!order) {
      throw new NotFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    res.send(order);
  }
);

export { router as showOrderRouter };
