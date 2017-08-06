// native
const os = require('os')
const fs = require('fs')
const { resolve } = require('path')
const { promisify } = require('util')

// promisified
const readFile = promisify(fs.readFile)
const readdir = promisify(fs.readdir)
const stat = promisify(fs.stat)

// Returns only graphql files from a folder
const getSchemaFiles = async function(folder) {
  const files = (await readdir(resolve(folder))) || []

  return files
    .map(file => folder + '/' + file)
    .filter(async file => (await stat(file)).isFile())
    .filter(file => file.endsWith('.gql') || file.endsWith('.graphql'))
}

// Returns concatenated schemas content
const getSchemasContent = async function(folder) {
  const files = await getSchemaFiles(resolve(folder))
  const schemas = await Promise.all(files.map(async file => readFile(file, 'utf8')))
  return schemas.length > 0 && schemas.reduce((previous, current) => previous + os.EOL + current)
}

module.exports = async function getSchema(BASE_PATH) {
  try {
    let schema = await getSchemasContent(resolve(`${BASE_PATH}`))
    if (schema && schema.length > 0) {
      return schema
    }

    schema = await getSchemasContent(resolve(`${BASE_PATH}/schemas/`))
    if (schema && schema.length > 0) {
      return schema
    }

    throw new ReferenceError('The file `./schema.gql` or `./schema.graphql` is required.')
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new ReferenceError('The file `./schema.gql` or `./schema.graphql` is required.')
    }
    throw error
  }
}
