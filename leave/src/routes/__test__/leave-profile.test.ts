import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { LeaveProfile } from "../../models/leave-profile";
import { categorySetup } from "../../test/category-setup";
import { employeeSetup } from "../../test/employee-setup";

const leaveSetup = async () => {
  const category = await categorySetup();
  const { employeeinfo } = await employeeSetup();

  return {
    category,
    employeeinfo,
  };
};

it("fetches all the leave profiles", async () => {
  await leaveSetup();

  const response = await request(app)
    .get("/api/leave/leave-profile")
    .send()
    .expect(200);

  expect(response.body.length).toEqual(2);
});

it("fetches a single profile by Id", async () => {
  await leaveSetup();

  const {
    body: [{ id }],
  } = await request(app).get("/api/leave/leave-profile").send().expect(200);

  const { body } = await request(app)
    .get(`/api/leave/leave-profile/${id}`)
    .send()
    .expect(200);

  expect(body.id).toEqual(id);
});

it("creates new profile", async () => {
  const { category, employeeinfo } = await leaveSetup();

  await LeaveProfile.deleteMany();

  await request(app)
    .post("/api/leave/leave-profile")
    .send({
      category: new mongoose.Types.ObjectId(),
      employee: employeeinfo!.id,
      remainingLeave: 3,
      createdBy: employeeinfo!.id,
    })
    .expect(404);

  await request(app)
    .post("/api/leave/leave-profile")
    .send({
      category: category.id,
      employee: new mongoose.Types.ObjectId(),
      remainingLeave: 3,
      createdBy: employeeinfo!.id,
    })
    .expect(404);

  const { body } = await request(app)
    .post("/api/leave/leave-profile")
    .send({
      category: category.id,
      employee: employeeinfo!.id,
      remainingLeave: 5,
      createdBy: employeeinfo!.id,
    })
    .expect(201);

  expect(body.remainingLeave).toEqual(5);
});

it("updates a profile by Id", async () => {
  const { category, employeeinfo } = await leaveSetup();

  const {
    body: [{ id }],
  } = await request(app).get("/api/leave/leave-profile").send().expect(200);

  const { body } = await request(app)
    .put(`/api/leave/leave-profile/${id}`)
    .send({
      category: category.id,
      remainingLeave: 3,
      updatedBy: employeeinfo!.id,
    })
    .expect(200);

  expect(body.remainingLeave).toEqual(3);
});

it("deletes a profile", async () => {
  const { category, employeeinfo } = await leaveSetup();

  const {
    body: [{ id }],
  } = await request(app).get("/api/leave/leave-profile").send().expect(200);

  await request(app)
    .delete(`/api/leave/leave-profile/${id}`)
    .send()
    .expect(200);
});
