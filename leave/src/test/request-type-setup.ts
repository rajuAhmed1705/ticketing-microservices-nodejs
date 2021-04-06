import { app } from "../app";
import request from "supertest";

export const requestType = async () => {
  const { body } = await request(app)
    .post("/api/leave/request-type")
    .send({
      requestName: "approval request",
      remarks: "request for new leave",
      status: 0,
    })
    .expect(201);

  return body;
};
