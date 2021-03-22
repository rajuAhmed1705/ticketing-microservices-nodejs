import {
  BadRequestError,
  NotFoundError,
  validateRequest,
} from "@shurjomukhi/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { RequestType } from "../models/request-type";

const router = express.Router();

const validation = [
  body("requestName").exists().withMessage("requestName field is required"),
];

router.get("/api/leave/request-type", async (req: Request, res: Response) => {
  const requests = await RequestType.find();

  res.status(200).send(requests);
});

router.get(
  "/api/leave/request-type/:id",
  async (req: Request, res: Response) => {
    const request = await RequestType.findById(req.params.id);

    res.status(200).send(request);
  }
);

router.post(
  "/api/leave/request-type",
  validation,
  validateRequest,
  async (req: Request, res: Response) => {
    const { requestName, remarks } = req.body;

    const existingRequestType = await RequestType.findOne({ requestName });
    if (existingRequestType) {
      throw new BadRequestError("request type already exists");
    }

    const requestType = RequestType.build({
      requestName,
      remarks,
    });

    await requestType.save();

    res.status(201).send(requestType);
  }
);

router.put(
  "/api/leave/request-type/:id",
  validation,
  validateRequest,
  async (req: Request, res: Response) => {
    const requestType = await RequestType.findById(req.params.id);
    if (!requestType) {
      throw new NotFoundError("request type doesn't exist");
    }

    const { requestName, remarks } = req.body;

    const existingRequestType = await RequestType.findOne({
      requestName,
      _id: {
        $ne: req.params.id,
      },
    });
    if (existingRequestType) {
      throw new BadRequestError("request type already exists");
    }

    requestType.set({
      requestName,
      remarks,
    });

    await requestType.save();

    res.status(200).send(requestType);
  }
);

router.delete(
  "/api/leave/request-type/:id",
  async (req: Request, res: Response) => {
    const requestType = await RequestType.findById(req.params.id);
    if (!requestType) {
      throw new NotFoundError("request type does not exist");
    }

    await RequestType.findByIdAndDelete(req.params.id);

    res.status(200).send({});
  }
);

export { router as requestTypeRouter };
