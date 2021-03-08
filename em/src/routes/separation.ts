import {
    BadRequestError,
    NotFoundError,
    validateRequest,
} from "@shurjomukhi/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Separation } from "../models/separation";

const router = express.Router();

const validationCheck = [body("type").exists().withMessage("type is required")];

router.get(
    "/api/employee-management/separation",
    async (req: Request, res: Response) => {
        const separation = await Separation.find();

        res.status(200).send(separation);
    }
);

router.get(
    "/api/employee-management/separation/:id",
    async (req: Request, res: Response) => {
        const separation = await Separation.findById(req.params.id);

        if (!separation) {
            throw new NotFoundError();
        }
        res.status(200).send(separation);
    }
);

router.post(
    "/api/employee-management/separation",
    validationCheck,
    validateRequest,
    async (req: Request, res: Response) => {
        const { type, remark } = req.body;

        const existingSeparation = await Separation.findOne({ type });
        if (existingSeparation) {
            throw new BadRequestError("separation type exists");
        }

        const separiaon = Separation.build({
            type,
            remark,
        });

        await separiaon.save();

        res.status(201).send(separiaon);
    }
);

router.put(
    "/api/employee-management/separation/:id",
    validationCheck,
    validateRequest,
    async (req: Request, res: Response) => {
        const separiaon = await Separation.findById(req.params.id);

        if (!separiaon) {
            throw new NotFoundError();
        }

        const { type, remark } = req.body;

        const existingSeparation = await Separation.findOne({
            type,
            _id: { $ne: req.params.id },
        });
        if (existingSeparation) {
            throw new BadRequestError("separation type exists");
        }

        separiaon.set({
            type,
            remark,
        });
        await separiaon.save();

        res.status(200).send(separiaon);
    }
);

router.delete(
    "/api/employee-management/separation/:id",
    async (req: Request, res: Response) => {
        await Separation.findByIdAndDelete(req.params.id);
        res.status(200).send({});
    }
);

export { router as separationRouter };
