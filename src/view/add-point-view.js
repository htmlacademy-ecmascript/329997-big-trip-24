import { createElement } from '../render.js';
import { POINT_TYPES } from '../const.js';
import { capitalizeString, getFormattedTimeFromNewPointDate } from '../utils.js';

const getDestinationsList = (destinations) => {
  const destinationsNames = destinations.map((destination) => destination['name']);
  return destinationsNames;
};

const getNewPointDestination = (point, destinations) => {
  const { destination } = point;
  if (destination === '') {
    return '';
  }
  //mock testing
  const newPointDestination = destinations.find((element) => element.id === destination);
  return newPointDestination;
};

const createDestinationOptionsTemplate = (destinations) => {
  const destinationsList = getDestinationsList(destinations);
  return (
    destinationsList.map((element) =>
      `<option value=${element}></option>`
    ).join('')
  );
};

const createTypesTemplate = (types) => (
  types.map((element) => (
    `<div class="event__type-item">
      <input id="event-type-${element}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value=${element}>
      <label class="event__type-label  event__type-label--${element}" for="event-type-${element}-1">${capitalizeString(element)}</label>
    </div>`
  )).join('')
);

const getOffersForType = (type, offers) => {
  const offersForType = offers.find((element) => element.type === type).offers;
  return offersForType;
};

const createOffersForTypeTemplate = (type, offers) => {
  const offersForType = getOffersForType(type, offers);
  if (offersForType.length < 1) {
    return '';
  }
  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
      ${offersForType.map((element) =>
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${element.id}" type="checkbox" name="event-offer-${element.name}">
        <label class="event__offer-label" for="event-offer-luggage-${element.id}">
        <span class="event__offer-title">${element.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${element.price}</span>
        </label>
      </div>`).join('')}
      </section>`
  );
};

const createDestinationPhotoTemplate = (point, destinations) => {
  const destination = getNewPointDestination(point, destinations);
  const destinationPictures = destination.pictures;
  return (
    destinationPictures.map((element) =>
      `<img class="event__photo" src="${element.src}" alt="${element.description}"></img>`
    ).join(''));
};

const createDestinationTemplate = (point, destinations) => {
  const destination = getNewPointDestination(point, destinations);
  if (destination === '') {
    return '';
  }
  return (
    `<section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${destination.description}</p>
        <div class="event__photos-container">
          <div class="event__photos-tape">
          ${createDestinationPhotoTemplate(point, destinations)}
          </div>
        </div>
      </section>`
  );
};

const createAddPointTemplate = (point, offers, destinations) => {
  const { basePrice, dateFrom, dateTo, type } = point;
  const offersForType = createOffersForTypeTemplate(type, offers);
  const typesTemplate = createTypesTemplate(POINT_TYPES);
  const destination = getNewPointDestination(point, destinations);
  const destinationsList = createDestinationOptionsTemplate(destinations);
  const destinationInfo = createDestinationTemplate(point, destinations);

  return (`<li class="trip-events__item">
<form class="event event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
        ${typesTemplate}
        </fieldset>
      </div>
    </div>
    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${capitalizeString(type)}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${(destination) ? destination.name : ''}" list="destination-list-1">
      <datalist id="destination-list-1">
        ${destinationsList}
      </datalist>
    </div>
    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getFormattedTimeFromNewPointDate(dateFrom)}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getFormattedTimeFromNewPointDate(dateTo)}">
    </div>
    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
    </div>
    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">Cancel</button>
  </header>
  <section class="event__details">
    ${offersForType}
    ${destinationInfo}
  </section>
</form>
</li>`
  );
};

export default class AddPointView {
  constructor({ point, offers, destinations }) {
    this.point = point;
    this.offers = offers;
    this.destinations = destinations;
  }

  getTemplate() {
    return createAddPointTemplate(this.point, this.offers, this.destinations);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
