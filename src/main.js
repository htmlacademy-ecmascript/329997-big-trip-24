import ListPresenter from './presenter/list-presenter.js';
import PointsModel from './model/points-model.js';

const tripHeaderContainer = document.querySelector('.trip-main');
const tripFilterContainer = tripHeaderContainer.querySelector('.trip-controls__filters');

const pageMainContainer = document.querySelector('.page-main');
const tripEventsContainer = pageMainContainer.querySelector('.trip-events');

const pointsModel = new PointsModel();
const listPresenter = new ListPresenter({
  pointsContainer: tripEventsContainer,
  pointsModel,
  headerContainer: tripHeaderContainer,
  filterContainer: tripFilterContainer,
});

listPresenter.init();
