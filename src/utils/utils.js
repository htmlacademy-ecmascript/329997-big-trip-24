import dayjs from 'dayjs';
import { DAY_FORMAT, DAY_FORMAT_INFO, POINT_TIME_FORMAT, NEW_POINT_TIME_FORMAT, MINUTES_IN_DAY, MINUTES_IN_HOUR, TIME_PAD_FORMAT } from '../const.js';


const getFormattedDayFromPointDate = (date) => date ? dayjs(date).format(DAY_FORMAT) : '';

const getFormattedDayInfoFromPointDate = (date) => date ? dayjs(date).format(DAY_FORMAT_INFO) : '';

const getFormattedTimeFromPointDate = (date) => date ? dayjs(date).format(POINT_TIME_FORMAT) : '';

const getFormattedTimeFromNewPointDate = (date) => date ? dayjs(date).format(NEW_POINT_TIME_FORMAT) : '';

const getTimeDelta = (startTime, endTime) => {
  const dateFrom = dayjs(startTime);
  const dateTo = dayjs(endTime);
  const deltaInMinutes = dateTo.diff(dateFrom, 'minute');

  const days = Math.floor(deltaInMinutes / MINUTES_IN_DAY);
  const hours = Math.floor((deltaInMinutes % MINUTES_IN_DAY) / MINUTES_IN_HOUR);
  const minutes = deltaInMinutes % MINUTES_IN_HOUR;

  const formattedHours = String(hours).padStart(TIME_PAD_FORMAT, '0');
  const formattedMinutes = String(minutes).padStart(TIME_PAD_FORMAT, '0');

  if (days === 0) {
    return `${formattedHours}H ${formattedMinutes}M`;
  }

  const formattedDays = String(days).padStart(TIME_PAD_FORMAT, '0');
  return `${formattedDays}D ${formattedHours}H ${formattedMinutes}M`;
};

const getTimeDeltaNotFormatted = (startTime, endTime) => {
  const dateFrom = dayjs(startTime);
  const dateTo = dayjs(endTime);
  return dateTo.diff(dateFrom);
};

export { getFormattedDayFromPointDate, getFormattedTimeFromPointDate, getFormattedDayInfoFromPointDate, getTimeDelta, getTimeDeltaNotFormatted, getFormattedTimeFromNewPointDate };
