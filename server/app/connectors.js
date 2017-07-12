const { resolve } = require('path');

module.exports = async function getConnectors(BASE_PATH) {
  try {
    return require(resolve(`${BASE_PATH}/connectors.js`));
  } catch (error) {
    console.log('Using default empty connectors');
    return {};
  }
};
