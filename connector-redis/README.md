# @grial/connector-redis
Grial datasource connector for Redis.

## Required enviroment variables
- REDIS_HOST => the Redis database host (default: `localhost`)
- REDIS_PORT => the Redis database port (default: `6379`)

## Usage
Install it

```bash
npm i @grial/connector-redis
```

Add it to your `connectors.js` files

```js
exports.redis = require('@grial/connector-redis')
```

## API
It use the [`redis`](https://www.npmjs.com/package/redis) package and it return a connection instance.
