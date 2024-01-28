import {
  publisher,
  Subjects,
  TicketCreatedEvent,
} from "@shiv1610tickets/common";
export class TicketCreatedPublisher extends publisher<TicketCreatedEvent> {
  readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
