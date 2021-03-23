import { objectIdCheck } from "@shurjomukhi/common";
import express, { Request, Response } from "express";
import { Category } from "../models/category";
import { Employee } from "../models/employee";
import { RequestType } from "../models/request-type";
import moment from "moment";

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

  //calculate days
  const from = moment(startTime);
  const to = moment(endTime);

  const h = to.diff(from, "hour");
  console.log(h);

  res.status(200).send({ h, from, to });
});

export { router as leaveRequestRouter };
