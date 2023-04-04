import { useSelector } from 'react-redux'

const Notification = () => {
  const { message, isError } = useSelector((state) => state.notification)

  if (message === null) {
    return
  }

  if (isError) {
    return <div className="notification error">{message}</div>
  } else {
    return <div className="notification success">{message}</div>
  }
}

export default Notification
