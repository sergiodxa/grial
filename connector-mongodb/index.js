const MongoClient = require('mongodb');

async function mongodb({
  MONGO_USER,
  MONGO_PASS,
  MONGO_HOST = 'localhost',
  MONGO_NAME,
  MONGO_URL = null
}) {
  const URL = MONGO_URL || `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}/${MONGO_NAME}`;

  return new Promise((resolve, reject) => {
    MongoClient.connect(URL, function(error, connection) {
      if (error) return reject(error);
      resolve(connection);
    });
  });
}

module.exports = mongodb;
