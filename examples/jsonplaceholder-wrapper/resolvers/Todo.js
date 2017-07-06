exports.user = function user(comment, args, context) {
  return context.models.User.withId({ id: comment.userId });
};
