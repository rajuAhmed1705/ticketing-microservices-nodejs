import {
  EmploymentTypeDeletedEvent,
  Publisher,
  Subjects,
} from "@shurjomukhi/common";

export class EmploymentTypeDeletedPublisher extends Publisher<EmploymentTypeDeletedEvent> {
  subject: Subjects.EmploymentTypeDeleted = Subjects.EmploymentTypeDeleted;
}
