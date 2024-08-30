import { render } from './render';
import FilterView from './view/filter-view.js';

const mainContainer = document.querySelector('.trip-main');
const filterContainer = mainContainer.querySelector('.trip-controls__filters');

render(new FilterView(), filterContainer);
