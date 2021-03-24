import {
  BadRequestError,
  NotFoundError,
  validateRequest,
} from "@shurjomukhi/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Religion } from "../models/religion";

const router = express.Router();

const validationCheck = [body("name").exists()];

router.get(
  "/api/employee-management/religion",
  async (req: Request, res: Response) => {
    const data = await Religion.find();

    res.status(200).send(data);
  }
);

router.get(
  "/api/employee-management/religion/:id",
  async (req: Request, res: Response) => {
    const data = await Religion.findById(req.params.id);

    if (!data) {
      throw new NotFoundError();
    }

    res.status(200).send(data);
  }
);

router.post(
  "/api/employee-management/religion",
  validationCheck,
  validateRequest,
  async (req: Request, res: Response) => {
    const { name } = req.body;

    const existingReligion = await Religion.findOne({ name });
    if (existingReligion) {
      throw new BadRequestError("religion name already exists");
    }

    const data = Religion.build({
      name,
    });

    await data.save();

    res.status(201).send(data);
  }
);

router.put(
  "/api/employee-management/religion/:id",
  validationCheck,
  validateRequest,
  async (req: Request, res: Response) => {
    const data = await Religion.findById(req.params.id);

    if (!data) {
      throw new NotFoundError();
    }

    const { name } = req.body;

    const existingReligion = await Religion.findOne({
      name,
      _id: {
        $ne: req.params.id,
      },
    });
    if (existingReligion) {
      throw new BadRequestError("religion name already exists");
    }

    data.set({
      name,
    });
    await data.save();

    res.status(200).send(data);
  }
);

router.delete(
  "/api/employee-management/religion/:id",
  async (req: Request, res: Response) => {
    await Religion.findByIdAndDelete(req.params.id);
    res.status(200).send({});
  }
);

export { router as religionRouter };
