const { user, users } = require('./Query.js')

describe('Query resolver', () => {
  it('should fetch a single user', () => {
    const userData = {
      id: 1,
      name: 'John Doe'
    }

    expect(
      user(
        null,
        { id: 1 },
        {
          loaders: {
            userLoader: {
              load(id) {
                expect(id).toBe(1)
                return userData
              }
            }
          }
        }
      )
    ).toBe(userData)
  })

  it('should fetch a list of users', () => {
    const data = [{ id: 1 }, { id: 2 }, { id: 3 }]

    expect(
      users(
        null,
        { page: 1 },
        {
          models: {
            User: {
              all({ page }) {
                expect(page).toBe(1)
                return data
              }
            }
          }
        }
      )
    ).toBe(data)
  })
})
