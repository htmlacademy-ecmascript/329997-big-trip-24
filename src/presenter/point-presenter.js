import { render, replace, remove } from '../framework/render.js';
import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';

export default class PointPresenter {
  #listComponent = null;
  #pointComponent = null;
  #pointEditComponent = null;
  #destinations = [];
  #point = {};
  #handlePointChange = null;

  constructor({ listComponent, destinations, onPointChange }) {
    this.#listComponent = listComponent;
    this.#destinations = destinations;
    this.#handlePointChange = onPointChange;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      onEditClick: () => {
        this.#replaceViewToEdit();
        document.addEventListener('keydown', this.#escKeyDownHandler);
      },
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#pointEditComponent = new EditPointView({
      point: this.#point,
      destinations: this.#destinations,
      onSaveClick: () => {
        this.#replaceEditToView();
        document.removeEventListener('keydown', this.#escKeyDownHandler);
      }
    });

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#listComponent.element);
      return;
    }

    if (this.#listComponent.element.contains(prevPointComponent.element)) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#listComponent.element.contains(prevPointEditComponent.element)) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  #replaceViewToEdit() {
    replace(this.#pointEditComponent, this.#pointComponent);
  }

  #replaceEditToView() {
    replace(this.#pointComponent, this.#pointEditComponent);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceEditToView();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #handleFavoriteClick = () => {
    this.#handlePointChange({ ...this.#point, isFavorite: !this.#point.isFavorite});
  };
}
