const assert = require('assert');
const { readFile, stat, readdir } = require('fs/promises');

function* calc(arg1, arg2) {
  yield arg1 * arg2 - 4;
}

function* main() {
  yield 'Hello';
  yield '-';
  yield 'World';
  yield '!!!';
  yield* calc(16, 16);
}

const generator = main();

function* promisified() {
  yield readFile(__filename);
  yield Promise.resolve('Hey!!!');
}

async function* systemInfo() {
  const file = await readFile(__filename);
  yield { file: file.toString() };

  const size = await stat(__filename);
  yield { size };

  const dir = await readdir(__filename);
  yield { dir };
}

assert.deepStrictEqual(generator.next(), { value: 'Hello', done: false });
assert.deepStrictEqual(generator.next(), { value: '-', done: false });
assert.deepStrictEqual(generator.next(), { value: 'World', done: false });
assert.deepStrictEqual(generator.next(), { value: '!!!', done: false });
assert.deepStrictEqual(generator.next(), { value: 252, done: false });
assert.deepStrictEqual(generator.next(), { value: undefined, done: true });

(async () => {
  for await (const item of systemInfo()) {
    console.log('systemInfo', item);
  }
})();
