import { render, RenderPosition } from './render.js';
import FilterView from './view/filter-view.js';
import TripInfo from './view/trip-info-view.js';
import BoardPresenter from './presenter/list-presenter.js';

const tripHeaderContainer = document.querySelector('.trip-main');
const tripFilterContainer = tripHeaderContainer.querySelector('.trip-controls__filters');

const pageMainContainer = document.querySelector('.page-main');
const tripEventsContainer = pageMainContainer.querySelector('.trip-events');

const boardPresenter = new BoardPresenter({eventsContainer: tripEventsContainer});

render(new FilterView(), tripFilterContainer);
render(new TripInfo(), tripHeaderContainer, RenderPosition.AFTERBEGIN);
boardPresenter.init();
