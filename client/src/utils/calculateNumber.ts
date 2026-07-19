export const calculateNumber = (
  startDate: string | Date,
  logDate: string | Date,
) => {
  const start = new Date(startDate);
  const log = new Date(logDate);

  start.setUTCHours(0, 0, 0, 0);
  log.setUTCHours(0, 0, 0, 0);

  const diffInMs = log.getTime() - start.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  return diffInDays + 1;
};
