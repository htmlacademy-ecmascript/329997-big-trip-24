import { render, RenderPosition } from './render.js';
import FilterView from './view/list-filter-view.js';
import TripInfo from './view/trip-info-view.js';
import LoadingView from './view/list-loading-view.js';
import BoardPresenter from './presenter/list-presenter.js';

const loadingPage = false;

const tripHeaderContainer = document.querySelector('.trip-main');
const tripFilterContainer = tripHeaderContainer.querySelector('.trip-controls__filters');

const pageMainContainer = document.querySelector('.page-main');
const tripEventsContainer = pageMainContainer.querySelector('.trip-events');

const boardPresenter = new BoardPresenter({eventsContainer: tripEventsContainer});

render(new FilterView(), tripFilterContainer);

if (loadingPage) {
  render(new LoadingView(), tripEventsContainer);

  const addButtonItem = tripHeaderContainer.querySelector('.trip-main__event-add-btn');
  addButtonItem.disabled = true;

  const tripSortItem = tripFilterContainer.querySelectorAll('.trip-filters__filter-input');
  tripSortItem.forEach((element) => {
    element.disabled = true;
  });

} else {
  render(new TripInfo(), tripHeaderContainer, RenderPosition.AFTERBEGIN);
  boardPresenter.init();
}


