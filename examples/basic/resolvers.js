// main resolvers
exports.Query = {
  me(rootQuery, args, context) {
    return context.models.User.me()
  }
}

// type resolvers
exports.User = {
  fullName(user) {
    return `${user.firstName} ${user.lastName}`
  }
}
