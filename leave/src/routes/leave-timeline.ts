import { NotFoundError } from "@shurjomukhi/common";
import express, { Request, Response } from "express";
import { Category } from "../models/category";
import { Employee } from "../models/employee";
import { LeaveTimeline } from "../models/leave-timeline";

const router = express.Router();

router.get("/api/leave/leave-timeline", async (req: Request, res: Response) => {
  const timeline = await LeaveTimeline.find({ status: true });

  res.status(200).send(timeline);
});

router.get(
  "/api/leave/leave-profile/:id",
  async (req: Request, res: Response) => {
    const timeline = await LeaveTimeline.findById(req.params.id);

    if (!timeline) {
      throw new NotFoundError("timeline not found");
    }

    res.status(200).send(timeline);
  }
);

router.post("/api/leave/leave-profile", async (req: Request, res: Response) => {
  const {
    employee: employeeId,
    category: categoryId,
    fromDate,
    toDate,
    duration,
    remarks,
  } = req.body;

  const employee = await Employee.findById(employeeId);
  if (!employee) {
    throw new NotFoundError("employee not found");
  }

  const category = await Category.findById(categoryId);
  if (!category) {
    throw new NotFoundError(categoryId);
  }

  const timeline = LeaveTimeline.build({
    employee: employeeId,
    category: categoryId,
    fromDate,
    toDate,
    duration,
    remarks,
  });

  await timeline.save();

  res.status(201).send(timeline);
});

router.put(
  "/api/leave/leave-timeline/:id",
  async (req: Request, res: Response) => {
    const timeline = await LeaveTimeline.findById(req.params.id);
    if (!timeline) {
      throw new NotFoundError("timeline not found");
    }

    const { employee: employeeId, category: categoryId } = req.body;

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      throw new NotFoundError("employee not found");
    }

    const category = await Category.findById(categoryId);
    if (!category) {
      throw new NotFoundError(categoryId);
    }

    timeline.set({
      ...req.body,
    });

    await timeline.save();

    res.status(200).send(timeline);
  }
);

router.delete(
  "/api/leave/leave-timeline/:id",
  async (req: Request, res: Response) => {
    const timeline = await LeaveTimeline.findById(req.params.id);
    if (!timeline) {
      throw new NotFoundError("timeline not found");
    }

    timeline.set({ status: false });

    await timeline.save();

    res.status(200).send(timeline);
  }
);
