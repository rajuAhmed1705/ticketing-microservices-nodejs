import { objectIdCheck } from "@shurjomukhi/common";
import express, { Request, Response } from "express";
import { Category } from "../models/category";
import { Employee } from "../models/employee";
import { RequestType } from "../models/request-type";
import { calDuration } from "../utils/cal-duration";
import { calHour } from "../utils/cal-hour";
import { officeTime } from "../utils/cal-office-time";

const router = express.Router();

router.post("/api/leave/leave-request", async (req: Request, res: Response) => {
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

  //calculate office time
  const office = officeTime(startTime);

  //calculate hour
  const startingDayHours = calHour(startTime, "end");
  const endDayHours = calHour(endTime, "start");

  //calculate days
  const { duration, hours } = calDuration(startTime, endTime);

  res.status(200).send({
    duration,
    hours,
    startingDayHours,
    endDayHours,
    office,
  });
});

export { router as leaveRequestRouter };
