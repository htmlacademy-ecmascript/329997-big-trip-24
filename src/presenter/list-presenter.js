import { render, RenderPosition, remove } from '../framework/render.js';
import { FilterType, SortType, UpdateType, UserAction } from '../const.js';
import { sortPointsByDate, sortPointsByTime, sortPointsByPrice } from '../utils/point.js';
import { filter } from '../utils/filter.js';
import SortView from '../view/sort-view.js';
import ListView from '../view/list-view.js';
import LoadingView from '../view/loading-view.js';
import EmptyListView from '../view/empty-list-view.js';
import TripInfo from '../view/trip-info-view.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';

export default class ListPresenter {

  #pointsContainer = null;
  #pointsModel = [];
  #filtersModel = null;
  #headerContainer = null;
  #emptyListComponent = null;
  #newPointPresenter = null;

  #sortComponent = null;
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;

  #listComponent = new ListView();
  #loadingComponent = new LoadingView();

  #pointPresenters = new Map();

  constructor({ pointsContainer, pointsModel, filtersModel, headerContainer, onNewPointDestroy}) {
    this.#pointsContainer = pointsContainer;
    this.#pointsModel = pointsModel;
    this.#filtersModel = filtersModel;
    this.#headerContainer = headerContainer;

    this.#newPointPresenter = new NewPointPresenter({
      pointsContainer: this.#listComponent.element,
      onDataChange: this.#handleViewAction,
      onModelEvent: this.#handleModelEvent,
      onDestroy: onNewPointDestroy,
    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filtersModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filtersModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.DAY:
        return filteredPoints.sort(sortPointsByDate);
      case SortType.TIME:
        return filteredPoints.sort(sortPointsByTime);
      case SortType.PRICE:
        return filteredPoints.sort(sortPointsByPrice);
    }
    return filteredPoints;
  }

  get allOffers() {
    return this.#pointsModel.offers;
  }

  get allDestinations() {
    return this.#pointsModel.destinations;
  }

  init() {

    this.#renderTripInfo();
    this.#renderPointsList();
  }

  createPoint() {
    this.#currentSortType = SortType.DEFAULT;
    this.#filtersModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init(this.allOffers, this.allDestinations);
    this.#removeSort();
    this.#renderSort();
    if (this.#emptyListComponent) {
      remove(this.#emptyListComponent);
    }
  }

  #renderPointsList() {
    render(this.#listComponent, this.#pointsContainer);

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (this.points.length === 0) {
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

  #renderLoading() {
    render(this.#loadingComponent, this.#listComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderEmptyList() {
    this.#emptyListComponent = new EmptyListView(this.#filterType);
    render(this.#emptyListComponent, this.#pointsContainer, RenderPosition.AFTERBEGIN);
  }

  #renderTripInfo = () => {
    render(new TripInfo(), this.#headerContainer, RenderPosition.AFTERBEGIN);
  };

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
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
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
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

    this.#newPointPresenter.destroy();
    this.#clearPointsPresenters();

    if (this.#loadingComponent) {
      remove(this.#loadingComponent);
    }
    if (this.#emptyListComponent) {
      remove(this.#emptyListComponent);
    }
    remove(this.#sortComponent);
    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }
}
