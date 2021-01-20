import express, { Request, Response } from "express";
import { Ticket } from "../models/ticket";
import { body } from "express-validator";
import {
    NotAuthorizedError,
    NotFoundError,
    requireAuth,
    validateRequest,
} from "@shurjomukhi/ms-common";

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

        ticket.set({
            title: req.body.title,
            price: req.body.price,
        });

        await ticket.save();

        res.send(ticket);
    }
);

export { router as updateTicketRouter };
