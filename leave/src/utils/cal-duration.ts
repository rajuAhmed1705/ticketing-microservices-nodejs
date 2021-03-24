import moment from "moment";

export const calDuration = (
  startTime: Date,
  endTime: Date
): { duration: number | null; hours: number | null } => {
  const from = moment(startTime);
  const to = moment(endTime);
  if (moment.isMoment(to)) {
    const sameDay = moment(from).isSame(to, "days");
    const h = to.diff(from, "hour");
    let duration: number = 0;

    if (sameDay && h <= 5) {
      duration = 0.5;
    }
    if (sameDay && h > 5) {
      duration = 1;
    }
    if (!sameDay) {
      const checkHalf = () => (h % 24 <= 5 ? 0.5 : 1);

      duration = Math.floor(h / 24) + checkHalf();
    }

    return { duration, hours: h };
  } else {
    return { duration: null, hours: null };
  }
};
