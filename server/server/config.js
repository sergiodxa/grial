const { resolve } = require('path')

module.exports = async function getConfig(BASE_PATH) {
  try {
    return require(resolve(`${BASE_PATH}/grial.config.js`))
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') {
      return {}
    }
    throw error
  }
}
