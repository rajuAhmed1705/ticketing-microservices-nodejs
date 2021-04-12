import { calDuration } from "../cal-duration";

it("calculate half day leave", () => {
  let start = new Date();
  start.setHours(14, 12);
  let end = new Date();
  end.setHours(20, 0);

  const duration = calDuration(start, end);
  expect(duration.duration).toEqual(0.5);
});

it("calculate 0 if half day is not within office hours(before office)", () => {
  let start = new Date();
  start.setHours(0, 0);
  let end = new Date();
  end.setHours(6, 0);

  const duration = calDuration(start, end);
  expect(duration.duration).toEqual(0);
});

it("calculate 0 if half day is not within office hours(after office)", () => {
  let start = new Date();
  start.setHours(19, 0);
  let end = new Date();
  end.setHours(23, 59);

  const duration = calDuration(start, end);

  expect(duration.duration).toEqual(0);
});

it("calculate 0.5 if duration is more than half day duration but office time covers less than half day", () => {
  let start = new Date();
  start.setHours(14, 0);
  let end = new Date();
  end.setHours(20, 0);

  const duration = calDuration(start, end);

  expect(duration.duration).toEqual(0.5);
});

it("calculate 1 if duration is more than half day duration", () => {
  let start = new Date();
  start.setHours(8, 0);
  let end = new Date();
  end.setHours(16, 0);

  const duration = calDuration(start, end);

  expect(duration.duration).toEqual(1);
});

it("calculate 1.5", () => {
  let start = new Date();
  start.setHours(15, 0);

  let end = new Date();
  end.setDate(start.getDate() + 1);
  end.setHours(23, 59, 59);

  const duration = calDuration(start, end);

  expect(duration.duration).toEqual(1.5);
});

it("calculate 2", () => {
  let start = new Date();
  start.setHours(12, 0);

  let end = new Date();
  end.setDate(start.getDate() + 1);
  end.setHours(23, 59, 59);

  const duration = calDuration(start, end);

  expect(duration.duration).toEqual(2);
});

it("calculate 3", () => {
  let start = new Date();
  start.setHours(12, 0);

  let end = new Date();
  end.setDate(start.getDate() + 2);
  end.setHours(23, 59, 59);

  const duration = calDuration(start, end);

  expect(duration.duration).toEqual(3);
});

it("calculate 3.5", () => {
  let start = new Date();
  start.setHours(12, 0);

  let end = new Date();
  end.setDate(start.getDate() + 3);
  end.setHours(12, 59, 59);

  const duration = calDuration(start, end);

  expect(duration.duration).toEqual(3.5);
});

it("calculate 3", () => {
  let start = new Date();
  start.setHours(14, 0, 0);

  let end = new Date();
  end.setDate(start.getDate() + 3);
  end.setHours(13, 0, 0);

  const duration = calDuration(start, end);

  expect(duration.duration).toEqual(3);
});
