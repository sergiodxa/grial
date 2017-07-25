const { user, photos } = require('./Album.js')

describe('Album resolver', () => {
  it('should fetch the album author', () => {
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

  it('should fetch the photos of the album', () => {
    const photosData = [{ id: 1 }, { id: 2 }, { id: 3 }]

    expect(photos({ id: 1 }, null, {
      connectors: {
        rest: {
          read({ resource, params }) {
            expect(resource).toBe('photos')
            expect(params.albumId).toBe(1)
            return photosData
          }
        }
      }
    })).toBe(photosData)
  })
})
