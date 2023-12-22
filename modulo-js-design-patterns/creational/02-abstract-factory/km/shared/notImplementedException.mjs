export default class NotImplementedException extends Error {
  constructor(messsage) {
    super(`the "${message}" isn't implemented yet `);
    this.name = 'NotImplementedException';
  }
}
