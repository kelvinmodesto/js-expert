const { describe, it } = require('mocha');
const { expect } = require('chai');
const TextProcessorAPI = require('../src/textProcessorFluentAPI');
const mock = require('./mock/validMock');

describe('TextProcessorFluentAPI suit test', () => {
  it('#build', () => {
    const result = new TextProcessorAPI(mock).build();

    expect(result).to.be.deep.equal(mock);
  });
});
