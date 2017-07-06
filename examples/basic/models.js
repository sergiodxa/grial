exports.User = async function User({ faker }) {
  return {
    me() {
      return {
        id: faker.random.number(),
        username: fake.internet.userName(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        bio: faker.name.title()
      }
    },
  };
};
