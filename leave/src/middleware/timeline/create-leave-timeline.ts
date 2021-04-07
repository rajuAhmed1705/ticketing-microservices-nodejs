import { Conflict } from "../../models/conflict";
import { LeaveRequestDoc } from "../../models/leave-request";
import { LeaveTimeline } from "../../models/leave-timeline";

export const createLeaveTimeline = async (leaveRequest: LeaveRequestDoc) => {
  let docData: unknown;

  const existingLeaveTimeline = await LeaveTimeline.findOne({
    employee: leaveRequest.employee.id,
    category: leaveRequest.category.id,
    fromDate: {
      $gte: leaveRequest.startTime,
      $lte: leaveRequest.endTime,
    },
  });

  if (existingLeaveTimeline) {
    const conflict = Conflict.build({
      modelName: existingLeaveTimeline.collection.collectionName,
      docId: existingLeaveTimeline.id,
      remarks: `leave timeline exists for ${leaveRequest.employee.personalDetails.fullName} for the given time. please fix the conflict manually`,
    });

    docData = await conflict.save();
  } else {
    const leaveTimeline = LeaveTimeline.build({
      employee: leaveRequest.employee.id,
      category: leaveRequest.category.id,
      request: leaveRequest.id,
      fromDate: leaveRequest.startTime,
      toDate: leaveRequest.endTime,
      duration: leaveRequest.duration,
    });
    docData = await leaveTimeline.save();
  }

  return docData;
};
