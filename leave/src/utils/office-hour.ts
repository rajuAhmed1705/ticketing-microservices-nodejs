import moment from "moment";

const officeStartTime = 10;
const OfficeEndTime = 19;

export const officeHour = (start: moment.Moment, end: moment.Moment) => {
  let startHour: number = 0;
  let endHour: number = 0;
  if (
    moment.isMoment(start) &&
    moment.isMoment(end) &&
    start.isSame(end, "day")
  ) {
    let offStart = moment(start);
    offStart.hour(officeStartTime).minute(0).second(0);

    let offEnd = moment(start);
    offEnd.hour(OfficeEndTime).minute(0).second(0);

    if (start.isBetween(offStart, offEnd) && end.isBetween(offStart, offEnd)) {
      startHour = end.diff(start, "hours", true);
    }
    if (start.isBetween(offStart, offEnd) && end.isAfter(offEnd)) {
      startHour = offEnd.diff(start, "hours", true);
    }
    if (start.isBefore(offStart) && end.isBetween(offStart, offEnd)) {
      startHour = end.diff(offStart, "hours", true);
    }
  }
  if (!start.isSame(end, "day")) {
    if (moment.isMoment(start)) {
      let offStart = moment(start);
      offStart.hour(officeStartTime).minute(0).second(0);

      let offEnd = moment(start);
      offEnd.hour(OfficeEndTime).minute(0).second(0);

      startHour = offEnd.diff(start, "hours", true);
    }
    if (moment.isMoment(end)) {
      let offStart = moment(end);
      offStart.hour(officeStartTime).minute(0).second(0);

      let offEnd = moment(end);
      offEnd.hour(OfficeEndTime).minute(0).second(0);

      endHour = end.diff(offStart, "hours", true);
    }
  }

  return { startHour, endHour };
};
