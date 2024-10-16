const DAY_FORMAT = 'MMM DD';
const DAY_FORMAT_INFO = 'DD MMM';
const POINT_TIME_FORMAT = 'HH:mm';
const NEW_POINT_TIME_FORMAT = 'DD/MM/YY HH:mm';

const MINUTES_IN_DAY = 1440;
const MINUTES_IN_HOUR = 60;
const TIME_PAD_FORMAT = 2;

const FilterType = {
  EVERYTHING: 'EVERYTHING',
  FUTURE: 'FUTURE',
  PRESENT: 'PRESENT',
  PAST: 'PAST',
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export { DAY_FORMAT, DAY_FORMAT_INFO, POINT_TIME_FORMAT, NEW_POINT_TIME_FORMAT, FilterType, SortType, MINUTES_IN_DAY, MINUTES_IN_HOUR, TIME_PAD_FORMAT, UserAction, UpdateType };
