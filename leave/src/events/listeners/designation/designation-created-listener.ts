import {
  DesignationCreatedEvent,
  Listener,
  Subjects,
} from "@shurjomukhi/common";
import { Message } from "node-nats-streaming";
import { Designation } from "../../../models/designation";
import { queueGroupName } from "../queue-group-name";

export class DesignationCreatedListener extends Listener<DesignationCreatedEvent> {
  subject: Subjects.DesignationCreated = Subjects.DesignationCreated;
  queueGroupName = queueGroupName;
  async onMessage(data: DesignationCreatedEvent["data"], msg: Message) {
    const { id, title, level, remark } = data;

    const designation = Designation.build({
      id,
      title,
      level,
      remark,
    });

    await designation.save();

    console.log(designation);

    msg.ack();
  }
}
