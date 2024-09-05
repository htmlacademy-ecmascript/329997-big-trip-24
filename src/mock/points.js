import { getRandomArrayElement } from '../utils.js';
import { getMockOffers } from './offers.js';
import { getMockDestinations } from './distinatios.js';
import { POINT_TYPES } from '../const.js';

const mockPoints = [
  {
    'id': '1',
    'base_price': 100,
    'date_from': new Date(2024, 0, 1, 20, 22, 22).toISOString(),
    'date_to': new Date(2024, 0, 2, 11, 32, 0).toISOString(),
    'destination': getRandomArrayElement(getMockDestinations()),
    'is_favorite': false,
    'offers': [
      getRandomArrayElement(getMockOffers())
    ],
    'type': getRandomArrayElement(POINT_TYPES)
  },
  {
    'id': '2',
    'base_price': 200,
    'date_from': new Date(2024, 2, 3, 10, 20, 0).toISOString(),
    'date_to': new Date(2024, 2, 4, 12, 12, 0).toISOString(),
    'destination': getRandomArrayElement(getMockDestinations()),
    'is_favorite': true,
    'offers': [
      getRandomArrayElement(getMockOffers())
    ],
    'type': getRandomArrayElement(POINT_TYPES)
  },
  {
    'id': '3',
    'base_price': 300,
    'date_from': new Date(2024, 4, 5, 10, 30, 0).toISOString(),
    'date_to': new Date(2024, 4, 6, 13, 10, 0).toISOString(),
    'destination': getRandomArrayElement(getMockDestinations()),
    'is_favorite': false,
    'offers': [
      getRandomArrayElement(getMockOffers())
    ],
    'type': getRandomArrayElement(POINT_TYPES)
  },
  {
    'id': '4',
    'base_price': 400,
    'date_from': new Date(2024, 6, 7, 10, 40, 0).toISOString(),
    'date_to': new Date(2024, 6, 8, 14, 40, 0).toISOString(),
    'destination': getRandomArrayElement(getMockDestinations()),
    'is_favorite': false,
    'offers': [
      getRandomArrayElement(getMockOffers())
    ],
    'type': getRandomArrayElement(POINT_TYPES)
  },
];

const getMockPoint = () => getRandomArrayElement(mockPoints);

export { getMockPoint };
