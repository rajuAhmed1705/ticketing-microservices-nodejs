import { EmployeeCreatedEvent, Publisher, Subjects } from "@shurjomukhi/common";

export class EmployeeCreatedPublisher extends Publisher<EmployeeCreatedEvent> {
  subject: Subjects.EmployeeCreated = Subjects.EmployeeCreated;
}
