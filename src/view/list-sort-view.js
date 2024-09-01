import { createElement } from '../render.js';

const Sort = {
  DAY: {label: 'Day', itemClass: 'day', id: 'sort-day'},
  EVENT: {label: 'Events', itemClass: 'event', id: 'sort-event'},
  TIME: {label: 'Time', itemClass: 'time', id: 'sort-time'},
  PRICE: {label: 'Price', itemClass: 'price', id: 'sort-price'},
  OFFERS: {label: 'Offers', itemClass: 'offer', id: 'sort-offer'},
};

const createSortItem = (label, itemClass, id, isChecked = false, isDisabled = false) =>
  `<div class="trip-sort__item  trip-sort__item--${itemClass}">
    <input id="${id}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${id}" ${isDisabled ? 'disabled' : ''} ${isChecked ? 'checked' : ''}>
    <label class="trip-sort__btn" for="${id}">${label}</label>
  </div>`;

const createSortTemplate = () =>
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${createSortItem(Sort.DAY.label, Sort.DAY.itemClass, Sort.DAY.id, false, false)}
    ${createSortItem(Sort.EVENT.label, Sort.EVENT.itemClass, Sort.EVENT.id, false, true)}
    ${createSortItem(Sort.TIME.label, Sort.TIME.itemClass, Sort.TIME.id, false, false)}
    ${createSortItem(Sort.PRICE.label, Sort.PRICE.itemClass, Sort.PRICE.id, true, false)}
    ${createSortItem(Sort.OFFERS.label, Sort.OFFERS.itemClass, Sort.OFFERS.id, false, true)}
  </form>`;

export default class SortView {
  getTemplate() {
    return createSortTemplate();
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
