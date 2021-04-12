import moment, { duration } from "moment";
import { LeaveProfile } from "../models/leave-profile";
import { LeaveTimelineDoc, LeaveTimeline } from "../models/leave-timeline";
import { calDuration } from "./cal-duration";

export const leaveAdjustment = async () => {
  const timeline = await LeaveTimeline.find({ active: true });

  let todaysLeave: LeaveTimelineDoc[] = [];
  const today = moment(new Date());

  let todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  let todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  timeline.forEach((l) => {
    today.isBetween(l.fromDate, l.toDate, "day", "[]");
    todaysLeave.push(l);
  });

  for await (const t of todaysLeave) {
    const leaveProfile = await LeaveProfile.findOne({
      employee: t.employee.id,
      category: t.category.id,
    });
    if (leaveProfile && leaveProfile.remainingLeave) {
      let d: number = 0;

      //if less than or equal to 1 day and same day
      if (
        moment(t.fromDate).isSame(moment(t.toDate), "day") &&
        t.duration <= 1
      ) {
        d = t.duration;
      }

      //if 1 day and not same day
      if (
        !moment(t.fromDate).isSame(moment(t.toDate), "day") &&
        t.duration <= 1
      ) {
        d = 0.5;
      }

      // if more than one day
      if (t.duration > 1) {
        if (moment(t.fromDate).isSame(today, "day")) {
          ({ duration: d } = calDuration(t.fromDate, todayEnd));
        }
        if (moment(t.toDate).isSame(today, "day")) {
          ({ duration: d } = calDuration(todayStart, t.toDate));
        }
        if (
          !(
            moment(t.fromDate).isSame(today, "day") &&
            moment(t.toDate).isSame(today, "day")
          )
        ) {
          d = 1;
        }
      }

      leaveProfile.set({
        remainingLeave: leaveProfile.remainingLeave - d,
      });

      await leaveProfile.save();
    }
  }
};
