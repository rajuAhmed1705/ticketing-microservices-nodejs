import {
  DepartmentUpdatedEvent,
  Publisher,
  Subjects,
} from "@shurjomukhi/common";

export class DepartmentUpdatedPublisher extends Publisher<DepartmentUpdatedEvent> {
  subject: Subjects.DepartmentUpdated = Subjects.DepartmentUpdated;
}
