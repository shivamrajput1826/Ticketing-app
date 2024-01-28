import {
  OrderCancelledEvent,
  publisher,
  Subjects,
} from "@shiv1610tickets/common";

export class OrderCancelledPublisher extends publisher<OrderCancelledEvent> {
  readonly subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
