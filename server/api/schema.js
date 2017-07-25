// native
const fs = require('fs')
const { resolve } = require('path')
const { promisify } = require('util')

// packages
const fileExists = require('file-exists')

// promisified
const readFile = promisify(fs.readFile)
const exists = promisify(fileExists)

module.exports = async function getSchema(BASE_PATH) {
  try {
    if (await exists(resolve(`${BASE_PATH}/schema.gql`))) {
      return readFile(resolve(`${BASE_PATH}/schema.gql`), 'utf8')
    }
    if (await exists(resolve(`${BASE_PATH}/schema.graphql`))) {
      return readFile(resolve(`${BASE_PATH}/schema.graphql`), 'utf8')
    }
    throw new ReferenceError('The file `./schema.gql` or `./schema.graphql` is required.')
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new ReferenceError('The file `./schema.gql` or `./schema.graphql` is required.')
    }
    throw error
  }
}
