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

it("calculates duration", async () => {
  let start = new Date();
  start.setHours(14, 0, 0);

  let end = new Date();
  end.setDate(start.getDate() + 3);
  end.setHours(13, 0, 0);

  const response = await request(app)
    .post("/api/leave/duration")
    .send({ startTime: start, endTime: end })
    .expect(200);

  expect(response.body.duration).toEqual(3);
});
