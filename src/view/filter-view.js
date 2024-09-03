import { createElement } from '../render.js';

const Filter = {
  EVERYTHING: {label: 'Everything', id: 'filter-everything', value: 'everything'},
  FUTURE: {label: 'Future', id: 'filter-future', value: 'future'},
  PRESENT: {label: 'Present',id: 'filter-present', value: 'present'},
  PAST: {label: 'Past',id: 'filter-past', value: 'past'},
};

const createFilterItem = (label, id, value, isChecked = false) =>
  `<div class="trip-filters__filter">
    <input id="${id}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${value}" ${isChecked ? 'checked' : ''}>
    <label class="trip-filters__filter-label" for="${id}">${label}</label>
  </div>`;

const createFilterTemplate = () =>
  `<form class="trip-filters" action="#" method="get">
  ${createFilterItem(Filter.EVERYTHING.label, Filter.EVERYTHING.id, Filter.EVERYTHING.value, false)}
  ${createFilterItem(Filter.FUTURE.label, Filter.FUTURE.id, Filter.FUTURE.value, false)}
  ${createFilterItem(Filter.PRESENT.label, Filter.PRESENT.id, Filter.PRESENT.value, false)}
  ${createFilterItem(Filter.PAST.label, Filter.PAST.id, Filter.PAST.value, true)}
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
