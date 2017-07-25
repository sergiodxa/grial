const { User } = require('./models.js')

const single = { id: 1 }
const list = [{ id: 1 }, { id: 2 }, { id: 3 }]

const connectors = {
  rest: {
    read({ resource, id, params }) {
      if (id) return single
      return list
    }
  }
}

describe('User model', () => {
  it('should get the list of users', async() => {
    const model = await User(connectors)
    expect(model.all()).toBe(list)
  })

  it('should get a single 1', async() => {
    const model = await User(connectors)
    expect(model.withId({ id: 1 })).toBe(single)
  })
})
