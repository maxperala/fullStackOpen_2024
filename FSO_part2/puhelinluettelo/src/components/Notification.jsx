const Notification = ({message, isError}) => {
    if (isError) {
        return (
            <h3 className="red-notification">{message}</h3>
        )
    }
    return (
        <h3 className="green-notification">{message}</h3>
    )
}

export default Notification;