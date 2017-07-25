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
- SSL_ENABLED => if the app is running with SSL (HTTPS and WSS)

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
You can avoid `@grial/cli` and just create a `server.js` file with a code similar to this.

```js
const Grial = require('@grial/server');
const { createServer } = require('http');

const api = new Grial(process.env);
const handle = api.getRequestHandler();

api.prepare()
  .then(() => {
    const server = createServer(handle);
    server.listen(3000);
  })
  .catch(error => {
    console.error(error);
    process.exit(0);
  })
```

That way you can run a Express application and use the Grial request handler for your API, it will handle the /graphql and /ide urls and call the next middleware if the URL doesn't match.

It also allow you use use something like `nodemon` to watch file changes in your API.
