import { render } from './framework/render.js';
import ListPresenter from './presenter/list-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import NewPointButtonView from './view/new-point-button-view.js';
import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
import FiltersModel from './model/filters-model.js';

const tripHeaderContainer = document.querySelector('.trip-main');
const tripFilterContainer = tripHeaderContainer.querySelector('.trip-controls__filters');
const pageMainContainer = document.querySelector('.page-main');
const tripEventsContainer = pageMainContainer.querySelector('.trip-events');

const pointsModel = new PointsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const filtersModel = new FiltersModel();

const listPresenter = new ListPresenter({
  pointsContainer: tripEventsContainer,
  pointsModel,
  offersModel,
  destinationsModel,
  filtersModel,
  headerContainer: tripHeaderContainer,
  onNewPointDestroy: handleNewPointFormClose,
});

const filterPresenter = new FilterPresenter({
  filterContainer: tripFilterContainer,
  filtersModel,
  pointsModel
});

const newPointButtonComponent = new NewPointButtonView({
  onClick: handleNewPointButtonClick
});

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}

function handleNewPointButtonClick() {
  listPresenter.createTask();
  newPointButtonComponent.element.disabled = true;
}

render(newPointButtonComponent, tripHeaderContainer);

filterPresenter.init();
listPresenter.init();
