const DataLoader = require('dataloader')

exports.userLoader = function userLoader({ User }) {
  return new DataLoader(ids => Promise.all(ids.map(id => User.withId({ id }))))
}
