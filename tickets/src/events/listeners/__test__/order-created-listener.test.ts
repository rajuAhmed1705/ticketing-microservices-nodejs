import { OrderCreatedEvent, OrderStatus } from "@shurjomukhi/ms-common";
import { Ticket } from "../../../models/ticket";
import { natsWrapper } from "../../../nats-wrapper";
import { OrderCreatedListener } from "../order-created-listener";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";

const setup = async () => {
    const listener = new OrderCreatedListener(natsWrapper.client);

    const ticket = Ticket.build({
        title: "concert",
        price: 99,
        userId: "asdf",
    });

    await ticket.save();

    const data: OrderCreatedEvent["data"] = {
        id: mongoose.Types.ObjectId().toHexString(),
        version: 0,
        status: OrderStatus.Created,
        userId: "aswskk",
        expiresAt: "kskksskksk",
        ticket: {
            id: ticket.id,
            price: ticket.price.toString(),
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
    };
};

it("sets the userId of the ticket", async () => {
    const { listener, ticket, msg, data } = await setup();

    await listener.onMessage(data, msg);

    const updatedTicket = await Ticket.findById(ticket.id);

    expect(updatedTicket?.orderId).toEqual(data.id);
});

it("calls the ack message", async () => {
    const { listener, msg, data } = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
});

it("publishes a event if ticket is updated", async () => {
    const { listener, msg, data } = await setup();

    await listener.onMessage(data, msg);

    expect(natsWrapper.client.publish).toHaveBeenCalled();

    const ticketUpdatedData = JSON.parse(
        (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
    );

    expect(data.id).toEqual(ticketUpdatedData.orderId);
});
