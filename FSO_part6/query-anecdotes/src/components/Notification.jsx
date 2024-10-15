import { useContext } from "react"
import notificationContext from "../notificationContext"

const Notification = () => {
  const [notification, dispatch] = useContext(notificationContext);
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (!notification.visible) return null

  return (
    <div style={style}>
      {notification.msg}
    </div>
  )
}

export default Notification
