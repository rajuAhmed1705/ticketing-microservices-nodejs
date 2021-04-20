import { Publisher, ReligionUpdatedEvent, Subjects } from "@shurjomukhi/common";

export class ReligionUpdatedPublisher extends Publisher<ReligionUpdatedEvent> {
  subject: Subjects.ReligionUpdated = Subjects.ReligionUpdated;
}
