export default class NotImplementedException extends Error {
  constructor(message) {
    super(`${message} is called without an implementation`);

    this.name = 'NotImplementedException';
  }
}
