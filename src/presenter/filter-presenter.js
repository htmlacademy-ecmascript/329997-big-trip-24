import { render, replace, remove } from '../framework/render.js';
import FilterView from '../view/filter-view.js';
import { FilterType, UpdateType } from '../const.js';
import { filter } from '../utils/filter.js';

export default class FilterPresenter {
  #filterContainer = null;
  #filtersModel = null;
  #pointsModel = null;
  #filterComponent = null;

  constructor({filterContainer, filtersModel, pointsModel}) {
    this.#filterContainer = filterContainer;
    this.#filtersModel = filtersModel;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filtersModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    return Object.values(FilterType).map((type) => type);
  }

  init() {
    const prevFilterComponent = this.#filterComponent;

    const filteredPointsCounters = [];
    Object.keys(FilterType).forEach((type) => filteredPointsCounters.push(filter[type](this.#pointsModel.points).length));
    const filterCounters = Object.assign(...Object.keys(FilterType).map((type, i) => ({[type]: filteredPointsCounters[i]})));

    this.#filterComponent = new FilterView({
      filters: this.filters,
      filterCounters: filterCounters,
      currentFilterType: this.#filtersModel.filter,
      onFilterTypeChange: this.#handleFilterTypeChange
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = (updateType) => {
    if (updateType === UpdateType.FAILED) {
      remove(this.#filterComponent);
      return;
    }
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filtersModel.filter === filterType) {
      return;
    }

    this.#filtersModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
