import { OrderCancelledEvent } from "@shurjomukhi/ms-common";
import { Ticket } from "../../../models/ticket";
import { natsWrapper } from "../../../nats-wrapper";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { OrderCancelledListener } from "../order-cancelled-listener";

const setup = async () => {
    const listener = new OrderCancelledListener(natsWrapper.client);

    const orderId = mongoose.Types.ObjectId().toHexString();

    const ticket = Ticket.build({
        title: "concert",
        price: 99,
        userId: "asdf",
    });

    ticket.set({ orderId });

    await ticket.save();

    const data: OrderCancelledEvent["data"] = {
        id: orderId,
        version: 0,
        ticket: {
            id: ticket.id,
        },
    };

    //@ts-ignore
    const msg: Message = {
        ack: jest.fn(),
    };

    return {
        listener,
        ticket,
        data,
        msg,
        orderId,
    };
};

it("updates the ticket, publishes an event and ack the message", async () => {
    const { listener, ticket, msg, data } = await setup();

    await listener.onMessage(data, msg);

    const updatedTicket = await Ticket.findById(ticket.id);

    expect(updatedTicket?.orderId).not.toBeDefined();
    expect(msg.ack).toHaveBeenCalled();
    expect(natsWrapper.client.publish).toHaveBeenCalled();
});
