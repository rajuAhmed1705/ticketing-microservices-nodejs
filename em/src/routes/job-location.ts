import {
    BadRequestError,
    NotFoundError,
    validateRequest,
} from "@shurjomukhi/common";
import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { JobLocation } from "../models/job-location";

const router = express.Router();

const validationCheck = [body("name").exists().withMessage("name is required")];

router.get(
    "/api/employee-management/job-location",
    async (req: Request, res: Response) => {
        const location = await JobLocation.find();

        res.status(200).send(location);
    }
);

router.get(
    "/api/employee-management/job-location/:id",
    async (req: Request, res: Response) => {
        const location = await JobLocation.findById(req.params.id);

        if (!location) {
            throw new NotFoundError();
        }

        res.status(200).send(location);
    }
);

router.post(
    "/api/employee-management/job-location",
    validationCheck,
    validateRequest,
    async (req: Request, res: Response) => {
        const { name, remark } = req.body;

        const existingLocation = await JobLocation.findOne({ name });
        if (existingLocation) {
            throw new BadRequestError("location exists");
        }

        const location = JobLocation.build({
            name,
            remark,
        });

        await location.save();

        res.status(201).send(location);
    }
);

router.put(
    "/api/employee-management/job-location/:id",
    validationCheck,
    validationResult,
    async (req: Request, res: Response) => {
        const location = await JobLocation.findById(req.params.id);

        if (!location) {
            throw new NotFoundError();
        }

        const { name, remark } = req.body;

        const existingLocation = await JobLocation.findOne({
            name,
            _id: { $ne: req.params.id },
        });
        if (existingLocation) {
            throw new BadRequestError("location exists");
        }

        location.set({
            ...req.body,
        });
        await location.save();

        res.status(200).send(location);
    }
);

router.delete(
    "/api/employee-management/job-location/:id",
    async (req: Request, res: Response) => {
        await JobLocation.findByIdAndDelete(req.params.id);
        res.status(200).send({});
    }
);

export { router as jobLocationRouter };
