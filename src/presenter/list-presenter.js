import { render } from '../render';
import SortView from '../view/list-sort-view';
import ListView from '../view/list-view';
import ListItemView from '../view/list-item-view';
import ListEditItemView from '../view/list-edit-item-view';
import ListCreateItemView from '../view/list-create-item-view';

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
