import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blog from './Blog'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog, likeBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const MainPage = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  const blogFormRef = useRef()

  const dispatch = useDispatch()

  const addNewBlog = (newBlog) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(newBlog))
    dispatch(
      setNotification({
        message: `a new blog ${newBlog.title} by ${newBlog.author} added`,
        isError: false,
        time: 5
      })
    )
  }

  const handleLike = (blog) => {
    dispatch(likeBlog(blog))
    dispatch(
      setNotification({
        message: 'blog liked',
        isError: false,
        time: 5
      })
    )
  }

  const handleDelete = (id) => {
    dispatch(removeBlog(id))
  }

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
  return (
    <div>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addNewBlog} />
      </Togglable>
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleDelete={handleDelete}
          loggedInUser={user}
        />
      ))}
    </div>
  )
}

export default MainPage
