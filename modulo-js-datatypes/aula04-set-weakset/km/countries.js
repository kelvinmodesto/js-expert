const { deepStrictEqual } = require('assert');

const countries = ['argentina', 'armenia', 'arabia'];
const expectedResult = 'ari';

const result = countries.reduce((acc, curr, index) => {
  if (index === 0) {
    return curr;
  }
  const setAcc = new Set([...acc]);
  const setCurr = new Set([...curr].filter((it) => setAcc.has(it)));

  return Array.from(setCurr).toString().replaceAll(',', '');
}, '');

deepStrictEqual(result, expectedResult);
