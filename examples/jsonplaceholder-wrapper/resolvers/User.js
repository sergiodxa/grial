exports.posts = function posts(user, args, context) {
  return context.connectors.rest.read({
    resource: 'posts',
    params: { userId: user.id }
  })
}

exports.todos = function todos(user, args, context) {
  return context.connectors.rest.read({
    resource: 'todos',
    params: { userId: user.id }
  })
}

exports.albums = function albums(user, args, context) {
  return context.connectors.rest.read({
    resource: 'albums',
    params: { userId: user.id }
  })
}
