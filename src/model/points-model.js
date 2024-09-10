import { getMockPoint } from '../mock/points.js';
import { getMockOffers } from '../mock/offers.js';
import { getMockDestinations } from '../mock/distinatios.js';

const POINTS_COUNT = 10;

const BLANK_POINT = {
  'basePrice': 0,
  'dateFrom': new Date().toISOString(),
  'dateTo': new Date().toISOString(),
  'destination': '',
  'isFavorite': false,
  'offers': [],
  'type': 'flight'
};

export default class PointsModel {
  points = Array.from({ length: POINTS_COUNT }, getMockPoint);
  offers = getMockOffers();
  destinations = getMockDestinations();
  blankPoint = BLANK_POINT;

  getPoints() {
    return this.points;
  }

  getBlankPoint() {
    return this.blankPoint;
  }

  getOffers() {
    return this.offers;
  }

  getDestinations() {
    return this.destinations;
  }
}
