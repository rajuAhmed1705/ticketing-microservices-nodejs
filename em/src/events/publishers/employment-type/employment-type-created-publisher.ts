import {
  EmploymentTypeCreatedEvent,
  Publisher,
  Subjects,
} from "@shurjomukhi/common";

export class EmploymentTypeCreatedPublisher extends Publisher<EmploymentTypeCreatedEvent> {
  subject: Subjects.EmploymentTypeCreated = Subjects.EmploymentTypeCreated;
}
