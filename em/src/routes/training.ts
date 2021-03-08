import {
    BadRequestError,
    NotFoundError,
    validateRequest,
    objectIdCheck,
} from "@shurjomukhi/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Employee } from "../models/employee";
import { Training } from "../models/training";

const router = express.Router();

const validationCheck = [
    body("title").exists().notEmpty().withMessage("title is required"),
    body("employee").isMongoId(),
];

router.get(
    "/api/employee-management/training",
    async (req: Request, res: Response) => {
        const training = await Training.find();

        res.status(200).send(training);
    }
);

router.get(
    "/api/employee-management/training/:id",
    async (req: Request, res: Response) => {
        const training = await Training.findById(req.params.id);

        if (!training) {
            throw new NotFoundError();
        }

        res.status(200).send(training);
    }
);

router.get(
    "/api/employee-management/training/employee/:id",
    async (req: Request, res: Response) => {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            throw new NotFoundError();
        }
        const training = await Training.find({ employee });

        res.status(200).send(training);
    }
);

router.post(
    "/api/employee-management/training",
    validationCheck,
    validateRequest,
    async (req: Request, res: Response) => {
        const { employee, title, duration, learning, institution } = req.body;

        await objectIdCheck([
            {
                name: "employee",
                objectId: employee,
                model: Employee,
            },
        ]);

        const existingTraining = await Training.findOne({
            employee,
            title,
        });
        if (existingTraining) {
            throw new BadRequestError("training exists for this employee");
        }

        const training = Training.build({
            employee,
            title,
            duration,
            learning,
            institution,
        });

        await training.save();

        res.status(201).send(training);
    }
);

router.put(
    "/api/employee-management/training/:id",
    validationCheck,
    validateRequest,
    async (req: Request, res: Response) => {
        const training = await Training.findById(req.params.id);

        if (!training) {
            throw new NotFoundError();
        }

        const { employee, title, duration, learning, institution } = req.body;

        await objectIdCheck([
            {
                name: "employee",
                objectId: employee,
                model: Employee,
            },
        ]);

        const existingTraining = await Training.findOne({
            employee,
            title,
            _id: {
                $ne: req.params.id,
            },
        });
        if (existingTraining) {
            throw new BadRequestError("training exists for this employee");
        }

        training.set({
            employee,
            title,
            duration,
            learning,
            institution,
        });
        await training.save();

        res.status(200).send(training);
    }
);

router.delete(
    "/api/employee-management/training/:id",
    async (req: Request, res: Response) => {
        await Training.findByIdAndDelete(req.params.id);
        res.status(200).send({});
    }
);

export { router as trainingRouter };
