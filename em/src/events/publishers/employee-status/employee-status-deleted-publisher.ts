import {
  EmployeeStatusDeletedEvent,
  Publisher,
  Subjects,
} from "@shurjomukhi/common";

export class EmployeeStatusDeletedPublisher extends Publisher<EmployeeStatusDeletedEvent> {
  subject: Subjects.EmployeeStatusDeleted = Subjects.EmployeeStatusDeleted;
}
