import AbstractView from '../framework/view/abstract-view.js';

function createNewTaskButtonTemplate() {
  return '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';
}

export default class NewPointButtonView extends AbstractView {
  #handleClick = null;

  constructor({onClick}) {
    super();
    this.#handleClick = onClick;
    this.element.addEventListener('click', this.#newPointClickHandler);
  }

  get template() {
    return createNewTaskButtonTemplate();
  }

  #newPointClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}
