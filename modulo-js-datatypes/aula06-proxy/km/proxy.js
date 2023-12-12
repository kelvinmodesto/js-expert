'use strict';
const { count } = require('console');
const Event = require('events');
const eventName = 'counter';
const event = new Event();

event.on('counter', (msg) => console.log(eventName, msg));

const myCounter = {
  counter: 0,
};

const proxy = new Proxy(myCounter, {
  set: (target, propertykey, newValue) => {
    event.emit(eventName, { newValue, key: target[propertykey] });
    target[propertykey] = newValue;
    return true;
  },
  get: (object, prop) => {
    return object[prop];
  },
});

setInterval(function () {
  proxy.counter += 1;
  console.log('setInterval');
  if (proxy.counter === 20) clearInterval(this);
}, 200);

setImmediate(() => {
  console.log('setImmediate', proxy.counter);
});

setTimeout(() => {
  console.log('timeout', proxy.counter);
});

process.nextTick(() => {
  proxy.counter = 10;
  console.log('nextTick', proxy.counter);
});
