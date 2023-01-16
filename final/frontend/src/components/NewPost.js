import { useState } from 'react'

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
        <h2>New Post</h2>
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
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default NewPost
