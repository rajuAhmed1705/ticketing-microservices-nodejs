import {
    BadRequestError,
    NotFoundError,
    validateRequest,
    objectIdCheck,
} from "@shurjomukhi/common";
import { Router, Request, Response } from "express";
import { body } from "express-validator";
import { Address } from "../models/address";
import { Employee } from "../models/employee";

const validationCheck = [
    body("addressType")
        .isIn(["present", "permanent", "emergency"])
        .withMessage("invalid address type"),
    body("employee").isMongoId(),
];

const router = Router();

router.get(
    "/api/employee-management/address",
    async (req: Request, res: Response) => {
        const address = await Address.find();

        res.status(200).send(address);
    }
);

router.get(
    "/api/employee-management/address/:id",
    async (req: Request, res: Response) => {
        const address = await Address.findById(req.params.id);

        if (!address) {
            throw new NotFoundError("address not found");
        }

        res.status(200).send(address);
    }
);

router.post(
    "/api/employee-management/address",
    validationCheck,
    validateRequest,
    async (req: Request, res: Response) => {
        const {
            employee,
            addressType,
            contact,
            street,
            thana,
            district,
            division,
        } = req.body;

        if (addressType === "emergency" && !contact) {
            throw new BadRequestError(
                "emergency type has mandatory contact field"
            );
        }

        await objectIdCheck([
            {
                name: "employee",
                objectId: employee,
                model: Employee,
            },
        ]);

        const existingAddress = await Address.findOne({
            employee,
            addressType,
        });

        if (existingAddress) {
            throw new BadRequestError(
                "address type already exists for this employee"
            );
        }

        const address = Address.build({
            employee,
            addressType,
            contact,
            street,
            thana,
            district,
            division,
        });

        await address.save();

        res.status(201).send(address);
    }
);

router.put(
    "/api/employee-management/address/:id",
    validationCheck,
    validateRequest,
    async (req: Request, res: Response) => {
        const { addressType, employee, contact } = req.body;

        if (addressType === "emergency" && !contact) {
            throw new BadRequestError(
                "emergency type has mandatory contact field"
            );
        }

        const address = await Address.findById(req.params.id);
        if (!address) {
            throw new NotFoundError("address not found");
        }

        await objectIdCheck([
            {
                name: "employee",
                objectId: employee,
                model: Employee,
            },
        ]);

        const existingAddress = await Address.findOne({
            addressType,
            employee,
            _id: {
                $ne: req.params.id,
            },
        });
        if (existingAddress) {
            throw new BadRequestError(
                "address type already exists for this employee"
            );
        }

        address.set({
            ...req.body,
        });

        await address.save();

        res.status(200).send(address);
    }
);

router.delete(
    "/api/employee-management/address/:id",
    async (req: Request, res: Response) => {
        await Address.findByIdAndDelete(req.params.id);

        res.status(200).send({});
    }
);

export { router as addressRouter };
