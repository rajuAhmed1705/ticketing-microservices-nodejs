import { Listener, ReligionCreatedEvent, Subjects } from "@shurjomukhi/common";
import { queueGroupName } from "../queue-group-name";
import { Message } from "node-nats-streaming";
import { Religion } from "../../../models/religion";

export class ReligionCreatedListener extends Listener<ReligionCreatedEvent> {
  subject: Subjects.ReligionCreated = Subjects.ReligionCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: ReligionCreatedEvent["data"], msg: Message) {
    const { id, name } = data;

    const religion = Religion.build({
      id,
      name,
    });

    await religion.save();

    console.log(religion);

    msg.ack();
  }
}
