const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const uuid = require('uuid')
const cookieParser = require('cookie-parser')

const db = require('./db')

const app = express()
const port = 3001

app.use(bodyParser.json())
app.use(cookieParser())

// Get all posts
app.get('/posts', async (req, res) => {
  try {
    const posts = await db.getPosts()
    res.send(posts)
  } catch (err) {
    console.log(err)
    res.status(400).send({error: true, message: `Couldn't get posts.`})
  }
})

// Create a new post
// A user must be signed in with a valid session to create a post.
app.post('/posts', async (req, res) => {
  try {
    const { title, body } = req.body
    const { sessionID } = req.cookies

    const user = await db.getUserBySessionID(sessionID)
    if (user === null) throw `Couldn't get user with given session.`
    
    const newPost = await db.createPost(title, body, user.id)
    res.status(201).send(newPost)
  } catch (err) {
    console.log(err)
    res.status(400).send({error: true, message: `Couldn't create post.`})
  }
})

// Delete a post
// A user must be signed in with a valid session and may only delete posts that they made.
app.delete('/posts/:id', async (req, res) => {
  try {
    const postID = req.params.id
    const { sessionID } = req.cookies

    const user = await db.getUserBySessionID(sessionID)
    if (user === null) throw `Couldn't get user with given session.`

    const post = await db.getPostByID(postID)
    if (post === null) throw `Couldn't get post.`
    if (post.author_id !== user.id) throw `Post doesn't belong to user.`
    
    await db.deletePost(postID)
    res.send({error: false})
  } catch (err) {
    console.log(err)
    res.status(400).send({error: true, message: `Couldn't delete post.`})
  }
})

// Update a post
// A user must be signed in with a valid session and may only update posts that they made.
app.put('/posts/:id', async (req, res) => {
  try {
    const postID = req.params.id
    const { sessionID } = req.cookies
    const { title, body } = req.body

    const user = await db.getUserBySessionID(sessionID)
    if (user === null) throw `Couldn't get user with given session.`

    const post = await db.getPostByID(postID)
    if (post === null) throw `Couldn't get post.`
    if (post.author_id !== user.id) throw `Post doesn't belong to user.`
    
    await db.updatePost(postID, title, body)
    res.send({error: false})
  } catch (err) {
    console.log(err)
    res.status(400).send({error: true, message: `Couldn't delete post.`})
  }
})

// Register
// Save user to the database and create a session.
// Username and email duplication validation is handled by constraints in the schema.
app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body
    const hashedPassword = bcrypt.hashSync(password, 10)
    
    const user = await db.createUser(username, email, hashedPassword)
    if (user === null) throw `Couldn't save user to database.`

    res.status(201).send({error: false})
  } catch (err) {
    console.log(err)
    res.status(400).send({error: true, message: `Couldn't register.`})
  }
})

// Sign in
app.post('/signin', async (req, res) => {
  try {
    const { username, password } = req.body
    
    const user = await db.getUserByUsername(username)
    if (user === null) throw `Couldn't get user.`
    if (!bcrypt.compareSync(password, user.password)) throw `Password doesn't match.`

    const sessionID = uuid.v4()
    const result = await db.createSession(sessionID, user.id)
    if (result === null) throw `Couldn't create session.`

    res.cookie('sessionID', sessionID, {sameSite: true, httpOnly: true})
    res.send({
      id: user.id,
      username: user.username,
      email: user.email,
    })
  } catch (err) {
    console.log(err)
    // Don't tell the user more than they need to know
    res.status(400).send({error: true, message: `Invalid credentials.`})
  }
})

// Sign out
app.post('/signout', async (req, res) => {
  try {
    const { sessionID } = req.cookies
    await db.deleteSession(sessionID)
    res.clearCookie('sessionID')
    res.send({error: false})
  } catch (err) {
    console.log(err)
    res.status(400).send({error: true, message: `Couldn't sign out.`})
  }
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
