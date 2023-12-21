const UserFactory = require('./factory/userFactory');

(async () => {
  const factory = await UserFactory.createInstance();
  const result = await factory.find({ name: 'Jinbe*' });
  console.log({ result });
})();
