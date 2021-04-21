import {
  EmployeeStatusUpdatedEvent,
  Listener,
  Subjects,
} from "@shurjomukhi/common";
import { Message } from "node-nats-streaming";
import { EmployeeStatus } from "../../../models/employee-status";
import { queueGroupName } from "../queue-group-name";

export class EmployeeStatusUpdatedListener extends Listener<EmployeeStatusUpdatedEvent> {
  subject: Subjects.EmployeeStatusUpdated = Subjects.EmployeeStatusUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: EmployeeStatusUpdatedEvent["data"], msg: Message) {
    const employeeStatus = await EmployeeStatus.findByEvent(data);

    if (!employeeStatus) {
      throw new Error("employee status not found");
    }
    const { status } = data;
    employeeStatus.set({
      status,
    });

    await employeeStatus.save();
    console.log(employeeStatus);

    msg.ack();
  }
}
