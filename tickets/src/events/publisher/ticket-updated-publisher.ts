import {
  publisher,
  Subjects,
  TicketUpdatedEvent,
} from "@shiv1610tickets/common";
export class TicketUpdatedPublisher extends publisher<TicketUpdatedEvent> {
  readonly subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
