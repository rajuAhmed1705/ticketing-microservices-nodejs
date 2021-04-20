import {
  BadRequestError,
  NotFoundError,
  validateRequest,
} from "@shurjomukhi/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { ReligionCreatedPublisher } from "../events/publishers/religion/religion-created-publisher";
import { ReligionDeletedPublisher } from "../events/publishers/religion/religion-deleted-publisher";
import { ReligionUpdatedPublisher } from "../events/publishers/religion/religion-updated-publisher";
import { Religion } from "../models/religion";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

const validationCheck = [body("name").exists()];

router.get(
  "/api/employee-management/religion",
  async (req: Request, res: Response) => {
    const data = await Religion.find();

    res.status(200).send(data);
  }
);

router.get(
  "/api/employee-management/religion/:id",
  async (req: Request, res: Response) => {
    const data = await Religion.findById(req.params.id);

    if (!data) {
      throw new NotFoundError();
    }

    res.status(200).send(data);
  }
);

router.post(
  "/api/employee-management/religion",
  validationCheck,
  validateRequest,
  async (req: Request, res: Response) => {
    const { name } = req.body;

    const existingReligion = await Religion.findOne({ name });
    if (existingReligion) {
      throw new BadRequestError("religion name already exists");
    }

    const data = Religion.build({
      name,
    });

    await data.save();

    new ReligionCreatedPublisher(natsWrapper.client).publish({
      id: data.id,
      name: data.name,
      version: data.version,
    });

    res.status(201).send(data);
  }
);

router.put(
  "/api/employee-management/religion/:id",
  validationCheck,
  validateRequest,
  async (req: Request, res: Response) => {
    const data = await Religion.findById(req.params.id);

    if (!data) {
      throw new NotFoundError();
    }

    const { name } = req.body;

    const existingReligion = await Religion.findOne({
      name,
      _id: {
        $ne: req.params.id,
      },
    });
    if (existingReligion) {
      throw new BadRequestError("religion name already exists");
    }

    data.set({
      name,
    });
    await data.save();

    await new ReligionUpdatedPublisher(natsWrapper.client).publish({
      id: data.id,
      name: data.name,
      version: data.version,
    });

    res.status(200).send(data);
  }
);

router.delete(
  "/api/employee-management/religion/:id",
  async (req: Request, res: Response) => {
    const religion = await Religion.findById(req.params.id);

    if (!religion) {
      throw new NotFoundError("religion not found");
    }

    await Religion.findByIdAndDelete(religion.id);

    new ReligionDeletedPublisher(natsWrapper.client).publish({
      id: religion.id,
    });

    res.status(200).send({});
  }
);

export { router as religionRouter };
