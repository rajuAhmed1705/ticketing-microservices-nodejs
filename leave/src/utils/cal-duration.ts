import moment from "moment";
import { officeHour } from "./office-hour";

const halfDayHour = 5;

const calculateDuration = (h: number): number => {
  if (h <= halfDayHour && h > 0) {
    return 0.5;
  }
  if (h > halfDayHour) {
    return 1;
  }
  return 0;
};

export const calDuration = (
  startTime: Date,
  endTime: Date
): {
  duration: number;
  hours: number;
} => {
  const from = moment(startTime);
  const to = moment(endTime);
  if (moment.isMoment(to)) {
    const sameDay = moment(from).isSame(to, "days");
    const h = to.diff(from, "hour");
    let duration: number = 0;

    if (sameDay && moment.isMoment(from) && moment.isMoment(to)) {
      const h = officeHour(from, to);
      duration = calculateDuration(h.startHour);
    }
    if (!sameDay) {
      const startingDay = calculateDuration(officeHour(from, to).startHour);
      const endingDay = calculateDuration(officeHour(from, to).endHour);

      let middleDays = 0;
      const fromBeginning = from.startOf("day");
      const toEnding = to.endOf("day");

      middleDays = toEnding.diff(fromBeginning, "day", true) - 2;

      duration = startingDay + Math.ceil(middleDays) + endingDay;
    }

    return {
      duration,
      hours: h,
    };
  } else {
    return {
      duration: 0,
      hours: 0,
    };
  }
};
