import {
  EmploymentTypeUpdatedEvent,
  Publisher,
  Subjects,
} from "@shurjomukhi/common";

export class EmploymentTypeUpdatedPublisher extends Publisher<EmploymentTypeUpdatedEvent> {
  subject: Subjects.EmploymentTypeUpdated = Subjects.EmploymentTypeUpdated;
}
