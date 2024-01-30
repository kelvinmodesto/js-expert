import { Readable, Transform } from 'stream';
import { createWriteStream } from 'fs';
// fonte de dados
const readable = new Readable({
  read() {
    for (let index = 0; index < 1e6; index++) {
      const person = { id: `${Date.now()}-index`, name: `Luffy-${index}` };
      const data = JSON.stringify(person);

      this.push(data);
    }

    this.push(null);
  },
});

// processamento de dados
const mapFields = new Transform({
  transform(chunk, enconding, cb) {
    const data = JSON.parse(chunk);
    const result = `${data.id},${data.name}\n`;
    cb(null, result);
  },
});

const mapHeaders = new Transform({
  transform(chunk, enconding, cb) {
    this.counter = this.counter ?? 0;
    if (this.counter) {
      return cb(null, chunk);
    }

    this.counter += 1;
    cb(null, `id,name${chunk}\n`);
  },
});

const pipeline = readable
  .pipe(mapFields)
  .pipe(mapHeaders)
  .pipe(createWriteStream('my-file.csv'));

pipeline.on('end', () => console.log('its over'));
