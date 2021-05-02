import { Publisher, ReligionDeletedEvent, Subjects } from "@shurjomukhi/common";

export class ReligionDeletedPublisher extends Publisher<ReligionDeletedEvent> {
  subject: Subjects.ReligionDeleted = Subjects.ReligionDeleted;
}
