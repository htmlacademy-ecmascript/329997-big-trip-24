import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { POINT_TYPES } from '../const.js';
import { capitalizeFirstLetter } from '../utils/common.js';
import { getFormattedTimeFromNewPointDate } from '../utils/utils.js';

const getOffersByType = (allOffers, type) => allOffers.find((element) => element.type === type).offers;

const getDestination = (allDestinations, destination) => allDestinations.find((element) => element.id === destination);

const createTypesTemplate = (types) => (
  types.map((element) => (
    `<div class="event__type-item">
        <input id="event-type-${element}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value=${element}>
        <label class="event__type-label  event__type-label--${element}" for="event-type-${element}-1">${capitalizeFirstLetter(element)}</label>
      </div>`
  )).join('')
);

const createOffersTemplate = (offers, offersByType) => {
  if (offersByType.length < 1) {
    return '';
  }
  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
      ${offersByType.map((element) =>
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${element.name}-${element.id}" type="checkbox" name="event-offer-${element.name}" ${offers.includes(element.id) ? 'checked' : ''}>
        <label class="event__offer-label" for="event-offer-${element.name}-${element.id}">
        <span class="event__offer-title">${element.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${element.price}</span>
        </label>
      </div>`).join('')}
      </section>`
  );
};

const createDestinationOptionsTemplate = (destinations) => {
  const destinationsList = destinations.map((destination) => destination['name']);
  return (
    destinationsList.map((element) =>
      `<option value=${element}></option>`
    ).join('')
  );
};

const createDestinationPhotoTemplate = (destination) => {
  const destinationPictures = destination.pictures;
  return (
    destinationPictures.map((element) =>
      `<img class="event__photo" src="${element.src}" alt="${element.description}"></img>`
    ).join(''));
};

const createDestinationTemplate = (destination) => {
  if (destination === '') {
    return '';
  }
  return (
    `<section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${destination.description}</p>
        <div class="event__photos-container">
          <div class="event__photos-tape">
          ${createDestinationPhotoTemplate(destination)}
          </div>
        </div>
      </section>`
  );
};

const createEditPointTemplate = (point, allOffers, allDestinations, isNewPoint) => {
  const { basePrice, dateFrom, dateTo, type, offers, destination } = point;
  const offersByType = getOffersByType(allOffers, type);
  const offersTemplate = createOffersTemplate(offers, offersByType);
  const typesTemplate = createTypesTemplate(POINT_TYPES);
  const destinationsOptionsTemplate = createDestinationOptionsTemplate(allDestinations);
  const destinationForPoint = getDestination(allDestinations, destination);
  const destinationInfoTemplate = createDestinationTemplate(destinationForPoint);

  return (
    `<li class="trip-events__item">
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
        ${capitalizeFirstLetter(type)}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${(destinationForPoint) ? destinationForPoint.name : ''}" list="destination-list-1">
      <datalist id="destination-list-1">
        ${destinationsOptionsTemplate}
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
    ${isNewPoint ?
      '<button class="event__reset-btn" type="reset">Cancel</button>' :
      `<button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
      </button>`}
  </header>
  <section class="event__details">
    ${offersTemplate}
    ${destinationInfoTemplate}
  </section>
</form>
</li>`
  );
};

export default class EditPointView extends AbstractStatefulView {
  #point = null;
  #allDestinations = [];
  #allOffers = [];
  #isNewPoint = null;
  #handleCancelClick = null;

  constructor({ point, allOffers, allDestinations, onCancelClick }) {
    super();
    this.#point = point;
    this.#allOffers = allOffers;
    this.#allDestinations = allDestinations;
    this.#isNewPoint = !this.#point.id;
    this.#handleCancelClick = onCancelClick;
    this._setState(EditPointView.parsePointToState(point));
    this._restoreHandlers();
  }

  reset(point) {
    this.updateElement(
      EditPointView.parsePointToState(point),
    );
  }

  _restoreHandlers() {
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#cancelClickHandler);
    this.element.querySelector('.event__type-group').addEventListener('click', this.#typeChooseHandler);
    this.element.querySelector('.event__input--destination').addEventListener('input', this.#destinationChooseHandler);
  }

  get template() {
    return createEditPointTemplate(this._state, this.#allOffers, this.#allDestinations, this.#isNewPoint);
  }

  #cancelClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCancelClick();
  };

  #typeChooseHandler = (evt) => {
    evt.preventDefault();
    const choosedType = evt.target.closest('div').firstElementChild.value;
    this.updateElement({
      type: choosedType,
      offers: '',
    });
  };

  #destinationChooseHandler = (evt) => {
    evt.preventDefault();
    const destinationInput = evt.target.value;
    const choosedDestination = this.#allDestinations.find((element) => element.name === destinationInput);
    if (choosedDestination !== undefined) {
      this.updateElement({
        destination: choosedDestination.id,
      });
    }
  };

  static parsePointToState(point) {
    return { ...point };
  }
}
