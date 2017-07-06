const fs = require('fs');
const { resolve } = require('path');
const { promisify } = require('util');

const stat = promisify(fs.stat);
const defaultMiddlewares = [];

module.exports = async function getMiddlewares(BASE_PATH) {
  const path = resolve(`${BASE_PATH}/middlewares.js`);
  if (await stat(path)) return require(path);
  return defaultMiddlewares;
};
