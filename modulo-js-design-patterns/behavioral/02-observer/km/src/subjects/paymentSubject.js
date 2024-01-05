export default class PaymentSubject {
  #observers = new Set();
  subscribe(observable) {
    this.#observers.add(observable);
  }

  unsubscribe(observable) {
    this.#observers.delete(observable);
  }

  notify(data) {
    this.#observers.forEach((observable) => observable.update(data));
  }
}
