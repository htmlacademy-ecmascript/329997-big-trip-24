import AbstractView from '../framework/view/abstract-view.js';

const Message = {
  EVERYTHING: 'Click New Event to create your first point',
  PAST: 'There are no past events now',
  PRESENT: 'There are no present events now',
  FUTURE: 'There are no future events now',
};

const createEmptyListTemplate = (messageType) => `<p class="trip-events__msg">${Message[messageType]}</p>`;

export default class EmptyListView extends AbstractView {
  #messageType = null;

  constructor(messageType) {
    super();
    this.#messageType = messageType;
  }

  get template() {
    return createEmptyListTemplate(this.#messageType);
  }
}
