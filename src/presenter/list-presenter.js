import { render, RenderPosition } from '../framework/render.js';
import { FilterType } from '../const.js';
import { updateItem } from '../utils/common.js';
import SortView from '../view/sort-view.js';
import ListView from '../view/list-view.js';
import EmptyListView from '../view/empty-list-view.js';
import FilterView from '../view/filter-view.js';
import TripInfo from '../view/trip-info-view.js';
import PointPresenter from './point-presenter.js';

export default class BoardPresenter {

  #pointsContainer = null;
  #pointsModel = null;
  #offers = [];
  #destinations = [];
  #points = [];
  #filterContainer = null;
  #headerContainer = null;

  #listComponent = new ListView();

  #pointPresenters = new Map();

  constructor({ pointsContainer, pointsModel, headerContainer, filterContainer }) {
    this.#pointsContainer = pointsContainer;
    this.#pointsModel = pointsModel;
    this.#headerContainer = headerContainer;
    this.#filterContainer = filterContainer;
  }

  init() {

    this.#renderFilters();

    this.#offers = this.#pointsModel.offers;
    this.#destinations = this.#pointsModel.destinations;
    this.#points = this.#pointsModel.points;

    /* const blankPoint = {
      ...this.#pointsModel.blankPoint,
      offersByType: this.#offers.find((element) => element.type === this.#pointsModel.blankPoint.type).offers,
    };
    */

    if (this.#points.length < 1) {
      this.#renderEmptyList();
      return;
    }

    this.#points = this.#points.map((point) =>
      ({
        ...point,
        offersByType: this.#offers.find((element) => element.type === point.type).offers,
        destination: this.#destinations.find((element) => element.id === point.destination),
      }));

    this.#renderTripInfo();
    this.#renderList();
    this.#renderSort();

    this.#points.forEach((point) => this.#renderPoint(point));
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter({
      listComponent: this.#listComponent,
      point,
      destinations: this.#destinations,
      onPointChange: this.#handlePointChange,
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  };

  #renderEmptyList = () => {
    render(new EmptyListView(FilterType.EVERYTHING), this.#pointsContainer);
  };

  #renderList = () => {
    render(this.#listComponent, this.#pointsContainer);
  };

  #renderTripInfo = () => {
    render(new TripInfo(), this.#headerContainer, RenderPosition.AFTERBEGIN);
  };

  #renderFilters = () => {
    render(new FilterView(), this.#filterContainer);
  };

  #renderSort = () => {
    render(new SortView(), this.#pointsContainer, RenderPosition.AFTERBEGIN);
  };

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

}
