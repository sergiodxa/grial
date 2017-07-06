const { createClient } = require('redis');

async function redis({ REDIS_HOST = 'localhost', REDIS_PORT = 6379 }) {
  return createClient({
    host: REDIS_HOST,
    port: REDIS_PORT
  });
}

module.exports = redis;
