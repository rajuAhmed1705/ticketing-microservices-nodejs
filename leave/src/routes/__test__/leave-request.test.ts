import request from "supertest";
import { app } from "../../app";
import { LeaveProfile } from "../../models/leave-profile";
import { categorySetup } from "../../test/category-setup";
import { employeeSetup } from "../../test/employee-setup";
import { requestType } from "../../test/request-type-setup";

it("creates new request", async () => {
  const category = await categorySetup();
  const employee = await employeeSetup();
  const type = await requestType();
  const leaveProfine = await LeaveProfile.find();

  console.log(employee);
  console.log(type);
  console.log(category);
  console.log(leaveProfine);
});
