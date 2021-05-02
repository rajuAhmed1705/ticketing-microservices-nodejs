import {
  DesignationUpdatedEvent,
  Listener,
  Subjects,
} from "@shurjomukhi/common";
import { Message } from "node-nats-streaming";
import { Designation } from "../../../models/designation";
import { queueGroupName } from "../queue-group-name";

export class DesignationUpdatedListener extends Listener<DesignationUpdatedEvent> {
  subject: Subjects.DesignationUpdated = Subjects.DesignationUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: DesignationUpdatedEvent["data"], msg: Message) {
    const designation = await Designation.findByEvent(data);

    if (!designation) {
      throw new Error("designation not found");
    }

    const { title, remark, level } = data;

    designation.set({
      title,
      remark,
      level,
    });

    await designation.save();
    console.log(designation);

    msg.ack();
  }
}
