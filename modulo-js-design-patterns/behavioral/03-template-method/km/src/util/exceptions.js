class NotImplementedException extends Error {
  constructor(message) {
    super(`${message} wasn't implemented yet`);
    this.name = 'NotImplementedException';
  }
}

class NotValidException extends Error {
  constructor(message) {
    super(`${message} wasn't validated`);
    this.name = 'NotValidException';
  }
}

export { NotImplementedException, NotValidException };
