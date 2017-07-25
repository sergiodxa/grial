exports.author = function author(todo, args, context) {
  return context.models.User.read({ id: todo.userId })
}
