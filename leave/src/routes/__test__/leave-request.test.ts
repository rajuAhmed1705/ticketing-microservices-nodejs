import request from "supertest";
import { app } from "../../app";
import { LeaveProfile } from "../../models/leave-profile";
import { categorySetup } from "../../test/category-setup";
import { employeeSetup } from "../../test/employee-setup";
import { requestType } from "../../test/request-type-setup";

const leaveSetup = async () => {
  const category = await categorySetup();
  const { employeeinfo, employeeForReportingTo } = await employeeSetup();
  const type = await requestType();
  const leaveProfile = await LeaveProfile.find();

  let start = new Date();
  start.setHours(14, 0, 0);

  let end = new Date();
  end.setDate(start.getDate() + 3);
  end.setHours(13, 0, 0);

  return {
    category,
    employeeinfo,
    employeeForReportingTo,
    type,
    leaveProfile,
    start,
    end,
  };
};

it("fetch all the requests", async () => {
  const {
    category,
    employeeinfo,
    employeeForReportingTo,
    type,
    start,
    end,
  } = await leaveSetup();

  const { body } = await request(app)
    .post("/api/leave/leave-request")
    .send({
      employee: employeeinfo!.id,
      requestType: type!.id,
      requestTo: employeeForReportingTo.id,
      startTime: start,
      endTime: end,
      category: category.id,
    })
    .expect(201);

  const response = await request(app)
    .get("/api/leave/leave-request")
    .send()
    .expect(200);

  expect(response.body.length).toEqual(1);
});

it("fetch a request by Id", async () => {
  const {
    category,
    employeeinfo,
    employeeForReportingTo,
    type,
    start,
    end,
  } = await leaveSetup();

  const {
    body: { id: requestId },
  } = await request(app)
    .post("/api/leave/leave-request")
    .send({
      employee: employeeinfo!.id,
      requestType: type!.id,
      requestTo: employeeForReportingTo.id,
      startTime: start,
      endTime: end,
      category: category.id,
    })
    .expect(201);

  const response = await request(app)
    .get(`/api/leave/leave-request/${requestId}`)
    .send()
    .expect(200);

  expect(response.body.id).toEqual(requestId);
});

it("fetch all the requests a individual user", async () => {
  const {
    category,
    employeeinfo,
    employeeForReportingTo,
    type,
    start,
    end,
  } = await leaveSetup();

  await request(app)
    .post("/api/leave/leave-request")
    .send({
      employee: employeeinfo!.id,
      requestType: type!.id,
      requestTo: employeeForReportingTo.id,
      startTime: start,
      endTime: end,
      category: category.id,
    })
    .expect(201);

  const response = await request(app)
    .get("/api/leave/my-leave-request")
    .send({ employee: employeeinfo?.id })
    .expect(200);

  expect(response.body.length).toEqual(1);
  expect(response.body[0].employee.id).toEqual(employeeinfo?.id);
});

it("creates new leave request", async () => {
  const {
    category,
    employeeinfo,
    employeeForReportingTo,
    type,
    start,
    end,
  } = await leaveSetup();

  const response = await request(app)
    .post("/api/leave/leave-request")
    .send({
      employee: employeeinfo!.id,
      requestType: type!.id,
      requestTo: employeeForReportingTo.id,
      startTime: start,
      endTime: end,
      category: category.id,
    })
    .expect(201);

  // console.log(response.body);

  expect(response.body.status).toEqual(0);
  // console.log(employee);
  // console.log(type);
  // console.log(category);
  // console.log(leaveProfine);
});

it("cancels individual's leave request", async () => {
  const {
    category,
    employeeinfo,
    employeeForReportingTo,
    type,
    start,
    end,
  } = await leaveSetup();

  const leaveRequest = await request(app)
    .post("/api/leave/leave-request")
    .send({
      employee: employeeinfo!.id,
      requestType: type!.id,
      requestTo: employeeForReportingTo.id,
      startTime: start,
      endTime: end,
      category: category.id,
    })
    .expect(201);

  const response = await request(app)
    .post("/api/leave/leave-request-cancel")
    .send({
      request: leaveRequest.body.id,
    })
    .expect(200);

  expect(response.body.status).toEqual(3);
});

it("rejects or approve leave request", async () => {
  const {
    category,
    employeeinfo,
    employeeForReportingTo,
    type,
    start,
    end,
  } = await leaveSetup();

  const leaveRequest = await request(app)
    .post("/api/leave/leave-request")
    .send({
      employee: employeeinfo!.id,
      requestType: type!.id,
      requestTo: employeeForReportingTo.id,
      startTime: start,
      endTime: end,
      category: category.id,
    })
    .expect(201);

  let response = await request(app)
    .post("/api/leave/leave-request-approval")
    .send({
      request: leaveRequest.body.id,
      status: 1,
    })
    .expect(200);

  expect(response.body.status).toEqual(1);

  response = await request(app)
    .post("/api/leave/leave-request-approval")
    .send({
      request: leaveRequest.body.id,
      status: 2,
    })
    .expect(200);

  expect(response.body.status).toEqual(2);
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

it("updates a leave request only in pending state", async () => {
  const {
    category,
    employeeinfo,
    employeeForReportingTo,
    type,
    start,
    end,
  } = await leaveSetup();

  const {
    body: { id: requestId },
  } = await request(app)
    .post("/api/leave/leave-request")
    .send({
      employee: employeeinfo!.id,
      requestType: type!.id,
      requestTo: employeeForReportingTo.id,
      startTime: start,
      endTime: end,
      category: category.id,
      purpose: "hello2",
    })
    .expect(201);

  const response = await request(app)
    .put(`/api/leave/leave-request/${requestId}`)
    .send({
      employee: employeeinfo!.id,
      requestType: type!.id,
      requestTo: employeeForReportingTo.id,
      startTime: start,
      endTime: end,
      category: category.id,
      purpose: "hello",
    })
    .expect(200);

  expect(response.body.purpose).toEqual("hello");
});

it("deletes a request", async () => {
  const {
    category,
    employeeinfo,
    employeeForReportingTo,
    type,
    start,
    end,
  } = await leaveSetup();

  const {
    body: { id: requestId },
  } = await request(app)
    .post("/api/leave/leave-request")
    .send({
      employee: employeeinfo!.id,
      requestType: type!.id,
      requestTo: employeeForReportingTo.id,
      startTime: start,
      endTime: end,
      category: category.id,
      purpose: "hello2",
    })
    .expect(201);

  await request(app)
    .delete(`/api/leave/leave-request/${requestId}`)
    .send()
    .expect(200);

  await request(app)
    .get(`/api/leave/leave-request/${requestId}`)
    .send()
    .expect(404);
});

it("creates timeline if request is accepted", async () => {
  const {
    category,
    employeeinfo,
    employeeForReportingTo,
    type,
    start,
    end,
  } = await leaveSetup();

  const leaveRequest = await request(app)
    .post("/api/leave/leave-request")
    .send({
      employee: employeeinfo!.id,
      requestType: type!.id,
      requestTo: employeeForReportingTo.id,
      startTime: start,
      endTime: end,
      category: category.id,
    })
    .expect(201);

  let response = await request(app)
    .post("/api/leave/leave-request-approval")
    .send({
      request: leaveRequest.body.id,
      status: 1,
    })
    .expect(200);
});
