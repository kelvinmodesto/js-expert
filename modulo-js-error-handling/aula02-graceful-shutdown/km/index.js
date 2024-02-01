import { MongoClient } from 'mongodb';
import { createServer } from 'http';

import { promisify } from 'util';

async function dbConnect() {
  const client = new MongoClient(
    'mongodb://kelvinmodesto:admin@localhost:27017'
  );

  await client.connect();
  console.log('mongodb is connected');
  const db = client.db('pirates');

  return {
    collections: { strawHats: db.collection('strawhats') },
    client,
  };
}

const { collections, client } = await dbConnect();

async function handler(request, response) {
  for await (const data of request) {
    try {
      const pirate = JSON.parse(data);
      await collections.strawHats.insertOne({
        ...pirate,
        updatedAt: new Date().toISOString(),
      });

      const pirates = await collections.strawHats.find().toArray();

      response.writeHead(200);
      response.write(JSON.stringify(pirates));
    } catch (error) {
      console.log('a request error has happened', error.message);
      response.writeHead(500);
      response.write(JSON.stringify({ message: 'Internal server error' }));
    } finally {
      response.end();
    }
  }
}

/*
    curl -i localhost:3000 -X POST --data '{"name": "Monkey D. Luffy", "age": "19"}'
    curl -i localhost:3000 -X POST --data '{"name": "Roronoa Zoro", "age": "21"}'
*/

const server = createServer(handler).listen(3000, () =>
  console.log('listening at 3000...', process.pid)
);

const onStop = async (signal) => {
  console.log(`\n${signal} signal received`);

  console.log('closing http server');
  await promisify(server.close.bind(server))();
  console.log('http server has closed');

  // close(true) => força o encerramento
  await client.close(true);
  console.log('MongoDB connection has closed');

  // zero é tudo certo, 1 é erro!
  process.exit(0);
};

// SIGINT -> Ctrl C
// SIGTERM => KILL
['SIGINT', 'SIGTERM'].forEach((event) => process.on(event, onStop));
