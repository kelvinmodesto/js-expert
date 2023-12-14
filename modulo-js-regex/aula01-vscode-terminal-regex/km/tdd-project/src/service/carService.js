'use strict';
const BaseRepository = require('./../repository/baseRepository');
const Tax = require('./../entities/tax');
const Transaction = require('./../entities/transaction');
class CarService {
  constructor({ cars }) {
    this.carsRepository = new BaseRepository({ file: cars });
    this.taxesBasedOnAge = Tax.taxesBasedOnAge;
    this.currencyFormat = new Intl.NumberFormat({
      style: 'currency',
      format: 'BRL',
    });
  }
  getRandomPositionFromArray(arr) {
    return Math.floor(Math.random() * arr.length);
  }

  chooseRandomCar(carCategory) {
    const randomCarIndex = this.getRandomPositionFromArray(carCategory.carIds);
    const carId = carCategory.carIds[randomCarIndex];

    return carId;
  }

  async getAvailableCar(carCategory) {
    const carId = this.chooseRandomCar(carCategory);
    const car = await this.carsRepository.find(carId);

    return car;
  }

  calculateFinalPrice(customer, carCategory, numberOfDays) {
    const { age } = customer;
    const { price } = carCategory;
    const { then: tax } = this.taxesBasedOnAge.find(
      (tax) => age >= tax.from && age <= tax.to
    );

    const finalPrice = tax * price * numberOfDays;
    return this.currencyFormat.format(finalPrice);
  }

  async rent(customer, carCategory, numberOfDays) {
    const car = await this.getAvailableCar(carCategory);
    const finalPrice = await this.calculateFinalPrice(
      customer,
      carCategory,
      numberOfDays
    );

    const today = new Date();
    today.setDate(today.getDate() + numberOfDays);

    const dueDate = today.toLocaleDateString('pt-br', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const transaction = new Transaction({
      customer,
      car,
      amount: finalPrice,
      dueDate,
    });

    return transaction;
  }
}

module.exports = CarService;
