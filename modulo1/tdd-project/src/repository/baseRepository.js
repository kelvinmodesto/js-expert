const { readFile } = require("fs/promises");
export class BaseRepository {
  constructor({ file }) {
    this.file = file;
  }

  async find() {}
}

module.exports = BaseRepository;
