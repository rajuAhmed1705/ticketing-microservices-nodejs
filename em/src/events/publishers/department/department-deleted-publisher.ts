import {
  DepartmentDeletedEvent,
  Publisher,
  Subjects,
} from "@shurjomukhi/common";

export class DepartmentDeletedPublisher extends Publisher<DepartmentDeletedEvent> {
  subject: Subjects.DepartmentDeleted = Subjects.DepartmentDeleted;
}
