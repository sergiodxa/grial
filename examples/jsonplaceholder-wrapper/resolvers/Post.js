exports.user = function user(post, args, context) {
  return context.loaders.userLoader.load(post.userId)
}

exports.comments = function comments(post, args, context) {
  return context.connectors.rest.read({
    resource: 'comments',
    params: { postId: post.id }
  })
}
