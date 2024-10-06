import {remove, render, RenderPosition} from '../framework/render.js';
import EditPointView from '../view/edit-point-view.js';
import {nanoid} from 'nanoid';
import {UserAction, UpdateType} from '../const.js';

export default class NewPointPresenter {
  #pointsContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #allOffers = null;
  #allDestinations = null;

  #editPointComponent = null;

  constructor({allOffers, allDestinations, pointsContainer, onDataChange, onDestroy}) {
    this.#allOffers = allOffers;
    this.#allDestinations = allDestinations;
    this.#pointsContainer = pointsContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    if (this.#editPointComponent !== null) {
      return;
    }

    this.#editPointComponent = new EditPointView({
      allOffers: this.#allOffers,
      allDestinations: this.#allDestinations,
      onSaveClick: this.#handleFormSubmit,
      onCancelClick: this.#handleCancelClick,
    });

    render(this.#editPointComponent, this.#pointsContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#editPointComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#editPointComponent);
    this.#editPointComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      { id: nanoid(), ...point },
    );
    this.destroy();
  };

  #handleCancelClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
