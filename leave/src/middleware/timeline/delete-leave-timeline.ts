import { LeaveRequestDoc } from "../../models/leave-request";
import { LeaveTimelinDoc, LeaveTimeline } from "../../models/leave-timeline";

export const deleteLeaveTimeline = async (
  leaveRequest: LeaveRequestDoc
): Promise<LeaveTimelinDoc | null> => {
  const leaveTimeline = await LeaveTimeline.findOne({
    employee: leaveRequest.employee.id,
    category: leaveRequest.category.id,
    fromDate: {
      $gte: leaveRequest.startTime,
      $lte: leaveRequest.endTime,
    },
  });

  if (!leaveTimeline) {
    return null;
  }

  leaveTimeline.set({ active: false });
  await leaveTimeline.save();

  return leaveTimeline;
};
