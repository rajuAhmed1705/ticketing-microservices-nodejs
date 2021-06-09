import express, { Request, Response } from "express";
import { requireAuth, validateRequest } from "@shurjomukhi/ms-common";
import { body } from "express-validator";
import { Ticket } from "../models/ticket";
import { TicketCreatedPublisher } from "../events/publishers/ticket-created-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

const valid = [
    body("title").not().isEmpty().withMessage("title is required"),
    body("price")
        .isFloat({ gt: 0 })
        .withMessage("price must be greater than 0"),
];

router.post(
    "/api/tickets",
    requireAuth,
    valid,
    validateRequest,
    async (req: Request, res: Response) => {
        const { title, price } = req.body;
        const ticket = Ticket.build({
            title,
            price,
            userId: req.currentUser!.id,
        });
        await ticket.save();

        await new TicketCreatedPublisher(natsWrapper.client).publish({
            id: ticket.id,
            version: ticket.version,
            title: ticket.title,
            price: ticket.price,
            userId: ticket.userId,
        });

        res.status(201).send(ticket);
    }
);

export { router as createTicketRouter };