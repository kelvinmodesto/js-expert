import Benchmark from 'benchmark';
import CartIdNew from './new.js';
import CartIdOld from './old.js';
import data from '../../database.js';

const suite = new Benchmark.Suite();
suite
  .add('Cart#getPricePropsMapReduce', function () {
    new CartIdOld(data);
  })
  .add('Cart#getPricePropsFor', function () {
    new CartIdNew(data);
  })
  .on('cycle', (event) => console.log(String(event.target)))
  .on('complete', function (event) {
    console.log(`Fastest is ${this.filter('fastest').map('name')}`);
  })
  .run({ async: true });
