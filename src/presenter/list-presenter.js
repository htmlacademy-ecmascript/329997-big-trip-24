import { render, RenderPosition, remove } from '../framework/render.js';
import { FilterType, SortType } from '../const.js';
import { sortPointsByDate, sortPointsByTime, sortPointsByPrice } from '../utils/point.js';
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
  #allOffers = [];
  #allDestinations = [];
  #points = [];
  #filterContainer = null;
  #headerContainer = null;

  #sortComponent = null;
  #currentSortType = SortType.DAY;
  #sourcedPoints = [];

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

    this.#allOffers = this.#pointsModel.offers;
    this.#allDestinations = this.#pointsModel.destinations;
    this.#points = this.#pointsModel.points;

    /* const blankPoint = {
      ...this.#pointsModel.blankPoint,
    };
    */

    if (this.#points.length < 1) {
      this.#renderEmptyList();
      return;
    }

    this.#points = this.#points.map((point) =>
      ({
        ...point,
        destination: this.#allDestinations.find((element) => element.id === point.destination),
      }));

    this.#sourcedPoints = [...this.#points];

    this.#renderTripInfo();
    this.#renderSort();
    this.#renderList();

    this.#renderPoints();
  }

  #renderPoints() {
    this.#points.forEach((point) => this.#renderPoint(point));
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange,
    });

    render(this.#sortComponent, this.#pointsContainer, RenderPosition.AFTERBEGIN);
  }

  #removeSort() {
    remove(this.#sortComponent);
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter({
      listComponent: this.#listComponent,
      point,
      allOffers: this.#allOffers,
      destinations: this.#allDestinations,
      onFavoriteChange: this.#handleFavoriteChange,
      onModeChange: this.#handleModeChange,
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

  #handleFavoriteChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#sourcedPoints = updateItem(this.#sourcedPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortPoints(sortType);
    this.#removeSort();
    this.#renderSort();
    this.#clearPointsList();
    this.#renderPoints();
  };

  #clearPointsList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #sortPoints = (sortType) => {
    switch (sortType) {
      case SortType.DAY:
        this.#points.sort(sortPointsByDate);
        break;
      case SortType.TIME:
        this.#points.sort(sortPointsByTime);
        break;
      case SortType.PRICE:
        this.#points.sort(sortPointsByPrice);
        break;
      default:
        this.#points = [...this.#sourcedPoints];
    }
    this.#currentSortType = sortType;
  };
}
