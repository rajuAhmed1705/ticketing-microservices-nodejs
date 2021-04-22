import { EmployeeDeletedEvent, Publisher, Subjects } from "@shurjomukhi/common";

export class EmployeeDeletedPublisher extends Publisher<EmployeeDeletedEvent> {
  subject: Subjects.EmployeeDeleted = Subjects.EmployeeDeleted;
}
