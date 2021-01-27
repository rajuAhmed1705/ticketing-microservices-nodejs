import {
    Publisher,
    Subjects,
    TicketUpdatedEvent,
} from "@shurjomukhi/ms-common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
