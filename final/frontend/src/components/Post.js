import { useState } from 'react'

const Post = ({
  id,
  title,
  body,
  author,
  createdAt,
  updatedAt,
  currentUser,
  deletePost,
  updatePost,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [newTitle, setNewTitle] = useState(title)
  const [newBody, setNewBody] = useState(body)

  const toggleEdit = () => setIsEditing(v => !v)

  const save = async () => {
    await updatePost(id, newTitle, newBody)
    setIsEditing(false)
  }

  const cancel = () => {
    setIsEditing(false)
    // Reset the edit state
    setNewTitle(title)
    setNewBody(body)
  }
  
  return (
    <div key={id} className="Post">

      {isEditing
       ? <input
           type="text"
           value={newTitle}
           onChange={event => setNewTitle(event.target.value)}
         />
       : <h2>{title}</h2>
      }
      
      {isEditing
       ? <textarea
           value={newBody}
           onChange={event => setNewBody(event.target.value)}
         />
       : <p>{body}</p>
      }
      
      <p>by {author.username} ({author.email})</p>
      <small>Created at {createdAt}</small>
      <small>Updated at {updatedAt}</small>
      {currentUser?.id === author.id && (
        <>
          {isEditing
           ? <div>
               <button onClick={e => save()}>Save</button>
               <button onClick={e => cancel()}>Cancel</button>
             </div>
           : <button onClick={e => toggleEdit()}>Edit</button>
          }
          
          <button onClick={e => deletePost(id)}>Delete</button>
        </>
      )}
    </div>
  )
}

export default Post
