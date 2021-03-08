import {
    BadRequestError,
    NotFoundError,
    validateRequest,
} from "@shurjomukhi/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { EmploymentType } from "../models/employment-type";

const router = express.Router();

const validationCheck = [
    body("name").exists().withMessage("name field is required"),
];

router.get(
    "/api/employee-management/employment-type",
    async (req: Request, res: Response) => {
        const employmentType = await EmploymentType.find();

        res.status(200).send(employmentType);
    }
);

router.get(
    "/api/employee-management/employment-type/:id",
    async (req: Request, res: Response) => {
        const employmentType = await EmploymentType.findById(req.params.id);

        if (!employmentType) {
            throw new NotFoundError();
        }

        res.status(200).send(employmentType);
    }
);

router.post(
    "/api/employee-management/employment-type",
    validationCheck,
    validateRequest,
    async (req: Request, res: Response) => {
        const { name, remark } = req.body;

        const existingEmploymentType = await EmploymentType.findOne({ name });
        if (existingEmploymentType) {
            throw new BadRequestError("employment type exists");
        }

        const employmentType = EmploymentType.build({
            name,
            remark,
        });

        await employmentType.save();

        res.status(201).send(employmentType);
    }
);

router.put(
    "/api/employee-management/employment-type/:id",
    validationCheck,
    validateRequest,
    async (req: Request, res: Response) => {
        const employmentType = await EmploymentType.findById(req.params.id);

        if (!employmentType) {
            throw new NotFoundError();
        }

        const { name, remark } = req.body;

        const existingEmploymentType = await EmploymentType.findOne({
            name,
            _id: { $ne: req.params.id },
        });
        if (existingEmploymentType) {
            throw new BadRequestError("employment type already exists");
        }

        employmentType.set({
            name,
            remark,
        });
        await employmentType.save();

        res.status(200).send(employmentType);
    }
);

router.delete(
    "/api/employee-management/employment-type/:id",
    async (req: Request, res: Response) => {
        await EmploymentType.findByIdAndDelete(req.params.id);
        res.status(200).send({});
    }
);

export { router as employmentTypeRouter };
