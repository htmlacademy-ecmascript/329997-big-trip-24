import { render, replace } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import ListView from '../view/list-view.js';
import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';

export default class BoardPresenter {

  #pointsContainer = null;
  #pointsModel = null;
  #offers = [];
  #destinations = [];
  #points = [];
  #blankPoint = {};

  #listComponent = new ListView();

  constructor({ pointsContainer, pointsModel }) {
    this.#pointsContainer = pointsContainer;
    this.#pointsModel = pointsModel;
  }

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

  init() {
    this.#offers = this.#pointsModel.offers;
    this.#destinations = this.#pointsModel.destinations;
    this.#points = this.#pointsModel.points.map((point) =>
      ({
        ...point,
        offersList: this.#offers.find((element) => element.type === point.type).offers,
        destination: this.#destinations.find((element) => element.id === point.destination),
      }));

    //Blank point>
    this.#blankPoint = this.#pointsModel.blankPoint;
    this.#blankPoint.offersList = this.#offers.find((element) => element.type === this.#blankPoint.type).offers;
    //

    render(new SortView(), this.#pointsContainer);
    render(this.#listComponent, this.#pointsContainer);

    //points>
    this.#points.forEach((point) => this.#renderPoint(point));
    //
  }
}
