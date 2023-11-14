const faker = require("faker");

const Car = require("../src/entities/car");
const CarCategory = require("../src/entities/carCategory");
const Customer = require("../src/entities/customer");

const { join } = require("path");
const { writeFile } = require("fs/promises");

const seederBaseDirectory = join(__dirname, "../", "database");
const ITEMS_AMOUNT = 3;

const carCategory = new CarCategory({
  id: faker.random.uuid(),
  name: faker.vehicle.type(),
  carIds: [],
  price: faker.finance.amount(1000, 99999),
});

const cars = [];
const customers = [];
for (let index = 0; index < ITEMS_AMOUNT; index++) {
  const car = new Car({
    id: faker.random.uuid(),
    name: faker.vehicle.model(),
    available: true,
    gasAvailable: true,
    releaseYear: faker.date.past().getFullYear(),
  });

  carCategory.carIds.push(car.id);
  cars.push(car);

  const customer = new Customer({
    id: faker.random.uuid(),
    name: faker.name.findName(),
    age: faker.random.number({ min: 18, max: 75 }),
  });

  customers.push(customer);
}

const write = (filename, data) =>
  writeFile(join(seederBaseDirectory, filename), JSON.stringify(data));

(async () => {
  await write("cars.json", cars);
  await write("carCategories.json", [carCategory]);
  await write("customers.json", customers);
})();
