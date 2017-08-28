// native
const { createServer } = require('http')
const { parse } = require('url')

// packages
const { makeExecutableSchema } = require('graphql-tools')
const { runHttpQuery } = require('graphql-server-core')
const GraphiQL = require('graphql-server-module-graphiql')
const { SubscriptionServer } = require('subscriptions-transport-ws')
const { execute, subscribe } = require('graphql')
const { json } = require('micro')
const { instantiate, mergeInstances, getConfig } = require('@grial/utils')

// API layer
const getResolvers = require('./api/resolvers.js')
const getSchemas = require('./api/schema.js')

// Business logic layer
const getConnectors = require('./app/connectors.js')
const getLoaders = require('./app/loaders.js')
const getModels = require('./app/models.js')

/**
 * Grial server
 * @type {Class}
 */
class Grial {
  constructor(env) {
    this.env = env
  }

  /**
   * Prepare the API schema and the app models and connectors
   * @param  {Object} env The app environment variables
   * @return {Object}     The schema, connectors and models
   */
  async prepare() {
    const { BASE_PATH = '.' } = this.env

    // Grial config
    this.config = await getConfig(BASE_PATH)
    if ('graphqlConfig' in this.config) {
      console.log('Custom `graphqlConfig` found in grial.config.js.')
    }
    if ('graphiqlConfig' in this.config) {
      console.log('Custom `graphiqlConfig` found in grial.config.js.')
    }
    if ('subscriptionConfig' in this.config) {
      console.log('Custom `subscriptionConfig` found in grial.config.js.')
    }

    // create schema
    const resolvers = await getResolvers(BASE_PATH)
    const typeDefs = await getSchemas(BASE_PATH)
    const schema = makeExecutableSchema({ typeDefs, resolvers })
    this.schema = schema

    // create connectors
    const connectors = await getConnectors(BASE_PATH)
    const instancedConnectors = (await Promise.all(
      Object.entries(connectors).map(instantiate(this.env))
    )).reduce(mergeInstances, {})
    this.connectors = instancedConnectors

    // create models
    const models = await getModels(BASE_PATH)
    const modelParams = Object.assign({}, this.env, instancedConnectors)
    const instancedModels = (await Promise.all(
      Object.entries(models).map(instantiate(modelParams))
    )).reduce(mergeInstances, {})
    this.models = instancedModels

    // get loaders
    this.loaders = await getLoaders(BASE_PATH)
  }

  /**
   * Get application loaders instances
   * @param  {Object} request HTTP request
   * @return {Object}         Loaders instances
   */
  async getLoaders(request) {
    const { models, connectors, env, loaders } = this
    const loaderParams = Object.assign({}, request, env, connectors, models)
    return (await Promise.all(Object.entries(loaders).map(instantiate(loaderParams)))).reduce(
      mergeInstances,
      {}
    )
  }

  /**
   * Get GraphQL request options
   * @return {Object} The GraphQL options
   */
  async getGraphQLOptions(request) {
    const { schema, models, connectors, config, env } = this

    const loaders = await this.getLoaders(request)

    const baseOptions = {
      schema,
      context: { request, connectors, models, loaders },
      debug: env.NODE_ENV !== 'production'
    }

    if ('graphqlConfig' in config) {
      return Object.assign(
        {},
        baseOptions,
        config.graphqlConfig({
          schema,
          request,
          connectors,
          models,
          loaders,
          env
        })
      )
    }

    return baseOptions
  }

  /**
   * Get GraphiQL configuration options
   * @return {Object} GraphiQL options
   */
  getGraphiQLOptions({ request, query }) {
    const { env, config } = this

    const {
      PUBLIC_HOST = env.HOST || 'localhost',
      PUBLIC_PORT = env.PORT || 3000,
      SUBSCRIPTION_PATH = 'subscriptions',
      SSL_ENABLED = false
    } = env

    let PROTOCOL = 'ws'
    if (SSL_ENABLED) {
      PROTOCOL = 'wss'
    }

    const baseOptions = {
      endpointURL: '/graphql',
      subscriptionsEndpoint: `${PROTOCOL}://${PUBLIC_HOST}:${PUBLIC_PORT}/${SUBSCRIPTION_PATH}`
    }

    if ('graphiqlConfig' in config) {
      return Object.assign({}, baseOptions, config.graphiqlConfig({ query, request, env }))
    }
    return baseOptions
  }

  /**
   * Get WS Subscription server options
   * @return {Object} Options
   */
  getSubscriptionOptions() {
    const { env, config, schema } = this

    if ('subscriptionConfig' in config) {
      return Object.assign({}, { schema }, config.subscriptionConfig({ env, schema }), {
        execute,
        subscribe
      })
    }

    return { schema, execute, subscribe }
  }

  /**
   * Create the HTTP request handler
   * @return {Function} The HTTP request handler
   */
  getRequestHandler({ graphql = 'POST /graphql', graphiql = 'GET /ide' } = {}) {
    /**
     * Grail HTTP request handler
     * @param  {Object}   request  The HTTP request
     * @param  {Object}   response The HTTP response
     * @param  {Function} next     Call the next middleware
     * @return {Function}          Request handler
     */
    return async(request, response, next = null) => {
      const { env } = this

      const url = parse(request.url, true)

      const formatedURL = `${request.method.toUpperCase()} ${url.pathname}`

      // handle GraphQL queries
      if (formatedURL === graphql) {
        try {
          const data = await runHttpQuery([request, response], {
            method: request.method,
            options: await this.getGraphQLOptions(request),
            query: request.method === 'POST' ? request.body || (await json(request)) : url.query
          })
          response.setHeader('Content-Type', 'application/json')
          response.write(data)
        } catch (error) {
          if (error.headers) {
            Object.entries(error.headers).forEach(([name, value]) => {
              response.setHeader(name, value)
            })
          }
          response.statusCode = error.statusCode || 500
          response.write(error.message)
        }
        return response.end()
      }

      // render GraphiQL IDE
      if (formatedURL === graphiql) {
        const { query } = url
        try {
          const graphiqlString = await GraphiQL.resolveGraphiQLString(
            query,
            this.getGraphiQLOptions({ query, request, env }),
            request
          )
          response.setHeader('Content-Type', 'text/html')
          response.write(graphiqlString)
        } catch (error) {
          response.statusCode = error.statusCode || 500
          response.write(error.message)
        }
        return response.end()
      }

      // if it's running inside Express/Connect try to call the next middleware
      if (next) return next()

      response.statusCode = 404
      response.statusMessage = 'Not Found'
      return response.end()
    }
  }

  /**
   * Run a simple HTTP and WS (subscriptions) server
   * @return {[type]} [description]
   */
  run() {
    const { PORT = 3000, HOST = 'localhost', SUBSCRIPTION_PATH = 'subscriptions' } = this.env

    const server = createServer(this.getRequestHandler())

    return new Promise((resolve, reject) => {
      server.listen(PORT, HOST, error => {
        if (error) return reject(error)
        resolve({
          http: server,
          ws: new SubscriptionServer(this.getSubscriptionOptions(), {
            server,
            path: `/${SUBSCRIPTION_PATH}`
          })
        })
      })
    })
  }
}

module.exports = Grial
