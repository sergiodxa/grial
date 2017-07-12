const { resolve } = require('path');

module.exports = async function getModels(BASE_PATH) {
  try {
    return require(resolve(`${BASE_PATH}/models.js`));
  } catch (error) {
    console.log('Using default empty models');
    return {};
  }
};
