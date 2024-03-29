import { Duplex, Transform } from 'stream';

let count = 0;
const server = new Duplex({
  objectMode: true, // faz nao precisar trabalhar com buffer => gasta mais memoria
  read() {
    const everySecond = (intervalContext) => {
      if (count++ <= 5) {
        this.push('My name is Luffy, I will be the king of pirates');
        return;
      }
      clearInterval(intervalContext);
      this.push(null);
    };
    setInterval(function () {
      everySecond(this);
    });
  },
  // totalmente diferente
  write(chunk, enconding, cb) {
    console.log('[writable] saving', chunk);
    cb();
  },
});

// provar que sào canais de comunicacao diferentes!
// write aciona o writable do Duplex
server.write('[duplex] hey this is a writable\n');

// on data -> loga o que rolou no .push do reable
// server.on('data', msg => console.log(`[readable]${msg}`))

// o push deixa voce enviar mais dados
server.push('[duplex] hey this is a readable\n');

// server
//     .pipe(process.stdout)

const transform = Transform({
  objectMode: true,
  transform(chunk, encoding, cb) {
    cb(null, chunk.toUpperCase());
  },
});

// transfrom é tambem um duplex, mas não possuem comunicação independente
transform.write('[transform] hello from write');

// o push vai ignorar o que voce tem na funcao transform
transform.push('[transform] hello from read\n');

server.pipe(transform).pipe(server);
