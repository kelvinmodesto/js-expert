import knex from 'knex';

export default class PostgresStrategy {
  #instance;
  constructor(connectionString) {
    this.connectionString = connectionString;

    this.table = 'warriors';
  }

  async connect() {}

  async create(item) {}

  async read(item) {}
}
