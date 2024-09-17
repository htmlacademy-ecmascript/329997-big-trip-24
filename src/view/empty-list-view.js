import AbstractView from '../framework/view/abstract-view.js';

const Message = {
  EVERYTHING: 'Click New Event to create your first point',
  PAST: 'There are no past events now',
  PRESENT: 'There are no present events now',
  FUTURE: 'There are no future events now',
};

const createEmptyListTemplate = (message) => `<p class="trip-events__msg">${message}</p>`;

export default class EmptyListView extends AbstractView {
  #message = Message.EVERYTHING;

  get template() {
    return createEmptyListTemplate(this.#message);
  }
}
