import express, { Request, Response } from "express";

const router = express.Router();

router.post("/api/leave/leave-request", async (req: Request, res: Response) => {
  res.status(201).send({});
});

export { router as leaveRequestRouter };
