const UserService = require('../service/userService');
const UserRepository = require('../repository/userRepository');
const UserDatabase = require('../utils/UserDatabase');

class UserFactory {
  static async createInstance() {
    const db = new UserDatabase({ connectionString: 'mongodb://localhost' });
    const dbConnection = await db.connect();
    const userRepository = new UserRepository({ dbConnection });
    const userService = new UserService({ userRepository });

    return userService;
  }
}

module.exports = UserFactory;
