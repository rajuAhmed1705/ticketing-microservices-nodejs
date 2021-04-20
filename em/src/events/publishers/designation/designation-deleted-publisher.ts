import {
  Publisher,
  Subjects,
  DesignationDeletedEvent,
} from "@shurjomukhi/common";

export class DesignationDeletedPublisher extends Publisher<DesignationDeletedEvent> {
  subject: Subjects.DesignationDeleted = Subjects.DesignationDeleted;
}
