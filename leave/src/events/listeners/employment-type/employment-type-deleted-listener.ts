import {
  EmploymentTypeDeletedEvent,
  Listener,
  Subjects,
} from "@shurjomukhi/common";
import { Message } from "node-nats-streaming";
import { EmploymentType } from "../../../models/employment-type";
import { queueGroupName } from "../queue-group-name";

export class EmploymentTypeDeletedListener extends Listener<EmploymentTypeDeletedEvent> {
  subject: Subjects.EmploymentTypeDeleted = Subjects.EmploymentTypeDeleted;
  queueGroupName = queueGroupName;

  async onMessage(data: EmploymentTypeDeletedEvent["data"], msg: Message) {
    await EmploymentType.findByIdAndDelete(data.id);

    msg.ack();
  }
}
