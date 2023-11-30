const assert = require('assert');

const VALUE_OBJECT = 'value for an object';
const VALUE_SYMBOL = 'value for symbol';

// --- keys
const uniqueKey = Symbol('userName');
const user = {};

user['userName'] = VALUE_OBJECT;
user[uniqueKey] = VALUE_SYMBOL;

assert.deepStrictEqual(user.userName, VALUE_OBJECT);
assert.deepStrictEqual(user['userName'], VALUE_OBJECT);

assert.deepStrictEqual(user[uniqueKey], VALUE_SYMBOL);

// unable to get by symbol variable, private
assert.deepStrictEqual(user[Symbol('userName')], undefined);

// isn't super safe, somehow is possible to get
assert.deepStrictEqual(Object.getOwnPropertySymbols(user)[0], uniqueKey);

// bypass - bad practice
user[Symbol.for('password')] = 123;
assert.deepStrictEqual(user[Symbol.for('password')], 123);

// well known symbols
const obj = {
  // iterators
  [Symbol.iterator]: () => ({
    items: ['a', 'b', 'c'],
    next() {
      return {
        done: this.items.length === 0,
        // remove the first item
        value: this.items.shift(),
      };
    },
  }),
};

assert.deepStrictEqual([...obj], ['a', 'b', 'c']);

const kItems = Symbol('kItems');
class MyDate {
  constructor(...args) {
    this[kItems] = args.map((arg) => new Date(...arg));
  }
  [Symbol.toPrimitive](coercionType) {
    if (coercionType !== 'string') throw new TypeError();

    const items = this[kItems].map((item) =>
      new Intl.DateTimeFormat('pt-BR', {
        month: 'long',
        day: '2-digit',
        year: 'numeric',
      }).format(item)
    );

    return new Intl.ListFormat('pt-BR', {
      style: 'long',
      type: 'conjunction',
    }).format(items);
  }
  *[Symbol.iterator]() {
    for (const item of this[kItems]) {
      yield item;
    }
  }
  async *[Symbol.asyncIterator]() {
    const timeout = (ms) => new Promise((res) => setTimeout(res, ms));
    for (const item of this[kItems]) {
      await timeout(1000);
      yield item.toISOString();
    }
  }
  get [Symbol.toStringTag]() {
    return 'MyDate';
  }
}

const myDate = new MyDate([2023, 10, 1], [2023, 11, 1]);
const expectedDates = [new Date(2023, 10, 1), new Date(2023, 11, 1)];

assert.deepStrictEqual(
  Object.prototype.toString.call(myDate),
  '[object MyDate]'
);
assert.throws(() => myDate + 1, TypeError);

assert.deepStrictEqual(
  String(myDate),
  '01 de novembro de 2023 e 01 de dezembro de 2023'
);

// testing the custom iterator
assert.deepStrictEqual([...myDate], expectedDates);
(async () => {
  for await (const item of myDate) {
    console.log(item);
  }
})();

(async () => {
  const dates = await Promise.all([...myDate]);
  assert.deepStrictEqual([...myDate], dates);
})();
