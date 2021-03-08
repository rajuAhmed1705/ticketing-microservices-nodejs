import {
    BadRequestError,
    NotFoundError,
    validateRequest,
} from "@shurjomukhi/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Project } from "../models/project";

const router = express.Router();

const validationCheck = [body("name").exists().withMessage("name is required")];

router.get(
    "/api/employee-management/project",
    async (req: Request, res: Response) => {
        const project = await Project.find();

        res.status(200).send(project);
    }
);

router.get(
    "/api/employee-management/project/:id",
    async (req: Request, res: Response) => {
        const project = await Project.findById(req.params.id);

        if (!project) {
            throw new NotFoundError();
        }

        res.status(200).send(project);
    }
);

router.post(
    "/api/employee-management/project",
    validationCheck,
    validateRequest,
    async (req: Request, res: Response) => {
        const { name, description, startingDate, endDate, remark } = req.body;

        const existingProject = await Project.findOne({ name });
        if (existingProject) {
            throw new BadRequestError("Project exists");
        }

        const project = Project.build({
            name,
            description,
            startingDate,
            endDate,
            remark,
        });

        await project.save();

        res.status(201).send(project);
    }
);

router.put(
    "/api/employee-management/project/:id",
    validationCheck,
    validateRequest,
    async (req: Request, res: Response) => {
        const project = await Project.findById(req.params.id);

        if (!project) {
            throw new NotFoundError();
        }

        const { name } = req.body;

        const existingProject = await Project.findOne({
            name,
            _id: { $ne: req.params.id },
        });
        if (existingProject) {
            throw new BadRequestError("Project exists");
        }

        project.set({
            ...req.body,
        });
        await project.save();

        res.status(200).send(project);
    }
);

router.delete(
    "/api/employee-management/project/:id",
    async (req: Request, res: Response) => {
        await Project.findByIdAndDelete(req.params.id);
        res.status(200).send({});
    }
);

export { router as projectRouter };
