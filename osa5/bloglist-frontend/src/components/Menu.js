import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/userReducer'

const Menu = () => {
  const loggedInUser = useSelector((state) => state.user)

  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  const style = {
    background: 'lightgrey'
  }

  const padding = {
    paddingRight: 5
  }
  return (
    <div style={style}>
      <Link style={padding} to="/">
        blogs
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
      <span>
        {loggedInUser.name} logged in
        <button onClick={handleLogout}>logout</button>
      </span>
    </div>
  )
}

export default Menu
