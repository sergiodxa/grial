// native
const { createServer } = require('http');

// packages
const express = require('express');
const bodyParser = require('body-parser');
const { execute, subscribe } = require('graphql');
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const { SubscriptionServer } = require('subscriptions-transport-ws');

// API layer
const getResolvers = require('./api/resolvers.js');
const getSchemas = require('./api/schema.js');

// Business logic layer
const getConnectors = require('./app/connectors.js');
const getLoaders = require('./app/loaders.js');
const getMiddlewares = require('./app/middlewares.js');
const getModels = require('./app/models.js');

/**
 * Run the server
 * @param {Object} env The app environment variables
 */
async function run(env) {
  const {
    NODE_ENV = 'development',
    BASE_PATH = '.',
    HOST,
    PORT,
    PUBLIC_HOST = env.HOST,
    PUBLIC_PORT = env.PORT,
    SUBSCRIPTION_PATH = 'subscriptions'
  } = env;

  // create express app and http server
  const app = express();
  const server = createServer(app);

  // API layer
  const resolvers = await getResolvers(BASE_PATH);
  const typeDefs = await getSchemas(BASE_PATH);

  // Business logic layer
  const connectors = await getConnectors(BASE_PATH);
  const loaders = await getLoaders(BASE_PATH);
  const middlewares = await getMiddlewares(BASE_PATH);
  const models = await getModels(BASE_PATH);

  // set middlewares
  app.use(bodyParser.json()); // parse POST requests body
  // set custom middlewares
  middlewares.forEach(middleware => app.use(middleware));

  // create GraphQL schema and subscription manager
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  // create new instances of each connector
  const instancedConnectors = (await Promise.all(
    Object.keys(connectors).map(async connectorName => {
      const instance = await connectors[connectorName](env);
      return [instance, connectorName];
    })
  )).reduce((instances, [instance, connectorName]) => {
    return Object.assign(instances, {
      [connectorName]: instance
    });
  }, {});

  // create new instances of each model
  const modelParams = Object.assign({}, env, instancedConnectors);

  const instancedModels = (await Promise.all(
    Object.keys(models).map(async modelName => {
      const instance = await models[modelName](modelParams);
      return [instance, modelName];
    })
  )).reduce((instances, [instance, modelName]) => {
    return Object.assign(instances, {
      [modelName]: instance
    });
  }, {});

  // set /graphql endpoint
  app.use(
    '/graphql',
    graphqlExpress(request => {
      const loaderParams = Object.assign({}, modelParams, instancedModels, request);

      const instancedLoaders = Object.keys(loaders)
        .map(loaderName => {
          const instance = loaders[loaderName](loaderParams);
          return [instance, loaderName];
        })
        .reduce((instances, [instance, loaderName]) => {
          return Object.assign(instances, {
            [loaderName]: instance
          });
        }, {});

      return {
        schema,
        debug: NODE_ENV !== 'production',
        context: {
          request,
          connectors: instancedConnectors,
          models: instancedModels,
          loaders: instancedLoaders
        }
      };
    })
  );

  // set GraphiQL IDE in development
  if (NODE_ENV !== 'production') {
    app.use(
      '/ide',
      graphiqlExpress({
        endpointURL: '/graphql',
        subscriptionsEndpoint: `ws://${PUBLIC_HOST}:${PUBLIC_PORT}/${SUBSCRIPTION_PATH}`
      })
    );
  }

  return new Promise((resolve, reject) => {
    server.listen(PORT, HOST, error => {
      if (error) return reject(error);
      resolve({
        server,
        subscription: new SubscriptionServer(
          { execute, subscribe, schema },
          { server, path: `/${SUBSCRIPTION_PATH}` }
        )
      });
    });
  });
}

module.exports = run;
