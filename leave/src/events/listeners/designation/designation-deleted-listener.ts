import {
  DesignationDeletedEvent,
  Listener,
  Subjects,
} from "@shurjomukhi/common";
import { queueGroupName } from "../queue-group-name";
import { Message } from "node-nats-streaming";
import { Designation } from "../../../models/designation";

export class DesignationDeletedListener extends Listener<DesignationDeletedEvent> {
  subject: Subjects.DesignationDeleted = Subjects.DesignationDeleted;
  queueGroupName = queueGroupName;

  async onMessage(data: DesignationDeletedEvent["data"], msg: Message) {
    const { id } = data;

    const designation = await Designation.findByIdAndDelete(id);

    console.log(designation);

    msg.ack();
  }
}
