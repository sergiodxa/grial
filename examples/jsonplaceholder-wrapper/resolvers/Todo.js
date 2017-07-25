exports.user = function user(todo, args, context) {
  return context.loaders.userLoader.load(todo.userId)
}
