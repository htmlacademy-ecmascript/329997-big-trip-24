import { render } from '../render';
import SortView from '../view/list-sort-view.js';
import ListView from '../view/list-view.js';
import ListItemView from '../view/list-item-view.js';
import ListEditItemView from '../view/list-edit-item-view.js';
import ListCreateItemView from '../view/list-create-item-view.js';

export default class BoardPresenter {
  listComponent = new ListView();

  constructor({eventsContainer}) {
    this.eventsContainer = eventsContainer;
  }

  init() {
    render(new SortView(), this.eventsContainer);
    render(this.listComponent, this.eventsContainer);
    render(new ListEditItemView(), this.listComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new ListItemView(), this.listComponent.getElement());
    }

    render(new ListCreateItemView(), this.listComponent.getElement());
  }
}
