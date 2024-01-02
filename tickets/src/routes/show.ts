import express, { Request, Response } from "express";
import { Ticket } from "../model/ticket";
import { NotFoundError } from "@shiv1610tickets/common";

const router = express.Router();

router.get("/api/tickets/:id", async (req: Request, res: Response) => {
  const tickets = await Ticket.findById(req.params.id);
  if (!tickets) {
    throw new NotFoundError();
  }
  res.send(tickets);
});

export { router as showTicketRouter };
