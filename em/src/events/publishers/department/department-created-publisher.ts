import {
  DepartmentCreatedEvent,
  Publisher,
  Subjects,
} from "@shurjomukhi/common";

export class DepartmentCreatedPublisher extends Publisher<DepartmentCreatedEvent> {
  subject: Subjects.DepartmentCreated = Subjects.DepartmentCreated;
}
