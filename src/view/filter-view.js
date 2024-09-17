import AbstractView from '../framework/view/abstract-view.js';
import { capitalizeString } from '../utils/common.js';

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const createFilterItem = (filter) =>
  `<div class="trip-filters__filter">
    <input id="filter-${filter}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter}" ${(filter === 'everything') ? 'checked' : ''}>
    <label class="trip-filters__filter-label" for="filter-${filter}">${capitalizeString(filter)}</label>
  </div>`;

const createFilterTemplate = () =>
  `<form class="trip-filters" action="#" method="get">
  ${Object.values(FilterType).map((filterTemplate) => createFilterItem(filterTemplate)).join('')}
  <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;

export default class FilterView extends AbstractView {

  get template() {
    return createFilterTemplate();
  }
}
