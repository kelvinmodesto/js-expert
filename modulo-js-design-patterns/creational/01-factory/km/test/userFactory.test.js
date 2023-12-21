const rewiremock = require('rewiremock/node');
const { deepStrictEqual } = require('assert');

const dbData = [{ name: 'Luffy' }, { name: 'Zoro' }];

class MockDatabase {
  connect = () => this;
  find = async (query) => dbData;
}

rewiremock(() => require('../src/utils/UserDatabase')).with(MockDatabase);
(async () => {
  {
    const expected = [{ name: 'luffy' }, { name: 'zoro' }];
    rewiremock.enable();

    const UserFactory = require('../src/factory/userFactory');
    const factory = await UserFactory.createInstance();
    const result = await factory.find();
    deepStrictEqual(result, expected);
    rewiremock.disable();
  }
  {
    const expected = [
      { name: 'monkey d. luffy' },
      { name: 'roronoa zoro' },
      { name: 'nico robin' },
      { name: 'tony tony chopper' },
      { name: 'brook' },
      { name: 'nami' },
      { name: 'vinsmoke sanji' },
      { name: 'jinbe' },
      { name: 'franky' },
      { name: 'usopp' },
    ];

    const UserFactory = require('../src/factory/userFactory');
    const factory = await UserFactory.createInstance();
    const result = await factory.find();
    deepStrictEqual(result, expected);
  }
})();
