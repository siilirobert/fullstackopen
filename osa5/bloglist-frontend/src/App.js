import { useState, useEffect } from 'react'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { getLoggedInUser, login } from './reducers/userReducer'
import { Routes, Route, useMatch } from 'react-router-dom'
import Users from './components/Users'
import MainPage from './components/MainPage'
import User from './components/User'
import { getAllUsers } from './reducers/usersReducer'
import BlogPage from './components/BlogPage'
import Menu from './components/Menu'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const loggedInUser = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)
  const blogs = useSelector((state) => state.blogs)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    dispatch(getLoggedInUser())
  }, [])

  useEffect(() => {
    dispatch(getAllUsers())
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(login({ username, password }))
    setUsername('')
    setPassword('')
  }

  const usersMatch = useMatch('users/:id')
  const user = usersMatch ? users.find((user) => user.id === usersMatch.params.id) : null

  const blogsMatch = useMatch('blogs/:id')
  const blog = blogsMatch ? blogs.find((blog) => blog.id === blogsMatch.params.id) : null

  if (loggedInUser === null) {
    return (
      <div>
        <Notification />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="loginButton" type="submit">
            login
          </button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <Menu />
      <h2>blog app</h2>
      <Notification />

      <Routes>
        <Route path="users" element={<Users />} />
        <Route path="/" element={<MainPage />} />
        <Route path="users/:id" element={<User user={user} />} />
        <Route path="blogs/:id" element={<BlogPage blog={blog} />} />
      </Routes>
    </div>
  )
}

export default App
