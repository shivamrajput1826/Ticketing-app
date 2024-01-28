import { Message } from "node-nats-streaming";
import {
  Subjects,
  listener,
  TicketUpdatedEvent,
} from "@shiv1610tickets/common";
import { Ticket } from "../../models/ticket";
import { queueGroupName } from "./queue-group-name";

export class TicketUpdatesListener extends listener<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
  queueGroupName: string = queueGroupName;
  async onMessage(data: TicketUpdatedEvent["data"], msg: Message) {
    const ticket = await Ticket.findByEvent(data);
    if (!ticket) {
      throw new Error("Ticket not found");
    }
    const { title, price } = data;
    ticket.set({ title, price });
    await ticket.save();
    msg.ack();
  }
}
