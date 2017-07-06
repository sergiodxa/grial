# @grial/connector-mongodb
Grial datasource connector for MongoDB.

## Required enviroment variables
- MONGO_USER => the MongoDB database user
- MONGO_PASS => the MongoDB database password
- MONGO_HOST => the MongoDB database host (default: `localhost`)
- MONGO_NAME => the MongoDB database name
- MONGO_URL => the MongoDB full URL, if it's not defined use the above variables

## Usage
Install it

```bash
npm i @grial/connector-mongodb
```

Add it to your `connectors.js` files

```js
exports.mongodb = require('@grial/connector-mongodb')
```

## API
It use the [`mongodb`](https://www.npmjs.com/package/mongodb) package and it return a connection instance.
