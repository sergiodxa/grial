exports.user = function user(post, args, context) {
  return context.models.User.withId({ id: post.userId });
};

exports.comments = function comments(post, args, context) {
  return context.connectors.rest.read({
    resource: 'comments',
    params: { postId: post.id },
  });
};
