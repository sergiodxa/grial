exports.album = function album(photo, args, context) {
  return context.connectors.rest.read({
    resource: 'albums',
    id: photo.albumId
  })
}
