# @grial/server
The GraphQL server module of Grial

## Required enviroment variables
- NODE_ENV => the app running environment (default `development`)
- BASE_PATH => the path where the required files are located (default `.`)
- PORT => the app running port
- HOST => the app running host
- PUBLIC_PORT => the app public port (default to `PORT`), required inside Docker
- PUBLIC_HOST => the app public host (default to `HOST`), required inside Docker
- SUBSCRIPTION_PATH => the app subscriptions path (default `subscriptions`)

## Usage
Install it

```bash
npm i @grial/server
```

Then run `@grial/cli`

```bash
grial start
```

It will load it and use it to start your API server.

## Custom usage
You can avoid `@grial/cli` and just create a `index.js` file with this code.

```js
const runServer = require('@grial/server')

runServer(process.env)
  .then(({ server, subscription }) => {
    // server => your HTTP server
    // subscription => your WS server
    console.log('server running')
  })
  .catch(error => {
    console.error(error)
    process.exit(0)
  })
```

That way you can start the server and run any code you want before or after the server it's running. It also allow you use use something like `nodemon` to watch file changes.
