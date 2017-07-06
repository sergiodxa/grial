const fs = require('fs');
const { resolve } = require('path');
const { promisify } = require('util');

const stat = promisify(fs.stat);

module.exports = async function getModels(BASE_PATH) {
  const path = resolve(`${BASE_PATH}/models.js`);
  if (await stat(path)) return require(path);
  throw new ReferenceError('The file `./models.js` is required.');
};
