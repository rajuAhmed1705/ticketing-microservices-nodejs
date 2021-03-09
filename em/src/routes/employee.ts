import express, { Request, Response } from "express";
import { Employee } from "../models/employee";
import { body } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  validateRequest,
  objectIdCheck,
} from "@shurjomukhi/common";
import { Department } from "../models/department";
import { ConfirmationRule } from "../models/confirmation-rule";
import { Designation } from "../models/designation";
import { Team } from "../models/team";
import { EmploymentType } from "../models/employment-type";
import { Project } from "../models/project";
import { JobLocation } from "../models/job-location";
import { Turnover } from "../models/turnover";
import { SalaryGrade } from "../models/salary-grade";
import { Separation } from "../models/separation";
import { EmployeeStatus } from "../models/employee-status";
import { Religion } from "../models/religion";

const router = express.Router();

const validationCheck = [
  body("personalDetails.fullName")
    .exists()
    .withMessage("fullName is required")
    .isLength({ min: 2 })
    .withMessage("name must be minimum 2 characters"),
  body("personalDetails.personalEmail")
    .isEmail()
    .withMessage("email must be type email"),
  body("employeeInformation.employeeId").exists(),
];

router.get(
  "/api/employee-management/employees",
  async (req: Request, res: Response) => {
    const employees = await Employee.find();

    res.send(employees);
  }
);

router.get(
  "/api/employee-management/employee/:id",
  async (req: Request, res: Response) => {
    const employee = await Employee.findById(req.params.id).populate([
      "workExperiences",
      "skills",
      "educations",
      "trainings",
      "bankDetails",
      "addresses",
    ]);
    res.send(employee);
  }
);

router.post(
  "/api/employee-management/employee",
  validationCheck,
  validateRequest,
  async (req: Request, res: Response) => {
    const {
      personalDetails: {
        fullName,
        preferredNickName,
        fathersName,
        fathersProfession,
        mothersName,
        mothersProfession,
        maritalStatus,
        spouseName,
        dateOfBirth,
        numberOfDependents,
        nationalID,
        passport,
        birthCertificate,
        gender,
        religion,
        nationality,
        emergencyContact,
        bloodGroup,
        personalNumber,
        personalEmail,
      },
      employeeInformation: {
        employeeId,
        department,
        designation,
        team,
        employmentType,
        project,
        dateOfJoin,
        reportingTo,
        jobLocation,
        turnover,
        salaryGrade,
        separation,
        employeeStatus,
        confirmationRule,
      },
    } = req.body;

    const existingEmployeeId = await Employee.findOne({
      "employeeInformation.employeeId": employeeId,
    });
    if (existingEmployeeId) {
      throw new BadRequestError("Employee Id already exist");
    }

    /* checks if the objectId exists in the table */
    await objectIdCheck([
      {
        name: "religion",
        objectId: religion,
        model: Religion,
      },
      {
        name: "department",
        objectId: department,
        model: Department,
      },
      {
        name: "designation",
        objectId: designation,
        model: Designation,
      },
      {
        name: "team",
        objectId: team,
        model: Team,
      },
      {
        name: "employment type",
        objectId: employmentType,
        model: EmploymentType,
      },
      {
        name: "project",
        objectId: project,
        model: Project,
      },
      {
        name: "employee",
        objectId: reportingTo,
        model: Employee,
      },
      {
        name: "job location",
        objectId: jobLocation,
        model: JobLocation,
      },
      {
        name: "turnover",
        objectId: turnover,
        model: Turnover,
      },
      {
        name: "salary grade",
        objectId: salaryGrade,
        model: SalaryGrade,
      },
      {
        name: "separation",
        objectId: separation,
        model: Separation,
      },
      {
        name: "employee status",
        objectId: employeeStatus,
        model: EmployeeStatus,
      },
      {
        name: "confirmation rule",
        objectId: confirmationRule,
        model: ConfirmationRule,
      },
    ]);

    const employee = Employee.build({
      personalDetails: {
        fullName,
        preferredNickName,
        fathersName,
        fathersProfession,
        mothersName,
        mothersProfession,
        maritalStatus,
        spouseName,
        dateOfBirth,
        numberOfDependents,
        nationalID,
        passport,
        birthCertificate,
        gender,
        religion,
        nationality,
        emergencyContact,
        bloodGroup,
        personalNumber,
        personalEmail,
      },
      employeeInformation: {
        employeeId,
        department,
        designation,
        team,
        employmentType,
        project,
        dateOfJoin,
        reportingTo,
        jobLocation,
        turnover,
        salaryGrade,
        separation,
        employeeStatus,
        confirmationRule,
      },
    });

    await employee.save();

    res.status(201).send(employee);
  }
);

router.put(
  "/api/employee-management/employee/:id",
  validationCheck,
  validateRequest,
  async (req: Request, res: Response) => {
    const { personalDetails, employeeInformation } = req.body;

    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      throw new NotFoundError();
    }

    const existingEmployeeId = await Employee.findOne({
      "employeeInformation.employeeId": employeeInformation.employeeId,
    });
    if (existingEmployeeId) {
      throw new BadRequestError("employee Id exists");
    }

    /* checks if the objectId exists in the table */
    await objectIdCheck([
      {
        name: "religion",
        objectId: personalDetails.religion,
        model: Religion,
      },
      {
        name: "department",
        objectId: employeeInformation.department,
        model: Department,
      },
      {
        name: "designation",
        objectId: employeeInformation.designation,
        model: Designation,
      },
      {
        name: "team",
        objectId: employeeInformation.team,
        model: Team,
      },
      {
        name: "employment type",
        objectId: employeeInformation.employmentType,
        model: EmploymentType,
      },
      {
        name: "project",
        objectId: employeeInformation.project,
        model: Project,
      },
      {
        name: "employee",
        objectId: employeeInformation.reportingTo,
        model: Employee,
      },
      {
        name: "job location",
        objectId: employeeInformation.jobLocation,
        model: JobLocation,
      },
      {
        name: "turnover",
        objectId: employeeInformation.turnover,
        model: Turnover,
      },
      {
        name: "salary grade",
        objectId: employeeInformation.salaryGrade,
        model: SalaryGrade,
      },
      {
        name: "separation",
        objectId: employeeInformation.separation,
        model: Separation,
      },
      {
        name: "employee status",
        objectId: employeeInformation.employeeStatus,
        model: EmployeeStatus,
      },
      {
        name: "confirmation rule",
        objectId: employeeInformation.confirmationRule,
        model: ConfirmationRule,
      },
    ]);

    employee.set({
      personalDetails: {
        ...personalDetails,
      },
      employeeInformation: {
        ...employeeInformation,
      },
    });

    await employee.save();

    res.status(200).send(employee);
  }
);

router.delete(
  "/api/employee-management/employee/:id",
  async (req: Request, res: Response) => {
    res.status(200).send({});
  }
);

export { router as employeeRouter };
