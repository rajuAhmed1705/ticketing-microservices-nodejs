import request from "supertest";
import { app } from "../../app";

const requestType = {
  requestName: "request",
  remarks: "request for new leave",
  status: 0,
};

//create
it("returns a 201 on successful request type created", async () => {
  await request(app)
    .post("/api/leave/request-type")
    .send({ ...requestType })
    .expect(201);
});

it("returns a 400 on missing requestName", async () => {
  await request(app)
    .post("/api/leave/request-type")
    .send({ remarks: "ksksks" })
    .expect(400);
});

it("returns a 400 on duplicate requestName", async () => {
  await request(app)
    .post("/api/leave/request-type")
    .send({ ...requestType })
    .expect(201);
  await request(app)
    .post("/api/leave/request-type")
    .send({ ...requestType })
    .expect(400);
});

//update
it("returns a 200 on successful update", async () => {
  const res = await request(app)
    .post("/api/leave/request-type")
    .send({ ...requestType })
    .expect(201);

  const updatedRequestType = {
    requestName: "hello",
    remarks: "lololo",
    status: 0,
  };

  const updatedResponse = await request(app)
    .put(`/api/leave/request-type/${res.body.id}`)
    .send({
      ...updatedRequestType,
    })
    .expect(200);

  expect(updatedRequestType.requestName).toEqual(
    updatedResponse.body.requestName
  );
  expect(updatedRequestType.remarks).toEqual(updatedResponse.body.remarks);
});

//get
it("returns a 200 on successful get", async () => {
  const created = await request(app)
    .post("/api/leave/request-type")
    .send({ ...requestType })
    .expect(201);

  const res = await request(app)
    .get(`/api/leave/request-type/${created.body.id}`)
    .send()
    .expect(200);

  expect(created.body.requestName).toEqual(res.body.requestName);
  expect(created.body.remarks).toEqual(res.body.remarks);
});

//get all
it("returns a 200 on successful get all documents", async () => {
  await request(app)
    .post("/api/leave/request-type")
    .send({ ...requestType })
    .expect(201);
  await request(app)
    .post("/api/leave/request-type")
    .send({ requestName: "hello", remarks: "lololo", status: 1 })
    .expect(201);

  const res = await request(app)
    .get(`/api/leave/request-type`)
    .send()
    .expect(200);

  expect(res.body.length).toEqual(2);
});

//status
it("returns 400 if status already exists", async () => {
  await request(app)
    .post("/api/leave/request-type")
    .send({ ...requestType })
    .expect(201);

  await request(app)
    .post("/api/leave/request-type")
    .send({ requestName: "hello", remarks: "lololo", status: 0 })
    .expect(400);
});
