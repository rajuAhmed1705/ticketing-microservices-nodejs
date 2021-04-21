import {
  BadRequestError,
  NotFoundError,
  validateRequest,
} from "@shurjomukhi/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { EmploymentTypeCreatedPublisher } from "../events/publishers/employment-type/employment-type-created-publisher";
import { EmploymentTypeDeletedPublisher } from "../events/publishers/employment-type/employment-type-deleted-publisher";
import { EmploymentTypeUpdatedPublisher } from "../events/publishers/employment-type/employment-type-updated-publisher";
import { EmploymentType } from "../models/employment-type";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

const validationCheck = [
  body("name").exists().withMessage("name field is required"),
];

router.get(
  "/api/employee-management/employment-type",
  async (req: Request, res: Response) => {
    const employmentType = await EmploymentType.find();

    res.status(200).send(employmentType);
  }
);

router.get(
  "/api/employee-management/employment-type/:id",
  async (req: Request, res: Response) => {
    const employmentType = await EmploymentType.findById(req.params.id);

    if (!employmentType) {
      throw new NotFoundError();
    }

    res.status(200).send(employmentType);
  }
);

router.post(
  "/api/employee-management/employment-type",
  validationCheck,
  validateRequest,
  async (req: Request, res: Response) => {
    const { name, remark } = req.body;

    const existingEmploymentType = await EmploymentType.findOne({ name });
    if (existingEmploymentType) {
      throw new BadRequestError("employment type exists");
    }

    const employmentType = EmploymentType.build({
      name,
      remark,
    });

    await employmentType.save();

    new EmploymentTypeCreatedPublisher(natsWrapper.client).publish({
      id: employmentType.id,
      name: employmentType.name,
      remark: employmentType.remark,
      version: employmentType.version,
    });

    res.status(201).send(employmentType);
  }
);

router.put(
  "/api/employee-management/employment-type/:id",
  validationCheck,
  validateRequest,
  async (req: Request, res: Response) => {
    const employmentType = await EmploymentType.findById(req.params.id);

    if (!employmentType) {
      throw new NotFoundError();
    }

    const { name, remark } = req.body;

    const existingEmploymentType = await EmploymentType.findOne({
      name,
      _id: { $ne: req.params.id },
    });
    if (existingEmploymentType) {
      throw new BadRequestError("employment type already exists");
    }

    employmentType.set({
      name,
      remark,
    });
    await employmentType.save();

    await new EmploymentTypeUpdatedPublisher(natsWrapper.client).publish({
      id: employmentType.id,
      name: employmentType.name,
      remark: employmentType.remark,
      version: employmentType.version,
    });

    res.status(200).send(employmentType);
  }
);

router.delete(
  "/api/employee-management/employment-type/:id",
  async (req: Request, res: Response) => {
    await EmploymentType.findByIdAndDelete(req.params.id);

    new EmploymentTypeDeletedPublisher(natsWrapper.client).publish({
      id: req.params.id,
    });
    res.status(200).send({});
  }
);

export { router as employmentTypeRouter };
