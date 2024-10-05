import { render, replace, remove } from '../framework/render.js';
import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';
import {UserAction, UpdateType} from '../const.js';
import { isDatesEqual } from '../utils/point.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #listComponent = null;
  #pointComponent = null;
  #pointEditComponent = null;
  #allOffers = [];
  #allDestinations = [];
  #point = {};
  #mode = Mode.DEFAULT;
  #handleDataChange = null;
  #handleModeChange = null;

  constructor({ listComponent, allOffers, allDestinations, onDataChange, onModeChange }) {
    this.#listComponent = listComponent;
    this.#allOffers = allOffers;
    this.#allDestinations = allDestinations;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      allOffers: this.#allOffers,
      allDestinations: this.#allDestinations,
      onEditClick: () => {
        this.#replaceViewToEdit();
        document.addEventListener('keydown', this.#escKeyDownHandler);
      },
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#pointEditComponent = new EditPointView({
      point: this.#point,
      allOffers: this.#allOffers,
      allDestinations: this.#allDestinations,
      onCancelClick: () => {
        this.#pointEditComponent.reset(this.#point);
        this.#replaceEditToView();
        this.#removeEscKeyDownListener();
      },
      onSaveClick: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
    });

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#listComponent.element);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#pointEditComponent.reset(this.#point);
      this.#replaceEditToView();
    }
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  #removeEscKeyDownListener() {
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceViewToEdit() {
    replace(this.#pointEditComponent, this.#pointComponent);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceEditToView() {
    replace(this.#pointComponent, this.#pointEditComponent);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#pointEditComponent.reset(this.#point);
      this.#replaceEditToView();
      this.#removeEscKeyDownListener();
    }
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      { ...this.#point, isFavorite: !this.#point.isFavorite},
    );
  };

  #handleFormSubmit = (update) => {
    const isMinorUpdate = !(isDatesEqual(this.#point.dateFrom, update.dateFrom) || isDatesEqual(this.#point.dateTo, update.dateTo));

    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update,
    );
    this.#replaceEditToView();
  };

  #handleDeleteClick = (point) => {
    this.#handleDataChange(
      UserAction.DELETE_TASK,
      UpdateType.MINOR,
      point,
    );
  };
}
