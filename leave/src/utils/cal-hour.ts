import moment from "moment";

//end -- calculate to end of the day
//start - calculate from starting of the day
interface calMethod {
  time: Date;
  method: "end" | "start";
}

/* 
calculate hours for a particular day.
normally the first day of the leave and
the last day of the leave period is calculated 
*/
/**
 *
 * @param time first day or the last day of the requested leave
 * @param method
 * @returns
 */

export const calHour = (
  time: calMethod["time"],
  method: calMethod["method"]
): number | null => {
  const momentTime = moment(time);
  if (!moment.isMoment(momentTime)) return null;

  if (method === "end") {
    const lastTimeOfDay = moment(time).endOf("day");
    return lastTimeOfDay.diff(momentTime, "hour");
  }
  if (method === "start") {
    const startTimeOfDay = moment(time).startOf("day");
    return momentTime.diff(startTimeOfDay, "hour");
  }

  return null;
};
