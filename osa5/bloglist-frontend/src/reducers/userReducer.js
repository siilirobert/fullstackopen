import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const useSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    }
  }
})

export const { setUser } = useSlice.actions

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      dispatch(setUser(user))
      blogService.setToken(user.token)
    } catch (exception) {
      dispatch(
        setNotification({
          message: 'wrong credentials!',
          isError: true,
          time: 5
        })
      )
    }
  }
}

export const getLoggedInUser = () => {
  return (dispatch) => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }
}

export const logout = () => {
  return (dispatch) => {
    dispatch(setUser(null))
    window.localStorage.removeItem('loggedInUser')
  }
}

export default useSlice.reducer
