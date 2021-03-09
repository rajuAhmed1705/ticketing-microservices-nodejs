import {
  BadRequestError,
  NotFoundError,
  validateRequest,
} from "@shurjomukhi/common";
import { Request, Response, Router } from "express";
import { body } from "express-validator";
import { Company } from "../models/company";

const router = Router();

const validationCheck = [
  body("name").exists().withMessage("name field is required"),
];

router.get(
  "/api/employee-management/company",
  async (req: Request, res: Response) => {
    const companies = await Company.find();
    res.status(200).send(companies);
  }
);

router.get(
  "/api/employee-management/company/:id",
  async (req: Request, res: Response) => {
    const company = await Company.findById(req.params.id);
    res.status(200).send(company);
  }
);

router.post(
  "/api/employee-management/company",
  validationCheck,
  validateRequest,
  async (req: Request, res: Response) => {
    const { name, location, companyType, subsidy, logo } = req.body;

    const existingCompany = await Company.findOne({ name });
    if (existingCompany) {
      throw new BadRequestError("company exists");
    }

    const company = Company.build({
      name,
      location,
      companyType,
      subsidy,
      logo,
    });

    await company.save();

    res.status(201).send(company);
  }
);

router.put(
  "/api/employee-management/company/:id",
  validationCheck,
  validateRequest,
  async (req: Request, res: Response) => {
    const { name } = req.body;

    const existingCompany = await Company.findOne({
      name,
      _id: { $ne: req.params.id },
    });

    if (existingCompany) {
      throw new BadRequestError("company exists");
    }

    const company = await Company.findById(req.params.id);
    if (!company) {
      throw new NotFoundError("company not found");
    }

    company.set({ ...req.body });

    await company.save();

    res.status(200).send(company);
  }
);

router.delete(
  "/api/employee-management/company/:id",
  async (req: Request, res: Response) => {
    await Company.findByIdAndDelete(req.params.id);

    res.status(200).send({});
  }
);

export { router as companyRouter };
