import {
  Publisher,
  Subjects,
  DesignationUpdatedEvent,
} from "@shurjomukhi/common";

export class DesignationUpdatedPublisher extends Publisher<DesignationUpdatedEvent> {
  subject: Subjects.DesignationUpdated = Subjects.DesignationUpdated;
}
