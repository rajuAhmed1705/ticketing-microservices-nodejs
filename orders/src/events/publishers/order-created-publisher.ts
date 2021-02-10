import { OrderCreatedEvent, Publisher, Subjects } from "@shurjomukhi/ms-common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
