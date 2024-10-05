import { getMockOffers } from '../mock/offers.js';
import Observable from '../framework/observable.js';

export default class OffersModel extends Observable {
  #offers = getMockOffers();

  get offers() {
    return this.#offers;
  }
}
