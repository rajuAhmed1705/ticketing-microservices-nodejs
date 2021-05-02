import { Types } from "mongoose";
import { EmploymentType } from "../models/employment-type";

export const employmentTypeSetup = async () => {
  const employmentType = EmploymentType.build({
    id: Types.ObjectId().toHexString(),
    name: "permanent",
    remark: "permanent employee",
  });
  await employmentType.save();

  return employmentType;
};
