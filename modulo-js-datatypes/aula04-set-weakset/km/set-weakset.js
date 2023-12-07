const { deepStrictEqual, ok, throws } = require('assert');

const arr1 = ['0', '1', '2'];
const arr2 = ['2', '0', '3'];
const arr3 = arr1.concat(arr2);

deepStrictEqual(arr3.sort(), ['0', '0', '1', '2', '2', '3']);

// Set don't accept duplicates
const set = new Set();
arr1.map((item) => set.add(item));
arr2.map((item) => set.add(item));

deepStrictEqual(Array.from(set), ['0', '1', '2', '3']);
deepStrictEqual(Array.from(new Set([...arr1, ...arr2])), ['0', '1', '2', '3']);

// get set iterator
// set.keys();
// set.values();

ok(set.has('3'));

const crewMembers = new Set([
  'luffy',
  'nami',
  'robin',
  'brook',
  'zoro',
  'jinbe',
  'usopp',
  'chopper',
  'sanji',
  'franky',
]);

const strongMembers = new Set(['luffy', 'zoro', 'sanji', 'jinbe']);

const intersection = new Set(
  [...crewMembers].filter((it) => strongMembers.has(it))
);

deepStrictEqual(Array.from(intersection), Array.from(intersection));

const difference = new Set(
  [...crewMembers].filter((it) => !strongMembers.has(it))
);

deepStrictEqual(Array.from(difference), [
  'nami',
  'robin',
  'brook',
  'usopp',
  'chopper',
  'franky',
]);

// weakSet
const user = { name: 'law' };
const user2 = { name: 'kuma' };

const weakSet = new WeakSet([user]);

ok(weakSet.add(user2));
ok(weakSet.delete(user2));

// only direct reference works
deepStrictEqual(weakSet.has({ name: 'law' }), false);
deepStrictEqual(weakSet.has(user), true);
