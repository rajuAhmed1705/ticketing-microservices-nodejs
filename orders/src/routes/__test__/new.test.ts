import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import { Order, OrderStatus } from "../../models/order";

it("returns an error if the ticket does not exists", async () => {
    const ticketId = mongoose.Types.ObjectId();
    await request(app)
        .post("/api/orders")
        .set("Cookie", global.signin())
        .send({ ticketId })
        .expect(404);
});

it("returns an error if the ticket is already reserved", async () => {
    const ticket = Ticket.build({
        title: "helo",
        price: 20,
    });
    await ticket.save();

    const order = Order.build({
        ticket,
        userId: "jjehheej",
        status: OrderStatus.Created,
        expiresAt: new Date(),
    });

    await order.save();

    await request(app)
        .post("/api/orders")
        .set("Cookie", global.signin())
        .send({ ticketid: ticket.id })
        .expect(400);
});

it("reserves the ticket", async () => {
    const ticket = Ticket.build({
        title: "helo",
        price: 20,
    });
    await ticket.save();

    await request(app)
        .post("/api/orders")
        .set("Cookie", global.signin())
        .send({ ticketId: ticket.id })
        .expect(201);
});

it.todo("emits an order created event");
