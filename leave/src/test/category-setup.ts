import request from "supertest";
import { app } from "../app";
import { EmploymentType } from "../models/employment-type";

export const categorySetup = async () => {
  const employmentType = await EmploymentType.findOne({ name: "permanent" });
  const { body } = await request(app)
    .post("/api/leave/category")
    .send({
      name: "casual leave",
      shortForm: "CL",
      section: "Section: 115 BLA 2006",
      allottedDays: 10,
      minAvail: 0.5,
      maxAvail: 3,
      eligibleEmploymentType: [employmentType?.id],
      carryForward: false,
      minService: null,
      preapproval: true,
      maxAccumulation: null,
      payable: true,
      adjustment: "LWP",
      prefix: false,
      suffix: false,
      intervention: true,
    });

  return body;
};
