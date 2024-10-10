import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { POINT_TYPES } from '../const.js';
import { getOffersByType, getDestination } from '../utils/point.js';
import { capitalizeFirstLetter } from '../utils/common.js';
import { getFormattedTimeFromNewPointDate } from '../utils/utils.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import he from 'he';

const BLANK_POINT = {
  basePrice: 0,
  dateFrom: new Date().toISOString(),
  dateTo: new Date().toISOString(),
  destination: '',
  isFavorite: false,
  offers: [],
  type: 'flight'
};

const createTypesTemplate = (types) => (
  types.map((element) => (
    `<div class="event__type-item">
        <input id="event-type-${element}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value=${element}>
        <label class="event__type-label  event__type-label--${element}" for="event-type-${element}-1">${capitalizeFirstLetter(element)}</label>
      </div>`
  )).join('')
);

const createOffersTemplate = (offers, offersByType) => {
  if (offersByType.length === 0) {
    return '';
  }
  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
      ${offersByType.map((element) =>
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${element.id}" type="checkbox" name="event-offer-${element.id}" data-id="${element.id}" ${offers.includes(element.id) ? 'checked' : ''}>
        <label class="event__offer-label" for="event-offer-${element.id}">
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
      <label class="event__type  event__type-btn" for="event-type-toggle-${point.id}">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${point.id}" type="checkbox">
      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
        ${typesTemplate}
        </fieldset>
      </div>
    </div>
    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-${point.id}">${capitalizeFirstLetter(type)}</label>
      <input class="event__input  event__input--destination" id="event-destination-${point.id}" type="text" name="event-destination" value="${he.encode((destinationForPoint) ? destinationForPoint.name : '')}" pattern="/^(Paris|Nice)$/gi" list="destination-list-${point.id}" required>
      <datalist id="destination-list-${point.id}">
        ${destinationsOptionsTemplate}
      </datalist>
    </div>
    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-${point.id}">From</label>
      <input class="event__input  event__input--time" id="event-start-time-${point.id}" type="text" name="event-start-time" value="${getFormattedTimeFromNewPointDate(dateFrom)}" required>
      &mdash;
      <label class="visually-hidden" for="event-end-time-${point.id}">To</label>
      <input class="event__input  event__input--time" id="event-end-time-${point.id}" type="text" name="event-end-time" value="${getFormattedTimeFromNewPointDate(dateTo)}" required>
    </div>
    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-${point.id}">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-${point.id}" type="text" name="event-price" value="${basePrice}" onkeyup="this.value = this.value.replace(/[^0-9]/g,'');" required>
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
  #handleRollupClick = null;
  #handleFormSubmit = null;
  #handleDeleteClick = null;
  #handleCancelClick = null;
  #datepickerFrom = null;
  #datepickerTo = null;

  constructor({ point = BLANK_POINT, allOffers, allDestinations, onRollupClick, onSaveClick, onDeleteClick, onCancelClick }) {
    super();
    this.#point = point;
    this.#allOffers = allOffers;
    this.#allDestinations = allDestinations;
    this.#isNewPoint = !this.#point.id;
    this.#handleRollupClick = onRollupClick;
    this.#handleFormSubmit = onSaveClick;
    this.#handleDeleteClick = onDeleteClick;
    this.#handleCancelClick = onCancelClick;

    this._setState(EditPointView.parsePointToState(point));
    this._restoreHandlers();
  }

  removeElement() {
    super.removeElement();
    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }
    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  reset(point) {
    this.updateElement(
      EditPointView.parsePointToState(point),
    );
  }

  _restoreHandlers() {
    if (this.#isNewPoint) {
      this.element.querySelector('.event__reset-btn').addEventListener('click', this.#cancelClickHandler);
    } else {
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollupClickHandler);
      this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
    }

    this.element.querySelector('.event__type-group').addEventListener('click', this.#typeChooseHandler);
    this.element.querySelector('.event__input--destination').addEventListener('input', this.#destinationChooseHandler);
    this.element.querySelector('.event__save-btn').addEventListener('click', this.#saveClickHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationsChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);

    if (getOffersByType(this.#allOffers, this.#point.type).length === 0) {
      return;
    }
    this.element.querySelector('.event__available-offers').addEventListener('change', this.#offersChangeHandler);

    this.#setDateToPicker();
    this.#setDateFromPicker();
  }

  get template() {
    return createEditPointTemplate(this._state, this.#allOffers, this.#allDestinations, this.#isNewPoint);
  }

  #rollupClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollupClick();
  };

  #saveClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditPointView.parseStateToPoint(this._state));
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(EditPointView.parseStateToPoint(this._state));
  };

  #cancelClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCancelClick();
  };

  #typeChooseHandler = (evt) => {
    evt.preventDefault();
    const choosedType = evt.target.textContent.toLowerCase();
    this.updateElement({
      type: choosedType,
      offers: [],
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

  #offersChangeHandler = (evt) => {
    evt.preventDefault();
    let pointOffers = this._state.offers;
    const clickedOfferId = evt.target.dataset.id;
    if (pointOffers.includes(clickedOfferId)) {
      pointOffers = pointOffers.filter((element) => element !== clickedOfferId);
    } else {
      pointOffers.push(clickedOfferId);
    }
    this.updateElement({
      offers: pointOffers,
    });
  };

  #destinationsChangeHandler = (evt) => {
    evt.preventDefault();
    const allDestinationsNames = [];
    this.#allDestinations.forEach((element) => allDestinationsNames.push(element.name));
    if (!allDestinationsNames.includes(evt.target.value)) {
      evt.target.value = '';
    }
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      basePrice: evt.target.value,
    });
  };

  static parsePointToState(point) {
    return { ...point };
  }

  static parseStateToPoint(state) {
    return { ...state };
  }

  #dateFromChangeHandler = ([inputDate]) => {
    this.updateElement({
      dateFrom: inputDate,
    });
  };

  #dateToChangeHandler = ([inputDate]) => {
    this.updateElement({
      dateTo: inputDate,
    });
  };

  #setDateFromPicker() {
    const dateFromInput = this.element.querySelector(`#event-start-time-${this.#point.id}`).value;
    this.#datepickerFrom = flatpickr(
      this.element.querySelector(`#event-start-time-${this.#point.id}`),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        'time_24hr': true,
        defaultDate: this._state.dateFrom,
        maxDate: this._state.dateTo,
        onChange: this.#dateFromChangeHandler,
        onValueUpdate: this.#datepickerTo.set('defaultDate', dateFromInput),
      },
    );
  }

  #setDateToPicker() {
    this.#datepickerTo = flatpickr(
      this.element.querySelector(`#event-end-time-${this.#point.id}`),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        'time_24hr': true,
        minDate: this._state.dateFrom,
        defaultDate: this._state.dateTo,
        onChange: this.#dateToChangeHandler,
      },
    );
  }
}
