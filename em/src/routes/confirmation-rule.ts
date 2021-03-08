import {
    BadRequestError,
    NotFoundError,
    validateRequest,
} from "@shurjomukhi/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { ConfirmationRule } from "../models/confirmation-rule";

const router = express.Router();

const validationCheck = [body("ruleName").exists()];

router.get(
    "/api/employee-management/confirmation-rule",
    async (req: Request, res: Response) => {
        const data = await ConfirmationRule.find();

        res.status(200).send(data);
    }
);

router.get(
    "/api/employee-management/confirmation-rule/:id",
    async (req: Request, res: Response) => {
        const data = await ConfirmationRule.findById(req.params.id);

        if (!data) {
            throw new NotFoundError();
        }

        res.status(200).send(data);
    }
);

router.post(
    "/api/employee-management/confirmation-rule",
    validationCheck,
    validateRequest,
    async (req: Request, res: Response) => {
        const { ruleName } = req.body;

        const existingRule = await ConfirmationRule.findOne({ ruleName });
        if (existingRule) {
            throw new BadRequestError("rule exists");
        }

        const data = ConfirmationRule.build({
            ruleName,
        });

        await data.save();

        res.status(201).send(data);
    }
);

router.put(
    "/api/employee-management/confirmation-rule/:id",
    validationCheck,
    validateRequest,
    async (req: Request, res: Response) => {
        const data = await ConfirmationRule.findById(req.params.id);

        if (!data) {
            throw new NotFoundError();
        }

        const { ruleName } = req.body;
        const existingRule = await ConfirmationRule.findOne({
            ruleName,
            _id: {
                $ne: req.params.id,
            },
        });
        if (existingRule) {
            throw new BadRequestError("rule exists");
        }

        data.set({
            ruleName,
        });
        await data.save();

        res.status(200).send(data);
    }
);

router.delete(
    "/api/employee-management/confirmation-rule/:id",
    async (req: Request, res: Response) => {
        await ConfirmationRule.findByIdAndDelete(req.params.id);
        res.status(200).send({});
    }
);

export { router as confirmationRuleRouter };
