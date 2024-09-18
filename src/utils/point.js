import dayjs from 'dayjs';

const isFuturePoint = (dateFrom) => dateFrom && dayjs().toJSON().isBefore(dateFrom, 'D');
const isPastPoint = (dateTo) => dateTo && dayjs().toJSON().isAfter(dateTo, 'D');
const isPresentPoint = (dateFrom, dateTo) =>
  dateFrom &&
  dateTo &&
  (dayjs().toJSON().isBefore(dateFrom, 'D') || dayjs().toJSON().isSame(dateFrom, 'D')) &&
  (dayjs().toJSON().isAfter(dateTo, 'D') || dayjs().toJSON().isSame(dateTo, 'D'));

export { isFuturePoint, isPastPoint, isPresentPoint };
