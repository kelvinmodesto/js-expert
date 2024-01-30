import { Readable, Writable } from 'stream';

// fonte de dados
const readable = new Readable({
  read() {
    this.push('Luffy');
    this.push('Zoro');
    this.push('Sanji');
    this.push('Jinbe');
    this.push('Robin');

    // informa que os dados acabaram
    this.push(null);
  },
});

// saida de dados

const writable = new Writable({
  write(chunk, enconding, cb) {
    console.log('msg', chunk.toString());
    cb();
  },
});

// writable é sempre a saida -> imprimir, salvar, ignorar

readable.pipe(writable);
