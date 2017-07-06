function faker({ FAKER_LOCALE = 'en', FAKER_SEED = null }) {
  const fake = require('faker');
  fake.locale = FAKER_LOCALE;
  if (FAKER_SEED) fake.seed(FAKER_SEED);
  return fake;
}

module.exports = faker;
