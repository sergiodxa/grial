const { posts, todos, albums } = require('./User')

describe('User resolver', () => {
  it('should fetch the posts of a user', () => {
    const postsData = [{ id: 1 }, { id: 2 }, { id: 3 }]

    expect(posts({ id: 1 }, null, {
      connectors: {
        rest: {
          read({ resource, params }) {
            expect(resource).toBe('posts')
            expect(params.userId).toBe(1)
            return postsData
          }
        }
      }
    })).toBe(postsData)
  })

  it('should fetch the todos of a user', () => {
    const todosData = [{ id: 1 }, { id: 2 }, { id: 3 }]

    expect(todos({ id: 1 }, null, {
      connectors: {
        rest: {
          read({ resource, params }) {
            expect(resource).toBe('todos')
            expect(params.userId).toBe(1)
            return todosData
          }
        }
      }
    })).toBe(todosData)
  })

  it('should fetch the albums of a user', () => {
    const albumsData = [{ id: 1 }, { id: 2 }, { id: 3 }]

    expect(albums({ id: 1 }, null, {
      connectors: {
        rest: {
          read({ resource, params }) {
            expect(resource).toBe('albums')
            expect(params.userId).toBe(1)
            return albumsData
          }
        }
      }
    })).toBe(albumsData)
  })
})
