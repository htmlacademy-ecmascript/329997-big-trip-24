import AbstractView from '../framework/view/abstract-view.js';
import { FilterType } from '../const.js';

const Message = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.FUTURE]: 'There are no future events now',
};

const createEmptyListTemplate = (filterType) => {
  const emptyListMessage = Message[filterType];
  return `<p class="trip-events__msg">${emptyListMessage}</p>`;
};

export default class EmptyListView extends AbstractView {
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createEmptyListTemplate(this.#filterType);
  }
}
