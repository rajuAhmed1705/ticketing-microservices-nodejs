import {
  NotFoundError,
  validateRequest,
  objectIdCheck,
} from "@shurjomukhi/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Employee } from "../models/employee";
import { Skill } from "../models/skill";

const router = express.Router();

const validationCheck = [
  body("functionalCompetency")
    .exists()
    .withMessage("functional competency required"),
  body("employee").isMongoId(),
];

router.get(
  "/api/employee-management/skill",
  async (req: Request, res: Response) => {
    const data = await Skill.find();

    res.status(200).send(data);
  }
);

router.get(
  "/api/employee-management/skill/:id",
  async (req: Request, res: Response) => {
    const data = await Skill.findById(req.params.id);

    if (!data) {
      throw new NotFoundError();
    }

    res.status(200).send(data);
  }
);

router.get(
  "/api/employee-management/skill/employee/:id",
  async (req: Request, res: Response) => {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      throw new NotFoundError();
    }
    const data = await Skill.find({ employee });

    res.status(200).send(data);
  }
);

router.post(
  "/api/employee-management/skill",
  validationCheck,
  validateRequest,
  async (req: Request, res: Response) => {
    const {
      employee,
      functionalCompetency,
      language,
      computerSkill,
      softCompetency,
    } = req.body;

    await objectIdCheck([
      {
        name: "employee",
        objectId: employee,
        model: Employee,
      },
    ]);

    const data = Skill.build({
      employee,
      functionalCompetency,
      language,
      computerSkill,
      softCompetency,
    });

    await data.save();

    res.status(201).send(data);
  }
);

router.put(
  "/api/employee-management/skill/:id",
  validationCheck,
  validateRequest,
  async (req: Request, res: Response) => {
    const data = await Skill.findById(req.params.id);

    if (!data) {
      throw new NotFoundError();
    }

    const {
      employee,
      functionalCompetency,
      language,
      computerSkill,
      softCompetency,
    } = req.body;

    await objectIdCheck([
      {
        name: "employee",
        objectId: employee,
        model: Employee,
      },
    ]);

    data.set({
      employee,
      functionalCompetency,
      language,
      computerSkill,
      softCompetency,
    });
    await data.save();

    res.status(200).send(data);
  }
);

router.delete(
  "/api/employee-management/skill/:id",
  async (req: Request, res: Response) => {
    await Skill.findByIdAndDelete(req.params.id);
    res.status(200).send({});
  }
);

export { router as skillRouter };
