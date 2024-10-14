import AbstractView from '../framework/view/abstract-view.js';
import { capitalizeFirstLetter } from '../utils/common.js';

const createFilterItem = (filter, counters, currentFilterType) =>
  `<div class="trip-filters__filter">
    <input id="filter-${filter}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter}" ${(filter === currentFilterType) ? 'checked' : ''} ${counters[filter] === 0 ? 'disabled' : ''}>
    <label class="trip-filters__filter-label" for="filter-${filter}">${capitalizeFirstLetter(filter)}</label>
  </div>`;

const createFilterTemplate = (filters, counters, currentFilterType) =>
  `<form class="trip-filters" action="#" method="get">
  ${filters.map((filter) => createFilterItem(filter, counters, currentFilterType)).join('')}
  <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;

export default class FilterView extends AbstractView {
  #filters = {};
  #currentFilter = null;
  #handleFilterTypeChange = null;
  #filterCounters = {};

  constructor({ filters, filterCounters, currentFilterType, onFilterTypeChange }) {
    super();
    this.#filters = filters;
    this.#filterCounters = filterCounters;
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#filterCounters, this.#currentFilter);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
  };
}
