const BaseRepository = require('../repository/baseRepository');
export class CarService {
  constructor({ cars }) {
    this.carsRepository = new BaseRepository({ file: cars });
  }
}

module.exports = CarService;
