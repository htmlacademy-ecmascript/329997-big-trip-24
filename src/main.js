import ListPresenter from './presenter/list-presenter.js';
import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';

const tripHeaderContainer = document.querySelector('.trip-main');
const tripFilterContainer = tripHeaderContainer.querySelector('.trip-controls__filters');

const pageMainContainer = document.querySelector('.page-main');
const tripEventsContainer = pageMainContainer.querySelector('.trip-events');

const pointsModel = new PointsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();

const listPresenter = new ListPresenter({
  pointsContainer: tripEventsContainer,
  pointsModel,
  offersModel,
  destinationsModel,
  headerContainer: tripHeaderContainer,
  filterContainer: tripFilterContainer,
});

listPresenter.init();
