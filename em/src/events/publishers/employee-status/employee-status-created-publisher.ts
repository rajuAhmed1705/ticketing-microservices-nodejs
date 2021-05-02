import {
  EmployeeStatusCreatedEvent,
  Publisher,
  Subjects,
} from "@shurjomukhi/common";

export class EmployeeStatusCreatedPublisher extends Publisher<EmployeeStatusCreatedEvent> {
  subject: Subjects.EmployeeStatusCreated = Subjects.EmployeeStatusCreated;
}
