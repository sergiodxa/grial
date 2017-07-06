const fs = require('fs');
const { resolve } = require('path');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const stat = promisify(fs.stat);

module.exports = async function getSchema(BASE_PATH) {
  const path = resolve(`${BASE_PATH}/schema.gql`);
  if (await stat(path)) return readFile(path, 'utf8');
  throw new ReferenceError('The file `./schema.gql` is required.');
};
