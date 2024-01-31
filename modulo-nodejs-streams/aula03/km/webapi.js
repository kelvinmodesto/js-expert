import http from 'http';
import { Readable } from 'stream';

function api1(request, response) {
  let count = 0;
  const MAX_ITEMS = 99;
  const readable = Readable({
    read() {
      const everySecond = (intervalContext) => {
        if (count++ <= MAX_ITEMS) {
          this.push(
            JSON.stringify({
              id: `${Date.now()} count`,
              name: `Luffy-${count}`,
            }) + '\n'
          );
          return;
        }
        clearInterval(intervalContext);
        this.push(null);
      };
      setInterval(function () {
        everySecond(this);
      });
    },
  });

  readable.pipe(response);
}

function api2(request, response) {
  let count = 0;
  const MAX_ITEMS = 99;
  const readable = Readable({
    read() {
      const everySecond = (intervalContext) => {
        if (count++ <= MAX_ITEMS) {
          this.push(
            JSON.stringify({
              id: `${Date.now()} count`,
              name: `Zoro-${count}`,
            }) + '\n'
          );
          return;
        }
        clearInterval(intervalContext);
        this.push(null);
      };
      setInterval(function () {
        everySecond(this);
      });
    },
  });

  readable.pipe(response);
}

http.createServer(api1).listen(3000, () => console.log('listening at 3000...'));
http.createServer(api2).listen(4000, () => console.log('listening at 4000...'));
