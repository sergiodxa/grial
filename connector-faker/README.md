# @grial/connector-faker
Grial datasource connector for faker.

## Required enviroment variables
- FAKER_LOCALE => language locale (default: `en`)
- FAKER_SEED => randomness seed (default: `null`)

## Usage
Install it

```bash
npm i @grial/connector-faker
```

Add it to your `connectors.js` files

```js
exports.faker = require('@grial/connector-faker')
```

## API
It use the [`faker`](https://www.npmjs.com/package/faker) package and it return the module.
