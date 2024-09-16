import { render, RenderPosition } from './framework/render.js';
import FilterView from './view/filter-view.js';
import TripInfo from './view/trip-info-view.js';
import BoardPresenter from './presenter/list-presenter.js';
import PointsModel from './model/points-model.js';

const tripHeaderContainer = document.querySelector('.trip-main');
const tripFilterContainer = tripHeaderContainer.querySelector('.trip-controls__filters');

const pageMainContainer = document.querySelector('.page-main');
const tripEventsContainer = pageMainContainer.querySelector('.trip-events');

const pointsModel = new PointsModel();
const boardPresenter = new BoardPresenter({pointsContainer: tripEventsContainer, pointsModel});

render(new FilterView(), tripFilterContainer);
render(new TripInfo(), tripHeaderContainer, RenderPosition.AFTERBEGIN);

boardPresenter.init();
