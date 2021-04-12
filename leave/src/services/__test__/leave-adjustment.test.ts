import request from "supertest";
import { LeaveProfile } from "../../models/leave-profile";
import { LeaveTimeline } from "../../models/leave-timeline";
import { categorySetup } from "../../test/category-setup";
import { employeeSetup } from "../../test/employee-setup";
import { requestType } from "../../test/request-type-setup";
import { app } from "../../app";
import { leaveAdjustment } from "../leave-adjustment";

const leaveSetup = async (requestTypeStatus: number = 0) => {
  const category = await categorySetup();
  const { employeeinfo, employeeForReportingTo } = await employeeSetup();
  const type = await requestType(requestTypeStatus);
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

describe("leave adjustment", () => {
  it("calls the cron job", async () => {
    const {
      category,
      employeeinfo,
      employeeForReportingTo,
      type,
      start,
      end,
    } = await leaveSetup();

    const { body: leaveRequest } = await request(app)
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

    await request(app)
      .post("/api/leave/leave-request-approval")
      .send({
        request: leaveRequest.id,
        status: 1,
      })
      .expect(200);

    const timeline = await LeaveTimeline.findOne({
      employee: leaveRequest.employee.id,
      category: leaveRequest.category.id,
      fromDate: {
        $gte: leaveRequest.startTime,
        $lte: leaveRequest.endTime,
      },
    });

    expect(timeline).not.toBeNull();
    expect(timeline?.employee.id).toEqual(leaveRequest.employee.id);

    const leaveAdj = await leaveAdjustment();

    // const logSpy = jest.spyOn(console, "Console");
    // expect(logSpy).toBeCalledWith("do some data processing");
    // expect(cron.scheduleJob).toBeCalledWith(
    //   "2 * * * * *",
    //   expect.any(Function)
    // );
  });
});
