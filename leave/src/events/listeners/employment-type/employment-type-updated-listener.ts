import {
  EmploymentTypeUpdatedEvent,
  Listener,
  Subjects,
} from "@shurjomukhi/common";
import { Message } from "node-nats-streaming";
import { EmploymentType } from "../../../models/employment-type";
import { queueGroupName } from "../queue-group-name";

export class EmploymentTypeUpdatedListener extends Listener<EmploymentTypeUpdatedEvent> {
  subject: Subjects.EmploymentTypeUpdated = Subjects.EmploymentTypeUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: EmploymentTypeUpdatedEvent["data"], msg: Message) {
    const { name, remark } = data;

    const employmentType = await EmploymentType.findByEvent(data);

    if (!employmentType) {
      throw new Error("employment type not found");
    }

    employmentType.set({ name, remark });

    await employmentType.save();
    console.log(employmentType);

    msg.ack();
  }
}
