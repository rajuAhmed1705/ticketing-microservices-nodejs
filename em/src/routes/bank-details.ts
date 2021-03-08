import {
    NotFoundError,
    objectIdCheck,
    validateRequest,
} from "@shurjomukhi/common";
import express, { Request, Response } from "express";
import { BankDetails } from "../models/bank-details";
import { Employee } from "../models/employee";
import { body } from "express-validator";

const validationCheck = [
    body("employee").isMongoId().withMessage("employee ID is required"),
    body("accountName").exists().withMessage("account name must be a string"),
    body("accountNumber")
        .exists()
        .withMessage("account number must be a string"),
];

const router = express.Router();

router.get(
    "/api/employee-management/bank",
    async (req: Request, res: Response) => {
        const data = await BankDetails.find();

        res.status(200).send(data);
    }
);

router.get(
    "/api/employee-management/bank/:id",
    async (req: Request, res: Response) => {
        const data = await BankDetails.findById(req.params.id);

        if (!data) {
            throw new NotFoundError();
        }

        res.status(200).send(data);
    }
);

router.get(
    "/api/employee-management/bank/employee/:id",
    async (req: Request, res: Response) => {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            throw new NotFoundError();
        }
        const data = await BankDetails.find({ employee });

        res.status(200).send(data);
    }
);

router.post(
    "/api/employee-management/bank",
    validationCheck,
    validateRequest,
    async (req: Request, res: Response) => {
        const {
            employee,
            accountName,
            accountNumber,
            bankName,
            branchName,
            address,
            accountType,
            purposeOfUse,
        } = req.body;

        await objectIdCheck([
            {
                name: "employee",
                objectId: employee,
                model: Employee,
            },
        ]);

        const data = BankDetails.build({
            employee,
            accountName,
            accountNumber,
            bankName,
            branchName,
            address,
            accountType,
            purposeOfUse,
        });

        await data.save();

        res.status(201).send(data);
    }
);

router.put(
    "/api/employee-management/bank/:id",
    validationCheck,
    validateRequest,
    async (req: Request, res: Response) => {
        const data = await BankDetails.findById(req.params.id);

        if (!data) {
            throw new NotFoundError();
        }

        /* accountName and accountNumber used in express validator */
        const { employee, accountName, accountNumber } = req.body;

        await objectIdCheck([
            {
                name: "employee",
                objectId: employee,
                model: Employee,
            },
        ]);

        data.set({
            ...req.body,
        });
        await data.save();

        res.status(200).send(data);
    }
);

router.delete(
    "/api/employee-management/bank/:id",
    async (req: Request, res: Response) => {
        await BankDetails.findByIdAndDelete(req.params.id);
        res.status(200).send({});
    }
);

export { router as bankDetailsRouter };
