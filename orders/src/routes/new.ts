import express, { Request, Response } from "express";
import {
    BadRequestError,
    NotFoundError,
    OrderStatus,
    requireAuth,
    validateRequest,
} from "@shurjomukhi/ms-common";
import { body } from "express-validator";
import { Types } from "mongoose";
import { Ticket } from "../models/ticket";
import { Order } from "../models/order";
import { OrderCreatedPublisher } from "../events/publishers/order-created-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

const EXPIRATION_WINDOW_SECONDS = 2 * 60;

const valid = [
    body("ticketId")
        .not()
        .isEmpty()
        .custom((input: string) => Types.ObjectId.isValid(input))
        .withMessage("Ticket Id must be provided"),
];

router.post(
    "/api/orders",
    requireAuth,
    valid,
    validateRequest,
    async (req: Request, res: Response) => {
        const { ticketId } = req.body;

        const ticket = await Ticket.findById(ticketId);
        if (!ticket) {
            throw new NotFoundError();
        }

        const isReserved = await ticket.isReserved();

        if (isReserved) {
            throw new BadRequestError("Ticket is already reserved");
        }

        const expiration = new Date();

        expiration.setSeconds(
            expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS
        );

        const order = Order.build({
            userId: req.currentUser!.id,
            status: OrderStatus.Created,
            expiresAt: expiration,
            ticket,
        });

        await order.save();

        new OrderCreatedPublisher(natsWrapper.client).publish({
            id: order.id,
            version: order.version,
            status: order.status,
            userId: order.userId,
            expiresAt: order.expiresAt.toISOString(),
            ticket: {
                id: ticket.id,
                price: ticket.price.toString(),
            },
        });

        res.status(201).send(order);
    }
);

export { router as newOrderRouter };
