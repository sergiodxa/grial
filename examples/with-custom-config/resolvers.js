// main resolvers
exports.Query = {
  me(rootQuery, args, context) {
    console.log(context.token)
    return context.models.User.me()
  }
}

// type resolvers
exports.User = {
  fullName(user) {
    return `${user.firstName} ${user.lastName}`
  }
}
