import { render, replace, remove } from '../framework/render.js';
import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';

export default class PointPresenter {
  #listComponent = null;
  #pointComponent = null;
  #pointEditComponent = null;
  #destinations = [];
  #point = {};

  constructor({ listComponent, destinations }) {
    this.#listComponent = listComponent;
    this.#destinations = destinations;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView({
      point: point,
      onEditClick: () => {
        this.#replaceViewToEdit();
        document.addEventListener('keydown', this.#escKeyDownHandler);
      }
    });

    this.#pointEditComponent = new EditPointView({
      point: point,
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
}
