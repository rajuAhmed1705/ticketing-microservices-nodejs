import {
  BadRequestError,
  NotFoundError,
  validateRequest,
} from "@shurjomukhi/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { EmployeeStatus } from "../models/employee-status";

const router = express.Router();

const validationCheck = [
  body("status").exists().withMessage("status is required"),
];

router.get(
  "/api/employee-management/employee-status",
  async (req: Request, res: Response) => {
    const data = await EmployeeStatus.find();

    res.status(200).send(data);
  }
);

router.get(
  "/api/employee-management/employee-status/:id",
  async (req: Request, res: Response) => {
    const data = await EmployeeStatus.findById(req.params.id);

    if (!data) {
      throw new NotFoundError();
    }

    res.status(200).send(data);
  }
);

router.post(
  "/api/employee-management/employee-status",
  validationCheck,
  validateRequest,
  async (req: Request, res: Response) => {
    const { status } = req.body;

    const existingStatus = await EmployeeStatus.findOne({ status });
    if (existingStatus) {
      throw new BadRequestError("status already exists");
    }

    const data = EmployeeStatus.build({
      status,
    });

    await data.save();

    res.status(201).send(data);
  }
);

router.put(
  "/api/employee-management/employee-status/:id",
  validationCheck,
  validateRequest,
  async (req: Request, res: Response) => {
    const data = await EmployeeStatus.findById(req.params.id);

    if (!data) {
      throw new NotFoundError();
    }

    const { status } = req.body;

    const existingStatus = await EmployeeStatus.findOne({
      status,
      _id: {
        $ne: req.params.id,
      },
    });

    if (existingStatus) {
      throw new BadRequestError("status already exists");
    }

    data.set({
      status,
    });
    await data.save();

    res.status(200).send(data);
  }
);

router.delete(
  "/api/employee-management/employee-status/:id",
  async (req: Request, res: Response) => {
    await EmployeeStatus.findByIdAndDelete(req.params.id);
    res.status(200).send({});
  }
);

export { router as employeeStatusRouter };
