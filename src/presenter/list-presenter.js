import { render } from '../render';
import SortView from '../view/sort-view.js';
import ListView from '../view/list-view.js';
import PointView from '../view/point-view.js';
//import EditPointView from '../view/edit-point-view.js';
import AddPointView from '../view/add-point-view.js';

export default class BoardPresenter {
  listComponent = new ListView();

  constructor({pointsContainer, pointsModel}) {
    this.pointsContainer = pointsContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    //
    this.boardPoints = [...this.pointsModel.getPoints()];
    this.boardOffers = this.pointsModel.getOffers();
    this.boardDestinations = this.pointsModel.getDestinations();
    this.boardBlankPoint = this.pointsModel.getBlankPoint();
    //
    render(new SortView(), this.pointsContainer);
    //
    render(this.listComponent, this.pointsContainer);
    render(new AddPointView({point: this.boardBlankPoint, offers: this.boardOffers, destinations: this.boardDestinations}), this.listComponent.getElement());
    //
    for (let i = 0; i < this.boardPoints.length; i++) {
      render(new PointView({point: this.boardPoints[i], offers: this.boardOffers, destinations: this.boardDestinations}), this.listComponent.getElement());
    }
    //
  }
}
