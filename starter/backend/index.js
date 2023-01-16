const express = require('express')
const bodyParser = require('body-parser')
const db = require('./db')

const app = express()
const port = 3001

app.use(bodyParser.json())

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
app.post('/posts', async (req, res) => {
  const { title, body } = req.body
  
  // Since we don't have sessions yet, assume the author is always user 1
  const userID = 1
  
  try {
    const newPost = await db.createPost(title, body, userID)
    res.status(201).send(newPost)
  } catch (err) {
    console.log(err)
    res.status(400).send({error: true, message: `Couldn't create post.`})
  }
})

// Register
// Since we don't have authentication yet, pretend the registration succeeded (send back success)
app.post('/register', async (req, res) => {
  try {
    res.status(201).send({error: false})
  } catch (err) {
    console.log(err)
    res.status(400).send({error: true, message: `Couldn't register.`})
  }
})

// Sign in
// Since we don't have authentication yet, pretend the sign in succeeded (send back the first user)
app.post('/signin', async (req, res) => {
  try {
    const user = await db.getUserByID(1)
    res.send({
      id: user.id,
      username: user.username,
      email: user.email,
    })
  } catch (err) {
    console.log(err)
    res.status(400).send({error: true, message: `Couldn't sign in.`})
  }
})

// Sign out
// Since we don't have authentication yet, pretend the sign out succeeded (send back success)
app.post('/signout', async (req, res) => {
  try {
    res.send({error: false})
  } catch (err) {
    console.log(err)
    res.status(400).send({error: true, message: `Couldn't sign out.`})
  }
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
