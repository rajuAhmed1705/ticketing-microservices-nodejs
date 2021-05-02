import { EmployeeUpdatedEvent, Publisher, Subjects } from "@shurjomukhi/common";

export class EmployeeUpdatedPublisher extends Publisher<EmployeeUpdatedEvent> {
  subject: Subjects.EmployeeUpdated = Subjects.EmployeeUpdated;
}
