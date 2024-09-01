import { createElement } from '../render.js';

const Message = {
  EVERYTHING: 'Click New Event to create your first point',
  PAST: 'There are no past events now',
  PRESENT: 'There are no present events now',
  FUTURE: 'There are no future events now',
};

const createEmptyListTemplate = (message) => `<p class="trip-events__msg">${message}</p>`;

export default class EmptyListView {
  getTemplate() {
    return createEmptyListTemplate(this.message);
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

export { Message };
