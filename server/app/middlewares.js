const { resolve } = require('path');

module.exports = async function getMiddlewares(BASE_PATH) {
  try {
    return require(resolve(`${BASE_PATH}/middlewares.js`));
  } catch (error) {
    console.log('Using default empty middlewares');
    return [];
  }
};
