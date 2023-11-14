const faker = require('faker');

const Car = require('../src/entities/car');
const CarCategory = require('../src/entities/carCategory');
const Customer = require('../src/entities/customer');


const carCategory = new CarCategory({
    id: faker.random.uuid(),
    name: faker.vehicle.type(),
    carIds: [],
    price: faker.finance.amount(1000, 99999),
});

;(() => {

})()
