import { createServer } from 'http';
import { appendFile } from 'fs/promises';

export function initializeServer() {
  async function handler(request, response) {
    response.end();
  }
  createServer(handler).listen(3000, () =>
    console.log(`listening at 3000 and pid ${process.pid}`)
  );
}
