import { render } from '../render';
import SortView from '../view/sort-view.js';
import ListView from '../view/list-view.js';
import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';
import AddPointView from '../view/add-point-view.js';

export default class BoardPresenter {
  listComponent = new ListView();

  constructor({eventsContainer}) {
    this.eventsContainer = eventsContainer;
  }

  init() {
    render(new SortView(), this.eventsContainer);
    render(this.listComponent, this.eventsContainer);
    render(new EditPointView(), this.listComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new PointView(), this.listComponent.getElement());
    }

    render(new AddPointView(), this.listComponent.getElement());
  }
}
