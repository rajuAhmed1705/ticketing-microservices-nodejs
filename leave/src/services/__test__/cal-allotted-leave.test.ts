import { calAllottedleave } from "../cal-allotted-leave";

it("calculate the allotted days", async () => {
  let d = new Date();
  d.setDate(12);
  d.setMonth(2);
  const leave = 10;
  const r = calAllottedleave(d, leave);
  expect(r).toEqual(8.5);
});
