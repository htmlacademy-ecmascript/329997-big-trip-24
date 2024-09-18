import { render, replace, RenderPosition } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import ListView from '../view/list-view.js';
import PointView from '../view/point-view.js';
import EmptyListView from '../view/empty-list-view.js';
import EditPointView from '../view/edit-point-view.js';
import FilterView from '../view/filter-view.js';
import TripInfo from '../view/trip-info-view.js';

export default class BoardPresenter {

  #pointsContainer = null;
  #pointsModel = null;
  #offers = [];
  #destinations = [];
  #points = [];
  #filterContainer = null;
  #headerContainer = null;

  #listComponent = new ListView();

  constructor({ pointsContainer, pointsModel, headerContainer, filterContainer }) {
    this.#pointsContainer = pointsContainer;
    this.#pointsModel = pointsModel;
    this.#headerContainer = headerContainer;
    this.#filterContainer = filterContainer;
  }

  init() {

    this.#renderList();

    this.#offers = this.#pointsModel.offers;
    this.#destinations = this.#pointsModel.destinations;
    this.#points = this.#pointsModel.points;

    /* const blankPoint = {
      ...this.#pointsModel.blankPoint,
      offersByType: this.#offers.find((element) => element.type === this.#pointsModel.blankPoint.type).offers,
    };
    */

    if (this.#points.length < 1) {
      render(new EmptyListView('EVERYTHING'), this.#listComponent.element);
    } else {
      this.#points = this.#pointsModel.points.map((point) =>
        ({
          ...point,
          offersByType: this.#offers.find((element) => element.type === point.type).offers,
          destination: this.#destinations.find((element) => element.id === point.destination),
        }));

      this.#points.forEach((point) => this.#renderPoint(point));
    }
  }

  #renderList = () => {
    render(new TripInfo(), this.#headerContainer, RenderPosition.AFTERBEGIN);
    render(new FilterView(), this.#filterContainer);
    render(new SortView(), this.#pointsContainer);
    render(this.#listComponent, this.#pointsContainer);
  };

  #renderPoint = (point) => {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceEditToView();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new PointView({
      point: point,
      onEditClick: () => {
        replaceViewToEdit();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    }
    );

    const editPointComponent = new EditPointView({
      point: point,
      destinations: this.#destinations,
      onSaveClick: () => {
        replaceEditToView();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    }
    );

    function replaceViewToEdit() {
      replace(editPointComponent, pointComponent);
    }

    function replaceEditToView() {
      replace(pointComponent, editPointComponent);
    }

    render(pointComponent, this.#listComponent.element);
  };
}
