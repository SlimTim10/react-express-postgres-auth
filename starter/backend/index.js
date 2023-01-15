const express = require('express')
const bodyParser = require('body-parser')
const db = require('./db')

const app = express()
const port = 3001

app.use(bodyParser.json())

// Get all posts
app.get('/posts', async (req, res) => {
  try {
    const results = await db.getPosts()
    res.send(results)
  } catch (err) {
    console.log(err)
    res.status(400).send({error: true, message: `Couldn't get posts.`})
  }
})

// Create a new post
app.post('/posts', async (req, res) => {
  console.log('req.body:', req.body)
  const { title, body } = req.body
  const userID = 1 // from cookie
  
  try {
    const results = await db.createPost(title, body, userID)
    res.status(201).send(results)
  } catch (err) {
    console.log(err)
    res.status(400).send({error: true, message: `Couldn't create post.`})
  }
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
