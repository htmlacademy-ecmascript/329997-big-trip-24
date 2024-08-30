import { render } from './render';
import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';

const tripHeaderContainer = document.querySelector('.trip-main');
const tripFilterContainer = tripHeaderContainer.querySelector('.trip-controls__filters');

const pageMainContainer = document.querySelector('.page-main');
const tripEventsContainer = pageMainContainer.querySelector('.trip-events');

render(new FilterView(), tripFilterContainer);
render(new SortView(), tripEventsContainer);

