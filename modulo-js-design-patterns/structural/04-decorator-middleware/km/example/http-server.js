InjectHttpInterceptor();

import http from 'http';
import { InjectHttpInterceptor } from './../src/agent.js';
// curl -i localhost:5617
function handleRequest(request, response) {
  response.end('Initiating...');
}

const server = http.createServer(handleRequest);
const port = 5617;

server.listen(port, () =>
  console.log('server running at...', server.address().port)
);
