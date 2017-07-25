exports.writeUser = function writeUser(rootQuery, args, context) {
  return context.models.User.write({
    id: args.input.id || new Date().getTime(),
    username: args.input.username
  })
}

exports.createTodo = function createTodo(rootQuery, args, context) {
  return context.models.Todo.write(args.input)
}
