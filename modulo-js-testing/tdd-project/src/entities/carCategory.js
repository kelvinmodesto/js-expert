const Base = require("./base/base");

class CarCategory extends Base {
  constructor({ id, name, carIds, price }) {
    super({ id, name });

    this.price = price;
    this.carIds = carIds;
  }
}

module.exports = CarCategory;
