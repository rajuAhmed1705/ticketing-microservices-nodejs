import { Types } from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { employmentTypeSetup } from "../../test/employment-type-setup";

const category = async () => {
  const { id: employmentId } = await employmentTypeSetup();
  return {
    name: "casual leave",
    shortForm: "CL",
    section: "Section: 115 BLA 2006",
    allottedDays: 10,
    minAvail: 0.5,
    maxAvail: 3,
    eligibleEmploymentType: [employmentId],
    carryForward: false,
    minService: null,
    yearly: true,
    preapproval: true,
    maxAccumulation: null,
    payable: true,
    adjustment: "LWP",
    prefix: false,
    suffix: false,
    intervention: true,
  };
};
//create
it("returns a 201 on successful category created", async () => {
  await request(app)
    .post("/api/leave/category")
    .send({ ...(await category()) })
    .expect(201);
});

it("returns a 400 on duplicate category name ", async () => {
  await request(app)
    .post("/api/leave/category")
    .send({ ...(await category()) })
    .expect(201);

  await request(app)
    .post("/api/leave/category")
    .send({ name: "casual leave", shortForm: "CAL" })
    .expect(400);
});

it("returns a 400 on duplicate short form", async () => {
  await request(app)
    .post("/api/leave/category")
    .send({ ...(await category()) })
    .expect(201);

  await request(app)
    .post("/api/leave/category")
    .send({ name: "Sick leave", shortForm: "CL" })
    .expect(400);
});

//get all documents
it("returns all category", async () => {
  await request(app).get("/api/leave/category").send().expect(200);
});

//document by id
it("returns category by id", async () => {
  const cat = await request(app)
    .post("/api/leave/category")
    .send({ ...(await category()) })
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

//update
it("returns 404 if category not found while updating", async () => {
  const id = Types.ObjectId().toHexString();
  const response = await request(app)
    .put(`/api/leave/category/${id}`)
    .send({ ...(await category()) })
    .expect(404);
});

it("returns 200 upon updating category", async () => {
  const cat = await request(app)
    .post("/api/leave/category")
    .send({ ...(await category()) })
    .expect(201);

  const updatedCategory = {
    name: "ksksk",
    shortForm: "CL",
    eligibleEmploymentType: [],
  };

  const response = await request(app)
    .put(`/api/leave/category/${cat.body.id}`)
    .send({ ...updatedCategory })
    .expect(200);

  expect(cat.body.name).not.toEqual(response.body.name);
  expect(updatedCategory.name).toEqual(response.body.name);
});

it("returns 400 upon updating duplicate category name and short name", async () => {
  const cat = await request(app)
    .post("/api/leave/category")
    .send({ ...(await category()) })
    .expect(201);

  const { id: employmentId } = await employmentTypeSetup();

  const secondCat = await request(app)
    .post("/api/leave/category")
    .send({
      name: "sick leave",
      shortForm: "SL",
      section: "Section: 115 BLA 2006",
      allottedDays: 10,
      minAvail: 0.5,
      maxAvail: 3,
      eligibleEmploymentType: [employmentId],
      carryForward: false,
      minService: null,
      yearly: true,
      preapproval: true,
      maxAccumulation: null,
      payable: true,
      adjustment: "LWP",
      prefix: false,
      suffix: false,
      intervention: true,
    })
    .expect(201);

  const updatedCategory = {
    name: "casual leave",
    shortForm: "SL",
    eligibleEmploymentType: [],
  };

  const updatedShortName = {
    name: "sick leave",
    shortForm: "CL",
    eligibleEmploymentType: [],
  };

  await request(app)
    .put(`/api/leave/category/${secondCat.body.id}`)
    .send({ ...updatedCategory })
    .expect(400);

  await request(app)
    .put(`/api/leave/category/${secondCat.body.id}`)
    .send({ ...updatedShortName })
    .expect(400);
});

//delete
it("deletes category", async () => {
  const cat = await request(app)
    .post("/api/leave/category")
    .send({ ...(await category()) })
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
