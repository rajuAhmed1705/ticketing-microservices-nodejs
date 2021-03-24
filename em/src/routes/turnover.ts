import {
  BadRequestError,
  NotFoundError,
  validateRequest,
} from "@shurjomukhi/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Turnover } from "../models/turnover";

const router = express.Router();

const validationCheck = [body("name").exists()];

router.get(
  "/api/employee-management/turnover",
  async (req: Request, res: Response) => {
    const data = await Turnover.find();

    res.status(200).send(data);
  }
);

router.get(
  "/api/employee-management/turnover/:id",
  async (req: Request, res: Response) => {
    const data = await Turnover.findById(req.params.id);

    if (!data) {
      throw new NotFoundError();
    }

    res.status(200).send(data);
  }
);

router.post(
  "/api/employee-management/turnover",
  validationCheck,
  validateRequest,
  async (req: Request, res: Response) => {
    const { name } = req.body;

    const existingTurnover = await Turnover.findOne({ name });
    if (existingTurnover) {
      throw new BadRequestError("turnover name exists");
    }

    const data = Turnover.build({
      name,
    });

    await data.save();

    res.status(201).send(data);
  }
);

router.put(
  "/api/employee-management/turnover/:id",
  validationCheck,
  validateRequest,
  async (req: Request, res: Response) => {
    const data = await Turnover.findById(req.params.id);

    if (!data) {
      throw new NotFoundError("turnover name not found");
    }

    const { name } = req.body;

    const existingTurnover = await Turnover.findOne({
      name,
      _id: {
        $ne: req.params.id,
      },
    });
    if (existingTurnover) {
      throw new BadRequestError("turnover name exists");
    }

    data.set({
      name,
    });
    await data.save();

    res.status(200).send(data);
  }
);

router.delete(
  "/api/employee-management/turnover/:id",
  async (req: Request, res: Response) => {
    await Turnover.findByIdAndDelete(req.params.id);
    res.status(200).send({});
  }
);

export { router as turnoverRouter };
