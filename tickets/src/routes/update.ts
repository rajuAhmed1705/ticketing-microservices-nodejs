import express, { Request, Response } from "express";
import { Ticket } from "../models/ticket";
import { body } from "express-validator";
import {
    BadRequestError,
    NotAuthorizedError,
    NotFoundError,
    requireAuth,
    validateRequest,
} from "@shurjomukhi/ms-common";
import { TicketUpdatedPublisher } from "../events/publishers/ticket-updated-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

const valid = [
    body("title").not().isEmpty().withMessage("title is required"),
    body("price")
        .isFloat({ gt: 0 })
        .withMessage("price must be greater than 0"),
];

router.put(
    "/api/tickets/:id",
    requireAuth,
    valid,
    validateRequest,
    async (req: Request, res: Response) => {
        const ticket = await Ticket.findById(req.params.id);

        if (!ticket) {
            throw new NotFoundError();
        }

        if (ticket.userId !== req.currentUser!.id) {
            throw new NotAuthorizedError();
        }

        if (ticket.orderId) {
            throw new BadRequestError("cannot edit a reserved ticket");
        }

        ticket.set({
            title: req.body.title,
            price: req.body.price,
        });

        await ticket.save();

        new TicketUpdatedPublisher(natsWrapper.client).publish({
            id: ticket.id,
            version: ticket.version,
            title: ticket.title,
            price: ticket.price,
            userId: ticket.userId,
        });

        res.send(ticket);
    }
);

export { router as updateTicketRouter };
