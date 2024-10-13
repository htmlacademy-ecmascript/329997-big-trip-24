import { RenderPosition, replace, render, remove } from '../framework/render.js';
import { UpdateType } from '../const.js';
import TripInfo from '../view/trip-info-view.js';
import { getDestination } from '../utils/point.js';
import { getFormattedDayInfoFromPointDate } from '../utils/utils.js';

export default class TripInfoPresenter {
  #headerContainer = null;
  #pointsModel = null;
  #tripInfoComponent = null;
  #points = null;
  #destinations = null;

  constructor({ headerContainer, pointsModel }) {
    this.#pointsModel = pointsModel;
    this.#headerContainer = headerContainer;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  init() {
    const prevTripInfoComponent = this.#tripInfoComponent;
    this.#points = this.#pointsModel.points;
    this.#destinations = this.#pointsModel.destinations;

    if (this.#points.length === 0) {
      return;
    }

    this.#tripInfoComponent = new TripInfo({
      route: this.#getTripRoute(),
      dates: this.#getTripDates(),
      totalCost: this.#getTotalCost(),
    });

    if (prevTripInfoComponent === null) {
      render(this.#tripInfoComponent, this.#headerContainer, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#tripInfoComponent, prevTripInfoComponent);
    remove(prevTripInfoComponent);
  }

  #getTripRoute = () => {
    const tripDestinations = this.#points.map((point) => getDestination(this.#destinations, point.destination));
    const tripDestinationsNames = tripDestinations.map((destination) => destination.name);

    if (tripDestinations.length === 0) {
      return;
    }
    if (tripDestinations.length <= 3) {
      return tripDestinationsNames.join(' — ');
    } else {
      return `${tripDestinationsNames[0]} — ... — ${tripDestinationsNames[tripDestinationsNames.length - 1]}`;
    }
  };

  #getTripDates = () => {
    const tripDatesFrom = this.#points.map((point) => point.dateFrom);
    const tripDateBeginning = getFormattedDayInfoFromPointDate(tripDatesFrom[0]);

    const tripDatesTo = this.#points.map((point) => point.dateTo);
    const tripDatesEnding = getFormattedDayInfoFromPointDate(tripDatesTo[tripDatesTo.length - 1]);

    return `${tripDateBeginning} — ${tripDatesEnding}`;
  };

  #getTotalCost = () => {
    const pointPrices = this.#points.map((point) => Number(point.basePrice));
    return pointPrices.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  };

  #handleModelEvent = (updateType) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.init();
        break;
      case UpdateType.MINOR:
        this.init();
        break;
      case UpdateType.MAJOR:
        this.init();
        break;
      case UpdateType.INIT:
        this.init();
        break;
      case UpdateType.FAILED:
        remove(this.#tripInfoComponent);
        break;
    }
  };
}
