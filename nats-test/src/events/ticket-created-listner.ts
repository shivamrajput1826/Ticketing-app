import { listener } from "./base-listner";
import { Message } from "node-nats-streaming";
import { Subjects } from "./subject";
import { TicketCreatedEvent } from "./ticket-create-event";
export class TicketCreatedListener extends listener<TicketCreatedEvent> {
  readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = "payment-service";
  onMessage(data: TicketCreatedEvent["data"], msg: Message): void {
    console.log("event data!", data);
    msg.ack();
  }
}
