import express, { Request, Response } from "express";
import { body } from "express-validator";
import { User } from "../models/user";
import { BadRequestError, validateRequest } from "@shurjomukhi/ms-common";
import jwt from "jsonwebtoken";

const router = express.Router();

const valid = [
    body("email").isEmail().withMessage("email must be valid"),
    body("password")
        .trim()
        .isLength({
            min: 4,
            max: 20,
        })
        .withMessage("password should be between 4 to 20 characters"),
];

router.post(
    "/api/users/signup",
    valid,
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new BadRequestError("email in use");
        }

        const user = User.build({
            email,
            password,
        });

        await user.save();

        //generate jwt
        const userJwt = jwt.sign(
            {
                id: user.id,
                email: user.email,
            },
            process.env.JWT_KEY!
        );

        //store in session
        req.session = { jwt: userJwt };

        res.status(201).send(user);
    }
);

export { router as signupRouter };
