import express, { Request, Response } from "express";
import { body } from "express-validator";
import { BadRequestError } from "../errors/bad-request-error";
import { validateRequest } from "../middlewares/validate-request";
import { User } from "../models/user";
import { Password } from "../services/password";
import jwt from "jsonwebtoken";

const router = express.Router();

const valid = [
    body("email").isEmail().withMessage("email must be valid"),
    body("password")
        .trim()
        .notEmpty()
        .withMessage("you must supply a valid password"),
];

router.post(
    "/api/users/signin",
    valid,
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            throw new BadRequestError("invalid credientials");
        }

        const passwordMatch = await Password.compare(
            existingUser.password,
            password
        );

        if (!passwordMatch) {
            throw new BadRequestError("invalid credentials");
        }

        //generate jwt
        const userJwt = jwt.sign(
            {
                id: existingUser.id,
                email: existingUser.email,
            },
            process.env.JWT_KEY!
        );

        //store in session
        req.session = { jwt: userJwt };

        res.status(200).send(existingUser);
    }
);

export { router as signinRouter };
