exports.user = function user(album, args, context) {
  return context.models.User.withId({ id: album.userId });
};

exports.photos = function photos(album, args, context) {
  return context.connectors.rest.read({
    resource: 'photos',
    params: { albumId: album.id },
  });
};
