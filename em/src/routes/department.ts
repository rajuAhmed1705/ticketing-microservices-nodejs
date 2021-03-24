import {
  BadRequestError,
  NotFoundError,
  validateRequest,
} from "@shurjomukhi/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Department } from "../models/department";

const router = express.Router();

const validationCheck = [
  body("title").exists(),
  body("code")
    .exists()
    .withMessage("code field is required")
    .isInt({ gt: 0 })
    .withMessage("code must be greater than 0"),
];

router.get(
  "/api/employee-management/department",
  async (req: Request, res: Response) => {
    const department = await Department.find();

    res.status(200).send(department);
  }
);

router.get(
  "/api/employee-management/department/:id",
  async (req: Request, res: Response) => {
    const department = await Department.findById(req.params.id);

    if (!department) {
      throw new NotFoundError();
    }

    res.status(200).send(department);
  }
);

router.post(
  "/api/employee-management/department",
  validationCheck,
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, code, remark } = req.body;

    const existingDepartment = await Department.findOne({ title });
    if (existingDepartment) {
      throw new BadRequestError("department exists");
    }

    const department = Department.build({
      title,
      code,
      remark,
    });

    await department.save();

    res.status(201).send(department);
  }
);

router.put(
  "/api/employee-management/department/:id",
  validationCheck,
  validateRequest,
  async (req: Request, res: Response) => {
    const department = await Department.findById(req.params.id);

    if (!department) {
      throw new NotFoundError();
    }

    const { title, code } = req.body;

    const existingDepartment = await Department.findOne({
      title,
      _id: { $ne: req.params.id },
    });
    if (existingDepartment) {
      throw new BadRequestError("department exists");
    }

    department.set({
      ...req.body,
    });
    await department.save();

    res.status(200).send(department);
  }
);

router.delete(
  "/api/employee-management/department/:id",
  async (req: Request, res: Response) => {
    await Department.findByIdAndDelete(req.params.id);
    res.status(200).send({});
  }
);

export { router as departmentRouter };
