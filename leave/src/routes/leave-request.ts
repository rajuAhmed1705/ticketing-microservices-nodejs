import {
  BadRequestError,
  NotFoundError,
  objectIdCheck,
  validateRequest,
} from "@shurjomukhi/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Category } from "../models/category";
import { Employee } from "../models/employee";
import { LeaveProfile } from "../models/leave-profile";
import { RequestType } from "../models/request-type";
import { calDuration } from "../utils/cal-duration";

const router = express.Router();

const validation = [
  body("category").isMongoId().withMessage("category is not valid objectId"),
];

router.post("/api/leave/duration", async (req: Request, res: Response) => {
  const { startTime, endTime } = req.body;
  try {
    const duration = calDuration(startTime, endTime);
    res.status(200).send({ ...duration });
  } catch (error) {
    console.log(error);
    res.status(400).send({});
  }
});

router.post(
  "/api/leave/leave-request",
  validation,
  validateRequest,
  async (req: Request, res: Response) => {
    const {
      employee,
      requestType,
      category,
      startTime,
      endTime,
      requestTo,
    } = req.body;

    await objectIdCheck([
      {
        name: "employee",
        model: Employee,
        objectId: employee,
      },
      {
        name: "request type",
        model: RequestType,
        objectId: requestType,
      },
      {
        name: "category",
        model: Category,
        objectId: category,
      },
      {
        name: "requestTo",
        model: Employee,
        objectId: requestTo,
      },
    ]);

    //calculate days
    const { duration, hours } = calDuration(startTime, endTime);

    const cat = await Category.findById(category);

    if (cat && cat.maxAvail && duration > cat.maxAvail) {
      throw new BadRequestError("duration exceeded");
    }

    if (cat && cat.maxAvail && duration < cat.minAvail) {
      throw new BadRequestError("duration is less than half day");
    }

    const leaveProfile = await LeaveProfile.findOne({ employee, category });
    if (!leaveProfile) {
      throw new NotFoundError(
        "you don't have leave profile for this category please contact HR"
      );
    }

    res.status(200).send({
      duration,
    });
  }
);

export { router as leaveRequestRouter };
