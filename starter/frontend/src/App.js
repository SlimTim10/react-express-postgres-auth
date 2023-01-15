import './App.css'
import { useState, useEffect } from 'react'

const App = () => {
  const [posts, setPosts] = useState([])
  const [user, setUser] = useState(null)

  const fetchPosts = async () => {
    const response = await fetch('/posts')
    const data = await response.json()
    setPosts(data)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const signIn = async (username, password) => {
    // const response = await fetch('/signin')
    
    setUser({
      id: 1,
      username: 'alice',
      email: 'alice@email.com'
    })
    console.log('signIn')
  }
  
  // const register = async (username, email, password) => {
  //   console.log('register')
  // }

  const createPost = async (title, body) => {
    const response = await fetch('/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({title, body}),
    })

    await fetchPosts()
  }
  
  return (
    <div className="App">
      {
        user === null ? <SignIn signIn={signIn} />
        : <p>Welcome, {user.username}!</p>
      }
      <NewPost createPost={createPost} />
      <div className="Posts">
        {posts.map(Post)}
      </div>
    </div>
  )
}

const SignIn = ({ signIn }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = event => {
    event.preventDefault()
    signIn(username, password)
  }
  
  return (
    <div className="SignIn">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={event => setUsername(event.target.value)}
          placeholder="username"
        />
        <input
          type="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
          placeholder="password"
        />
        <input type="submit" value="Sign In"/>
      </form>
    </div>
  )
}

const NewPost = ({ createPost }) => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const handleSubmit = event => {
    event.preventDefault()
    createPost(title, body)
  }
  
  return (
    <div className="NewPost">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={event => setTitle(event.target.value)}
          placeholder="title"
        />
        <textarea
          value={body}
          onChange={event => setBody(event.target.value)}
          placeholder="Write your content here..."
        />
        <input type="submit" value="Create"/>
      </form>
    </div>
  )
}

const Post = ({ id, title, body, author, createdAt, updatedAt }) => {
  return (
    <div key={id} className="Post">
      <h2>{title}</h2>
      <p>{body}</p>
      <p>by {author.username} ({author.email})</p>
      <div>
        <small>Created {createdAt}</small>
      </div>
      <div>
        <small>Updated {updatedAt}</small>
      </div>
    </div>
  )
}

export default App
