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
