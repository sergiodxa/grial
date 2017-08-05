# @grial/utils
A module containing utility functions and helpers for Grial internal and users usage.

## Modules
### `getConfig`
You can importing using:

```js
const { getConfig } = require('@grial/utils')
const getConfig = require('@grial/utils').getConfig
const getConfig = require('@grial/utils/getConfig.js')
```

This function receive a optional base path and return the `grial.config.js` in that path, if it doesn't exists return an empty object.
