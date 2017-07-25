exports.post = function post(comment, args, context) {
  return context.connectors.rest.read({
    resource: 'posts',
    id: comment.postId
  })
}
