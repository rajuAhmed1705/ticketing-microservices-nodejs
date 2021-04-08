import { officeHour } from "../office-hour";
import moment from "moment";

it("calculate office time", () => {
  let start = new Date();
  start.setHours(14, 0);
  let end = new Date();
  end.setHours(15, 0);

  const h = officeHour(moment(start), moment(end));
  expect(h.startHour).toEqual(1);
});

it("calculate office time when start time is within office time but end time is not", () => {
  let start = new Date();
  start.setHours(14, 0, 0);
  let end = new Date();
  end.setHours(23, 0);

  const h = officeHour(moment(start), moment(end));
  expect(h.startHour).toEqual(5);
});

it("calculate office time when end time is within office time but start time is not", () => {
  let start = new Date();
  start.setHours(5, 0, 0);
  let end = new Date();
  end.setHours(12, 0, 0);

  const h = officeHour(moment(start), moment(end));
  expect(h.startHour).toEqual(2);
});

it("calculate office time when start time and end time is not same date", () => {
  let start = new Date();
  start.setHours(9, 0, 0);

  let end = new Date();
  end.setDate(start.getDate() + 1);
  end.setHours(12, 0, 0);

  const h = officeHour(moment(start), moment(end));
  expect(h.startHour).not.toEqual(0);
  expect(h.endHour).not.toEqual(0);
});

it("calculate office time when start time and end time is not same date and start time is 5 hours and end time 4 hours", () => {
  let start = new Date();
  start.setHours(14, 0, 0);

  let end = new Date();
  end.setDate(start.getDate() + 1);
  end.setHours(14, 0, 0);

  const h = officeHour(moment(start), moment(end));

  expect(h.startHour).toEqual(5);
  expect(h.endHour).toEqual(4);
});
