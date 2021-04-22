import { EmployeeDeletedEvent, Listener, Subjects } from "@shurjomukhi/common";
import { Message } from "node-nats-streaming";
import { Employee } from "../../../models/employee";
import { queueGroupName } from "../queue-group-name";

export class EmployeeDeletedListener extends Listener<EmployeeDeletedEvent> {
  subject: Subjects.EmployeeDeleted = Subjects.EmployeeDeleted;
  queueGroupName = queueGroupName;

  async onMessage(data: EmployeeDeletedEvent["data"], msg: Message) {
    await Employee.findByIdAndDelete(data.id);

    msg.ack();
  }
}
