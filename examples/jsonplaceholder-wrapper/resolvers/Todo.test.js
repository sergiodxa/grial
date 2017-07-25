const { user } = require('./Todo.js')

describe('Todo resolver', () => {
  it('should fetch the todo author', () => {
    const userData = {
      id: 1,
      name: 'John Doe'
    }

    expect(
      user({ userId: 1 }, null, {
        loaders: {
          userLoader: {
            load(id) {
              expect(id).toBe(1)
              return userData
            }
          }
        }
      })
    ).toBe(userData)
  })
})
