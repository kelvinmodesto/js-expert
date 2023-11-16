const { after, afterEach, before, beforeEach, describe, it } = require('mocha');

const { createSandbox } = require('sinon');
const { expect } = require('chai');
const {BaseRepository} = require("../../src/repository/baseRepository");
const {join} = require("path");
const CarService = require("./../../src/service/carService");

const carsDatabase = join(__dirname, "./../../database", "cars.json");

const mocks = {
  validCarCategory: require('./../mocks/valid-carCategory.json'),
  validCar: require('./../mocks/valid-car.json'),
  validCustomer: require('./../mocks/valid-customer.json'),
};

describe("CarService Suit test", () => {

  let carService = {};
  let sandbox = {};

  before(() => {
    console.log(carsDatabase);
    carService = new CarService({ cars: carsDatabase })
  });

  beforeEach(() => {
    sandbox = createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should retrieve a random position from a given array', () => {
    const data = [0, 1, 2, 3, 4, 5];
    const result = carService.getRandomPositionFromArray(data);

    expect(result).to.be.gte(0).and.be.lte(data.length);
  });

  it('should choose the first id from carIds in carCategory ', () => {
    const carCategory = mocks.validCarCategory;
    const expectedId = 0;

    sandbox.stub(carService, carService.getRandomPositionFromArray.name).returns(expectedId);

    const result = carService.chooseRandomCar(carCategory);
    const expected = carCategory.carIds[expectedId];

    expect(carService.getRandomPositionFromArray.calledOnce).to.be.ok;
    expect(result).to.be.equal(expected);
  });

  it('given a carCategory it should return an available car', async () => {
    const car = mocks.validCar;
    const carCategory = Object.create(mocks.validCarCategory);
    carCategory.carIds = [car.id];

    sandbox.stub(carService.carsRepository, carService.carsRepository.find.name).resolves(car);
    sandbox.spy(carService, carService.chooseRandomCar.name);

    const result = await carService.getAvailableCar(carCategory);

    expect(carService.chooseRandomCar.calledOnce).to.be.ok;
    expect(carService.carsRepository.find.calledWithExactly(car.id)).to.be.ok;
    expect(result).to.be.deep.equal(car);
  });

});
