const { album } = require('./Photo.js')

describe('Photo resolver', () => {
  it('should fetch the album of the comment', () => {
    const albumData = { id: 1 }

    expect(album({ albumId: 1 }, null, {
      connectors: {
        rest: {
          read({ resource, id }) {
            expect(resource).toBe('albums')
            expect(id).toBe(1)
            return albumData
          }
        }
      }
    })).toBe(albumData)
  })
})
