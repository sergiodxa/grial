exports.users = function users(rootQuery, args, context) {
  return context.models.User.all({ page: args.page });
};

exports.user = function user(rootQuery, args, context) {
  return context.models.User.withId({ id: args.id });
};

exports.me = function me(rootQuery, args, context) {
  return context.models.User.me();
};
