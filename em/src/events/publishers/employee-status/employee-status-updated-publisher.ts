import {
  EmployeeStatusUpdatedEvent,
  Publisher,
  Subjects,
} from "@shurjomukhi/common";

export class EmployeeStatusUpdatedPublisher extends Publisher<EmployeeStatusUpdatedEvent> {
  subject: Subjects.EmployeeStatusUpdated = Subjects.EmployeeStatusUpdated;
}
