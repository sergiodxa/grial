# Grial
A Node.js framework to create GraphQL APIs.

![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg) ![standard](https://img.shields.io/badge/code_style-standard-brightgreen.svg) ![license](https://img.shields.io/npm/l/@grial/server.svg)

## Why?
There's a lot of boilerplate code required to run a GraphQL API with Node.js, the server code it's almost always the same, create a server, load the resolvers and the schema and set the `/graphql` endpoint along with GraphiQL.

Grial allow you to only think about your business logic and API and is responsible for implementing the boilerplate code for you.

Grial also provide you with connectors you can use to consume many data sources easily.

## How to use
### Setup
Install it

```bash
npm i @grial/cli @grial/server
```

Add the following script to your `package.json`

```json
{
  "scripts": {
    "start": "grial start"
  }
}
```

When you run `npm start` and without creating environment variables you will see something like this.

```bash
$ grial start
Grial server running
> GraphiQL Endpoint      = http://localhost:3000/ide
> API Endpoint           = http://localhost:3000/graphql
> Subscriptions Endpoint = http://localhost:3000/subscriptions
```

You can then access to `http://localhost:3000/ide` and try your GraphQL server from the GraphiQL in-browser IDE.

### File structure
#### `connectors.js` (optional)
Data source connectors, they can be your own custom connectors or you can just re-export the Grial connectors you download from npm.

#### `loaders.js` (optional)
Data loaders you can use to batch requests or queries. They are recreated per request and because of that have a single request cache. Receive the models and connectors and can use them internally to fetch data.

#### `models.js` (optional)
Your application models, they can use a single connector or even use multiple ones. Here's where your application business logic must reside.

#### `resolvers.js`
Your API schema resolvers. The resolvers receive the connectors, loaders and models from context and allow you to use them as you want. They are intented to be as dummy as possible and you must keep your logic inside your models.

#### `schema.gql`
Your API schema definition. It's just a `.gql` file with all your API schema.

## Creating a `connector`
The connectors are just async functions which receives all the environment variables and return a new data source connection. Your connection can be whatever it help your interact with data.

```js
async function connector(env) {
  return {
    hello() {
      return 'hello world!'
    }
  }
}

module.exports = connector;
```

That's a really simple connector, as you can see it receive the environment variables as an argument and it return a object. Then you can use that object inside your models to get that piece of data.

Your connectors can be generic or specific to some server. Eg. you can have a Sequelize connector for any kind of relational database or your can have a PostgreSQL specific connector.

### Using multi-instances of a single connector
You may want to use the same connector multiple times, maybe you have 2 MongoDB databases or you want to fetch data from many REST APIs. If that's your case you can create a custom connector who work as a proxy for the Grial provided connectors.

This proxy connector receive your own custom environment variables and pass them as the required to the real connector.

```js
exports.pokeapi = function({ POKEAPI_ENDPOINT }) {
  return require('@grial/connector-rest')({ REST_ENDPOINT: POKEAPI_ENDPOINT })
}

exports.swapi = function({ SWAPI_ENDPOINT }) {
  return require('@grial/connector-rest')({ REST_ENDPOINT: SWAPI_ENDPOINT })
}
```

That way the real connector receive the required variable but you can use a custom one with a any name.

## Create a `model`
A model it's an async function who receive the connectors and environment variables and return a new object, your real model. That object it's intended to receive the arguments and HTTP request object from your resolvers and have your business logic.

A model your check if you are logged or if you have the required permissions and must have methods to create, read, update or delete data using connectors.

You can either have completely custom models or use the models of a ORM or ODM like Sequelize or Mongoose.

```js
exports.Pokemon = async function Pokemon({ pokeapi }) {
  return {
    getSingle(number) {
      return pokeapi.read({ resource: 'pokemon', id: number });
    },
  };
};
```

That example model use the `pokeapi` connector to get a single Pokemon data, it return an object with the method to do that. That's a extremelly simple model but you can extend it as you want.

### Testing
Thanks to the injection of connectors inside your models you can test how they work simple mocking your connectors API. In the above example we can create a mock for the pokeapi connector using a plain object with a `read` method.

Then we can create a simple test that create a new instance of the pokemon model and run the `getSingle` method.

```js
const { Pokemon } = require('./models.js');

describe('Pokemon model', () => {
  it('should get a single pokemon data', async () => {
    const pokemon {
      id: 25,
      name: 'Pikachu',
    };

    const pokeapi = {
      read({ resource, id }) {
        expect(resource).toBe('pokemon')
        expect(id).toBe(25)
        return pokemon;
      },
    };

    const model = await Pokemon({ pokeapi })

    expect(model.getSingle({ resource: 'pokemon', id: 25 })).toBe(pokemon);
  });
});
```

## Create a `resolver`
A resolver it's a function which match your schema to allow you to run queries, mutations or subscriptions. You can exports a single object with your whole resolvers map or devide it (recommended) in multiple exports and files.

```js
// main resolvers
exports.Query = {
  me(rootQuery, args, context) {
    return context.models.User.me();
  },
};

// type resolvers
exports.User = {
  fullName(user) {
    return `${user.firstName} ${user.lastName}`;
  },
};
```

That's the `resolvers.js` from the _basic example_, as you can observe we exported two objects, the schema Query resolvers map and the User type resolvers map. Each object has method that match your schema definition.

That example use a single file, but if your resolvers map grow you can split it in multiple files for each type definition and then write something like this.

```js
exports.User = require('./resolvers/User.js')
```

That way your `./resolvers/User.js` file can have the methods required to resolver the full User type.

### Testing
Because the resolvers receive the models and connectors from the context object you can easily test it, if you have a resolver like this:

```js
exports.posts = function posts(user, args, context) {
  return context.connectors.rest.read({
    resource: 'posts',
    params: { userId: user.id },
  });
};

exports.todos = function todos(user, args, context) {
  return context.connectors.rest.read({
    resource: 'todos',
    params: { userId: user.id },
  });
};

exports.albums = function albums(user, args, context) {
  return context.connectors.rest.read({
    resource: 'albums',
    params: { userId: user.id },
  });
};
```
> From the jsonplaceholder-wrapper example

You can import each method and test them individually injecting the connectors or models.

```js
const { posts } = require('./User.js');

describe('User resolver', () => {
  it('should fetch the posts of a user', () => {
    const posts = [{ id: 1 }, { id: 2 }, { id: 3 }];

    expect(posts({ id: 1 }), null, {
      connectors: {
        Rest: {
          read({ resource, params }) {
            expect(resource).toBe('posts');
            expect(params.userId).toBe(1);
            return posts;
          },
        },
      },
    }).toBe(posts);
  });
});
```

That way you can be sure your connectors code run without problems.
