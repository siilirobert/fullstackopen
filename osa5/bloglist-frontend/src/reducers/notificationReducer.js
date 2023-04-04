import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: null, isError: true },
  reducers: {
    changeNotification(state, action) {
      return action.payload
    }
  }
})

export const { changeNotification } = notificationSlice.actions

export const setNotification = ({ message, isError, time }) => {
  return (dispatch) => {
    dispatch(changeNotification({ message, isError }))
    setTimeout(() => {
      dispatch(changeNotification({ message: null, isError: true }))
    }, time * 1000)
  }
}

export default notificationSlice.reducer
