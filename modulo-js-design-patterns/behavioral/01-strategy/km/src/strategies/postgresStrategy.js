import ContextStrategy from '../base/contextStrategy';
export default class PostgresStrategy extends ContextStrategy {
  constructor(connectionString) {
    this.connectionString = connectionString;
  }

  async connect() {}

  async create(item) {}

  async read(item) {}
}
