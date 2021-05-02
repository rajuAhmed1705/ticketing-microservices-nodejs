import { Listener, ReligionDeletedEvent, Subjects } from "@shurjomukhi/common";
import { queueGroupName } from "../queue-group-name";
import { Message } from "node-nats-streaming";
import { Religion } from "../../../models/religion";

export class ReligionDeletedListener extends Listener<ReligionDeletedEvent> {
  subject: Subjects.ReligionDeleted = Subjects.ReligionDeleted;
  queueGroupName = queueGroupName;

  async onMessage(data: ReligionDeletedEvent["data"], msg: Message) {
    const { id } = data;

    const religion = await Religion.findByIdAndDelete(id);

    console.log(religion);

    msg.ack();
  }
}
