exports.todos = function todos(user, args, context) {
  return context.models.Todo.readBy({ userId: user.id })
}
