import { EmploymentType } from "../models/employment-type";

export const employmentTypeSetup = async () => {
  const employmentType = EmploymentType.build({
    name: "permanent",
  });
  await employmentType.save();

  return employmentType;
};
