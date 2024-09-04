import { getRandomArrayElement } from '../utils.js';
import { getMockOffers } from './offers.js';
import { getMockDestinations } from './distinatios.js';
import { POINT_TYPES } from '../const.js';

const mockPoints = [
  {
    'id': '1',
    'base_price': 1000,
    'date_from': new Date(2024, 0, 1, 10, 0, 0).toISOString,
    'date_to': new Date(2024, 0, 2, 10, 0, 0).toISOString,
    'destination': `${getRandomArrayElement(getMockDestinations())}`,
    'is_favorite': false,
    'offers': [
      `${getRandomArrayElement(getMockOffers())}`
    ],
    'type': `${getRandomArrayElement(POINT_TYPES)}`
  },
  {
    'id': '2',
    'base_price': 2000,
    'date_from': new Date(2024, 0, 3, 10, 0, 0).toISOString,
    'date_to': new Date(2024, 0, 4, 10, 0, 0).toISOString,
    'destination': `${getRandomArrayElement(getMockDestinations())}`,
    'is_favorite': true,
    'offers': [
      `${getRandomArrayElement(getMockOffers())}`
    ],
    'type': `${getRandomArrayElement(POINT_TYPES)}`
  },
  {
    'id': '3',
    'base_price': 3000,
    'date_from': new Date(2024, 0, 5, 10, 0, 0).toISOString,
    'date_to': new Date(2024, 0, 6, 10, 0, 0).toISOString,
    'destination': `${getRandomArrayElement(getMockDestinations())}`,
    'is_favorite': false,
    'offers': [
      `${getRandomArrayElement(getMockOffers())}`
    ],
    'type': `${getRandomArrayElement(POINT_TYPES)}`
  },
  {
    'id': '4',
    'base_price': 4000,
    'date_from': new Date(2024, 0, 7, 10, 0, 0).toISOString,
    'date_to': new Date(2024, 0, 8, 10, 0, 0).toISOString,
    'destination': `${getRandomArrayElement(getMockDestinations())}`,
    'is_favorite': false,
    'offers': [
      `${getRandomArrayElement(getMockOffers())}`
    ],
    'type': `${getRandomArrayElement(POINT_TYPES)}`
  },
];

const getMockPoint = () => getRandomArrayElement(mockPoints);

export { getMockPoint };
