const { post } = require('./Comment.js')

describe('Comment resolver', () => {
  it('should fetch the post of the comment', () => {
    const postData = { id: 1 }

    expect(post({ postId: 1 }, null, {
      connectors: {
        rest: {
          read({ resource, id }) {
            expect(resource).toBe('posts')
            expect(id).toBe(1)
            return postData
          }
        }
      }
    })).toBe(postData)
  })
})
