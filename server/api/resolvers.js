const { resolve } = require('path');

module.exports = async function getResolvers(BASE_PATH) {
  try {
    return require(resolve(`${BASE_PATH}/resolvers.js`));
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') {
      throw new ReferenceError('The file `./resolvers.js` is required.');
    }
    throw error;
  }
};
