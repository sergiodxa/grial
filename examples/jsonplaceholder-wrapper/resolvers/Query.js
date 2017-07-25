exports.users = function users(rootQuery, args, context) {
  return context.models.User.all({ page: args.page })
}

exports.user = function user(rootQuery, args, context) {
  return context.loaders.userLoader.load(args.id)
}
