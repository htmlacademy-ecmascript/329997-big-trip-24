import { createElement } from '../render.js';

const createFailedLoadTemplate = () => '<p class="trip-events__msg">Failed to load latest route information</p>';

export default class FailedLoadView {
  getTemplate() {
    return createFailedLoadTemplate();
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
