exports.me = function me(rootQuery, args, context) {
  return context.models.User.read({ id: 1 })
}

exports.user = function user(rootQuery, args, context) {
  return context.models.User.read({ id: args.id })
}

exports.todo = function todo(rootQuery, args, context) {
  return context.models.Todo.read({ id: args.id })
}
