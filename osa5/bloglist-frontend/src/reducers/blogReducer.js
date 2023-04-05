import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    updateBlog(state, action) {
      return state.map((blog) => (blog.id === action.payload.id ? action.payload : blog))
    },
    deleteBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    }
  }
})

export const { setBlogs, appendBlog, updateBlog, deleteBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog)
    dispatch(appendBlog(newBlog))
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const object = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    }
    const updatedBlog = await blogService.update(object)
    dispatch(updateBlog(updatedBlog))
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch(deleteBlog(id))
  }
}

export const commentBlog = ({ id, content }) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.comment({ id, content })
    dispatch(updateBlog(updatedBlog))
  }
}

export default blogSlice.reducer
