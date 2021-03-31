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
import { LeaveRequest } from "../models/leave-request";
import { RequestType } from "../models/request-type";
import { calDuration } from "../utils/cal-duration";

const router = express.Router();

const validation = [
  body("category").isMongoId().withMessage("category is not valid objectId"),
];

router.get("/api/leave/leave-request", async (req: Request, res: Response) => {
  const leaveRequests = await LeaveRequest.find();

  res.status(200).send(leaveRequests);
});

router.get(
  "/api/leave/leave-request/:id",
  async (req: Request, res: Response) => {
    const leaveRequest = await LeaveRequest.findById(req.params.id);
    if (!leaveRequest) {
      throw new NotFoundError("request not found");
    }

    res.status(200).send(leaveRequest);
  }
);

router.get(
  "/api/leave/my-leave-request",
  async (req: Request, res: Response) => {
    /**
     * edit later for auth user
     */
    const { employee } = req.body;
    const leaveRequests = await LeaveRequest.find({ employee });

    res.status(200).send(leaveRequests);
  }
);

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
      purpose,
      startTime,
      endTime,
      requestTo,
    } = req.body;

    const existingLeaveRequest = await LeaveRequest.findOne({
      employee,
      status: 0,
    });

    if (existingLeaveRequest) {
      throw new BadRequestError("you have already one request pending");
    }

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
    const { duration } = calDuration(startTime, endTime);

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

    if (
      leaveProfile &&
      leaveProfile.remainingLeave &&
      leaveProfile.remainingLeave < duration
    ) {
      throw new BadRequestError("duration exceed allotted leave");
    }

    const leaveRequest = LeaveRequest.build({
      employee,
      requestType,
      requestTo,
      purpose,
      startTime,
      endTime,
      duration,
      category,
    });

    await leaveRequest.save();

    res.status(201).send(leaveRequest);
  }
);

router.post(
  "/api/leave/leave-request-cancel",
  [body("request").isMongoId()],
  validateRequest,
  async (req: Request, res: Response) => {
    const { request } = req.body;

    let leaveRequest = await LeaveRequest.findById(request);

    if (!leaveRequest) {
      throw new NotFoundError("request not found");
    }

    try {
      leaveRequest.set({ status: 3 });
      await leaveRequest.save();

      res.status(200).send(leaveRequest);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
);

router.post(
  "/api/leave/leave-request-approval",
  [
    body("request").isMongoId(),
    body("status").isIn([1, 2]).withMessage("status code does not match"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    /**
     * make change for auth user later
     */
    const { request, status, requestTo } = req.body;

    let leaveRequest = await LeaveRequest.findById(request);

    if (!leaveRequest) {
      throw new NotFoundError("request not found");
    }

    try {
      leaveRequest.set({ status });
      await leaveRequest.save();

      res.status(200).send(leaveRequest);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
);

router.put(
  "/api/leave/leave-request/:id",
  async (req: Request, res: Response) => {
    const leaveRequest = await LeaveRequest.findOne({
      _id: req.params.id,
      status: 0,
    });

    if (!leaveRequest) {
      throw new NotFoundError("request not found or status changed");
    }

    const {
      employee,
      requestType,
      category,
      startTime,
      endTime,
      requestTo,
    } = req.body;

    delete req.body.status;

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

    const { duration } = calDuration(startTime, endTime);

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

    if (
      leaveProfile &&
      leaveProfile.remainingLeave &&
      leaveProfile.remainingLeave < duration
    ) {
      throw new BadRequestError("duration exceed allotted leave");
    }

    leaveRequest.set({
      ...req.body,
      duration,
    });

    await leaveRequest.save();

    res.status(200).send(leaveRequest);
  }
);

router.delete(
  "/api/leave/leave-request/:id",
  async (req: Request, res: Response) => {
    const leaveRequest = await LeaveRequest.findById(req.params.id);

    if (!leaveRequest) {
      throw new NotFoundError("request not found");
    }
    if (leaveRequest.status !== 0) {
      throw new BadRequestError("request connot be deleted");
    }

    await LeaveRequest.findByIdAndDelete(leaveRequest.id);

    res.status(200).send({});
  }
);

export { router as leaveRequestRouter };
