import ContextStrategy from './src/base/contextStrategy.js';
import MongoStrategy from './src/strategies/mongoStrategy.js';
import PostgresStrategy from './src/strategies/postgresStrategy.js';
import { databaseMock as data } from './src/data.js';

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

const contextTypes = {
  transaction: postgresContext,
  activityLog: mongoDBContext,
};

for (const { name, type } of data) {
  const context = contextTypes[type];
  await context.create({ name: `${name} ${Date.now}` });

  console.log(type, context.dbStrategy.constructor.name);
  // console.log(await context.read());
}
