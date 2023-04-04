import { configureStore } from '@reduxjs/toolkit'
import notificationreducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
  reducer: {
    notification: notificationreducer,
    blogs: blogReducer,
    user: userReducer
  }
})

export default store
