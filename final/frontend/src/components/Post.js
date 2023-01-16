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
  return (
    <div key={id} className="Post">
      <h2>{title}</h2>
      <p>{body}</p>
      <p>by {author.username} ({author.email})</p>
      <small>Created at {createdAt}</small>
      <small>Updated at {updatedAt}</small>
      {currentUser?.id === author.id && (
        <>
          <button>Edit</button>
          <button onClick={e => deletePost(id)}>Delete</button>
        </>
      )}
    </div>
  )
}

export default Post
