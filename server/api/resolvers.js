const { resolve } = require('path')

module.exports = async function getResolvers(BASE_PATH) {
  try {
    return require(resolve(`${BASE_PATH}/resolvers`))
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') {
      throw new ReferenceError('The file `./resolvers.js` or `./resolvers/index.js` is required.')
    }
    throw error
  }
}
