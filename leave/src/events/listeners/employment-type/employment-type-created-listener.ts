import {
  EmploymentTypeCreatedEvent,
  Listener,
  Subjects,
} from "@shurjomukhi/common";
import { Message } from "node-nats-streaming";
import { EmploymentType } from "../../../models/employment-type";
import { queueGroupName } from "../queue-group-name";

export class EmploymentTypeCreatedListener extends Listener<EmploymentTypeCreatedEvent> {
  subject: Subjects.EmploymentTypeCreated = Subjects.EmploymentTypeCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: EmploymentTypeCreatedEvent["data"], msg: Message) {
    const { id, name, remark } = data;

    const employmentType = EmploymentType.build({
      id,
      name,
      remark,
    });

    await employmentType.save();

    console.log(employmentType);

    msg.ack();
  }
}
