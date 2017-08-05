const { resolve } = require('path')

/**
 * Require the grial.config.js or get a default empty object
 * @param  {String} [BASE_PATH='.'] The base path of your application
 * @return {Object}                 The configuration object
 */
module.exports = async function getConfig(BASE_PATH = '.') {
  try {
    return require(resolve(`${BASE_PATH}/grial.config.js`))
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') {
      return {}
    }
    throw error
  }
}
