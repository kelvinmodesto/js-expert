const Base = require('./base/base');

class Car extends Base {
    constructor({ id, name, available, releaseYear, gasAvailable}) {
        super({ id, name });

        this.available = available;
        this.releaseYear = releaseYear;
        this.gasAvailable = gasAvailable;
    }
}

module.exports = Car;
