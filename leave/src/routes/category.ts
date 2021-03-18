import {
  BadRequestError,
  NotFoundError,
  validateRequest,
} from "@shurjomukhi/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Category } from "../models/category";

const router = express.Router();

const validation = [
  body("name").exists().withMessage("name field is required"),
  body("shortForm").exists().withMessage("shortForm is required"),
];

router.get("/api/leave/category", async (req: Request, res: Response) => {
  const categories = await Category.find();

  res.status(200).send(categories);
});

router.get("/api/leave/category/:id", async (req: Request, res: Response) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    throw new NotFoundError("category not found");
  }

  res.status(200).send(category);
});

router.post(
  "/api/leave/category",
  validation,
  validateRequest,
  async (req: Request, res: Response) => {
    const {
      name,
      shortForm,
      section,
      allottedDays,
      minAvail,
      maxAvail,
      eligibleEmploymentType,
      carryForward,
      minService,
      preapproval,
      maxAccumulation,
      payable,
      adjustment,
      prefix,
      suffix,
      intervention,
    } = req.body;

    const existingCategory = await Category.findOne({
      $or: [{ name }, { shortForm }],
    });
    if (existingCategory) {
      throw new BadRequestError("category or short form already exists");
    }

    const category = Category.build({
      name,
      shortForm,
      section,
      allottedDays,
      minAvail,
      maxAvail,
      eligibleEmploymentType,
      carryForward,
      minService,
      preapproval,
      maxAccumulation,
      payable,
      adjustment,
      prefix,
      suffix,
      intervention,
    });

    await category.save();

    res.status(201).send(category);
  }
);

router.put(
  "/api/leave/category/:id",
  validation,
  validateRequest,
  async (req: Request, res: Response) => {
    const category = await Category.findById(req.params.id);

    if (!category) {
      throw new NotFoundError("category not found");
    }

    const { name, shortForm } = req.body;

    category.set({
      ...req.body,
    });

    await category.save();

    res.status(200).send(category);
  }
);

router.delete(
  "/api/leave/category/:id",
  async (req: Request, res: Response) => {
    const category = await Category.findById(req.params.id);

    if (!category) {
      throw new NotFoundError("category not found");
    }

    await Category.findByIdAndDelete(req.params.id);

    res.status(200).send({});
  }
);

export { router as categoryRouter };
