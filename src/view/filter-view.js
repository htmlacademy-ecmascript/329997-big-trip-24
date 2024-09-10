import { createElement } from '../render.js';
import { capitalizeString } from '../utils.js';
import { FILTER_TYPES } from '../const.js';

const createFilterItem = (filter) =>
  `<div class="trip-filters__filter">
    <input id="filter-${filter}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter}">
    <label class="trip-filters__filter-label" for="filter-${filter}">${capitalizeString(filter)}</label>
  </div>`;

const createFilterTemplate = () =>
  `<form class="trip-filters" action="#" method="get">
  ${FILTER_TYPES.map((filterTemplate) => createFilterItem(filterTemplate)).join('')}
  <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;

export default class FilterView {
  getTemplate() {
    return createFilterTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
