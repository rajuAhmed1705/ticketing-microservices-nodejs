import {
  DepartmentUpdatedEvent,
  Listener,
  Subjects,
} from "@shurjomukhi/common";
import { Message } from "node-nats-streaming";
import { Department } from "../../../models/department";
import { queueGroupName } from "../queue-group-name";

export class DepartmentUpdatedListener extends Listener<DepartmentUpdatedEvent> {
  subject: Subjects.DepartmentUpdated = Subjects.DepartmentUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: DepartmentUpdatedEvent["data"], msg: Message) {
    const department = await Department.findByEvent(data);

    if (!department) {
      throw new Error("department not found");
    }

    const { title, remark, code } = data;

    department.set({ title, remark, code });

    await department.save();

    console.log(department);

    msg.ack();
  }
}
