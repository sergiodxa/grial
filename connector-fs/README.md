# @grial/connector-fs
Grial datasource connector for the file system.

## Required enviroment variables
None

## Usage
Install it

```bash
npm i @grial/connector-fs
```

Add it to your `connectors.js` files

```js
exports.fs = require('@grial/connector-fs')
```

## API
### `write(filePath: string, data: Object, options: Object | string = 'utf8'): string`
Write a new file to the specified file path with the given data.

### `read(filePath: string, options: Object | string = 'utf8'): string`
Read a file from the disk.

### `delete(filePath: string): boolean`
Delete the specified file from disk

### `check(filePath: string): boolean`
Check the the specified file exists
