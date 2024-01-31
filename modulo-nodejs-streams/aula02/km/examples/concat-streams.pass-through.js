import { Writable, PassThrough } from 'stream';
import axios from 'axios';
import { write } from 'fs';

const API_01 = 'http://localhost:3000';
const API_02 = 'http://localhost:4000';

const requests = await Promise.all([
  axios({ method: 'get', url: API_01, responseType: 'stream' }),
  axios({ method: 'get', url: API_02, responseType: 'stream' }),
]);

const results = requests.map(({ data }) => data);

const output = Writable({
  write(chunk, encoding, cb) {
    const data = chunk.toString().replace(/\n/, '');
    // ?=- -> ele faz procurar a partir dox - e olhar para traz
    // :"(?<name>.*) -> procura pelo conteudo dentro das aspas apos o : e extrai somente o name
    const name = data.match(/:"(?<name>.*)(?=-)/).groups.name;
    console.log(`[${name.toLowerCase()}] ${data}`);
    cb();
  },
});

function merge(streams) {
  return streams.reduce((prev, current, index, items) => {
    // impede que a stream feche sozinha
    current.pipe(prev, { end: false });

    // como colocamos end: false, vamos manipular manualmente quando o nosso current
    // terminar. Quando ele terminar, vamos verificar se todos no pipeline se encerraram
    // ele vai então forcar a cadeia do anterior a se fechar
    current.on('end', () => items.every((s) => s.ended) && prev.end());
    return prev;
  }, new PassThrough());
}

merge(results).pipe(output);
