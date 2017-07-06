const fs = require('fs')
const { resolve } = require('path')
const { promisify } = require('util')

const stat = promisify(fs.stat)

module.exports = async function getConnectors(BASE_PATH) {
  const path = resolve(`${BASE_PATH}/connectors.js`)
  if (await stat(path)) return require(path)
  throw new ReferenceError('The file `./connectors.js` is required.')

}
