class UserDatabase {
  constructor({ connectionString }) {
    this.connectionString = connectionString;
  }

  async sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async connect() {
    this.sleep(100);
    return this;
  }

  async find() {
    this.sleep(100);
    return [
      { name: 'Monkey D. Luffy' },
      { name: 'Roronoa Zoro' },
      { name: 'Nico Robin' },
      { name: 'Tony Tony Chopper' },
      { name: 'Brook' },
      { name: 'Nami' },
      { name: 'Vinsmoke Sanji' },
      { name: 'Jinbe' },
      { name: 'Franky' },
      { name: 'Usopp' },
    ];
  }
}

module.exports = UserDatabase;
