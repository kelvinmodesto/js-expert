const BaseRepository = require('./../repository/baseRepository');
class CarService {
  constructor({ cars }) {
    this.carsRepository = new BaseRepository({ file: cars });
  }
  getRandomPositionFromArray(arr) {
    return Math.floor(
        Math.random() * (arr.length)
    );
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
}

module.exports = CarService;
