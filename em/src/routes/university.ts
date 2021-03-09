import { NotFoundError } from "@shurjomukhi/common";
import express, { Request, Response } from "express";
import { University } from "../models/university";

const router = express.Router();

router.get(
  "/api/employee-management/university",
  async (req: Request, res: Response) => {
    const data = await University.find();

    res.status(200).send(data);
  }
);

router.get(
  "/api/employee-management/university/:id",
  async (req: Request, res: Response) => {
    const data = await University.findById(req.params.id);

    if (!data) {
      throw new NotFoundError();
    }

    res.status(200).send(data);
  }
);

router.post(
  "/api/employee-management/university",
  async (req: Request, res: Response) => {
    const { name, location, type } = req.body;

    const data = University.build({
      name,
      location,
      type,
    });

    await data.save();

    res.status(201).send(data);
  }
);

router.put(
  "/api/employee-management/university/:id",
  async (req: Request, res: Response) => {
    const data = await University.findById(req.params.id);

    if (!data) {
      throw new NotFoundError();
    }

    const { name, location, type } = req.body;

    data.set({
      name,
      location,
      type,
    });
    await data.save();

    res.status(200).send(data);
  }
);

router.delete(
  "/api/employee-management/university/:id",
  async (req: Request, res: Response) => {
    await University.findByIdAndDelete(req.params.id);
    res.status(200).send({});
  }
);

export { router as universityRouter };
