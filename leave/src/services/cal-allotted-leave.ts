export const calAllottedleave = (date: Date, leave: number): number => {
  let months = 12 - date.getMonth();
  const days = date.getDate();

  if (days > 15) {
    months--;
  }

  let availedLeave = (leave * months) / 12;

  const remainder = availedLeave % 1;

  if (remainder >= 0 && remainder <= 0.25) {
    availedLeave = Math.floor(availedLeave);
  }
  if (remainder > 0.25 && remainder <= 0.75) {
    availedLeave = Math.floor(availedLeave) + 0.5;
  }
  if (remainder > 0.75) {
    availedLeave = Math.ceil(availedLeave);
  }

  return availedLeave;
};
