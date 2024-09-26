import AbstractView from '../framework/view/abstract-view.js';
import { capitalizeFirstLetter } from '../utils/common.js';
import { SortType } from '../const.js';

const createSortItem = (sortParameter, currentSortType) =>
  `<div class="trip-sort__item  trip-sort__item--${sortParameter}">
    <input id="sort-${sortParameter}"
    class="trip-sort__input  visually-hidden"
    type="radio"
    name="trip-sort"
    value="sort-${sortParameter}"
    ${(sortParameter === SortType.OFFERS || sortParameter === SortType.EVENT) ? 'disabled' : ''}
    ${sortParameter === currentSortType ? 'checked' : ''}>
    <label class="trip-sort__btn" for="sort-${sortParameter}" data-sort-type="${sortParameter}">${capitalizeFirstLetter(sortParameter)}</label>
  </div>`;

const createSortTemplate = (currentSortType) =>
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  ${Object.values(SortType).map((sortParameter) => createSortItem(sortParameter, currentSortType)).join('')}
  </form>`;

export default class SortView extends AbstractView {

  #handleSortTypeChange = null;
  #currentSortType = null;

  constructor({currentSortType, onSortTypeChange}) {
    super();
    this.#currentSortType = currentSortType;
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'LABEL') {
      return;
    }
    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
