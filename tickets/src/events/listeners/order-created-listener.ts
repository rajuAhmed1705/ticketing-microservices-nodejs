import {
    Listener,
    NotFoundError,
    OrderCreatedEvent,
    Subjects,
} from "@shurjomukhi/ms-common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
        //find the ticket that the order is reserving
        const ticket = await Ticket.findById(data.ticket.id);

        //if no ticket throw new error
        if (!ticket) {
            throw new NotFoundError();
        }

        //mark the ticket as being reserved by setting the orderId
        ticket.set({ orderId: data.id });

        //save the ticket
        await ticket.save();
        await new TicketUpdatedPublisher(this.client).publish({
            id: ticket.id,
            price: ticket.price,
            title: ticket.title,
            userId: ticket.userId,
            orderId: ticket.orderId,
            version: ticket.version,
        });

        //ack the message
        msg.ack();
    }
}
