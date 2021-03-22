import request from "supertest";
import { app } from "../../app";
import { employeeSetup } from "../../test/employee-setup";

it("creates new request", async () => {
  const employee = await employeeSetup();

  console.log(employee);
});
