import express, { Request, Response } from "express";
import { requireAuth, validateRequest } from "@shiv1610tickets/common";
import { body } from "express-validator";
import { Ticket } from "../model/ticket";
const router = express.Router();
router.post(
  "/api/tickets",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than zero"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;
    const ticket = Ticket.build({
      title,
      price,
      userId: req.currentUser!.id,
    });
    console.log("ticket", ticket);
    await ticket.save();
    res.status(201).send(ticket);
  }
);

export { router as createTicketRouter };
