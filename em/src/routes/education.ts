import {
    NotFoundError,
    objectIdCheck,
    validateRequest,
} from "@shurjomukhi/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Education } from "../models/education";
import { Employee } from "../models/employee";

const router = express.Router();

const validationCheck = [
    body("professionalQualification")
        .exists()
        .withMessage("professional qualification is required"),
    body("institution").exists(),
    body("employee").exists().isMongoId(),
];

router.get(
    "/api/employee-management/education",
    async (req: Request, res: Response) => {
        const education = await Education.find();

        res.status(200).send(education);
    }
);

router.get(
    "/api/employee-management/education/:id",
    async (req: Request, res: Response) => {
        const education = await Education.findById(req.params.id);

        if (!education) {
            throw new NotFoundError();
        }

        res.status(200).send(education);
    }
);

router.get(
    "/api/employee-management/education/employee/:id",
    async (req: Request, res: Response) => {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            throw new NotFoundError();
        }
        const education = await Education.find({ employee });

        res.status(200).send(education);
    }
);

router.post(
    "/api/employee-management/education",
    validationCheck,
    validateRequest,
    async (req: Request, res: Response) => {
        const {
            employee,
            professionalQualification,
            degree,
            faculty,
            institution,
            major,
            passingYear,
            cgpa,
        } = req.body;

        await objectIdCheck([
            {
                name: "employee",
                objectId: employee,
                model: Employee,
            },
        ]);

        const education = Education.build({
            employee,
            professionalQualification,
            degree,
            faculty,
            institution,
            major,
            passingYear,
            cgpa,
        });

        await education.save();

        res.status(201).send(education);
    }
);

router.put(
    "/api/employee-management/education/:id",
    validationCheck,
    validateRequest,
    async (req: Request, res: Response) => {
        const education = await Education.findById(req.params.id);

        if (!education) {
            throw new NotFoundError();
        }

        const { employee } = req.body;

        await objectIdCheck([
            {
                name: "employee",
                objectId: employee,
                model: Employee,
            },
        ]);

        education.set({
            ...req.body,
        });
        await education.save();

        res.status(200).send(education);
    }
);

router.delete(
    "/api/employee-management/education/:id",
    async (req: Request, res: Response) => {
        await Education.findByIdAndDelete(req.params.id);
        res.status(200).send({});
    }
);

export { router as educationRouter };
