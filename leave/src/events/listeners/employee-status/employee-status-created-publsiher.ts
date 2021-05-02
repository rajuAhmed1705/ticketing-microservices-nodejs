import {
  EmployeeStatusCreatedEvent,
  Listener,
  Subjects,
} from "@shurjomukhi/common";
import { Message } from "node-nats-streaming";
import { EmployeeStatus } from "../../../models/employee-status";
import { queueGroupName } from "../queue-group-name";

export class EmployeeStatusCreatedListener extends Listener<EmployeeStatusCreatedEvent> {
  subject: Subjects.EmployeeStatusCreated = Subjects.EmployeeStatusCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: EmployeeStatusCreatedEvent["data"], msg: Message) {
    const { id, status } = data;

    const employeeStatus = EmployeeStatus.build({
      id,
      status,
    });

    await employeeStatus.save();

    console.log(employeeStatus);

    msg.ack();
  }
}
