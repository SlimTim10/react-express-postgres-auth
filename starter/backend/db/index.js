const conn = require('./conn.js')

const getPosts = async () => {
  const { rows } = await conn.query(`
SELECT posts.id AS post_id, posts.*, users.*
FROM posts
LEFT JOIN users ON posts.author_id = users.id
ORDER BY updated_at DESC`)
  
  return rows.map(row => (
    {
      id: row.post_id,
      title: row.title,
      body: row.body,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      author: {
        id: row.author_id,
        username: row.username,
        email: row.email
      }
    }
  ))
}

const createPost = async (title, body, authorID) => {
  const { rows } = await conn.query(
    'INSERT INTO posts (title, body, author_id) VALUES ($1, $2, $3) RETURNING *',
    [title, body, authorID]
  )
  return rows?.length >= 1 ? rows[0] : null
}

const getUserByID = async userID => {
  const { rows } = await conn.query(
    'SELECT * FROM users WHERE id = $1',
    [userID]
  )
  return rows?.length >= 1 ? rows[0] : null
}

module.exports = {
  getPosts,
  createPost,
  getUserByID,
}
