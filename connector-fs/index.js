const fs = require('fs')
const { promisify } = require('util')

const existFile = promisify(fs.stat)
const writeFile = promisify(fs.writeFile)
const readFile = promisify(fs.readFile)
const unlinkFile = promisify(fs.unlink)

async function filesystem() {
  return {
    async write(filePath, data, options = 'utf8') {
      await writeFile(filePath, data, options)
      return data
    },

    async read(filePath, options = 'utf8') {
      return readFile(filePath, options)
    },

    async delete(filePath) {
      await unlinkFile(filePath)
      return true
    },

    async check(filePath) {
      return existFile(filePath)
    }
  }
}

module.exports = filesystem
