import AbstractView from '../framework/view/abstract-view.js';
import { capitalizeString } from '../utils/common.js';
import { SORT_TYPES } from '../const.js';

const createSortItem = (sortParameter) =>
  `<div class="trip-sort__item  trip-sort__item--${sortParameter}">
    <input id="sort-${sortParameter}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sortParameter}">
    <label class="trip-sort__btn" for="sort-${sortParameter}">${capitalizeString(sortParameter)}</label>
  </div>`;

const createSortTemplate = () =>
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  ${SORT_TYPES.map((templateItem) => createSortItem(templateItem)).join('')}
  </form>`;

export default class SortView extends AbstractView {
  get template() {
    return createSortTemplate();
  }
}
