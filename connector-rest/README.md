# @grial/connector-rest
Grial datasource connector for wrapping Rest APIs.

## Required enviroment variables
- REST_ENDPOINT => the base endpoint to your Rest API

## Usage
Install it

```bash
npm i @grial/connector-rest
```

Add it to your `connectors.js` files

```js
exports.rest = require('@grial/connector-rest')
```

## API
### `create({ resource: string, data: Object, params: Object = {}, headers: Object = {} }): any`
Create a new resource with the received data

### `read({ resource: string, id: any = null, params: Object = {}, headers: Object = {} }): any`
Fetch a single resource or a list of resources (if the ID is not provided).

### `update({ resource: string, id: any, data, params: Object = {}, headers: Object = {} }): any`
Create a resource with the specified data

### `delete({ resource: string, id: any = null, params: Object = {}, headers: Object = {} }): any`
Delete a specific resource
