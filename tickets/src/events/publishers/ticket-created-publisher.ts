import {
    Publisher,
    Subjects,
    TicketCreatedEvent,
} from "@shurjomukhi/ms-common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
