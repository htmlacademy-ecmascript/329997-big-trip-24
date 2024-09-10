import { render } from '../render';
import SortView from '../view/sort-view.js';
import ListView from '../view/list-view.js';
import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';

export default class BoardPresenter {
  listComponent = new ListView();

  constructor({ pointsContainer, pointsModel }) {
    this.pointsContainer = pointsContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.offers = this.pointsModel.getOffers();
    this.destinations = this.pointsModel.getDestinations();
    this.points = this.pointsModel.getPoints().map((point) =>
      ({
        ...point,
        offersList: this.offers.find((element) => element.type === point.type).offers,
        destination: this.destinations.find((element) => element.id === point.destination),
      }));
    //Blank point>
    this.blankPoint = this.pointsModel.getBlankPoint();
    this.blankPoint.offersList = this.offers.find((element) => element.type === this.blankPoint.type).offers;
    //
    render(new SortView(), this.pointsContainer);
    render(this.listComponent, this.pointsContainer);
    //new point>
    render(new EditPointView({ point: this.blankPoint, destinations: this.destinations }), this.listComponent.getElement());
    //points>
    this.points.forEach((point) => render(new PointView({ point: point }), this.listComponent.getElement()));
    //edit point>
    render(new EditPointView({ point: this.points[1], destinations: this.destinations }), this.listComponent.getElement());
  }
}
