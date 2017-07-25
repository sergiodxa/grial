const { user, comments } = require('./Post.js')

describe('Post resolver', () => {
  it('should fetch the post author', () => {
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

  it('should fetch the comments of the post', () => {
    const commentsData = [{ id: 1 }, { id: 2 }, { id: 3 }]

    expect(comments({ id: 1 }, null, {
      connectors: {
        rest: {
          read({ resource, params }) {
            expect(resource).toBe('comments')
            expect(params.postId).toBe(1)
            return commentsData
          }
        }
      }
    })).toBe(commentsData)
  })
})
