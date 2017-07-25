// this model use Redis
exports.User = async function User({ redis }) {
  const get = key =>
    new Promise((resolve, reject) => {
      redis.get(key, (error, reply) => (error ? reject(error) : resolve(reply)))
    })

  return {
    async read({ id }) {
      return {
        id,
        username: await get(`user:${id}`)
      }
    },
    async write({ id, username }) {
      redis.set(`user:${id}`, username)
      return { id, username }
    }
  }
}

// this model use MongoDB
exports.Todo = async function Todo({ mongodb }) {
  const collection = mongodb.collection('todos')

  return {
    async read({ id }) {
      return collection.findOne({ id })
    },
    async readBy(query) {
      return collection.find(query).toArray()
    },
    async write({ id, content, userId }) {
      await collection.insertOne({ id, content, userId })
      return { id, content, userId }
    }
  }
}
