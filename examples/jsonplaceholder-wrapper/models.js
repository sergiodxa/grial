exports.User = async function User({ rest }) {
  return {
    all({ page = 1 } = {}) {
      return rest.read({
        resource: 'users',
        params: { _page: page }
      })
    },
    withId({ id }) {
      return rest.read({
        resource: 'users',
        id
      })
    }
  }
}
