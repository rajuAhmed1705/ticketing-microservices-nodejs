import {
  DepartmentCreatedEvent,
  Listener,
  Subjects,
} from "@shurjomukhi/common";
import { queueGroupName } from "../queue-group-name";
import { Message } from "node-nats-streaming";
import { Department } from "../../../models/department";

export class DepartmentCreatedListener extends Listener<DepartmentCreatedEvent> {
  subject: Subjects.DepartmentCreated = Subjects.DepartmentCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: DepartmentCreatedEvent["data"], msg: Message) {
    const { id, title, code, remark } = data;

    const department = Department.build({
      id,
      title,
      code,
      remark,
    });

    await department.save();

    console.log(department);

    msg.ack();
  }
}
