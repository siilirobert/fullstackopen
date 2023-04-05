import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog, commentBlog } from '../reducers/blogReducer'

const BlogPage = ({ blog }) => {
  if (!blog) {
    return null
  }

  const dispatch = useDispatch()

  const [comment, setComment] = useState('')

  const addComment = (event) => {
    event.preventDefault()
    dispatch(commentBlog({ id: blog.id, content: comment }))
    setComment('')
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} likes<button onClick={() => dispatch(likeBlog(blog))}>like</button>
      </p>
      <p>added by {blog.user.name}</p>
      <h3>comments</h3>
      <form onSubmit={addComment}>
        <input type="text" value={comment} onChange={() => setComment(event.target.value)} />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </div>
  )
}

export default BlogPage
