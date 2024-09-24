import { getMockPoints } from '../mock/points.js';
import { getMockOffers } from '../mock/offers.js';
import { getMockDestinations } from '../mock/distinatios.js';

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
  #points = getMockPoints();
  #offers = getMockOffers();
  #destinations = getMockDestinations();
  #blankPoint = BLANK_POINT;

  get points() {
    return this.#points;
  }

  get blankPoint() {
    return this.#blankPoint;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }
}
