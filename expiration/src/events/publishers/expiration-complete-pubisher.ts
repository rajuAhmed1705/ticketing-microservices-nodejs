import {
    Publisher,
    ExpirationCompleteEvent,
    Subjects,
} from "@shurjomukhi/ms-common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    subject: Subjects.expirationComplete = Subjects.expirationComplete;
}
