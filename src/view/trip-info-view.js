import AbstractView from '../framework/view/abstract-view.js';

const createTripInfoTemplate = (route, dates, totalCost) =>
  `<section class="trip-main__trip-info  trip-info">
<div class="trip-info__main">
  <h1 class="trip-info__title">${route}</h1>

  <p class="trip-info__dates">${dates}</p>
</div>

<p class="trip-info__cost">
  Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalCost}</span>
</p>
</section>`;

export default class TripInfo extends AbstractView {

  #route = null;
  #dates = null;
  #totalCost = null;

  constructor({ route, dates, totalCost }) {
    super();
    this.#route = route;
    this.#dates = dates;
    this.#totalCost = totalCost;
  }

  get template() {
    return createTripInfoTemplate(this.#route, this.#dates, this.#totalCost);
  }
}
