module.exports = {
  graphqlConfig({ request, models, connectors, loaders }) {
    return {
      context: {
        token: request.headers.authorization,
        loaders,
        models,
        connectors,
        request
      }
    }
  },
  graphiqlConfig({ request }) {
    return {
      passHeader: `'Authorization': 'Token asdfb316asfu0132'`
    }
  },
  subscriptionConfig({ schema, env }) {
    return {
      onConnect(connectionParams) {
        console.log('WS connected')
        return connectionParams
      }
    }
  }
}
