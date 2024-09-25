import dayjs from 'dayjs';
import { getRandomInteger } from './common.js';
import { DAY_FORMAT, POINT_TIME_FORMAT, NEW_POINT_TIME_FORMAT } from '../const.js';

const getRandomPicture = () => `https://loremflickr.com/248/152?random=${getRandomInteger(10000)}`;

const getFormattedDayFromPointDate = (date) => date ? dayjs(date).format(DAY_FORMAT) : '';

const getFormattedTimeFromPointDate = (date) => date ? dayjs(date).format(POINT_TIME_FORMAT) : '';

const getFormattedTimeFromNewPointDate = (date) => date ? dayjs(date).format(NEW_POINT_TIME_FORMAT) : '';

const getTimeDelta = (startTime, endTime) => {
  const dateFrom = dayjs(startTime);
  const dateTo = dayjs(endTime);
  const deltaInMinutes = dateTo.diff(dateFrom, 'minute');

  const days = Math.floor(deltaInMinutes / 1440);
  const hours = Math.floor((deltaInMinutes % 1440) / 60);
  const minutes = deltaInMinutes % 60;

  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');

  if (days === 0) {
    return `${formattedHours}H ${formattedMinutes}M`;
  }

  const formattedDays = String(days).padStart(2, '0');
  return `${formattedDays}D ${formattedHours}H ${formattedMinutes}M`;
};

const getTimeDeltaNotFormatted = (startTime, endTime) => {
  const dateFrom = dayjs(startTime);
  const dateTo = dayjs(endTime);
  return dateTo.diff(dateFrom);
};

export { getRandomPicture, getFormattedDayFromPointDate, getFormattedTimeFromPointDate, getTimeDelta, getTimeDeltaNotFormatted, getFormattedTimeFromNewPointDate };
