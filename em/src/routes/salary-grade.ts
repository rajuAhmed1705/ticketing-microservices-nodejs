import {
  BadRequestError,
  NotFoundError,
  validateRequest,
} from "@shurjomukhi/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { SalaryGrade } from "../models/salary-grade";

const router = express.Router();

const validationCheck = [
  body("grade").exists().withMessage("grade is required"),
  body("minimumSalary")
    .exists()
    .isFloat({ gt: 4999, lt: 1000001 })
    .withMessage("value must be between 5,000 and 10,00,000"),
  body("maximumSalary")
    .exists()
    .isFloat({ gt: 4999, lt: 1000001 })
    .withMessage("value must be between 5,000 and 10,00,000"),
];

router.get(
  "/api/employee-management/salary-grade",
  async (req: Request, res: Response) => {
    const salaryGrade = await SalaryGrade.find();

    res.status(200).send(salaryGrade);
  }
);

router.get(
  "/api/employee-management/salary-grade/:id",
  async (req: Request, res: Response) => {
    const salaryGrade = await SalaryGrade.findById(req.params.id);

    if (!salaryGrade) {
      throw new NotFoundError();
    }

    res.status(200).send(salaryGrade);
  }
);

router.post(
  "/api/employee-management/salary-grade",
  validationCheck,
  validateRequest,
  async (req: Request, res: Response) => {
    const { grade, minimumSalary, maximumSalary, remark } = req.body;

    if (minimumSalary > maximumSalary) {
      throw new BadRequestError("minimum salary cannot exceed maximum salary");
    }

    const existingSalaryGrade = await SalaryGrade.findOne({ grade });
    if (existingSalaryGrade) {
      throw new BadRequestError("salary grade exists");
    }
    const salaryGrade = SalaryGrade.build({
      grade,
      minimumSalary,
      maximumSalary,
      remark,
    });

    await salaryGrade.save();

    res.status(201).send(salaryGrade);
  }
);

router.put(
  "/api/employee-management/salary-grade/:id",
  validationCheck,
  validateRequest,
  async (req: Request, res: Response) => {
    const salaryGrade = await SalaryGrade.findById(req.params.id);

    if (!salaryGrade) {
      throw new NotFoundError();
    }

    const { grade, minimumSalary, maximumSalary, remark } = req.body;

    if (minimumSalary > maximumSalary) {
      throw new BadRequestError("minimum salary cannot exceed maximum salary");
    }

    const existingSalaryGrade = await SalaryGrade.findOne({
      grade,
      _id: { $ne: req.params.id },
    });
    if (existingSalaryGrade) {
      throw new BadRequestError("salary grade exists");
    }

    salaryGrade.set({
      grade,
      minimumSalary,
      maximumSalary,
      remark,
    });
    await salaryGrade.save();

    res.status(200).send(salaryGrade);
  }
);

router.delete(
  "/api/employee-management/salary-grade/:id",
  async (req: Request, res: Response) => {
    await SalaryGrade.findByIdAndDelete(req.params.id);
    res.status(200).send({});
  }
);

export { router as salaryGradeRouter };
