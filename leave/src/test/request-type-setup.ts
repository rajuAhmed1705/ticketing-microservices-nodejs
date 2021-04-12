import { app } from "../app";
import request from "supertest";

export const requestType = async (
  status: number,
  requestName: string = `test${status}`,
  remarks: string = "test"
) => {
  const { body } = await request(app)
    .post("/api/leave/request-type")
    .send({
      requestName,
      remarks,
      status,
    })
    .expect(201);

  return body;
};
