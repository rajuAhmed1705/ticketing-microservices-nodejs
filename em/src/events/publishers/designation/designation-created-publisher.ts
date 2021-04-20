import {
  Publisher,
  Subjects,
  DesignationCreatedEvent,
} from "@shurjomukhi/common";

export class DesignationCreatedPublisher extends Publisher<DesignationCreatedEvent> {
  subject: Subjects.DesignationCreated = Subjects.DesignationCreated;
}
