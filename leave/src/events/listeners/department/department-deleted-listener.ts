import { queueGroupName } from "../queue-group-name";
import { Message } from "node-nats-streaming";
import {
  DepartmentDeletedEvent,
  Listener,
  Subjects,
} from "@shurjomukhi/common";
import { Department } from "../../../models/department";

export class DepartmentDeletedListener extends Listener<DepartmentDeletedEvent> {
  subject: Subjects.DepartmentDeleted = Subjects.DepartmentDeleted;
  queueGroupName = queueGroupName;

  async onMessage(data: DepartmentDeletedEvent["data"], msg: Message) {
    const { id } = data;

    const department = await Department.findByIdAndDelete(id);

    console.log(department);

    msg.ack();
  }
}
