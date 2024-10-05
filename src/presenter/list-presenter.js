import { render, RenderPosition, remove } from '../framework/render.js';
import { FilterType, SortType, UpdateType, UserAction } from '../const.js';
import { sortPointsByDate, sortPointsByTime, sortPointsByPrice } from '../utils/point.js';
import SortView from '../view/sort-view.js';
import ListView from '../view/list-view.js';
import EmptyListView from '../view/empty-list-view.js';
import FilterView from '../view/filter-view.js';
import TripInfo from '../view/trip-info-view.js';
import PointPresenter from './point-presenter.js';

export default class ListPresenter {

  #pointsContainer = null;
  #pointsModel = [];
  #offersModel = [];
  #destinationsModel = [];
  #filterContainer = null;
  #headerContainer = null;

  #sortComponent = null;
  #currentSortType = SortType.DAY;

  #listComponent = new ListView();

  #pointPresenters = new Map();

  constructor({ pointsContainer, pointsModel, offersModel, destinationsModel, headerContainer, filterContainer }) {
    this.#pointsContainer = pointsContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#headerContainer = headerContainer;
    this.#filterContainer = filterContainer;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.DAY:
        return [...this.#pointsModel.points].sort(sortPointsByDate);
      case SortType.TIME:
        return [...this.#pointsModel.points].sort(sortPointsByTime);
      case SortType.PRICE:
        return [...this.#pointsModel.points].sort(sortPointsByPrice);
    }
    return this.#pointsModel.points;
  }

  get allOffers() {
    return this.#offersModel.offers;
  }

  get allDestinations() {
    return this.#destinationsModel.destinations;
  }

  init() {

    this.#renderFilters();

    /* const blankPoint = {
      ...this.#pointsModel.blankPoint,
    };
    */

    this.#renderTripInfo();
    this.#renderPointsList();
  }

  #renderPointsList() {
    render(this.#listComponent, this.#pointsContainer);

    if (this.points.length < 1) {
      this.#renderEmptyList();
      return;
    }

    this.#renderSort();
    this.points.forEach((point) => this.#renderPoint(point));
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
      allOffers: this.allOffers,
      allDestinations: this.allDestinations,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  };

  #renderEmptyList = () => {
    render(new EmptyListView(FilterType.EVERYTHING), this.#pointsContainer);
  };

  #renderTripInfo = () => {
    render(new TripInfo(), this.#headerContainer, RenderPosition.AFTERBEGIN);
  };

  #renderFilters = () => {
    render(new FilterView(), this.#filterContainer);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearPointsList();
        this.#renderPointsList();
        break;
      case UpdateType.MAJOR:
        this.#clearPointsList({ resetSortType: true });
        this.#renderPointsList();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearPointsPresenters();
    this.#removeSort();
    this.#renderPointsList();

  };

  #clearPointsPresenters() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #clearPointsList(resetSortType = false) {

    this.#clearPointsPresenters();

    remove(this.#sortComponent);
    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }
}
