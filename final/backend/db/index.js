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

const getPostByID = async id => {
  const { rows } = await conn.query(
    'SELECT * FROM posts WHERE id = $1',
    [id]
  )
  return rows?.length >= 1 ? rows[0] : null
}

const createPost = async (title, body, authorID) => {
  const { rows } = await conn.query(
    'INSERT INTO posts (title, body, author_id) VALUES ($1, $2, $3) RETURNING *',
    [title, body, authorID]
  )
  return rows?.length >= 1 ? rows[0] : null
}

const deletePost = async id => {
  const { rows } = await conn.query(
    'DELETE FROM posts WHERE id = $1',
    [id]
  )
  return null
}

const updatePost = async (id, title, body) => {
  const { rows } = await conn.query(
    'UPDATE posts SET title = $2, body = $3 WHERE id = $1 RETURNING *',
    [id, title, body]
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

const getUserByUsername = async username => {
  const { rows } = await conn.query(
    'SELECT * FROM users WHERE username = $1',
    [username]
  )
  return rows[0]
}

const createUser = async (username, email, password) => {
  const { rows } = await conn.query(
    'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
    [username, email, password]
  )
  return rows?.length >= 1 ? rows[0] : null
}

const createSession = async (sessionID, userID) => {
  const { rows } = await conn.query(
    'INSERT INTO sessions (id, user_id) VALUES ($1, $2) RETURNING *',
    [sessionID, userID]
  )
  return rows?.length >= 1 ? rows[0] : null
}

const deleteSession = async id => {
  const { rows } = await conn.query(
    'DELETE FROM sessions WHERE id = $1',
    [id]
  )
  return null
}

const getUserBySessionID = async sessionID => {
  const sessionResult = await conn.query(
    'SELECT * FROM sessions WHERE id = $1',
    [sessionID]
  )
  if (sessionResult.rows.length < 1) return null
  const userID = sessionResult.rows[0].user_id
  const userResult = await conn.query(
    'SELECT * FROM users WHERE id = $1',
    [userID]
  )
  return userResult.rows.length >= 1 ? userResult.rows[0] : null
}

module.exports = {
  getPosts,
  getPostByID,
  createPost,
  deletePost,
  updatePost,
  getUserByID,
  getUserByUsername,
  createUser,
  createSession,
  deleteSession,
  getUserBySessionID,
}
