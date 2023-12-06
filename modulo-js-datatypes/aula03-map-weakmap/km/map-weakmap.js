const assert = require('assert');
const myMap = new Map();

// set values directly
myMap
  .set(1, 'one')
  .set('two', { text: 'myself' })
  .set(false, () => 'hi');

const myMapWithConstructor = new Map([
  [1, 'numberOne'],
  ['1', 'numTwo'],
  [false, 'bool3'],
]);

assert.deepStrictEqual(myMap.get(1), 'one');
assert.deepStrictEqual(myMap.get('two'), { text: 'myself' });
assert.deepStrictEqual(myMap.get(false)(), 'hi');

const onlyRefenceWorks = { id: 2 };
myMap.set(onlyRefenceWorks, { name: 'Kelvin' });

assert.deepStrictEqual(myMap.get({ id: 2 }), undefined);
assert.deepStrictEqual(myMap.get(onlyRefenceWorks), { name: 'Kelvin' });

// utils
assert.deepStrictEqual(myMap.size, 4);
assert.ok(myMap.has(onlyRefenceWorks));

// much better than delete object.key
// delete object.key has performance issues
assert.ok(myMap.delete(onlyRefenceWorks));

assert.deepStrictEqual(
  JSON.stringify([...myMap]),
  JSON.stringify([
    [1, 'one'],
    ['two', { text: 'myself' }],
    [false, () => {}],
  ])
);

const actor = {
  name: 'John Doe',
  toString: 'Lorem Ipsum: John Doe',
};

myMap.set(actor);

assert.ok(myMap.has(actor));
assert.throws(() => myMap.get(actor).toString, TypeError);

myMap.clear();
assert.deepStrictEqual([...myMap.keys()], []);

// ---- WeakMap
// not iterable, more performance, limited bunch of functions

const weakMap = new WeakMap();
const hero = { name: 'Luffy' };

weakMap.set(hero);

// weakMap.get(hero)
// weakMap.delete(hero)
// weakMap.has(hero)

assert.deepStrictEqual(weakMap.has(hero), true);
assert.deepStrictEqual(weakMap.get(hero), undefined);
