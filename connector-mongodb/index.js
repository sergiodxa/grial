const MongoClient = require('mongodb')

const connectionsCache = {}

async function mongodb({
  MONGO_USER,
  MONGO_PASS,
  MONGO_HOST = 'localhost',
  MONGO_NAME,
  MONGO_URL = null
}) {
  const URL =
    MONGO_URL ||
    `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}/${MONGO_NAME}`

  if (!connectionsCache[URL]) {
    connectionsCache[URL] = new Promise(function(resolve, reject) {
      MongoClient.connect(URL, (error, connection) => {
        if (error) {
          console.log(error)
          reject(error)
        }

        resolve(connection)
      })
    })
  }

  return connectionsCache[URL]
}

module.exports = mongodb
