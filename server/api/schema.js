const fs = require('fs');
const { resolve } = require('path');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);

module.exports = async function getSchema(BASE_PATH) {
  try {
    return readFile(resolve(`${BASE_PATH}/schema.gql`), 'utf8');
  } catch (error) {
    throw new ReferenceError('The file `./schema.gql` is required.');
  }
};
