import MongoDB from 'mongodb';

export default class MongoStrategy {
  #instance;
  constructor(connectionString) {
    this.connectionString = connectionString;

    this.collection = 'warriors';
  }
  async connect() {}

  async create(item) {}

  async read(item) {}
}
