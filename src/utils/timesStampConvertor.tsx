export const unixToHourAndMinute = (unix: number) => {
  return new Date(unix * 1000).toTimeString().slice(0, 5);
};
