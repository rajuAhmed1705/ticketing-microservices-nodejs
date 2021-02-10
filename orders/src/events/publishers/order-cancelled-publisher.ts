import {
    OrderCancelledEvent,
    Publisher,
    Subjects,
} from "@shurjomukhi/ms-common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
