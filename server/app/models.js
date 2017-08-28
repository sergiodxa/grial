const { resolve } = require('path')

module.exports = async function getModels(BASE_PATH) {
  try {
    return require(resolve(`${BASE_PATH}/models`))
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') {
      return {}
    }
    throw error
  }
}
