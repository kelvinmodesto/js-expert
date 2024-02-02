import Benchmark from 'benchmark';
import CartIdNew from './new.js';
import CartIdOld from './old.js';

const suite = new Benchmark.Suite();

suite
  .add('Cart#cartIdUUID', function () {
    new CartIdOld();
  })
  .add('Cart#cartIdCrypto', function () {
    new CartIdNew();
  })
  .on('cycle', (event) => console.log(String(event.target)))
  .on('complete', function (event) {
    console.log(`Fastest is ${this.filter('fastest').map('name')}`);
  })
  .run();
