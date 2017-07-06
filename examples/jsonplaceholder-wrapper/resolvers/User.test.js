const { posts, todos, albums } = require('./User');

describe('User resolver', () => {
  it('should fetch the posts of a user', () => {
    const posts = [{ id: 1 }, { id: 2 }, { id: 3 }];

    expect(posts({ id: 1 }), null, {
      connectors: {
        Rest: {
          read({ resource, params }) {
            expect(resource).toBe('posts');
            expect(params.userId).toBe(1);
            return posts;
          },
        },
      },
    }).toBe(posts);
  });

  it('should fetch the todos of a user', () => {
    const todos = [{ id: 1 }, { id: 2 }, { id: 3 }];

    expect(todos({ id: 1 }), null, {
      connectors: {
        Rest: {
          read({ resource, params }) {
            expect(resource).toBe('todos');
            expect(params.userId).toBe(1);
            return todos;
          },
        },
      },
    }).toBe(todos);
  });

  it('should fetch the albums of a user', () => {
    const albums = [{ id: 1 }, { id: 2 }, { id: 3 }];

    expect(albums({ id: 1 }), null, {
      connectors: {
        Rest: {
          read({ resource, params }) {
            expect(resource).toBe('albums');
            expect(params.userId).toBe(1);
            return albums;
          },
        },
      },
    }).toBe(albums);
  });
});
