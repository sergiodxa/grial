const { resolve } = require('path')

module.exports = async function getConnectors(BASE_PATH) {
  try {
    return require(resolve(`${BASE_PATH}/connectors.js`))
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') {
      return {}
    }
    throw error
  }
}
