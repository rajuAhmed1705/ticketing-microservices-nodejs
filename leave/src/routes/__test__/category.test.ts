import { Types } from "mongoose";
import request from "supertest";
import { app } from "../../app";

const category = {
  name: "casual leave",
  shortForm: "CL",
};

it("returns a 201 on successful category created", async () => {
  await request(app)
    .post("/api/leave/category")
    .send({ ...category })
    .expect(201);
});

it("returns a 400 on duplicate category name ", async () => {
  await request(app)
    .post("/api/leave/category")
    .send({ ...category })
    .expect(201);

  await request(app)
    .post("/api/leave/category")
    .send({ name: "casual leave", shortForm: "CAL" })
    .expect(400);
});

it("returns a 400 on duplicate short form", async () => {
  await request(app)
    .post("/api/leave/category")
    .send({ ...category })
    .expect(201);

  await request(app)
    .post("/api/leave/category")
    .send({ name: "Sick leave", shortForm: "CL" })
    .expect(400);
});

it("returns all category", async () => {
  await request(app).get("/api/leave/category").send().expect(200);
});

it("returns category by id", async () => {
  const cat = await request(app)
    .post("/api/leave/category")
    .send({ ...category })
    .expect(201);

  const response = await request(app)
    .get(`/api/leave/category/${cat.body.id}`)
    .send()
    .expect(200);

  expect(cat.body.name).toEqual(response.body.name);
});

it("returns 404 if category by id not found", async () => {
  const id = Types.ObjectId().toHexString();
  const response = await request(app)
    .get(`/api/leave/category/${id}`)
    .send()
    .expect(404);
});

it("returns 404 if category not found while updating", async () => {
  const id = Types.ObjectId().toHexString();
  const response = await request(app)
    .put(`/api/leave/category/${id}`)
    .send({ ...category })
    .expect(404);
});

it("returns 200 upon updating category", async () => {
  const cat = await request(app)
    .post("/api/leave/category")
    .send({ ...category })
    .expect(201);

  const updatedCategory = {
    name: "ksksk",
    shortForm: "CL",
  };

  const response = await request(app)
    .put(`/api/leave/category/${cat.body.id}`)
    .send({ ...updatedCategory })
    .expect(200);

  expect(cat.body.name).not.toEqual(response.body.name);
  expect(updatedCategory.name).toEqual(response.body.name);
});

it("deletes category", async () => {
  const cat = await request(app)
    .post("/api/leave/category")
    .send({ ...category })
    .expect(201);

  await request(app)
    .delete(`/api/leave/category/${cat.body.id}`)
    .send()
    .expect(200);

  await request(app)
    .get(`/api/leave/category/${cat.body.id}`)
    .send()
    .expect(404);
});

it("returns 404 if category not found while deleting", async () => {
  const id = Types.ObjectId().toHexString();
  await request(app).delete(`/api/leave/category/${id}`).send().expect(404);
});
