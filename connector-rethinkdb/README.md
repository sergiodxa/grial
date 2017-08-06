# @grial/connector-rethinkdb
Grial datasource connector for RethinkDB.

## Required enviroment variables
- RETHINK_HOST => the host to connect to (default: `localhost`)
- RETHINK_PORT => the port to connect on (default: `28015`)
- RETHINK_DB   => the default database (default: `test`)
- RETHINK_USER => he user account to connect as (default: `admin`)
- RETHINK_PASS => the password for the user account to connect as (default: `''`)

## Usage
Install it

```bash
npm i @grial/connector-rethinkdb
```

Add it to your `connectors.js` files

```js
exports.rethinkdb = require('@grial/connector-rethinkdb')
```

## Configuration
You can customize the configuration object using `grial.config.js` with the following object.

```js
module.exports = {
  connectors: {
    rethinkdb({ config, env }) {
      return newConfig
    }
  }
}
```

- `env` -> the enviroment variables
- `config` -> the base config

## API
It use the [`rethinkdb`](https://www.npmjs.com/package/rethinkdb) package and it return a connection instance.
