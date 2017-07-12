const { resolve } = require('path');

module.exports = async function getResolvers(BASE_PATH) {
  try {
    return require(resolve(`${BASE_PATH}/resolvers.js`));
  } catch (error) {
    throw new ReferenceError('The file `./resolvers.js` is required.');
  }
};
