import moment from "moment";

/**
 *
 * @param time start/end date of requested leave
 * @returns if the time is during office hour
 */
export const officeTime = (time: Date): boolean => {
  const t = moment(time);
  const hour = t.hour();

  let officeTime: boolean;
  if (hour >= 8 && hour <= 19) {
    officeTime = true;
  } else {
    officeTime = false;
  }
  return officeTime;
};
