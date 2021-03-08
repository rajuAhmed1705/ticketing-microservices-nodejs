import {
    BadRequestError,
    NotFoundError,
    validateRequest,
} from "@shurjomukhi/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Designation } from "../models/designation";

const router = express.Router();

const validationCheck = [
    body("title").exists().withMessage("title is required"),
    body("level").exists().withMessage("level is required").isInt({ gt: 0 }),
];

router.get(
    "/api/employee-management/designation",
    async (req: Request, res: Response) => {
        const designation = await Designation.find();

        res.status(200).send(designation);
    }
);

router.get(
    "/api/employee-management/designation/:id",
    async (req: Request, res: Response) => {
        const designation = await Designation.findById(req.params.id);

        if (!designation) {
            throw new NotFoundError();
        }

        res.status(200).send(designation);
    }
);

router.post(
    "/api/employee-management/designation",
    validationCheck,
    validateRequest,
    async (req: Request, res: Response) => {
        const { title, level, remark } = req.body;

        const existingDesignation = await Designation.findOne({ title });
        if (existingDesignation) {
            throw new BadRequestError("Designation exists");
        }

        const designation = Designation.build({
            title,
            level,
            remark,
        });

        await designation.save();

        res.status(201).send(designation);
    }
);

router.put(
    "/api/employee-management/designation/:id",
    validationCheck,
    validateRequest,
    async (req: Request, res: Response) => {
        const designation = await Designation.findById(req.params.id);

        if (!designation) {
            throw new NotFoundError();
        }

        const { title, level, remark } = req.body;

        const existingDesignation = await Designation.findOne({
            title,
            _id: { $ne: req.params.id },
        });
        if (existingDesignation) {
            throw new BadRequestError("Designation exists");
        }

        designation.set({
            title,
            remark,
            level,
        });
        await designation.save();

        res.status(200).send(designation);
    }
);

router.delete(
    "/api/employee-management/designation/:id",
    async (req: Request, res: Response) => {
        await Designation.findByIdAndDelete(req.params.id);
        res.status(200).send({});
    }
);

export { router as designationRouter };
