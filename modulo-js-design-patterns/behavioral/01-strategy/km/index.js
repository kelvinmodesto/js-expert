import ContextStrategy from './src/base/contextStrategy';
import MongoStrategy from './src/strategies/mongoStrategy';
import PostgresStrategy from './src/strategies/postgresStrategy';

const postgresConnectionString = '';
const postgresContext = new ContextStrategy(
  new PostgresStrategy(postgresConnectionString)
);
await postgresContext.connect();

const mongoDBConnectionString = '';
const mongoDBContext = new ContextStrategy(
  new MongoStrategy(mongoDBConnectionString)
);
await mongoDBContext.connect();
