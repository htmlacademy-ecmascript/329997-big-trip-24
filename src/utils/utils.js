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
  return dayjs(dateTo.diff(dateFrom)).format('HH[H] mm[M]');
};

export { getRandomPicture, getFormattedDayFromPointDate, getFormattedTimeFromPointDate, getTimeDelta, getFormattedTimeFromNewPointDate };
