'use strict';

const { deepStrictEqual, ok, throws } = require('assert');

const myObj = {
  add(value) {
    return this.args1 + this.args2 + value;
  },
};

deepStrictEqual(myObj.add.apply({ args1: 10, args2: 20 }, [30]), 60);

myObj.add.apply = function () {
  throw new TypeError('Oxe');
};

throws(() => myObj.add.apply({}, []), { name: 'TypeError', message: 'Oxe' });

// using reflect

const result = Reflect.apply(myObj.add, { args1: 100, args2: 56 }, [100]);
deepStrictEqual(result, 256);

function MyDate() {}

Object.defineProperty(MyDate, 'withProperty', { value: () => 'Hey' });
Reflect.defineProperty(MyDate, 'withReflection', { value: () => 'Ho!' });

deepStrictEqual(MyDate.withProperty(), 'Hey');
deepStrictEqual(MyDate.withReflection(), 'Ho!');

const withDelete = { user: 'Luffy' };
delete withDelete.user;

deepStrictEqual(withDelete.hasOwnProperty('user'), false);

const withReflection = { user: 'Zoro' };

Reflect.deleteProperty(withReflection, 'user');
deepStrictEqual(withReflection.hasOwnProperty('user'), false);

deepStrictEqual((1)['userName'], undefined);
throws(() => Reflect.get(1, 'userName'), TypeError);

ok('luffy' in { luffy: '' });
ok(Reflect.has({ jinbe: '' }, 'jinbe'));

const user = Symbol('user');

const customObj = {
  id: 123,
  [Symbol.for('password')]: 123456,
  [user]: 'luffy',
};

const customKeys = [
  ...Object.getOwnPropertyNames(customObj),
  ...Object.getOwnPropertySymbols(customObj),
];

deepStrictEqual(customKeys, ['id', Symbol.for('password'), user]);

deepStrictEqual(Reflect.ownKeys(customObj), [
  'id',
  Symbol.for('password'),
  user,
]);
