import { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete, loggedInUser }) => {
  const [detailsShown, setDetailsShown] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const onDeleteClick = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      handleDelete(blog.id)
    }
  }

  return (
    <div style={blogStyle}>
      <div className='blogBasicInfo'>
        {blog.title} {blog.author} <button id="view-hide-button" onClick={() => setDetailsShown(!detailsShown)}>{detailsShown ? 'hide' : 'view'}</button>
      </div>
      {detailsShown &&
        <div className='blogDetails'>
          <p>{blog.url}</p>
          <p>likes {blog.likes} <button id='like-button' onClick={() => handleLike(blog)}>like</button></p>
          <p>{blog.user.name}</p>
          {blog.user.username === loggedInUser.username &&
            <button id='remove-button' onClick={onDeleteClick}>remove</button>
          }
        </div>
      }
    </div>
  )
}

export default Blog