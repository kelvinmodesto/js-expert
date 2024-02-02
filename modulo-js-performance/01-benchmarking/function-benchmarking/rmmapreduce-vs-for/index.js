import Benchmark from 'benchmark';
import CartIdNew from './new.js';
import CartIdOld from './old.js';

const suite = new Benchmark.Suite();
const data = {
  products: [
    {
      id: 'op',
      d: 'd',
      abc: undefined,
      a: null,
      b: undefined,
    },
    {
      id: 'j',
      d: 'd',
      abc: undefined,
      a: null,
      b: undefined,
    },
  ],
};
suite
  .add('Cart#rmEmptyPropsMapReduce', function () {
    new CartIdOld(data);
  })
  .add('Cart#rmEmptyPropsFor', function () {
    new CartIdNew(data);
  })
  .on('cycle', (event) => console.log(String(event.target)))
  .on('complete', function (event) {
    console.log(`Fastest is ${this.filter('fastest').map('name')}`);
  })
  .run();
