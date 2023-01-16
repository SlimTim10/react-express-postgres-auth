import './App.css'
import { useState, useEffect } from 'react'
import SignInRegister from './SignInRegister'
import NewPost from './NewPost'
import Post from './Post'

const App = () => {
  const [posts, setPosts] = useState([])
  const [user, setUser] = useState(null)

  const fetchPosts = async () => {
    try {
      const response = await fetch('/posts')
      
      const data = await response.json()
      if (data.error) throw data.message
      
      setPosts(data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const register = async (username, email, password) => {
    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, email, password}),
      })

      const data = await response.json()
      if (data.error) throw data.message
      
      signIn(username, password)
    } catch (err) {
      console.log(err)
    }
  }
  
  const signIn = async (username, password) => {
    try {
      const response = await fetch('/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password}),
      })

      const data = await response.json()
      if (data.error) throw data.message
      
      setUser(data)
    } catch (err) {
      console.log(err)
    }
  }
  
  const signOut = async () => {
    try {
      const response = await fetch('/signout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // No need to send anything in the body because the session ID is sent in cookies
        body: JSON.stringify({}),
      })

      const data = await response.json()
      if (data.error) throw data.message
      
      setUser(null)
    } catch (err) {
      console.log(err)
    }
  }
  
  const createPost = async (title, body) => {
    try {
      const response = await fetch('/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({title, body}),
      })

      const data = await response.json()
      if (data.error) throw data.message

      await fetchPosts()
    } catch (err) {
      console.log(err)
    }
  }
  
  const deletePost = async id => {
    try {
      const response = await fetch(`/posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      })

      const data = await response.json()
      if (data.error) throw data.message

      await fetchPosts()
    } catch (err) {
      console.log(err)
    }
  }
  
  const updatePost = async (id, title, body) => {
    try {
      const response = await fetch(`/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({title, body}),
      })

      const data = await response.json()
      if (data.error) throw data.message

      await fetchPosts()
    } catch (err) {
      console.log(err)
    }
  }
  
  return (
    <div className="App">
      {
        user === null ?
        <SignInRegister
          signIn={signIn}
          register={register}
        />
        : <p>Welcome, {user.username}! <button onClick={e => signOut()}>Sign Out</button></p>
      }
      
      {user !== null && <NewPost createPost={createPost} />}
      
      <h1>Latest Posts</h1>
      <div className="Posts">
        {posts.map(post =>
          <Post
            {...post}
            key={post.id}
            currentUser={user}
            deletePost={deletePost}
            updatePost={updatePost}
          />
        )}
      </div>
    </div>
  )
}

export default App
