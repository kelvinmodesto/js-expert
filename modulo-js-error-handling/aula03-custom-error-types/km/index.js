import { createServer } from 'http';
import BusinessError from './errors/businessError.js';
import { statusCodes } from './util/httpStatusCodes.js';

function validatePirate(pirate) {
  // simulando um outro erro, por exemplo de banco de dados
  if (Reflect.has(pirate, 'connectionError')) {
    // só um erro generico para trazer outro cenário de erro inexperado
    throw new Error('error connecting with DB');
  }

  if (pirate.age < 17) {
    throw new BusinessError('age must be higher than 16');
  }

  if (pirate.name?.length > 3) {
    throw new BusinessError('name length must be higher than 3');
  }
}

async function handler(request, response) {
  for await (const data of request) {
    try {
      const pirate = JSON.parse(data);
      validatePirate(pirate);

      response.writeHead(statusCodes.OK);
      response.end();
    } catch (error) {
      if (error instanceof BusinessError) {
        response.writeHead(statusCodes.BAD_REQUEST);
        response.end(error.message);
        continue;
      }

      response.writeHead(statusCodes.INTERNAL_SERVER_ERROR);
      response.end();
    }
  }
}

createServer(handler).listen(3000, () => console.log('Listening at 3000;'));

/*
curl -i localhost:3000 -X POST --data '{"name": "Monkey D. Luffy", "age": "19"}'
*/
