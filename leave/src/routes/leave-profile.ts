import { BadRequestError, NotFoundError } from "@shurjomukhi/common";
import express, { Request, Response } from "express";
import { Category } from "../models/category";
import { Employee } from "../models/employee";
import { LeaveProfile } from "../models/leave-profile";

const router = express.Router();

router.get("/api/leave/leave-profile", async (req: Request, res: Response) => {
  const profile = await LeaveProfile.find();

  res.status(200).send(profile);
});

router.get(
  "/api/leave/leave-profile/:id",
  async (req: Request, res: Response) => {
    const profile = await LeaveProfile.findById(req.params.id);

    if (!profile) {
      throw new NotFoundError("profile not found");
    }

    res.status(200).send(profile);
  }
);

router.post("/api/leave/leave-profile", async (req: Request, res: Response) => {
  /**
   * update to auth user later
   */
  const {
    employee: employeeId,
    category: categoryId,
    remainingLeave,
    createdBy,
  } = req.body;

  const category = await Category.findById(categoryId);
  if (!category) {
    throw new NotFoundError("category not found");
  }

  const employee = await Employee.findById(employeeId);
  if (!employee) {
    throw new NotFoundError("employee not found");
  }

  if (category.allottedDays && !category.allottedDays >= remainingLeave) {
    throw new BadRequestError("remaining leave is invalid");
  }

  const existingLeaveProfile = await LeaveProfile.findOne({
    employee: employeeId,
    category: categoryId,
  });
  if (existingLeaveProfile) {
    throw new BadRequestError("leave profile for this category already exists");
  }

  const profile = LeaveProfile.build({
    employee: employeeId,
    category: categoryId,
    remainingLeave,
    createdBy,
  });

  await profile.save();

  res.status(201).send(profile);
});

router.put(
  "/api/leave/leave-profile/:id",
  async (req: Request, res: Response) => {
    /**
     * update to auth user later
     */
    const profile = await LeaveProfile.findById(req.params.id);

    if (!profile) {
      throw new NotFoundError("leave profile not found");
    }

    const { category: categoryId, remainingLeave, updatedBy } = req.body;

    const category = await Category.findById(categoryId);
    if (!category) {
      throw new NotFoundError("category not found");
    }

    if (category.allottedDays && !category.allottedDays >= remainingLeave) {
      throw new BadRequestError("remaining leave is invalid");
    }

    profile.set({
      category: categoryId,
      remainingLeave,
      updatedBy,
    });

    await profile.save();

    console.log(profile);

    res.status(200).send(profile);
  }
);

router.delete(
  "/api/leave/leave-profile/:id",
  async (req: Request, res: Response) => {
    const profile = await LeaveProfile.findById(req.params.id);

    if (!profile) {
      throw new NotFoundError("profile not found");
    }

    await LeaveProfile.findByIdAndDelete(req.params.id);

    res.status(200).send({});
  }
);

export { router as leaveProfileRouter };
