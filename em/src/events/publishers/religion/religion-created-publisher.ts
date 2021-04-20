import { Publisher, ReligionCreatedEvent, Subjects } from "@shurjomukhi/common";

export class ReligionCreatedPublisher extends Publisher<ReligionCreatedEvent> {
  subject: Subjects.ReligionCreated = Subjects.ReligionCreated;
}
