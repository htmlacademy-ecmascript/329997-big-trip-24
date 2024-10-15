import { remove, render, RenderPosition } from '../framework/render.js';
import EditPointView from '../view/edit-point-view.js';
import { UserAction, UpdateType } from '../const.js';

export default class NewPointPresenter {
  #pointsContainer = null;
  #handleDataChange = null;
  #handleModelEvent = null;
  #handleDestroy = null;

  #editPointComponent = null;

  constructor({pointsContainer, onDataChange, onModelEvent, onDestroy}) {
    this.#pointsContainer = pointsContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModelEvent = onModelEvent;
    this.#handleDestroy = onDestroy;
  }

  init(allOffers, allDestinations) {
    if (this.#editPointComponent !== null) {
      return;
    }

    this.#editPointComponent = new EditPointView({
      allOffers: allOffers,
      allDestinations: allDestinations,
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

  setSaving() {
    this.#editPointComponent.updateElement({
      isSaving: true,
      isDisabled: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#editPointComponent.updateElement({
        isSaving: false,
        isDeleting: false,
        isDisabled: false,
      });
    };
    this.#editPointComponent.shake(resetFormState);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );
  };

  #handleCancelClick = () => {
    this.#handleModelEvent(
      UpdateType.MINOR,
    );
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#handleModelEvent(
        UpdateType.MINOR,
      );
      this.destroy();
    }
  };
}
