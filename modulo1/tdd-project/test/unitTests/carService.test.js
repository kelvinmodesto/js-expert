const { after, afterEach, before, beforeEach, describe, it } = require('mocha');
const sinon = require('sinon');
const { createSandbox } = require('sinon');
const { expect } = require('chai');

const mocks = {
  validCarCategory: require('./../mocks/valid-carCategory.json'),
  validCar: require('./../mocks/valid-car.json'),
  validCustomer: require('./../mocks/valid-customer.json'),
};

describe("CarService Suit test", () => {

  let carService = {};
  let sandbox = {};
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  })
});
