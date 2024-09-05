import { getMockPoint } from '../mock/points.js';

const POINTS_COUNT = 4;

export default class PointsModel {
  points = Array.from({length: POINTS_COUNT}, getMockPoint);

  getPoints() {
    return this.points;
  }
}
