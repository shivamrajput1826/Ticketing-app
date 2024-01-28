import {
  Subjects,
  publisher,
  OrderCreatedEvent,
} from "@shiv1610tickets/common";

export class OrderCreatePublisher extends publisher<OrderCreatedEvent> {
  readonly subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
