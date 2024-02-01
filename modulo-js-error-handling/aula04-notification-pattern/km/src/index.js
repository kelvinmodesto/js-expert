import { createServer } from 'http';
import PirateEntity from './pirateEntity.js';
import { statusCodes } from './util/httpStatusCodes.js';

async function handler(request, response) {
  for await (const data of request) {
    try {
      const parsedData = JSON.parse(data);
      // simulando um outro erro, por exemplo de banco de dados
      if (Reflect.has(parsedData, 'connectionError')) {
        // só um erro generico para trazer outro cenário de erro inexperado
        throw new Error('error connecting with DB');
      }

      const pirate = new PirateEntity(parsedData);
      if (!pirate.isValid()) {
        response.writeHead(statusCodes.BAD_REQUEST);
        response.end(pirate.notifications.join('\n'));
        continue;
      }

      response.writeHead(statusCodes.OK);
      response.end();
    } catch (error) {
      response.writeHead(statusCodes.INTERNAL_SERVER_ERROR);
      response.end();
    }
  }
}

createServer(handler).listen(3000, () => console.log('Listening at 3000;'));
