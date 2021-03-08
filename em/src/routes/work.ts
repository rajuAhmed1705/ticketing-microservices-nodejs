import {
    NotFoundError,
    validateRequest,
    objectIdCheck,
} from "@shurjomukhi/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Employee } from "../models/employee";
import { Work } from "../models/workExperience";

const router = express.Router();

const validationCheck = [
    body("companyName").exists(),
    body("employee").isMongoId(),
];

router.get(
    "/api/employee-management/work",
    async (req: Request, res: Response) => {
        const work = await Work.find();

        res.status(200).send(work);
    }
);

router.get(
    "/api/employee-management/work/:id",
    async (req: Request, res: Response) => {
        const work = await Work.findById(req.params.id);

        if (!work) {
            throw new NotFoundError();
        }

        res.status(200).send(work);
    }
);

router.get(
    "/api/employee-management/work/employee/:id",
    async (req: Request, res: Response) => {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            throw new NotFoundError();
        }
        const work = await Work.find({ employee });

        res.status(200).send(work);
    }
);

router.post(
    "/api/employee-management/work",
    validationCheck,
    validateRequest,
    async (req: Request, res: Response) => {
        const {
            employee,
            companyName,
            designation,
            department,
            duration,
            supervisor,
        } = req.body;

        await objectIdCheck([
            {
                name: "employee",
                objectId: employee,
                model: Employee,
            },
        ]);

        const work = Work.build({
            employee,
            companyName,
            designation,
            department,
            duration,
            supervisor,
        });

        await work.save();

        res.status(201).send(work);
    }
);

router.put(
    "/api/employee-management/work/:id",
    validationCheck,
    validateRequest,
    async (req: Request, res: Response) => {
        const work = await Work.findById(req.params.id);

        if (!work) {
            throw new NotFoundError();
        }

        const {
            employee,
            companyName,
            designation,
            department,
            duration,
            supervisor,
        } = req.body;

        work.set({
            employee,
            companyName,
            designation,
            department,
            duration,
            supervisor,
        });
        await work.save();

        res.status(200).send(work);
    }
);

router.delete(
    "/api/employee-management/work/:id",
    async (req: Request, res: Response) => {
        await Work.findByIdAndDelete(req.params.id);
        res.status(200).send({});
    }
);

export { router as workRouter };
