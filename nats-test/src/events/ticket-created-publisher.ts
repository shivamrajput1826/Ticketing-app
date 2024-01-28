import { publisher } from "./base-publisher";
import { TicketCreatedEvent } from "./ticket-create-event";
import { Subjects } from "./subject";

export class TicketCreatedPublisher extends publisher<TicketCreatedEvent> {
  readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
