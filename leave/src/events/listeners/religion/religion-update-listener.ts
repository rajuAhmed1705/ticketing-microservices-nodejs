import { Listener, ReligionUpdatedEvent, Subjects } from "@shurjomukhi/common";
import { queueGroupName } from "../queue-group-name";
import { Message } from "node-nats-streaming";
import { Religion } from "../../../models/religion";

export class ReligionUpdatedListener extends Listener<ReligionUpdatedEvent> {
  subject: Subjects.ReligionUpdated = Subjects.ReligionUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: ReligionUpdatedEvent["data"], msg: Message) {
    const religion = await Religion.findByEvent(data);

    if (!religion) {
      throw new Error("religion not found");
    }
    const { name } = data;

    religion.set({ name });

    await religion.save();

    console.log(religion);

    msg.ack();
  }
}
