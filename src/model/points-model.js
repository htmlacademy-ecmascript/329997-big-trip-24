import { getMockPoint } from '../mock/points.js';
import { getMockOffers } from '../mock/offers.js';
import { getMockDestinations } from '../mock/distinatios.js';

const POINTS_COUNT = 10;

export default class PointsModel {
  points = Array.from({ length: POINTS_COUNT }, getMockPoint);
  offers = getMockOffers();
  destinations = getMockDestinations();


  getPoints() {
    return this.points;
  }

  getOffers() {
    return this.offers;
  }

  getDestinations() {
    return this.destinations;
  }
}
