import {
  EmployeeStatusDeletedEvent,
  Listener,
  Subjects,
} from "@shurjomukhi/common";
import { Message } from "node-nats-streaming";
import { EmployeeStatus } from "../../../models/employee-status";
import { queueGroupName } from "../queue-group-name";

export class EmployeeStatusDeletedListener extends Listener<EmployeeStatusDeletedEvent> {
  subject: Subjects.EmployeeStatusDeleted = Subjects.EmployeeStatusDeleted;
  queueGroupName = queueGroupName;

  async onMessage(data: EmployeeStatusDeletedEvent["data"], msg: Message) {
    const { id } = data;

    await EmployeeStatus.findByIdAndDelete(id);

    msg.ack();
  }
}
