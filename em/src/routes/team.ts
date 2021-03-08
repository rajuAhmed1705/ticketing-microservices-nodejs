import {
    BadRequestError,
    NotFoundError,
    validateRequest,
    objectIdCheck,
} from "@shurjomukhi/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Department } from "../models/department";
import { Team } from "../models/team";

const router = express.Router();

const validationCheck = [
    body("name").exists().notEmpty().withMessage("name field is required"),
    body("department").isMongoId().withMessage("department ID is required"),
];

router.get(
    "/api/employee-management/team",
    async (req: Request, res: Response) => {
        const team = await Team.find();

        res.status(200).send(team);
    }
);

router.get(
    "/api/employee-management/team/:id",
    async (req: Request, res: Response) => {
        const team = await Team.findById(req.params.id);

        if (!team) {
            throw new NotFoundError();
        }

        res.status(200).send(team);
    }
);

router.post(
    "/api/employee-management/team",
    validationCheck,
    validateRequest,
    async (req: Request, res: Response) => {
        const { name, remark, department } = req.body;

        const existingTeam = await Team.findOne({ name });
        if (existingTeam) {
            throw new BadRequestError("team name exists");
        }

        await objectIdCheck([
            {
                name: "department",
                objectId: department,
                model: Department,
            },
        ]);

        const team = Team.build({
            name,
            remark,
            department,
        });

        await team.save();

        res.status(201).send(team);
    }
);

router.put(
    "/api/employee-management/team/:id",
    validationCheck,
    validateRequest,
    async (req: Request, res: Response) => {
        const team = await Team.findById(req.params.id);
        if (!team) {
            throw new NotFoundError("team name not found");
        }

        const { name, remark, department } = req.body;

        await objectIdCheck([
            {
                name: "department",
                objectId: department,
                model: Department,
            },
        ]);

        const existingTeam = await Team.findOne({
            name,
            _id: { $ne: req.params.id },
        });
        if (existingTeam) {
            throw new BadRequestError("Team name exists");
        }

        team.set({
            name,
            remark,
            department,
        });
        await team.save();

        res.status(200).send(team);
    }
);

router.delete(
    "/api/employee-management/team/:id",
    async (req: Request, res: Response) => {
        await Team.findByIdAndDelete(req.params.id);
        res.status(200).send({});
    }
);

export { router as teamRouter };
